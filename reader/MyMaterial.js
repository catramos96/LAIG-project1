/*
 * Data Struct for a material
 */
function MyMaterial(id) {
 	this.id = id;
}

 MyMaterial.prototype.init = function(scene){
 	this.appearance = new CGFappearance(scene);
 	this.appearance.setAmbient(this.ambient.r,this.ambient.g,this.ambient.b,this.ambient.a);
	this.appearance.setDiffuse(this.diffuse.r ,this.diffuse.g ,this.diffuse.b ,this.diffuse.a); //forte componente difusa
	this.appearance.setSpecular(this.specular.r,this.specular.g,this.specular.b,this.specular.a); // pouca componente especular
	this.appearance.setShininess(this.shininess);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
	
	//this.appearance.loadTexture("../reader/scenes/flor.png"); // isto e para sair daqui
 }

 MyMaterial.prototype.loadTexture = function(file){
	this.appearance.loadTexture(file); // isto e para sair daqui
 }

 MyMaterial.prototype.getAppearance = function(){
   return this.appearance;
 }

 MyMaterial.prototype.setMyEmission = function(r,g,b,a){
 	this.emission = new MyColor(r,g,b,a);
 }

 MyMaterial.prototype.setMyAmbient = function(r,g,b,a){
 	this.ambient = new MyColor(r,g,b,a);
 }

 MyMaterial.prototype.setMyDiffuse = function(r,g,b,a){
 	this.diffuse = new MyColor(r,g,b,a);
 }

 MyMaterial.prototype.setMySpecular = function(r,g,b,a){
 	this.specular = new MyColor(r,g,b,a);
 }

 MyMaterial.prototype.setMyShininess = function(a){
 	this.shininess = a;
 }

 MyMaterial.prototype.getId = function(){
 	return this.id;
 }