/*
 * Data Struct of primitive
 */
function MyPrimitive(id,type) {
    if(type != "rectangle" && type != "triangle" && type != "cylinder" && type != "sphere" && type != "torus"){
        return "Wrong Primitive type"
    }

    this.id = id;
 	this.type = type;

 	//rectangle/triangle
 	this.point1 = new MyPoint(0,0,0);
 	this.point2 = new MyPoint(0,0,0);
 	this.point3 = new MyPoint(0,0,0);
    
    //cylinder
 	this.base = 0;
 	this.top = 0;
 	this.height = 0;

 	//sphere
 	this.radius = 0;

    //torus
 	this.inner = 0;
 	this.outer = 0;
 	this.loops = 0;

 	this.slices = 0;
 	this.stacks = 0;
}

/*
 * Print Info
 */
   
 MyPrimitive.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - " + this.type);
 	switch(this.type){
 	    case "rectangle":{
            this.point1.printInfo();
            this.point2.printInfo();
        	break;
 	    }
 	    case "triangle":{
 	        this.point1.printInfo();
 	        this.point2.printInfo();
 	        this.point3.printInfo();
            break;
 	    }
 	    case "cylinder":{
            console.log("base - " + this.base + " ; top - " + this.top + " ; height - " + this.height);
            console.log("slices - " + this.slices + " ; stacks - " + this.stacks);
        break;
 	    }
 	    case "sphere":{
            console.log("radius - " + this.radius);
            console.log("slices - " + this.slices + " ; stacks - " + this.stacks);
 	    break;
 	    }
 	    case "torus":{
            console.log("inner - " + this.inner + " ; outer - " + this.outer);
            console.log("slices - " + this.slices + " ; loops - " + this.loops);
 	        break;
 	    }
 	}
 }


 /*
  * SETS
  */
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
