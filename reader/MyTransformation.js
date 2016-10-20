/**
 * Data Struct of Transformation
 * Guarda todos os dados lidos do parser sobre Transformacoes
 * usa a biblioteca mat4
 */
function MyTransformation(id){ 
    this.id = id;
    this.matrix = mat4.create();  //comecamos com a matriz identidade
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
  * Aplica um 'translate' a matriz atual com os valores recebidos
  */
 MyTransformation.prototype.translate = function(x,y,z){
	mat4.translate(this.matrix,this.matrix,vec3.fromValues(x,y,z));
 }

 /**
  * Aplica um 'scale' a matriz atual com os valores recebidos
  */
 MyTransformation.prototype.scale = function(x,y,z){
	mat4.scale(this.matrix,this.matrix,vec3.fromValues(x,y,z));
 }

 /**
  * Aplica um 'rotate' a matriz atual com os valores recebidos
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


