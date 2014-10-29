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
			if (subhead.text() != text) {
				subhead.hide();
				subhead.text(text);
				subhead.fadeIn(200);
			}
		}
		else {
			subhead.fadeOut(200);
		}

		// if (current_nav != id) {
		// 	if (current_nav != 'nav-home')
		// 		$('#'+current_nav).css('color', '#999');
		// }
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

		subhead.finish();
		if (text) {
			if (subhead.text() != text) {
				subhead.text(text);
				subhead.hide();
				subhead.fadeIn(200);
			}
		}
		else {
			subhead.fadeOut(200);
		}

		// if (current_nav == 'nav-home')
		// 	$('#'+current_nav).css('color', '#000');
		// else
		// 	$('#'+current_nav).css('color', '#555');
	});
})

