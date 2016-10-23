/**
 * Data Struct for a material
 */
function MyMaterial(id) {
 	this.id = id;
}

/**
 * Init
 */
 MyMaterial.prototype.init = function(scene)
 {
 	this.appearance = new CGFappearance(scene);
	this.appearance.setEmission(this.emission.getR(),this.emission.getG(),this.emission.getB(),this.emission.getA());
 	this.appearance.setAmbient(this.ambient.getR(),this.ambient.getG(),this.ambient.getB(),this.ambient.getA());
	this.appearance.setDiffuse(this.diffuse.getR() ,this.diffuse.getG() ,this.diffuse.getB() ,this.diffuse.getA());
	this.appearance.setSpecular(this.specular.getR(),this.specular.getG(),this.specular.getB(),this.specular.getA());
	this.appearance.setShininess(this.shininess);
	this.appearance.setTextureWrap('REPEAT', 'REPEAT');
 }

 /**
  * Faz load de uma textura na appearance deste material
  */
 MyMaterial.prototype.loadTexture = function(file){
	this.appearance.loadTexture(file);
 }

 /**
  * GETS
  */
 MyMaterial.prototype.getAppearance = function(){
   return this.appearance;
 }
 
 MyMaterial.prototype.getId = function(){
 	return this.id;
 }

 /**
  * SETS
  */
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