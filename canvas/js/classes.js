var Whiteboard = {
	currentColor: "Black",
	shapes: [],

	redraw: function(context){
		for (var i = 0; i < this.shapes.length; i++)
		{
			this.shapes[i].draw(context);
		}
	}
};

function createRect(x,y){
	return new Rect(x,y, Whiteboard.currentColor);
}
function createCircle(x,y){
	return new Circle(x,y,Whiteboard.currentColor);
}
function createPen(x,y){
	return new Pen(x,y,Whiteboard.currentColor);
}
function createLine(x,y){
	return new Line(x,y,Whiteboard.currentColor);
}

var Shape = Base.extend({
	constructor: function(x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;
	},
	setEndPoint: function(endPt){
		
	},
	contains: function (pt){

	}
});

var Rect = Shape.extend({
	constructor: function(x,y,color){
		this.base(x,y,color);
		this.color = color;
		
		this.startX = x;
		this.startY = y;

		this.endX = x;
		this.endY = y;
	},
	
	draw: function(context){
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
		context.stroke();
	},
	end: function(context){
		this.endX = x;
		this.endY = y;
	}
});

var Circle = Shape.extend({
	
});
