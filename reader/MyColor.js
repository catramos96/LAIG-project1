/*
 * Data Struct with a color (r,g,b,a)
 */
function MyColor(scene) {
 	CGFobject.call(this,scene);

 	this.r = 0;
 	this.g = 0;
 	this.b = 0;
 	this.a = 0;
}

 MyColor.prototype.setCoordinates = function(r,g,b,a){
 	this.r = r;
 	this.g = g;
 	this.b = b;
 	this.a = a;
 }

 // ter erros quando está fora da gama 0-255