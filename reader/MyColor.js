/*
 * Data Struct with a color (r,g,b,a)
 */
function MyColor() {
 	this.r = 0;
 	this.g = 0;
 	this.b = 0;
 	this.a = 0;
}

function MyColor(r,g,b,a) {
 	this.r = r;
 	this.g = g;
 	this.b = b;
 	this.a = a;
}

//compor isto
/*CAT : Não seria melhor fazer uma função que recebesse uma cor e atribuia
        os valores da mesma à nossa color. 
*/
 MyColor.prototype.setCoordinates = function(r,g,b,a){
 	this.r = r;
 	this.g = g;
 	this.b = b;
 	this.a = a;
 }

 // ter erros quando está fora da gama 0-255