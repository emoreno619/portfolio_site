/**
*	Summit Lightbox
*	Version: 1.0
*	URL: @ThemeMountain
*	Description: Lightbox
*	Requires: jQuery 1.10+
*	Author: ThemeMountain
*	Copyright: Copyright 2013 ThemeMountain
*	License: Attribution-NonCommercial 3.0 (http://creativecommons.org/licenses/by-nc/3.0/)
*/

;(function( $, document, window, undefined ) {

	'use strict';

	var SummitLightbox = function( element, options ){

		// Settings
		var settings = $.extend( {}, $.fn.summitLightbox.tmlOpts, options ); 

		// Object & jQuery el
		var link = $( element );
		var obj = this;

		// Gallery array
		var galleryGroup = [];

		// Link events
		link.on( 'click', function( event ){
			event.preventDefault();

			// Check if link is part of group
			if( $( link ).data( 'group' ) ) galleryGroup = isGalleryGroup( link );
			
			// Link is now active
			$( this ).addClass( 'tml-active' );

			// Build
			buildLightbox( galleryGroup, settings, obj );
		});

		// Window event
		$( window ).on( 'resize', function(){
			redimensionContent( settings ); 
		});

		/**
		*	Direcitonal calls
		*/

		obj.nextContent = function(){
			var content = $( '#tml-content');
			if( content.data( 'loading' ) ) return false;

			// Remove caption of current
			processCaption( 0, settings );

			var active = $( '.tml-active' );
			var group = isGalleryGroup( active );
			var nextLink = group[( $.inArray( active.attr( 'id' ), group ) + 1 )];
			nextLink = $.inArray( nextLink, group ) + 1 === 0 ? group[0] : nextLink;
			active.removeClass( 'tml-active' );
			nextLink = $( '#' + nextLink ).addClass( 'tml-active' );
			removeContent( nextLink, 'next', settings );

			// Clear array
			group.length = 0;
		};
		obj.prevContent = function(){
			var content = $( '#tml-content');
			if( content.data( 'loading' ) ) return false;

			// Remove caption of current
			processCaption( 0, settings );

			var active = $( '.tml-active' );
			var group = isGalleryGroup( active );
			var prevLink = group[( $.inArray( active.attr( 'id' ), group ) - 1 )];
			prevLink = $.inArray( prevLink, group ) + 1 === 0 ? group[ group.length -1 ] : prevLink;
			active.removeClass( 'tml-active' );
			prevLink = $( '#' + prevLink ).addClass( 'tml-active' );
			removeContent( prevLink, 'prev', settings );
			
			// Clear array
			group.length = 0;
		};

		/**
		*	Destroy Lightbox
		*	@param lightbox (required) object;
		*/
		obj.destroyLightbox = function(){

			var lightbox = $( '#tm-lightbox' );
			var content = $( '#tml-content' );
			var destroyTimer = null;

			// Get original position of lightbox
			var startPos = lightboxPosition( lightbox, settings );
			if( tSupport ){
				if( lightbox.data( 'transitioning' ) ) return false;

				// Remove transition of children
				lightbox.children().css({ transition: 'none' });
				content.css({ transition: 'none' });
				
				// Remove the lightbox
				lightbox.one( transitionEnd, function(){
					// IE9 fix for video audio
					// that keeps playing after clearing iframe
					clearTimeout( destroyTimer );
					destroyTimer = setTimeout( function(){
						lightbox
								.find( 'iframe' )
								.attr( 'src', '' );
						lightbox.remove();
						lightbox = null;
					}, 50 );
				});
				// Animte
				animate( lightbox, 0, startPos.x, startPos.y, settings );

			}else{
				if( lightbox.is( ':animated' ) ) return false;
				content.remove();
				lightbox.animate({ opacity: 0, left: startPos.x + 'px', top: startPos.y + 'px' }, settings.speed, settings.easing, function(){
					lightbox
							.find( 'iframe' )
							.attr( 'src', '' );
					lightbox.remove();
					lightbox = null;
				});
			}

			// Clear gallery array
			galleryGroup.length = 0;

			// Remove active
			$( '.tml-active' ).removeClass( 'tml-active' );

			// Lighbox exit callback
			if( settings.onExit ) settings.onExit();
		};
	};

	/**
	*	Verify group
	*/

	var isGalleryGroup = function( link ){
		if( $( link ).is( '[data-group]' ) ){
			var group = $( link ).data( 'group' );
			var galleryGroup = [];

			// Check that all elements in the group have an ID, 
			// if not, add an ID and add push it to the array
			$( '[data-group="' + group + '"]' ).each( function( i ){
				i++;
				if( $( this ).attr( 'id') ){
					galleryGroup.push( $( this ).attr( 'id' ) );
				}else{
					$( this ).attr( 'id', group + '-tml-thumb-' + i );
					galleryGroup.push( $( this ).attr( 'id' ) );
				}
			});
			return galleryGroup;
		}
	};

	/**
	*	Original Position of Lightbox
	*	@param lightbox (required) object;
	*	@param settings (required) array;
	*/

	var lightboxPosition = function( lightbox, settings ){
		var directionIn = settings.lightboxAnimation;
		var direction = directionIn === 'slideInLeft' || directionIn === 'slideInTop' ?  -1 : directionIn === 'slideInRight' || directionIn === 'slideInBottom' ? 1 : 0;
		var startX = directionIn === 'slideInLeft' || directionIn === 'slideInRight' ? $( window ).width() * direction : 0 ;
		var startY = directionIn === 'slideInTop' || directionIn === 'slideInBottom' ? $( window ).height() * direction : 0 ;
		return { x:startX, y:startY };
	};

	/**
	*	Build the Lightbox
	*	@param galleryGroup (required) array;
	*		Defines lightbox links
	*		in the same group
	*	@param settings (required) array;
	*	@param obj (required) object;
	*		For accessing public methods
	*/

	var buildLightbox = function( galleryGroup, settings, obj ){

		if( $( '#tm-lightbox' ).length ) return false;
		
		// Append lightbox
		$( 'body' ).append( '<div id="tm-lightbox" class="tm-lightbox">' +
									'<div id="tml-content-wrapper" >' +
										'<div id="tml-content" />' +
									'</div>' +
									'<div id="tml-caption" />' +
								'</div>' );

		// References
		var lightbox = $( '#tm-lightbox' );
		var contentWrapper = $( '#tml-content-wrapper' );
		var content = $( '#tml-content' );
		var animateLbTimer = null;

		// Startup data
		lightbox.data( 'initLoad', true );

		// Check margin
		var margin = settings.contentMargin;
		contentWrapper.css({
			top: margin + '%',
			right: margin + '%',
			bottom: margin + '%',
			left: margin + '%'
		});

		// Touch support
		if( galleryGroup.length >= 2 ){
			content.swipeIt({
				preventTouchOn: '.scrollable-content', 
				onSwipeMove: function( position ) {
					content.css({ left: position + 'px' }); 
				},
				onSwipeEnd: function( swipe ) {
					if( swipe === 'left' ){
						obj.prevContent();
					}else{
						obj.nextContent();
					}
				}
			});
		}

		// Overlay opts
		if( !settings.overlay ) lightbox.css({ background: 'none' });

		// Add arrow nav
		if( settings.navArrows && galleryGroup.length >= 2 ){
			
			// Build
			var prev =  $( '<a href="#" />' ).attr( 'id', 'tml-prev' ).addClass( 'tml-nav' ).appendTo( lightbox );
			var next =  $( '<a href="#" />' ).attr( 'id', 'tml-next' ).addClass( 'tml-nav' ).appendTo( lightbox );
				
			// Actions
			prev.on( 'click', function( event ){
				event.preventDefault();
				obj.prevContent();
			});
			next.on( 'click', function( event ){
				event.preventDefault();
				obj.nextContent();
			});
		}

		// Add exit button
		if( settings.navExit ){
			var exit = $( '<a href="" id="tml-exit" class="tml-nav" />' ).appendTo( lightbox );
			
			// Actions
			exit.on( 'click', function( event ){
				event.preventDefault();
				obj.destroyLightbox();
			});
		}

		// Add keyboard nav
		if( settings.navKeyboard ){
			$( document ).on( 'keyup', function( event ) {
				if ( event.keyCode == 37 && galleryGroup.length >= 2) {
					obj.prevContent();
				} else if ( event.keyCode == 39 && galleryGroup.length >= 2 ) {
					obj.nextContent();
				}else if ( event.keyCode == 27 ) {
					obj.destroyLightbox();
				}
			});
		}
		if( settings.overlayClickClose ){
			lightbox.on( 'click', function( event ){
				if( event.target === this || event.target.id === 'tml-content-wrapper' ){
					obj.destroyLightbox();
				}
			});
		}

		// Fade in
		var startPos = lightboxPosition( lightbox, settings );
		if( tSupport ){
			lightbox.css({ transition: 'none', transform: 'translate3d(' + startPos.x + 'px' + ', ' +  startPos.y + 'px' + ', 0px)' });
			if( lightbox.data( 'transitioning' ) ) return false;
			clearTimeout( animateLbTimer );
			animateLbTimer = setTimeout( function(){
				lightbox.one( transitionEnd, function(){
					loadContent( $( '.tml-active'), 'next', settings );
				});
				animate( lightbox, 1, 0, 0, settings );
			}, 50 );
		}else{
			lightbox.css({ left:  startPos.x + 'px', top:  startPos.y + 'px' });
			lightbox.animate({ opacity: 1, left: 0, top: 0 }, settings.speed, settings.easing, function(){
				loadContent( $( '.tml-active'), 'next', settings );
			});
		}
	};

	/**
	*	Remove Content
	*	@param link (required) object; 
	*	@param direction (required) string; 
	*	@param settings (required) array; 
	*/

	var removeContent = function( link, direction, settings ){

		var lightbox = $( '#tm-lightbox');
		var content =  $( '#tml-content' );

		content.data( 'loading', true );

		// Check direction
		var tx = settings.contentAnimation === 'fade' ? 0 : settings.slideAmount;
		direction = direction === 'next' ? 1 : -1;

		// Call animate
		if( tSupport ){
			content.one( transitionEnd, function(){
				$( this ).css({ visibility: 'hidden' });
				loadContent( link, direction, settings );
			});
			animate( content, 0, -tx * direction, 0, settings );
		}else{
			var initPos = content.position().left;
			content.animate({ opacity: 0, left: initPos - tx * direction + 'px' }, settings.speed, settings.easing, function(){
				$( this ).css({ visibility: 'hidden' });
				loadContent( link, direction, settings );
			});
		}
	};

	/**
	*	Load Content
	*	@param link (required) object;
	*	@param direction (required) string;
	*	@param settings (required) array;
	*/

	var loadContent = function( link, direction, settings ){

		// Ref the lightbox
		var lightbox = $( '#tm-lightbox');
		var content =  $( '#tml-content' );

		// IE9 fix for video audio
		// that keeps playing after removing content
		content
				.find( 'iframe' )
				.attr( 'src', '' );

		// Clear content		
		content
				.removeClass( 'tml-error scrollable-content' )
				.data( 'type', '' )
				.html('');							

		// Get url
		var href = link.attr( 'href' );

		// Match against image
		var img = href.match( /\.(jpeg|jpg|png|gif)/i );

		// Match against video
		var video = href.match( /(vimeo\.com|youtu(be\.com|\.be))\/(watch\?v=)?([A-Za-z0-9._%-]*)(\&\S+)?/ );

		// Check if inline
		var inline = link.is( '[data-content="inline"]' );

		// Check if iframe
		var iframe = link.is( '[data-content="iframe"]' );

		// Check if ajax
		var ajax = link.is( '[data-content="ajax"]' );

		// Add preloader
		if( $( '#tml-loader' ).length ) $( '#tml-loader' ).remove();
		lightbox.append('<div id="tml-loader" class="tm-loader"><div id="circle" /></div>');

		// Image
		if( img ){

			// Check if retina
			var imgExt = href.substr( ( href.lastIndexOf( '.' ) ) );
			if( window.isRetinaDevice() && settings.retinaSupport || window.isRetinaDevice() && link.is( '[data-retina]' ) ){
				if( !mobile && !settings.retinaSupportMobile || mobile && settings.retinaSupportMobile ){
					href = href.replace( imgExt, settings.retinaSuffix + imgExt );
				}
			}

			// Set type data
			content.data( 'type', 'img' );

			// Load
			$('<img />')
						.addClass('tml-image')
						.attr( 'src', href )
						.one( 'load', function(){
							content.html( $( this ) );
							loaded( true,  direction, settings );
						})
						.each( function() {

							// Force the browsers that don't trigger load for
							// images already in cache
							if( this.complete ) $( this ).trigger( 'load' );
						})
						.on( 'error', function(){
							loaded( false,  direction, settings );
						});
		}				
		// Video
		if( video ){

			// Set type data
			content.data( 'type', 'video' );

			// Create iframe
			var ifrVideo = $( '<iframe src="' + href + '" wmode="opaque" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen />' );
			content.html( ifrVideo );
			ifrVideo.one( 'load', function(){
				loaded( true,  direction, settings );
			});
		}
		// Inline
		if( inline ){

			// Set type data
			content
					.addClass( 'scrollable-content' )
					.data( 'type', 'inline' );

			// Check if inline el exists
			if( $( href ).length ){
				var html = $( href ).clone().css({ display: 'block', visibility: 'visible', opacity: 1 });
				content.html( html );
				loaded( true,  direction, settings );
			}else{
				loaded( false,  direction, settings );
			}
		}
		// Iframe
		if( iframe ){

			// Set type data
			content
					.addClass( 'scrollable-content' )
					.data( 'type', 'iframe' );

			// Create iframe
			var ifr = $( '<iframe src="' + href + '" frameborder="0" scrolling="auto" />' );
			content.html( ifr );
			ifr.one( 'load', function(){
				loaded( true,  direction, settings );
			});
		}
		// Ajax
		if( ajax ){

			// Set type data
			content
					.addClass( 'scrollable-content' )
					.data( 'type', 'ajax' );

			// Find target container
			var tContainer = link.data( 'target-container' );

			// Load
			$.ajax({
					url: href,
					cache: false,
					success: function ( data ) {
						if( !$( data ).find( tContainer ).length ){
							content.html( data );
						}else{
							content.html( $( data ).find( tContainer ) );
						}
						loaded( true, direction, settings );
					},
					error: function ( xhr, ajaxOptions, thrownError ) {
						//console.log( xhr, ajaxOptions, thrownError)
						loaded( false, direction, settings );
					}
			});
		}
	};

	var loaded = function( success, direction, settings ){

		var lightbox = $( '#tm-lightbox' );
		var content = $( '#tml-content' );
		var animateContentTimer = null;

		// Redimension content
		redimensionContent( settings );

		// Remove loader
		lightbox.find( '#tml-loader' ).remove();

		// Success
		if( success ){
			var tx = settings.contentAnimation === 'fade' ? 0 : settings.slideAmount;

			if( tSupport ){
				content.css({ transition: 'none', opacity: 0, transform: 'translate3d(' + tx * direction + 'px' + ', 0, 0)' });
				clearTimeout( animateContentTimer );
				animateContentTimer = setTimeout( function(){
					content.one( transitionEnd, function(){
						content.data( 'loading', false );
					});
					animate( content, 1, 0, 0, settings );
				}, 50 );
			}else{
				var initPos = content.position().left;
				var newPos = lightbox.data( 'initLoad' ) ? initPos : direction === 1 ? initPos + tx * 2 : initPos - tx * 2;	
				content.css({ visibility: 'visible', left: newPos + 'px' }).animate({ opacity: 1, left: initPos + 'px' }, settings.speed, settings.easing, function(){
					content.data( 'loading', false );
				});
			}

			// Fade in caption
			processCaption( 1, settings );

			// Lighbox content loaded callback
			if( settings.onLoaded ) settings.onLoaded();

		// Error 
		}else{
			var href = '';
			if( settings.showErrorSrc ) href = ': ' + $( '.tml-active' ).attr( 'href' );
			content
					.css({ width: '100%', height: 'auto' , top: '50%', left: 0, transition: 'none', transform: 'translate3d( 0, 0, 0)' })
					.addClass( 'tml-error' )
					.html( settings.errorMessage + href );
			if( tSupport ){
				clearTimeout( animateContentTimer );
				animateContentTimer = setTimeout( function(){
					content.one( transitionEnd, function(){
						content.data( 'loading', false );
					});
					animate( content, 1, 0 , 0, settings );
				}, 50 );
			}else{
				content.css({ visibility: 'visible' }).animate({ opacity: 1 }, function(){
					content.data( 'loading', false );
				});
			}
		}
		lightbox.data( 'initLoad', false );
	};

	// Set size
	var redimensionContent = function( settings ){

		// Wrapper w/h references
		var wrapperW = $( '#tml-content-wrapper' ).width();
		var wrapperH = $( '#tml-content-wrapper' ).height();

		// Reference
		var content = $( '#tml-content' );
		var type = content.data( 'type' );
		var ratio = 0;
		var contentW = 0;
		var contentH = 0;
		var top = 0;
		var left = 0;

		// Clear previous
		content.not( '.tml-error' ).css({ height: 'auto', width: 'auto', top: '', left:  '' });

		// Get w/h references
		if( type === 'img' ){
			contentW = content.find( 'img' ).width();
			contentH = content.find( 'img' ).height();
		}else if ( type === 'video' ){
			contentW = settings.maxWidth;
			contentH = contentW / 1.778;
		}else if ( type === 'iframe' ){
			contentW = wrapperW < settings.maxWidth ? wrapperW : settings.maxWidth;
			contentH = wrapperH;
		}else{
			var htmlWidth = content.children().outerWidth();
			var htmlHeight = content.children().outerHeight();
			contentW = htmlWidth < wrapperW && htmlWidth <= settings.maxWidth ? htmlWidth : htmlWidth > settings.maxWidth ? settings.maxWidth : wrapperW;
			contentH = htmlHeight < wrapperH ? htmlHeight : wrapperH;
		}

		// Ratio for images and video only
		if( type === 'img' || type === 'video' ){
			if( contentW / contentH > wrapperW / wrapperH ){
				ratio = contentW / wrapperW;
			}else{
				ratio = contentH / wrapperH;
			}

			// Calculate ratio
			contentW = contentW < contentW / ratio ? contentW : contentW / ratio;
			contentH = contentH < contentH / ratio ? contentH : contentH / ratio;
		}

		// Calculate left value
		left = ( wrapperW - contentW ) / 2;
		top = ( wrapperH - contentH ) / 2;

		// Set
		content.css({
			width: Math.round( contentW ) + 'px',
			height: Math.round( contentH ) + 'px',
			top: Math.round( top ) + 'px',
			left: Math.round( left ) + 'px'
		});
	};

	/**
	*	Animation Handling
	*	@param selector (required) object;
	*	@param opacity - transY (required) integer;
	*	@param easing (required) string;
	*	@param settings (required) array;
	*/

	var animate = function( selector, opacity, transX, transY, settings ){

		var lightbox = $( '#tm-lightbox' );
		var content = $( '#tml-content' );

		// Reset data to false for content
		if( selector.attr( 'id' ) === 'tm-lightbox' ) lightbox.data( 'transitioning', true );

		// Animation magic
		var attrs = {};
		attrs.transform = 'translate3d(' + transX + 'px' + ', ' + transY + 'px' + ', 0px)';
		attrs.transitionProperty = transform + ', opacity';
		attrs.transitionDuration = settings.speed + 'ms';
		attrs.transitionTimingFunction = easingArray[ settings.easing ];
		attrs.visibility = 'visible';
		attrs.opacity = opacity;
		selector
				.css( attrs )
				.one( transitionEnd, function( event ){
					
					// Prevent bubbling
					event.stopPropagation();
					
					// Remove listener
					$( this ).off( transitionEnd );

					// Reset data to false for content
					if( selector.attr( 'id' ) === 'tm-lightbox' ) lightbox.data( 'transitioning', false );
				});
	};
	
	/**
	*	Show hide caption
	*	@param opacity (required) integer;
	*	@param settings (required) array;
	*/

	var processCaption = function ( opacity, settings ){

		var caption = $( '#tml-caption' );
		var captionContent = $( '.tml-active' ).data( 'caption' );

		if ( captionContent ){

			// Add caption
			caption.html( $( '<span />' ).text( captionContent ) );

			if( tSupport ){
				animate( $( '#tml-caption' ), opacity , 0, 0, settings );
			}else{
				$( '#tml-caption' ).animate({ opacity: opacity });
			}
		}else{
			caption.html( '' );
		}
	};

	/**
	*	Check if retina deivce
	*/

	window.isRetinaDevice = function(){
		var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-resolution: 1.5dppx)';
		if ( this.devicePixelRatio > 1 || this.matchMedia && this.matchMedia( mediaQuery ).matches ) return true;
		return false;
	};

	// Animation support & prefixing
	var t = document.body || document.documentElement;
	var s = t.style;
	var tSupport = s.transition !== undefined || s.WebkitTransition !== undefined || s.MozTransition !== undefined || s.MsTransition !== undefined || s.OTransition !== undefined;
	var property = [ 'WebkitTransform', 'MozTransform', 'OTransform', 'msTransform' ];
	var prefix;
	for( var i in property ){
		if( s[ property[ i ] ] !== undefined ){
			prefix = '-' + property[ i ].replace( 'Transform', '' ).toLowerCase();
		}
	}
	var transform = prefix + '-transform';
	var transitionProperty = prefix + '-transition-property';
	var transitionDuration = prefix + '-transition-duration';
	var transitionTimingFunction = prefix + '-transition-timing-function';
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

	// Easing Array
	// For converting jQuery easing types
	// to Cubic Bezier format for CSS3 transitons
	var easingArray = {
		'linear':'cubic-bezier(0, 0, 1, 1)',
		'swing':'cubic-bezier(0.42, 0, 0.58, 1)',
		'easeOutCubic':'cubic-bezier(.215,.61,.355,1)',
		'easeInOutCubic':'cubic-bezier(.645,.045,.355,1)',
		'easeInCirc':'cubic-bezier(.6,.04,.98,.335)',
		'easeOutCirc':'cubic-bezier(.075,.82,.165,1)',
		'easeInOutCirc':'cubic-bezier(.785,.135,.15,.86)',
		'easeInExpo':'cubic-bezier(.95,.05,.795,.035)',
		'easeOutExpo':'cubic-bezier(.19,1,.22,1)',
		'easeInOutExpo':'cubic-bezier(1,0,0,1)',
		'easeInQuad':'cubic-bezier(.55,.085,.68,.53)',
		'easeOutQuad':'cubic-bezier(.25,.46,.45,.94)',
		'easeInOutQuad':'cubic-bezier(.455,.03,.515,.955)',
		'easeInQuart':'cubic-bezier(.895,.03,.685,.22)',
		'easeOutQuart':'cubic-bezier(.165,.84,.44,1)',
		'easeInOutQuart':'cubic-bezier(.77,0,.175,1)',
		'easeInQuint':'cubic-bezier(.755,.05,.855,.06)',
		'easeOutQuint':'cubic-bezier(.23,1,.32,1)',
		'easeInOutQuint':'cubic-bezier(.86,0,.07,1)',
		'easeInSine':'cubic-bezier(.47,0,.745,.715)',
		'easeOutSine':'cubic-bezier(.39,.575,.565,1)',
		'easeInOutSine':'cubic-bezier(.445,.05,.55,.95)',
		'easeInBack':'cubic-bezier(.6,-.28,.735,.045)',
		'easeOutBack':'cubic-bezier(.175, .885,.32,1.275)',
		'easeInOutBack':'cubic-bezier(.68,-.55,.265,1.55)'
	};

	// Mobile Check
	var mobile = false;
	if( navigator.userAgent.match(/Android/i) || 
		navigator.userAgent.match(/webOS/i) ||
		navigator.userAgent.match(/iPhone/i) || 
		navigator.userAgent.match(/iPad/i) ||
		navigator.userAgent.match(/iPod/i) || 
		navigator.userAgent.match(/BlackBerry/i) || 
		navigator.userAgent.match(/Windows Phone/i) ){
			mobile = true;
	}

	// Plugin
	$.fn.summitLightbox = function( options ) {

		// Iterate through each DOM element and return it
		return this.each(function() {

			var element = $( this );

			// Return early if this element already has a plugin instance
			if ( element.data( 'summitLightbox' ) ) return;

			// Pass options
			var summit = new SummitLightbox( this, options );

			// Store plugin object in this element's data
			element.data( 'summitLightbox', summit );

		});
	};

	// Default
	$.fn.summitLightbox.tmlOpts = {

		// Animation
		lightboxAnimation: 'fade',						// Animation type: fade, slideInTop, slideInRight, slideInBottom, slideInLeft
		contentAnimation: 'slide',						// Animation type: Slide or fade
		slideAmount: 100,								// Animation amount: Amount to slide on x axis
		easing: 'swing',								// Easing type: string, see easingArray
		speed: 350,										// Animation speed: milliseconds, lowest 50 in which no animation occurrs
		
		// Overlay
		overlay: true,									// Overlay: true or false
		
		// Width/Margin
		maxWidth: 1140,									// Max width for video, inline ifram and ajax content
		contentMargin: 15,								// Content margin 15 is 15% of window width and height

		// Navigation
		navArrows: true,								// Arrow nav: boolean
		navKeyboard: true,								// Keyboard nav: boolean
		navExit: true,									// Exit nav: boolean
		overlayClickClose: true,						// Close lightbox upon clicking overlay: boolean

		// Retina Support
		retinaSupport: true,							// Check for retina displays and serve retina image
		retinaSupportMobile: false,						// Whether swap should occur on mobile devices
		retinaSuffix: '@2x',							// Retina image suffix

		// Error Message
		errorMessage: 'Please Check',					// Error message
		showErrorSrc: true,								// Show the src causing the issue: boolean

		// Callback
		onSetup: null,									// Callback: when lightbox is created
		onLoaded: null,									// Callback: after requested content has loaded
		onDestroy: null									// Callback: on exiting the lightbox
	};
})( jQuery, document, window );