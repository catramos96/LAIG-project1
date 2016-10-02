/*
 * Data Struct of Transformation
 */
function MyTransformation(scale,rotate,translate,x,y,z,angle,axis){
    //just one type of transformation
    if((scale == 1 && rotate == 0 && translate == 0) ||
        (scale = 0 && rotate == 1 && translate == 0) ||
        (scale = 0 && rotate == 0 && translate == 1)){

        this.scale = scale;
        this.rotate =rotate;
        this.translate = translate;
        this.coord = new Point(x,y,z);
        this.angle = angle;
        this.axis = axis;

        }
    else{
        return "wrong transformations information";
    }
}

/*
 * Print Info
 */
   
 MyTransformation.prototype.printInfo = function(){
 	if(this.scale == 1)
 	  console.log("Scale ; x - " + this.x + " ; y - " + this.y + " ; this.z - " + this.z);
    if(this.translate == 1)
 	  console.log("Translate ; x - " + this.x + " ; y - " + this.y + " ; this.z - " + this.z);
 	if(this.rotate == 1)
 	  console.log("Rotate ; axis - " + this.axis + " ; angle - " + this.angle);
 }

 /*
  * GETS
  */
  MyTransformation.prototype.getTransformationType = function(){
 	if(this.scale == 1)
 	  return "scale";
    if(this.translate == 1)
 	  return "translate";
 	if(this.rotate == 1)
 	  return "rotate";
 }

 MyTransformation.prototype.getCoord = function(){
 	return this.coord;
 }

 MyTransformation.prototype.getAxis = function(){
 	return this.axis;
 }

 MyTransformation.prototype.getAngle = function(){
 	return this.angle;
 }