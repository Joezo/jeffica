var arDrone = require('ar-drone');
var png = require('ar-drone-png-stream');

var client = arDrone.createClient();
png(client, { port: 8000 });

client.takeoff();

client
  .after(5000, function() {
    this.clockwise(0.25);
  })
  .after(5000, function() {
    this.clockwise(0.25);
  })
  .after(5000, function() {
    this.clockwise(0.25);
  })
  .after(5000, function() {
    this.clockwise(0.25);
  })
  .after(3000, function() {
    this.animate('flipLeft', 15);
  })
  .after(1000, function() {
    this.land();
    this.stop();
  });
  