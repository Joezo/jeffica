var util = require('util');	//debugging only

//constructor
var nodeAction = function(client){
	this.__client = client;
	this.__savedActions = [];	//all the actions processed in this instance
	this.__startTime = null;	//when the last action was given
	this.__replayMode = false;	//enabled to prevent recording of actions
	this.speedValue = 0.5;
	this.speedVal = this.speedValue;
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

//get the start time of the last action
nodeAction.prototype.__getStartTime = function(){
	return this.__startTime;
};

//sets the start time to now
nodeAction.prototype.__setStartTime = function(){
	var now = new Date().getTime();
	//this.__log("setting command start time to: " + now);
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
		delay: (new Date().getTime() - this.__getStartTime()),
		value: 0
	};
	currentActions.push(tempRemember);
	//this.__log("saved action: " + util.inspect(tempRemember));
	this.__log("Actions so far:");
	this.__log(util.inspect(currentActions));
};

nodeAction.prototype.run = function(command, control, value){
	this.speedVal = control == 'true' ? this.speedValue : 0;
	this[command](value);
	this.__log("Processing command for: " + command + ' control: ' + control + ' value: ' + value);
	this.speed = control == 'true' ? 0.5 : 0;
	this[command](control);
	//this.__log("replay mode is: " + this.__getReplayMode());
	if(!this.__getReplayMode() && command != "replay"){	//don't remember commands in replay mode or the replay command itself
		this.__log("remembering command in non replay mode");
		if(control && control == 'true'){	//remember when this action was started
			this.__setStartTime();
		}
		else{	//now need to save the action
			this.__saveAction(command);
		}
	}
	this.__log("Command completed");
};

nodeAction.prototype.remember = function(){
	this.__savedActions = [];
};

nodeAction.prototype.replay = function(){
	this.__setReplayMode(true);
	//this.__log("replay mode is: " + this.__getReplayMode());
	var savedActions = this.__getSavedActions();
	this.__replayCommand(savedActions);
};

nodeAction.prototype.__replayCommand = function(actions){
	if(actions.length){	//FIXME should not need this
		//this.__log("actions left to replay 2 : " + actions.length);
		var remembered = actions.shift();
		this.__log("processing saved action:");
		this.__log(util.inspect(remembered));
		this.run(remembered.action, "true", remembered.value);	//run the command again
		var instance = this;
		setTimeout(function(){
			instance.run(remembered.action, "false", remembered.value);
			instance.__log("actions left to replay: " + actions.length);
			if(actions.length > 0){
				var delay = 2;	//seconds
				if(remembered.action == "takeoff"){	//this command tkaes longer to action
					delay = 15;
				}
				instance.__log("waiting " + delay + " seconds between commands...");
				setTimeout(function(){	//wait x seconds between commands
					instance.__replayCommand(actions);
				}, (delay * 1000));	//convert to milliseconds
			}
			else{	//no more to process
				instance.__setReplayMode(false);	//go back in to remember mode
				instance.__log("Processed all actions");
			}
		}, remembered.delay);
	}
};

nodeAction.prototype.speed = function(value){
	this.__log("Changing speed to: " + value);
	this.speedValue = (parseInt(value) / 10) || 0;
	this.__log("Speed change completed to " + this.speedValue);
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
	this.__log("Stopping and landing");
  var client = this.__getClient();
  client.stop();
  client.land();
};

nodeAction.prototype.back = function(){
	this.__log("Going backward");
	this.__getClient().back(this.speedVal);
};

nodeAction.prototype.forward = function(){
	this.__log("Going forward");
	this.__getClient().front(this.speedVal);
};

nodeAction.prototype.flipLeft = function(){
	this.__log("Going forward");
	this.__getClient().animate('flipLeft', 150);
};

nodeAction.prototype.left = function(){
	this.__log("Going left");
	this.__getClient().left(this.speedVal);
};

nodeAction.prototype.right = function(){
	this.__log("Going right");
	this.__getClient().right(this.speedVal);
};

nodeAction.prototype.up = function(){
	this.__log("Going up");
	this.__getClient().up(this.speedVal);
};

nodeAction.prototype.down = function(){
	this.__log("Going down");
	this.__getClient().down(this.speedVal);
};

nodeAction.prototype.clockwise = function(){
	this.__log("Turning clockwise");
	this.__getClient().clockwise(this.speedVal);
};

nodeAction.prototype.counterClockwise = function(){
	this.__log("turning counter");
	this.__getClient().counterClockwise(this.speedVal);
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
