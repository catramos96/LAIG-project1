/**
 * Data Struct of MyComponent
 */
  function MyComponent(id,defined) {
     this.id = id;
     this.defined = defined;    //To know if it has been processed in the parser
     this.materialIndex = 0;    //Index of the material in use
     this.materials = [];       //List of materials
	 this.components = [];      //Children components
 }

 /**
  * Each component can have more than one materials
  * This function changes the component material to the next one
  * by incrementing the materialIndex
  */
 MyComponent.prototype.incMaterialIndex = function(){
 	this.materialIndex++;
 	if(this.materials.length == this.materialIndex)
		this.materialIndex = 0;
 }

 /**
  * GETS
  */

 MyComponent.prototype.getCurrMaterial = function(){      //Material in use
 	return this.materials[this.materialIndex];
 }
 
 MyComponent.prototype.isDefined = function(){            //Has been processed
 	return this.defined;
 }

 MyComponent.prototype.getId = function(){                //Id
 	return this.id;
 }

 MyComponent.prototype.getTransformation = function(){    //Transformation matrix
 	return this.transformation;
 }

 MyComponent.prototype.getMaterials = function(){         //List of materials
 	return this.materials;
 }
 
 MyComponent.prototype.getTexture = function(){           //Texture
 	return this.texture;
 }

 MyComponent.prototype.getPrimitives = function(){        //Primitives
 	return this.primitives;
 }

 MyComponent.prototype.getComponentsChilds = function(){  //Components children
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

