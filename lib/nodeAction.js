
var nodeAction = function(client){
	this.__client = client;
	this.speed = 0.5;
};

nodeAction.prototype.__getClient = function(){
	return this.__client;
};

module.exports = nodeAction;

nodeAction.prototype.run = function(command, control){
	console.log("Processing command for: " + command);
	this.speed = control == 'true' ? 0.5 : 0;
	this[command](control);
	console.log("Command completed");
};

nodeAction.prototype.takeoff = function(){
	console.log("Taking off");
  var client = this.__getClient();
  client.animateLeds("snakeGreenRed", 1, 10);
  client.takeoff();
};

nodeAction.prototype.stop = function(){
	console.log("Stopping");
  var client = this.__getClient();
  client.stop();
};

nodeAction.prototype.land = function(){
	console.log("Stopping and landing");
  var client = this.__getClient();
  client.stop();
  client.land();
};

nodeAction.prototype.back = function(){
	console.log("Going backward");
	var client = this.__getClient();
	console.log(this.speed);
	client.back(this.speed);
};

nodeAction.prototype.forward = function(){
	console.log("Going forward");
	var client = this.__getClient();
	client.front(this.speed);
};

nodeAction.prototype.left = function(){
	console.log("Going left");
	var client = this.__getClient();
	client.left(this.speed);
};

nodeAction.prototype.right = function(){
	console.log("Going right");
	var client = this.__getClient();
	client.right(this.speed);
};

nodeAction.prototype.up = function(){
	console.log("Going up");
	var client = this.__getClient();
	client.up(this.speed);
};

nodeAction.prototype.down = function(){
	console.log("Going down");
	var client = this.__getClient();
	client.down(this.speed);
};

nodeAction.prototype.clockwise = function(){
	console.log("Turning clockwise");
	var client = this.__getClient();
	client.clockwise(this.speed);
};

nodeAction.prototype.counterClockwise = function(){
	console.log("turning counter");
	var client = this.__getClient();
	client.counterClockwise(this.speed);
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
