/**
 * MyTriangle
 * @constructor
 */
 function MyTriangle(scene,id,p1, p2,p3) {
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
 	this.vertices = [
 	this.p1.getX(), this.p1.getY(), this.p1.getZ(),
 	this.p2.getX(), this.p2.getY(), this.p2.getZ(),
 	this.p3.getX(), this.p3.getY(), this.p3.getZ()
 	];

 	this.indices = [
 	0, 1, 2
 	];

 	this.normals = [
     0, 0, 1,
     0, 0, 1,
     0, 0, 1
 	];

 	/*this.texCoords = [
      this.minS, this.maxT,
      this.maxS, this.maxT,
      this.minS, this.minT,
      this.maxS, this.minT
 	]*/

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
