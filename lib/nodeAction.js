
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

nodeAction.prototype.back = function(){
	console.log("Going backward");
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
