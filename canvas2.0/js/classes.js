var Whiteboard = {
	currentColor: "Black",
	shapes: [],
	redoshapes: [],
	saved: []
}

var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

context.save();
	context.fillStyle = '#fff';
	context.fillRect(0, 0, context.canvas.width, context.canvas.height);
	context.restore();

//Create new canvas.
var container = canvas.parentNode;
var temp = document.createElement('canvas');

temp.id = 'imageTemp';
temp.width = canvas.width;
temp.height = canvas.height;
container.appendChild(temp);

var tempctx = temp.getContext('2d');
tempctx.fillStyle = '#fff';


//Updates the canvas so the newest element appears.
function img_update(){
	context.drawImage(temp, 0, 0);
	tempctx.clearRect(0,0,temp.width,temp.height);
}
//breytir lit
function changeColor(x){
	Whiteboard.currentColor = x;
}
function changeLinewidth(x){
	tempctx.lineWidth = x;
}
//hreinsar myndina
function clearimage(){
	context.clearRect(0,0,canvas.width, canvas.height)
	Whiteboard.shapes.length = 0;
	Whiteboard.shapes = [];
}

function savecanvas() {
	canvas = document.getElementById("myCanvas");
	var imgSrc = canvas.toDataURL("image/png");
	Whiteboard.shapes.push(imgSrc);
	console.log(Whiteboard.shapes);
}
//gerir galdra.
function undo(){
	var imgSrc = canvas.toDataURL("image/png");
	Whiteboard.redoshapes.push(imgSrc);

	if(Whiteboard.shapes.length > 0){
		var imgC = new Image();

		imgC.onload = function(){
			var canvasbefore = document.getElementById("myCanvas").getContext("2d");
			canvasbefore.drawImage(imgC, 0, 0);
		}
		//Whiteboard.redoshapes.push(Whiteboard.shapes[Whiteboard.shapes.length-1]);
		console.log(Whiteboard.redoshapes);
		imgC.src = Whiteboard.shapes.pop();
	}
}

function redo(){
	if (Whiteboard.redoshapes.length > 0){
		var imgR = new Image();

		imgR.onload = function(){
			var canvasafter = document.getElementById("myCanvas").getContext("2d");
			canvasafter.drawImage(imgR, 0, 0);
		}
		Whiteboard.shapes.push(Whiteboard.redoshapes[Whiteboard.redoshapes.length-1]);
		imgR.src = Whiteboard.redoshapes.pop();
	}
}

function save(){
	if (Whiteboard.shapes.length > 0){
		var imgSrc = canvas.toDataURL("image/png");
			Whiteboard.saved.push(imgSrc);
			console.log("lol");
			console.log(Whiteboard.saved);
	}
}

function load(){
	if (Whiteboard.saved.length > 0)
	{

		var imgL = new Image();

		imgL.onload = function(){
			var canvasload = document.getElementById("myCanvas").getContext("2d");
			canvasload.drawImage(imgL, 0, 0);
		}
		imgL.src = Whiteboard.saved.pop();
		Whiteboard.saved.length = 0;
		Whiteboard.saved = [];
	}
}

var isDrawing = false;
var x, y, w, h, lastX, lastY;

var Draw = {
	start: function(x,y){
		savecanvas();
		lastX = x, lastY = y;
		isDrawing = true;
		tempctx.strokeStyle = Whiteboard.currentColor;
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
			tempctx.lineTo(x,y);
			tempctx.stroke();
			lastX = x, lastY = y;
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
		savecanvas();
		lastX = x, lastY = y;
		isDrawing = true;
		tempctx.strokeStyle = Whiteboard.currentColor
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