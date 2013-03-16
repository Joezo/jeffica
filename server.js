var arDrone = require('ar-drone');
var png = require('ar-drone-png-stream');

//web server stuff
var fs = require('fs');
var express = require('express');
var client = arDrone.createClient();
var app = express();

client.config('general:navdata_demo', true);

app.get('/', function(req, res){
      renderPage(res, 'view/index.html', 'text/html');
	});

//serve all static files from /assests
app.use(express.static('assets'));

app.get('/demo', function(req, res){
      renderPage(res, 'view/demo.js', 'text/javascript');
      demo();
	});

app.get('/battery', function(req, res){
  client.on('batteryChange', function(e){
    res.end(e);
  });
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
