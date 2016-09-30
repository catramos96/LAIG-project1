/*
 * Data Struct of light (omni - geral)
 */
function MyLight() {
 	this.enable = 1;
 	this.id = "";
 	this.ambient = new MyColor();
 	this.diffuse = new MyColor();
 	this.specular = new MyColor();
}

function MyLight(id) {
 	this.enable = 1;
 	this.id = id;
}

 MyLight.prototype.setEnable = function(b){
 	this.enable = b;
 }

 MyLight.prototype.setId = function(id){
 	this.id = id;
 }

 MyLight.prototype.setAmbient = function(r,g,b,a){
 	this.ambient.setCoordinates(r,g,b,a);
 }

 MyLight.prototype.setDiffuse = function(r,g,b,a){
 	this.diffuset.setCoordinates(r,g,b,a);
 }

  MyLight.prototype.setSpecular = function(r,g,b,a){
 	this.specular.setCoordinates(r,g,b,a);
 }