/*
 * Data Struct of MyTorus inheritance from MyPrimitive
 */
 function MyTorus(id,inner,outer,slices,loops) {
     this.inner = inner;
     this.outer = outer;
     this.slices = slices;
     this.loops = loops;
     this.id = id;
 }

 MyTorus.prototype = new MyPrimitive(this.id);        // Here's where the inheritance occurs 
 MyTorus.prototype.constructor=MyTorus; 

 /*
 * Print Info
 */
   
 MyTorus.prototype.printInfo = function(){
 	console.log("Primitive id - " + this.id + " ; type - torus ");
 	console.log("inner - " + this.inner + " ; outer - " + this.outer);
    console.log("slices - " + this.slices + " ; loops - " + this.loops);
 }
