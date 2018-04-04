
var dotenv = require('dotenv').config();
var fs = require('fs');
var request = require('request');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var keys = require('./keys.js');

var selection = process.argv[2];
var valueArr = [];
var value;

for (var i = 3; i < process.argv.length; i++) {
    valueArr.push(process.argv[i]);
    value = valueArr.join(',');
    value = value.replace(/,/g, ' ');
}

fs.appendFile('./log.txt', '\n' + selection + '\n' + value, function (error) {
    if (error) {
        console.log(error);
    }
});

if (selection === 'do-what-it-says') {

    var randomText = fs.readFileSync('./random.txt', 'utf8')
    randomText = randomText.split(',');
    selection = randomText[0];
    value = randomText[1];
}

if (selection === 'my-tweets') {

    var client = new Twitter(keys.twitter);
    var params = { screen_name: 'cj93032', count: 20 };

    if (value !== undefined) {
        params.screen_name = value;
    }

    client.get('statuses/user_timeline', params, function (error, tweets, response) {

        if (!error) {

            for (var i = 0; i < tweets.length; i++) {

                var tweetData = `
                    User name: ${tweets[i].user.name}
                    Screen name: ${tweets[i].user.screen_name}
                    Tweet: ${tweets[i].text}
                    Date created: ${tweets[i].user.created_at}
                `;
                console.log(tweetData);
                fs.appendFile('./log.txt', tweetData, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log(error);
        }
    });
}

if (selection === 'spotify-this-song') {

    var songQuery = 'The Sign';
    if (value !== undefined) {
        songQuery = value;
    }

    var spotify = new Spotify(keys.spotify);
    spotify.search({ type: 'track', query: songQuery, limit: 10 }, function (error, data) {

        if (!error) {

            for (var i = 0; i < data.tracks.items.length; i++) {
                var songData = `
                    Song name: ${data.tracks.items[i].name}
                    Album: ${data.tracks.items[i].album.name}
                    Artist(s): ${data.tracks.items[i].artists[0].name}
                    Song link: ${data.tracks.items[i].external_urls.spotify}
                `;
                console.log(songData);
                fs.appendFile('./log.txt', songData, function (error) {
                    if (error) {
                        console.log(error);
                    }
                });
            }
        } else {
            console.log(error);
        }
    });
}

if (selection === 'movie-this') {

    var movieName = value;

    if (movieName === undefined) {
        movieName = 'Mr. Nobody';
    }

    var queryUrl = `http://www.omdbapi.com/?t=${movieName}&y=&plot=short&apikey=trilogy`;

    request(queryUrl, function (error, response, body) {

        if (!error && response.statusCode === 200) {
            
            var head = JSON.parse(body);
            var movieData = `
                Title: ${head.Title} 
                Year: ${head.Year}
                IMDB Rating: ${head.imdbRating}
                Rotten Tomatoes Rating: ${head.Ratings[1].Value}
                Country: ${head.Country}
                Language: ${head.Language}
                Plot: ${head.Plot}
                Actors: ${head.Actors}
            `;

            console.log(movieData);
            fs.appendFile('./log.txt', movieData, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        } else {
            console.log(error);
        }
    });
}

