/**
 * Data Struct of MyTriangleData
 * Guarda todos os valores lidos no parser sobre a primitiva Triangle
 * Objeto derivado de MyPrimitive
 */
 function MyTriangleData(id,p1,p2,p3) {
     this.p1 = p1;
     this.p2 = p2;
     this.p3 = p3;
     this.id = id;
 };

 MyTriangleData.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyTriangleData.prototype.constructor = MyTriangleData;

 /*
 * Print Info
 */ 
 MyTriangleData.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - triangle");
    this.point1.printInfo();
 	this.point2.printInfo();
 	this.point3.printInfo();
 };

 /**
  * GETS
  */
 MyTriangleData.prototype.getP1 = function(){
 	return this.p1;
 };

 MyTriangleData.prototype.getP2 = function(){
 	return this.p2;
 };

 MyTriangleData.prototype.getP3 = function(){
 	return this.p3;
 };

 MyTriangleData.prototype.getId = function(){
 	return this.id;
 };