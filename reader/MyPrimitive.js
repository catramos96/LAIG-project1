/*
 * Data Struct of primitive
 */
function MyPrimitive(id) {
    this.id = id;
}

 MyPrimitive.prototype.getId = function(){
    return this.id;
 }

 /*
  * SETS
  *
  MyPrimitive.prototype.setPoint1 = function(p){
        this.point1.equals(p);
  }

  MyPrimitive.prototype.setPoint2 = function(p){
        this.point2.equals(p);
  }

  MyPrimitive.prototype.setPoint3 = function(p){
        this.point3.equals(p);
  }

  MyPrimitive.prototype.setCylinderProp = function(base,top,height,slices,stacks){
       this.base = base;
       this.top = top;
       this.height = height;
       this.slices = slices;
       this.stacks = stacks;
  }

  MyPrimitive.prototype.setSphereProp = function(radius,slices,stacks){
        this.radius = radius;
        this.slices = slices;
        this.stacks = stacks;
  }

  MyPrimitive.prototype.setTorusProp = function(inner,outer,slices,loops){
        this.inner = inner;
        this.outer = outer;
        this.slices = slices;
        this.loops = loops;
  }
*/