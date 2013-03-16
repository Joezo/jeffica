
var nodeAction = function(client){
	this.__client = client;
};

nodeAction.prototype.__getClient = function(){
	return this.__client;
};

module.exports = nodeAction;

nodeAction.prototype.run = function(command){
	console.log("Processing command for: " + command);
	this[command]();
	console.log("Command completed");
};

nodeAction.prototype.takeoff = function(){
	console.log("Taking off");
  var client = this.__getClient();
  client.animateLeds("snakeGreenRed", 1, 10);
  client.takeoff();
};

nodeAction.prototype.stop = function(){
	console.log("Stopping and landing");
  var client = this.__getClient();
  client.stop();
  client.land();
};

nodeAction.prototype.back = function(){
	console.log("Going backward");
	var client = this.__getClient();
	client.back(0.5);
};

nodeAction.prototype.forward = function(){
	console.log("Going forward");
	var client = this.__getClient();
	client.front(0.5);
};

nodeAction.prototype.left = function(){
	console.log("Going left");
	var client = this.__getClient();
	client.left(0.5);
};

nodeAction.prototype.right = function(){
	console.log("Going right");
	var client = this.__getClient();
	client.right(0.5);
};

nodeAction.prototype.up = function(){
	console.log("Going up");
	var client = this.__getClient();
	client.up(0.5);
};

nodeAction.prototype.down = function(){
	console.log("Going down");
	var client = this.__getClient();
	client.down(0.5);
};

nodeAction.prototype.clockwise = function(){
	console.log("Turning clockwise");
	var client = this.__getClient();
	client.clockwise(0.5);
};

nodeAction.prototype.counterClockwise = function(){
	console.log("Going forward");
	var client = this.__getClient();
	client.counterClockwise(0.5);
};

nodeAction.prototype.demo = function() {
  var client = this.__getClient();
	
  client.animateLeds("snakeGreenRed", 1, 10);
  client.takeoff();
  client
	  // .after(5000, function () {
	  //   this.clockwise(0.25);
	  // })
	  .after(5000, function () {
	    this.stop();
	  })
	  .after(1000, function () {
	    this.front(0.7);
	  })
	  // .after(3000, function () {
	  //   this.stop();
	  // })
	  .after(500, function () {
	    this.right(0.9);
	  })
	  .after(1000, function () {
	    this.stop();
	  })
	  .after(1000, function () {
	    this.animate('flipLeft', 15);
	  })
	  .after(1000, function () {
	    this.stop();
	  })
	  .after(2000, function () {
	    this.land();
	  });
};
