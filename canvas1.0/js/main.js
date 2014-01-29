$(document).ready(function(){
	var activeTool = pen;

	$(".btnShape").click(function(e){
		activeTool = $(this).attr("id");
		console.log(activeTool);
	});

	$("#myCanvas").mousedown(function(e){
		var x = e.pageX - this.offsetLeft, y = e.pageY - this.offsetTop;
		switch (activeTool) {
			case "line":
				console.log("line");
				break;
			case "rect":
				console.log("rect");
				Draw.rectStart(x,y);
				break;
			case "circle":
				console.log("circle");
				break;
			case "pen":
				console.log("pen");
				Draw.penStart(x,y);
				break;
			default:
				Draw.penStart(x,y);
				break;
		}
	});

	$("#myCanvas").mousemove(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
	
	if (activeTool === "rect"){
			Draw.rectMove(x,y);
		}
	else {
		Draw.penMove(x,y);
	}
	});

	$("#myCanvas").mouseup(function(e){
		if (activeTool === "pen"){
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