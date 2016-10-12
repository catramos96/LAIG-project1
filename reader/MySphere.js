/*
 * MySphere
 */
 function MySphere(scene,id,radius,slices,stacks) {
   CGFobject.call(this,scene);

     this.radius = radius;
     this.slices = slices;
     this.stacks = stacks;
     this.id = id;

     this.initBuffers();
 }

 MySphere.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MySphere.prototype = Object.create(CGFobject.prototype);
 MySphere.prototype.constructor = MySphere;


 /*
 * Print Info
 */
   
 MySphere.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - sphere ");
    console.log("radius - " + this.radius);
    console.log("slices - " + this.slices + " ; stacks - " + this.stacks);
 
 }

 MySphere.prototype.initBuffers = function() {

 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

 	alfa = 2*Math.PI/this.slices;
    beta = Math.PI/2/this.stacks;
	
	this.vertices.push(0,0.5,0);
 	this.normals.push(0,1,0);
 	this.texCoords.push(0.5,0.5);

  //meia esfera com raio = 1
	for(var k = 0; k < this.stacks;k++){ 
 	
 		for(var i = 0; i < this.slices; i++){ 
 	
				this.vertices.push(Math.sin(beta*(k+1))*Math.sin(alfa*i),-0.5+Math.cos(beta*(k+1)),Math.sin(beta*(k+1))*Math.cos(alfa*i));
 				this.normals.push(Math.sin(beta*(k+1))*Math.sin(alfa*i),+Math.cos(beta*(k+1)),Math.sin(beta*(k+1))*Math.cos(alfa*i));
 				this.texCoords.push(0.5 + Math.sin(beta*(k+1))*Math.sin(alfa*i)/2 , 0.5 + Math.sin(beta*(k+1))*Math.cos(alfa*i)/2); //(z,x)
 				
 			/*
			 * Primeira Stack
			 */
 			if(k == 0 && i != this.slices-1) 
 				this.indices.push(0,i+1,i+2);
 			
 			if(k == 0 && i == this.slices-1) // ultima slice
 				this.indices.push(0,i+1,1)

 			/*
 			 * Restantes Stacks
 			 */	 
 			 			
 			if(k!= 0 && i != this.slices-1){	
 				this.indices.push(k*(this.slices)+i+1 ,k*(this.slices)+i+2,(k-1)*(this.slices)+i+1);
 				this.indices.push(k*(this.slices)+i+2 ,(k-1)*(this.slices)+i+2,(k-1)*(this.slices)+i+1);
 			}

 			if(k!= 0 && i == this.slices-1){	//ultima slice
 				this.indices.push(k*(this.slices)+i+1 ,k*(this.slices)+1,(k-1)*(this.slices)+i+1);
 				this.indices.push(k*(this.slices)+1 ,(k-1)*(this.slices)+1,(k-1)*(this.slices)+i+1);
 			}
							
 		}
 	}

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

