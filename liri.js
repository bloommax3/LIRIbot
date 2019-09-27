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
        console.log(JSON.stringify(response.data));
    }
  );
}

function music(){
    var command = process.argv.slice(3).join(" ")
    spotify
    .search({ type: 'track', query: command })
    .then(function(response) {
      console.log(response.tracks.items);
    })
    .catch(function(err) {
      console.log(err);
    });
}