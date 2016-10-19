/*
 * MySphere
 */
 function MySphere(scene,data) {
   CGFobject.call(this,scene);

     this.radius = data.getRadius();
     this.slices = data.getSlices();
     this.stacks = data.getStacks();

     this.initBuffers();
 }

 MySphere.prototype = Object.create(CGFobject.prototype);

 MySphere.prototype.initBuffers = function() {
    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

    alfa = 2*Math.PI/this.slices; //ang entre x e z
    beta = Math.PI/this.stacks; //ang entre y i yaxis
	

 	for(var i = 0; i < this.stacks+1; i++){
     
 	  for(var j = 0; j < this.slices+1; j++){
            this.vertices.push(this.radius*Math.sin(alfa*j)*Math.sin(beta*i),this.radius*Math.cos(-Math.PI+beta*i),this.radius*Math.cos(alfa*j)*Math.sin(beta*i));
            this.normals.push(this.radius*Math.sin(alfa*j)*Math.sin(beta*i),this.radius*Math.cos(-Math.PI+beta*i),this.radius*Math.cos(alfa*j)*Math.sin(beta*i));
            this.texCoords.push(j/(this.slices),-i/(this.stacks));
            
           if(i != this.stacks && j != this.slices){
              this.indices.push(j+(i)*(this.slices+1),1+j+(i)*(this.slices+1),1+j+(i+1)*(this.slices+1));
              this.indices.push(j+(i)*(this.slices+1),1+j+(i+1)*(this.slices+1),j+(i+1)*(this.slices+1));
            }
        
 	  }
 	}

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };