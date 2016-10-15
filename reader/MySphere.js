/*
 * MySphere
 */
 function MySphere(scene,data) {
   CGFobject.call(this,scene);

     this.radius = data.getRadius();
     this.slices = data.getSlices();
     this.stacks = data.getStacks();
     this.id = data.getId();

     this.initBuffers();
 }

 MySphere.prototype = Object.create(CGFobject.prototype);

 MySphere.prototype.initBuffers = function() {
    this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];

    //(0,-radius,0) //bottom v0,v1
    for(var i = 0; i < 2;i++){
      this.vertices.push(0,-this.radius,0);
      this.normals.push(0,-1,0);
      this.texCoords.push(1,i);
    }
    //(0,radius,0) //top v2,v3
    for(var i = 0; i < 2;i++){
      this.vertices.push(0,this.radius,0);
      this.normals.push(0,1,0);
      this.texCoords.push(0,i);
    }

    alfa = 2*Math.PI/this.slices; //ang entre x e z
    beta = Math.PI/this.stacks; //ang entre y i yaxis
	

 	for(var i = 1; i < this.stacks+1; i++){
     
 	  for(var j = 0; j < this.slices+1; j++){
            this.vertices.push(this.radius*Math.sin(alfa*j)*Math.sin(beta*i),this.radius*Math.cos(-Math.PI+beta*i),this.radius*Math.cos(alfa*j)*Math.sin(beta*i));
            this.normals.push(this.radius*Math.sin(alfa*j)*Math.sin(beta*i),this.radius*Math.cos(-Math.PI+beta*i),this.radius*Math.cos(alfa*j)*Math.sin(beta*i));
       		this.texCoords.push(this.radius*Math.sin(alfa*j)*Math.sin(beta*i),this.radius*Math.cos(-Math.PI+beta*i)); //(z,x)
       //first stack
            if(i == 1 && j != 0 && j <= this.slices/2){
              this.indices.push(0,j+4,j+3);
            }
            else if(i == 1 && j != 0){
              this.indices.push(1,j+4,j+3);
            }
        //others stacks
            if(i > 1 && j < this.slices){
              this.indices.push(4+j+(i-2)*(this.slices+1),4+1+j+(i-2)*(this.slices+1),4+1+j+(i-1)*(this.slices+1));
              this.indices.push(4+j+(i-2)*(this.slices+1),4+1+j+(i-1)*(this.slices+1),4+j+(i-1)*(this.slices+1));
            }
        //last stack             
			if(i == this.stacks && j <= this.slices/2){
            	this.indices.push(4+j+(i-2)*(this.slices+1),4+1+j+(i-2)*(this.slices+1),2);
            }
            else if(i == this.stacks && j > this.slices/2){
              	this.indices.push(4+j+(i-2)*(this.slices+1),4+1+j+(i-2)*(this.slices+1),3);
            }
         

 	  }
 	}

    this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();

 };
 /*MySphere.prototype.initBuffers = function() {

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
 				
 			
			 // Primeira Stack
		
 			if(k == 0 && i != this.slices-1) 
 				this.indices.push(0,i+1,i+2);
 			
 			if(k == 0 && i == this.slices-1) // ultima slice
 				this.indices.push(0,i+1,1)

 			
 			 // Restantes Stacks
 			 
 			 			
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
 };*/

