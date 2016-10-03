/*
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

 MyGlobals.prototype.setRoot = function(newRoot){
 	this.root = newRoot;
 }

 MyGlobals.prototype.setAxisLength = function(axisLength){
   if(!isNaN(parseFloat(axisLength)) && isFinite(axisLength))
   {
     this.axis_length = axisLength;
     return;
   }
   return "axis_length isn't a number!";
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