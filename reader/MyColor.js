/**
 * Data Struct with a color (r,g,b,a)
 *  r - red component
 *  g - green component
 *  b - blue component
 *  a - alpha component (transparency)
 */
function MyColor(r,g,b,a) {
  if(r < 0 || r > 1 || g < 0 || g >1 || b < 0 || b > 1 || a < 0 || a > 1)
    return "color values to high or low";
 	this.r = r;
 	this.g = g; 
 	this.b = b;
 	this.a = a;
}

/**
 * Displays on the console the information about the color
 */
 MyColor.prototype.printInfo = function(){
 	console.log(this.r + " " + this.g + " " + this.b + " " + this.a);
 }

/**
 * Equals my instance of Color to another
 */
MyColor.prototype.equals = function(color){
 	this.r = color.getR();
 	this.g = color.getG();
 	this.b = color.getB();
 	this.a = color.getA();
 }

/**
 * SETS
 */
 
 MyColor.prototype.setCoordinates = function(r,g,b,a){
   if(r < 0 || r > 255 || g < 0 || g >255 || b < 0 || b > 255 || a < 0 || a > 255)
    return "color values to high or low";
 	this.r = r;
 	this.g = g;
 	this.b = b;
 	this.a = a;
 }

/**
 * GETS
 */

 MyColor.prototype.getR = function(){
   return this.r;
 }

 MyColor.prototype.getG = function(){
   return this.g;
 }

 MyColor.prototype.getB = function(){
   return this.b;
 }

 MyColor.prototype.getA = function(){
   return this.a;
 }

 