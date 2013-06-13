var arDrone = require('ar-drone');
var png = require('ar-drone-png-stream');
var util = require('util');
var nodeAction = require('./lib/nodeAction.js');

//web server stuff
var fs = require('fs');
var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server);

var client = arDrone.createClient();
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
    renderString(res, page, 'text/json');
  });
});

//command actions here
app.get('/command/*', function(req, res){
	var command = req.params[0];
  var control = req.query['control'] || 'true';
  var value   = req.query['value'] || 0;
	actionObj.run(command, control, value);
    renderPage(res, 'view/command.js', 'text/javascript');
});

//png(client, { port: 8001 });
//console.log('PNG server listening on port 8001');
app.listen(3001, function() {
  console.log('Web server listening on port 3001');
});

// IO Callback
io.sockets.on('connection', function (socket) {
  socket.emit('connected', { hello: 'hello' });
});

//display a page to the browser
function renderPage(res, file, type) {
  var page = fs.readFileSync(file);
  renderString(res, page, type);
}

//display a string to the browser
function renderString(res, data, type){
	  res.setHeader('Content-Type', type);
	  res.setHeader('Content-Length', data.length);
	  res.end(data);	
}
