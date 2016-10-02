/*
 * Data Struct for a material
 */
function MyMaterial(id) {
 	this.id = id;
 	this.appearance = new CGFappearance(this);
}

 MyMaterial.prototype.setEmission = function(r,g,b,a){
 	this.emission = new MyColor(r,g,b,a);
 }

 MyMaterial.prototype.setAmbient = function(r,g,b,a){
 	this.appearance.setAmbient(r,g,b,a);
 }

 MyMaterial.prototype.setDiffuse = function(r,g,b,a){
 	this.appearance.setDiffuse(r,g,b,a);
 }

 MyMaterial.prototype.setSpecular = function(r,g,b,a){
 	this.appearance.setSpecular(r,g,b,a);
 }

 MyMaterial.prototype.setShininess = function(a){
 	this.appearance.setShininess(r,g,b,a);
 }

 MyMaterial.prototype.getMaterial = function(a){
 	return this.appearance;
 }