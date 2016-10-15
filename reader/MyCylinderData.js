/*
 * MyCylinder
 */
 function MyCylinderData(id,base,top,height,slices,stacks) {
     this.base = base;
     this.top = top;
     this.height = height;
     this.slices = slices;
     this.stacks = stacks;
     this.id = id;

 }

 MyCylinderData.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyCylinderData.prototype.constructor = MyCylinderData;

 MyCylinderData.prototype.getBase = function(){
      return this.base;
 } 

 MyCylinderData.prototype.getTop = function(){
      return this.top;
 } 

 MyCylinderData.prototype.getHeight = function(){
      return this.height;
 } 

 MyCylinderData.prototype.getSlices = function(){
      return this.slices;
 } 

 MyCylinderData.prototype.getStacks = function(){
      return this.stacks;
 }

 MyCylinderData.prototype.getId = function(){
      return this.id;
 }