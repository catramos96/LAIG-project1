/**
 * Data Struct with a coordinate (x,y,z)
 *  x coordinate
 *  y coordinate
 *  z coordinate
 */
function MyPoint(x,y,z) {
 	this.x = x;
 	this.y = y;
 	this.z = z;
}

/**
 * Displays in the console the information about the object
 */
 MyPoint.prototype.printInfo = function(){
 	console.log("x - " + this.x + " y - " + this.y + " z - " + this.z);
 }

/**
 * Equals an instance of the object to another
 */
 MyPoint.prototype.equals = function(point){
 	this.x = point.getX();
 	this.y = point.getY();
 	this.z = point.getZ();
 }

/**
 * Gets
 */
 MyPoint.prototype.getX = function(){
 	return this.x;
 }

 MyPoint.prototype.getY = function(){
 	return this.y;
 }

 MyPoint.prototype.getZ = function(){
 	return this.z;
 }

/*
 * Sets
 */

  MyPoint.prototype.setX = function(x){
 	this.x = x;
 }

 MyPoint.prototype.setY = function(y){
 	this.y = y;
 }

 MyPoint.prototype.setZ = function(z){
 	this.z = z;
 }