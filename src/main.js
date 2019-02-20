var use_api = false;

var source_settings = {
	nyt: {
		color: '#50E3C2',
		name: 'New York Times',
		check_label: 'NYT'
	},
	guardian: {
		color: '#7793E9',
		name: 'The Guardian',
		check_label: 'Guardian'
	}
};

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?#&]' + name + '=([^&#]*)');
    var results = regex.exec(location.hash);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

var _url_query = getUrlParameter('query');
var _url_liwc = getUrlParameter('liwc');

// store UI settings
var selected_sources = Object.keys(source_settings);
var active_liwc = _url_liwc ? _url_liwc : '';
var default_search = _url_query ? _url_query : 'brexit';
var y_axis = '%';

//
// seach activates from [enter] or search icon click
//
$("#search").keypress(function(e){
	if( e.keyCode == 13 ){
		search.search( $("#search").val() );
	}
});

$("#search-icon").click(function(){
	search.search( $("#search").val() );
});

//
// build src selection checkboxes
//
selected_sources.forEach(function(src){
	var cb = $("<input checked id='src-"+src+"' class='src-checkbox' type='checkbox' name='"+src+"'>");
	$("#source_select").append(cb);
	$("#source_select").append('<label for="src-' + src + '">' + source_settings[src].check_label + '</label>');
});

$("#source_select input").on('change', function(){
	selected_sources = [];

	$(this).parent().children().each(function(){
		if( $(this).is(":checked") ){
			selected_sources.push( $(this).attr('name') );
		}
	});

	search.search( $("#search").val() );
});

//
// build LIWC dropdown
//
if( typeof liwc_categories !== 'undefined' ){
	Object.keys(liwc_categories).forEach(function(k){
		if( k == 'func' ){
			return;
		}
		$("#liwc_category").append("<option value='" + k + "'>" + liwc_categories[k].title + '</option>');
	});

	// select option
	if( active_liwc != '' ){
		$("#liwc_category").val(active_liwc);
	}
}
else {
	$("#liwc-ui").hide();
}

$("#liwc_category").change(function(){
	active_liwc = this.value;

	search.search( $("#search").val() );
});

// Y axis selection
$('input[name="graph-y"]').change(function(){
	graph.build( search.getLastResultSet() );
});

$("#csv-term").html( default_search );

// show popup on mobile devices
$("#mobile-continue").click(function(){
	$("#mobile-sorry").fadeOut(300);;
})

// kick off app with with default search
// here we determine if app is running locally. If not, use API and don't download big dataset
if( location.hostname == 'localhost' || location.hostname == '127.0.0.1' || location.protocol == 'file:' ){
	console.log("main: local mode");

	var jsElm = document.createElement('script');

	jsElm.type="application/javascript";
	jsElm.src="data/headlines.js";
	jsElm.onload = function(){
		$("#search").val(default_search);

		search.setHeadlines(headlines);
		search.search(default_search);
	}

	document.body.appendChild(jsElm);
}
else {
	use_api = true;
	console.log("main: API mode");
	$("#search").val(default_search);
	search.search(default_search);
}
