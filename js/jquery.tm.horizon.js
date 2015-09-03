/**
*	Horizon
*	Version: 1.0.1
*	URL: @ThemeMountain
*	Description: Reveal Plugin
*	Requires: jQuery 1.10+
*	Author: ThemeMountain
*	Copyright: Copyright 2013 ThemeMountain
*	License: Attribution-NonCommercial 3.0 (http://creativecommons.org/licenses/by-nc/3.0/)
*/

;(function( $, document, window, undefined ) {

	'use strict';

	var Horizon = function( element, options ){

		// Settings
		var settings = $.extend( {}, $.fn.horizon.tmhOpts, options ); 

		// jQuery el
		element = $( element );

		// Mobile - set opacity and visibility
		if( mobile ) {
			element.css({ opacity: 1, visibility: 'visible' });
			return false;
		}

		// Initial data
		element
				.data( 'scrolling', false )
				.css( '-webkit-backface-visibility', 'hidden' );

		// Element animation attributes
		// get and set them
		var startAttrArray = String( element.data( 'animate-in' ) ).split( ';' );
		$.each( startAttrArray , function( i, pair ) {
			pair = pair.split( ':' );
			var k = pair[0];
			var v = pair[1];
			if ( k === 'opacity' ) element.data( 'o', v );
			if ( k === 'scale' ) element.data( 's', v );
			if ( k === 'easing' ) element.data( 'e', v );
			if ( k === 'transX' ) element.data( 'tx', parseFloat( v ) );
			if ( k === 'transY' ) element.data( 'ty', parseFloat( v ) );
			if ( k === 'transZ' ) element.data( 'tz', parseFloat( v ) );
			if ( k === 'rotateX' ) element.data( 'rx', parseFloat( v ) );
			if ( k === 'rotateY' ) element.data( 'ry', parseFloat( v ) );
			if ( k === 'rotateZ' ) element.data( 'rz', parseFloat( v ) );
			if ( k === 'duration' ) element.data( 'du', parseFloat( v ) );
			if ( k === 'delay' ) element.data( 'de', parseFloat( v ) );
		});

		// Add window event
		$( window ).on( 'scroll', function(){
			requestScroll( element, settings );
		});
		$( window ).on( 'resize', function(){
			requestScroll( element, settings );
		});

		// Animate if already in view
		setElementState( element, settings );
		requestScroll( element, settings );
	};

	/**
	*	Prevent rAF from stacking up
	*/

	var requestScroll = function( element, settings ){
		if ( !element.data( 'scrolling' ) ) {
			requestAnimationFrame( function () {
				updateElementState( element, settings );
			});
			element.data( 'scrolling', true );
		}
	};

	/**
	*	Scroll parllax container, its images
	*	and fade images in/out as moving in/out of view
	*/

	var updateElementState = function( element, settings ){
		if( isElementVisible( element, settings ) ){

			// Check duration, delay and timing function
			var duration = element.data( 'du' ) ? element.data( 'du' ) : settings.speed;
			var delay = element.data( 'de' ) ? element.data( 'de' ) : 0;
			var easing = element.data( 'e' ) ? easingArray[ element.data( 'e' ) ] : easingArray[ settings.easing ];

			// Call animate
			if( tSupport ){
				animate( element, 1, 0, 0, 0, 0, 0, 0, 1, duration, delay, easing, settings );
			}else{
				element.css({ visibility: 'visible' }).stop().animate({ opacity: 1 }, settings.speed, settings.easingFallback, function(){

					// Callback
					if( settings.inView ) settings.inView();
				});
			}
		}
		element.data( 'scrolling', false );
	};

	/**
	*	Check for whether element 
	*	is in/out of the viewport
	*/

	var isElementVisible = function( element, settings ){
		var winTop = $( window ).scrollTop();
		var winBottom = winTop + $( window ).height();
		var threshold = element.data( 'threshold' ) ? parseFloat( element.data( 'threshold' ) ) : settings.threshold;
		var transY = element.data( 'ty' ) ? parseFloat( element.data( 'ty' ) ) : 0;
		var offsetTop = element.offset().top;
		var adjustedOffsetTop = ( element.offset().top - transY );
		var elBottom = ( adjustedOffsetTop + element.outerHeight() ) - ( element.outerHeight() * threshold );
		var elTop = adjustedOffsetTop + ( element.outerHeight() * threshold );
		
		// Reposition only if fully outside of bounds
		// remove if resetting of state is required before
		if( offsetTop - winTop > $( window ).height() || offsetTop - winTop < -element.outerHeight() ){
			if( settings.recurring ) setElementState( element, settings );
			
			// Callback
			if( settings.outOfView ) settings.outOfView();
		}
		return ( winBottom >= elTop && winTop <= elBottom );
	};

	/**
	*	Position element
	*/

	var setElementState = function( element, settings ){
		var o = element.data( 'o' ) ? parseFloat( element.data( 'o' ) ) : 0; 
		var tx = element.data( 'tx' ) ? parseFloat( element.data( 'tx' ) ) : 0;
		var ty = element.data( 'ty' ) ? parseFloat( element.data( 'ty' ) ) : 0; 
		var tz = element.data( 'tz' ) ? parseFloat( element.data( 'tz' ) ) : 0; 
		var rx = element.data( 'rx' ) ? parseFloat( element.data( 'rx' ) ) : 0; 
		var ry = element.data( 'ry' ) ? parseFloat( element.data( 'ry' ) ) : 0; 
		var rz = element.data( 'rz' ) ? parseFloat( element.data( 'rz' ) ) : 0; 
		var s = element.data( 's' ) ? parseFloat( element.data( 's' ) ) : 1;
		if( tSupport ) {
			element.css({
					transition: 'none',
					transform : 'translate3d(' + tx + 'px' + ', ' + ty + 'px' + ', ' + tz + 'px' + ')' +
								'rotate3d( 1, 0, 0, ' + rx + 'deg )' +
								'rotate3d( 0, 1, 0, ' + ry + 'deg )' +
								'rotate3d( 0, 0, 1, ' + rz + 'deg )' +
								'scale3d(' + s + ', ' + s + ', ' + s + ')',
					opacity: o,
					visibility: 'hidden'
			});
		}else{
			element.css({ opacity: 0 });
		}
	};

	/**
	*	Animation Handling
	*	@param selector (required) object;
	*	@param opacity - delay (required) integer;
	*	@param easing (required) string;
	*	@param settings (required) array;
	*/

	var animate = function( selector, opacity, transX, transY, transZ, rotateX, rotateY, rotateZ, scale, duration, delay, easing, settings ){

		// Animation magic
		var attrs = {};
		attrs.transform = 'translate3d(' + transX + 'px' + ', ' + transY + 'px' + ', ' + transZ + 'px' + ')' +
							'rotate3d( 1, 0, 0, ' + rotateX + 'deg)' +
							'rotate3d( 0, 1, 0, ' + rotateY + 'deg)' +
							'rotate3d( 0, 0, 1, ' + rotateZ + 'deg)' +
							'scale3d(' + scale + ', ' + scale + ', ' + scale + ')';
		attrs.transitionProperty = transform + ', opacity';
		attrs.transitionDuration = duration + 'ms';
		attrs.transitionDelay = delay + 'ms';
		attrs.transitionTimingFunction = easing;
		attrs.visibility = 'visible';
		attrs.opacity = opacity;
		selector
				.css( attrs )
				.on( transitionEnd, function( event ){
					
					// Prevent bubbling
					event.stopPropagation();
					
					// Remove listener
					$( this ).off( transitionEnd );

					// Callback
					if( settings.inView ) settings.inView();
				});
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
	var transitionDelay = prefix + '-transition-delay';
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
		'easeInOutBack':'cubic-bezier(.68,-.55,.265,1.55)',

		/* Custom Easing */
		'easeFastSlow':'cubic-bezier(.11,.69,.66,1.01)',
		'easeBounceBack':'cubic-bezier(.18,1.92,.59,1.33)',
		'easeBounceBackHard':'cubic-bezier(.8,1.91,0,.94)',
		'easeHickUp':'cubic-bezier(.28,1.78,.01,0)'
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

	// Plugin
	$.fn.horizon = function( options ) {

		// Iterate through each DOM element and return it
		return this.each(function() {

			var element = $( this );

			// Return early if this element already has a plugin instance
			if ( element.data( 'horizon' ) ) return;

			// Pass options
			var horizon = new Horizon( this, options );

			// Store plugin object in this element's data
			element.data( 'horizon', horizon );

		});
	};

	// Default
	$.fn.horizon.tmhOpts = {
		easing: 'swing',				// Easing type: string, see easingArray
		easingFallback: 'swing',		//Easing fallback: for older browser that do not support custom easing
		speed: 500,						// Animation speed: milliseconds 
		threshold: 1,					// Threshold: integer 0-1, how much of element should be visibel before animation begins
		recurring: true,				// Recurring: boolean, if animation should occur over and over on scrolling
		inView: null,					// When element is in view and animation is done
		outOfView: null					// When element is out of view
	};
})( jQuery, document, window );