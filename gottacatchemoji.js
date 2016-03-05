var dbox  = require("dbox");
var fs = require("fs");

var secret = fs.readFileSync("secret.json", "utf8");

var app   = dbox.app({ 
	"app_key": "qer53fphoh6t6ad", 
	"app_secret": "r62azzlm9teeil9",
	"root":"dropbox"
});

var header = "<html><head>" +
	"<title>Gotta catch'emoji</title>" + 
	'<link href="static/css/minEmoji.css" rel="stylesheet">' +
	'<link rel="stylesheet" type="text/css" href="static/css/style.css">' +
	'<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.96.1/css/materialize.min.css">'+
  '<link rel="icon" type="image/png" href="static/img/favicon.png">' +
	"<link href='http://fonts.googleapis.com/css?family=Courgette' rel='stylesheet' type='text/css'>"+
	'<script src="static/js/jquery-1.11.3.min.js"></script>'+
	'<script src="static/js/minEmoji.js"></script>' +
  "<script>" +
  "(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){"+
  "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),"+
  "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)"+
  "})(window,document,'script','//www.google-analytics.com/analytics.js','ga');"+
  "ga('create', 'UA-63825626-1', 'auto');"+
  "ga('send', 'pageview');"+
  "</script>" + 
	"</head><body>" + 
	"<div class='navbar-fixed'><nav><div class='nav-wrapper red'><a href='#' class='brand-logo center'><span id='logo'>Gotta catch'emoji!</span></a></div></nav></div><div class='container'>";
//	"<div id='header'><h1>Gotta catch'emoji!</h1></div>";
var footer = "</div></body>" +
  "</html>";

var downloadImage = function (fileName) {
  return true;
}

module.exports = {
	generateSite : function(callback) {
		var access_token = 
			'{"oauth_token_secret":"b56ulik682sx00b","oauth_token":"qchh79ihop4k4jkr","uid":"1182414"}';
		var client = app.client(JSON.parse(access_token));
		
		client.get("IFTTT/emoji.txt", function(status, reply, metadata) {
			var result = header;
			
			result += "<ul class='row'>\n";
			var lines = reply.toString().split('\n');
			for (i=lines.length-1; i>=0; i--) {
				var imageUrl = lines[i].toString().split('-')[0].trim();
        var fileName = imageUrl.substring(14, imageUrl.length);
        console.log(fileName);
        downloadImage(fileName);
				var emoji = lines[i].toString().split('-')[1].split('#')[0].trim();
				var emoDiv = "emo" + i;
				result += '<li><div class="col s3"><div class="card"><div class="card-image"><img class="pic" src="' + imageUrl + '" width="160px">';
				result += '<div class="card-content center-align"><div id="'+emoDiv+'"></div></div></div></div></li>';
				result += "<script>$('#"+emoDiv+"').html(minEmoji('" + emoji + "'));</script>\n";
			}
			result += "</ul>";
			result += footer;

			callback(result);
		});
	}
};
