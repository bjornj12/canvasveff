$(document).ready(function(){
	var activeTool = "pen";

	$(".btnShape").click(function(e){
		activeTool = $(this).attr("id");
		//console.log(activeTool);
	});

	$(".btnColor").click(function(e){
		changeColor($(this).attr("id"));
		console.log($(this).attr("id"));
	});

	$("#clear").click(function(e){
		clearimage();
		});

	$("#undo").click(function(e){
		undo();
	});

	$("#redo").click(function(e){
		redo();
	});

	$("#save").click(function(e){
		save();
	});

	$("#load").click(function(e){
		load();
	});

	var sz = document.forms['pix'].elements['pixels'];
    
	for (var i=0, len=sz.length; i<len; i++) {
    sz[i].onclick = function() {
        changeLinewidth(this.value);
    };
	}



	$("#imageTemp").mousedown(function(e){
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
				Draw.circStart(x,y);
				console.log("circle");
				break;
			default:
				Draw.start(x,y);
				break;
		}
	});

	$("#imageTemp").mousemove(function(e){
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
		else if (activeTool === "circle"){
			Draw.circMove(x,y);
		}
	});

	$("#imageTemp").mouseup(function(e){
		Draw.stop();
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