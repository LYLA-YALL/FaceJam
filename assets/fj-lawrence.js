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
 * curl -X "GET" "https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_genres=classical%2Ccountry%2Cmetal%2Crock&min_acousticness=0.7&max_acousticness=1.0&target_acousticness=1.0&min_danceability=0.1&max_danceability=0.8&target_danceability=0.5&min_duration_ms=3000&max_duration_ms=30000&target_duration_ms=24000&min_energy=0.5&max_energy=0.7&target_energy=1.0&min_instrumentalness=0.0&max_instrumentalness=1.0&target_instrumentalness=0.5&min_key=0&max_key=2&target_key=1&min_liveness=0.3&max_liveness=1.0&target_liveness=0.8&min_loudness=-60&max_loudness=0&target_loudness=-30&min_mode=0&max_mode=1&target_mode=1&min_popularity=50&max_popularity=100&target_popularity=75&min_speechiness=0.0&max_speechiness=0.5&target_speechiness=0.3&min_tempo=150&max_tempo=180&target_tempo=160&min_time_signature=3&max_time_signature=4&target_time_signature=4&min_valence=0.5&max_valence=1.0&target_valence=0.7" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer <authorization>"
 * 
 */


curl -X "GET" "https://api.spotify.com/v1/recommendations?limit=10&market=US&seed_genres=classical%2Ccountry%2Crock%2Cmetal" -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer <authorization>"


{
    "tracks": [
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/1IQ2e1buppatiN1bxUVkrk"
                        },
                        "href": "https://api.spotify.com/v1/artists/1IQ2e1buppatiN1bxUVkrk",
                        "id": "1IQ2e1buppatiN1bxUVkrk",
                        "name": "Slayer",
                        "type": "artist",
                        "uri": "spotify:artist:1IQ2e1buppatiN1bxUVkrk"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/09ghSsJ7jalI4jWtf7E08b"
                },
                "href": "https://api.spotify.com/v1/albums/09ghSsJ7jalI4jWtf7E08b",
                "id": "09ghSsJ7jalI4jWtf7E08b",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/5c71b2cb04211737cb900483003e48dd140b77bf",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/62037290c8cea115e96245fdb1ef73c69df42304",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/921e0caaf92e20eda6919d68ff660c4077748be3",
                        "width": 64
                    }
                ],
                "name": "South Of Heaven",
                "type": "album",
                "uri": "spotify:album:09ghSsJ7jalI4jWtf7E08b"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1IQ2e1buppatiN1bxUVkrk"
                    },
                    "href": "https://api.spotify.com/v1/artists/1IQ2e1buppatiN1bxUVkrk",
                    "id": "1IQ2e1buppatiN1bxUVkrk",
                    "name": "Slayer",
                    "type": "artist",
                    "uri": "spotify:artist:1IQ2e1buppatiN1bxUVkrk"
                }
            ],
            "disc_number": 1,
            "duration_ms": 298533,
            "explicit": true,
            "external_ids": {
                "isrc": "USSM18800154"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/1f2nJKg780VxYIveVq6Xej"
            },
            "href": "https://api.spotify.com/v1/tracks/1f2nJKg780VxYIveVq6Xej",
            "id": "1f2nJKg780VxYIveVq6Xej",
            "is_playable": true,
            "name": "South Of Heaven",
            "popularity": 57,
            "preview_url": null,
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:1f2nJKg780VxYIveVq6Xej"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/2KaW48xlLnXC2v8tvyhWsa"
                        },
                        "href": "https://api.spotify.com/v1/artists/2KaW48xlLnXC2v8tvyhWsa",
                        "id": "2KaW48xlLnXC2v8tvyhWsa",
                        "name": "Amaranthe",
                        "type": "artist",
                        "uri": "spotify:artist:2KaW48xlLnXC2v8tvyhWsa"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/0KarQshwC6eEV3fnIpnfzk"
                },
                "href": "https://api.spotify.com/v1/albums/0KarQshwC6eEV3fnIpnfzk",
                "id": "0KarQshwC6eEV3fnIpnfzk",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/28a67ecda0f6b644e64b78ed4101f54e58119549",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/eb15f2d566ea307188bc6d0bb4888d40aecd7a48",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/2e7feaffe25b11d8357171be4c14d5889b8762e3",
                        "width": 64
                    }
                ],
                "name": "MASSIVE ADDICTIVE",
                "type": "album",
                "uri": "spotify:album:0KarQshwC6eEV3fnIpnfzk"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/2KaW48xlLnXC2v8tvyhWsa"
                    },
                    "href": "https://api.spotify.com/v1/artists/2KaW48xlLnXC2v8tvyhWsa",
                    "id": "2KaW48xlLnXC2v8tvyhWsa",
                    "name": "Amaranthe",
                    "type": "artist",
                    "uri": "spotify:artist:2KaW48xlLnXC2v8tvyhWsa"
                }
            ],
            "disc_number": 1,
            "duration_ms": 197666,
            "explicit": false,
            "external_ids": {
                "isrc": "FIUM71400485"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/6vpnMc4RI046H2Pqyf8bp7"
            },
            "href": "https://api.spotify.com/v1/tracks/6vpnMc4RI046H2Pqyf8bp7",
            "id": "6vpnMc4RI046H2Pqyf8bp7",
            "is_playable": true,
            "name": "Digital World",
            "popularity": 9,
            "preview_url": null,
            "track_number": 5,
            "type": "track",
            "uri": "spotify:track:6vpnMc4RI046H2Pqyf8bp7"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d"
                        },
                        "href": "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
                        "id": "1dfeR4HaWDbWqFHLkxsg1d",
                        "name": "Queen",
                        "type": "artist",
                        "uri": "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/6X9k3hSsvQck2OfKYdBbXr"
                },
                "href": "https://api.spotify.com/v1/albums/6X9k3hSsvQck2OfKYdBbXr",
                "id": "6X9k3hSsvQck2OfKYdBbXr",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/f6e02ce8bc9e91afa0e220703072c20bf72c72c5",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/f4111b2cd4d2459cfdf9aad9010d74c97b7e3a68",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/8ea6edc8b88d8777c931bff14f48d70503de674c",
                        "width": 64
                    }
                ],
                "name": "A Night At The Opera (Deluxe Remastered Version)",
                "type": "album",
                "uri": "spotify:album:6X9k3hSsvQck2OfKYdBbXr"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1dfeR4HaWDbWqFHLkxsg1d"
                    },
                    "href": "https://api.spotify.com/v1/artists/1dfeR4HaWDbWqFHLkxsg1d",
                    "id": "1dfeR4HaWDbWqFHLkxsg1d",
                    "name": "Queen",
                    "type": "artist",
                    "uri": "spotify:artist:1dfeR4HaWDbWqFHLkxsg1d"
                }
            ],
            "disc_number": 1,
            "duration_ms": 170800,
            "explicit": false,
            "external_ids": {
                "isrc": "GBUM71029609"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/4OKf7CcYuw5H2HptkcKxcP"
            },
            "href": "https://api.spotify.com/v1/tracks/4OKf7CcYuw5H2HptkcKxcP",
            "id": "4OKf7CcYuw5H2HptkcKxcP",
            "is_playable": true,
            "linked_from": {
                "external_urls": {
                    "spotify": "https://open.spotify.com/track/5YtxOL4iUchhynLL9nEBwQ"
                },
                "href": "https://api.spotify.com/v1/tracks/5YtxOL4iUchhynLL9nEBwQ",
                "id": "5YtxOL4iUchhynLL9nEBwQ",
                "type": "track",
                "uri": "spotify:track:5YtxOL4iUchhynLL9nEBwQ"
            },
            "name": "You're My Best Friend",
            "popularity": 57,
            "preview_url": null,
            "track_number": 4,
            "type": "track",
            "uri": "spotify:track:4OKf7CcYuw5H2HptkcKxcP"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/1385hLNbrnbCJGokfH2ac2"
                        },
                        "href": "https://api.spotify.com/v1/artists/1385hLNbrnbCJGokfH2ac2",
                        "id": "1385hLNbrnbCJGokfH2ac2",
                        "name": "Franz Liszt",
                        "type": "artist",
                        "uri": "spotify:artist:1385hLNbrnbCJGokfH2ac2"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/0lCIft2ZPbRqay0ZXrd5WZ"
                },
                "href": "https://api.spotify.com/v1/albums/0lCIft2ZPbRqay0ZXrd5WZ",
                "id": "0lCIft2ZPbRqay0ZXrd5WZ",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/6261dbbe4d099e69f278b0008672a7e99df07f4a",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/587c55f9d85183cefdff90c8f7b70d919b7ca74a",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/6f928a5a930ea2b586ecf8d29c9115978f8f270c",
                        "width": 64
                    }
                ],
                "name": "Liszt: 6 Consolations / Ave Maria",
                "type": "album",
                "uri": "spotify:album:0lCIft2ZPbRqay0ZXrd5WZ"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1385hLNbrnbCJGokfH2ac2"
                    },
                    "href": "https://api.spotify.com/v1/artists/1385hLNbrnbCJGokfH2ac2",
                    "id": "1385hLNbrnbCJGokfH2ac2",
                    "name": "Franz Liszt",
                    "type": "artist",
                    "uri": "spotify:artist:1385hLNbrnbCJGokfH2ac2"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/6G3yiYP83XDbDEq3MuZsMs"
                    },
                    "href": "https://api.spotify.com/v1/artists/6G3yiYP83XDbDEq3MuZsMs",
                    "id": "6G3yiYP83XDbDEq3MuZsMs",
                    "name": "Philip Thomson",
                    "type": "artist",
                    "uri": "spotify:artist:6G3yiYP83XDbDEq3MuZsMs"
                }
            ],
            "disc_number": 1,
            "duration_ms": 203666,
            "explicit": false,
            "external_ids": {
                "isrc": "HKI199704110"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/72avKXjk0UTESGbVsxmjwG"
            },
            "href": "https://api.spotify.com/v1/tracks/72avKXjk0UTESGbVsxmjwG",
            "id": "72avKXjk0UTESGbVsxmjwG",
            "is_playable": true,
            "name": "Consolations, S172/R12: No. 2. Un poco piu mosso",
            "popularity": 54,
            "preview_url": "https://p.scdn.co/mp3-preview/1016a9a6a2a1c9aab0921a63f1310b4f47729ab5?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 10,
            "type": "track",
            "uri": "spotify:track:72avKXjk0UTESGbVsxmjwG"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/5jfImMkUYyViFJrhdfYt1c"
                        },
                        "href": "https://api.spotify.com/v1/artists/5jfImMkUYyViFJrhdfYt1c",
                        "id": "5jfImMkUYyViFJrhdfYt1c",
                        "name": "Austin Burke",
                        "type": "artist",
                        "uri": "spotify:artist:5jfImMkUYyViFJrhdfYt1c"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/3Shx1t7ZJq56atPROo1lTN"
                },
                "href": "https://api.spotify.com/v1/albums/3Shx1t7ZJq56atPROo1lTN",
                "id": "3Shx1t7ZJq56atPROo1lTN",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/690052bc5e9dff4a0ac0ba5ef11dd17cb3c8c7b7",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/a306fefb35fe0f0804f205c2ec1adf74164a9c39",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/bfd29c5c321cd3fd0b67077a12d891322049dabf",
                        "width": 64
                    }
                ],
                "name": "Sleepin' Around",
                "type": "album",
                "uri": "spotify:album:3Shx1t7ZJq56atPROo1lTN"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/5jfImMkUYyViFJrhdfYt1c"
                    },
                    "href": "https://api.spotify.com/v1/artists/5jfImMkUYyViFJrhdfYt1c",
                    "id": "5jfImMkUYyViFJrhdfYt1c",
                    "name": "Austin Burke",
                    "type": "artist",
                    "uri": "spotify:artist:5jfImMkUYyViFJrhdfYt1c"
                }
            ],
            "disc_number": 1,
            "duration_ms": 177466,
            "explicit": false,
            "external_ids": {
                "isrc": "GBKPL1672713"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/2epIcEoW44P2YWzFfUJQ2c"
            },
            "href": "https://api.spotify.com/v1/tracks/2epIcEoW44P2YWzFfUJQ2c",
            "id": "2epIcEoW44P2YWzFfUJQ2c",
            "is_playable": true,
            "name": "Sleepin' Around",
            "popularity": 51,
            "preview_url": "https://p.scdn.co/mp3-preview/0e4fa4038466851bf4e0fa02fe93e1fdb07fbe79?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 1,
            "type": "track",
            "uri": "spotify:track:2epIcEoW44P2YWzFfUJQ2c"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/0Kekt6CKSo0m5mivKcoH51"
                        },
                        "href": "https://api.spotify.com/v1/artists/0Kekt6CKSo0m5mivKcoH51",
                        "id": "0Kekt6CKSo0m5mivKcoH51",
                        "name": "Sergei Rachmaninoff",
                        "type": "artist",
                        "uri": "spotify:artist:0Kekt6CKSo0m5mivKcoH51"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/6TSeLJGbqwbyYa8RnOtW5G"
                },
                "href": "https://api.spotify.com/v1/albums/6TSeLJGbqwbyYa8RnOtW5G",
                "id": "6TSeLJGbqwbyYa8RnOtW5G",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/37e37cd8129ff4f8afcc383d93b64aa94993b234",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/c86eeb623ac2a0b2195e85f0b61e6d8c0a95a478",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/25e205b2adb6f0a94f04da361ef0e27d5287458d",
                        "width": 64
                    }
                ],
                "name": "Rachmaninov (The Best Of)",
                "type": "album",
                "uri": "spotify:album:6TSeLJGbqwbyYa8RnOtW5G"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0Kekt6CKSo0m5mivKcoH51"
                    },
                    "href": "https://api.spotify.com/v1/artists/0Kekt6CKSo0m5mivKcoH51",
                    "id": "0Kekt6CKSo0m5mivKcoH51",
                    "name": "Sergei Rachmaninoff",
                    "type": "artist",
                    "uri": "spotify:artist:0Kekt6CKSo0m5mivKcoH51"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/0SPYS9NzfjFEplX7yD7PsK"
                    },
                    "href": "https://api.spotify.com/v1/artists/0SPYS9NzfjFEplX7yD7PsK",
                    "id": "0SPYS9NzfjFEplX7yD7PsK",
                    "name": "Maria Kliegel",
                    "type": "artist",
                    "uri": "spotify:artist:0SPYS9NzfjFEplX7yD7PsK"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/27RDJ5lNpeB21OEIWxbxVJ"
                    },
                    "href": "https://api.spotify.com/v1/artists/27RDJ5lNpeB21OEIWxbxVJ",
                    "id": "27RDJ5lNpeB21OEIWxbxVJ",
                    "name": "Raymund Havenith",
                    "type": "artist",
                    "uri": "spotify:artist:27RDJ5lNpeB21OEIWxbxVJ"
                }
            ],
            "disc_number": 1,
            "duration_ms": 417240,
            "explicit": false,
            "external_ids": {
                "isrc": "HKI199708702"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/1jsymmUYkC76PZcCgZTG49"
            },
            "href": "https://api.spotify.com/v1/tracks/1jsymmUYkC76PZcCgZTG49",
            "id": "1jsymmUYkC76PZcCgZTG49",
            "is_playable": true,
            "name": "14 Songs, Op. 34: Vocalise, Op. 34, No. 14",
            "popularity": 43,
            "preview_url": "https://p.scdn.co/mp3-preview/0ca7b38f39a80d75190f58ceb2b098412137b07a?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 2,
            "type": "track",
            "uri": "spotify:track:1jsymmUYkC76PZcCgZTG49"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/1dID9zgn0OV0Y8ud7Mh2tS"
                        },
                        "href": "https://api.spotify.com/v1/artists/1dID9zgn0OV0Y8ud7Mh2tS",
                        "id": "1dID9zgn0OV0Y8ud7Mh2tS",
                        "name": "Dustin Lynch",
                        "type": "artist",
                        "uri": "spotify:artist:1dID9zgn0OV0Y8ud7Mh2tS"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/23cuZhPWDfX1uKD4qwuv7t"
                },
                "href": "https://api.spotify.com/v1/albums/23cuZhPWDfX1uKD4qwuv7t",
                "id": "23cuZhPWDfX1uKD4qwuv7t",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/be13e1979c8a3b6c509fddd02e86917bacb79639",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/9ac99ccfcd8c9c8f32df092459b8351ce9b58a6b",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/998a5c450552c2e0437b8fb51a89a7afb59b0b0d",
                        "width": 64
                    }
                ],
                "name": "Current Mood",
                "type": "album",
                "uri": "spotify:album:23cuZhPWDfX1uKD4qwuv7t"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1dID9zgn0OV0Y8ud7Mh2tS"
                    },
                    "href": "https://api.spotify.com/v1/artists/1dID9zgn0OV0Y8ud7Mh2tS",
                    "id": "1dID9zgn0OV0Y8ud7Mh2tS",
                    "name": "Dustin Lynch",
                    "type": "artist",
                    "uri": "spotify:artist:1dID9zgn0OV0Y8ud7Mh2tS"
                }
            ],
            "disc_number": 1,
            "duration_ms": 205733,
            "explicit": false,
            "external_ids": {
                "isrc": "US58E1700584"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/2YMhrXQYKkm4kXLcXKKd5z"
            },
            "href": "https://api.spotify.com/v1/tracks/2YMhrXQYKkm4kXLcXKKd5z",
            "id": "2YMhrXQYKkm4kXLcXKKd5z",
            "is_playable": true,
            "name": "Small Town Boy",
            "popularity": 80,
            "preview_url": "https://p.scdn.co/mp3-preview/9d148928a43a193fc46496e16c33576f9a520469?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 3,
            "type": "track",
            "uri": "spotify:track:2YMhrXQYKkm4kXLcXKKd5z"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/13Of0gTz6vyIphtPBPgOYh"
                        },
                        "href": "https://api.spotify.com/v1/artists/13Of0gTz6vyIphtPBPgOYh",
                        "id": "13Of0gTz6vyIphtPBPgOYh",
                        "name": "Nikolai Tokarev",
                        "type": "artist",
                        "uri": "spotify:artist:13Of0gTz6vyIphtPBPgOYh"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/5lpfGaObTKMHdZ4iQZFWnw"
                        },
                        "href": "https://api.spotify.com/v1/artists/5lpfGaObTKMHdZ4iQZFWnw",
                        "id": "5lpfGaObTKMHdZ4iQZFWnw",
                        "name": "Giuseppe Andaloro",
                        "type": "artist",
                        "uri": "spotify:artist:5lpfGaObTKMHdZ4iQZFWnw"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/33zC4jWgBRURDclBVL7F9W"
                        },
                        "href": "https://api.spotify.com/v1/artists/33zC4jWgBRURDclBVL7F9W",
                        "id": "33zC4jWgBRURDclBVL7F9W",
                        "name": "Herbert Schuch",
                        "type": "artist",
                        "uri": "spotify:artist:33zC4jWgBRURDclBVL7F9W"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/19oxtDOnRGGA3qsQF6I7e3"
                        },
                        "href": "https://api.spotify.com/v1/artists/19oxtDOnRGGA3qsQF6I7e3",
                        "id": "19oxtDOnRGGA3qsQF6I7e3",
                        "name": "Robert Levin",
                        "type": "artist",
                        "uri": "spotify:artist:19oxtDOnRGGA3qsQF6I7e3"
                    },
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/2dwgNdwwrqJiKJwDdz8IP3"
                        },
                        "href": "https://api.spotify.com/v1/artists/2dwgNdwwrqJiKJwDdz8IP3",
                        "id": "2dwgNdwwrqJiKJwDdz8IP3",
                        "name": "Vladimir Kharin",
                        "type": "artist",
                        "uri": "spotify:artist:2dwgNdwwrqJiKJwDdz8IP3"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/14S84oRhjPyiff7zhRWRzr"
                },
                "href": "https://api.spotify.com/v1/albums/14S84oRhjPyiff7zhRWRzr",
                "id": "14S84oRhjPyiff7zhRWRzr",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/a4587f9439da9de6a942527cb670e76718890141",
                        "width": 623
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/9583afd96654acd5b1f29a9753be28fd5fbf9b9a",
                        "width": 292
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/aa4af286c25d54e52916c5825969c0ba49fd3a93",
                        "width": 62
                    }
                ],
                "name": "Variations (Edition Ruhr Piano Festival, Vol. 14)",
                "type": "album",
                "uri": "spotify:album:14S84oRhjPyiff7zhRWRzr"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/1C3sffOOvQNUwg4YIsvKqy"
                    },
                    "href": "https://api.spotify.com/v1/artists/1C3sffOOvQNUwg4YIsvKqy",
                    "id": "1C3sffOOvQNUwg4YIsvKqy",
                    "name": "César Franck",
                    "type": "artist",
                    "uri": "spotify:artist:1C3sffOOvQNUwg4YIsvKqy"
                },
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/5lpfGaObTKMHdZ4iQZFWnw"
                    },
                    "href": "https://api.spotify.com/v1/artists/5lpfGaObTKMHdZ4iQZFWnw",
                    "id": "5lpfGaObTKMHdZ4iQZFWnw",
                    "name": "Giuseppe Andaloro",
                    "type": "artist",
                    "uri": "spotify:artist:5lpfGaObTKMHdZ4iQZFWnw"
                }
            ],
            "disc_number": 1,
            "duration_ms": 830493,
            "explicit": false,
            "external_ids": {
                "isrc": "DEAQ70500866"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/7ivXObFl4X6vZUa4cKgApz"
            },
            "href": "https://api.spotify.com/v1/tracks/7ivXObFl4X6vZUa4cKgApz",
            "id": "7ivXObFl4X6vZUa4cKgApz",
            "is_playable": true,
            "name": "Prélude, Fugue and Variation in B Minor for Organ, FWV 30, Op. 18: Prélude, Fugue and Variation in B Minor for Organ, FWV 30, Op. 18 - Live",
            "popularity": 35,
            "preview_url": "https://p.scdn.co/mp3-preview/a6fe8f05be2be88511b4901775a457df65b66043?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 4,
            "type": "track",
            "uri": "spotify:track:7ivXObFl4X6vZUa4cKgApz"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/3UbyYnvNIT5DFXU4WgiGpP"
                        },
                        "href": "https://api.spotify.com/v1/artists/3UbyYnvNIT5DFXU4WgiGpP",
                        "id": "3UbyYnvNIT5DFXU4WgiGpP",
                        "name": "Whitesnake",
                        "type": "artist",
                        "uri": "spotify:artist:3UbyYnvNIT5DFXU4WgiGpP"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/0CCJc4HNZTsrGFQfI7lnx9"
                },
                "href": "https://api.spotify.com/v1/albums/0CCJc4HNZTsrGFQfI7lnx9",
                "id": "0CCJc4HNZTsrGFQfI7lnx9",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/a4d48364ab1b5a69b6d1b2e8ddf84e3ba5e6d96a",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/7c182b18a0bd8e9d321f484d3bc30046db76e3b4",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/c1dfb825cbc35dbf62ce27cd764b1c75e99927ee",
                        "width": 64
                    }
                ],
                "name": "Whitesnake (30th Anniversary Remaster)",
                "type": "album",
                "uri": "spotify:album:0CCJc4HNZTsrGFQfI7lnx9"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/3UbyYnvNIT5DFXU4WgiGpP"
                    },
                    "href": "https://api.spotify.com/v1/artists/3UbyYnvNIT5DFXU4WgiGpP",
                    "id": "3UbyYnvNIT5DFXU4WgiGpP",
                    "name": "Whitesnake",
                    "type": "artist",
                    "uri": "spotify:artist:3UbyYnvNIT5DFXU4WgiGpP"
                }
            ],
            "disc_number": 1,
            "duration_ms": 275693,
            "explicit": false,
            "external_ids": {
                "isrc": "GB01A1700005"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/0PP933bHgvV0eD19dG3ms5"
            },
            "href": "https://api.spotify.com/v1/tracks/0PP933bHgvV0eD19dG3ms5",
            "id": "0PP933bHgvV0eD19dG3ms5",
            "is_playable": true,
            "linked_from": {
                "external_urls": {
                    "spotify": "https://open.spotify.com/track/1Ll8UuomlZEhuZYLxUz09J"
                },
                "href": "https://api.spotify.com/v1/tracks/1Ll8UuomlZEhuZYLxUz09J",
                "id": "1Ll8UuomlZEhuZYLxUz09J",
                "type": "track",
                "uri": "spotify:track:1Ll8UuomlZEhuZYLxUz09J"
            },
            "name": "Here I Go Again 87 - 2017 Remastered Version",
            "popularity": 62,
            "preview_url": "https://p.scdn.co/mp3-preview/cf5e7d1ae4471ab49f6c74e30f6228bb383a2343?cid=774b29d4f13844c495f206cafdad9c86",
            "track_number": 5,
            "type": "track",
            "uri": "spotify:track:0PP933bHgvV0eD19dG3ms5"
        },
        {
            "album": {
                "album_type": "ALBUM",
                "artists": [
                    {
                        "external_urls": {
                            "spotify": "https://open.spotify.com/artist/2hJPr4lk7Q8SSvCVBl9fWM"
                        },
                        "href": "https://api.spotify.com/v1/artists/2hJPr4lk7Q8SSvCVBl9fWM",
                        "id": "2hJPr4lk7Q8SSvCVBl9fWM",
                        "name": "Kip Moore",
                        "type": "artist",
                        "uri": "spotify:artist:2hJPr4lk7Q8SSvCVBl9fWM"
                    }
                ],
                "external_urls": {
                    "spotify": "https://open.spotify.com/album/3rvfQP9TlSJGjFMkhNEDtY"
                },
                "href": "https://api.spotify.com/v1/albums/3rvfQP9TlSJGjFMkhNEDtY",
                "id": "3rvfQP9TlSJGjFMkhNEDtY",
                "images": [
                    {
                        "height": 640,
                        "url": "https://i.scdn.co/image/3e330848be530a8da7cf9ff80b8ab15029d898a5",
                        "width": 640
                    },
                    {
                        "height": 300,
                        "url": "https://i.scdn.co/image/38b3e1008aed010e303846c300583c50e26f5923",
                        "width": 300
                    },
                    {
                        "height": 64,
                        "url": "https://i.scdn.co/image/6f2f2fad5076114b71189d74112329c0950dd593",
                        "width": 64
                    }
                ],
                "name": "Wild Ones (Deluxe)",
                "type": "album",
                "uri": "spotify:album:3rvfQP9TlSJGjFMkhNEDtY"
            },
            "artists": [
                {
                    "external_urls": {
                        "spotify": "https://open.spotify.com/artist/2hJPr4lk7Q8SSvCVBl9fWM"
                    },
                    "href": "https://api.spotify.com/v1/artists/2hJPr4lk7Q8SSvCVBl9fWM",
                    "id": "2hJPr4lk7Q8SSvCVBl9fWM",
                    "name": "Kip Moore",
                    "type": "artist",
                    "uri": "spotify:artist:2hJPr4lk7Q8SSvCVBl9fWM"
                }
            ],
            "disc_number": 1,
            "duration_ms": 212720,
            "explicit": false,
            "external_ids": {
                "isrc": "USUM71507826"
            },
            "external_urls": {
                "spotify": "https://open.spotify.com/track/1xT8auZdc8Rksi7RSGZoax"
            },
            "href": "https://api.spotify.com/v1/tracks/1xT8auZdc8Rksi7RSGZoax",
            "id": "1xT8auZdc8Rksi7RSGZoax",
            "is_playable": true,
            "name": "Running For You",
            "popularity": 56,
            "preview_url": null,
            "track_number": 12,
            "type": "track",
            "uri": "spotify:track:1xT8auZdc8Rksi7RSGZoax"
        }
    ],
        "seeds": [
            {
                "initialPoolSize": 517,
                "afterFilteringSize": 313,
                "afterRelinkingSize": 312,
                "id": "classical",
                "type": "GENRE",
                "href": null
            },
            {
                "initialPoolSize": 999,
                "afterFilteringSize": 313,
                "afterRelinkingSize": 311,
                "id": "country",
                "type": "GENRE",
                "href": null
            },
            {
                "initialPoolSize": 997,
                "afterFilteringSize": 313,
                "afterRelinkingSize": 313,
                "id": "rock",
                "type": "GENRE",
                "href": null
            },
            {
                "initialPoolSize": 100,
                "afterFilteringSize": 100,
                "afterRelinkingSize": 98,
                "id": "metal",
                "type": "GENRE",
                "href": null
            }
        ]
}