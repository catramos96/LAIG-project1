/*
 * MyCylinder
 */
 function MyCylinder(scene,data) {
     CGFobject.call(this,scene);

     this.base = data.getBase();
     this.top = data.getTop();
     this.height = data.getHeight();
     this.slices = data.getSlices();
     this.stacks = data.getStacks();

    this.initBuffers();
 }

 MyCylinder.prototype = Object.create(CGFobject.prototype);

 MyCylinder.prototype.initBuffers = function() {

 	var incAng = 2*Math.PI/this.slices;
 	var incHeight = this.height / this.stacks;
 	var incRadius = (this.top/2 - this.base/2) / this.stacks;

 	this.vertices = [];

 	this.indices = [];

 	this.normals = [];

 	this.texCoords = [];

 	for(var i = 0; i < this.stacks+1;i++)
 	{        
 	  for(var j = 0; j < this.slices+1;j++){ //mais um vetice no final para fazer o mapeamento da textura

 	    this.vertices.push((this.base + incRadius*i)*Math.cos(incAng*j),
 	                      (this.base + incRadius*i)*Math.sin(incAng*j),
 	                      -this.height/2 + incHeight*i);

 	   // this.texCoords.push(1-1/this.stacks*i,1-1/this.slices*j);
 	    this.texCoords.push(j/(this.slices), 1 -i/this.stacks);

 	    this.normals.push(Math.cos(incAng*j),
 	                      0,                        //alterar
 	                      Math.sin(incAng*j))

 	    if(j > 0 && i > 0)
 	    {
          
          this.indices.push(i*(this.slices+1)+j,
                            i*(this.slices+1)+(j-1),
                            (i-1)*(this.slices+1)+(j-1)); //0,4,1 (stacks = 1,slices 3)

         this.indices.push((i)*(this.slices+1)+j,
                            (i-1)*(this.slices+1)+(j-1),
                            (i-1)*(this.slices+1)+j); //4,5,1*/
 	    }
 	  }
 	}

 	//this.newCircle(this.height,1);
 	//this.newCircle(,-1);
 	
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };
/*
MyCylinder.prototype.newCircle = function(z, z_normal) {

    var ang = Math.PI * 2 / this.slices;
    
    //centro
    this.vertices.push(0, 0, z);
    this.texCoords.push(0.5,0.5);
    this.normals.push(0, 0, z_normal);

    for (var i = 0; i < this.slices; i++) {
        this.texCoords.push(0.5+Math.cos(ang*i)/2,0.5-Math.sin(ang*i)/2);
        this.vertices.push(Math.cos(ang * i), Math.sin(ang * i), z);
        this.normals.push(0, 0, z_normal);
        
        if (i % 2 != 0) {// a cada 2 vertices  
            this.indices.push(0, i, i + 1);
        } 
        if(i% 2 == 0){
             this.indices.push(0, i, i + 1);
        }
        if (i == this.slices - 1) {
          this.indices.push(0, i+1, 1);
            //último triangulo
        }
    }    
}*/