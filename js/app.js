$(document).ready(function(){
	$('.reference-getter').submit(function(event){
		// zero out results if previous has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var tags = $(this).find("input[name='tags']").val();
		getReferences(tags);
	});
});

var showReference = function(reference){
	//clone result template
	var result = $('.template .reference').clone();

	// set image for result
	result.find('.reference-image a').attr('href', reference.url);
	var referenceImage = result.find('.reference-image img');
	referenceImage.attr('src', reference.covers[202]);

	// set reference name
	var referenceName = result.find('.reference-name a');
	referenceName.attr('href', reference.url);
	referenceName.text(reference.name);

	// set artist name
	var artistName = result.find('.artist-name a');
	artistName.attr('href', reference.owners[0].url);
	artistName.text(reference.owners[0].display_name);

	return result;
};

var showError = function(error){
	var errorElem = $('.template .error').clone();
	var errorText = '<p>' + error + '</p>';
	errorElem.append(errorText);
};

var getReferences = function(tags){
	// connect with behance
	var result = $.ajax({
		url: "https://www.behance.net/v2/projects?client_id=XjurXXktK2AB3CuaOdp0sVFborS03IvY&q=" + tags + "&sort=appreciations&time=all&page=1",
		dataType: "jsonp",
		type: "GET"
	})
	.done(function(result){
		$.each(result.projects, function(index, item){
			var reference = showReference(item);
			$('.results').append(reference);
		});
	})
	.fail(function(jqXHR, error, errorThrown){
		var errorElem = showError(error);
		$('.search-results').append(errorElem);
	});
};