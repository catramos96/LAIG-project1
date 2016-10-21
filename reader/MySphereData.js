/**
 * Data Struct of MySphereData
 * Descendent of MyPrimitive
 */
 function MySphereData(id,radius,slices,stacks) {
   
     this.radius = radius;
     this.slices = slices;
     this.stacks = stacks;
     this.id = id;
 }

 MySphereData.prototype = new MyPrimitive(this.id); 
 MySphereData.prototype.constructor = MySphereData;


 /**
  * Displays in the console the information about the object
  */
 MySphereData.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - sphere ");
    console.log("radius - " + this.radius);
    console.log("slices - " + this.slices + " ; stacks - " + this.stacks);
 
 }

 /**
  * GETS
  */
 MySphereData.prototype.getRadius = function(){
     return this.radius;
 }

 MySphereData.prototype.getSlices = function(){
     return this.slices;
 }

  MySphereData.prototype.getStacks = function(){
     return this.stacks;
 }

  MySphereData.prototype.getId = function(){
     return this.id;
 }