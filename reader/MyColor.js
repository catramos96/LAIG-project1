/*
 * Data Struct with a color (r,g,b)
 */
function MyPoint(scene) {
 	CGFobject.call(this,scene);

 	this.red = 0;
 	this.green = 0;
 	this.blue = 0;
}

 MyPoint.prototype.setCoordinates = function(r,g,b){
 	this.r = r;
 	this.g = g;
 	this.b = b;
 }

 // ter erros quando está fora da gama 0-255