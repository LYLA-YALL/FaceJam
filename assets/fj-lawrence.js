/* test ranges for translating face++ emotion sub-values to the spotify audio features values
 * 
 * First get the values of each sub-value of emotion by multiplying each by 100 to get individual values
 * 
 * Valence > 0.5 is happy - also a sub-value of emotion
 * Valence > 0.5 is cheerful
 * Valence > 0.5 is euphoric
 * Valence < 0.5 is sad
 * Valence < 0.5 is Angry - also a sub-value of emotion
 * Valence < 0.5 is depressed
 * 
 * to get the value for Valence:
 *    1. if Happiness > (Sadness + Anger)
 *    2a. Happiness - (Sadness + Anger) = Valence
 *    2b. (Sadness + Anger) - Happiness = Valence
 * 
 * Loudness is psychologically equivalent to physical strength
 *    - high value could equate to a high anger or happiness or surprise is probaly =< -7.0 as a guess based off of my MediaMonkey library
 *    - the louder the volume seems to be (at least in MediaMonkey) the greater -x.x the louder the base volume level of the track
 *    - value typical range according to spotify is between -60 and 0
 * 
 * Tempo is the speed of the music in Beats Per Minute (BPM)
 *    - a fast tempo could equate to high surprise or happiness or other high-non sad/depressed/neutral level of emption
 *    - a fast tempo could also equate to high fear - like when your pulse quickens when you are scared just like when you are excited
 *    - a fast tempo could equate to a high level of disgust mixed with fear/anger/surprise
 * 
 * to get the value for Tempo:
 *    1. fast tempo > 170
 *    1a. surprise >= 66%
 *    1b. happiness >=66%
 *    1c. fear >= 66%
 *    1d. (disgust >= 50%) and ((fear + anger + surprise) >= 50%)
 * 
 *    2. slow tempo < 120
 *    2a. sadness >= 66%
 *    2b. (sadness <= 50%) + (neutral <= 50%)
 * 
 *    3. mid  tempo 120 <= tempo <= 170
 *    3a. neutral >= 50%
 * 
 * Energy represents perceptual measure of intensity and activity
 *    - a low energy would equate to sadness, neutral emotion
 *    - a medium energy could equate to a low to mid range level of disgust
 *    - a high energy could equate to high anger or happiness or surprise
 * 
 * to get the value for Energy:
 *    1. if Sadness or Neutral > 50%
 *    2. 1.0 - (Sadness + Neutral)
 *    3. if ((Sadness < 50%) or (Neutral < 50%))
 *    4. 1.0 - (Sadness + Neutral) + Disgust
 *    5. if (anger > 67%) or (happiness > 67%) or (surprise > 67%)
 *    6. 0.0 + ((anger + happiness + surprise) / 3) - (33% < disgust < 67%) - ((sadness + neutral) / 2)
 * 
 * Danceability probably won't factor much into this due to it mainly being for how usable a track is for dancing
 *    - determined by combination of tempo, rythem stability, beat strength, overall regularity among others not named on a 0.0 - 1.0 scale
 *    - only used if (energy >= 67%) + (valence >= 67%)
 * 
 * 
 * 
 * 
 */