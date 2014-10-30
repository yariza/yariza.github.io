var randomtext = [
	'game dev',
	'Columbia student',
	'Juilliard student',
	'Geomag fan',
	'cartoonist',
	'music critic',
	'musician',
	'TI-84 programmer',
	'designer wannabe',
	'dreamer'
];

var current_nav = 'nav-home';

$(document).ready(function () {

	$('#'+current_nav).css('color', '#000');
	var subhead = $('.subhead');
	var text = "";
	if (current_nav == 'nav-violin')
		text = 'violinist';
	else if (current_nav == 'nav-dev')
		text = 'developer';
	else if (current_nav == 'nav-blog')
		text = 'blogger';

	subhead.text(text);
	subhead.show();

	$(".hover").mouseenter(function(e) {

		var subhead = $('.subhead');
		var text = "";
		var id = $(e.target).attr('id');
		if (id == 'nav-violin')
			text = 'violinist';
		else if (id == 'nav-dev')
			text = 'developer';
		else if (id == 'nav-blog')
			text = 'blogger';
		else {
			if (current_nav == 'nav-home')
				text = randomtext[Math.floor(Math.random()*randomtext.length)];
			else
				text = 'home'
		}
		subhead.finish();

		if (text) {
			subhead.hide();
			subhead.text(text);
			subhead.fadeIn(200);
		}
		else {
			subhead.fadeOut(200);
		}
	});

	$('.hover').mouseleave(function (e) {
		var subhead = $('.subhead');
		var id = $(e.target).attr('id');
		if (id != current_nav || current_nav == 'nav-home') {
			subhead.finish();
			subhead.fadeOut(200);
		}
	});

	$('.header').mouseleave(function (){

		var subhead = $('.subhead');
		var text = "";
		if (current_nav == 'nav-violin')
			text = 'violinist';
		else if (current_nav == 'nav-dev')
			text = 'developer';
		else if (current_nav == 'nav-blog')
			text = 'blogger';

		if (text) {
				subhead.finish();
				subhead.text(text);
				subhead.hide();
				subhead.fadeIn(200);
		}
	});

})

