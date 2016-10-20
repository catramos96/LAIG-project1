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
     this.LT = lT;

     this.initBuffers();
 }

 MyTriangle.prototype = Object.create(CGFobject.prototype);

 MyTriangle.prototype.initBuffers = function() {
   //vetores que define o plano onde estão os 3 pontos
    var v1 = new MyPoint(this.p1.getX()-this.p0.getX(),this.p1.getY()-this.p0.getY(),this.p1.getZ()-this.p0.getZ());	//P0P1
    var v2 = new MyPoint(this.p2.getX()-this.p0.getX(),this.p2.getY()-this.p0.getY(),this.p2.getZ()-this.p0.getZ());	//P0P2

    //vector normal ao plano de v1 com v2
    var nx = v1.getY()*v2.getZ() - v1.getZ()*v2.getY();
    var ny = -(v1.getX()*v2.getZ() - v1.getZ()*v2.getX());
    var nz = v1.getX()*v2.getY() -v1.getY()*v2.getX();

    //produto vetorial
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
 	
 	// c -> v3 vetor entre o ponto 1 e o ponto 2
 	var v3 = new MyPoint(this.p2.getX()-this.p1.getX(),this.p2.getY()-this.p1.getY(),this.p2.getZ()-this.p1.getZ());
	
 	//da, db e dc : distancias dos vetores v1, v2 e v3 respetivamente
 	var da = Math.sqrt(v2.getX()*v2.getX()+v2.getY()*v2.getY()+v2.getZ()*v2.getZ());
 	var db = Math.sqrt(v1.getX()*v1.getX()+v1.getY()*v1.getY()+v1.getZ()*v1.getZ());
	var dc = Math.sqrt(v3.getX()*v3.getX()+v3.getY()*v3.getY()+v3.getZ()*v3.getZ());
 
	// beta = (a^2 - b^2 + c^2) /(2 * a * c) =(v3^2 - v2^2 + v3^2) /(2 * v3 * v1)
    var beta = (da*da - db*db + dc*dc)/(2*da*dc);

    //p0(x1,y1)	p1(0,0)	p2(0,c)
    var x1 = dc - da*Math.cos(beta);
    var y1 = da*Math.sin(beta);

    var S1 = dc/this.lS;
    var S2 = x1/this.lS;
    var T = y1/this.lT;

 	/*this.texCoords = [
		0,S1,
		S2,T,
		0,0
 	]; */
	
	this.texCoords = [
		0,1,
		1,1,
		0,0
 	];
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
