var express = require('express');
var server = express();
var port = process.env.PORT || 8080;
var axios = require('axios');
var darkKey = process.env.DARK_API || require ('./secrets.js').darkskyAPIkey
var geoKey = process.env.GOOG_API || require('./secrets.js').geocodeAPIkey
var locationRoot = 'https://maps.googleapis.com/maps/api/geocode/json?address=';

server.use(express.static(__dirname + '/public'));

server.get('/', function(request, response){
    response.sendFile('index.html', {root: __dirname + '/public/html'});
});

server.get('/weather/:lat,:lon', function (request, response) {
    var url = `https://api.darksky.net/forecast/${darkKey}/${request.params.lat},${request.params.lon}`;
    axios.get(url)
        .then(function(results){
            response.send(results.data);
        })
        .catch(function(err){
            response.send("larp");
        })
});

server.get('/location/:address', function(request, response){
    var address = request.params.address;
    var location = `${locationRoot}${address}&key=${geoKey}`;
    axios.get(location)
        .then(function(results){
            response.send(results.data);
        })
        .catch(function(err){
            response.send("err");
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