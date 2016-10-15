/*
 * MyCylinder
 */
 function MyCylinder(scene,data) {
     CGFobject.call(this,scene);

     this.base = data.getBase();
     this.top = data.getTop();
     this.height = data.getHeight();
     this.slices = data.getSlices();
     this.stacks = data.getStacks();
     this.id = data.getId();

    this.initBuffers();
 }

 MyCylinder.prototype = Object.create(CGFobject.prototype);

 MyCylinder.prototype.initBuffers = function() {

 	var incAng = 2*Math.PI/this.slices;
 	var incHeight = this.height / this.stacks;
 	var incRadius = (this.top/2 - this.base/2) / this.stacks;

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];

 	for(var i = 0; i < this.stacks+1;i++){        
 	  for(var j = 0; j < this.slices+1;j++){ //mais um vetice no final para fazer o mapeamento da textura

 	    this.vertices.push((this.base + incRadius*i)*Math.cos(incAng*j),
 	                      -this.height/2 + incHeight*i,
 	                      (this.base + incRadius*i)*Math.sin(incAng*j));

 	    this.texCoords.push(1-1/this.stacks*i,1-1/this.slices*j);

 	    this.normals.push(Math.cos(incAng*j),
 	                      0,                        //alterar
 	                      Math.sin(incAng*j))

 	    if(j != this.slices && i != this.stacks){
          
          this.indices.push(i*(this.slices+1)+j,
                            (i+1)*(this.slices+1)+j,
                            i*(this.slices+1)+j+1); //0,4,1 (stacks = 1,slices 3)

         this.indices.push((i+1)*(this.slices+1)+j,
                            (i+1)*(this.slices+1)+j+1,
                            i*(this.slices+1)+j+1); //4,5,1*/
 	    }
 	  }
 	}
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };