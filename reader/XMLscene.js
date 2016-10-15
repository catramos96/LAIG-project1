
function XMLscene() {
    CGFscene.call(this);
    
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);
	
	this.numCamera = 0;  //se calhar não vai ser aqui -> interface?
	
	this.initCamera(); 

    this.enableTextures(true);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);

    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE); 	//cull face    = back, enable
    this.gl.depthFunc(this.gl.LEQUAL); 	//depth func  = LEQUAL, enable
    this.gl.frontFace(this.gl.CCW); 	//front face   = CCW

   	//lighting     = enable
    //shading      = Gouraud
    //polygon mode = fill


};

//INIT LIGHTS
XMLscene.prototype.initLights = function () {

    var i = 0;
    for (var [id, value] of this.graph.lightsList) {
    	value.init(this,i);
		this.lights[i].update();
		i++;
    }
    
};

//INIT MATERIALS
XMLscene.prototype.initMaterials = function () {
	
	this.initializedMaterials = [];

    for (var [id, value] of this.graph.materialsList) {
    	if(id != "inherit")
    		value.init(this); 
    	this.initializedMaterials.push(value);
    }
    
};

//INIT TEXTURES
XMLscene.prototype.initTextures = function () {
	
	this.initializedTextures = [];

    for (var [id, value] of this.graph.texturesList) {
    	if(id != "inherit" || id != "none")
    		value.init(this);
    	this.initializedTextures.push(value);
    }
};

//INIT CAMERA
XMLscene.prototype.initCamera = function () {
	//camara inicial
	/*for (var [id, value] of this.graph.perspectiveList){
		this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
		break;
	}*/
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
	//this.camera = new CGFcamera(value.angle, value.near, value.far, value.getToVec(), value.getFromVec());
	//this.interface.setActiveCamera(this.camera);
};

/**
 * Metodo usado pela interface para mudar de camara
 */
XMLscene.prototype.updateCamera = function () {
	
	this.numCamera++;
	if(this.numCamera == this.graph.perspectiveList.length)
		this.numCamera = 0;
	
	var i = 0;
	for (var [id, value] of this.graph.perspectiveList) {
		if(i == numCamera){
			this.camera = value.init();
			break;
		}	
		i++;
    }
	this.camera = this.cameras[numCamera].init();
};

XMLscene.prototype.setDefaultAppearance = function () {
	this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);

	//ambient
	this.setGlobalAmbientLight(this.graph.getGlobals().getAmbient().getR(),
					this.graph.getGlobals().getAmbient().getG(),
					this.graph.getGlobals().getAmbient().getB(),
					this.graph.getGlobals().getAmbient().getA());
	//background
	this.gl.clearColor(this.graph.getGlobals().getBackground().getR(),
						this.graph.getGlobals().getBackground().getG(),
						this.graph.getGlobals().getBackground().getB(),
						this.graph.getGlobals().getBackground().getA());
};

XMLscene.prototype.updateLights = function () {

/*	this.lights[0].setVisible(true);
    this.lights[0].enable();
    this.lights[0].update();*/
    
	var i = 0;
	for (var [id, value] of this.graph.lightsList) {
		this.lights[i].setVisible(true);
		if(value.getEnable())
			this.lights[i].enable();
		this.lights[i].update();
		i++;
	}
   
};

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{  

	this.axis=new CGFaxis(this, this.graph.getGlobals().getAxisLength(),0.05);

	this.initLights();

	//this.initCamera();

	this.initMaterials();

	this.initTextures();

	//TEMPORARIO
	this.torus = new MyTorus(this,1,3,2,50,50);
};

//DISPLAY COMPONENTS
XMLscene.prototype.displayComponents = function (component, materials, texture) {

	this.pushMatrix();

	//recebe a transformacao e multiplica na cena
	//this.multMatrix(component.getTransformation()); //descobrir o que está mal aqui

	//recebe os materiais
	var newMaterials = component.getMaterials();
	if(newMaterials.has("inherit")){
		newMaterials = materials;
	}

	//id do primeiro elemento (isto é para ser mudado quando existir a interface)
    var temp = null;
	for(var [id,value] of newMaterials){
		temp = id;
		break;
	}
	//procura nos materiais esse id e aplica o material a cena
	var mat = null;
	for (var [id, value] of this.graph.materialsList) {
		if(id == temp){
    		mat = value.getAppearance();
    		mat.apply();
    		break;
		}
   	}

	//recebe as texturas
	var newTexture = component.getTexture();
	if(newTexture.getId() == "inherit"){
		newTexture = texture;
	}
	
	//procura a textura na lsita de texturas
	for (var [id, value] of this.graph.texturesList) 
	{
		if(id == newTexture.getId()) //encontra a textura
		{ 
			if(newTexture.getId() != "none")	//se a textura não for nula
			{
				mat.setTexture(value.getAppearance());
			}
		}
	}

	//desenha as primitivas
	var primitives = component.getPrimitives();
	for (var [id, value] of primitives){

		if(value instanceof MyRectangleData){
			var prim = new MyRectangle(this, value);
			//prim.display();
		}	
		if(value instanceof MyTriangleData){
			var prim = new MyTriangle(this, value);
			//prim.display();
		}	
		if(value instanceof MyCylinderData){
			var prim = new MyCylinder(this, value);
			//prim.display();
		}
		if(value instanceof MySphereData){
			var prim = new MySphere(this, value);
			//prim.display();
		}
		/*if(value instanceof MyTorusData){
			var prim = new MyTorus(this, value);
			//prim.display();
		}*/
	}

	//chama o proximo componente recursivamente
	var components = component.getComponentsChilds();
	for (var [id, value] of components){
		this.displayComponents(value,newMaterials,newTexture);
	}

	this.popMatrix();
	return null;
}

XMLscene.prototype.display = function () {

	// ---- BEGIN Background, camera and axis setup

	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	// ---- END Background, camera and axis setup

	// it is important that things depending on the proper loading of the graph
	// only get executed after the graph has loaded correctly.
	// This is one possible way to do it
	if (this.graph.loadedOk)
	{
		// Initialize Model-View matrix as identity (no transformation
		this.updateProjectionMatrix();
    	this.loadIdentity();

		// Apply transformations corresponding to the camera position relative to the origin
		this.applyViewMatrix();

		// Draw axis
		this.axis.display();

		//appearance
		this.setDefaultAppearance();

		//update lights
		this.updateLights();

		this.displayComponents(this.graph.getRoot(), null,null);
			
	// triangle
		/*this.pushMatrix();
			for (var [id, value] of this.graph.materialsList) {
    			var a = value.getAppearance();
    			a.apply();
    			break;
   			}
			this.triangle.display();
		this.popMatrix();*/

	// rectangle
		/*this.pushMatrix();
			//this.flowerAppearance.apply();
			this.rect.display();
		this.popMatrix();*/

	// cylinder
		/*this.pushMatrix();
			//this.flowerAppearance.apply();
			this.cylinder.display();
		this.popMatrix();*/

	// sphere
		/*this.pushMatrix();
			this.flowerAppearance.apply();
			this.sphere.display();
		this.popMatrix();*/

	// torus
		this.pushMatrix();
			//this.flowerAppearance.apply();
			this.torus.display();
		this.popMatrix();
	
	}
};

