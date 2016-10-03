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
	this.lightsList = [];						//lista com as diversas luzes
	this.texturesList = [];						//lista com as diversas texturas
	this.materialsList = [];					//lista com os diversos materiais
	this.transformationsList = [];				//lista com as diversas transformações
	this.primitivesList = [];					//lista com as diversas primitivas

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
	//Parse Lights
	if ((error = this.parseLights(rootElement)) != null) {
		this.onXMLError(error);
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
	//Parse Transformations
	if ((error = this.parseTransformations(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
	//Parse Primitives
	if ((error = this.parsePrimitives(rootElement)) != null) {
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

	/*for (var i=0; i < nnodes; i++)
	{
		console.log("Perspetive "+i+"{id=" + this.perspectiveList[i].id + ", near=" + this.perspectiveList[i].near + 
		", far=" + this.perspectiveList[i].far+ ", angle=" + this.perspectiveList[i].angle + 
		", to[x]=" + this.perspectiveList[i].toPoint.x+ 
		", to[y]=" + this.perspectiveList[i].toPoint.y+
		", to[z]=" + this.perspectiveList[i].toPoint.z+
		", from[x]=" + this.perspectiveList[i].fromPoint.x+
		", from[y]=" + this.perspectiveList[i].fromPoint.y+
		", from[z]=" + this.perspectiveList[i].fromPoint.z+"}");
	}*/
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

	
	var illumination = illumination_elems[0];

	this.globals.setDoublesided(this.reader.getFloat(illumination, 'doublesided'));
	this.globals.setLocal(this.reader.getFloat(illumination, 'local'));


	var n_illumination = illumination_elems[0].children.length;

	if (n_illumination != 2) {
		return "There are more/less components then ambient and background on illumination";
	}

	//AMBIENT
	var temp = illumination_elems[0].children[0];

	var ambient = new MyColor(temp.attributes.getNamedItem("r").value,
								temp.attributes.getNamedItem("g").value,
								temp.attributes.getNamedItem("b").value,
								temp.attributes.getNamedItem("a").value);
	this.globals.setAmbient(ambient);

	//LOCAL
	temp = illumination_elems[0].children[1];

	var background = new MyColor(temp.attributes.getNamedItem("r").value,
									temp.attributes.getNamedItem("g").value,
									temp.attributes.getNamedItem("b").value,
									temp.attributes.getNamedItem("a").value);
	this.globals.setBackground(background);
	
	//console.log("Illumination read from file: {Doublesided=" + this.globals.doublesided + ", local=" + this.globals.local +"}");
	//ambient.printInfo();
	//background.printInfo();

}

/*
 * Method that parses elements of one block (LIGHTS) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseLights = function(rootElement) {

	var lights_elems =  rootElement.getElementsByTagName('lights');

	if (lights_elems == null) {
		return "lights element is missing.";
	}

	if (lights_elems.length != 1) {
		return "either zero or more than one 'lights' element found.";
	}

	n_lights = lights_elems[0].children.length;

	if (n_lights == 0) {
		return "There are 0 lights";
	}

	var id, enable, location, ambient,diffuse, specular, angle, target, exponent;
	var temp;
	var spot;

	var lights;

	for(var i = 0; i < n_lights;i++){

		lights = lights_elems[0].children[i];

		if(lights.children.length == 4){	//OMNI
			spot = 0;
		}
		else{								//SPOT
			spot = 1;
		}
		
		id = this.reader.getString(lights, 'id');
		enable = this.reader.getFloat(lights, 'enabled');

		if(spot == 1){
			angle = this.reader.getFloat(lights, 'angle');
			exponent = this.reader.getFloat(lights, 'exponent');

			lights = lights_elems[0].children[i].children[0];
			target = new MyPoint(lights.attributes.getNamedItem("x").value,
								lights.attributes.getNamedItem("y").value,
								lights.attributes.getNamedItem("z").value);
		}

		lights = lights_elems[0].children[i].children[spot];
		location = new MyPoint(lights.attributes.getNamedItem("x").value,
								lights.attributes.getNamedItem("y").value,
								lights.attributes.getNamedItem("z").value); //FALTA O WW !!!!!!!!!!!


		lights = lights_elems[0].children[i].children[1 + spot];
		ambient = new MyColor(lights.attributes.getNamedItem("r").value,
								lights.attributes.getNamedItem("g").value,
								lights.attributes.getNamedItem("b").value,
								lights.attributes.getNamedItem("a").value);

		lights = lights_elems[0].children[i].children[2 + spot];
		diffuse = new MyColor(lights.attributes.getNamedItem("r").value,
								lights.attributes.getNamedItem("g").value,
								lights.attributes.getNamedItem("b").value,
								lights.attributes.getNamedItem("a").value);

		lights = lights_elems[0].children[i].children[3 + spot];
		specular = new MyColor(lights.attributes.getNamedItem("r").value,
								lights.attributes.getNamedItem("g").value,
								lights.attributes.getNamedItem("b").value,
								lights.attributes.getNamedItem("a").value);

		//GUARDAR NA LISTA DE LIGHTS
		if(spot == 1){ //SPOT
			this.lightsList[i] = new MyLight(id,enable,location,ambient,diffuse,specular,angle,exponent,target);
		}
		else{			//OMNI
			this.lightsList[i] = new MyLight(id,enable,location,ambient,diffuse,specular);
		}
	//	this.lightsList[i].printInfo();

	}

}

/*
 * PARSE TEXTURES
 */

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
		//console.log("Textura "+this.texturesList[i].getId() + " , length_t = "+this.texturesList[i].getLengthT()+" , length_s = "+this.texturesList[i].getLengthS());
	}
	
};

/*
 * PARSE MATERIALS
 */

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
 * PARSE TRANSFORMATIONS
 */

MySceneGraph.prototype.parseTransformations = function(rootElement) {

	var transformations_elems =  rootElement.getElementsByTagName('transformations');
	if (transformations_elems == null) {
		return "transformations element is missing.";
	}

	var n_transformation = transformations_elems[0].children.length;

	if(n_transformation == 0){
		return "0 transformations";
	}

	var transformation;
	var final_t; //final transformation

	//saves data info of each final transformation
	for (var i=0; i < n_transformation; i++)
	{
		transformation = transformations_elems[0].children[i];

		final_t = new MyTransformation(transformation.attributes.getNamedItem("id").value);

		if(transformation.children.length == 0){
			return "Transformation without information";
		}

		//transformations that are part of the dfinal transformation
		for(var j = 0; j < transformation.children.length; j++){
		
			if(transformation.children[j].tagName == "translate"){
				final_t.translate(transformation.children[j].attributes.getNamedItem("x").value,
												transformation.children[j].attributes.getNamedItem("y").value,
												transformation.children[j].attributes.getNamedItem("z").value);

				
			}
			else if(transformation.children[j].tagName == "rotate"){
				final_t.rotate(transformation.children[j].attributes.getNamedItem("axis").value,
												transformation.children[j].attributes.getNamedItem("angle").value);
			}
			else if(transformation.children[j].tagName == "scale"){
				final_t.scale(transformation.children[j].attributes.getNamedItem("x").value,
												transformation.children[j].attributes.getNamedItem("y").value,
												transformation.children[j].attributes.getNamedItem("z").value);
			}
		}
		final_t.display();
		this.transformationsList[i] = final_t;

	}
}

/*
 * PARSE PRIMITIVES
 */

MySceneGraph.prototype.parsePrimitives = function(rootElement) {

	var primitives_elems =  rootElement.getElementsByTagName('primitives');

	if (primitives_elems == null) {
		return "primitives element is missing.";
	}

	var n_primitives = primitives_elems[0].children.length;

	if(n_primitives == 0){
		return "0 primitives";
	}

	var primitive,id,p,tagName;

	for(var i = 0; i < n_primitives; i++){

		primitive = primitives_elems[0].children[i];
		id = primitive.attributes.getNamedItem("id").value;

		if(primitive.children.length != 1){
			return "more/less than one primitive component";
		}
		
		tagName = primitive.children[0].tagName;

		p = new MyPrimitive(id,tagName);

		switch(tagName){
			case "rectangle":{
				p.setPoint1(new MyPoint(primitive.children[0].attributes.getNamedItem("x1").value,
										primitive.children[0].attributes.getNamedItem("y1").value,
										0));
				p.setPoint2(new MyPoint(primitive.children[0].attributes.getNamedItem("x2").value,
										primitive.children[0].attributes.getNamedItem("y2").value,
										0));
				break;
			}
			case "triangle":{
				p.setPoint1(new MyPoint(primitive.children[0].attributes.getNamedItem("x1").value,
										primitive.children[0].attributes.getNamedItem("y1").value,
										primitive.children[0].attributes.getNamedItem("z1").value));

				p.setPoint2(new MyPoint(primitive.children[0].attributes.getNamedItem("x2").value,
										primitive.children[0].attributes.getNamedItem("y2").value,
										primitive.children[0].attributes.getNamedItem("z2").value));

				p.setPoint3(new MyPoint(primitive.children[0].attributes.getNamedItem("x3").value,
										primitive.children[0].attributes.getNamedItem("y3").value,
										primitive.children[0].attributes.getNamedItem("z3").value));
				break;
			}
			case "cylinder": {
				p.setCylinderProp(primitive.children[0].attributes.getNamedItem("base").value,
									primitive.children[0].attributes.getNamedItem("top").value,
									primitive.children[0].attributes.getNamedItem("height").value,
									primitive.children[0].attributes.getNamedItem("slices").value,
									primitive.children[0].attributes.getNamedItem("stacks").value);
				break;
			}
			case "sphere": {
				p.setSphereProp(primitive.children[0].attributes.getNamedItem("radius").value,
								primitive.children[0].attributes.getNamedItem("slices").value,
								primitive.children[0].attributes.getNamedItem("stacks").value);
				break;
			}
			case "torus" : {
				p.setTorusProp(primitive.children[0].attributes.getNamedItem("inner").value,
								primitive.children[0].attributes.getNamedItem("outer").value,
								primitive.children[0].attributes.getNamedItem("slices").value,
								primitive.children[0].attributes.getNamedItem("loops").value);
				break;
			}
		}
		this.primitivesList[i] = p;
		this.primitivesList[i].printInfo();
	}
}

/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


