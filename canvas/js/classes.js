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

/*var Shape = Base.extend({
	constructor: function(x,y,color){
		this.x = x;
		this.y = y;
		this.color = color;	
	}
});*/

/*var Rect = Shape.extend({
	constructor: function(x,y,color,lineColor){
		this.base(x,y,color);
		this.endX = x;
	},
	
	draw: function(context){
		context.fillStyle = this.color;
		context.fillRect(this.x, this.y, this.endX - this.x, this.endY - this.y);
	}
});

var Circle = Shape.extend({

});
*/
