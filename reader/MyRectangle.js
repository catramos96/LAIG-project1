/*
 * Data Struct of MyRectangle inheritance from MyPrimitive
 */
 function MyRectangle(scene,data,lS,lT) {
     CGFobject.call(this,scene);
     
     this.p1 = data.getP1();
     this.p2 = data.getP2();

     this.lS = lS;
     this.lT = lT;

     this.initBuffers();
 }

 MyRectangle.prototype = Object.create(CGFobject.prototype);

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

 	var S = (this.p2.getX() - this.p1.getX()) / this.lS;
 	var T = (this.p2.getY() - this.p1.getY()) / this.lT;

 	/*this.texCoords = [
 	  0,0,
 	  S,0,
 	  S,T,
 	  0,T
 	];*/
    var ds = ymax-ymin;
    var dt = xmax-xmin;
    
 	this.texCoords = [
     ds/this.lS,0,
      ds/this.lS,dt/this.lT,
      0,dt/this.lT,
      0,0
 	];
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
