var util = require('util');	//debugging only

//constructor
var nodeAction = function(client){
	this.__client = client;
	this.__savedActions = [];	//all the actions processed in this instance
	this.speedValue = 0.5;
	this.speed = this.speedValue;
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

nodeAction.prototype.run = function(command, control, value){
	this.speed = control == 'true' ? this.speedValue : 0;
	this[command](value);
	console.log("Processing command for: " + command + ' control: ' + control + ' value: ' + value);
	if(control && control == 'true'){	//remember when this action was started
		this.__setStartTime();
	}
	else{	//now need to save the action
		this.__saveAction(command);
	}
	console.log("Command completed");
};

nodeAction.prototype.speed = function(value){
	console.log("Changing speed to: " + value);
	this.speedValue = (parseInt(value) / 10) || 0;
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
