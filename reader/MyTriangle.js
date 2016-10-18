/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene,data,lS,lT) {
     CGFobject.call(this,scene);
     this.p1 = data.getP1();
     this.p2 = data.getP2();
     this.p3 = data.getP3();

     this.lS = lS;
     this.LT = lT;

     this.initBuffers();
 }

 MyTriangle.prototype = Object.create(CGFobject.prototype);

 MyTriangle.prototype.initBuffers = function() {
   //vetores que define o plano onde estão os 3 pontos
    var v1 = new MyPoint(this.p2.getX()-this.p1.getX(),this.p2.getY()-this.p1.getY(),this.p2.getZ()-this.p1.getZ());
    var v2 = new MyPoint(this.p3.getX()-this.p1.getX(),this.p3.getY()-this.p1.getY(),this.p3.getZ()-this.p1.getZ());

    //vector normal ao plano de v1 com v2
    var nx = v1.getY()*v2.getZ() - v1.getZ()*v2.getY();
    var ny = -(v1.getX()*v2.getZ() - v1.getZ()*v2.getX());
    var nz = v1.getX()*v2.getY() -v1.getY()*v2.getX();

    //produto vetorial
 	this.vertices = [
 	this.p1.getX(), this.p1.getY(), this.p1.getZ(),
 	this.p2.getX(), this.p2.getY(), this.p2.getZ(),
 	this.p3.getX(), this.p3.getY(), this.p3.getZ()
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
 	var base = Math.sqrt(v1.getX()*v1.getX()+v1.getY()*v1.getY()+v1.getZ()*v1.getZ());
 	
 	// beta = (a^2 - b^2 + c^2) /(2 * a * c) =(v3^2 - v2^2 + v3^2) /(2 * v3 * v1) 
 	
 	// a -> v3 vetor entre o ponto 3 e o ponto 2
 	var v3 = new MyPoint(this.p3.getX()-this.p2.getX(),this.p3.getY()-this.p2.getY(),this.p3.getZ()-this.p2.getZ());
 	
 	//da, db e base : distancias dos vetores v3, v2 e v1 respetivamente
 	var da = Math.sqrt(v3.getX()*v3.getX()+v3.getY()*v3.getY()+v3.getZ()*v3.getZ());
 	var db = Math.sqrt(v2.getX()*v2.getX()+v2.getY()*v2.getY()+v2.getZ()*v2.getZ());
 
    var beta = (da*da - db*db + base*base)/(2*da*base);

    //p3(x1,y1)
    var x1 = base - da*Math.cos(beta);
    var y1 = da*Math.sin(beta);

    var S1 = base/this.lS;
    var S2 = x1/this.lS;
    var T = y1/this.lT;

 	this.texCoords = [
 	1,0,
 	1,1,
 	0,0
 	]; //FALTA
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
