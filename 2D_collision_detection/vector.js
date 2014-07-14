var Vector = function(x,y)
{
	this.x = x || 0;
	this.y = y || 0;
};

Vector.prototype = {
	translate: function(Ax, Ay) 
	{
		this.x = this.x + Ax;
		this.y = this.y + Ay;
		return this;
	},
	rotate: function(angle)
	{
		//x' = xcosA - ysinA
		//y' = xsinA + ycosA
		if (angle == 0) return this;
		angle = angle * Math.PI / 180;
		var v = this.clone();
		v.x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
		v.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
		this.setVector(v);
		return this;
	},
	scale: function(A)
	{
		this.x = this.x * A;
		this.y = this.y * A;
		return this;
	},
	dot: function(V)
	{
		// [a,b] [c,d] ac + bd
		return this.x * V.x + this.y * V.y;
	},
	crossProduct: function(V)
	{
		//Ux * Vy - Uy * Vx
		return this.x * V.y - this.y * V.x;
	},
	length: function()	//magnitude
	{
		return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) );
	},
	lengthSq: function()
	{
		return Math.pow(this.x, 2) + Math.pow(this.y, 2);
	},
	unitVector: function()
	{
		this.x = this.x / this.length();
		this.y = this.y / this.length();
		return this;
	},
	transform: function()
	{
		//TODO täh 5 optimointi tuubaa
	},
	projectTo: function(V)
	{
		//a1 = a1^b
		//(A .* (B/|B|)) * (B/|B|)
		var u = V.clone();
		u.normalize();
		u.scale(this.dot(u));
		return u;

		// cos^-1 (angle) = a.b / |a|*|b|
		// proj = |a|cos(angle) * b / |b|
		/*var u = V.clone();
		var result = this.dot(u) / ((this.length()) * (u.length()));
		var angle = Math.acos(result);
		var vec = new Vector();
		var unit = u.unitVector();
		vec.x = this.length() * Math.cos(angle) * unit.x;
		vec.y = this.length() * Math.cos(angle) * unit.y;
		return vec;*/

	},
	normalize: function()
	{
		var temp = this.clone();
		temp.x = this.x / this.length();
		temp.y = this.y / this.length();
		this.setVector(temp);
		return this;
	},

	clone: function()
	{
		var V = new Vector(this.x, this.y);
		return V;
	},
	setVector: function(vector)
	{
		this.x = vector.x;
		this.y = vector.y;
	},
	sub: function(V)
	{
		this.x -= V.x;
		this.y -= V.y;
		return this;
	},
	sum: function(V)
	{
		this.x += V.x;
		this.y += V.y;
		return this;
	},
	getVector: function()
	{
		return this;
	}

};