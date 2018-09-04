require.config({
	paths: {
		'jquery': "jquery",
	}
})



define(['jquery'], function ($) {
	$(window).on('resize', function () {
		$('.live-container .live').height($('.live-container .hot').innerHeight())
	})

	$(window).trigger('resize');

	$('.live-container .live video').attr('src', $('.live-container .hot .item.active').attr('data-source-src'))


	$('.live-container .live .control-bar .reload').on('click', function () {
		window.location.reload()
	})
	$('.live-container .live .control-bar .play-paush').on('click', function () {
		if ($(this).toggleClass('active').hasClass('active')) {
			$('.live-container .live video')[0].play();
		} else {
			$('.live-container .live video')[0].pause();
		}
	})
	$('.live-container .hot .item').on('mouseenter', function () {
		$(this).addClass('active').siblings().removeClass('active');
		$('.live-container .live video').attr('src', $(this).attr('data-source-src'))
		$('.live-container .live .control-bar .play-paush').removeClass('active')
	})

	function toFullVideo(videoDom) {

		if (videoDom.requestFullscreen) {

			return videoDom.requestFullScreen();

		} else if (videoDom.webkitRequestFullScreen) {

			return videoDom.webkitRequestFullScreen();

		} else if (videoDom.mozRequestFullScreen) {

			return videoDom.mozRequestFullScreen();

		} else {

			return videoDom.msRequestFullscreen();

		}

	}
	$('.live-container .live .control-bar .full-page').on('click', function (e) {
		e.preventDefault();
		toFullVideo($('.live-container .live video')[0])
	})
	$('.sound-volume .sound-volume-container .track').on('mousedown', function (e) {
		e.preventDefault();


		var i_width_half = $('.sound-volume .sound-volume-container .track').width() / 2;

		var i_offsetX = e.originalEvent.offsetX;

		i_offsetX = i_width_half < i_offsetX ? i_offsetX - i_width_half : -(i_width_half - i_offsetX);


		var i_parents_offset_x = $('.sound-volume .sound-volume-container .progress').offset().left + i_offsetX;
		var i_max = $('.sound-volume .sound-volume-container').width();
		// console.log('i_parents_offset_x:' + i_parents_offset_x);

		$(window).on('mousemove', function (e) {
			e.preventDefault();
			// console.log(e);
			// console.log('i_cilent_x:' + i_cilent_x);
			var i_cilent_x = e.originalEvent.clientX;
			var progress = i_cilent_x - i_parents_offset_x;
			progress < 0 ? progress = 0 : (progress > i_max ? progress = i_max : progress = progress);
			$('.sound-volume .sound-volume-container .track').css('left', (progress) + 'px')
			$('.sound-volume .sound-volume-container .progress').css('width', (progress) + 'px')



			var i_sound_volume = (progress / (i_max / 100) / 100).toFixed(2);
			$('.sound-volume .sound-volume-container .track').attr('data-volume', i_sound_volume);
			$('.live-container .live video')[0].volume = i_sound_volume;
			// console.log('mousemove');

		})
	})
	$(window).on('mouseup', function (e) {
		e.preventDefault();
		$(window).off('mousemove');

	})
	$('.live-container .live video')[0].volume = 0.5
	$('.live-container .live video').on('ended', function () {
		$('.live-container .live .control-bar .play-paush').removeClass('active')
	})



	$('.layout-login-register .close').on('click', function () {
		$('.layout-login-register').fadeOut();
	})

	$('.header .link.login').on('click', function () {
		$('.layout-login-register').fadeIn();
		$('.layout-login-register .tabs-control a').eq(0).trigger('click');
	})

	$('.header .link.register').on('click', function () {
		$('.layout-login-register').fadeIn();
		$('.layout-login-register .tabs-control a').eq(1).trigger('click');
	})

	$('*[data-js-tabs]').children().on('click', function () {
		var tabs_obj = $(this).parent().attr('data-js-tabs');
		$(tabs_obj).children().eq($(this).index()).show().siblings().hide();
		$(this).addClass('active').siblings().removeClass('active');
	});
	$.each($('*[data-js-tabs]'), function (index, el) {
		var arg = window.location.search;
		if (arg != '') {
			arg = arg.split('?')[1].split('=')[1];
			console.log(arg);
			$(el).children().eq(arg - 1).trigger('click');

		} else {
			$(el).children().first().addClass('active');
			$($(el).attr('data-js-tabs')).children().eq(0).show().siblings().hide();;
		}
	});
})