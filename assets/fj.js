// DOM things
$("#on-photo-upload-correct").hide();
$("#on-photo-upload-error").hide();
$(".results").hide();
$("#user-image").hide();

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAwSQJpM8wQUVAYLmThPdPVeDFbNVkazvI",
    authDomain: "facejam-1f0e6.firebaseapp.com",
    databaseURL: "https://facejam-1f0e6.firebaseio.com",
    projectId: "facejam-1f0e6",
    storageBucket: "",
    messagingSenderId: "174049412327"
};
firebase.initializeApp(config);

var firebaseData = firebase.database();

var apiKey = "laayC4Q2zbJVehmHJQaShRBlXte6GOHY";
var apiSecret = "dAJDmzmDj5f_lj93y_AoEqhgtT0WGPLI";
var returnAttribute = "emotion";

// Event listener for button element
$("#photo-submit").change(function(e) {

    for (var i = 0; i < e.originalEvent.srcElement.files.length; i++) {

        var file = e.originalEvent.srcElement.files[i];

        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onloadend = function() {
             img.src = reader.result;
        }
        reader.readAsDataURL(file);
        $("uploaded-photo-display").append(img);
    }
});

$("#submit-button").on("click", function () {

    // var loadFile = function(event) {
    //     var reader = new FileReader();
    //     reader.onload = function(){
    //       var output = document.getElementById('uploaded-photo-display');
    //       output.src = reader.result;
    //     };
    //     reader.readAsDataURL(event.target.files[0]);
    //   };

    // Place the grabbed image into a formData constructor to create a new FormData object
    $("#on-photo-upload-correct").hide();
    $("#mood-values").empty();
    formData = new FormData();

    firebaseData.ref().push(formData);

    var uploadedImage = $("#photo-submit")[0].files[0];
    console.log(uploadedImage);

   

    formData.append("api_key", apiKey);
    formData.append("api_secret", apiSecret);
    formData.append("return_attributes", returnAttribute);
    formData.append("image_file", uploadedImage);

    console.log(formData);

    var queryURL = "https://cors-anywhere.herokuapp.com/https://api-us.faceplusplus.com/facepp/v3/detect";

    // Performing our AJAX POST request
    $.ajax({
        url: queryURL,
        method: "POST",
        processData: false,
        contentType: false,
        data: formData
    })

        // After the data comes back from the API
        .then(function (response) {
            //   // Storing an array of results in the results variable
            console.log(response);

            if (response.error_message === true) {
                $("#on-photo-upload-error").show();

            } else if (response.time_used > 0) {
                $("#on-photo-upload-correct").show();

                var happiness = response.faces[0].attributes.emotion.happiness;
                var neutral = response.faces[0].attributes.emotion.neutral;
                var disgust = response.faces[0].attributes.emotion.disgust;
                var anger = response.faces[0].attributes.emotion.anger;
                var surprise = response.faces[0].attributes.emotion.surprise;
                var fear = response.faces[0].attributes.emotion.fear;
                var sadness = response.faces[0].attributes.emotion.sadness;

                console.log(happiness);
                console.log(neutral);
                console.log(disgust);
                console.log(anger);
                console.log(surprise);
                console.log(fear);
                console.log(sadness);

                $("#photo-submit").val("");

                $("#mood-values").append("<h4>You're feeling:</h4><br>Happiness: " + happiness.toFixed(2) + "%<br>" + "Neutral: " + neutral.toFixed(2) + "%<br>" + "Disgust: " + disgust.toFixed(2) + "%<br>" + "Anger: " + anger.toFixed(2) + "%<br>" + "Surprise: " + surprise.toFixed(2) + "%<br>" + "Fear: " + fear.toFixed(2) + "%<br>" + "Sadness: " + sadness.toFixed(2) + "%<br>");
            }

        });

});

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $("#user-image")
                    .show()
                    .attr('src', e.target.result)
                    .width(200)
                 //   .height(200);
            };

            reader.readAsDataURL(input.files[0]);
        }
    }


//  .on("click") function associated with the clear button
// $("#clear-all").on("click", clear);

// Lawrence Code

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
var targetTempo = "target_tempo="
var minValence = "min_valence=0.0";
var maxValence = "max_valence=1.0";
var targetValence = "target_valence="

//secondary values
var seedGenre, seedArtist, seedAlbum, minAcoustic = "min_acousticness=0",
    maxAcoustic = "max_acousticness=1.0",
    minDuration, maxDuration, targetDuration, minInstrumental, maxInstrumental, targetInstrumental, maxKey, minKey, targetKey, minLive, maxLive, targetLive, minMode, maxMode, targetMode, minTime, maxTime, targetTime;

// dynamic emotion based values
var dance, energy, loudness, tempo, valence;

var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";

// danceability values
if ((energy >= 0.67) && (valence >= 0.67)) {
    var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
} else {
    var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + /* minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + */ minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
}
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
} else {
    valence = (sadness + anger) - happiness;
}

// energy values
if ((sadness > 0.5) || (neutral > 0.5)) {
    energy = 1.0 - (sadness + neutral);
} else if ((sadness < 0.5) || (neutral < 0.5)) {
    energy = 1.0 - ((sadness + neutral) - disgust);
} else if ((anger > 0.67) || (happiness > 0.67) || (surprise > 0.67)) {
    energy = 0.0 + ((anger + happiness + surprise) / 3);
    if (0.33 < disgust < 0.67) {
        energy = energy - disgust;
    }

    energy = energy - ((sadness + neutral) / 2);
}



// dropdown items
// dropdown happiness
$("#happiness").on("click", function () {
    happiness = .9;
    console.log(happiness);
});

// dropdown neutral
$("#neutral").on("click", function () {
    neutral = .9;
    console.log(neutral);
});

// dropdown sad
$("#sadness").on("click", function () {
    sadness = .9;
    console.log(sadness);
});

// dropdown angry
$("#anger").on("click", function () {
    anger = .9;
    console.log(anger);
});

// dropdown surprised
$("#surprise").on("click", function () {
    surprise = .9;
    console.log(surprise);
});

// dropdown afraid
$("#fear").on("click", function () {
    fear = .9;
    console.log(fear);
});

// dropdown disgusted
$("#disgust").on("click", function () {
    disgust = .9;
    console.log(disgust);
});




// Buttons asking user if mood read was accurate, keeps running tally of votes
var database = firebase.database();
var yes;
var no;

// brings in yes count so we can add to it
database.ref("/Yes").on("value", function (snapshot) {
    console.log(snapshot.val());
    yes = snapshot.val().yesCount;

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// brings in no count so we can to it
database.ref("/No").on("value", function (snapshot) {
    console.log(snapshot.val());
    no = snapshot.val().noCount;

}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

// onclick event for voting yes, then hides buttons
$("#accurate-yes").on("click", function () {
    yes++;
    $(".accuracy").hide();
    $("#thanks").text("Thanks for your feedback!");
    database.ref("Yes").set({
        yesCount: yes
    });
});


// onclick event for voting no, then hides buttons
$("#accurate-no").on("click", function () {
    no++;
    $(".accuracy").hide();
    $("#thanks").text("Thanks for your feedback!");
    database.ref("No").set({
        noCount: no
    });
});









// variables for holding the results
var tracks = []; // array for the track objects
var seeds = []; // array for the seed_genre objects
var trackObject = { // shows the structure of the output from spotify for one track and one seed_genre results
    "tracks": [{
        "album": {
            "album_type": "",
            "artists": [{
                "external_urls": {
                    "spotify": ""
                },
                "href": "",
                "id": "",
                "name": "",
                "type": "",
                "uri": ""
            }],
            "external_urls": {
                "spotify": ""
            },
            "href": "",
            "id": "",
            "images": [{
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
        "artists": [{
            "external_urls": {
                "spotify": ""
            },
            "href": "",
            "id": "",
            "name": "",
            "type": "",
            "uri": ""
        }],
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
    }],
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
}

var trackResult = {
    "artist": [],
    "track": [],
    "album": "",
    "trackLink": "",
    "albumLink": "",
    "artistLink": []
    // "genre": ""
}

$.ajax({
    url: queryUrl,
    method: 'GET',
    accept: 'application/json',
    "content-type": 'application/json'
}).then(function (result) {
    var x = 0;
    result.tracks.forEach(element => {
        // if (result.tracks[element].album.artists[].length > 1) {
        result.tracks[element].album.artists.forEach(element => {
            /*trackResult.artist = */
            trackResult.artist.push(result.tracks[element].album.artists[element].name);
        });
        // }
        // trackResult.artist = result.tracks[x].album.artists[0].name;
        result.tracks[element].artists.forEach(element => {
            var y = 0;
            y = trackResult.track.length;
            if ((y > 0) && (result.tracks[element].artists[element].name !== trackResult.track[y - 1])) {
                trackResult.track.push(result.tracks[element].artists[element].name);
            } else {
                trackResult.track.push(result.tracks[element].artists[element].name);
            }

            y = trackResult.artistLink.length;
            if ((y > 0) && (result.tracks[element].artists[element].external_urls.spotify !== trackResult.artistLink[y - 1])) {
                trackResul.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
            } else {
                trackResul.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
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
    $(newTr).append(newTdArtist), $(newTr).append(newTdArtist);
    $("table").append(newTr);
})