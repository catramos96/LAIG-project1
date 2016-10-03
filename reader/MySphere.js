/*
 * Data Struct of MySphere inheritance from MyPrimitive
 */
 function MySphere(id,radius,slices,stacks) {
     this.radius = radius;
     this.slices = slices;
     this.stacks = stacks;
     this.id = id;
 }

 MySphere.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MySphere.prototype.constructor=MySphere; 

 /*
 * Print Info
 */
   
 MySphere.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - sphere ");
    console.log("radius - " + this.radius);
    console.log("slices - " + this.slices + " ; stacks - " + this.stacks);
 
 }
