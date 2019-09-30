var a = process.argv[2]
var axios = require("axios")
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "e7e4f7b844ff4bf7bbf15dbbc5da8b3d",
    secret: "98fb460da75040fe9e9a97963f61044d"
  });
var fs = require("fs")
var moment = require("moment")
moment().format()

//Create a switch to call the functions based on the argument
switch(a){
    case `movie-this`:
        movie()
        break;
    case `spotify-this-song`:
        music()
        break;
    case `concert-this`:
        concert()
        break;
    case `read-what-it-says`:
        reader()
        break;
}



function movie(){
    let command = process.argv.slice(3).join("+")
    // We then run the request with axios module on a URL with a JSON
    axios.get("http://www.omdbapi.com/?t="+command+"&y=&plot=short&apikey=trilogy").then(
        function(response) {
        // Then we print out the response
        let temp = response.data
        console.log("------------------------------------")
        console.log("Title: "+temp.Title)
        console.log("Starring: " +temp.Actors)
        console.log("Release Year: "+ temp.Year)
        console.log("Rating: "+temp.Rated)
        console.log("Language: "+temp.Language)
        console.log("Country: "+ temp.Country)
        console.log("Rotten Tomatoes Score: "+temp.Ratings[1].Value)
        console.log("Plot: "+temp.Plot)
        console.log("------------------------------------")
    }
  );
}

function music(){
    //Define what song we are searching for
    if(process.argv.slice(3).join(" ")===""){
        var song = "No Hands"
    }
    else{
        var song = process.argv.slice(3).join(" ")
    }
    spotify
    //Search for the song
    .search({ type: 'track', query: song, limit: 1 })
    .then(function(response) {
      //Print out the response
      let temp = response.tracks.items[0]
      console.log("------------------------------------")
      console.log("Song: "+ temp.name)
      console.log("Artist: "+temp.artists[0].name)
      console.log("Album: "+temp.album.name)
      console.log("Preview Link: "+temp.preview_url)
      console.log("------------------------------------")
    })
    //Catch errors
    .catch(function(err) {
      console.log(err);
    });
}

function concert(){
    let command = process.argv.slice(3).join("+")
    axios.get("https://rest.bandsintown.com/artists/" + command + "/events?app_id=codingbootcamp").then(function (response){
        console.log(response)
    }).catch(function(err){
        console.log(err+"error")
    })
}

function reader(){
    fs.readFile("read-what-it-says.txt", "utf8", function(err, data){
        //Read the text file and save its contents in an array
        var splitData = data.split(" ")
        //Get the command
        var b = splitData[0]
        //Build the search query that we can input into our functions
        for(i=1; i<splitData.length; i++){
            process.argv[i+2]=splitData[i]
        }
        //Use a switch to call the functions based on the split data
        switch(b){
            case `movie-this`:
                movie()
                break;
            case `spotify-this-song`:
                music()
                break;
            case `concert-this`:
                concert()
                break;

        }
    })
}