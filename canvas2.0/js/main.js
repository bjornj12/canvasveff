$(document).ready(function(){
	var activeTool = "pen";

	$(".btnShape").click(function(e){
		activeTool = $(this).attr("id");
		$(".btn-active").removeClass("btn-active");
		$(this).addClass("btn-active");
	});

	$(".btnColor").click(function(e){
		changeColor($(this).attr("id"));
	});
	
	$("#clear").click(function(e){
		clearImage();
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


	//Finnur hvað er valið af radiobuttons og sendir það í changelinewidth
	var sz = document.forms['pix'].elements['pixels'];
    for (var i = 0, len = sz.length; i < len; i++) {
	    sz[i].onclick = function() {
	        changeLineWidth(this.value);
	    };
	}


	//kallar í input ef texti er valinn, annars draw.start
	$("#imageTemp").mousedown(function(e){
		var x = e.pageX - this.offsetLeft, y = e.pageY - this.offsetTop;
		if (activeTool === "text")
		{
			input(x,y);
		}
		else
		{
			Draw.start(x,y);
		}
	});
	//kallar í viðeigandi fall í draw eftir hvaða activetool er valið.
	$("#imageTemp").mousemove(function(e){
		var x = e.pageX - this.offsetLeft, y = e.pageY - this.offsetTop;
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
		imgUpdate();
	});

	$("#myCanvas").mouseout(function(e){
		Draw.stop();
	});
});