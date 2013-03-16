function runDemo(){
	console.log("in runDemo()");
	$.ajax({
			url: "/demo",
			success: function( data ) {
				console.log("demo ended");
			}
		}
	);
}

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
				console.log('Adjusted speed')
			}
		});
	});
});
