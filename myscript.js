$.getJSON('https://newsapi.org/v1/articles?source=bbc-news&sortBy=top&apiKey=45c9bc6e446246e192415bcb5e2d91e3', function(data) {
	var output = '<ol data-role="listview" data-inset="true">';
	$.each(data.articles,function(key,val) {
		output += '<li>';
		output += '<h3>' + val.title + '</h3>';
		output += '<p>' + val.description + '</p>';
		output += '</li>';
	});
	output += '</ol>';
	$('#post').html(output);
});