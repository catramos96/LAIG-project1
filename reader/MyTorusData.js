/**
 * Data Struct of MyTorusData
 * Descendent of MyPrimitive
 */
 function MyTorusData(id,inner,outer,slices,loops) {
     this.id = id;
     this.inner = inner;  //Inside radius
     this.outer = outer;  //Outside radius
     this.slices = slices;
     this.loops = loops;
 }

 MyTorusData.prototype = new MyPrimitive(this.id); 
 MyTorusData.prototype.constructor = MyTorusData;

 /**
  * GETS
  */
 MyTorusData.prototype.getInner = function(){
     return this.inner;
 }

 MyTorusData.prototype.getOuter = function(){
     return this.outer;
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