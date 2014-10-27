var randomtext = [
	'some guy',
	'game dev',
	'Columbia student',
	'Juilliard student',
	'Geomag fan',
	'cartoonist',
	'tomato lover',
	'music critic',
	'reddit lurker',
	'dreamer'
]

$(document).ready(function () {
	$(".hover").mouseenter(function(e) {
		var subhead = $('.subhead');
		var text = $(e.target).text();
		if (text == 'violin')
			text = 'violinist';
		else if (text == 'development')
			text = 'developer';
		else if (text == 'blog')
			text = 'blogger';
		else {
			text = randomtext[Math.floor(Math.random()*randomtext.length)];
		}
		subhead.finish();
		subhead.text(text);
		subhead.fadeIn(300);
	});

	$('.hover').mouseleave(function (){
		var subhead = $('.subhead');
		subhead.finish();
		subhead.fadeOut(300);
	});
})

