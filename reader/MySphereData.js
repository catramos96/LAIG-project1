/**
 * Data Struct of MySphereData
 * Guarda todos os valores lidos no parser sobre a primitiva Sphere
 * Objeto derivado de MyPrimitive
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
  * Print Info
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