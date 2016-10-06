/*
 * Data Struct of MyComponent
 */
  function MyComponent(id) {
     this.id = id;
     //properties
     this.matrixId = "";             
     this.materialsId = [];
     this.textureId = "";
        
     //children
     this.componentsId = [];
     this.primitivesId = [];
 }

MyComponent.prototype.getId = function(){
 	return this.id;
 }

 MyComponent.prototype.getComponentsChilds = function(){
 	return this.componentsId;
 }

MyComponent.prototype.setMatrix = function(m){
 	this.matrixId = m;
 }

 MyComponent.prototype.setMaterialsId = function(mt){
 	this.materialsId = mt;
 }

 MyComponent.prototype.setTextureId = function(t){
 	this.textureId = t;
 }

 MyComponent.prototype.setComponentsId = function(c){
 	this.componentsId = c;
 }

 MyComponent.prototype.setPrimitivesId = function(p){
 	this.primitivesId = p;
 }

 MyComponent.prototype.display = function(){
    console.log("START");
 	console.log("Component id: " + this.id);
 	console.log("Matrix: " + this.matrixId);
 	console.log("Texture id: " + this.textureId);
 	console.log("Materials id: " + this.materialsId);
 	console.log("Components id: " + this.componentsId);
 	console.log("Primitives id: " + this.primitivesId);
 	console.log("END");
 }

