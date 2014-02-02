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
//Clears the temp canvas.
function imgUpdate(){
	context.drawImage(temp, 0, 0);
	tempctx.clearRect(0, 0, temp.width, temp.height);
}

//breytir lit eftir notanda.
function changeColor(x){
	Whiteboard.currentColor = x;
}

//breytir línubreidd.
function changeLineWidth(x){
	tempctx.lineWidth = x;
}

//hreinsar canvasinn.
function clearImage(){
	context.clearRect(0, 0, canvas.width, canvas.height)
	Whiteboard.shapes.length = 0;
	Whiteboard.shapes = [];
}

//vistar canvasinn í fylki.
function saveCanvas() {
	canvas = document.getElementById("myCanvas");
	var imgSrc = canvas.toDataURL("image/png");
	Whiteboard.shapes.push(imgSrc);
}

//tekur síðasta sem fór inn á canvas út af canvasnum.
function undo(){
	if(Whiteboard.shapes.length > 0){
		var imgSrc = canvas.toDataURL("image/png");
	Whiteboard.redoshapes.push(imgSrc);
		var imgC = new Image();

		imgC.onload = function(){
			var canvasbefore = document.getElementById("myCanvas").getContext("2d");
			canvasbefore.drawImage(imgC, 0, 0);
		}
		imgC.src = Whiteboard.shapes.pop();
	}
}

//teiknar aftur inn á myndina eftir undo.
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

//fall til að vista mynd sem er á canvas.
function save(){
	if (Whiteboard.shapes.length > 0){
		saveCanvas();
		var imgSrc = canvas.toDataURL("image/png");
		
		Whiteboard.saved.length = 0;
		Whiteboard.saved = [];

		for (var i = 0; i<Whiteboard.shapes.length; i++)
			{
				Whiteboard.saved.push(Whiteboard.shapes[i]);
			}
		console.log(Whiteboard.saved);
	}
}

//fall til að loada vistaðri mynd á canvasinn.
function load(){
	if (Whiteboard.saved.length > 0){
		var imgL = new Image();
		Whiteboard.shapes.length = 0;
		Whiteboard.shapes = [];
			for (var i = 0; i < Whiteboard.saved.length; i++)
			{
					Whiteboard.shapes.push(Whiteboard.saved[i]);
				}
		imgL.onload = function(){
			var canvasload = document.getElementById("myCanvas").getContext("2d");
			canvasload.drawImage(imgL, 0, 0);
		}
		imgL.src = Whiteboard.shapes.pop();
		Whiteboard.saved.length = 0;
		Whiteboard.saved = [];
	}
}

//fall til að koma texta á canvasinn.
function input(x,y){
	saveCanvas();
	//cssa textaboxið inn á canvasinn.
	textinput.style.cssText = "display:inline;"
	textinput.style.cssText += "position: absolute;"
	textinput.style.cssText += "top: " + (y+10) + "px;"
	textinput.style.cssText += "left: " + x + "px;"
	textinput.style.cssText += "z-index: 99999;"
	
	var texti = "";

	//Set textaboxið inn á canvasinn fyrir neðan þar sem notandi vildi skrifa og teikna samstundis það
	//sem notandi skrifar.
	textainp = document.getElementById("textinput");
	$(textainp).keyup(function(){
    		texti = $(this).val();
    		var e = document.getElementById("Font");
			var fontValue = e.options[e.selectedIndex].value;

			var e = document.getElementById("fontsize");
			var fontSz = e.options[e.selectedIndex].value;
				tempctx.font = (fontSz + fontValue)
				tempctx.textBaseline
				tempctx.clearRect(0, 0, canvas.width, canvas.height);
				tempctx.fillStyle = Whiteboard.currentColor;
				tempctx.fillText(texti, x, y+9);	
    	})
    	.keyup();
    	//Þegar ýtt er á enter, þá er vistað textann á canvasinn og textaboxið látið hverfa.
	$(document).bind('keypress',pressed);
	function pressed(e)
	{
   	 	if(e.keyCode === 13)
    	{
    		imgUpdate();
    		textinput.value = "";
        	textinput.style.cssText ="display: none;"
        	imageTemp.style.cssText += "display: inline;"
    	}
	}

}

var isDrawing = false;
var x, y, w, h, lastX, lastY;

//teiknifallið, fyrir allt nema texta.
var Draw = {
	start: function(x,y){
		saveCanvas();
		lastX = x, lastY = y;
		isDrawing = true;
		tempctx.strokeStyle = Whiteboard.currentColor;
	},
	stop: function(){
		isDrawing = false;
	},
	penMove: function(x,y){
		if(isDrawing === true){
			tempctx.beginPath();
			tempctx.moveTo(lastX, lastY);	
			tempctx.lineTo(x, y);
			tempctx.stroke();
			lastX = x, lastY = y;
		}
	},
	lineMove: function(x,y){
		if(isDrawing){
			tempctx.clearRect(0, 0, canvas.width, canvas.height);

			tempctx.beginPath();
			tempctx.moveTo(lastX, lastY);
			tempctx.lineTo(x, y);
			tempctx.stroke();
			tempctx.closePath();
		}
	},
	rectMove: function(x,y){
		if(isDrawing === true){
			tempctx.clearRect(0, 0, canvas.width, canvas.height);
			var w = x - lastX,
		        h = y - lastY;
			tempctx.strokeRect(lastX,lastY,w,h);
		}
	},
	circMove: function(x,y){
		if(isDrawing === true){
			tempctx.beginPath();
			var xsquare = Math.pow((x - lastX), 2);
			var ysquare = Math.pow((y - lastY), 2);
			var sqrt = Math.sqrt(xsquare + ysquare);
			var maxofcoord = Math.max(Math.abs(x - lastX), Math.abs(y - lastY));
			var radius = Math.max(maxofcoord, sqrt);

			tempctx.clearRect(0, 0, canvas.width, canvas.height);
			tempctx.arc(Math.abs(lastX),Math.abs(lastY), radius, 0, Math.PI * 2, true);
			tempctx.stroke();
			tempctx.closePath();
		}
	}
}