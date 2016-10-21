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
 * Percorre a lista de luzes lidas no parser e inicializa-as com a cena e o id para a light[i] respetiva.
 * A inicializacao individual e feita em MyLight.
 * Tambem cria 8 booleanos (numero maximo de luzes) para suportar a interface on/off.
 */ 
XMLscene.prototype.initLights = function () {

	//booleanos para a interface
	this.light0 = true;
	this.light1 = true;
	this.light2 = true;
	this.light3 = true;
	this.light4 = true;
	this.light5 = true;
	this.light6 = true;
	this.light7 = true;
	
	//percorre as luzes, inicializa-as, atualiza-as e adiciona-as a interface
    for (var i = 0; i < this.graph.lightsList.length; i++) {
		
    	this.graph.lightsList[i].init(this,i);	//inicializacao das luzes

		this.lights[i].update();				//update

		this.interface.addLights('light'+i);	//adiciona as luzes a interface com o nome 'light'i 
    }
};

/**
 * Init materials.
 * Para cada material interpretado pelo parser MySceneGraph, e inicializada a aparencia do material.
 * A aparencia e inicializada pelo metodo init(scene) do objeto MyMaterial
 */
XMLscene.prototype.initMaterials = function () {

    for (var [id, value] of this.graph.materialsList) {
    	value.init(this);
    }  
};

/**
 * Init textures.
 * Para cada textura interpretada pelo parser MySceneGraph, e inicializada a aparencia respetiva.
 * A aparencia e inicializada pelo metodo init(scene) do objeto MyTexture
 */
XMLscene.prototype.initTextures = function () {
	
    for (var [id, value] of this.graph.texturesList) {
    	value.init(this);
    }
};

/**
 * Init textures.
 * Procura a camara default e inicializa-a.
 */
XMLscene.prototype.initCamera = function () {
	this.numCamera = 0; 	//informacao sobre a camara atual 
	
	//camara inicial
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
 * Metodo chamado a cada display da cena. Verifica o estado de cada booleano.
 * Se o booleno respetivo da light estiver a true, a luz e ligada, se nao e desligada.
 */
XMLscene.prototype.updateLights = function() {
	
	for (i = 0; i < this.graph.lightsList.length; i++){

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

/**
 * Update Materials.
 * Metodo invocado pela interface sempre que e pressionada a tecla m/M.
 * Para cada componente incrementa o seu material index, fazendo com que, na lista dos seus materiais, seja feito o display do seguinte.
 */
XMLscene.prototype.updateMaterials = function () {

	for(var [id,value] of this.graph.componentsList){
		value.incMaterialIndex();
	}
};

/**
 * Update Camera.
 * Metodo invocado pela interface sempre que pressionada a tecla v/V.
 * Incrementa o numCamera e procura na lista das perspetivas a que contem o numero respetivo.
 * De seguida atualiza a camara.
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
 * Coloca valores default na cena e atualiza a global ambient light e limpa a cor com os valores interpretads no parser.
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
XMLscene.prototype.onGraphLoaded = function () 
{  
	this.axis = new CGFaxis(this, this.graph.getGlobals().getAxisLength(),0.05);

	this.initLights();

	this.initCamera();

	this.initMaterials();

	this.initTextures();	
};

/**
 * Display Components.
 * Metodo que faz o display de cada componente. Recebe a componente que sera feito o display, bem como os materiais e texturas do antecessor.
 * Comeca por aplicar a transformada. De seguida interpreta os materiais e as texturas. Se forem do tipo 'inherit', recebem os materiais/textura do antecessor.
 * Aplica o material e a textura a cena, e cria as primitivas. 
 * Chama-se recursivamente com o componente seguinte da lista dos seus filhos.
 */
XMLscene.prototype.displayComponents = function (component, materials, texture) {

	this.pushMatrix();

	//recebe a transformacao e multiplica na cena
	this.multMatrix(component.getTransformation().getMatrix());
	
	//recebe os materiais, se 'inherit' recebe o do antecessor.
	var newMaterials = component.getMaterials();
	if(newMaterials[0].getId() == "inherit")
	{
		newMaterials = materials;
	}

	//appearance associada ao material
	var appearance = newMaterials[component.getMaterialIndex()].getAppearance();

	//recebe as texturas
	var newTexture = component.getTexture();
	
	// se 'inherit' recebe a textura do antecessor
	if(newTexture == "inherit")
	{
		newTexture = texture;
	}
	
	var lS = 1;
	var lT = 1;
	var textAppearance = null;
	//se nao for 'none' atualiza a aparencia
	if(newTexture != "none")
	{
		textAppearance = newTexture.getAppearance();	//aparencia da textura
		lS = newTexture.getLengthS();
		lT = newTexture.getLengthT();
	}
	
	//aplica o material e a textura a cena
	appearance.setTexture(textAppearance);
	appearance.apply();

	//desenha as primitivas de acordo com a data recebida
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

	//chama o proximo componente recursivamente
	var components = component.getComponentsChilds();
	for (var i = 0; i < components.length; i++)
	{
		this.displayComponents(components[i],newMaterials,newTexture);
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

		//leitura de componentes
		this.displayComponents(this.graph.getRoot(), null,null);
	}
};

/**
 * SETS
 */
XMLscene.prototype.setInterface = function(i) {
	this.interface = i;
}