/**
 * XMLscene
 * Handles the scene.
 */
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

/**
 * Init scene with default values
 */
XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);

    this.enableTextures(true);

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clearDepth(100.0);

    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE); 	//cull face    = back, enable
    this.gl.depthFunc(this.gl.LEQUAL); 	//depth func  = LEQUAL, enable
    this.gl.frontFace(this.gl.CCW); 	//front face   = CCW
	
};

/**
 * Init Lights.
 * For each light processed by the parser it initializes them  with the scene and the id for light[i]
 * The individual initialization is done on the MyLight
 * It also creates 8 booleans (max number of lights) that the interface on/off supports
 */ 
XMLscene.prototype.initLights = function () {

    for (var i = 0; i < this.graph.lightsList.length; i++) 
	{
    	this.graph.lightsList[i].init(this,i);	//individual initialization

		this.lights[i].update();				//update
    }
};

/**
 * Init materials.
 * For each material processed by the parser calls the init function of MyMaterial
 */
XMLscene.prototype.initMaterials = function () {

    for (var [id, value] of this.graph.materialsList) {
    	value.init(this);
    }  
};

/**
 * Init textures.
 * For each texture processed by the parser it calls the function init from MyTexture
 */
XMLscene.prototype.initTextures = function () {
	
    for (var [id, value] of this.graph.texturesList) {
    	value.init(this);
    }
};

/**
 * Init textures.
 * Search for the default camera ant initializes it
 */
XMLscene.prototype.initCamera = function () {
	this.numCamera = 0; 	//actual camera
	
	//For each perspective...
	for (var [id, value] of this.graph.perspectiveList){
		if(value.isDefault()){
			this.camera = new CGFcamera(value.angle, value.near, value.far, value.getFromVec(), value.getToVec());
			break;
		}
		this.numCamera++;
	}
	
	this.interface.setActiveCamera(this.camera);
};

/**
 * Update Lights.
 * Method called every scene display.
 * Checks the status of every boolean. If its set to true then the light is switch on or otherwise.
 */
XMLscene.prototype.updateLights = function() {
	
	for (i = 0; i < this.graph.lightsList.length; i++){
		
		eval("var on = this."+this.graph.lightsList[i].getId());

		if(on) this.lights[i].enable();
		else this.lights[i].disable();

		this.lights[i].update();
	}
}

/**
 * Update Materials.
 * Method called by the interface each time the keys m/M are pressed.
 * For each component, the material index is incremented.
 */
XMLscene.prototype.updateMaterials = function () {

	for(var [id,value] of this.graph.componentsList){
		value.incMaterialIndex();
	}
};

/**
 * Update Camera.
 * Method called by the interface each time the keys v/V are pressed.
 * Each time the numCamera is incrementes and searches in the perspectiveList the one with the numCamera number.
 */
XMLscene.prototype.updateCamera = function () {
	
	this.numCamera++;
	if(this.numCamera == this.graph.perspectiveList.size)
		this.numCamera = 0;

	var i = 0;
	for (var [id, value] of this.graph.perspectiveList) {
		if(i == this.numCamera){
			this.camera = new CGFcamera(value.angle, value.near, value.far, value.getFromVec(), value.getToVec());
			break;
		}	
		i++;
    }
    this.interface.setActiveCamera(this.camera);
};

/**
 * Default appearance.
 * Puts the default values in the scene and updates the global ambient light.
 * Also updates the color values interpreted by the parser.
 */
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

/**
 * Handler called when the graph is finally loaded. 
 * As loading is asynchronous, this may be called already after the application has started the run loop.
 * Faz as inicializacoes que requerem informacoes da leitura do parser.
 */
XMLscene.prototype.onGraphLoaded = function () {  
	this.axis = new CGFaxis(this, this.graph.getGlobals().getAxisLength(),0.05);

	this.initLights();

	this.initCamera();

	this.initMaterials();

	this.initTextures();	
};

/**
 * Display Components.
 * Method that displays a certain component.
 * Recieves the components to be displayed and the materials and texture of its ancestor.
 * Starts by applying the transformation matrix. 
 * Then interprets the materials and texture. It they are "inherit" then the component recieves them form the ancestor.
 * The correct texture and material is applyed.
 * The primitives are created.
 * It calls recursivelly (the following component of its child components)
 */
XMLscene.prototype.displayComponents = function (component, materials, texture) {

	this.pushMatrix();

	//Transformation matrix
	this.multMatrix(component.getTransformation().getMatrix());
	
	//Materials
	//var currMaterial = component.getCurrMaterial();
	if(component.getCurrMaterial() == "inherit")
	{
		component.setMaterials(materials);
	}

	//appearance associated to the material
	var appearance = component.getCurrMaterial().getAppearance();

	//texture
	var newTexture = component.getTexture();
	
	if(newTexture == "inherit")
	{
		newTexture = texture;
	}
	
	var lS = 1;
	var lT = 1;

	var textAppearance = null;
	
	//if not 'none' updates the appearance
	if(newTexture != "none")
	{
		textAppearance = newTexture.getAppearance();	//textAppearance
		lS = newTexture.getLengthS();
		lT = newTexture.getLengthT();
	}
	
	//Application of the material and texture
	appearance.setTexture(textAppearance);
	appearance.apply();

	//Draws the primitives
	var primitives = component.getPrimitives();
	for (var i = 0; i < primitives.length; i++)
	{
		var value = primitives[i];
		
		if(value instanceof MyRectangleData){
			var prim = new MyRectangle(this, value,lS,lT);
			prim.display();
		}	
		else if(value instanceof MyTriangleData){
			var prim = new MyTriangle(this, value,lS,lT);
			prim.display();
		}	
		else if(value instanceof MyCylinderData){
			var prim = new MyCylinder(this, value);
			prim.display();
		}
		else if(value instanceof MySphereData){
			var prim = new MySphere(this, value);
			prim.display();
		}
		else if(value instanceof MyTorusData){
			var prim = new MyTorus(this, value);
			prim.display();
		}
	}

	//next child component
	var components = component.getComponentsChilds();
	for (var i = 0; i < components.length; i++)
	{
		this.displayComponents(components[i],component.getMaterials(),newTexture);
	}

	this.popMatrix();
	return null;
}

/**
 * Display of scene.
 */
XMLscene.prototype.display = function () {

	// Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

	//it's important that things depending on the proper loading of the graph only get executed after the graph has loaded correctly
	if (this.graph.loadedOk)
	{
		// Initialize Model-View matrix as identity
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

		//Processes the components
		this.displayComponents(this.graph.getRoot(), null,null);
	}
};

/**
 * SETS
 */
XMLscene.prototype.setInterface = function(i) {
	this.interface = i;
}