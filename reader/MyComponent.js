/*
 * Data Struct of MyComponent
 */
  function MyComponent(id,defined) {
     this.id = id;
     this.defined = defined;
 }

 MyComponent.prototype.isDefined = function(){
 	return this.defined;
 }

 MyComponent.prototype.getId = function(){
 	return this.id;
 }

 MyComponent.prototype.getComponentsChilds = function(){
 	return this.components;
 }

MyComponent.prototype.setTransformation = function(m){
 	this.transformation = m;
 }

 MyComponent.prototype.setMaterials = function(mt){
 	this.materials = mt;
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

