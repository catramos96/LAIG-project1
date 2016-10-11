/*
 * Data Struct of MyRectangle inheritance from MyPrimitive
 */
 function MyRectangle(scene,id,p1, p2) {
     CGFobject.call(this,scene);
     
     this.p1 = p1;
     this.p2 = p2;
     this.id = id;

     this.initBuffers();
 }

 MyRectangle.prototype = Object.create(CGFobject.prototype);
 MyRectangle.prototype.constructor=MyRectangle; 

 /*
 * Print Info
 */
   
 MyRectangle.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - rectangle" );
    this.p1.printInfo();
    this.p2.printInfo();
 }

MyRectangle.prototype.initBuffers = function() {

    var xmin, xmax, ymin,ymax;
    
    //x
    if(this.p1.getX() >= this.p2.getX()){
      xmax = this.p1.getX();
      xmin = this.p2.getX();
    }
    else{
      xmax = this.p2.getX();
      xmin = this.p1.getX();
    }
    //y
    if(this.p1.getY() >= this.p2.getY()){
      ymax = this.p1.getY();
      ymin = this.p2.getY();
    }
    else{
      ymax = this.p2.getY();
      ymin = this.p1.getY();
    }
    
 	this.vertices = [
      xmin,ymin,0,   //topo (4)
      xmax,ymin,0,
      xmax,ymax,0,
      xmin,ymax,0 	
 	];

    this.indices = [
      0,1,2,
      0,2,3
      ];

 	this.normals = [ 
      0,0,1,
      0,0,1,
      0,0,1,
      0,0,1
 	];

 	this.texCoords = [
      1,0,
      1,1,
      0,1,
      0,0
 	];
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
