/**
 * MyTorus data struct
 * Recieves the attributes from MyTorusData (data)
 */
 function MyTorus(scene, data) {
     CGFobject.call(this,scene);

     this.inner = data.getInner();	//inside radius
     this.outer = data.getOuter();	//outside radius
     this.slices = data.getSlices();
     this.loops = data.getLoops();
     
     this.initBuffers();
 }

 MyTorus.prototype = Object.create(CGFobject.prototype);

 /**
  * Init
  */
 MyTorus.prototype.initBuffers = function() {

	//Properties
    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var r = (this.outer - this.inner)/2;   //radius of the tube
 	var R = this.inner + r;  			   //radius of the torus

	//Incrementation Angles
    var alfa = 2*Math.PI/this.slices;
    var beta = 2*Math.PI/this.loops;

 	for(var i = 0; i < this.loops+1; i++)
	{
		for(var j = 0; j < this.slices+1; j++)
		{
			this.vertices.push((R+r*Math.cos(j*alfa))*Math.cos(i*beta),		//(R+r*cos(a))*cos(b)
								(R+r*Math.cos(j*alfa))*Math.sin(i*beta),	//(R+r*cos(a))*sin(b)
								r*Math.sin(j*alfa));						//r*sin(a)

			this.normals.push((Math.cos(j*alfa))*Math.cos(i*beta),			//cos(a)*cos(b)
								(Math.cos(j*alfa))*Math.sin(i*beta),		//cos(a)*sin(b)
								Math.sin(j*alfa));							//sin(a)

       		this.texCoords.push(i/this.loops,j/this.slices);
      
            if(i != this.loops && j < this.slices){
              this.indices.push(i*(this.slices+1) + j,				//vertice processed
              					(i+1)*(this.slices+1) + j,			//vertice to process of the stack above
              					i*(this.slices+1) + j +1);			//next vertice to process

              this.indices.push((i+1)*(this.slices+1) + j,			//vertice to process of the stack above
              					(i+1)*(this.slices+1) + j +1,		//next vertice to process of the stack above
              					i*(this.slices+1) + j +1);			//next vertice to process
            }
		}
 	}
	
    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };