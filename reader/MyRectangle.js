/**
 * Data Struct of MyRectangle
 * Cria o objeto na cena com as informacaoes do MyRectangleData e as length S e T para as texturas
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

	//escolhe x e y para os pontos dependendo de qual e o menor
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
    
	// so e aplicado no plano xOy pelo que z = 0
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

	//coordenadas de textura para aplicar lS e lT
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
