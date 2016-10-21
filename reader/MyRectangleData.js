/**
 * Data Struct of MyRectangleData
 * Descendent of MyPrimitive
 */
function MyRectangleData(id,p1,p2) {   
     this.p1 = p1;    //MyPoint Object
     this.p2 = p2;    //MyPoint Object
     this.id = id;
 }

 MyRectangleData.prototype = new MyPrimitive(this.id);
 MyRectangleData.prototype.constructor=MyRectangleData; 

 /*
 * Displays in the console the information about the object
 */
 MyRectangleData.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - rectangle" );
    this.p1.printInfo();
    this.p2.printInfo();
 }

 /**
  * GETS
  */
 MyRectangleData.prototype.getP1 = function(){
 	return this.p1;
 }

 MyRectangleData.prototype.getP2 = function(){
 	return this.p2;
 }

 MyRectangleData.prototype.getID = function(){
 	return this.id;
 } 