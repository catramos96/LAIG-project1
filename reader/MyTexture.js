/**
 * Data Struct for a texture
 * (0,0)
 * ---------> t
 * |
 * |
 * v s
 */
function MyTexture(id,file,length_t, length_s) {
 	this.id = id;
 	this.t = length_t;
 	this.s = length_s;
 	this.file = file
}

/**
 * Inicializacao da aparencia da textura a partir da localizacao do file
 */
 MyTexture.prototype.init = function(scene){
   this.appearance = new CGFtexture(scene,this.file);
 }

/**
 * GETS
 */
 MyTexture.prototype.getId = function(){
 	return this.id;
 }

 MyTexture.prototype.getLengthT = function(){
 	return this.t;
 }

 MyTexture.prototype.getLengthS = function(){
 	return this.s;
 }

 MyTexture.prototype.getAppearance = function(){
 	return this.appearance;
 }