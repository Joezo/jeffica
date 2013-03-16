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
	$(document).bind('keydown', 'z',
		function(){
			move('back');
		}
	);
	$(document).bind('keydown', 'a',
		function(){
			move('left');
		}
	);
	$(document).bind('keydown', 's',
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
