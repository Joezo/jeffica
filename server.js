var arDrone = require('ar-drone');
var png = require('ar-drone-png-stream');

//web server stuff
var fs = require('fs');
var express = require('express');
var client = arDrone.createClient();
var app = express();

app.get('/', function(req, res){
      renderPage(res, 'view/index.html', 'text/html');
	});

app.get('/assets/js/main.js', function(req, res){
      renderPage(res, 'assets/js/main.js', 'text/javascript');
	});

app.get('/assets/js/jquery.min.js', function(req, res){
      renderPage(res, 'assets/js/jquery.min.js', 'text/javascript');
	});

app.get('/demo', function(req, res){
      renderPage(res, 'view/demo.js', 'text/javascript');
      demo();
	});

png(client, { port: 8000 });
console.log('PNG server listening on port 8000');
app.listen(3000);
console.log('Web server listening on port 3000');

//end web server stuff

function demo() {
  client.takeoff();

  client
      .after(5000, function () {
        this.clockwise(0.25);
      })
      .after(5000, function () {
        this.clockwise(0.25);
      })
      .after(5000, function () {
        this.clockwise(0.25);
      })
      .after(5000, function () {
        this.clockwise(0.25);
      })
      .after(3000, function () {
        this.animate('flipLeft', 15);
      })
      .after(1000, function () {
        this.stop();
      })
      .after(2000, function () {
        this.land();
      });
}

//display a page to the browser
function renderPage(res, file, type){
  var page = fs.readFileSync(file);
  res.setHeader('Content-Type', type);
  res.setHeader('Content-Length', page.length);
  res.end(page);	
}
