require("dotenv").config();

var keys = require('./keys');
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');

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
        getMovie();
    }else if(myprocess === "do-what-it-says"){
        doit();
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
    var jdata = data.tracks.items;
        if(err) {
            console.log(err);
        } else {
            console.log("DATA: ",jdata[0].name);
            console.log("Artist: ",jdata[0].artists[0].name);
            console.log("Preview: ",jdata[0].preview_url);
            console.log("Album: ",jdata[0].album.name);
        }
    });
}

function doit(){
    fs.readFile("random.txt","UTF-8",function(err,data){
        console.log(data);
       var  dataArr = data.split(',');
       console.log("dataArr: " ,dataArr);
        var task = dataArr[0];
        var song = dataArr[1];
        myprocess = task;
        songName = song;
        begInput();
    })
}

function getMovie(){
  request('http://www.omdbapi.com/?t=' + songName + '&apikey=trilogy', function (error, response, body) {
//  console.log('error:', error); // Print the error if one occurred
//  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', JSON.parse(body)); // Print the HTML for the Google homepage.
  console.log('body:', JSON.parse(body));
});

}
begInput();
