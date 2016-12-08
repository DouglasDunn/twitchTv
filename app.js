var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"],
    streamHtml = "",
    counter = 0;

function paintTheScreen() {
  $("#main").html(streamHtml);
  console.log(streamHtml, "hi");
}

usernames.forEach( function(username) {
  console.log(username);
  $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?", function(response) {
    console.log(response);
    var stream = response.stream;

    if (stream) {
      var game = stream.game,
          viewers = stream.viewers,
          channel = stream.channel,
          display_name = channel.display_name,
          views = channel.views,
          url = channel.url,
          status = channel.status,
          logo = channel.logo;

      streamHtml += "<div class='streams online'><img src='" + logo + "'><p class='topP'>Streaming " + game + " on <a href='" + url + "' target='_blank'>" + display_name + "</a></p><p>" + status + "</p><p class='watchingNow'>watching now: " + viewers + "</p><p class='totalViews'>total views: " + views + "</p></div>";

      counter++;

      if (usernames.length === counter) {
        paintTheScreen();
      }
    } else {

      $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + username + "?callback=?", function(response) {
        console.log(response, "null");

        var display_name = response.display_name,
            logo = response.logo,
            url = response.url;

        streamHtml += "<div class='streams'><img src='" + logo + "'><p class='offlineText'><a href='" + url + "' target='_blank'>" + display_name + "</a> is offline</p></div>";

        console.log(display_name, logo);

        counter++;

        if (usernames.length === counter) {
          paintTheScreen();
        }
      });
    }
  });
});

$("#buttons").on("click", "button", function(e) {

  var length = $(".streams").length;

  for (var i = 0; i < e.target.parentNode.children.length; i++) {

    e.target.parentNode.children[i].className = "btn-danger";

  }

  e.target.className = "btn-primary";

  if (e.target.id === "all") {

    for (var i = 0; i < length; i++) {
      $(".streams")[i].style.display = "block";
    }

  } else if (e.target.id === "online") {

    for (var i = 0; i < length; i++) {

      if ($($(".streams")[i]).hasClass("online")) {
        $(".streams")[i].style.display = "block";
      } else {
        $(".streams")[i].style.display = "none";
      }
    }
  } else {
    console.log("offline");

    for (var i = 0; i < length; i++) {

      if ($($(".streams")[i]).hasClass("online")) {
        $(".streams")[i].style.display = "none";
      } else {
        $(".streams")[i].style.display = "block";
      }
    }
  }
});
