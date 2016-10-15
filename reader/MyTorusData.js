/*
 * MyTorusData
 */
 function MyTorusData(id,inner,outer,slices,loops) {
     this.id = id;
     this.inner = inner;
     this.outer = outer;
     this.slices = slices;
     this.loops = loops;
 }

 MyTorusData.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyTorusData.prototype.constructor = MyTorusData;

 MySphereData.prototype.getInner = function(){
     return this.inner;
 }

 MyTorusData.prototype.getOutter = function(){
     return this.outter;
 }

 MyTorusData.prototype.getSlices = function(){
     return this.slices;
 }

 MyTorusData.prototype.getLoops = function(){
     return this.loops;
 }

 MyTorusData.prototype.getId = function(){
     return this.id;
 }

 /*
 * Print Info
 */
   
 MyTorus.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - torus ");
 	console.log("inner - " + this.inner + " ; outer - " + this.outer);
    console.log("slices - " + this.slices + " ; loops - " + this.loops);
 }