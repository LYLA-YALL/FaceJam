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

if ((energy >= 0.67) && (valence >= 0.67)) {
    var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
}

else {
    var queryUrl = "https://api.spotify.com/v1/recommendations?" + limit + ampDelimeter + market + ampDelimeter + minAcoustic + ampDelimeter + maxAcoustic + ampDelimeter + targetAcoustic + ampDelimeter + /* minDance + ampDelimeter + maxDance + ampDelimeter + targetDance + dance + ampDelimeter + */ minEnergy + ampDelimeter + maxEnergy + ampDelimeter + targetEnergy + energy + ampDelimeter + minLoudness + ampDelimeter + maxLoudness + ampDelimeter + targetLoudness + loudness + ampDelimeter + minPopularity + ampDelimeter + maxPopularity + ampDelimeter + targetPopularity + ampDelimeter + minSpeech + ampDelimeter + maxSpeech + ampDelimeter + targetSpeech + ampDelimeter + minTempo + ampDelimeter + maxTempo + ampDelimeter + targetTempo + tempo + ampDelimeter + minValence + ampDelimeter + maxValence + ampDelimeter + targetValence + valence + "";
}

// fast tempo values
if ((surprise >= 0.67) || (happiness >= 0.67) || (fear >= 0.67) || ((disgust >= 0.50) && ((fear + anger + surprise) <= 0.5))) {
    tempo = 170;
    minTempo = "min_tempo=150";
}

// slow tempo values
if ((sadness >= 0.67) || ((sadness <= 0.5) && (neutral <= 0.5))) {
    tempo = 120;
    maxTempo = "max_tempo=140";
}

// neutral tempo values
if (neutral > 0.50) {
    tempo = 145;
    minTempo = "min_tempo=120";
    maxTempo = "max_tempo=170";
}

$.ajax({
    url: queryUrl,
    method: 'GET',
    accept: 'application/json',
    "content-type": 'application/json'
}).then(function(result){

});