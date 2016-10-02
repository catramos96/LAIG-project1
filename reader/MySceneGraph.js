/*
 * Scene Graph
 *
 * Pensar numa maneira de por a perspetiva default
 */
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	//parameters
	this.globals = new MyGlobals(this.scene);	//variaveis globais do grafo
	this.perspectiveList = [];  				//lista com as diversas perspetivas
	this.texturesList = [];						//lista com as diversas texturas
	this.materialsList = [];					//lista com os diversos materiais

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
};

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement; //neste caso, dsx
	
	// Here should go the calls for different functions to parse the various blocks
	
	this.readSceneGraphFile(rootElement);		

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};


MySceneGraph.prototype.readSceneGraphFile = function(rootElement) {
	var error;
	//Parse Globals
	if ((error = this.parseGlobals(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
	//Parse Views
	if ((error = this.parseViews(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
	//Parse Illumination
	if ((error = this.parseIllumination(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
	//Parse Textures
	if ((error = this.parseTextures(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
	//Parse Materials
	if ((error = this.parseMaterials(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
};

/*
 * Method that parses elements of one block (Scene) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseGlobals = function(rootElement) {

	var scene_elems =  rootElement.getElementsByTagName('scene');
	if (scene_elems == null) {
		return "scene element is missing.";
	}
	if (scene_elems.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	// various examples of different types of access
	var scene = scene_elems[0];
	this.globals.setRoot(this.reader.getString(scene, 'root'));
	this.globals.setAxisLength(this.reader.getFloat(scene, 'axis_length'));
	
	console.log("Globals read from file: {Root=" + this.globals.root + ", axis_length=" + this.globals.axis_length +"}");
};

/*
 * Method that parses elements of one block (Views) and stores information in a specific data structure (perspectiveList)
 */
MySceneGraph.prototype.parseViews = function(rootElement) {

	var views_elems = rootElement.getElementsByTagName('views'); 

	if (views_elems == null  || views_elems.length==0) {
		return "views is missing.";
	}

	//this.default = this.reader.getString(scene, 'default'); FALTA ISTO

	var nnodes = views_elems[0].children.length; // retorna o numero de perspetivas

	if (nnodes.length == 0) {
		return "0 perspectives";
	}

	//percorre cada perspetiva
	for (var i=0; i < nnodes; i++)
	{
		var tempP = views_elems[0].children[i]; // informacao sobre a perspetiva

		var perspective = new MyPerspective();

		// process each element and store its information
		perspective.setId(tempP.attributes.getNamedItem("id").value);
		perspective.setNear(tempP.attributes.getNamedItem("near").value);
		perspective.setFar(tempP.attributes.getNamedItem("far").value);
		perspective.setAngle(tempP.attributes.getNamedItem("angle").value);

		// ler os filhos 'from' e 'to'
		//vai buscar os valores dos filhos e coloca-os na perspetiva
		var a,b,c;
		var elem = tempP.children[0];

		a = elem.attributes.getNamedItem("x").value;
		b = elem.attributes.getNamedItem("y").value;
		c = elem.attributes.getNamedItem("z").value;

		//coloca-os na perspetiva
		perspective.setFromPoint(new MyPoint(a,b,c));

		elem = tempP.children[1];

		a = elem.attributes.getNamedItem("x").value;
		b = elem.attributes.getNamedItem("y").value;
		c = elem.attributes.getNamedItem("z").value;

		//coloca-os na perspetiva
		perspective.setToPoint(new MyPoint(a,b,c));

		//adiciona a perspetiva a lista de perspetivas
		this.perspectiveList[i] = perspective;
	};

	for (var i=0; i < nnodes; i++)
	{
		console.log("Perspetive "+i+"{id=" + this.perspectiveList[i].id + ", near=" + this.perspectiveList[i].near + 
		", far=" + this.perspectiveList[i].far+ ", angle=" + this.perspectiveList[i].angle + 
		", to[x]=" + this.perspectiveList[i].toPoint.x+ 
		", to[y]=" + this.perspectiveList[i].toPoint.y+
		", to[z]=" + this.perspectiveList[i].toPoint.z+
		", from[x]=" + this.perspectiveList[i].fromPoint.x+
		", from[y]=" + this.perspectiveList[i].fromPoint.y+
		", from[z]=" + this.perspectiveList[i].fromPoint.z+"}");
	}
};


/*
 * Method that parses elements of one block (ILUMINATION) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseIllumination = function(rootElement) {

	var illumination_elems =  rootElement.getElementsByTagName('illumination');
	if (illumination_elems == null) {
		return "ilumination element is missing.";
	}
	if (illumination_elems.length != 1) {
		return "either zero or more than one 'ilumination' element found.";
	}

	// various examples of different types of access
	var illumination = illumination_elems[0];

	this.globals.setDoublesided(this.reader.getFloat(illumination, 'doublesided'));
	this.globals.setLocal(this.reader.getFloat(illumination, 'local'));

	//obter componentes de ambiente e background
	var nodes = illumination_elems[0].children.length;

	if (nodes != 2) {
		return "There are more/less components then ambient and background on illumination";
	}

	//obter iluminacao ambiente
	var temp = illumination_elems[0].children[0];
	var a,b,c,d;

	a = temp.attributes.getNamedItem("r").value;
	b = temp.attributes.getNamedItem("g").value;
	c = temp.attributes.getNamedItem("b").value;
	d = temp.attributes.getNamedItem("a").value;

	var ambient = new MyColor(a,b,c,d);
	this.globals.setAmbient(ambient);

	//obter iluminacao local
	temp = illumination_elems[0].children[1];

	a = temp.attributes.getNamedItem("r").value;
	b = temp.attributes.getNamedItem("g").value;
	c = temp.attributes.getNamedItem("b").value;
	d = temp.attributes.getNamedItem("a").value;

	var background = new MyColor(a,b,c,d);
	this.globals.setBackground(background);
	
	console.log("Illumination read from file: {Doublesided=" + this.globals.doublesided + ", local=" + this.globals.local +"}");
	console.log("Ambient r" + this.globals.colorAmbient.r + ", Ambient g" + this.globals.colorAmbient.g + ", Ambient b" + this.globals.colorAmbient.b + ", Ambient a" + this.globals.colorAmbient.a + "}");
	console.log("background r" + this.globals.colorBackground.r + ", background g" + this.globals.colorBackground.g + ", Ambient b" + this.globals.colorBackground.b + ", background a" + this.globals.colorBackground.a + "}");

};

MySceneGraph.prototype.parseTextures = function(rootElement) {

	var texture_elems =  rootElement.getElementsByTagName('textures');
	if (texture_elems == null) {
		return "texture element is missing.";
	}

	// various examples of different types of access
	var nnodes = texture_elems[0].children.length;

	for (var i=0; i < nnodes; i++)
	{
		var temp = texture_elems[0].children[i];

		var id = temp.attributes.getNamedItem("id").value;
		var file = temp.attributes.getNamedItem("file").value;
		var length_t = temp.attributes.getNamedItem("length_t").value;
		var length_s = temp.attributes.getNamedItem("length_s").value;

		//cria o material
		var texture = new MyTexture(id,length_t,length_s);
		texture.setTexture(file);

		//adiciona a lista de texturas
		this.texturesList[i] = texture;
	}

	for (var i=0; i < nnodes; i++)
	{
		console.log("Textura "+this.texturesList[i].getId() + " , length_t = "+this.texturesList[i].getLengthT()+" , length_s = "+this.texturesList[i].getLengthS());
	}
	
};

MySceneGraph.prototype.parseMaterials = function(rootElement) {

	var material_elems =  rootElement.getElementsByTagName('materials');
	if (material_elems == null) {
		return "materials element is missing.";
	}

	var nnodes = material_elems[0].children.length;

	for (var i=0; i < nnodes; i++)
	{
		var temp = material_elems[0].children[i];

		var material = new MyMaterial(temp.attributes.getNamedItem("id").value);

		//ler os filhos deste material
		for(var j = 0; j < 4; j++)
		{
			var r,g,b,a;
			var child = temp.children[j]; //emission

			r = child.attributes.getNamedItem("r").value;
			g = child.attributes.getNamedItem("g").value;
			b = child.attributes.getNamedItem("b").value;
			a = child.attributes.getNamedItem("a").value;

			if(j==0) material.setEmission(r,g,b,a);
			if(j==1) material.setAmbient(r,g,b,a);
			if(j==2) material.setDiffuse(r,g,b,a);
			if(j==3) material.setSpecular(r,g,b,a);
		}

		material.setShininess(temp.children[4].attributes.getNamedItem("value").value);

		//juntar a lista de materias
		this.materialsList[i] = material;
	}

	for(var i = 0; i < nnodes; i++){
		console.log("Material "+ this.materialsList[i].getId()); //acabar isto?
	}
};

/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


