var a = process.argv[2]
var axios = require("axios")
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
    id: "e7e4f7b844ff4bf7bbf15dbbc5da8b3d",
    secret: "98fb460da75040fe9e9a97963f61044d"
  });

switch(a){
    case `movie-this`:
        movie()
        break;
    case `spotify-this-song`:
        music()
        break;
    case ``:
}



function movie(){
    var command = process.argv.slice(3).join("+")
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
    var command = process.argv.slice(3).join(" ")
    spotify
    .search({ type: 'track', query: command, limit: 1 })
    .then(function(response) {
      let temp = response.tracks.items[0]
      console.log("------------------------------------")
      console.log("Song: "+ temp.name)
      console.log("Artist: "+temp.artists[0].name)
      console.log("Album: "+temp.album.name)
      console.log("Preview Link: "+temp.preview_url)
      console.log("------------------------------------")
    })
    .catch(function(err) {
      console.log(err);
    });
}