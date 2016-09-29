/*
 * Data Struct with a coordinate (x,y,z)
 */
function MyPoint(x,y,z) {
 	this.x = x;
 	this.y = y;
 	this.z = z;

}

 MyPoint.prototype.getX = function(){
 	return this.x;
 }

 MyPoint.prototype.getY = function(){
 	return this.y;
 }

 MyPoint.prototype.getZ = function(){
 	return this.z;
 }

  MyPoint.prototype.setX = function(x){
 	this.x = x;
 }

 MyPoint.prototype.setY = function(y){
 	this.y = y;
 }

 MyPoint.prototype.setZ = function(z){
 	this.z = z;
 }