//Twitch Client ID
// rw8ngqk6id3gqkl2r9ugxznh348mds

//YouTube API Key
//AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE


//Validates user search is not blank, if not sends it to the seach functions.
function validate() {
	var value = $("#value").val().trim();
	if (value.length < 1) {
		invalid();
	}
	else {
		newSearch(value);
		$("#value").val("")
	}
}


//Passes value to search functions
function newSearch(value) {
	twitchData(value);
	youtubeData(value);	
}


//Gets top Twitch streams based on viewers for the user specified search
function twitchData(value) {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/search/streams?query=' + value +'&limit=9',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			if (data.streams.length < 1 ) {
				$('#noResults').modal('show')
			}
			else {	
				$("#firstPanel").text("Top Live Streams");
				$("#firstContentRow").html("");
				console.log(data);
				for (var i = 0; i < data.streams.length; i++) {
					$("#firstContentRow").append("<div class='col-sm-4 previewGrid'><a href='" + data.streams[i].channel.url + "' target='_blank'><div class='previewPlaceholder'><img src='" + data.streams[i].preview.medium + "' class='preview' data-stream-preview='" + data.streams[i].channel.display_name + "''></div><div class='streamInfo'><p>" + data.streams[i].channel.status + "</p><p>" + data.streams[i].channel.display_name + " |  <i class='fa fa-user liveViewers'></i> " + data.streams[i].viewers + "</p></div></a></div>")

				}
			};
		},
		error: function() {
			$('#noResults').modal('show');
		}
	});
}


//Gets the top videos from YT using the user input search
//Results are fron the past two days in the gaming category
function youtubeData(value) {
	var date = moment().add(-2, 'days').format("YYYY-MM-DDTHH:mm:ssZ");

	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE',
			q: value,
			publishedAfter: date,
			part: 'snippet',
			relevanceLanguage: 'en',
			regionCode: 'US',
			type: 'video',
			videoCategoryId: '20',
			maxResults: 6
		},
		success: function(data) {
			$("#secondPanel").text("Recent Videos");
			$("#secondContentRow").html("");
			for (var i = 0; i < data.items.length; i++) {
				$("#secondContentRow").append("<div class='col-sm-4 previewGridYT'><a href='https://www.youtube.com/watch?v=" + data.items[i].id.videoId + "' target='_blank'><img src='" + data.items[i].snippet.thumbnails.medium.url + "' class='previewYT'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></a></div>")			};

			}
		})
}


//No contents in search
function invalid() {
	$('#badSearch').modal('show');
}


//Gets the top 10 games from Twitch based on overall views at this time.
function topGames() {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/games/top',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.top.length; i++) {
				$("#topGames ul").append("<li class='topGame'>" + data.top[i].game.name + "</li>")
			}
		}
	});
}



//Gets top streams from Twitch currently based on viewers
function topStreams() {
	$.ajax({
		type: 'GET',
		url: 'https://api.twitch.tv/kraken/streams/?language=en&limit=9',
		headers: {
			'Client-ID': 'rw8ngqk6id3gqkl2r9ugxznh348mds',
			'Accept': 'application/vnd.twitchtv.v5+json'
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.streams.length; i++) {
				$("#firstContentRow").append("<div class='col-sm-4 previewGrid'><a href='" + data.streams[i].channel.url +
					"' target='_blank'><div class='previewPlaceholder'>"+
					"<img class='preview' src='" + data.streams[i].preview.medium + "' data-stream-preview='"+ data.streams[i].channel.display_name +"'>"+
					"</div></a><div class='streamInfo'><p>" +
					data.streams[i].channel.display_name + " playing " + data.streams[i].channel.game + "</p><p><i class='fa fa-user liveViewers'></i> " +
					data.streams[i].viewers + "</p></div></div>")

			}
		}
	})
}


//Gets top videos in gaming category on YT from the past day
function topVideos() {
	var date = moment().add(-1, 'days').format("YYYY-MM-DDTHH:mm:ssZ");
	$.ajax({
		type: 'GET',
		url: 'https://www.googleapis.com/youtube/v3/search',
		data: {
			key: 'AIzaSyBVy0EAkJ0kLC1HlyZ81wXGvNy9HpQwTqE',
			chart: 'mostPopular',
			publishedAfter: date,
			part: 'snippet',
			relevanceLanguage: 'en',
			regionCode: 'US',
			type: 'video',
			videoCategoryId: '20',
			maxResults: 6
		},
		success: function(data) {
			console.log(data);

			for (var i = 0; i < data.items.length; i++) {
				$("#secondContentRow").append("<div class='col-sm-4 previewGridYT'><a href='https://www.youtube.com/watch?v=" + data.items[i].id.videoId + "' target='_blank'><img src='" + data.items[i].snippet.thumbnails.medium.url + "' class='previewYT'><div class='streamInfo'><p>" + data.items[i].snippet.title + "</p></div></a></div>")
			}
		}
	})
}



//startup function
function pageLoad() {
	$("#firstPanel").text("Current Top Streams");
	$("#secondPanel").text("Current Top Gaming Videos");
	topStreams();
	topGames();
	topVideos();
}


//Sidebar search interations and email input setup
$("input[type='text']").keypress(function(event){
	if (event.which === 13) {
		validate();
	}
})

$("#send").on("click", function(){
	validate();
});

$("#topGames").on("click", ".topGame", function(){
	var value = $(this).text();
	newSearch(value);
});

$(document).ready(function() {
	$('#emailButton').hide();
	$('input').change(function(e) {
		if ($('#userEmail').val() && validateEmail($('#userEmail').val())) {
			$('#emailButton').show();
		}
	});
});



//Firebase Config and Setup
var config = {
	apiKey: "AIzaSyDVcwcqgh7-L_pravAUBRptwmr8QVtH0cM",
	authDomain: "epicgg-65205.firebaseapp.com",
	databaseURL: "https://epicgg-65205.firebaseio.com",
	projectId: "epicgg-65205",
	storageBucket: "epicgg-65205.appspot.com",
	messagingSenderId: "496054837947"
};
firebase.initializeApp(config);
var database = firebase.database();


//Email input and button interactions
$("#emailButton").on("click", function(event){
	event.preventDefault();
	var email = $("#userEmail").val().trim()

	$("#userEmail").val("");

	database.ref().push(email);
	$("#emailButton").hide();
})

var validateEmail = function(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
};



//Theme Changing buttons
$("#blue").on("click", function() {
	$("#styles").attr("href", "./assets/css/style2.css");
})
$("#orange").on("click", function() {
	$("#styles").attr("href", "./assets/css/style.css");
})
$("#donny").on("click", function() {
	$("#styles").attr("href", "./assets/css/donnystyle.css");
})
$("#sidStyle").on("click", function() {
	$("#styles").attr("href", "./assets/css/sidStyle.css");
})



//Preview Window
// $(document).on('mouseenter','.preview',(function(e){
// 	xOffset = -20;
// 	yOffset = 40;

// 	console.log($(this).data("stream-preview"));

// 	$("body").append("<iframe id='preview'src='https://player.twitch.tv/?channel="+$(this).data("stream-preview")+
// 		"' height='auto' width='300px' frameborder='0' scrolling='no' allowfullscreen='false'></iframe>");
// 	$("#preview")
// 	.css("top",(e.pageY - xOffset) + "px")
// 	.css("left",(e.pageX + yOffset) + "px")
// 	.fadeIn("slow");
// }));

// $(document).on('mousemove','.preview',(function(e){
// 	$("#preview")
// 	.css("top",(e.pageY - xOffset) + "px")
// 	.css("left",(e.pageX + yOffset) + "px");
// }));

// $(document).on('mouseleave','.preview',(function(e){
// 	$('#preview').remove();
// }));

//Preview in the same window on mouseover
$(document).on('mouseenter','.previewGrid',(function(e){
	var user = $(this).find("img").attr("data-stream-preview");
	$(this).find("img").addClass("hidden");
	$(this).find(".previewPlaceholder").append("<iframe id='preview'src='https://player.twitch.tv/?channel="+ user +
		"' height='auto' width='100%' frameborder='0' scrolling='no' allowfullscreen='false'>" + 
		"</iframe>")
}));
$(document).on('mouseleave','.previewGrid',(function(e){
	$('#preview').remove();
	$(this).find("img").removeClass("hidden")
}));



//Startup
pageLoad();


