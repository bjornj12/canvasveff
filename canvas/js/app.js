$(document).ready(function(){
	var canvas = document.getElementById("myCanvas");
	var context = canvas.getContext("2d");
	
	var isDrawing = false;
	var nextShape = "createPen";

	$(".btnShape").click(function(e){
		var factory = $(this).attr("data-shape");
		nextShape = eval(factory);
		console.log(factory);
		console.log(nextShape);
	});

	$("#myCanvas").mousedown(function(e){
		var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;
		//console.log(x,y);
		startX = x;
		startY = y;

		//context.beginPath();
		//context.moveTo(startX,startY);

		

		var shape = nextShape();

		context.strokeStyle = shape.color;
		context.moveTo(startX, startY);
		//context.lineTo(x,y);
		//context.stroke();

		isDrawing = true;
		//console.log("X: " + x + ", Y: " + y);
		//context.strokeStyle = "red";
		//context.strokeRect(x-30, y-30, 60,60);

		//context.beginPath();
		//context.moveTo(0,0);
		//context.lineTo(x,y);
		//context.stroke();		
	});

	$("#myCanvas").mousemove(function(e){
		if (isDrawing === true)
		{
			var x = e.pageX - this.offsetLeft;
			var y = e.pageY - this.offsetTop;

			//context.lineTo(x,y);
			//context.stroke();
	/*		context.beginPath();
			context.moveTo(startX,startY);
			context.lineTo(x,y);
			context.stroke(); */
		}
	});

	$("#myCanvas").mouseup(function(e){
		/*var x = e.pageX - this.offsetLeft;
		var y = e.pageY - this.offsetTop;*/
			
		isDrawing = false

		/*context.beginPath();
		context.moveTo(startX,startY);
		context.lineTo(x,y);
		context.stroke();*/
	});
});