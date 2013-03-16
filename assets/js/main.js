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