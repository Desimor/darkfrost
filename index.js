var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var axios = require('axios');
var apiKey = require ('./secrets.js').darkskyAPIkey

server.use(express.static(__dirname + '/public'));

server.get('/', function(request, response){
    response.sendFile('index.html', {root: __dirname + '/public/html'});
});

server.get('/weather/:lat,:lon', function (request, response) {
    var url = `https://api.darksky.net/forecast/${apiKey}/${request.params.lat},${request.params.lon}`;
    axios.get(url)
        .then(function(results){
            response.send(results.data);
        })
        .catch(function(err){
            console.log("This should be working!")
            response.send("larp");
            console.log("How is this not working!")
        })
});

server.listen(port, function () {
    console.log('Listening on port...', port);
});

// var darksky = require('darksky');
// var client = darksky.Client('mykey');

// client.forecast(37.8267, -122.423, function (data) {
//     process
//         .stdout
//         .write(d);
// }, function (err) {
//     console.error(err);
// });