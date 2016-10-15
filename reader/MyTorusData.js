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

 MyTorusData.prototype = new MyPrimitive(this.id); 
 MyTorusData.prototype.constructor = MyTorusData;

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