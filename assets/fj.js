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
var seedGenre, seedArtist, seedAlbum, minAcoustic = "min_acousticness=0", maxAcoustic = "max_acousticness=1.0", minDuration, maxDuration, targetDuration, minInstrumental, maxInstrumental, targetInstrumental, maxKey, minKey, targetKey, minLive, maxLive, targetLive, minMode, maxMode, targetMode, minTime, maxTime, targetTime;

// dynamic emotion based values
var dance, energy, loudness, tempo, valence;

var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";

// danceability values
if ((energy >= 0.67) && (valence >= 0.67)) {
    var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
}

else {
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
                trackResul.artistLink.push(result.tracks[element].artists[element].external_urls.spotify);
            }

            else {
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
    $(newTr).append(newTdArtist),$(newTr).append(newTdArtist);
    $("table").append(newTr);
})