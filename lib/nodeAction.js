var util = require('util');	//debugging only
var sleep = require('sleep');

//constructor
var nodeAction = function(client){
	this.__client = client;
	this.__savedActions = [];	//all the actions processed in this instance
	this.__startTime = null;	//when the last action was given
	this.__replayMode = false;	//enabled to prevent recording of actions
	this.__speedValue = 0.5;
};

module.exports = nodeAction;

//get the current state of replay mode
nodeAction.prototype.__getReplayMode = function(){
	return this.__replayMode;
};

//change the replay mode
nodeAction.prototype.__setReplayMode = function(flag){
	this.__replayMode = flag;
};

//get the nodecopter client
nodeAction.prototype.__getClient = function(){
	return this.__client;
};

//get the current speed
nodeAction.prototype.__getSpeed = function(){
	return this.__speedValue;
}

//get the start time of the last action
nodeAction.prototype.__getStartTime = function(){
	return this.__startTime;
};

//sets the start time to now
nodeAction.prototype.__setStartTime = function(){
	var now = new Date().getTime();
	this.__startTime = now;
};

//get all the saved actions
nodeAction.prototype.__getSavedActions = function(){
	return this.__savedActions;
};

//save the last action performed
nodeAction.prototype.__saveAction = function(action, value){
	var currentActions = this.__getSavedActions();
	var tempRemember = {
		action: action,
		delay: (new Date().getTime() - this.__getStartTime()),
		value: value
	};
	currentActions.push(tempRemember);
	this.__log("Actions so far:");
	this.__log(util.inspect(currentActions));
};

nodeAction.prototype.run = function(command, control, value){
	this.__log("Processing command for: " + command + ' control: ' + control + ' value: ' + value);
	var runCommand = command;
	if(control == 'false'){	//stop when command has ended
		runCommand = "stop"
	}
	this[runCommand](value);
	if(!this.__getReplayMode() && command != "replay"){	//don't remember commands in replay mode or the replay command itself
		this.__log("remembering command in non replay mode");
		if(control && control == 'true'){	//remember when this action was started
			this.__setStartTime();
		}
		else{	//now need to save the action
			this.__saveAction(command, value);
		}
	}
	this.__log("Command completed");
};

//Clear list of currently saved actions
nodeAction.prototype.remember = function(){
	this.__log("Clearing saved actions");
	this.__savedActions = [];
};

//Replay all of the currently saved actions
nodeAction.prototype.replay = function(){
	this.__setReplayMode(true);
	var savedActions = this.__getSavedActions();
	var remembered = null;
	while(remembered = savedActions.shift()){
		this.__replayCommand(remembered);
	}
	this.__setReplayMode(false);	//go back in to remember mode
	this.__log("Done processing commands");
};

//replay a single command
nodeAction.prototype.__replayCommand = function(remembered){
	this.__log("Processing saved action:");
	this.__log(util.inspect(remembered));
	var delay = Math.round(remembered.delay / 1000);	//whole seconds
	if(remembered.action == "takeoff"){	//this command takes longer to action
		delay = 10;
	}
	this.run(remembered.action, "true", remembered.value);	//run the command again
	this.__log("Waiting: " + delay)
	sleep.sleep(delay);
	this.run(remembered.action, "false", remembered.value);
};

nodeAction.prototype.speed = function(value){
	this.__log("Changing speed to: " + value);
	this.__speedValue = (parseInt(value) / 10) || 0;
};

nodeAction.prototype.takeoff = function(){
	this.__log("Taking off");
  var client = this.__getClient();
  client.animateLeds("snakeGreenRed", 1, 10);
  client.takeoff();
};

nodeAction.prototype.stop = function(){
	this.__log("Stopping");
	this.__getClient().stop();
};

nodeAction.prototype.land = function(){
	this.stop();
	this.__log("Landing");
  this.__getClient().land();
};

nodeAction.prototype.back = function(){
	this.__log("Going backward");
	this.__getClient().back(this.__getSpeed());
};

nodeAction.prototype.forward = function(){
	this.__log("Going forward");
	this.__getClient().front(this.__getSpeed());
};

nodeAction.prototype.flipLeft = function(){
	this.__log("Flipping left");
	this.__getClient().animate('flipLeft', 150);
};

nodeAction.prototype.left = function(){
	this.__log("Going left");
	this.__getClient().left(this.__getSpeed());
};

nodeAction.prototype.right = function(){
	this.__log("Going right");
	this.__getClient().right(this.__getSpeed());
};

nodeAction.prototype.up = function(){
	this.__log("Going up");
	this.__getClient().up(this.__getSpeed());
};

nodeAction.prototype.down = function(){
	this.__log("Going down");
	this.__getClient().down(this.__getSpeed());
};

nodeAction.prototype.clockwise = function(){
	this.__log("Turning clockwise");
	this.__getClient().clockwise(this.__getSpeed());
};

nodeAction.prototype.counterClockwise = function(){
	this.__log("Turning counter");
	this.__getClient().counterClockwise(this.__getSpeed());
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

//custom logging
nodeAction.prototype.__log = function(message){
	var time = new Date().toTimeString();
	message = time + ": " + message;
	console.log(message);
};
