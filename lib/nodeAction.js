
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
};

nodeAction.prototype.back = function(){
	console.log("Going backward");
	var client = this.__getClient();
};