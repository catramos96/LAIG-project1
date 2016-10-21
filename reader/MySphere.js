/**
 * Data Struct of MySphere
 * Recieves the attributes from MySphereData (data)
 */
 function MySphere(scene,data) {
   CGFobject.call(this,scene);

     this.radius = data.getRadius();
     this.slices = data.getSlices();
     this.stacks = data.getStacks();

     this.initBuffers();
 }

 MySphere.prototype = Object.create(CGFobject.prototype);

 /**
  * Init
  */
 MySphere.prototype.initBuffers = function() {
	 
	//Properties
    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

    alfa = 2*Math.PI/this.slices; 		//Angle between x and y axis
    beta = Math.PI/this.stacks; 		//Angle with the z axis
	
	//DRAW sphere from z = -radius to z = radius
 	for(var i = 0; i < this.stacks+1; i++){
     
 	  for(var j = 0; j < this.slices+1; j++)
	  {
            this.vertices.push(this.radius*Math.sin(alfa*j)*Math.sin(beta*i),	//r*sin(a)*sin(b)
            					this.radius*Math.cos(alfa*j)*Math.sin(beta*i),	//r*cos(a)*sin(b)
            					this.radius*Math.cos(-Math.PI+beta*i));			//r*cos(-PI+b)

            this.normals.push(Math.sin(alfa*j)*Math.sin(beta*i),				//sin(a)*sin(b)
            					Math.cos(alfa*j)*Math.sin(beta*i),				//cos(a)*sin(b)
            					Math.cos(-Math.PI+beta*i));						//cos(-PI+b)

            this.texCoords.push(1-j/(this.slices),1-i/(this.stacks));
            
           if(i != this.stacks && j != this.slices)
		   {
              this.indices.push(j+(i)*(this.slices+1),					//vertice processed
              					1+j+(i+1)*(this.slices+1),				//next vertice to process in the stack above
              					1+j+(i)*(this.slices+1));				//next vertice to process
	
              this.indices.push(j+(i)*(this.slices+1),					//vertice processed
              					j+(i+1)*(this.slices+1),				//vertice to process in the stack above
              					1+j+(i+1)*(this.slices+1));				//next vertice to process in the stack above
            }
		}
 	}

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };