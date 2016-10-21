/**
 * MyCylinder Object
  * Recieves the attributes from MyCylinderData (data)
 */
 function MyCylinder(scene,data) {
     CGFobject.call(this,scene);

     this.base = data.getBase();			//the radius
     this.top = data.getTop();				//the radius
     this.height = data.getHeight();
     this.slices = data.getSlices();
     this.stacks = data.getStacks();

    this.initBuffers();
 }

 MyCylinder.prototype = Object.create(CGFobject.prototype);

 /**
  * Initializes the object where top is on z = height/2 and the base in z = -height/2 
  */
 MyCylinder.prototype.initBuffers = function() {

	//Incrementation 
 	var incAng = 2*Math.PI/this.slices;
 	var incHeight = this.height / this.stacks;
 	var incRadius = (this.top - this.base) / this.stacks;	

	//Properties
 	this.vertices = [];
 	this.indices = [];
 	this.normals = [];
 	this.texCoords = [];


	//DRAW SIDES
 	for(var i = 0; i < this.stacks+1;i++)
 	{        
 	  for(var j = 0; j < this.slices+1;j++){ 	//+1 for the texture mapping

 	    this.vertices.push((this.base + incRadius*i)*Math.cos(incAng*j),
 	                      (this.base + incRadius*i)*Math.sin(incAng*j),
 	                      incHeight*i);

 	    this.texCoords.push(j/this.slices,i/this.stacks);
 	    	
 	    //Calculate Normals
 	    var v1 = [-Math.sin(incAng*j),Math.cos(incAng*j),0]; //tangent vector
        var v2 = [(this.base-this.top)*Math.cos(incAng*j), (this.base-this.top)*Math.sin(incAng*j), this.height]; //surface vector
		
		//Cross Product between tangent and surface vectors
        var norm = [v1[1]*v2[2] - v1[2]*v2[1], v1[2]*v2[0] - v1[0]*v2[2], v1[0]*v2[1] - v1[1]*v2[0]];
	 
 	    this.normals.push(norm[0],norm[1],norm[2]);
		
		if(j != this.slices && i != this.stacks)
 	    {       
 	        this.indices.push( i*(this.slices+1)+j+1,		//next vertice to process
 	                          (i+1)*(this.slices+1)+j,		//vertice of the stack above
                              i*(this.slices+1)+j);			//vertice processed

            this.indices.push(i*(this.slices+1)+j+1,		//next vertice to process
                              (i+1)*(this.slices+1)+j+1,	//next vertice of the stack above
                              (i+1)*(this.slices+1)+j);		//vertice of the stack above
 	    }
 	  }
 	}
	
	//next vertice index
    var index = (this.slices+1)*(this.stacks+1);
    
    //DRAW TOP
	
	//center
    this.vertices.push(0, 0, this.height);
    this.texCoords.push(0.5,0.5);
    this.normals.push(0, 0, 1);

    for (var i = 0; i < this.slices+1; i++) 
    {
        this.texCoords.push(0.5+Math.cos(incAng*i)/2,0.5-Math.sin(incAng*i)/2);
        this.vertices.push(Math.cos(incAng * i)*this.top, Math.sin(incAng * i)*this.top, this.height);
        this.normals.push(0, 0, 1);
        
        if (i > 0) {
          this.indices.push(index+i, index+i+1, index);     
        }
    } 
	
	//next vertice index
    index += this.slices+2;

    //DRAW BASE
	
	//center
    this.vertices.push(0, 0, 0);
    this.texCoords.push(0.5,0.5);
    this.normals.push(0, 0, -1);

    for (var i = 0; i < this.slices+1; i++) 
    {
        this.texCoords.push(0.5+Math.cos(incAng*i)/2,0.5-Math.sin(incAng*i)/2);
        this.vertices.push(Math.cos(incAng * i)*this.base, Math.sin(incAng * i)*this.base, 0);
        this.normals.push(0, 0, -1);
        
        if (i > 0) {
          this.indices.push(index, index+i+1, index+i);     
        }
    } 

 	this.primitiveType = this.scene.gl.TRIANGLES;
 	this.initGLBuffers();
 };