/**
 * MyTriangle
 * Recieves the attributes from MyTriangleData (data)
 * @constructor
 */
 function MyTriangle(scene,data,lS,lT) {
     CGFobject.call(this,scene);
	 
     this.p0 = data.getP1();
     this.p1 = data.getP2();
     this.p2 = data.getP3();

     this.lS = lS;
     this.lT = lT;

     this.initBuffers();
 }

 MyTriangle.prototype = Object.create(CGFobject.prototype);

 /**
  * Init
  */
 MyTriangle.prototype.initBuffers = function() {

   //Vertices v1 = p0p1 v2 = p1p2 v3 = p2p0
    var v1 = new MyPoint(this.p1.getX()-this.p0.getX(),this.p1.getY()-this.p0.getY(),this.p1.getZ()-this.p0.getZ());	
    var v2 = new MyPoint(this.p2.getX()-this.p1.getX(),this.p2.getY()-this.p1.getY(),this.p2.getZ()-this.p1.getZ()); 	
    var v3 = new MyPoint(this.p2.getX()-this.p0.getX(),this.p2.getY()-this.p0.getY(),this.p2.getZ()-this.p0.getZ());	

 	this.vertices = [
		this.p0.getX(), this.p0.getY(), this.p0.getZ(),
		this.p1.getX(), this.p1.getY(), this.p1.getZ(),
		this.p2.getX(), this.p2.getY(), this.p2.getZ()
 	];

 	this.indices = [
		0, 1, 2
 	];

	//Calculate Normals with Cross Product (v1xv3)
    var nx = v1.getY()*v3.getZ() - v1.getZ()*v3.getY();
    var ny = -(v1.getX()*v3.getZ() - v1.getZ()*v3.getX());
    var nz = v1.getX()*v3.getY() -v1.getY()*v3.getX();

 	this.normals = [   
		nx,ny,nz,
		nx,ny,nz,
		nx,ny,nz
 	];

 	//Distances between vertices
 	var a = Math.sqrt(Math.pow(v3.getX(),2)+Math.pow(v3.getY(),2)+Math.pow(v3.getZ(),2)); //p2 a p0
	var b = Math.sqrt(Math.pow(v1.getX(),2)+Math.pow(v1.getY(),2)+Math.pow(v1.getZ(),2)); //p0 a p1
 	var c = Math.sqrt(Math.pow(v2.getX(),2)+Math.pow(v2.getY(),2)+Math.pow(v2.getZ(),2)); //p1 a p2

	//Internal angles of the vertices
	var lambda = Math.acos((Math.pow(a,2) + Math.pow(b,2) - Math.pow(c,2))/(2*a*b));
	var alfa = Math.acos((Math.pow(a,2) + Math.pow(b,2) + Math.pow(c,2))/(2*b*c));
	var beta = Math.acos((Math.pow(a,2) - Math.pow(b,2) + Math.pow(c,2))/(2*a*c));

	this.texCoords = [
	(c-a*Math.cos(beta))/this.lS,-(a*Math.sin(beta))/this.lT,
	0,0,
	c/this.lS,0
	];
	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
