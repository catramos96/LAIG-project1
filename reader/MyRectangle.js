/**
 * Data Struct of MyRectangle
 * Recieves the attributes from MyRectangleData (data)
 * lS and lT are the tilling (lS,lT) parameters of the texture mapping
 * If one of these parameters = x than the texture repeats itself from x to x coordinates
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

 /**
  * Inicializacao do objeto
  */
 MyRectangle.prototype.initBuffers = function() {

	//Max and Min values on x and y coordinates
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
    
	//Always of the xOy surface
 	this.vertices = [
      xmin,ymin,0,   
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

	//Texture coordinates to map the texture
 	var S = (xmax - xmin) / this.lS;
 	var T = (ymax - ymin) / this.lT;

 	this.texCoords = [
		0, T,	   
		S, T,	   
		S, 0,
		0, 0
 	];
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
