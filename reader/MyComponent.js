/**
 * Data Struct of MyComponent
 */
  function MyComponent(id,defined) {
     this.id = id;
     this.defined = defined;
     this.materialIndex = 0;
     this.materials = [];
 }

 /**
  * Cada componente é caracterizada por um ou mais materiais. 
  * O 'materialIndex' indica a posição do material na lista dos materiais.
  * incMaterialIndex serve para mudar o material aumentando o materialIndex. 
  * Quando chega ao maximo retorna a zero.
  */
 MyComponent.prototype.incMaterialIndex = function(){
 	this.materialIndex++;
 	if(this.materials.length == this.materialIndex)
 	  this.materialIndex = 0;
 }

 /**
  * GETS
  */
 MyComponent.prototype.getMaterialIndex = function(){
 	return this.materialIndex;
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

 /**
  * SETS
  */
  
 MyComponent.prototype.setDefined = function(b){
 	this.defined = b;
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

 /*
  * DISPLAY
  */
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

