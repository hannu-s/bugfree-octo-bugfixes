var conf, e, f, c;
var interval;
var el, fl, cent;

$(function() {
	Start();

	$(document).keypress(function(ev) {
		if (event.which == 32)
		{
			window.clearInterval(interval);
			console.log('------');
			console.log(cent);		
			console.log(e.vectors[0]);
			console.log(el[0]);
			console.log(el[0].length());
		}

		if (event.which == 13)
		{
			asd();
		}
	});
});

function asd () {
	interval = window.setInterval(function(){c.clearContext(); f.setRotation(f.rotation + 1.5); e.setRotation(e.rotation - 1);
	e.draw(c.ctx); f.draw(c.ctx); CollisionCheck();}, 50);
}

function Start () {
	conf = new Conf();
	conf.initialize(500,500);

	c = new Canvas();
	c.initialize(conf.canvasWidth,conf.canvasHeight,"canvas");
	c.clearContext();

	e = new Entity();
	e.initialize(conf.createZorder, true, 0, "#00FF00");
	f = new Entity();
	f.initialize(conf.createZorder, true, 190, "#AAAAFF");
	
	CreateEntity(e, 300, 150, 90, 90);
	CreateEntity(f, 350, 300, 180, 10); 

	e.draw(c.ctx);
	f.draw(c.ctx);

	//var v1 = new Vector(300, 10.3);
	//var v2 = new Vector(61.77, 10.3);

	//v1.projectTo(v2);

	CollisionCheck();

	interval = window.setInterval(function(){c.clearContext(); f.setRotation(f.rotation + 1.5); e.setRotation(e.rotation - 1);
	e.draw(c.ctx); f.draw(c.ctx); CollisionCheck();}, 50);

	/*console.log('lasku:', f.average().sub(e.average()));

	var z = e.average();
	var w = f.average();
	var centroid = f.average().sub(e.average());

	var v1 = z.projectTo(centroid);	console.log(v1);
	var v2 = w.projectTo(centroid);	console.log(v2);
	//drawLine(z,1,"blue");
	//drawLine(w,1,"red");
	drawLine(centroid,10,"blue");
	drawLine(v1, 1,"black", z.x,z.y);
	drawLine(v2, 1,"black", w.x,w.y);*/

	//window.setInterval(function(){c.clearContext(); f.setRotation(f.rotation + 2); e.draw(c.ctx), f.draw(c.ctx); XAxisCheck();}, 20);
}

function CreateEntity (entity, x, y, width, height) {
	entity.createPoint(x, y);
	entity.createPoint(width + x, y);
	entity.createPoint(x, height + y);
	entity.createPoint(width + x, height + y);
	entity.bounds();
	entity.setRotation();
}


function CollisionCheck () {
	var eAvg = e.average();
	var fAvg = f.average();
	var centroid = fAvg.clone().sub(eAvg); drawVector(centroid, eAvg.x, eAvg.y); cent = centroid;
	drawLine(centroid, 0, 0, "blue", 50);


	/*console.log('---------------------');
	console.log('---------------------');
	for (var i = 0; i < f.vectors.length; i++) {
		console.log('X:', f.vectors[i].x, '\tY:', f.vectors[i].y)
	};
	console.log('fAvg - X: ', fAvg.x, '\tY: ', fAvg.y, 'rot:', f.rotation);*/

	var ePro = [];
	var fPro = [];
	var eMin, eMax, fMin, fMax;

	for (var i = 0; i < f.vectors.length; i++)
	{
		drawCircle(f.vectors[i], 3);
		ePro.push(e.vectors[i].projectTo(centroid)); drawLine(ePro[i],e.vectors[i].x, e.vectors[i].y);
		fPro.push(f.vectors[i].projectTo(centroid)); drawLine(fPro[i],f.vectors[i].x, f.vectors[i].y);

		if ( eMin === undefined || eMin > ePro[i].length()) eMin = ePro[i].length();
		if ( eMax === undefined || eMax < ePro[i].length()) eMax = ePro[i].length();
		if ( fMin === undefined || fMin > fPro[i].length()) fMin = fPro[i].length();
		if ( fMax === undefined || fMax < fPro[i].length()) fMax = fPro[i].length();
	}
	el = ePro; fl = fPro;


	if (( fMin < eMax  && fMax > eMin ) || AlmostEqual(fMin, eMax, 0.000001) )
	{
		//console.log('Collision detected');
		//CollisionCheck2();
		//MirrorCollisionCheck();
		//XAxisCheck();
		e.style = "#FF0000";
	}
	else
	{
		//console.log('No collision detected');
		e.style = "#00FF00";
	}
}

/*function MirrorCollisionCheck () {
	var ent1 = e.createMirror();
	var ent2 = f.createMirror();

	var eAvg = ent1.average();
	var fAvg = ent1.average();
	var centroid = fAvg.clone().sub(eAvg); drawVector(centroid, eAvg.x, eAvg.y);

	var ePro = [];
	var fPro = [];
	var eMin, eMax, fMin, fMax;
	for (var i = 0; i < f.vectors.length; i++)
	{
		drawCircle(ent2.vectors[i], 3);
		ePro.push(ent1.vectors[i].projectTo(centroid)); drawLine(ePro[i],ent1.vectors[i].x, ent1.vectors[i].y);
		fPro.push(ent2.vectors[i].projectTo(centroid)); drawLine(fPro[i],ent2.vectors[i].x, ent2.vectors[i].y);

		if ( eMin === undefined || eMin > ePro[i].length()) eMin = ePro[i].length();
		if ( eMax === undefined || eMax < ePro[i].length()) eMax = ePro[i].length();
		if ( fMin === undefined || fMin > fPro[i].length()) fMin = fPro[i].length();
		if ( fMax === undefined || fMax < fPro[i].length()) fMax = fPro[i].length();
	}

	if (( fMin > eMax  && fMax < eMin ) || AlmostEqual(fMin, eMax, -0.000001) )
	{
		console.log('Collision detected');
		//CollisionCheck2();
		//e.style = "#FF0000";
	}
	else
	{
		console.log('No collision detected');
		//e.style = "#00FF00";
	}
}*/

function drawLine (v, x, y, style, scale) {
	scale = scale || 1;
	c.ctx.save();
	c.ctx.moveTo(x,y);
	c.ctx.lineTo(v.x * scale, v.y * scale);
	c.ctx.strokeStyle = style;
	c.ctx.stroke();
	c.ctx.restore();
}

function drawVector (v, x, y, style, scale) {
	scale = scale || 1;
	c.ctx.save();
	c.ctx.moveTo(x,y);
	c.ctx.lineTo(v.x * scale + x, v.y * scale + y);
	c.ctx.stroke();
	c.ctx.restore();
}


function drawCircle (v, radius) {
	c.ctx.save();
	c.ctx.beginPath();
	c.ctx.arc(v.x, v.y, radius, 0, 2 * Math.PI);
	c.ctx.stroke();
	c.ctx.restore();
}

function AlmostEqual (num1, num2, epsilon) {
	var result;
	if (num1 > num2) result = num1 - num2;
	else result = num2 - num1;
	return result <= epsilon;
}

/*
function drawLine (v, scale, style, x, y) {
	x = x || 0;
	y = y || 0;
	style = style || "black";
	c.ctx.rotate(0);
	var vec = new Vector(x,y);
	drawCircle(vec,2);
	c.ctx.save();
	c.ctx.strokeStyle = style;
	c.ctx.setLineWidth(2);
	c.ctx.moveTo(x,y); 
	c.ctx.lineTo(x + v.x * scale, y + v.y * scale);
	c.ctx.stroke();
	c.ctx.restore();
}*/

/*
function CollisionCheck () {
	var eAvg = e.average();
	var fAvg = f.average();

	console.log('eAvg',eAvg);
	console.log('fAvg',fAvg);

	var projectToion = eAvg.projectTo(fAvg); return;

	var ePro = [];
	ePro.push(projectToion.projectTo(e.vectors[0]));
	ePro.push(projectToion.projectTo(e.vectors[1]));
	ePro.push(projectToion.projectTo(e.vectors[2]));
	ePro.push(projectToion.projectTo(e.vectors[3]));

	var fPro = [];
	fPro.push(projectToion.projectTo(f.vectors[0]));
	fPro.push(projectToion.projectTo(f.vectors[1]));
	fPro.push(projectToion.projectTo(f.vectors[2]));
	fPro.push(projectToion.projectTo(f.vectors[3]));

	var eLengths = [];
	var fLengths = [];
	//var eLargest;
	//var fSmallest;

	var eMin;
	var eMax;
	var fMin;
	var fMax;

	for (var i = 0; i < ePro.length; i++) {
		eLengths.push(ePro[i].length());
		fLengths.push(fPro[i].length());
		if ( eMin === undefined || eMin > eLengths[i]) eMin = eLengths[i];
		if ( eMax === undefined || eMax < eLengths[i]) eMax = eLengths[i];
		if ( fMin === undefined || fMin > fLengths[i]) fMin = fLengths[i];
		if ( fMax === undefined || fMax < fLengths[i]) fMax = fLengths[i];
	};

	console.log(projectToion);

	console.log('--------');

	for (var i = 0; i < ePro.length; i++) {
		console.log(ePro[i])
	};

	console.log('--------');

	for (var i = 0; i < fPro.length; i++) {
		console.log(fPro[i])
	};

	console.log('--------');

	for (var i = 0; i < eLengths.length; i++) {
		console.log(eLengths[i])
	};

	console.log('--------');

	for (var i = 0; i < fLengths.length; i++) {
		console.log(fLengths[i])
	};

	console.log('--------');


	console.log('emin',eMin);
	console.log('emax',eMax);
	console.log('fmin',fMin);
	console.log('fmax',fMax);


	if ( fMin < eMax || AlmostEqual(fMin, eMax, 0.001) )
	{
		console.log('Collision detected');
	}
	else
	{
		console.log('No collision detected');
	}
}*/



/*function XAxisCheck () {
	//console.log('--------');
	//console.log('-X-AXIS-');
	//console.log('--------');

	var width = new Vector(conf.canvasWidth, 0);

	var ePro = [];
	var fPro = [];
	var eMin, eMax, fMin, fMax;
	for (var i = 0; i < e.vectors.length; i++)
	{
		ePro.push(e.vectors[i].projectTo(width));
		fPro.push(f.vectors[i].projectTo(width));

		if ( eMin === undefined || eMin > ePro[i].length()) eMin = ePro[i].length();
		if ( eMax === undefined || eMax < ePro[i].length()) eMax = ePro[i].length();
		if ( fMin === undefined || fMin > fPro[i].length()) fMin = fPro[i].length();
		if ( fMax === undefined || fMax < fPro[i].length()) fMax = fPro[i].length();
	}

	if (( fMin < eMax  && fMax > eMin ) || AlmostEqual(fMin, eMax, 0.000001) )
	{
		//console.log('X-axis, Collision detected');
		YAxisCheck(fMin);
	}
	else
	{
		//console.log('No collision detected');
	}
}

function YAxisCheck (x) {
	//console.log('--------');
	//console.log('-Y-AXIS-');
	//console.log('--------');

	var height = new Vector(0, conf.canvasHeight);

	var ePro = [];
	var fPro = [];
	var eMin, eMax, fMin, fMax;
	for (var i = 0; i < e.vectors.length; i++)
	{
		ePro.push(e.vectors[i].projectTo(height));
		fPro.push(f.vectors[i].projectTo(height));

		if ( eMin === undefined || eMin > ePro[i].length()) eMin = ePro[i].length();
		if ( eMax === undefined || eMax < ePro[i].length()) eMax = ePro[i].length();
		if ( fMin === undefined || fMin > fPro[i].length()) fMin = fPro[i].length();
		if ( fMax === undefined || fMax < fPro[i].length()) fMax = fPro[i].length();
	}

	if (( fMin < eMax  && fMax > eMin ) || AlmostEqual(fMin, eMax, 0.000001) )
	{
		//console.log('Y-axel, Collision detected');
		e.style = "#FF0000";
		//CollisionCheck(x, fMin);

	}
	else
	{
		//console.log('No collision detected');
	}
}*/
