/**
*	Template Functions
*	Version: 1.0.6;
*	Author: ThemeMountain
*	Copyright: ThemeMountain
*/

$( document ).ready( function(){

	'use strict';

	/**
	*	Template Functions
	*/

	// Header
	var header = '.header';
	var headerAnimated = '.header-animated';
	var headerSticky = '.header-sticky';
	var headerBackground = '.header-background';
	var headerCompact = '.header-compact';
	var headerHeadIn = '.header-in';
	var headerHeadOut = '.header-out';
	var headerInitPosition = '.header-positioned';
	var headerNavShow = '.navigation-show';

	// Retinize
	var retinizeSelectors = '#bkg-retina-img, #retina-img, [data-2x]';

	// Equalize
	var equalizeContainer = '.equalize';

	// Parallax
	var parallaxContainer = '.parallax';

	// Fullscreen
	var fsSectionWrapper = '.fullscreen-sections-wrapper';
	var fsSection = '.fullscreen-section';

	// Scroll to Section
	var scrollLink = '.scroll-link';

	// Page scroll params
	var pageScrollSpeed = 1000;
	var pageEasing = 'easeInOutQuart';
	var pageThreshold = 0.6; //0.5-1

	// Masonry Grid
	var msnryGrid = '.masonry-grid';
	var msnryGridItem = '.grid-item, .masonry-stamp';
	var msnryFilterMenu = '.portfolio-filter-menu';
	var msnryFilterLink = '.portfolio-filter-menu a';
	var msnryTransDuration = '0.7s';
	var msnryTransResize = false;

	// Videos
	var selectors = ['.video-container iframe', '.video-container object'];
	var players = ['www.youtube.com', 'player.vimeo.com'];
	var mejsPlayers = '.mejs-container audio, .mejs-container video';

	// Carousel Slider
	var carouselSlider = '.carousel-slider';

	// Content Slider
	var contentSlider = '.content-slider';

	// Full Width Slider
	var fullScreenSlider = '.tm-slider-container.fullscreen';

	// Full Width Slider
	var fullWidthSlider = '.full-width-slider';

	// Logo Slider
	var logoSlider = '.logo-slider';

	// Hero Slider
	var heroSlider = '.hero-slider';

	// Testimonial Slider
	var testimonialSlider = '.testimonial-slider';
	var tstmlSliderPrev = '.previous-testimonial-slider';
	var tstmlSliderNext = '.next-testimonial-slider';

	// Team Type 3 - Slider
	var teamSlider = '.team-slider';
	var tSliderPrev = '.previous-team-slider';
	var tSliderNext = '.next-team-slider';

	// Portoflio Type 7 - Slider
	var portfolioSlider = '.portfolio-recent-slider';
	var psSliderPrev = '.previous-portfolio-recent-slider';
	var psSliderNext = '.next-portfolio-recent-slider';

	// Lightbox
	var lightbox = '#tm-lightbox';
	var ligthboxLink = '.lightbox-link';

	// Common form element classes
	// used for signup and contact forms
	var formElement = '.form-element';
	var formResponse = '.form-response';
	var formHoneypot = '.form-honeypot';
	var formSubmit = '.form-submit';

	// Signup specific class
	// references and messages
	var signupForm = '.signup-form';
	var signupRequired = '.required-field';
	var signupFormSending = 'Please wait.';
	var signupFormSendingButton = 'Sending...';
	var signupFormSuccess = 'You have been added to our list!';
	var signupFormError = 'Oh boy an error occurred, please try again.';
	var signupFormSubscribed ='You are already subscribed to our list';
	var signupFormFillFields = 'Please fill out required fields.';
	var signupFormValidEmail = 'Please enter a valid email address.';

	// Contact specific class
	// references and messages
	var contactForm = '.contact-form';
	var contactRequired = '.required-field';
	var contactFormSending = 'Please wait.';
	var contactFormSendingButton = 'Sending...';
	var contactFormSuccess = 'Thank you, your email has been received!';
	var contactFormError = 'Oh boy an error occurred, please try again.';
	var contactFormFillFields = 'Please fill out required fields.';
	var contactFormValidEmail = 'Please enter a valid email address.';

	// Google Map
	var mapIcon = ['images/assets/map-marker.png','images/assets/map-marker-2.png'];
	var mapLocations = [[40.723301,-74.002988],[40.691052,-73.925457]];
	var mapInfoContnet = ['Downtown New York Office<br>44 St. West 32','The Brooklyn Office<br>East Village 55th St.'];
	var mapIconW = 45; // Half of actual width
	var mapIconH = 53; // Half of actual height
	var mapZoomLevel = 12;
	var mapZoomMseWheel = false;
	var mapTypeCtrl = false;
	var mapPanCtrl = false;
	var mapZoomCtrl = true;
	var mapScaleCtrl = true;
	var mapStreetViewCtrl = false;
	var mapGrayScale = true;

	// Page Fade
	var pageFadeLocation = true;
	var page = 'body';
	var launchLink = '.fade-location, .logo a, .footer-logo a, .navigation a, .side-navigation a, .overlay-navigation a, [class*="portfolio-"] .overlay-link, .post-media .overlay-link, .post-title a, .post-read-more a, .pagination-previous, .pagination-next';
	var excludeLink = '.no-page-fade, .mail-link, .lightbox-link, .contains-sub-menu, .blog .pagination-previous, .blog .pagination-next, .disabled, .scroll-link';

	// Transition End
	var transitionEnd = 'webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend';

	var templateFunctions = {
		init: function(){
			// Header
			templateFunctions.siteHeader();
			// Retinize
			templateFunctions.retinize();
			// Equalize
			templateFunctions.equalize( 768 );
			// Parallax
			templateFunctions.parallax( '.parallax.fixed-height', true, false, true );
			templateFunctions.parallax( '.parallax.fullscreen', true, true, true );
			// Fullscreen sections
			templateFunctions.fullScreenSection();
			// Masonry
			templateFunctions.masonry();
			// Sliders - seperate calls for
			// ease of use - alternatively merge and pass parameters
			templateFunctions.logoSlider();
			templateFunctions.heroSlider();
			templateFunctions.testimonialSlider();
			templateFunctions.teamSlider();
			templateFunctions.portfolioSlider();
			templateFunctions.carouselSlider();
			templateFunctions.contentSlider();
			templateFunctions.fullScreenSlider();
			templateFunctions.fullWidthSlider();
			// Lightbox
			templateFunctions.lightbox();
			// Counter
			templateFunctions.counter( '.stat', '.stat-counter', false );
			// Horizon
			templateFunctions.horizon( '.horizon', '.parallax .horizon', 'easeInOutQuint', false, 1 );
			// Video
			templateFunctions.videos();
			templateFunctions.mediaElement();
			// Signup
			templateFunctions.signupForm();
			// Contact
			templateFunctions.contactForm();
			// Eanable placeholder behaviour for old browsers
			templateFunctions.enablePlaceHolder();
			// Google Map
			if( document.getElementById( 'map-canvas' ) ) google.maps.event.addDomListener( window, 'load', templateFunctions.googleMap );
			// Page Fade
			templateFunctions.pageFade();
			// Scroll To section
			templateFunctions.scrollToSection();
		},
		retinize: function(){
			$( retinizeSelectors ).retinizeImages();
		},
		equalize: function( breakpoint ){
			// Use images loaded if equalize
			// objects contain iamges
			imagesLoaded( $( equalizeContainer ), function() {
				$( equalizeContainer ).equalizeHeights({
					clearUnder: breakpoint
				});
			});
		},
		parallax: function( container, scale, fullscreen, fade ){
			$( container ).snowBridge({
				scaleContainer: scale,
				scaleUnder: 960,
				scaleMinHeight: 214,
				fullscreen: fullscreen,
				fadeInOut: fade,
				fadeThreshold: 0.5,
				retinaSupport: false,
				parallaxFactor: 0.6,
				onLoaded: function(){
					templateFunctions.horizon( '.horizon', '', 'easeInOutQuint', false, 1 );
				}
			});
		},
		horizon: function( element, exclude, easing, loop, threshold ){
			$( element ).not( exclude ).horizon({
				easing: easing,
				recurring: loop,
				threshold: threshold
			});
		},
		counter: function( container, element, loop ){

			// Create an instance of the counter
			// but prevent it from starting
			$( element ).counter({
				autoStart: false
			});

			// Loop through each container
			// and check if it's in view
			// if so star counter
			$( container ).each( function(){
				var cntr = $( this );
				cntr.horizon({
					recurring: loop,
					inView: function(){
						if( cntr.find( element ).data( 'counting' ) ) return false;
						cntr.find( element ).each( function(){
							cntr.find( element ).data( 'counting', true );
							var c = $( this ).data( 'counter' );
							c.startCounter();
						});
					},
					outOfView: function(){
						if( !loop || !cntr.find( element ).data( 'counting' ) ) return false;
						cntr.find( element ).each( function(){
							cntr.find( element ).data( 'counting', false );
							var c = $( this ).data( 'counter' );
							c.clearCounter();
						});
					}
				});
			});
		},
		carouselSlider: function(){
			$( carouselSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				scaleMinHeight: 'auto',
				carousel: true,
				carouselVisible: 3,
				lazyLoad: false,
				navArrows: false,
				navPagination: true,
				navShowOnHover: false,
				retinaSupport: false
			});
		},
		contentSlider: function(){
			$( contentSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				scaleMinHeight: 'auto',
				lazyLoad: true,
				navArrows: true,
				navPagination: true,
				navShowOnHover: false,
				retinaSupport: false
			});
		},
		fullScreenSlider: function(){
			$( fullScreenSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				fullscreen: true,
				captionScaling: false,
				lazyLoad: true,
				navArrows: true,
				navPagination: true,
				navShowOnHover: true,
				respectRatio: false,
				retinaSupport: false
			});
		},
		fullWidthSlider: function(){
			$( fullWidthSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				forceFit: false,
				fullwidth: true,
				scaleUnder: 960,
				captionScaling: true,
				lazyLoad: true,
				navArrows: true,
				navPagination: true,
				navShowOnHover: true,
				respectRatio: false,
				retinaSupport: false
			});
		},
		logoSlider: function(){
			$( logoSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: true,
				carousel: true,
				carouselVisible: 5,
				carouselScaleHeight: true,
				navArrows: false,
				navPagination: true,
				showProgressBar: false,
				navShowOnHover: false,
				retinaSupport: false
			});
		},
		heroSlider: function(){
			$( heroSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 700,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 1,
				captionScaling: false,
				forceFit: true,
				scaleUnder: 480,
				scaleMinHeight: 480,
				fullwidth: true,
				navArrows: false,
				navPagination: true,
				retinaSupport: true
			});
		},
		testimonialSlider: function(){
			$( testimonialSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				scaleMinHeight: 'auto',
				carousel: true,
				carouselVisible: 1,
				carouselScaleHeight: true,
				lazyLoad: false,
				navArrows: false,
				navPagination: true,
				navShowOnHover: false,
				retinaSupport: false
			});

			//API call for prev/next buttons
			var testimonialSliderAPI = $( testimonialSlider ).data( 'avalancheSlider' );
			$( tstmlSliderPrev ).on( 'click', function( event ){
				event.preventDefault();
				testimonialSliderAPI.prevSlide();
			});
			$( tstmlSliderNext ).on( 'click', function( event ){
				event.preventDefault();
				testimonialSliderAPI.nextSlide();
			});
		},
		teamSlider: function(){
			$( teamSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 3,
				carouselScaleHeight: true,
				lazyLoad: false,
				navArrows: false,
				navPagination: true,
				navShowOnHover: false,
				retinaSupport: false
			});

			//API call for prev/next buttons
			var teamSliderAPI = $( teamSlider ).data( 'avalancheSlider' );
			$( tSliderPrev ).on( 'click', function( event ){
				event.preventDefault();
				teamSliderAPI.prevSlide();
			});
			$( tSliderNext ).on( 'click', function( event ){
				event.preventDefault();
				teamSliderAPI.nextSlide();
			});
		},
		portfolioSlider: function(){
			$( portfolioSlider ).avalancheSlider({
				animation: 'slide',
				easing: 'easeInOutQuart',
				speed: 900,
				autoAdvance: false,
				carousel: true,
				carouselVisible: 3,
				carouselScaleHeight: true,
				lazyLoad: true,
				navArrows: false,
				navPagination: false,
				navShowOnHover: false,
				retinaSupport: false
			});

			//API call for prev/next buttons
			var portfolioSliderAPI = $( portfolioSlider ).data( 'avalancheSlider' );
			$( psSliderPrev ).on( 'click', function( event ){
				event.preventDefault();
				portfolioSliderAPI.prevSlide();
			});
			$( psSliderNext ).on( 'click', function( event ){
				event.preventDefault();
				portfolioSliderAPI.nextSlide();
			});
		},
		lightbox: function(){
			$( ligthboxLink ).summitLightbox({
				lightboxAnimation: 'slideInTop',
				contentAnimation: 'slide',
				slideAmount: 100,
				easing: 'swing',
				speed: 350
			});
		},
		videos: function(){
			fluidvids.init({
			  selector: selectors,
			  players: players
			});
		},
		mediaElement: function(){
			$( mejsPlayers ).each( function(){
				var isAudio = false;
				if( $( this ).is( 'audio' ) ) isAudio = true;
				$( this ).mediaelementplayer({
					features: isAudio ? ['playpause','progress','volume','fullscreen'] : ['playpause','progress','current','duration','tracks','volume','fullscreen'],
					videoWidth: '100%',
					videoHeight: '100%',
					audioWidth: '100%',
					videoVolume: 'vertical',
					audioVolume: 'horizontal'
				});
			});
		},
		siteHeader: function(){
			var winW;
			var winH;
			var headerWrapperH;
			var thresholdBkg;
			var thresholdHeight;
			var thresholdSticky;
			var thresholdHeadIn ;
			var thresholdHeadOut;
			var lastPos = 0;
			var currentPos;
			var breakpoint = 960;
			var headerWrapper = $( header );
			var fixedHeightHeader = '.header-2, .header-3';

			// Strip '.'
			headerAnimated = headerAnimated.split('.').join('');
			headerSticky = headerSticky.split('.').join('');
			headerBackground = headerBackground.split('.').join('');
			headerCompact = headerCompact.split('.').join('');
			headerHeadIn = headerHeadIn.split('.').join('');
			headerHeadOut = headerHeadOut.split('.').join('');
			headerInitPosition = headerInitPosition.split('.').join('');

			// Get data references
			function updateHeaderData(){
				 winW = $( window ).width();
				 winH = $( window ).height();
				 headerWrapperH = Math.ceil( headerWrapper.outerHeight() );
				 thresholdBkg = headerWrapper.data( 'bkg-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'bkg-threshold' );
				 thresholdHeight = headerWrapper.data( 'compact-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'compact-threshold' );
				 thresholdSticky = headerWrapper.data( 'sticky-threshold' ) === 'window-height' ? winH - headerWrapperH : headerWrapper.data( 'sticky-threshold' );
				 thresholdHeadIn = headerWrapper.data( 'helper-in-threshold' );
				 thresholdHeadOut = headerWrapper.data( 'helper-out-threshold' );
			}

			// Desktop - on scroll
			// Swap header classes for animation
			var onPageScroll = function( win ){
				
				// Check device
				if ( $( 'body' ).hasClass( 'mobile' ) || winW < breakpoint ) return false;

				// Sticky
				if ( thresholdSticky && $( win ).scrollTop() >= thresholdSticky || thresholdSticky === 0 ) {
					$( header ).addClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).addClass( headerInitPosition );
				}else{
					$( header ).removeClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).removeClass( headerInitPosition );
				}

				// Background
				if ( thresholdBkg && $( win ).scrollTop() >= thresholdBkg ) {
					$( header ).addClass( headerBackground );
					
				} else {
					$( header ).removeClass( headerBackground );
				}

				// Compact
				if ( thresholdHeight && $( win ).scrollTop() >= thresholdHeight ) {
					$( header ).addClass( headerCompact );
				} else {
					$( header ).removeClass( headerCompact );
				}

				// Helpers - generic classes for extra styling/animation
			 	currentPos = $( win ).scrollTop();

			   // Scrolling down
			   if ( currentPos > lastPos ){
					if ( thresholdHeadIn && $( win ).scrollTop() >= thresholdHeadIn ) {
						$( header ).addClass( headerHeadIn );
					}
					$( header ).removeClass( headerHeadOut );

				// Scrolling up
			   }else if( currentPos < lastPos ){
					if ( thresholdHeadIn && $( win ).scrollTop() <= thresholdHeadIn ) {
						$( header ).removeClass( headerHeadIn );
						$( header ).removeClass( headerHeadOut );
			  		}
					if ( thresholdHeadIn && $( win ).scrollTop() >= thresholdHeadIn && $( win ).scrollTop() <= thresholdHeadOut ) {
						$( header ).addClass( headerHeadOut );
						$( headerHeadOut ).on( transitionEnd, function( event ){
							event.stopPropagation();
							if( event.target !== $( win )[0] ) return false;
							$( header ).removeClass( headerHeadOut );
						});
					}
			  	}
			   lastPos = currentPos;
			};

			// Desktop - on resize
			var onPageResize = function( win ){

				// Update width and height
				updateHeaderData();

				// Check device
				if ( $( 'body' ).hasClass( 'mobile' ) ) return false;

				// Height
				if( winW > breakpoint && headerWrapper.is( fixedHeightHeader ) ){
					headerWrapper.css({ height: headerWrapper.outerHeight() + 'px' });
				}

				// Sticky
				if ( winW > breakpoint && $( window ).scrollTop() >= thresholdSticky ) {
					$( header ).addClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).addClass( headerInitPosition );
				}else{
					$( header ).removeClass( headerSticky );
					if ( thresholdHeadIn && thresholdHeadOut) $( header ).removeClass( headerInitPosition );
				}

				// Background
				if( winW > breakpoint && $( window ).scrollTop() < thresholdBkg ){
					$( header ).removeClass( headerBackground );
				}else if(winW > breakpoint && $( window ).scrollTop() > thresholdBkg ){
					$( header ).addClass( headerBackground );
				}

				// Compact
				if( winW > breakpoint && $( window ).scrollTop() < thresholdHeight ){
					$( header ).removeClass( headerCompact );
				}else if(winW > breakpoint && $( window ).scrollTop() > thresholdHeight ){
					$( header ).addClass( headerCompact );
				}
				if( winW < breakpoint ) {
					$( header ).removeClass( headerCompact );
				}
			};

			// Window Events
			$( window ).on( 'scroll', function(){
				onPageScroll( $( this ) );
			});

			$( window ).on( 'resize', function(){
				onPageResize();
			});

			// Desktop - on startup
			if( !$( 'body' ).hasClass( 'mobile' ) ){
				$( window ).one( 'load', function(){
					updateHeaderData();

					// Show
					onPageScroll( $( this ) );

					// Set height
					if ( winW > breakpoint && headerWrapper.is( fixedHeightHeader ) ) {
						headerWrapper.css({ height: headerWrapperH + 'px' });
					}

					// Add animation class to header
					$( header ).addClass( headerAnimated );
				});
			}
		},
		fullScreenSection: function(){

			// Fullscreen section nav
			var fsNavigation = function(){
				var sectionId;

				// Check there is more than one section
				// and that window is greater that 960
				if( $( fsSectionWrapper ).find( fsSection ).length > 1 ){

					if ( $( 'body' ).hasClass( 'mobile' ) ) return false;
					var nav = !$( fsSectionWrapper ).hasClass( 'no-navigation' ) ? true : false;
					var pagination;

					// Build nav
					if( nav ){
						pagination = $( '<div>' ).addClass( 'fs-pagination' ).appendTo( $( fsSectionWrapper ) );
						for( var i = 1; i < $( fsSectionWrapper ).children().length; i++ ) {
							sectionId = $( fsSectionWrapper ).children().eq( i-1 ).attr( 'id' );
							$( fsSectionWrapper ).find( '#' + sectionId ).data( 'index', i );
							$( fsSectionWrapper ).find( pagination ).append( '<a href="#'+ sectionId + '" id="fs-pagination-' + i + '" data-index="' + i + '" class="fs-bullet-nav" />' );
						}

						// Position based on height and show
						$( window ).on( 'resize', function(){
							positionNav();
						});

						var positionNav = function(){
							$( pagination ).css({ marginTop: -$( pagination ).outerHeight() / 2 + 'px', opacity: 1 });
						};
						positionNav();

						// On click
						var fsNav = $( fsSectionWrapper ).find( '.fs-bullet-nav' );
						fsNav.each( function(){
							$( this ).on( 'click', function( event ){
								event.preventDefault();
								if( $( this ).hasClass( 'active' ) ) return false;
								var index = parseFloat( $( this ).data( 'index' ) );
								sectionId =  $( this ).attr( 'href' );
								templateFunctions.scrollPage( sectionId, 0 );
							});
						});
					}

					// Check visibility of sections
					$( window ).on( 'scroll', function(){
						$( fsSectionWrapper ).find( fsSection ).each( function(){
							requestScroll( $( this ) );
						});
					});
					var requestScroll = function( element ){
						if ( !element.data( 'fs-scrolling' ) ) {
							window.requestAnimationFrame( function () {
								updateElementState( element );
							});
							element.data( 'fs-scrolling', true );
						}
					};
					var updateElementState = function( element ){

						// Swap
						if( templateFunctions.isElementVisible( element, pageThreshold ) && nav ){
							$( pagination ).css({ opacity: 1 });
							var index = $( fsSectionWrapper ).find( element ).data( 'index' );
							pagination.find( '.active' ).removeClass( 'active' );
							pagination.find( '#fs-pagination-' + index ).addClass( 'active' );
							if( element.hasClass( 'nav-dark' ) ){
								pagination.addClass( 'nav-dark' );
							}else{
								pagination.removeClass( 'nav-dark' );
							}
						}

						// Hide nav if no fullscreen section are in view
						if( nav ){
							if( $( window ).scrollTop() > $( fsSectionWrapper ).outerHeight() - ( $( window ).height()/2 + $( pagination ).outerHeight() / 2 ) ){
								$( pagination ).css({ opacity: 0, visibility: 'hidden' });
							}else{
								$( pagination ).css({ opacity: 1, visibility: 'visible' });
							}
						}
						element.data( 'fs-scrolling', false );
					};

					// Set active on startup
					$( fsSectionWrapper ).find( fsSection ).each( function(){
						requestScroll( $( this ) );
					});
				}
			};

			// Scale background image proportionally on mobile
			var scaleBkgImage = function(){
				$( fsSection ).each( function(){
					var bkgFsWrapper = $( this );
					var bkgImg = $( this ).find( '.background-image' );
					if( $( this ).is( '[data-width],[data-height]' ) ){
						if( $( 'body' ).hasClass( 'mobile' ) ||  winW <= 768 ){
							bkgFsWrapper.addClass( 'fs-image-scale content-below-on-mobile' );
							var refW = bkgFsWrapper.data( 'width' );
							var refH = bkgFsWrapper.data( 'height' );
							var minHeight = bkgFsWrapper.data( 'min-height' );
							var wrapperW = bkgFsWrapper.width();
							var ratio = refW >= refH ? refW / refH : refH / refW;
							var height = refW >= refH ? wrapperW / ratio : wrapperW  * ratio;
							height = height <= minHeight ? minHeight : height;
							bkgFsWrapper.css({ height: 'auto' });
							bkgImg.css({ height: height + 'px', minHeight: height + 'px' });
						}else{
							bkgFsWrapper.removeClass( 'fs-image-scale' );
							bkgFsWrapper.css({ height: '' });
							bkgImg.css({ height: '', minHeight: '' });
						}
					}else{
						if( $( 'body' ).hasClass( 'mobile' ) ||  winW <= 768 ){
							bkgImg.css({ height: winH + 'px' });
						}else{
							bkgFsWrapper.removeClass( 'fs-image-scale' );
							bkgFsWrapper.css({ height: '' });
							bkgImg.css({ height: '', minHeight: '' });
						}
					}
				});
			};

			// Fullscreen sections mobile
			var winW = $( window ).width();
			var winH = $( window ).height();
			$( window ).on( 'resize', function(){
				winW = $( window ).width();
				winH = $( this ).height();
				scaleBkgImage();
			}).resize();

			fsNavigation();
		},
		scrollToSection: function(){
			var sectionsArray = [];
			$( scrollLink ).each( function(){

				// Push section IDs into array for later use
				sectionsArray.push( $( this ).attr( 'href' ) );

				// Scroll on click
				$( this ).on( 'click', function( event ){
					event.preventDefault();
					var section = $( this ).attr( 'href' );
					var offset = $( this ).data( 'offset' ) ? $( this ).data( 'offset' ) : 0;
					templateFunctions.scrollPage( section, offset );
				});
			});

			// Check visibility of sections upon load
			$( window ).one( 'load', function(){
				$.each( sectionsArray, function( index, sectionId ) {
				 	requestScroll( $( sectionId ) );
				});
			});

			// Check visibility of sections upon scrolling
			$( window ).on( 'scroll', function(){
				$.each( sectionsArray, function( index, sectionId ) {
				 	requestScroll( $( sectionId ) );
				});
			});

			var requestScroll = function( element ){
				if ( !element.data( 'section-scrolling' ) ) {
					window.requestAnimationFrame( function () {
						updateElementState( element );
					});
					element.data( 'section-scrolling', true );
				}
			};
			var updateElementState = function( element ){

				// Swap current link if it's in
				// the main menu
				if( templateFunctions.isElementVisible( element,pageThreshold ) ){
					var sectionId = element.attr( 'id' );
					var mainMenu = $( 'a[href="#' + sectionId + '"]' ).closest( 'header, .side-navigation-wrapper, .overlay-navigation-wrapper' );
					if( mainMenu ){
						$( 'a[href="#' + sectionId + '"]' ).closest( 'header, .side-navigation-wrapper, .overlay-navigation-wrapper' ).find( scrollLink ).parent().removeClass( 'current' );
						$( 'a[href="#' + sectionId + '"]' ).parent().addClass( 'current' );
					}
				}
				element.data( 'section-scrolling', false );
			};
		},
		isElementVisible: function( element, threshold ){
			var winH = $( window ).height();
			var winTop = $( window ).scrollTop();
			var winBottom = winTop + $( window ).height();
			var offsetTop = element.offset().top;
			var elH = element.height();
			var elBottom = ( offsetTop + element.outerHeight() - ( winH * threshold ) );
			var elTop = offsetTop + ( winH * threshold );

			// If visible add class
			if( winBottom >= elTop && winTop <= elBottom ){
				element.addClass( 'in-view' );
			}else{
				element.removeClass( 'in-view' );
			}
			return ( winBottom >= elTop && winTop <= elBottom );
		},
		scrollPage: function( target, offset ){
			$( 'html, body' ).animate({ scrollTop: $( target ).offset().top + offset }, pageScrollSpeed, pageEasing );
		},
		masonry: function(){
			$( msnryGrid ).each( function(){

				var grid = $( this );
				var colWidth;

				// Check grid type and set width accordingly
				if( grid.closest( '.section-block' ).is( '.portfolio-5, .portfolio-6, .masonry-set-dimensions' ) ){
					if( grid.closest( '.section-block' ).is( '.full-width.no-margins') ){
						templateFunctions.masonryWrapperWidth( grid );
					}
					colWidth = templateFunctions.masonryColWidth( grid );
					templateFunctions.masonryThumbSizes( grid, templateFunctions.masonryColWidth( grid ) );
				}else{
					colWidth = '.grid-sizer';
				}

				// Call masonry once images have loaded
				imagesLoaded( grid, function() {
					grid.isotope({
						filter: '*',
						itemSelector: '.grid-item',
						isResizeBound: msnryTransResize ? true : false,
						transitionDuration: msnryTransDuration,
						stamp: '.masonry-stamp',
						masonry: {
							// Specify grid item reference
							// Class added to the item selector.
							columnWidth: colWidth
						}
					});

					// Check if items should be faded in progressively
					grid.css({ visibility: 'visible', minHeight: 'initial' });
					var gridLength = grid.children().length -1;
					if( !$( 'body' ).hasClass( 'transition-support' ) ) grid.removeClass( 'fade-in-progressively' );
					grid.children().each( function( index ) {
					    $( this ).delay( 100 * index ).animate({ opacity: 1 }, 500, 'easeInOutQuart', function(){
					    	if( index === gridLength ) grid.removeClass( 'fade-in-progressively' );
					    });
					});

					// On resize
					$( window ).on( 'resize', function(){
						if( grid.closest( '.section-block' ).is( '.full-width.no-margins') ){
							templateFunctions.masonryWrapperWidth( grid );
						}
						templateFunctions.masonryThumbSizes( grid, templateFunctions.masonryColWidth( grid ) );
						if( !msnryTransResize ){
							grid.removeClass( 'filtering' );
							grid
										.isotope({
											transitionDuration: 0,
											masonry: {
												columnWidth: colWidth !== '.grid-sizer' ? templateFunctions.masonryColWidth( grid ) : '.grid-sizer'
											}
										})
										.isotope('layout')
										.isotope({
											transitionDuration: msnryTransDuration
										});
						}else{
							grid
										.isotope({
											transitionDuration: msnryTransDuration,
											masonry: {
												columnWidth: colWidth !== '.grid-sizer' ? templateFunctions.masonryColWidth( grid ) : '.grid-sizer'
											}
										});
						}
					});
				});
			});

			// Filtering
			$( msnryFilterMenu ).each( function(){
				$( this ).find( 'a' ).on( 'click', function( event ) {
					event.preventDefault();
					$( this ).closest( msnryFilterMenu ).find( '.active' ).removeClass( 'active' );
					$( this ).addClass( 'active' );
					var targetGrid = $( this ).closest( msnryFilterMenu ).data( 'target-grid' ) ? $( this ).closest( msnryFilterMenu ).data( 'target-grid' ) : $( '[class*="portfolio-"]' ).find( '.masonry-grid' );
					var filterValue = $( this ).attr( 'data-filter' );
					$( targetGrid ).addClass( 'filtering' ).isotope({ filter: filterValue });
				});
			});
		},
		masonryWrapperWidth: function( grid ){
			var gridWidth = Math.ceil( grid.closest( '.section-block' ).width() * 1.001 );
			grid.css({ maxWidth: gridWidth + 'px', width: gridWidth + 'px' });
		},
		masonryColWidth: function( grid ){
			var colWidth;
			var winW = $( window ).width();
			var wrapperW = Math.ceil( grid.closest( '.section-block' ).width() );
			var gridWidth = grid.closest( '.section-block' ).is( '.full-width.no-margins' ) ?  Math.ceil( wrapperW * 1.001 ) : grid.width();

			// Break columns differently if
			// the grid is full width, has small or no margins
			if( grid.closest( '.section-block' ).is( '.full-width.small-margins, .full-width.no-margins' ) ){
				if( grid.hasClass( 'content-grid-2') ) colWidth = winW >= 480 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-3') ) colWidth = winW > 768 ? gridWidth / 3 : winW <= 768 && winW > 480 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-4') ) colWidth = winW > 1140 ? gridWidth / 4 : winW <= 1140 && winW > 768 ? gridWidth / 3 : winW <= 768 && winW > 480 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-5') ) colWidth = winW > 1300 ? gridWidth / 5 : winW <= 1300 && winW > 1140 ? gridWidth / 4 : winW <= 1140 && winW >= 768 ? gridWidth / 3 : winW <= 768 && winW > 480 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-6') ) colWidth = winW > 1300 ? gridWidth / 6 : winW <= 1300 && winW > 1140 ? gridWidth / 4 : winW <= 1140 && winW >= 768 ? gridWidth / 3 : winW <= 768 && winW > 480 ? gridWidth / 2 : gridWidth / 1;
			}else{
				if( grid.hasClass( 'content-grid-2') ) colWidth = winW >= 600 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-3') ) colWidth = winW > 960 ? gridWidth / 3 : winW <= 960 && winW > 600 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-4') ) colWidth = winW > 1140 ? gridWidth / 4 : winW <= 1140 && winW > 960 ? gridWidth / 3 : winW <= 960 && winW > 600 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-5') ) colWidth = winW > 1300 ? gridWidth / 5 : winW <= 1300 && winW > 1140 ? gridWidth / 4 : winW <= 1140 && winW > 960 ? gridWidth / 3 : winW <= 960 && winW > 600 ? gridWidth / 2 : gridWidth / 1;
				if( grid.hasClass( 'content-grid-6') ) colWidth = winW > 1300 ? gridWidth / 6 : winW <= 1300 && winW > 1140 ? gridWidth / 4 : winW <= 1140 && winW > 960 ? gridWidth / 3 : winW <= 960 && winW > 600 ? gridWidth / 2 : gridWidth / 1;
			}

			// Base values
			colWidth =  Math.floor( colWidth );
			return colWidth;
		},
		masonryThumbSizes: function( grid, width ){
			var height;
			var winW = $( window ).width();
			var multiplier = 2;
			var gutter = !$( '.portfolio-5, .masonry-set-dimensions' ).hasClass( 'no-margins' ) ? parseFloat( grid.find( '.grid-item' ).css( 'padding-left' ) ) : 0;
			var imgRatio = !grid.closest( '.section-block' ).is( '.portfolio-5, .masonry-set-dimensions' ) ? 1 : grid.is( '[data-grid-ratio]' ) ? parseFloat( grid.data( 'grid-ratio' ) ) : 1.5;

			// Calculate reference height
			height = Math.floor( ( ( width - gutter ) / imgRatio ) + gutter );

			// Set dimensions
			
			// Grid type 5
			if( grid.closest( '.section-block' ).is( '.portfolio-5, .masonry-set-dimensions' ) ){
				var breakpoint =  grid.closest( '.section-block' ).is( '.full-width.small-margins, .full-width.no-margins' ) ? 480 : 600;
				grid.find( msnryGridItem ).each( function(){
					if( $( this ).is( '.large, .masonry-stamp.large' ) ){
						if( !$( this ).is( '.portrait, .masonry-stamp.portrait' ) ){
							$( this ).css({
								width: winW > breakpoint ? Math.floor( width * multiplier ) + 'px' : width + 'px',
								height: winW > breakpoint ? Math.floor( height * multiplier ) + 'px' : height + 'px'
							});
						}else{
							$( this ).css({
								width: winW > breakpoint ? Math.floor( width * multiplier ) + 'px' : width + 'px',
								height: winW > breakpoint ? Math.floor( height * ( multiplier * 2 ) ) + 'px' : height * 2 + 'px'
							});
						}
					}else{
						if( $( this ).is( '.portrait, .masonry-stamp.portrait' ) ){
							$( this ).css({
								width: width + 'px',
								height: Math.floor( ( height * multiplier ) ) + 'px'
							});
						}else{
							$( this ).css({
								width: width + 'px',
								height: height + 'px'
							});
						}
					}
				});
			}

			// Grid type 6
			if( grid.closest( '.section-block' ).is( '.portfolio-6' ) ){
				if( winW > 600 ){
					grid.find( msnryGridItem ).each( function(){
						if( $( this ).hasClass( 'horizontal' ) ){
							if( $( this ).hasClass( 'two-third' ) ){
								if( $( this ).children( '.item-description' ).length ){
									$( this ).css({
										width: Math.floor( width * ( multiplier + 1 ) ) + 'px',
										height: Math.floor( height ) + 'px'
									});
								}else{
									$( this ).addClass( 'no-description' ).css({
										width: Math.floor( width * multiplier ) + 'px',
										height: Math.floor( height ) + 'px'
									});
								}
							}else{
								$( this ).css({
									width: Math.floor( width * multiplier ) + 'px',
									height: Math.floor( height ) + 'px'
								});
							}
						}else if( $( this ).hasClass( 'vertical' ) ) {
							if( $( this ).hasClass( 'two-third' ) ){
								if( $( this ).children( '.item-description' ).length ){
									$( this ).css({
										width: width + 'px',
										height: Math.floor( width * ( multiplier + 1 ) ) + 'px'
									});
								}else{
									$( this ).css({
										width: width + 'px',
										height: Math.floor( height * multiplier ) + 'px'
									});
								}
							}else{
								$( this ).css({
									width: width + 'px',
									height: Math.floor( height * multiplier ) + 'px'
								});
							}
						}else{
							$( this ).css({
								width: width + 'px',
								height: Math.floor( height ) + 'px'
							});
						}
					});
				}else{

					// Clear width and height
					grid.find( msnryGridItem ).each( function(){
						if( $( this ).find( 'iframe, video, .tm-slider-container').length ){
							$( this ).css({
								width: width + 'px',
								height: height + 'px'
							});
						}else{
							$( this ).css({
								width: '',
								height: ''
							});
						}
					});
				}
			}
		},
		signupForm: function(){
			$( signupForm ).submit( function( event ){

				event.preventDefault();

				// References
				var form = $( this );
				var responseMessage = form.parent().find( formResponse );
				var fromElements = form.find( formElement );
				var emailField = form.find( 'input[type="email"]' );
				var honeypot = form.find( formHoneypot );
				var submit = form.find( formSubmit );

				// Check action, method and
				// serialize input
				var formUrl = form.attr( 'action' );
				var formMethod = form.attr( 'method' );
				var formData = form.serialize();

				// Validation flags
				var emptyFields = false;
				var filledFields = false;
				var validEmail = false;

				// Clear error class
				signupRequired = signupRequired.split('.').join('');
				fromElements.removeClass( signupRequired );

				// Empty fields
				fromElements.each( function(){
					if( $( this ).attr( 'required' ) ){
						if( !$( this ).val() ){
							emptyFields = true;
							$( this ).addClass( signupRequired );
							responseMessage
											.hide()
											.text( signupFormFillFields )
											.fadeIn( 200 );
						}
					}
				});
				if ( !emptyFields ) filledFields = true;

				// Invalid email
				if( emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( signupFormValidEmail )
									.fadeIn( 200 );
					emailField.addClass( signupRequired );
				}else{
					validEmail = true;
				}

				// Check honeypot
				if( honeypot.val() !== '' ) return false;

				// If empty fields and invalid
				// email merge messages
				if( emptyFields && emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( signupFormFillFields + ' ' + signupFormValidEmail )
									.fadeIn( 200 );
				}
				if( filledFields && validEmail ){

					// Change submit text
					var submitValue = $( submit ).val();
					$( submit )
								.css({ width: $( submit ).outerWidth() + 'px' })
								.val( signupFormSendingButton )
								.attr( 'disabled', true );

					// Sending Message
					responseMessage
									.hide()
									.text( signupFormSending )
									.fadeIn( 200 );

					// Send
					$.ajax({
							url: formUrl,
							type: formMethod,
							data: formData,
							dataType: 'json'
					}).done( function( data ){
						try {
							if( data.response === true ){

								// Set success message
								responseMessage.text( signupFormSuccess );
								responseMessage
									.delay( 1500 )
									.fadeOut( 200 );
								fromElements.val('');
							} else {

								// Set error message
								responseMessage
									.hide()
									.text( data.json.error_message )
									.fadeIn( 200 );
							}		
						} catch ( e ) {
							console.log( 'error in parsing returned ajax data: '+ e );

							// Set error message
							responseMessage
								.hide()
								.text( 'Error occurred. Please see the console for details.' )
								.fadeIn( 200 );
						}						
					}).fail( function( jqXHR, textStatus, errorThrown ){
						console.log( 'Error occured in processing your request:' );
						console.log( jqXHR );
						console.log( 'Text status' );
						console.log( textStatus );
						console.log( 'Error thrown' );
						console.log( errorThrown );
						console.log( 'Servre response' );
						console.log( jqXHR.status );
						console.log( 'Response Text may contain error output from PHP' );
						console.log( jqXHR.responseText );

						// Set error message
						responseMessage
							.hide()
							.text( signupFormError + textStatus + ' (' + errorThrown + ')' )
							.fadeIn( 200 );
					}).always(function(){

						// Revert button value
						$( submit )
							.css({ width: '' })
							.val( submitValue )
							.attr( 'disabled', false );
					});
				}
			});
		},
		contactForm: function(){
			$( contactForm ).submit( function( event ){

				event.preventDefault();

				// References
				var form = $( this );
				var responseMessage = form.parent().find( formResponse );
				var fromElements = form.find( formElement );
				var emailField = form.find( 'input[type="email"]' );
				var honeypot = form.find( formHoneypot );
				var submit = form.find( formSubmit );

				// Check action, method and
				// serialize input
				var formUrl = form.attr( 'action' );
				var formMethod = form.attr( 'method' );
				var formData = form.serialize();

				// Validation flags
				var emptyFields = false;
				var filledFields = false;
				var validEmail = false;

				// Clear error class
				contactRequired = contactRequired.split('.').join('');
				fromElements.removeClass( contactRequired );

				// Empty fields
				fromElements.each( function(){
					if( $( this ).attr( 'required' ) ){
						if( !$( this ).val() ){
							emptyFields = true;
							$( this ).addClass( contactRequired );
							responseMessage
											.hide()
											.text( contactFormFillFields )
											.fadeIn( 200 );
						}
					}
				});
				if ( !emptyFields ) filledFields = true;

				// Invalid email
				if( emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( contactFormValidEmail )
									.fadeIn( 200 );
					emailField.addClass( contactRequired );
				}else{
					validEmail = true;
				}

				// Check honeypot
				if( honeypot.val() !== '' ) return false;

				// If empty fields and invalid
				// email merge messages
				if( emptyFields && emailField.val() && !templateFunctions.isValidEmail( emailField.val() ) ){
					responseMessage
									.hide()
									.text( contactFormFillFields + ' ' + contactFormValidEmail )
									.fadeIn( 200 );
				}
				if( filledFields && validEmail ){

					// Change submit text
					var submitValue = $( submit ).val();
					$( submit )
								.css({ width: $( submit ).outerWidth() + 'px' })
								.val( contactFormSendingButton )
								.attr( 'disabled', true );

					// Sending Message
					responseMessage
									.hide()
									.text( contactFormSending )
									.fadeIn( 200 );

					// Send
					$.ajax({
						url: formUrl,
						type: formMethod,
						data: formData,
						dataType: 'json'
					}).done( function( data ){
						try {
							if( data.response === true ){
								
								// Set success message
								responseMessage.text( contactFormSuccess );
								responseMessage
												.delay( 1500 )
												.fadeOut( 200 );
								fromElements.val('');
							} else {
								
								// Set error message
								var errorMessage = (typeof data.json.error_message == 'undefined' ) ? 'There is a possibility that your message was not sent. Please check up the server or script configuration.' : data.json.error_message ;
								responseMessage
												.hide()
												.text( contactFormError + ' ' + errorMessage  )
												.fadeIn( 200 );
							}		
						} catch ( e ) {
							console.log( 'error in parsing returned ajax data: '+ e );
							console.log(data);
							
							// Set error message
							responseMessage
								.hide()
								.text( 'Error occurred. Please see the console for details.' )
								.fadeIn( 200 );
						}
					}).fail( function( jqXHR, textStatus, errorThrown ){
						console.log( 'Error occured in processing your request:' );
						console.log( jqXHR );
						console.log( 'Text status' );
						console.log( textStatus );
						console.log( 'Error thrown' );
						console.log( errorThrown );
						console.log( 'Servre response' );
						console.log( jqXHR.status );
						console.log( 'Response Text may contain error output from PHP' );
						console.log( qXHR.responseText );
						
						// Set error message
						responseMessage
							.hide()
							.text( contactFormError + ' (Please see the console for error details.)' )
							.fadeIn( 200 );
					}).always(function(){
						
						// Revert button value
						$( submit )
							.css({ width: '' })
							.val( submitValue )
							.attr( 'disabled', false );
					});
				}
			});
		},
		isValidEmail: function( email ){
			var addressCheck = new RegExp( /^[_\.0-9a-zA-Z-]+@([0-9a-zA-Z][0-9a-zA-Z-]+\.)+[a-zA-Z]{2,6}$/i );
			return addressCheck.test( email );
		},
		enablePlaceHolder: function(){
			$( 'input, textarea' ).placeholder();
		},
		googleMap: function(){

			// Check grayscale option
			var grayscale = mapGrayScale ? -100 : 0;

			// Map options
			var mapOptions = {
				zoom: mapZoomLevel,
				center: new google.maps.LatLng( mapLocations[0][0], mapLocations[0][1] ),
				mapTypeControl: mapTypeCtrl,
				mapTypeControlOptions: {
					style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
					position: google.maps.ControlPosition.TOP_RIGHT
				},
				panControl: mapPanCtrl,
				panControlOptions: {
					position: google.maps.ControlPosition.TOP_LEFT
				},
				zoomControl: mapZoomCtrl,
				zoomControlOptions: {
					style: google.maps.ZoomControlStyle.SMALL,
					position: google.maps.ControlPosition.LEFT_TOP
				},
				scrollwheel: mapZoomMseWheel,
				scaleControl: mapScaleCtrl,
				streetViewControl: mapStreetViewCtrl,
				streetViewControlOptions: {
					position: google.maps.ControlPosition.LEFT_TOP
				},
				// Add styles as necessary
				styles:[ { stylers:[ { saturation: grayscale } ] } ]
			};

			// Get map wrapper id
			var map = new google.maps.Map( document.getElementById( 'map-canvas' ), mapOptions );

			// Add markers
			var locationMarker;
			var infowindow;
			var iconNum = 0;
			for ( var i = 0; i < mapLocations.length; i++ ) {
					locationMarker = new google.maps.Marker({
					position: new google.maps.LatLng(mapLocations[i][0], mapLocations[i][1]),
					map: map,
					icon: new google.maps.MarkerImage( mapIcon[ iconNum ], null, null, null, new google.maps.Size( mapIconW, mapIconH ) )
				});

				// Create info window
				infowindow = new google.maps.InfoWindow({
					content: mapInfoContnet[ i ]
				});

				// Add click event for markers
				google.maps.event.addListener( locationMarker, 'click', ( function( locationMarker, i ) {
					return function() {
						infowindow.setContent( mapInfoContnet[ i ] );
						infowindow.open( map, locationMarker );
					};
				})( locationMarker, i ));

				// count
				iconNum++;
			}

			// On resize event center map
			google.maps.event.addDomListener( window, 'resize', function() {
				var mapCenter = map.getCenter();
				google.maps.event.trigger( map, 'resize' );
				map.setCenter( mapCenter );
			});
		},
		pageFade: function(){
			if( !pageFadeLocation ) return false;
			$( launchLink ).not( excludeLink ).on( 'click', function( event ) {
				event.preventDefault();
				var location = this.href;
				if( $( 'body' ).hasClass( 'transition-support' ) ){
					$( page )
							.addClass( 'page-fade-out' )
							.on( transitionEnd, function( event ){
								event.stopPropagation();
								if( event.target !== $( this )[0] ) return false;
								templateFunctions.goToNewPage( location );
							});
				}else{
					templateFunctions.goToNewPage( location );
				}
			});
		},
		goToNewPage: function( location ) {
			window.location = location;
		}
	};

	// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
	// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
	// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
	// MIT license
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for( var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x ) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}
		if ( !window.requestAnimationFrame )
		window.requestAnimationFrame = function( callback, element ) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
				var id = window.setTimeout( function() { callback(currTime + timeToCall); },
				timeToCall);
				lastTime = currTime + timeToCall;
				return id;
		};
		if ( !window.cancelAnimationFrame )
			window.cancelAnimationFrame = function( id ) {
				clearTimeout( id );
			};
	}());

	// Initiate
	templateFunctions.init();
});