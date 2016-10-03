/*
 * Data Struct of MyTriangle inheritance from MyPrimitive
 */
 function MyTriangle(id,p1, p2,p3) {
     this.point1 = p1;
     this.point2 = p2;
     this.point3 = p3;
     this.id = id;
 }

 MyTriangle.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyTriangle.prototype.constructor=MyTriangle; 

 /*
 * Print Info
 */
   
 MyTriangle.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - triangle");
    this.point1.printInfo();
 	this.point2.printInfo();
 	this.point3.printInfo();
 }
