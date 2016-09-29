/*
 * Data Struct with a color (r,g,b,a)
 */
function MyColor(r,g,b,a) {
 	this.r = r;
 	this.g = g;
 	this.b = b;
 	this.a = a;
}

//compor isto

 MyColor.prototype.setCoordinates = function(r,g,b,a){
 	this.r = r;
 	this.g = g;
 	this.b = b;
 	this.a = a;
 }

 // ter erros quando está fora da gama 0-255