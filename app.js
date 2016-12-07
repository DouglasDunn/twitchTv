var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];

usernames.forEach( function(username) {
  console.log(username);
  $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + username + "?callback=?", function(response) {
    if (response.stream) {
      console.log("yay", response);
      $("div").html("<>");
    } else {
      console.log(response);
    }
  });
});
