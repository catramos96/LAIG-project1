/*
 * Data Struct of MyCylinder inheritance from MyPrimitive
 */
 function MyCylinder(id,base,top,height,slices,stacks) {
     this.base = base;
     this.top = top;
     this.height = height;
     this.slices = slices;
     this.stacks = stacks;
     this.id = id;
 }

 MyCylinder.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyCylinder.prototype.constructor=MyCylinder; 

 /*
 * Print Info
 */
   
 MyCylinder.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - cylinder");
    console.log("base - " + this.base + " ; top - " + this.top + " ; height - " + this.height);
    console.log("slices - " + this.slices + " ; stacks - " + this.stacks);

 }
