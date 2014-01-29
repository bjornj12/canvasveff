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
				Draw.penStart(x,y);
				break;
			case "line":
				Draw.penStart(x,y);
				console.log("line");
				break;
			case "rect":
				console.log("rect");
				Draw.rectStart(x,y);
				break;
			case "circle":
				console.log("circle");
				break;
			default:
				Draw.penStart(x,y);
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
		if (activeTool === "pen"){
			Draw.penStop();
		}
		else if (activeTool === "line"){
			Draw.penStop();
		}
		else if (activeTool === "rect"){
			Draw.rectStop(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		}
	});

	$("#myCanvas").mouseout(function(e){
		if(activeTool === "pen"){
			Draw.penStop();
		}
	});
});