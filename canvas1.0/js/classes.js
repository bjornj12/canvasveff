var Whiteboard = {
	currentColor: "Black",
	shapes: []
}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");	

/*var container = canvaso.parentNode;
canvas = document.createElement('canvas');

canvas.id = 'imageTemp';
canvas.width = canvaso.width;
canvas.height = canvaso.height;
container.appendChild(canvas);

context = canvas.getContext('2d');
*/
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
	lineMove: function(x,y){
		if(isDrawing){
			context.clearRect(0,0,canvas.width,canvas.height);

			context.beginPath();
				context.moveTo(lastX,lastY);
				context.lineTo(x,y);
				context.stroke();
			context.closePath();
		}
	},
	lineStop: function(x,y){
		isDrawing = false;
		Whiteboard.shapes.push(x,y);
	},
	rectStart: function(x,y){
		lastX = x, lastY = y;
		isDrawing = true;
	},
	rectMove: function(x,y){
		if(isDrawing === true){
			context.clearRect(0,0,canvas.width,canvas.height);
			var x = Math.min(x,lastX),
		    y = Math.min(y,lastY),
		    w = Math.abs(x - lastX),
		    h = Math.abs(y - lastY);
			context.strokeRect(x,y,w,h);
		}
	},
	rectStop: function(x,y){
		isDrawing = false;
		console.log("stop");
	},
}

/*function imgUpdate(){
	contexto.drawImage(canvas,0,0);
	context.clearRect(0,0,canvas.width,canvas.height);
}*/
