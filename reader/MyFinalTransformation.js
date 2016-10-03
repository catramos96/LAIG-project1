/*
 * Data Struct of Transformation
 */
function MyFinalTransformation(id){
  this.id = id;
  transformationList = [];
}

/*
 * GETS
 */

MyFinalTransformation.prototype.getTransformations = function(){
  return transformationList;
}

/*
 * ADS
 */

MyFinalTransformation.prototype.addTranslation = function(x,y,z){
  var t = new MyTransformation("translate");
  t.setCoord(new MyPoint(x,y,z));
  transformationList[transformationList.length] = t;
}

MyFinalTransformation.prototype.addScaling = function(x,y,z){
  var t = new MyTransformation("scale");
  t.setCoord(new MyPoint(x,y,z));
  transformationList[transformationList.length] = t;
}

MyFinalTransformation.prototype.addRotation = function(axis,angle){
  var t = new MyTransformation("rotate");
  t.setAxis(axis);
  t.setAngle(angle);
  transformationList[transformationList.length] = t;
}
/*
 * Print Info
 */
   
 MyFinalTransformation.prototype.printInfo = function(){
 	console.log("Transformation id - " + this.id);
 	for(var i = 0; i < transformationList.length ; i++){
 	  transformationList[i].printInfo();
 	}
 }

 