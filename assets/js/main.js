function move(command){
	$.ajax({
		url: "/command/" + command,
		success: function( data ){
			console.log('Moved ', command);
		}
	});
}

$(function(){
	$("#speed").on('change', function(){
		console.log('speed changed to', $('#speed').val() );
		$.ajax({
			url: "/command/speed",
			data: {speed:$('#speed').val()},
			success: function(data){
				console.log('Adjusted speed');
			}
		});
	});
});

var socket = io.connect('http://localhost');
socket.on('connected', function (data) {
    console.log(data);
});

$(document).ready(function() {
	//defining keyboard shortcuts
	$(document).bind('keydown', 'ctrl+d',
		function(){
			move('demo');
		}
	);
	$(document).bind('keydown', 'ctrl+t',
		function(){
			move('takeoff');
		}
	);
	$(document).bind('keydown', 'space',
		function(){
			move('stop');
		}
	);
	$(document).bind('keydown', 'w',
		function(){
			move('forward');
		}
	);
	$(document).bind('keydown', 's',
		function(){
			move('back');
		}
	);
	$(document).bind('keydown', 'a',
		function(){
			move('left');
		}
	);
	$(document).bind('keydown', 'd',
		function(){
			move('right');
		}
	);
	$(document).bind('keydown', 'k',
		function(){
			move('up');
		}
	);
	$(document).bind('keydown', 'm',
		function(){
			move('down');
		}
	);
});
