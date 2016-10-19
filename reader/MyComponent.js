/*
 * Data Struct of MyComponent
 */
  function MyComponent(id,defined) {
     this.id = id;
     this.defined = defined;
     this.materialIndex = 0;
     this.materials = null;
 }

 MyComponent.prototype.incMaterialIndex = function(){
 	this.materialIndex++;
 	if(this.materials.size == this.materialIndex)
 	  this.materialIndex = 0;
 }

 MyComponent.prototype.getCurrMaterialID = function(){
   var i = 0;
   for(var key of this.materials.keys()){
     if (i == this.materialIndex) return key;
     i++;
   }
 }

 MyComponent.prototype.isDefined = function(){
 	return this.defined;
 }

 MyComponent.prototype.getId = function(){
 	return this.id;
 }

 MyComponent.prototype.getTransformation = function(){
 	return this.transformation;
 }

 MyComponent.prototype.getMaterials = function(){
 	return this.materials;
 }
 
 MyComponent.prototype.getTexture = function(){
 	return this.texture;
 }

 MyComponent.prototype.getPrimitives = function(){
 	return this.primitives;
 }

 MyComponent.prototype.getComponentsChilds = function(){
 	return this.components;
 }

MyComponent.prototype.setTransformation = function(m){
 	this.transformation = m;
 }

 MyComponent.prototype.setMaterials = function(mt){
 	this.materials =  mt;
 }

 MyComponent.prototype.setTexture = function(t){
 	this.texture = t;
 }

 MyComponent.prototype.setComponents = function(c){
 	this.components = c;
 }

 MyComponent.prototype.setPrimitives = function(p){
 	this.primitives = p;
 }

 MyComponent.prototype.display = function(){
    console.log("START");
 	console.log("Component id: " + this.id);
 	console.log("Matrix: " + this.transformation.getId());
 	console.log("Texture id: " + this.texture.getId());
 	for(var [key, value] of this.materials){
 	  console.log("Materials id: " + key);
 	}
 	for(var [key, value] of this.components){
 	  console.log("Components id: " + key);
 	}
 	for(var [key, value] of this.primitives){
 	  console.log("Primitives id: " + key);
 	}
 	console.log("END");
 }

