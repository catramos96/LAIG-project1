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
 	var incRadius = (this.top - this.base) / this.stacks; //acho que não se divide por 2

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

 	    this.texCoords.push(j/this.slices,i/this.stacks); // nao percebo
 	    	
 	    //calculo das normais : produto vetorial do vetor tangente com o vetor da superficie
 	    var v1 = [-Math.sin(incAng*j),Math.cos(incAng*j),0]; //tangente
        var v2 = [(this.base-this.top)*Math.cos(incAng*j), (this.base-this.top)*Math.sin(incAng*j), this.height]; //vetor da superficie

        var norm = [v1[1]*v2[2] - v1[2]*v2[1], v1[2]*v2[0] - v1[0]*v2[2], v1[0]*v2[1] - v1[1]*v2[0]];
	 
 	    this.normals.push(norm[0],norm[1],norm[2]);

 	    if(j != this.slices && i != this.stacks)
 	    {       
 	        /*this.indices.push( i*(this.slices+1)+j+1,
 	                          (i+1)*(this.slices+1)+j,
                              i*(this.slices+1)+j); //0,4,1 (stacks = 1,slices 3)

            this.indices.push(i*(this.slices+1)+j+1,
                              (i+1)*(this.slices+1)+j+1,
                              (i+1)*(this.slices+1)+j); //4,5,1*/
 	    }
 	  }
 	}

    var index = (this.slices+1)*(this.stacks);
    
    //desenho da topo
    this.vertices.push(0, 0, this.height/2);
    this.texCoords.push(0.5,0.5);
    this.normals.push(0, 0, 1);

    for (var i = 0; i < this.slices+1; i++) 
    {
        this.texCoords.push(0.5+Math.cos(incAng*i)/2,0.5-Math.sin(incAng*i)/2);
        this.vertices.push(Math.cos(incAng * i)*this.top, Math.sin(incAng * i)*this.top, this.height/2);
       

         this.normals.push(0, 0, 1);
        
        if (i > 0) {
          this.indices.push(index+1, index+i+1, index);     
        }
    } 
    
    index += this.slices+3;

    //desenho da base
   /* this.vertices.push(0, 0, -this.height/2);
    this.texCoords.push(0.5,0.5);
    this.normals.push(0, 0, -1);

    for (var i = 0; i < this.slices+1; i++) 
    {
        this.texCoords.push(0.5+Math.cos(incAng*i)/2,0.5-Math.sin(incAng*i)/2);
        this.vertices.push(Math.cos(incAng * i)*this.base, Math.sin(incAng * i)*this.base, -this.height/2);
        this.normals.push(0, 0, -1);
        
        if (i > 0) {
          this.indices.push(index, index+i+1, index+1);     
        }
    }*/ 



 	/*this.newCircle(this.height/2,1,(this.slices+1)*(this.stacks),this.top);
 	this.newCircle(-this.height/2,-1,(this.slices+1)*(this.stacks)+(this.slices+2),this.base);
 	*/
 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };

MyCylinder.prototype.newCircle = function(z, z_normal,index,r) {

    var ang = Math.PI * 2 / this.slices;
    
    //centro
    this.vertices.push(0, 0, z);
    this.texCoords.push(0.5,0.5);
    this.normals.push(0, 0, z_normal);

    for (var i = 0; i < this.slices; i++) 
    {
        this.texCoords.push(0.5+Math.cos(ang*i)/2,0.5-Math.sin(ang*i)/2);
        this.vertices.push(Math.cos(ang * i)*r, Math.sin(ang * i)*r, z);
        this.normals.push(0, 0, z_normal);
        
        if (i > 0) {
          this.indices.push(index+1, index+i+1, index);
            
        }
    }    
}