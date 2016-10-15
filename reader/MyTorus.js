/*
 * Data Struct of MyTorus inheritance from MyPrimitive
 */
 function MyTorus(scene,id,inner,outer,slices,loops) {
     CGFobject.call(this,scene);

     this.inner = inner;
     this.outer = outer;
     this.slices = slices;
     this.loops = loops;
     this.id = id;

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
         
            this.vertices.push((R+r*Math.cos(j*alfa))*Math.cos(i*beta),r*Math.sin(j*alfa),(R+r*Math.cos(j*alfa))*Math.sin(i*beta));
            this.normals.push(Math.cos(j*alfa)*Math.cos(i*beta),Math.sin(j*alfa),Math.cos(j*alfa)*Math.sin(i*beta));
       		this.texCoords.push((R+r*Math.cos(j*alfa))*Math.cos(i*beta),(R+r*Math.cos(j*alfa))*Math.sin(i*beta) ); //(z,x)
      
            if(i != this.loops && j < this.slices){
              this.indices.push(i*(this.slices+1) + j,i*(this.slices+1) + j +1,(i+1)*(this.slices+1) + j);
              this.indices.push((i+1)*(this.slices+1) + j,i*(this.slices+1) + j +1,(i+1)*(this.slices+1) + j +1);
            }

 	  }
 	}
    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };