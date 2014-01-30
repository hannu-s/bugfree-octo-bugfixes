function Canvas () {
	this.width;
	this.height;
	this.canvasID;
	this.selector;
	this.canvas;
	this.ctx;
	this.backgroundColor;
}

Canvas.prototype = {
	initialize: function(width,height, canvasID, backgroundColor)
	{
		if(backgroundColor === undefined) {backgroundColor = "#FFFFFF";}

		this.width = width;
		this.height = height;
		this.canvasID = canvasID;
		this.selector = "#" + canvasID;
		this.canvas = document.getElementById(canvasID);
		this.ctx = this.canvas.getContext("2d");
		this.backgroundColor = backgroundColor;

		$(this.selector).attr('width', this.width);
		$(this.selector).attr('height', this.height);

	},
	clearContext: function()
	{
		"use strict";
		this.ctx.fillStyle = this.backgroundColor;
		this.ctx.translate(0,0);
		this.ctx.rotate(0);
		this.ctx.fillRect(0,0,this.width,this.height);
		this.ctx.save();
	}

}