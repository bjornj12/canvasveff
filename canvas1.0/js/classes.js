var Whiteboard = {
	currentColor: "Black",
	shapes: []
}
var canvaso = document.getElementById("myCanvas");
var contexto = canvaso.getContext("2d");	

//Create new canvas.
var container = canvaso.parentNode;
var canvas = document.createElement('canvas');

canvas.id = 'imageTemp';
canvas.width = canvaso.width;
canvas.height = canvaso.height;
container.appendChild(canvas);

var context = canvas.getContext('2d');

//Updates the canvas so the newest element appears.
function img_update(){
	contexto.drawImage(canvas,0,0);
	context.clearRect(0,0,canvas.width,canvas.height);
}

var isDrawing = false;
var lastX, lastY;
var x, y, w, h;

var Draw = {
	start: function(x,y){
		lastX = x, lastY = y;
		isDrawing = true;
		/*Whiteboard.shapes.push(x,y);
		console.log(Whiteboard.shapes);*/
	},
	penMove: function(x,y){
		if(isDrawing === true){
			context.beginPath();
				context.moveTo(lastX,lastY);
				context.lineTo(x,y);
			context.stroke();
			lastX = x, lastY = y;
			/*Whiteboard.shapes.push(x,y);*/
		}
	},
	stop: function(){
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
	/*lineStop: function(x,y){
		isDrawing = false;
		Whiteboard.shapes.push(x,y);
	},*/
	rectMove: function(x,y){
		if(isDrawing === true){
			context.clearRect(0,0,canvas.width,canvas.height);
			var w = x - lastX,
		        h = y - lastY;
			context.strokeRect(lastX,lastY,w,h);
		}
	},
	/*rectStop: function(x,y){
		isDrawing = false;
		console.log("stop");
	} */
}