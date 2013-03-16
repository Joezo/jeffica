var arDrone = require('ar-drone');
var png = require('ar-drone-png-stream');
var util = require('util');
var nodeAction = require('./lib/nodeAction.js');

//web server stuff
var fs = require('fs');
var express = require('express');
var client = arDrone.createClient();
var app = express();

client.config('general:navdata_demo', true);

var actionObj = new nodeAction(client);

//serve all static files from /assets
app.use(express.static('assets'));

//main actions below
app.get('/', function(req, res){
      renderPage(res, 'view/index.html', 'text/html');
	});

app.get('/battery', function(req, res){
  client.on('batteryChange', function(e){
    batteryLevel = {batteryLevel: e};
    var page = JSON.stringify(batteryLevel);
    res.setHeader('Content-Type', 'text/json');
    res.setHeader('Content-Length', page.length);
    res.end(page);
  });
});

//command actions here
app.get('/command/*', function(req, res){
	var command = req.params[0];
	actionObj.run(command);
    renderPage(res, 'view/command.js', 'text/javascript');	
});

png(client, { port: 8001 });
console.log('PNG server listening on port 8001');
app.listen(3001);
console.log('Web server listening on port 3001');

//end web server stuff

//display a page to the browser
function renderPage(res, file, type) {
  var page = fs.readFileSync(file);
  res.setHeader('Content-Type', type);
  res.setHeader('Content-Length', page.length);
  res.end(page);
}
