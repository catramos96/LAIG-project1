
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);
    
    this.initCameras();

    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
	this.gl.enable(this.gl.CULL_FACE); //cull face    = back, enable
    this.gl.depthFunc(this.gl.LEQUAL); //depth func  = LEQUAL, enable
   
    //front face   = CCW
    //lighting     = enable
    //shading      = Gouraud
    //polygon mode = fill
};

XMLscene.prototype.initLights = function () {
	/*this.lights[0].setPosition(2, 3, 3, 1);
    this.lights[0].setDiffuse(1.0,1.0,1.0,1.0);
    this.lights[0].update();*/

    var i = 0;
    for (var [id, value] of this.graph.lightsList) {
    	value.init(this,i);
		this.lights[i].update();
		i++;
    }
    
};

XMLscene.prototype.initCameras = function () {
	//camara inicial
	this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.updateCameras = function () {
	//camara inicial
	var i = 0;
	this.cameras = [];
	for (var [id, value] of this.graph.perspectiveList) {
    	this.cameras[i] = value.init();
		i++;
    }
	this.camera = this.cameras[0];

	//this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
};

XMLscene.prototype.setDefaultAppearance = function () {
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
/*
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);	*/
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
	//this.updateCameras();

    this.initLights();

	this.axis=new CGFaxis(this, this.graph.getGlobals().getAxisLength(),0.05);

    //doubleside e local ???
    console.log("aaaa");
};

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

	};	
};

