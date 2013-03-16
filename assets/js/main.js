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