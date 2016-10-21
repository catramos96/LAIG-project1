/**
 * MyTorus data struct
 * Cria o objeto na cena com a data do MyTorusData
 */
 function MyTorus(scene, data) {
     CGFobject.call(this,scene);

     this.inner = data.getInner();
     this.outer = data.getOuter();
     this.slices = data.getSlices();
     this.loops = data.getLoops();
     
     this.initBuffers();
 }

 MyTorus.prototype = Object.create(CGFobject.prototype);

 /**
  * Inicializacao do objeto
  */
 MyTorus.prototype.initBuffers = function() {

    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var r = (this.outer - this.inner)/2;   //radius of the tube
 	var R = this.inner + r;  			   //radius of the torus
   

    var alfa = 2*Math.PI/this.slices;
    var beta = 2*Math.PI/this.loops;

 	for(var i = 0; i < this.loops+1; i++)
	{
		for(var j = 0; j < this.slices+1; j++)
		{
			this.vertices.push((R+r*Math.cos(j*alfa))*Math.cos(i*beta),(R+r*Math.cos(j*alfa))*Math.sin(i*beta),r*Math.sin(j*alfa));
			this.normals.push((Math.cos(j*alfa))*Math.cos(i*beta),(Math.cos(j*alfa))*Math.sin(i*beta),Math.sin(j*alfa));
       		this.texCoords.push(i/this.stacks,j/this.slices); //(z,x)
      
            if(i != this.loops && j < this.slices){
              this.indices.push(i*(this.slices+1) + j,(i+1)*(this.slices+1) + j,i*(this.slices+1) + j +1);
              this.indices.push((i+1)*(this.slices+1) + j,(i+1)*(this.slices+1) + j +1,i*(this.slices+1) + j +1);
            }
		}
 	}
	
    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };