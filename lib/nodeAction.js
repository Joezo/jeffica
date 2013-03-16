var util = require('util');	//debugging only

//constructor
var nodeAction = function(client){
	this.__client = client;
	this.speed = 0.5;
	this.__savedActions = [];	//all the actions processed in this instance
	this.__startTime = null;	//when the last action was given
};

//get the nodecoptor client
nodeAction.prototype.__getClient = function(){
	return this.__client;
};

//get the start time of the last action
nodeAction.prototype.__getStartTime = function(){
	return this.__startTime;
};

//sets the start time to now
nodeAction.prototype.__setStartTime = function(){
	var now = (new Date().getTime() / 1000);
	//console.log("setting command start time to: " + now);
	this.__startTime = now;
};

//get all the saved actions
nodeAction.prototype.__getSavedActions = function(){
	return this.__savedActions;
};

//save the last action performed
nodeAction.prototype.__saveAction = function(action){
	var currentActions = this.__getSavedActions();
	var tempRemember = {
		action: action,
		delay: ((new Date().getTime() / 1000) - this.__getStartTime())
	};
	currentActions.push(tempRemember);
	//console.log("saved action: " + util.inspect(tempRemember));
	console.log("Actions so far:");
	console.log(util.inspect(currentActions));
};

module.exports = nodeAction;

nodeAction.prototype.run = function(command, control){
	console.log("Processing command for: " + command + ' control: ' + control);
	this.speed = control == 'true' ? 0.5 : 0;
	this[command](control);
	if(control && control == 'true'){	//remember when this action was started
		this.__setStartTime();
	}
	else{	//now need to save the action
		this.__saveAction(command);
	}
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
	console.log("turning counter");
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
