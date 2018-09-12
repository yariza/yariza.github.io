var randomtext = [
	'game dev',
	'Columbia alum',
	'Juilliard alum',
	'CMU student',
	'creative coder',
	'musician',
	'dreamer',
	':D))'
];

var current_nav = '';

document.addEventListener("DOMContentLoaded", function() {

	var prev_prev_random = -1;
	var prev_random = -1;

	if (current_nav === '') current_nav = 'home';

	$('#nav-'+current_nav).addClass('active');
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
			if (current_nav == 'home') {
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


	var darkMode = localStorage.getItem('darkMode') || 'dark';
	var darkModeButton = document.getElementsByClassName('dark-mode')[0];
	document.body.id = (darkMode === 'dark') ? 'dark' : '';
	darkModeButton.textContent = darkMode === 'dark' ? 'light mode' : 'dark mode';

	setTimeout(function() {
		document.body.classList.toggle('fade', true);
	}, 0);

	document.addEventListener('click', function(event) {

		if (event.target.classList.contains('dark-mode')) {
			darkMode = (darkMode === 'dark') ? 'light' : 'dark';
			localStorage.setItem("darkMode", darkMode);
			document.body.id = (darkMode === 'dark') ? 'dark' : '';
			darkModeButton.textContent = darkMode === 'dark' ? 'light mode' : 'dark mode';

			event.preventDefault();
		}
	});
});
