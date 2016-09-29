/*
 * Data Struct to perspective
 */
function MyPerspective(scene) {
 	CGFobject.call(this,scene);

 	this.id = "";
 	this.near = 0;
 	this.far = 0;
 	this.angle = 0;
 	this.toPoint = new MyPoint(scene);
 	this.fromPoint = new MyPoint(scene);
}