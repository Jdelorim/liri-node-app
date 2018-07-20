require("dotenv").config();

var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var songName = process.argv[3];
var myprocess = process.argv[2];
 
function begInput(){
    if(myprocess === "my-tweets"){
        getTweets();
    } else if (myprocess === "spotify-this-song") {
        getSong();
    } else if (myprocess === "movie-this"){

    }else if(myprocess === "do-what-it-says"){

    }else{
        console.log("Please enter one of the commands, stupid human");
        console.log("my-tweets");
        console.log("spotify-this-song");
        console.log("movie-this");
        console.log("do-what-it-says");

    }
}

function getTweets(){
    client.get('statuses/user_timeline', { screen_name: 'JoshuaDeLorimi1', count: 20},function(error,tweets,response){
        for(var i =0; i<20; i++){
    console.log(JSON.stringify(tweets[i].text,null,2));
        }
    });
}

function getSong(){
    spotify.search({type: 'track', query: songName},function(err,data){
        if(err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}
begInput();
