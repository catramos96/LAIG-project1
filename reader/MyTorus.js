/*
 * MyTorus
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

 MyTorus.prototype.initBuffers = function() {

    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	var r = (this.outer - this.inner)/2;   //radius of the tube
 	var R = this.inner + r;  //radius of the torus
   

    alfa = 2*Math.PI/this.slices;
    beta = 2*Math.PI/this.loops;

    // x(alfa,beta = (R+r*cos(alfa)*cos(beta))
    // x(alfa,beta = (R+r*cos(alfa)*sin(beta))
    // x(alfa,beta = r*sin(alfa)
	

 	for(var i = 0; i < this.loops+1; i++){
     
 	  for(var j = 0; j < this.slices+1; j++){
         
            this.vertices.push((R+r*Math.cos(j*alfa))*Math.cos(i*beta),(R+r*Math.cos(j*alfa))*Math.sin(i*beta),r*Math.sin(j*alfa));
            this.normals.push(r*Math.cos(j*alfa)*Math.cos(i*beta),r*Math.sin(j*alfa),r*Math.cos(j*alfa)*Math.sin(i*beta));
       		this.texCoords.push(1-j/this.slices,i/this.stacks); //(z,x)
      
            if(i != this.loops && j < this.slices){
              this.indices.push(i*(this.slices+1) + j,(i+1)*(this.slices+1) + j,i*(this.slices+1) + j +1);
              this.indices.push((i+1)*(this.slices+1) + j,(i+1)*(this.slices+1) + j +1,i*(this.slices+1) + j +1);
            }

 	  }
 	}
    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };