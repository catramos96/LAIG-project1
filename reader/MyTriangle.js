/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene,id,p1,p2,p3) {
     CGFobject.call(this,scene);
     this.p1 = p1;
     this.p2 = p2;
     this.p3 = p3;
     this.id = id;
     this.initBuffers();
 }

 MyTriangle.prototype = Object.create(CGFobject.prototype);
 MyTriangle.prototype.constructor = MyTriangle;

 /*
 * Print Info
 */
   
 MyTriangle.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - triangle");
    this.point1.printInfo();
 	this.point2.printInfo();
 	this.point3.printInfo();
 }

 MyTriangle.prototype.initBuffers = function() {
   //vetores que define o plano onde estão os 3 pontos
    var v1 = new MyPoint(this.p2.getX()-this.p1.getX(),this.p2.getY()-this.p1.getY(),this.p2.getZ()-this.p1.getZ());
    var v2 = new MyPoint(this.p3.getX()-this.p1.getX(),this.p3.getY()-this.p1.getY(),this.p3.getZ()-this.p1.getZ());

    //vector normal ao plano de v1 com v2
    var nx = v1.getY()*v2.getZ() - v1.getZ()*v2.getY();
    var ny = -(v1.getX()*v2.getZ() - v1.getZ()*v2.getX());
    var nz = v1.getX()*v2.getY() -v1.getY()*v2.getX();

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

 	this.texCoords = [
 	1,0,
 	1,1,
 	0,0
 	]; //FALTA
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
