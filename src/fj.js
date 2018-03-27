
var apiKey = "api_key=laayC4Q2zbJVehmHJQaShRBlXte6GOHY&";
var apiSecret = "api_secret=dAJDmzmDj5f_lj93y_AoEqhgtT0WGPLI&";
var returnAttribute = "return_attributes=emotion";

// Event listener for button element
$(".form-control-file").on("change", function () {

  // Grab form data, in this case, the image
  // var uploadForm = $("form[name=\"upload-form\"]")[0];

  // Place the grabbed image into a formData constructor to create a new FormData object
  formData = new FormData();

  var uploadedImage = $(".form-control-file")[0].files[0];
  console.log($(".form-control-file")[0].files[0]);

  formData.append("api_key", apiKey);
  formData.append("api_secret", apiSecret);
  formData.append("return_attribute", returnAttribute);
  formData.append("image_file",uploadedImage);

  console.log(formData);

  // // Alternate...
  // var formData = new FormData();
  // formData.append('section', 'general');
  // formData.append('action', 'previewImg');
  // // Attach file
  // formData.append('image', $('input[type=file]')[0].files[0]);

  // Constructing a URL to query Face++ for emotion reading

  var queryURL = "https://api-us.faceplusplus.com/facepp/v3/detect";

  // Performing our AJAX POST request
  $.ajax({
    url: queryURL,
    method: "POST",
    processData: false,
    contentType: "multipart/form-data",
    data: formData
  })
    // After the data comes back from the API
    .then(function (response) {
      // Storing an array of results in the results variable
      var results = response.data;

      var sadness = (response.faces.attributes.emotion.sadness) * 100;

      // Looping over every result item
      for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");

          // Storing the result item's rating
          var rating = results[i].rating;

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);

          // Creating an image tag
          var personImage = $("<img>");

          // Giving the image tag an src attribute of a proprty pulled off the
          // result item
          personImage.attr("src", results[i].images.fixed_height.url);

          // Appending the paragraph and personImage we created to the "gifDiv" div we created
          gifDiv.append(p);
          gifDiv.append(personImage);

          // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
          $("#gifs-appear-here").prepend(gifDiv);
        }
      }
    });
});

// start spotify api
var urlBegin = "https://api.spotify.com/v1/recommendations?";
var limit = "limit=20";
var market = "market=US";
var ampDelimeter = "&";
var targetAcoustic = "target_acousticness=1.0";
var minDance = "min_danceability=0.0";
var maxDance = "max_danceability=1.0";
var targetDance = "target_danceability=";
var minEnergy = "min_energy=0.0";
var maxEnergy = "max_energy=1.0";
var targetEnergy = "target_energy=";
var minLoudness = "min_loudness=-60"; // temp value since not sure if this is the largest negative value or is supposed to be 0 or largest positive
var maxLoudness = "max_loudness=0"; // temp value since not sure if this is the largetst negative value or is supposed tp be 0 or largest positive
var targetLoudness = "target_loudness=";
// we may want to include a limited value for popularity
var minPopularity = "min_popularity=50";
var maxPopularity = "max_popularity=100";
var targetPopularity = "target_popularity=75";
var minSpeech = "min_speechiness=0.0"; // how much spoken words compared to sung lyrics. i.e. rap ~ 0.5 and audiobook ~ 1.0
var maxSpeech = "max_speechiness=0.5";
var targetSpeech = "target_speechiness=0.33";
var minTempo = "min_tempo=80"; // temp value for minimum tempo to search for
var maxTempo = "max_tempo=200"; // temp value for maximum tempo to search for
var targetTempo = "target_tempo=";
var minValence = "min_valence=0.0";
var maxValence = "max_valence=1.0";
var targetValence = "target_valence=";

var anger = 0, disgust = 0, fear = 0, happiness = 0, neutral = 0, sadness = 0, surprise = 0;
//secondary values
var seedGenre, seedArtist, seedAlbum, minAcoustic = "min_acousticness=0", maxAcoustic = "max_acousticness=1.0", minDuration, maxDuration, targetDuration, minInstrumental, maxInstrumental, targetInstrumental, maxKey, minKey, targetKey, minLive, maxLive, targetLive, minMode, maxMode, targetMode, minTime, maxTime, targetTime;

// dynamic emotion based values
var dance, energy, loudness, tempo, valence;

// tempo values
// fast tempo values
if ((surprise >= 0.67) || (happiness >= 0.67) || (fear >= 0.67) || ((disgust >= 0.50) && ((fear + anger + surprise) <= 0.5))) {
    tempo = 170;
    minTempo = "min_tempo=150";
}

// slow tempo values
else if ((sadness >= 0.67) || ((sadness <= 0.5) && (neutral <= 0.5))) {
    tempo = 120;
    maxTempo = "max_tempo=140";
}

// neutral tempo values
 else if (neutral > 0.50) {
    tempo = 145;
    minTempo = "min_tempo=120";
    maxTempo = "max_tempo=170";
}

// valence values
if (happiness > (sadness + anger)) {
    valence = happiness - (sadness + anger);
}

else {
    valence = (sadness + anger) - happiness;
}

// energy values
if ((sadness > 0.5) || (neutral > 0.5)) {
    energy = 1.0 - (sadness + neutral);
}

else if ((sadness < 0.5) || (neutral < 0.5)) {
    energy = 1.0 - ((sadness + neutral) - disgust);
}

else if ((anger > 0.67) || (happiness > 0.67) || (surprise > 0.67)) {
    energy = 0.0 + ((anger + happiness + surprise) / 3);
    if (0.33 < disgust < 0.67) {
        energy = energy - disgust;
    }

    energy = energy - ((sadness + neutral) / 2);
}

var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";

// danceability values
if ((energy >= 0.67) && (valence >= 0.67)) {
    queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
}

else {
    queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + /* minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + */ minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
}

// variables for holding the results
var tracks = []; // array for the track objects
var seeds = []; // array for the seed_genre objects
var trackObject = { // shows the structure of the output from spotify for one track and one seed_genre results
    "tracks": [
        {
            "album": {
                "album_type": "",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": ""
                        },
                        "href": "",
                        "id": "",
                        "name": "",
                        "type": "",
                        "uri": ""
                    }
                ],
                "external_urls": {
                    "spotify": ""
                },
                "href": "",
                "id": "",
                "images": [
                    {
                        "height": 0,
                        "url": "",
                        "width": 0
                    },
                    {
                        "height": 0,
                        "url": "",
                        "width": 0
                    },
                    {
                        "height": 0,
                        "url": "",
                        "width": 0
                    }
                ],
                "name": "",
                "type": "",
                "uri": ""
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": ""
                    },
                    "href": "",
                    "id": "",
                    "name": "",
                    "type": "",
                    "uri": ""
                }
            ],
            "disc_number": 0,
            "duration_ms": 0,
            "explicit": false,
            "external_ids": {
                "isrc": ""
            },
            "external_urls": {
                "spotify": ""
            },
            "href": "",
            "id": "",
            "is_playable": false,
            "name": "",
            "popularity": 0,
            "preview_url": "",
            "track_number": 0,
            "type": "",
            "uri": ""
        }
    ],
    "seeds": [ //seed_genre
        {
            "initialPoolSize": 0,
            "afterFilteringSize": 0,
            "afterRelinkingSize": 0,
            "id": "",
            "type": "",
            "href": null
        }
    ]
};

var trackResult = {
    "artist": [],
    "track": [],
    "album": "",
    "trackLink": "",
    "albumLink": "",
    "artistLink": []
    // "genre": ""
};

// $.ajax({
//     url: queryUrl,
//     method: 'GET',
//     accept: 'application/json',
//     "content-type": 'application/json'
// }).then(function(result){
//     var x = 0;
//     result.tracks.forEach(element => {
//         // if (result.tracks[element].album.artists[].length > 1) {
//             result.tracks[element].album.artists.forEach(element => {
//                 /*trackResult.artist = */ trackResult.artist.push(result.tracks[element].album.artists[element].name);
//             });
//         // }
//         // trackResult.artist = result.tracks[x].album.artists[0].name;
//         result.tracks[element].artists.forEach(element => {
//             var y = 0;
//             y = trackResult.track.length;
//             if ((y > 0) && (result.tracks[element].artists[element].name !== trackResult.track[y - 1])) {
//                 trackResult.track.push(result.tracks[element].artists[element].name);
//             }

//             else {
//                 trackResult.track.push(result.tracks[element].artists[element].name);
//             }

//             y = trackResult.artistLink.length;
//             if ((y > 0) && (result.tracks[element].artists[element].external_urls.spotify !== trackResult.artistLink[y - 1])) {
//                 trackResul.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
//             }

//             else {
//                 trackResul.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
//             }
//         });
//         trackResult.album = result.tracks[element].album.name;
//         trackResult.trackLink = result.tracks[element].external_urls.spotify;
//         trackResult.albumLink = result.tracks[element].album.external_urls.spotify;

//         tracks.push(trackResult);
//     });
// });

// tracks.forEach(element => {
//     var newTdArtist = $("<td>").attr("class", "artistName").attr("id", ("artistNumber" + element));
//     var newTr = $("<tr>");
//     var newTdSong = $("<td>").attr("class", "songName").attr("id", ("songNumber" + element));
//     var artistsNames = "";
//     // tracks[element].artist.forEach(element => {
//     //     if (element = )
//     // })
//     $(newTdArtist).text(tracks[element].artist.val().toString());
//     $(newTdSong).text(tracks[element].track);
//     $(newTr).append(newTdArtist),$(newTr).append(newTdArtist);
//     $("table").append(newTr);
// });

$(document).ready(function() {
    alert("Please enter a value between 0-100 for each of the following prompts");
    anger = prompt("Please enter the value for anger: ");
    console.log("the value of anger: " + anger);
    disgust = prompt("Please enter the value for disgust: ");
    console.log("the value of disgust: " + disgust);
    fear = prompt("Please enter the value for fear: ");
    console.log("the value of fear: " + fear);
    happiness = prompt("Please enter the value for happiness: ");
    console.log("the value of happiness: " + happiness);
    neutral = prompt("Please enter the value for neutral: ");
    console.log("the value of neutral: " + neutral);
    sadness = prompt("Please enter the value for sadness: ");
    console.log("the value of sadness: " + sadness);
    surprise = prompt("Please enter the value for surprise: ");
    console.log("the value of surprise: " + surprise);

    var apiAccess = {
        accessToken: "",
        tokenType: "",
        expiresIn: 0
    };

    //from spotifies web-api-auth-examples github
    // var request = require('request'); // "Request" library

    var SpotifyWebApi = require('spotify-web-api-node');//;

    var client_id = 'f9193ba8699b4d488cf4ad4359844b04';
    var client_secret = 'e4804c0849cf403991e3cda12386b26b';

    var spotifyApi = new SpotifyWebApi({
        client_id: client_id, ///'CLIENT_ID', // Your client id
        client_secret: client_secret //'CLIENT_SECRET' // Your secret
    });
    
    // // your application requests authorization
    // var authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   headers: {
    //     'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    //   },
    //   form: {
    //     grant_type: 'client_credentials'
    //   },
    //   json: true
    // };
    
    // request.post(authOptions, function(error, response, body) {
    //   if (!error && response.statusCode === 200) {
    
    //     // use the access token to access the Spotify Web API
    //     var token = body.access_token;
    //     var options = {
    //       url: 'https://api.spotify.com/v1/users/jmperezperez',
    //       headers: {
    //         'Authorization': 'Bearer ' + token
    //       },
    //       json: true
    //     };
    //     request.get(options, function(error, response, body) {
    //       console.log(body);
    //     });
    //   }
    // });    

    // Retrieve an access token.
       spotifyApi.clientCredentialsGrant()
       .then(function(data) {
            console.log('The access token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
        
            // Save the access token so that it's used in future calls
            spotifyApi.setAccessToken(data.body['access_token']);
          }, function(err) {
                console.log('Something went wrong when retrieving an access token', err.message);
          });
    
    // Use setters to set all credentials one by one
//    var spotifyApi = new SpotifyWebApi();
//    spotifyApi.setAccessToken('BQBpOou-bBLYYn2LBBh_WytmjtXYkX0aCh0o_UmrI-pO3EmUEYDmK8QoIc2iDTWzKefvpQ_2Ulb7y5Pc1NKsTfZmqsJzqpCUvtity5FDnp7NydZvjxQTftWsAI6zQIATIpyLD3BPoFaq3R5E6SWdtBSTKnrREN4'); // 'myAccessToken');
//    spotifyApi.setRefreshToken(); //'myRefreshToken');
//    spotifyApi.setRedirectURI('http://localhost:8888/callback'); // 'http://www.example.com/test-callback');
//    spotifyApi.setClientId(client_id); // 'myOwnClientId');
//    spotifyApi.setClientSecret(client_secret); // 'someSuperSecretString');

    // Set all credentials at the same time
//    spotifyApi.setCredentials({
//        'accessToken' : 'myAccessToken',
//        'refreshToken' : 'myRefreshToken',
//        'redirectUri' : 'http://localhost:8383/callback',
//        'clientId ' : client_id,
//        'clientSecret' : client_secret
//    });

    // Get the credentials one by one
    console.log('The access token is ' + spotifyApi.getAccessToken());
    console.log('The refresh token is ' + spotifyApi.getRefreshToken());
    console.log('The redirectURI is ' + spotifyApi.getRedirectURI());
    console.log('The client ID is ' + spotifyApi.getClientId());
    console.log('The client secret is ' + spotifyApi.getClientSecret());
    
    // Get all credentials
    console.log('The credentials are ' + spotifyApi.getCredentials());
    
    // $.ajax({
    //     url: 'https://accounts.spotify.com/api/token',
    //     // url: "curl -H 'Authorization: Basic BQBKwJ4Xs80bXf9yO838A1ynmp7pg4qslJjakdxUJjcHjT0CK_ETpnpQCeX37FDbekMlqHbkrpRu2bFwZMTUB8aavgsRJ7z5sTf3oquS4fd_AiXPm0jHTIuBgJZvuH6kys_2zL9uZRazfcjwQ524VPVqHHIbUmM' -d grant_type=client_credentials https://accounts.spotify.com/api/token",
    //     method: 'POST',
    //     Authorization: 'Basic BQAJj36AS2up9NqEhvodx52o1C2Txy5hyQVdqJ13kje_sczEY-40inX6Xublx3qS7SMgoJecJAKKdHXfma2lCZ_1Rd3Qu_UEypHjuiyFebLdJZdH0E8XgztiMnxgU3baANVfJ_0awE7EkqMJ8sqdCr4Tcmmec2Y',
    //     grant_type: 'client_credentials',
    //     "Access-Control-Allow-Origin": true
    // }).then(function(result) {
    //     apiAccess.accessToken = result.access_token;
    //     apiAccess.tokenType = result.token_type;
    //     apiAccess.expiresIn = result.expires_in;

    //     console.log("apiAccess.accessToken: " + apiAccess.accessToken);
    //     console.log("apiAccess.tokenType: " + apiAccess.tokenType);
    //     console.log("apiAccess.expiresIn: " + apiAccess.expiresIn);
    // });

    // $.ajax({})

    $.ajax({
        "Authorization": 'Bearer ' + spotifyApi.getAccessToken(), // apiAccess.accessToken,
        url: queryUrl,
        method: 'GET',
        accept: 'application/json',
        "content-type": 'application/json'
    }).then(function(result){
        var x = 0;
        result.tracks.forEach(element => {
            // if (result.tracks[element].album.artists[].length > 1) {
                result.tracks[element].album.artists.forEach(element => {
                    /*trackResult.artist = */ trackResult.artist.push(result.tracks[element].album.artists[element].name);
                });
            // }
            // trackResult.artist = result.tracks[x].album.artists[0].name;
            result.tracks[element].artists.forEach(element => {
                var y = 0;
                y = trackResult.track.length;
                if ((y > 0) && (result.tracks[element].artists[element].name !== trackResult.track[y - 1])) {
                    trackResult.track.push(result.tracks[element].artists[element].name);
                }
    
                else {
                    trackResult.track.push(result.tracks[element].artists[element].name);
                }
    
                y = trackResult.artistLink.length;
                if ((y > 0) && (result.tracks[element].artists[element].external_urls.spotify !== trackResult.artistLink[y - 1])) {
                    trackResult.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
                }
    
                else {
                    trackResult.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
                }
            });
            trackResult.album = result.tracks[element].album.name;
            trackResult.trackLink = result.tracks[element].external_urls.spotify;
            trackResult.albumLink = result.tracks[element].album.external_urls.spotify;
    
            tracks.push(trackResult);
        });
    });


    tracks.forEach(element => {
        var newTdArtist = $("<td>").attr("class", "artistName").attr("id", ("artistNumber" + element));
        var newTr = $("<tr>");
        var newTdSong = $("<td>").attr("class", "songName").attr("id", ("songNumber" + element));
        var artistsNames = "";
        // tracks[element].artist.forEach(element => {
        //     if (element = )
        // })
        $(newTdArtist).text(tracks[element].artist.val().toString());
        $(newTdSong).text(tracks[element].track);
        $(newTr).append(newTdArtist),$(newTr).append(newTdArtist);
        $("table").append(newTr);
    });
    // Reset the credentials
    spotifyApi.resetAccessToken();
    spotifyApi.resetRefreshToken();
    spotifyApi.resetRedirectURI();
    spotifyApi.resetClientId();
    spotifyApi.resetClientSecret();
//    spotifyApi.resetCode();

    // Reset all credentials at the same time
    spotifyApi.resetCredentials();
    
});