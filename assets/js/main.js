function move(command){
	$.ajax({
		url: "/command/" + command,
		success: function( data ){
			console.log('Moved ', command);
		}
	});
}