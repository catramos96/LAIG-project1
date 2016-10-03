/*
 * Data Struct to perspective
 */
function MyPerspective() {
 	this.id = "";
 	this.near = 0;
 	this.far = 0;
 	this.angle = 0;
 	this.toPoint = new MyPoint(0,0,0);
 	this.fromPoint = new MyPoint(0,0,0);
}

 MyPerspective.prototype.getId = function(){
 	return this.id;
 }

 MyPerspective.prototype.setId = function(id){
 	this.id = id;
 }

 MyPerspective.prototype.setNear = function(near){
 	this.near = near;
 }

 MyPerspective.prototype.setFar = function(far){
 	this.far = far;
 }

 MyPerspective.prototype.setAngle = function(angle){
 	this.angle = angle;
 }

 MyPerspective.prototype.setToPoint = function(point){
 	this.toPoint = point;
 }

 MyPerspective.prototype.setFromPoint = function(point){
 	this.fromPoint = point;
 }