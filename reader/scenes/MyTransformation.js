/*
 * Data Struct of Transformation
 * type: "scale" ; "translate" ; "rotate"
 */
function MyTransformation(type){ 
  if(type != "translate" && type != "scale" && type != "rotate")
    return "Wrong transformation info";

  this.type = type;
  this.coord = new MyPoint(0,0,0);   //default
  this.axis = 'x';                  //may not be used
  this.angle = 0;                   //the same
}

/*
 * PRINT
 */
MyTransformation.prototype.printInfo = function(){
    switch(this.type){
        case "translate":
        {
            console.log("translate");
            this.coord.printInfo();
            break;
        }
        case "scale":
        {
            console.log("scale");
            this.coord.printInfo();
            break;
        }
        case "rotate":
        {
            console.log("rotate");
            console.log("axix - " + this.axis + " ; angle - " + this.angle);
            break;
        }
    }
}

/*
 * GETS
 */
MyTransformation.prototype.getType = function(){
    return this.type;
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


/*
 * SETS
 */

MyTransformation.prototype.setCoord = function(newCoord){
    this.coord.equals(newCoord);
}

MyTransformation.prototype.setAxis = function(a){
    this.axis = a;
}

MyTransformation.prototype.setAngle = function(ang){
    this.angle = ang;
}

 