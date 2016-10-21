/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene,data,lS,lT) {
     CGFobject.call(this,scene);
	 
	 //pontos de acordo com o pdf no moodle
     this.p0 = data.getP1();
     this.p1 = data.getP2();
     this.p2 = data.getP3();

     this.lS = lS;
     this.lT = lT;

     this.initBuffers();
 }

 MyTriangle.prototype = Object.create(CGFobject.prototype);

 /**
  * Inicializacao dos buffers para a criacao do triangulo
  */
 MyTriangle.prototype.initBuffers = function() {
   //vetores que define o plano onde estão os 3 pontos
    var v1 = new MyPoint(this.p1.getX()-this.p0.getX(),this.p1.getY()-this.p0.getY(),this.p1.getZ()-this.p0.getZ());	//P0P1
    var v2 = new MyPoint(this.p2.getX()-this.p0.getX(),this.p2.getY()-this.p0.getY(),this.p2.getZ()-this.p0.getZ());	//P0P2
	var v3 = new MyPoint(this.p2.getX()-this.p1.getX(),this.p2.getY()-this.p1.getY(),this.p2.getZ()-this.p1.getZ()); 	//P1P2

    //vector normal ao plano de v1 com v2 (produto vetorial)
    var nx = v1.getY()*v2.getZ() - v1.getZ()*v2.getY();
    var ny = -(v1.getX()*v2.getZ() - v1.getZ()*v2.getX());
    var nz = v1.getX()*v2.getY() -v1.getY()*v2.getX();

 	this.vertices = [
		this.p0.getX(), this.p0.getY(), this.p0.getZ(),
		this.p1.getX(), this.p1.getY(), this.p1.getZ(),
		this.p2.getX(), this.p2.getY(), this.p2.getZ()
 	];

 	this.indices = [
		0, 1, 2
 	];

 	this.normals = [   
		nx,ny,nz,
		nx,ny,nz,
		nx,ny,nz
 	];

 	//calculo para as texturas 
/*
 	//d1 p0p1, d2 p0p2, d3 p1p2
 	var d1 = Math.sqrt(v2.getX()*v2.getX()+v2.getY()*v2.getY()+v2.getZ()*v2.getZ());
 	var d2 = Math.sqrt(v1.getX()*v1.getX()+v1.getY()*v1.getY()+v1.getZ()*v1.getZ());
	var d3 = Math.sqrt(v3.getX()*v3.getX()+v3.getY()*v3.getY()+v3.getZ()*v3.getZ());
 
	// beta = (a^2 - b^2 + c^2) /(2 * a * c) =(v3^2 - v2^2 + v3^2) /(2 * v3 * v1)
    var beta = (da*da - db*db + dc*dc)/(2*da*dc);

    //p0(x1,y1)	p1(0,0)	p2(0,c) em coordenadas uv
    var x1 = dc - da*Math.cos(beta);
    var y1 = da*Math.sin(beta);

    var S1 = dc/this.lS;
    var S2 = x1/this.lS;
    var T = y1/this.lT;

    var dmax;

    if(d1 >= d2 && d1 >= d3)
    	dmax = d1;
    else if(d2 >= d1 && d2 >= d3)
    	dmax = d2;
    else if(d3 >= d1 && d3 >= d2)
    	dmax = d3;*/
	
  
   	var x = [this.p0.getX(),this.p1.getX(),this.p2.getX()];
   	var y = [this.p0.getY(),this.p1.getY(),this.p2.getY()];
   	var z = [this.p0.getZ(),this.p1.getZ(),this.p2.getZ()];

	//rectangulo que inclui o triangulo
	var xmax = x[0], xmin = x[0], ymax = y[0], ymin = y[0], zmax = z[0], zmin = z[0];

	for(i = 1; i < 3; i++){
		if(x[i] > xmax)
			xmax = x[i];
		else if(x[i] < xmin)
			xmin = x[i];
		if(y[i] > ymax)
			ymax = y[i];
		else if(y[i] < ymin)
			ymin = y[i];
		if(z[i] > zmax)
			zmax = z[i];
		else if(z[i] < zmin)
			zmin = z[i];
	}

	var xd = xmax - xmin;
	var yd = ymax - ymin;
	var zd = zmax - zmin;

	this.texCoords = [];

	var s,t;
		
 	for(i = 0; i < 3 ; i++){		//falta indroduzir os angulos que faz com z
 		if(x[i] == xmin)
 			s = 0;
 		else if(x[i] == xmax)
 			s = xd/this.lS;
 		else
 			s = x[i]/this.lS;
 		if(y[i] == ymin)
 			t = yd/this.lT;
 		else if(y[i] == ymax)
 			t = 0;
 		else
 			t = y[i]/this.lT;

 		this.texCoords.push(s,t);
 	}
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
