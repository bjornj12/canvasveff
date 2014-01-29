$(document).ready(function(){
	var activeTool = "pen";

	$(".btnShape").click(function(e){
		activeTool = $(this).attr("id");
		console.log(activeTool);
	});

	$("#myCanvas").mousedown(function(e){
		var x = e.pageX - this.offsetLeft, y = e.pageY - this.offsetTop;
		switch (activeTool) {
			case "pen":
				console.log("pen");
				Draw.start(x,y);
				break;
			case "line":
				Draw.start(x,y);
				console.log("line");
				break;
			case "rect":
				console.log("rect");
				Draw.start(x,y);
				break;
			case "circle":
				console.log("circle");
				break;
			default:
				Draw.start(x,y);
				break;
		}
	});

	$("#myCanvas").mousemove(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		if (activeTool === "pen"){
			Draw.penMove(x,y);
		}
		else if (activeTool === "line"){
			Draw.lineMove(x,y);
		}
		else if (activeTool === "rect"){
			Draw.rectMove(x,y);
		}
	});

	$("#myCanvas").mouseup(function(e){
		Draw.stop();
/*
		if (activeTool === "pen"){
			Draw.stop();
		}
		else if (activeTool === "line"){
			Draw.stop();
		}
		else if (activeTool === "rect"){
			Draw.stop(); 
		}*/
		img_update();
	});


	//Bjössi: verðum aðeins að skoða þetta þegar músin fer útaf canvasnum.
	$("#myCanvas").mouseout(function(e){
		Draw.stop();
		/*if(activeTool === "pen"){
			Draw.stop();
		}*/
	});
});