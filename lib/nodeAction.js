var util = require('util');	//debugging only

//constructor
var nodeAction = function(client){
	this.__client = client;
	this.speed = 0.5;
	this.__savedActions = [];	//all the actions processed in this instance
	this.__startTime = null;	//when the last action was given
	this.__replayMode = false;	//enabled to prevent recording of actions
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
		delay: (new Date().getTime() - this.__getStartTime()),
		value: 0
	};
	currentActions.push(tempRemember);
	//console.log("saved action: " + util.inspect(tempRemember));
	console.log("Actions so far:");
	console.log(util.inspect(currentActions));
};

nodeAction.prototype.run = function(command, control, value){
	console.log("Processing command for: " + command + ' control: ' + control + ' value: ' + value);
	this.speed = control == 'true' ? 0.5 : 0;
	this[command](control);
	if(!this.__getReplayMode()){	//don't remember commands in replay mode
		if(control && control == 'true'){	//remember when this action was started
			this.__setStartTime();
		}
		else{	//now need to save the action
			this.__saveAction(command);
		}
	}
	console.log("Command completed");
};

//replay all previous commands
nodeAction.prototype.replay = function(){
	this.__setReplayMode(true);
	var savedActions = this.__getSavedActions();
	this.__replayCommand(savedActions);
};

nodeAction.prototype.__replayCommand = function(actions){
	var remembered = actions.shift();
	console.log("processing saved action:");
	console.log(util.inspect(remembered));
	this.run(remembered.action, true, remembered.value);	//run the command again
	var instance = this;
	setTimeout(function(){
		instance.run(remembered.action, false, remembered.value);
		if(actions.length > 0){
			instance.__replayCommand(actions);
		}
		else{	//no more to process
			instance.__setReplayMode(false);	//go back in to remember mode
			console.log("Processed all actions");
		}
	}, remembered.delay);
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
