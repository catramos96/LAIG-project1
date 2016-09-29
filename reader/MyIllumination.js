/*
 * Data Struct of Illumination
 */
function MyIllumination(scene) {
 	CGFobject.call(this,scene);

 	this.doublesided = 1;
 	this.local = 1;
 	this.colorAmbient = new MyColor(scene);
 	this.colorBackground = new MyColor(scene);
}

/*MyIllumination.prototype.setDoublesided = function(b){
 	this.doublesided = b; 
 }

 MyIllumination.prototype.setLocal = function(b){
 	this.local = b; 
 }

 MyIllumination.prototype.setAmbient = function(r,g,b,a){
 	this.colorAmbient.setCoordinates(r,g,b,a);
 }

 MyIllumination.prototype.setBackground = function(r,g,b,a){
 	this.colorAmbient.setCoordinates(r,g,b,a);
 }*/
