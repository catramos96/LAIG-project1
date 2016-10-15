function MyRectangleData(id,p1,p2) {   
     this.p1 = p1;
     this.p2 = p2;
     this.id = id;
 }

 MyRectangleData.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyRectangleData.prototype.constructor=MyRectangleData; 

 /*
 * Print Info
 */
   
 MyRectangleData.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - rectangle" );
    this.p1.printInfo();
    this.p2.printInfo();
 }

 MyRectangleData.prototype.getP1 = function(){
 	return this.p1;
 }

 MyRectangleData.prototype.getP2 = function(){
 	return this.p2;
 }

 MyRectangleData.prototype.getID = function(){
 	return this.id;
 } 