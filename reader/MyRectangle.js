/*
 * Data Struct of MyRectangle inheritance from MyPrimitive
 */
 function MyRectangle(id,p1, p2) {
     this.point1 = p1;
     this.point2 = p2;
     this.id = id;
 }

 MyRectangle.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyRectangle.prototype.constructor=MyRectangle; 

 /*
 * Print Info
 */
   
 MyRectangle.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - rectangle" );
    this.point1.printInfo();
    this.point2.printInfo();
 }
