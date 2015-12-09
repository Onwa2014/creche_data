$(function(){

	console.log('Onwaba');
	
	$("#childsearch").keyup(function(){
		console.log('amila')
		var searchVar = $("#childsearch").val();
		console.log(searchVar);
		$.get("/children/search/" + searchVar, function(results){
			console.log(results);
			$("#childsearchtab").html(results);
			//console.log('hi');
		});
	});
	console.log("Pholisa")
	$("#medsearch").keyup(function(){
		console.log('amila')
		var searchVar = $("#medsearch").val();
		console.log(searchVar);
		$.get("/meds/search/" + searchVar, function(results){
			console.log(results);
			$("#medsearchtab").html(results);
		});
	});
});


