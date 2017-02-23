var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var request = require('request');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));



var moviesListingMockPipe = function (req, res) {

    var apiUrl, newUrl;
    var requestUrl = req.url;

    apiUrl = 'http://starlord.hackerearth.com';


    newUrl = apiUrl + requestUrl;

    console.log('REQUEST URL:::' + newUrl);

    try {
        req.pipe(request({url: newUrl})).pipe(res);
    } catch (err) {
        console.log(err);
    }
};

app.get('/simility/*', moviesListingMockPipe);


app.listen(8080);
console.log("App is listening on port 8080");

