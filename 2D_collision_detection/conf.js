function Conf () {
	this.canvasWidth;
	this.canvasHeight;
	this.zorders;
}

Conf.prototype = {
	initialize: function(canvasWidth, canvasHeight)
	{
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.zorders = [];
	},
	addZorder: function(value)
	{
		for (var i = 0; i < this.zorders.length; i++) {
			if (this.zorders[i] === value) return false;
		};
		this.zorders.push(value);
		return true;
	},
	removeZorder: function(value)
	{
		for (var i = 0; i < this.zorders.length; i++) {
			if (this.zorders[i] == value) 
			{
				for (var j = i; j < this.zorders.length -1; j++) {
					var k = j + 1;
					this.zorders[j] = this.zorders[k];

				};
				this.zorders.pop();
				return true;
			}
		};
		return false;
	},
	inZorder: function(value)
	{
		for (var i = 0; i < this.zorders.length; i++) {
			if (this.zorders[i] === value) return true;
		};
		return false;
	},
	createZorder: function()
	{
		if (this.zorders.length == 0){
			this.zorders.push(0);
			return 0;
		}
		var value = 0;
		while(true)
		{
			if(!inZorder(value)){
				this.zorders.push(value);
				return value;
			}
			value++;
		}
	}
}