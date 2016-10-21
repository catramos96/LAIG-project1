/**
 * Data Struct with my global elements.
 */
function MyGlobals() {
 	this.root = "";
 	this.axis_length = 1;
 	this.doublesided = false;
 	this.local = false;
 	this.colorAmbient = new MyColor(0,0,0,0);
 	this.colorBackground = new MyColor(0,0,0,0);
}

/**
 * GETS
 */
 MyGlobals.prototype.getAxisLength = function(){
 	return this.axis_length;
 }

 MyGlobals.prototype.getBackground = function(){
 	return this.colorBackground;
 }

 MyGlobals.prototype.getAmbient = function(){
 	return this.colorAmbient;
 }
 
 /**
  * SETS
  */
 MyGlobals.prototype.setRoot = function(newRoot){
 	this.root = newRoot;
 }

 MyGlobals.prototype.setAxisLength = function(axisLength){
	if(axisLength < 0) return "axis_length isn't positive!";
	this.axis_length = axisLength;
    return;
 }

 MyGlobals.prototype.setDoublesided = function(b){
    if(b == 1) this.doublesided = true; 
    else this.doublesided = false;
 }

 MyGlobals.prototype.setLocal = function(b){
 	if(b == 1) this.local = true; 
    else this.local = false;
 }

 MyGlobals.prototype.setAmbient = function(color){
 	this.colorAmbient = color;
 }

 MyGlobals.prototype.setBackground = function(color){
 	this.colorBackground = color;
 }