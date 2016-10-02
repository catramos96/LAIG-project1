/*
 * Data Struct for a texture
 */
function MyTexture(id,length_t, length_s) {
 	this.id = id;
 	this.t = length_t;
 	this.s = length_s;
 
 	this.appearance = new CGFappearance(this);
}

 MyTexture.prototype.setTexture = function(file){
 	this.appearance.loadTexture(file);
 }

 MyTexture.prototype.getId = function(){
 	return this.id;
 }

 MyTexture.prototype.getLengthT = function(){
 	return this.t;
 }

 MyTexture.prototype.getLengthS = function(){
 	return this.s;
 }