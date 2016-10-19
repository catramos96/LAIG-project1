
function XMLscene() {
    CGFscene.call(this);
}

XMLscene.prototype = Object.create(CGFscene.prototype);
XMLscene.prototype.constructor = XMLscene;

XMLscene.prototype.init = function (application) {
    CGFscene.prototype.init.call(this, application);
	
	this.numCamera = 0; 
	
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

	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.light5 = true;
	this.light6 = true;
	this.light7 = true;

    var i = 0;
    for (var [id, value] of this.graph.lightsList) {
    	value.init(this,i);					//inicializacao das luzes

		this.lights[i].update();			//update

		this.interface.addLights('light'+i);//adiciona as luzes a interface
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
	for (var [id, value] of this.graph.perspectiveList){
		this.camera = new CGFcamera(value.angle, value.near, value.far, value.getFromVec(), value.getToVec());
		break;
	}
	this.interface.setActiveCamera(this.camera);
};

/**
 * Metodo usado pela interface para mudar de camara
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
 * Metodo usado pela interface para mudar de material
 */
XMLscene.prototype.updateMaterials = function () {
	
};

/**
 * Metodo usado pela interface para atualizar as luzes
 */
XMLscene.prototype.updateLights = function() {
	
	for (i = 0; i < this.graph.lightsList.size; i++){

		if(i == 0)
			b = this.light0;
		else if(i == 1)
			b = this.light1;
		else if(i == 2)
			b = this.light2;
		else if(i == 3)
			b = this.light3;
		else if( i == 4)
			b = this.light4;
		else if( i == 5)
			b = this.light5;
		else if( i == 6)
			b = this.light6;
		else if( i == 7)
			b = this.light7;

		if(b) this.lights[i].enable();
		else this.lights[i].disable();

		this.lights[i].update();
	}
}

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

// Handler called when the graph is finally loaded. 
// As loading is asynchronous, this may be called already after the application has started the run loop
XMLscene.prototype.onGraphLoaded = function () 
{  

	this.axis=new CGFaxis(this, this.graph.getGlobals().getAxisLength(),0.05);

	this.initLights();

	this.initCamera();

	this.initMaterials();

	this.initTextures();

	this.sphere = new MySphere(this,new MySphereData(1,1,3,3));

	//tableAppearance
	this.EarthAppearance = new CGFappearance(this);
	this.EarthAppearance.setAmbient(0.3,0.3,0.3,1);
	this.EarthAppearance.setDiffuse(0.8 ,0.8 ,0.8 ,1); //forte componente difusa
	this.EarthAppearance.setSpecular(0.2,0.2,0.2,1); // pouca componente especular
	this.EarthAppearance.setShininess(50);
	this.EarthAppearance.loadTexture("../resources/earth.jpg");
};

//DISPLAY COMPONENTS
XMLscene.prototype.displayComponents = function (component, materials, texture) {

	this.pushMatrix();

	//recebe a transformacao e multiplica na cena
	this.multMatrix(component.getTransformation().getMatrix()); //descobrir o que está mal aqui

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
    		break;
		}
   	}

	//recebe as texturas
	var lS = 1;
	var lT = 1;
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
				lS = value.getLengthS();
				lT = value.getLengthT();
				mat.setTexture(value.getAppearance());
			}
			break;
		}
	}
	mat.apply();

	//desenha as primitivas
	var primitives = component.getPrimitives();
	for (var [id, value] of primitives){

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
	
	}
};

XMLscene.prototype.setInterface = function(i) {
	this.interface = i;
}