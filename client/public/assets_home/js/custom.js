$(function() {
	"use strict";
	
	// ______________Loader 
	$("#global-loader").fadeOut("slow");
	
	// ______________Active Class
		$(".horizontalMenu-list li a").each(function () {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().addClass("active"); // add active to li of the current link
				$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
				$(this).parent().parent().prev().click(); // click the item to make it drop
			}
		});

	// ______________ Cover-image
	$(".cover-image").each(function () {
		var attr = $(this).attr('data-bs-image-src');
		if (typeof attr !== typeof undefined && attr !== false) {
			$(this).css('background', 'url(' + attr + ') center center');
		}
	});



	// ______________ Back to Top
	$(window).on("scroll", function (e) {
		if ($(this).scrollTop() > 0) {
			$('#back-to-top').fadeIn('slow');
		} else {
			$('#back-to-top').fadeOut('slow');
		}
	});
	$("#back-to-top").on("click", function (e) {
		$("html, body").animate({
			scrollTop: 0
		}, 0);
		return false;
	});



	// ______________Quantity-right-plus
	var quantity = 0;
	$('.quantity-right-plus').on('click', function (e) {
		e.preventDefault();
		var quantity = parseInt($('#quantity').val());
		$('#quantity').val(quantity + 1);
	});
	$('.quantity-left-minus').on('click', function (e) {
		e.preventDefault();
		var quantity = parseInt($('#quantity').val());
		if (quantity > 0) {
			$('#quantity').val(quantity - 1);
		}
	});

	// ______________Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function () {
			let $this = $(this);
			$this.circleProgress({
				fill: {
					color: $this.attr('data-color')
				},
				size: $this.height(),
				startAngle: -Math.PI / 4 * 2,
				emptyFill: '#f9faff',
				lineCap: ''
			});
		});
	}
	const DIV_CARD = 'div.card';


	// ______________Card Remove
	$('[data-bs-toggle="card-remove"]').on('click', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});

	// ______________Card Collapse
	$('[data-bs-toggle="card-collapse"]').on('click', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________Card Full Screen
	$('[data-bs-toggle="card-fullscreen"]').on('click', function (e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ___________TOOLTIP
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	})

	// __________POPOVER
	var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
	var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
		return new bootstrap.Popover(popoverTriggerEl)
	})
	// By default, Bootstrap doesn't auto close popover after appearing in the page
	$(document).on('click', function (e) {
		$('[data-bs-toggle="popover"]').each(function () {
			if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
				(($(this).popover('hide').data('bs.popover') || {}).inState || {}).click = false  // fix for BS 3.3.6
			}

		});
	});

	// ______________ Modal
		$("#myModal").modal('show');




	//___________________Switcher


	/***************** RTL *********************/
	$(document).on("click", '#myonoffswitch2', function () {
		if (this.checked) {
			$('body').addClass('rtl');
			$('body').removeClass('ltr');
			$("html[lang=en]").attr("dir", "rtl");
			$(".select2-container--default").attr("dir", "rtl");
			$(".select2-dropdown--below").attr("dir", "rtl");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = true; //don't know if both are necessary
				carouselData.options.rtl = true;
				$(element).trigger('refresh.owl.carousel');
				window.dispatchEvent(new Event('resize'));
			});
			localStorage.removeItem("claylistltr");
			localStorage.setItem("claylistrtl", true);

		} 
	});

	/***************** RTL *********************/

	/***************** LTR *********************/

	$(document).on("click", '#myonoffswitch1', function () {
		if (this.checked) {
			$('body').addClass('ltr');
			$('body').removeClass('rtl');
			$("html[lang=en]").attr("dir", "ltr");
			$(".select2-container--default").attr("dir", "ltr");
			$(".select2-dropdown--below").attr("dir", "ltr");
			$("head link#style").attr("href", $(this));
			(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css"));
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = false; //don't know if both are necessary
				carouselData.options.rtl = false;
				$(element).trigger('refresh.owl.carousel');
				window.dispatchEvent(new Event('resize'));
			});
			localStorage.removeItem("claylistrtl");
			localStorage.setItem("claylistltr", true);
		} 
	});


	/***************** LTR *********************/

	/***************** LIGHT THEME *********************/
	$(document).on("click", '#myonoffswitch3', function () {
		if (this.checked) {
			$('body').addClass('light-theme');
			$('body').removeClass('dark-theme');

			localStorage.removeItem("claylistdark");
			localStorage.setItem("claylistlight", true);
			checkOptions();

			const root = document.querySelector(':root');
			root.style = "";
			names()
		} 
		localStorageBackup();
	});

	/***************** LIGHT THEME *********************/



	/***************** DARK THEME *********************/

	$(document).on("click", '#myonoffswitch4', function () {
		if (this.checked) {
			$('body').addClass('dark-theme');
			$('body').removeClass('light-theme');
			localStorage.removeItem("claylistlight");
			localStorage.setItem("claylistdark", true);
			checkOptions();

			const root = document.querySelector(':root');
			root.style = "";
			names()
		} 
		localStorageBackup()
	});
	/***************** Dark THEME *********************/
	
	/***************** Add Switcher Classes *********************/
	
	if(!localStorage.getItem('claylistrtl') && !localStorage.getItem('claylistltr') ){
	
	/***************** RTL *********************/
			// $('body').addClass('rtl');
	/***************** RTL *********************/
	/***************** LTR *********************/
			// $('body').addClass('ltr');
	/***************** LTR *********************/
	
	}
	
	if(!localStorage.getItem('claylistlight') && !localStorage.getItem('claylistdark') ){
	/***************** Light THEME *********************/
			// $('body').addClass('light-theme');
	/***************** Light THEME *********************/

	/***************** DARK THEME *********************/
			// $('body').addClass('dark-theme');
	/***************** Dark THEME *********************/
	}

	/***************** Add Switcher Classes *********************/



	/***************** RTL HAs Class *********************/
	
	let bodyRtl = $('body').hasClass('rtl');
	if (bodyRtl) {
		$('body').addClass('rtl');
		$('body').removeClass('ltr');
		$("html[lang=en]").attr("dir", "rtl");
		$(".select2-container--default").attr("dir", "rtl");
		$(".select2-dropdown--below").attr("dir", "rtl");
		$("head link#style").attr("href", $(this));
		(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.rtl.min.css"));
			//carousel//
			var carousel = $('.owl-carousel');
			$.each(carousel, function (index, element) {
				// element == this
				var carouselData = $(element).data('owl.carousel');
				carouselData.settings.rtl = true; //don't know if both are necessary
				carouselData.options.rtl = true;
				$(element).trigger('refresh.owl.carousel');
				window.dispatchEvent(new Event('resize'));
			});
	
	} 
	/***************** RTL HAs Class *********************/

	checkOptions();
});

function checkOptions() {
	// rtl
	if (document.querySelector('body').classList.contains('rtl')) {
		$('#myonoffswitch2').prop('checked', true);
	}
	// ltr
	if (document.querySelector('body').classList.contains('ltr')) {
		$('#myonoffswitch1').prop('checked', true);
	}
	// Light-Theme
	if (document.querySelector('body').classList.contains('light-theme')) {
		$('#myonoffswitch3').prop('checked', true);
	}
	// Dark-Theme
	if (document.querySelector('body').classList.contains('dark-theme')) {
		$('#myonoffswitch4').prop('checked', true);
	}
}

function resetData() {
	$('#myonoffswitch1').prop('checked', true);
	$('#myonoffswitch3').prop('checked', true);
	$('#myonoffswitch2').prop('checked', false);
	$('#myonoffswitch4').prop('checked', false);
	names();
	$('body')?.removeClass('light-theme');
	$('body')?.removeClass('dark-theme');
	$('body')?.removeClass('rtl');
	$('body')?.removeClass('ltr');
	$('body').addClass('ltr');
	$('body').removeClass('rtl');
	$("html[lang=en]").attr("dir", "ltr");
	$(".select2-container--default").attr("dir", "ltr");
	$(".select2-dropdown--below").attr("dir", "ltr");
	$("head link#style").attr("href", $(this));
	(document.getElementById("style").setAttribute("href", "../assets/plugins/bootstrap/css/bootstrap.min.css"));
	var carousel = $('.owl-carousel');
	$.each(carousel, function (index, element) {
		// element == this
		var carouselData = $(element).data('owl.carousel');
		carouselData.settings.rtl = false; //don't know if both are necessary
		carouselData.options.rtl = false;
		$(element).trigger('refresh.owl.carousel');
		window.dispatchEvent(new Event('resize'));
	});
}