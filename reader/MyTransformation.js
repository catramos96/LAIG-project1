/**
 * Data Struct of Transformation
 * Use the library for mat4
 */
function MyTransformation(id){ 
    this.id = id;
    this.matrix = mat4.create();  //Identidy matrix
}

/**
 * GETS
 */
 MyTransformation.prototype.getMatrix = function(){
     return this.matrix;
 }

 MyTransformation.prototype.getId = function(){
     return this.id;
 }

 /**
  * GETS
  */
 MyTransformation.prototype.setMatrix = function(m){
    this.matrix = m;
 }

 /**
  * Apply 'translate' to the matrix with the parameters recieved
  */
 MyTransformation.prototype.translate = function(x,y,z){
	mat4.translate(this.matrix,this.matrix,vec3.fromValues(x,y,z));
 }

 /**
  * Apply a 'scale' to the matrix with the parameters recieved
  */
 MyTransformation.prototype.scale = function(x,y,z){
	mat4.scale(this.matrix,this.matrix,vec3.fromValues(x,y,z));
 }

 /**
  *Apply a 'rotate' to the matrix with the parameters recieved
  */
 MyTransformation.prototype.rotate = function(axis, angle){
     if(axis == "x"){
          var vec = vec3.fromValues(1,0,0);
     }
     if(axis == "y"){
         var vec = vec3.fromValues(0,1,0);
     }
     if(axis == "z"){
		 var vec = vec3.fromValues(0,0,1);
     }
    mat4.rotate(this.matrix,this.matrix,angle,vec);
 
 }


