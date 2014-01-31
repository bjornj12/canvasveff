var Whiteboard = {
	currentColor: "Black",
	shapes: []
}
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");	

//Create new canvas.
var container = canvas.parentNode;
var temp = document.createElement('canvas');

temp.id = 'imageTemp';
temp.width = canvas.width;
temp.height = canvas.height;
container.appendChild(temp);

var tempctx = temp.getContext('2d');

//Updates the canvas so the newest element appears.
function img_update(){
	context.drawImage(temp, 0, 0);
	tempctx.clearRect(0,0,temp.width,temp.height);
}

function changeColor(x){
	Whiteboard.currentColor = x;
}

function clearimage(){
	context.clearRect(0,0,canvas.width, canvas.height)
	Whiteboard.shapes.length = 0;
	Whiteboard.shapes = [];

}

function undo(){
	console.log("before  " + Whiteboard.shapes);
	Whiteboard.shapes.pop();
	console.log("after   " + Whiteboard.shapes);
}

var isDrawing = false;
var x, y, w, h, lastX, lastY;

var Draw = {
	start: function(x,y){
		lastX = x, lastY = y;
		isDrawing = true;
		Whiteboard.shapes.push(x,y);
		console.log(Whiteboard.shapes);
		context.strokeStyle = Whiteboard.currentColor;
	},
	stop: function(){
		isDrawing = false;
	},
	penMove: function(x,y){
		if(isDrawing === true){
			/*context.beginPath();
			context.moveTo(lastX,lastY);
			context.lineTo(x,y);
			//context.strokeStyle = Whiteboard.currentColor;
			context.stroke();*/
			tempctx.beginPath();
			tempctx.moveTo(lastX,lastY);
			console.log("lastX " + lastX + " X " + x);			
			tempctx.lineTo(x,y);
			tempctx.stroke();
			lastX = x, lastY = y;
			Whiteboard.shapes.push(x,y);
			
		}
	},
	lineMove: function(x,y){
		if(isDrawing){
			tempctx.clearRect(0,0,canvas.width,canvas.height);

			tempctx.beginPath();
				tempctx.moveTo(lastX,lastY);
				tempctx.lineTo(x,y);
				tempctx.stroke();
			tempctx.closePath();
		}
	},
	/*lineStop: function(x,y){
		isDrawing = false;
		Whiteboard.shapes.push(x,y);
	},*/
	rectMove: function(x,y){
		if(isDrawing === true){
			tempctx.clearRect(0,0,canvas.width,canvas.height);
			var w = x - lastX,
		        h = y - lastY;
			tempctx.strokeRect(lastX,lastY,w,h);
		}
	},
	/*rectStop: function(x,y){
		isDrawing = false;
		console.log("stop");
	} */
	circStart: function(x,y){
		lastX = x, lastY = y;
		isDrawing = true;
		/*tempctx.beginPath();
		tempctx.arc(lastX,lastY,radius,0,2*Math.PI, false);
		tempctx.fillStyle = "green";
		tempctx.fill();
		tempctx.lineWidth = 5;
		tempctx.strokeStyle = "#003300";		
		tempctx.stroke();*/

	},
	circMove: function(x,y){
		if(isDrawing === true){
			tempctx.beginPath();
			var xsquare = Math.pow((x-lastX),2);
			var ysquare = Math.pow((y-lastY),2);
			var sqrt = Math.sqrt(xsquare + ysquare);
			var maxofhnit = Math.max(Math.abs(x - lastX), Math.abs(y - lastY));
			var radius = Math.max(maxofhnit, sqrt);


			console.log(radius);
			tempctx.clearRect(0,0,canvas.width, canvas.height);
			tempctx.arc(Math.abs(lastX),Math.abs(lastY),radius,0,Math.PI*2,true);
			//console.log("X: " + x + " Y : " y);
			//tempctx.lineWidth = 15;
			//tempctx.strokeStyle = 'Black';
			tempctx.stroke();
			tempctx.closePath();
		}
	}
}