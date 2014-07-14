var Entity = function() {
	this.vectors = [];
	this.zorder;
	this.visible;
	this.style;
	this.rotation;
	this.bounds;
	this.initRotation;
	this.rotationWay;
}

Entity.prototype = {
	initialize: function(zorder, visible, rotation, style)
	{
		this.vectors = [];
		this.zorder = zorder;
		this.visible = visible || true;
		this.initRotation = rotation || 0;
		this.style = style || "#00FF00";
		this.rotationWay = 1;
	},
	createPoint: function(x,y)
	{
		this.vectors.push(new Vector(x,y));
	},
	bounds: function()
	{
		var minX;
		var maxX;
		var minY;
		var maxY;
		var results = [];
		/* 	r[0] = leveys
			r[1] = korkeus
			r[2] = matalin vektori
			r[3] = korkein vektori
			r[4] = vasemmanpuoleisin vekt.
			r[5] = oikeimmanpuoleisin vekt.
		*/
		for(var i = 0; i < this.vectors.length; i++)
		{
			var v = this.vectors[i].getVector();
			if(minX === undefined) minX = v; 
			if(maxX === undefined) maxX = v; 
			if(minY === undefined) minY = v; 
			if(maxY === undefined) maxY = v;

			if(minX.x > v.x) minX = v;
			if(maxX.x < v.x) maxX = v;

			if(minY.y > v.y) minY = v;
			if(maxY.y < v.y) maxY = v;
		}

		results.push( maxX.x - minX.x );
		results.push( maxY.y - minY.y );
		results.push(minY);
		results.push(maxY);
		results.push(minX);
		results.push(maxX);

		this.bounds = results;
	},
	average: function()
	{
		var v = this.sum();
		//v.x = (v.x * Math.cos(this.rotation)) / this.vectors.length;
		//v.y = (v.y * Math.sin(this.rotation)) / this.vectors.length;
		v.x = v.x / this.vectors.length;
		v.y = v.y / this.vectors.length;
		return v;
	},
	sum: function()
	{
		var v = new Vector(0,0);
		for (var i = 0; i < this.vectors.length; i++)
		{
			v.x += this.vectors[i].x;
			v.y += this.vectors[i].y;
		}
		return v;
	},
	setRotation: function(angle)							// rotates around upperleft-axis  aka vectors[0]
	{
		var preRotation = this.rotation || 0;
		if (this.initRotation !== 0) {
			preRotation = 0;
			this.rotation = this.initRotation;
			this.initRotation = 0;
		}
		this.rotation = angle || this.rotation || 0;
		if (this.rotation > 360) this.rotation -= 360;
		if (this.rotation < -360) this.rotation += 360;
		for (var i = 1; i < this.vectors.length; i++) { 
			var v = this.vectors[i];
			var u = v.clone();
			u.x = u.x - this.vectors[0].x;
			u.y = u.y - this.vectors[0].y;
			u.rotate(preRotation * -1);
			u.rotate(this.rotation * this.rotationWay);
			u.x = u.x + this.vectors[0].x; 
			u.y = u.y + this.vectors[0].y;
			this.vectors[i] = u; 
		};
	},
	normalize: function()
	{
		var e = new Entity();
		e.vectors = this.vectors;
		e.zorders = this.zorder;
		e.visible = this.visible;
		e.style = this.style;
		e.rotation = this.rotation;
		return e;
	},
	inside: function(V)
	{
		var preRotation = this.rotation;

		V.x = V.x - this.vectors[0].x;
		V.y = V.y - this.vectors[0].y;
		V.rotate(this.rotation * -1);
		V.x = V.x + this.vectors[0].x;
		V.y = V.y + this.vectors[0].y;

		this.setRotation(0);

		if(V.x > this.vectors[0].x && V.x < this.vectors[1].x && V.y > this.vectors[0].y && V.y < this.vectors[2].y)
			{
				this.setRotation(preRotation);
				return true;
			}
		this.setRotation(preRotation);
		return false;

	},
	createMirror: function()
	{
		var ent = new Entity();
		ent.visible = false;
		ent.rotationWay = -1;
		ent.initRotation = this.initRotation;
		ent.rotation = this.rotation;
		ent.style = this.style;
		for (var i = 0; i < this.vectors.length; i++) {
			ent.vectors[i] = this.vectors[this.vectors.length - i -1];
			ent.vectors[i].x = ent.vectors[i].x * -1;
			ent.vectors[i].y = ent.vectors[i].y * -1;
		};
		ent.bounds();
		return ent;
	},
	draw: function(ctx)
	{
		"use strict";
		//this.bounds();
		var v = this.vectors[0];
		if(this.visible)
		{
			ctx.save();
			ctx.fillStyle = this.style;
			ctx.translate(v.x, v.y);
			ctx.rotate(this.rotation * Math.PI / 180);
			ctx.fillRect(0,0, this.bounds[0], this.bounds[1]);
			ctx.restore();
		}
		
	}
};