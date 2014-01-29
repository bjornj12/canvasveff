var Whiteboard = {
	currentColor: "Black",
	shapes: []
}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");	
var isDrawing = false;
var lastX, lastY;
var x, y, w, h;

var Draw = {
	penStart: function(x,y){
		lastX = x, lastY = y;
		isDrawing = true;
		Whiteboard.shapes.push(x,y);
		console.log(Whiteboard.shapes);

	},
	penMove: function(x,y){
		if(isDrawing === true){
			context.beginPath();
				context.moveTo(lastX,lastY);
				context.lineTo(x,y);
			context.stroke();
			lastX = x, lastY = y;
			Whiteboard.shapes.push(x,y);
			
		}
	},
	penStop: function(){
		isDrawing = false;
	},
	rectStart: function(x,y){
		lastX = x, lastY = y;
		isDrawing = true;
	},
	rectMove: function(x,y){
		if(isDrawing === true){
			var x = Math.min(x,lastX),
		    y = Math.min(y,lastY),
		    w = x-lastX,
		    h = y-lastY;
			context.strokeRect(x,y,w,h);
		}

		//context.clearRect(0,0,canvas.width, canvas.height);
		
	},
	rectStop: function(x,y){
		isDrawing = false;
		console.log("stop");
	}
}
