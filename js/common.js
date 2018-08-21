var randomtext = [
	'game dev',
	'Columbia alum',
	'Juilliard alum',
	'CMU student',
	'creative coder',
	'musician',
	'dreamer'
];

var current_nav = '';

document.addEventListener("DOMContentLoaded", function() {

	var prev_prev_random = -1;
	var prev_random = -1;

	$('#'+current_nav).css('color', '#000');
	var subhead = $('.subhead');
	var text = "";
	if (current_nav == 'violin')
		text = 'violinist';
	else if (current_nav == 'dev')
		text = 'developer';
	else if (current_nav == 'blog')
		text = 'blogger';
	else if (current_nav == 'about')
		text = '¯\\_(ツ)_/¯';

	subhead.text(text);
	subhead.show();

	$(".hover").mouseenter(function(e) {

		var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
		if (iOS) return; // don't do hover shenanigans on ios

		var subhead = $('.subhead');
		var text = "";
		var id = $(e.target).attr('id');
		if (id == 'nav-violin')
			text = 'violinist';
		else if (id == 'nav-dev')
			text = 'developer';
		else if (id == 'nav-blog')
			text = 'blogger';
		else if (id == 'nav-about')
			text = '¯\\_(ツ)_/¯';
		else {
			if (current_nav == '') {
				var new_random;
				do {
					new_random = Math.floor(Math.random()*randomtext.length);
				} while (new_random === prev_random || new_random === prev_prev_random);
				prev_prev_random = prev_random;
				prev_random = new_random;
				text = randomtext[new_random];
			}
			else
				text = 'home'
		}
		subhead.finish();

		if (subhead.is(':hidden') || text != subhead.text()) {
			subhead.hide();
			subhead.text(text);
			subhead.fadeIn(200);
		}
	});

	$('.hover').mouseleave(function (e) {
		var subhead = $('.subhead');
		var id = $(e.target).attr('id');
		if (id != 'nav-' + current_nav || current_nav == '') {
			subhead.finish();
			subhead.fadeOut(200);
		}
	});

	$('.header').mouseleave(function (){

		var subhead = $('.subhead');
		var text = "";
		if (current_nav == 'violin')
			text = 'violinist';
		else if (current_nav == 'dev')
			text = 'developer';
		else if (current_nav == 'blog')
			text = 'blogger';
		else if (current_nav == 'about')
			text = '¯\\_(ツ)_/¯';
	
		if (subhead.is(':hidden') || text != subhead.text()) {
			subhead.finish();
			subhead.text(text);
			subhead.hide();
			subhead.fadeIn(200);
		}
	});

});

