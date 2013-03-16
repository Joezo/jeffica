var arDrone = require('ar-drone');
var png = require('ar-drone-png-stream');

//web server stuff
var fs = require('fs');
var express = require('express');
var client = arDrone.createClient();
var app = express();

app.get('/', function (req, res) {
  var page = fs.readFileSync('view/index.html');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', page.length);
  res.end(page);
});

app.get('/demo', function (req, res) {
  var page = fs.readFileSync('view/demo.js');
  res.setHeader('Content-Type', 'text/javascript');
  res.setHeader('Content-Length', page.length);
  res.end(page);
  demo();
});
png(client, { port: 8000 });
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
  