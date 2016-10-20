/**
 * Data Struct of primitive
 * Super classe
 */
function MyPrimitive(id) {
    this.id = id;
}

/**
 * GETS
 */
 MyPrimitive.prototype.getId = function(){
    return this.id;
 }
 
 /**
  * SETS
  */
 MyPrimitive.prototype.setId = function(id){
    this.id = id;
 }