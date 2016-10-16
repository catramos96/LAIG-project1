/*
 * Data Struct of Transformation
 */
function MyTransformation(id){ 

    this.id = id;
    this.matrix = mat4.create();  //comecamos com a matriz identidade
}

 MyTransformation.prototype.getMatrix = function(){
     return this.matrix;
 }

 MyTransformation.prototype.getId = function(){
     return this.id;
 }

 MyTransformation.prototype.setMatrix = function(m){
    this.matrix = m;
 }

/**
 * Só funciona para matrizes 4x4 
 *
 MyTransformation.prototype.multiply = function(m1, m2){

    m3 = [];
   
   m3[0] = m1[0]*m2[0] + m1[1]*m2[4] + m1[2]*m2[8]+ m1[3]*m2[12];
   m3[1] = m1[0]*m2[1] + m1[1]*m2[5] + m1[2]*m2[9]+ m1[3]*m2[13];
   m3[2] = m1[0]*m2[2] + m1[1]*m2[6] + m1[2]*m2[10]+ m1[3]*m2[14];
   m3[3] = m1[0]*m2[3] + m1[1]*m2[7] + m1[2]*m2[11]+ m1[3]*m2[15];
   m3[4] = m1[4]*m2[0] + m1[5]*m2[4] + m1[6]*m2[8]+ m1[7]*m2[12];
   m3[5] = m1[4]*m2[1] + m1[5]*m2[5] + m1[6]*m2[9]+ m1[7]*m2[13];
   m3[6] = m1[4]*m2[2] + m1[5]*m2[6] + m1[6]*m2[10]+ m1[7]*m2[14];
   m3[7] = m1[4]*m2[3] + m1[5]*m2[7] + m1[6]*m2[11]+ m1[7]*m2[15];
   m3[8] = m1[8]*m2[0] + m1[9]*m2[4] + m1[10]*m2[8]+ m1[11]*m2[12];
   m3[9] = m1[8]*m2[1] + m1[9]*m2[5] + m1[10]*m2[9]+ m1[11]*m2[13];
   m3[10] = m1[8]*m2[2] + m1[9]*m2[6] + m1[10]*m2[10]+ m1[11]*m2[14];
   m3[11] = m1[8]*m2[3] + m1[9]*m2[7] + m1[10]*m2[11]+ m1[11]*m2[15];
   m3[12] = m1[12]*m2[0] + m1[13]*m2[4] + m1[14]*m2[8]+ m1[15]*m2[12];
   m3[13] = m1[12]*m2[1] + m1[13]*m2[5] + m1[14]*m2[9]+ m1[15]*m2[13];
   m3[14] = m1[12]*m2[2] + m1[13]*m2[6] + m1[14]*m2[10]+ m1[15]*m2[14];
   m3[15] = m1[12]*m2[3] + m1[13]*m2[7] + m1[14]*m2[11]+ m1[15]*m2[15];
 
   return m3;
 }*/

 MyTransformation.prototype.translate = function(x,y,z){
   /*translMatrix =  [ 1, 0, 0, x,
                    0, 1, 0, y,
                    0, 0, 1, z,
                    0, 0, 0, 1 ];

   this.matrix = this.multiply(translMatrix,this.matrix);*/

    mat4.translate(this.matrix,this.matrix,vec3.fromValues(x,y,z));
 }

 MyTransformation.prototype.scale = function(x,y,z){
  /* scaleMatrix =  [ x, 0, 0, 0,
                    0, y, 0, 0,
                    0, 0, z, 0,
                    0, 0, 0, 1 ];

   this.matrix = this.multiply(scaleMatrix,this.matrix);*/

   mat4.scale(this.matrix,this.matrix,vec3.fromValues(x,y,z));
 }

 MyTransformation.prototype.rotate = function(axis, angle){
     if(axis == "x"){
         /*rotMatrix = [ 1, 0, 0, 0,
                       0, Math.cos(angle), -Math.sin(angle), 0,
                       0, Math.sin(angle), Math.cos(angle), 0,
                       0, 0, 0, 1 ];*/
          var vec = vec3.fromValues(1,0,0);
     }
     if(axis == "y"){
         /*rotMatrix = [ Math.cos(angle), 0, Math.sin(angle), 0,
                       0, 1, 0, 0,
                       -Math.sin(angle), 0, Math.cos(angle), 0,
                       0, 0, 0, 1 ];*/
         var vec = vec3.fromValues(0,1,0);
     }
     if(axis == "z"){
        /* rotMatrix = [ Math.cos(angle), -Math.sin(angle), 0, 0,
                       Math.sin(angle), Math.cos(angle), 0, 0,
                       0, 0, 1, 0,
                       0, 0, 0, 1 ];*/
        var vec = vec3.fromValues(0,0,1);
     }
    // this.matrix = this.multiply(rotMatrix,this.matrix);

    mat4.rotate(this.matrix,this.matrix,angle,vec);
 
 }

/*
 MyTransformation.prototype.display = function(){

    m = this.matrix;
    console.log("Matriz : "+this.id);
    console.log("[ "+m[0]+" "+m[1]+" "+m[2]+" "+m[3]+" ]");
    console.log("[ "+m[4]+" "+m[5]+" "+m[6]+" "+m[7]+" ]");
    console.log("[ "+m[8]+" "+m[9]+" "+m[10]+" "+m[11]+" ]");
    console.log("[ "+m[12]+" "+m[13]+" "+m[14]+" "+m[15]+" ]");
 }*/

