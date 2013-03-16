
var nodeAction = function(client){
	this.__client = client;
	this.speedValue = 0.5;
	this.speed = this.speedValue;
};

nodeAction.prototype.__getClient = function(){
	return this.__client;
};

module.exports = nodeAction;

nodeAction.prototype.run = function(command, control, value){
	console.log("Processing command for: " + command);
	this.speed = control == 'true' ? this.speedValue : 0;
	this[command](value);
	console.log("Command completed");
};

nodeAction.prototype.speed = function(value){
	console.log("Changing speed to: " + value);
	this.speedValue = value || 0;
	console.log("Speed change completed");
};

nodeAction.prototype.takeoff = function(){
	console.log("Taking off");
  var client = this.__getClient();
  client.animateLeds("snakeGreenRed", 1, 10);
  client.takeoff();
};

nodeAction.prototype.stop = function(){
	console.log("Stopping");
  this.__getClient().stop();
};

nodeAction.prototype.land = function(){
	console.log("Stopping and landing");
  var client = this.__getClient();
  client.stop();
  client.land();
};

nodeAction.prototype.back = function(){
	console.log("Going backward");
	this.__getClient().back(this.speed);
};

nodeAction.prototype.forward = function(){
	console.log("Going forward");
	this.__getClient().front(this.speed);
};

nodeAction.prototype.left = function(){
	console.log("Going left");
	this.__getClient().left(this.speed);
};

nodeAction.prototype.right = function(){
	console.log("Going right");
	this.__getClient().right(this.speed);
};

nodeAction.prototype.up = function(){
	console.log("Going up");
	this.__getClient().up(this.speed);
};

nodeAction.prototype.down = function(){
	console.log("Going down");
	this.__getClient().down(this.speed);
};

nodeAction.prototype.clockwise = function(){
	console.log("Turning clockwise");
	this.__getClient().clockwise(this.speed);
};

nodeAction.prototype.counterClockwise = function(){
	console.log("turning counter");
	this.__getClient().counterClockwise(this.speed);
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
