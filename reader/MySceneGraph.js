/*
 * Scene Graph
 */
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	//parameters
	this.globals = new MyGlobals();				//variaveis globais do grafo
	this.perspectiveList = new Map();			//map com as diversa perspetivas
	this.lightsList = new Map();				//map com as diversas luzes
	this.texturesList = new Map();				//map com as diversas texturas
	this.materialsList = new Map();				//map com os diversos materiais
	this.transformationsList = new Map();		//map com as diversas transformações
	this.primitivesList = new Map();			//map com as diversas primitivas
	this.componentsList = new Map();			//map com os diversos componentes

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
	
	// method that calls all parse functions and verifies errors
	this.readSceneGraphFile(rootElement);		

	// no errors
	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};

/**
 * Calls all parsers and verifies errors
 */
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
	//Parse Components
	if ((error = this.parseComponents(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
};

/*
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message+" Exiting...");	
	this.loadedOk=false;
};

/*
 * Method that parses elements of one block (Scene) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseGlobals = function(rootElement) {

	var scene_elems =  rootElement.getElementsByTagName('scene');
	//error cases
	if (scene_elems == null) {
		return "scene element is missing.";
	}
	if (scene_elems.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	//get scene
	var scene = scene_elems[0];

	var name = this.reader.getString(scene, 'root');
	if(name == ""){
		console.log("WARNING : root without name!");
	}

	this.globals.setRoot(name);

	//verifies if axis_length is a number
	var ret = this.globals.setAxisLength(this.reader.getFloat(scene, 'axis_length'));
	if(ret != null) return ret;
	
	//console.log("Globals read from file: {Root=" + this.globals.root + ", axis_length=" + this.globals.axis_length +"}");
};

/*
 * Method that parses elements of one block (Views) and stores information in a specific data structure (perspectiveList)
 * perspectiveList is a list of Objects of type MyPerspective.
 */
MySceneGraph.prototype.parseViews = function(rootElement) {

	var views_elems = rootElement.getElementsByTagName('views'); 

	if (views_elems == null  || views_elems.length==0) {
		return "views is missing.";
	}

	//this.default = this.reader.getString(scene, 'default'); FALTA ISTO

	var nnodes = views_elems[0].children.length; // retorna o numero de perspetivas

	if (nnodes.length == 0) {
		return "zero perspectives";
	}

	//percorre cada perspetiva
	for (var i=0; i < nnodes; i++)
	{
		var tempP = views_elems[0].children[i]; // informacao sobre a perspetiva

		var perspective = new MyPerspective();

		// process each element and store its information
		var id = tempP.attributes.getNamedItem("id").value;
		if(!this.perspectiveList.has(id)){	//se ainda não existir, ok. Se não, o id é repetido
			perspective.setId(id);
		}else
			return "id repetead!";


		perspective.setNear(tempP.attributes.getNamedItem("near").value);

		perspective.setFar(tempP.attributes.getNamedItem("far").value);

		var angle=tempP.attributes.getNamedItem("angle").value;
		if(angle < -180 || angle >180)
			console.log("WARNING : angle not adjusted...");
		perspective.setAngle(tempP.attributes.getNamedItem("angle").value);

		//vai buscar os valores dos filhos <to> e <from>
		var a,b,c;
		var elem = tempP.children[0];

		a = elem.attributes.getNamedItem("x").value;
		b = elem.attributes.getNamedItem("y").value;
		c = elem.attributes.getNamedItem("z").value;

		//coloca o ponto na perspetiva
		perspective.setFromPoint(new MyPoint(a,b,c));

		elem = tempP.children[1];

		a = elem.attributes.getNamedItem("x").value;
		b = elem.attributes.getNamedItem("y").value;
		c = elem.attributes.getNamedItem("z").value;

		//coloca o ponto na perspetiva
		perspective.setToPoint(new MyPoint(a,b,c));

		//adiciona a perspetiva a lista de perspetivas
		this.perspectiveList.set(id, perspective);
	};

	/*
	for (var [id, value] of this.perspectiveList) {
  		console.log(id);

		console.log("Perspetive "+i+"{id=" + this.perspectiveList.get(id).id + ", near=" + this.perspectiveList.get(id).near + 
		", far=" + this.perspectiveList.get(id).far+ ", angle=" + this.perspectiveList.get(id).angle + 
		", to[x]=" + this.perspectiveList.get(id).toPoint.x+ 
		", to[y]=" + this.perspectiveList.get(id).toPoint.y+
		", to[z]=" + this.perspectiveList.get(id).toPoint.z+
		", from[x]=" + this.perspectiveList.get(id).fromPoint.x+
		", from[y]=" + this.perspectiveList.get(id).fromPoint.y+
		", from[z]=" + this.perspectiveList.get(id).fromPoint.z+"}");
	}
	*/
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

	//get first illumination child from block <illumination>
	var illumination = illumination_elems[0];

	this.globals.setDoublesided(this.reader.getFloat(illumination, 'doublesided'));
	this.globals.setLocal(this.reader.getFloat(illumination, 'local'));

	var n_illumination = illumination_elems[0].children.length;

	//we just want background and ambient
	if (n_illumination != 2) {
		return "There are more/less components then ambient and background on illumination";
	}

	//ambient
	var temp = illumination_elems[0].children[0];

	var ambient = new MyColor(temp.attributes.getNamedItem("r").value,
								temp.attributes.getNamedItem("g").value,
								temp.attributes.getNamedItem("b").value,
								temp.attributes.getNamedItem("a").value);
	this.globals.setAmbient(ambient);

	//background
	temp = illumination_elems[0].children[1];

	var background = new MyColor(temp.attributes.getNamedItem("r").value,
									temp.attributes.getNamedItem("g").value,
									temp.attributes.getNamedItem("b").value,
									temp.attributes.getNamedItem("a").value);
	this.globals.setBackground(background);
	
	/*console.log("Illumination read from file: {Doublesided=" + this.globals.doublesided + ", local=" + this.globals.local +"}");
	  ambient.printInfo();
	  background.printInfo();*/

}

/*
 * Method that parses elements of one block (LIGHTS) and stores information in a specific data structure (lightsList).
 * lightsList is a list of Objects of type MyLight.
 */
MySceneGraph.prototype.parseLights = function(rootElement) {

	var lights_elems =  rootElement.getElementsByTagName('lights');

	//errors
	if (lights_elems == null) {
		return "lights element is missing.";
	}
	if (lights_elems.length != 1) {
		return "either zero or more than one 'lights' element found.";
	}

	n_lights = lights_elems[0].children.length;

	if (n_lights == 0) {
		return "There are zero lights";
	}

	var id, enable, location, ambient,diffuse, specular, angle, target, exponent;
	var temp;
	var spot;

	var lights;

	//courses througth lights_elems childrens
	for(var i = 0; i < n_lights; i++){

		lights = lights_elems[0].children[i];

		if(lights.children.length == 4){	//OMNI
			spot = 0;
		}
		else{								//SPOT
			spot = 1;
		}
		
		//verifies if 'id'' is unic on lightsList
		id = this.reader.getString(lights, 'id');
		if(this.lightsList.has(id)){	//se ainda não existir, ok. Se não, o id é repetido
			return "id "+id+" from block 'lights' already exists!";
		}

		enable = this.reader.getFloat(lights, 'enabled');

		//extra elements for spot Light
		if(spot == 1){
			angle = this.reader.getFloat(lights, 'angle');
			exponent = this.reader.getFloat(lights, 'exponent');

			lights = lights_elems[0].children[i].children[0];
			target = new MyPoint(lights.attributes.getNamedItem("x").value,
								lights.attributes.getNamedItem("y").value,
								lights.attributes.getNamedItem("z").value);

			lights = lights_elems[0].children[i].children[1];
			location = [lights.attributes.getNamedItem("x").value,
								lights.attributes.getNamedItem("y").value,
								lights.attributes.getNamedItem("z").value];
		}
		else{
			lights = lights_elems[0].children[i].children[0];
			location = [lights.attributes.getNamedItem("x").value,
								lights.attributes.getNamedItem("y").value,
								lights.attributes.getNamedItem("z").value,
								lights.attributes.getNamedItem("w").value];
		}
		
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

		//save at the list
		if(spot == 1){ //SPOT
			this.lightsList.set(id, new MyLight(id,enable,location,ambient,diffuse,specular,angle,exponent,target));
		}
		else{			//OMNI
			this.lightsList.set(id,new MyLight(id,enable,location,ambient,diffuse,specular));
		}

		//this.lightsList.get(id).printInfo();
	}
}

/*
 * Method that parses elements of one block (Textures) and stores information in a specific data structure (texturesList).
 * texturesList is a list of Objects of type MyTexture.
 */
MySceneGraph.prototype.parseTextures = function(rootElement) {

	var texture_elems =  rootElement.getElementsByTagName('textures');

	//errors
	if (texture_elems == null || texture_elems.length != 1) {
		return "texture element is missing.";
	}

	var nnodes = texture_elems[0].children.length;
	if(nnodes == 0){
		return "zero 'texture' elements";
	}

	//courses throught texture_elems childrens
	for (var i=0; i < nnodes; i++)
	{
		var temp = texture_elems[0].children[i];

		var id = temp.attributes.getNamedItem("id").value;
		if(this.texturesList.has(id)){		//ja existe
			return "id "+id+" from block 'textures' already exists!";
		}

		var file = temp.attributes.getNamedItem("file").value;
		var length_t = temp.attributes.getNamedItem("length_t").value;
		var length_s = temp.attributes.getNamedItem("length_s").value;

		//cria o material
		var texture = new MyTexture(id,file,length_t,length_s);

		//adiciona a lista de texturas
		this.texturesList.set(id,texture);
	}
/*
	for (var [id, value] of this.texturesList) {
  		console.log(id);
  		console.log("Textura "+value.getId() + " , length_t = "+value.getLengthT()+" , length_s = "+value.getLengthS());
	}
*/
};

/*
 * Method that parses elements of one block (Materials) and stores information in a specific data structure (materialsList).
 * materialsList is a list of Objects of type MyMaterial.
 */
MySceneGraph.prototype.parseMaterials = function(rootElement) {

	var material_elems =  rootElement.getElementsByTagName('materials');
	//errors
	if (material_elems == null || material_elems.length == 1) {
		return "materials element is missing or more than one block materials.";
	}

	var nnodes = material_elems[0].children.length;
	if(nnodes == 0){
		return "zero 'material' elements";
	}

	//courses throught material_elems childrens
	for (var i=0; i < nnodes; i++)
	{
		var temp = material_elems[0].children[i];

		//verifies repetead id
		var id = temp.attributes.getNamedItem("id").value;
		if(this.materialsList.has(id)) //existe este id
		{ 
			return "id "+id+" from block 'materials' already exists!";
		}
		var material = new MyMaterial(id);

		//ler os filhos deste material
		for(var j = 0; j < 4; j++)
		{
			var r,g,b,a;
			var child = temp.children[j];

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
		this.materialsList.set(id,material);
	}

/*
	for (var [id, value] of this.materialsList) {
  		console.log(id);
  		console.log("Material "+ value.getId()); //acabar isto?
  	}
*/
};

/*
 * Method that parses elements of one block (TRANSFORMATIONS) and stores information in a specific data structure (transformationsList).
 * transformationsList is a list of Objects of type MyTransformation.
 */
MySceneGraph.prototype.parseTransformations = function(rootElement) {

	var transformations_elems =  rootElement.getElementsByTagName('transformations');
	//errors
	if (transformations_elems == null || transformations_elems.length != 1) {
		return "transformations element is missing.";
	}

	var n_transformation = transformations_elems[0].children.length;
	if(n_transformation == 0){
		return "zero 'transformation' elements";
	}

	var transformation;
	var final_t; //final transformation

	//courses throught transformations
	for (var i=0; i < n_transformation; i++)
	{
		transformation = transformations_elems[0].children[i];

		var id = transformation.attributes.getNamedItem("id").value;
		if(this.transformationsList.has(id)) //found
		{ 	
			return "id "+id+" from block 'transformations' already exists!";
		}

		//Identity matrix at the beggining
		final_t = new MyTransformation(id);

		//error (we need at least 1 transformation)
		if(transformation.children.length == 0){
			return "Transformation without information";
		}

		//multiply all transformations to final_t
		for(var j = 0; j < transformation.children.length; j++){
			var tag_name = transformation.children[j].tagName;

			switch(tag_name){
				case "translate":
					final_t.translate(transformation.children[j].attributes.getNamedItem("x").value,
									  transformation.children[j].attributes.getNamedItem("y").value,
									  transformation.children[j].attributes.getNamedItem("z").value);
					break;
				case "rotate":
					final_t.rotate(transformation.children[j].attributes.getNamedItem("axis").value,
								   transformation.children[j].attributes.getNamedItem("angle").value);
					break;
				case "scale":
					final_t.scale(transformation.children[j].attributes.getNamedItem("x").value,
								  transformation.children[j].attributes.getNamedItem("y").value,
								  transformation.children[j].attributes.getNamedItem("z").value);
					break;
				default:
					return "inexisting tag name";

			}
		}
		//saves final matrix at transformationsList
		this.transformationsList.set(id,final_t);

		//this.transformationsList.get(id).display();
	}
}

/*
 * Method that parses elements of one block (PRIMITIVES) and stores information in a specific data structure (primitivesList).
 * primitivesList is a list of Objects of type MyPrimitive.
 */
MySceneGraph.prototype.parsePrimitives = function(rootElement) {

	var primitives_elems =  rootElement.getElementsByTagName('primitives');
	
	if (primitives_elems == null || primitives_elems.length != 1) {
		return "primitives element is missing.";
	}

	var n_primitives = primitives_elems[0].children.length;

	if(n_primitives == 0){
		return "zero 'primitive' elements";
	}

	//courses throught 'primitives' childrens
	var primitive,prim,tagName;
	for(var i = 0; i < n_primitives; i++){

		primitive = primitives_elems[0].children[i];

		//error -> just one element for primitive
		if(primitive.children.length != 1){
			return "more/less than one primitive component";
		}
		
		tagName = primitive.children[0].tagName;
		var id = primitive.attributes.getNamedItem("id").value;
		if(this.primitivesList.has(id)){ //found
			return "id "+id+" from block 'primitives' already exists!";
		}

		//different primitives for different tag names
		switch(tagName){
			case "rectangle":{
				var p1 = new MyPoint(primitive.children[0].attributes.getNamedItem("x1").value,
								 	 primitive.children[0].attributes.getNamedItem("y1").value,
								 	 0);
				var p2 = new MyPoint(primitive.children[0].attributes.getNamedItem("x2").value,
								 	 primitive.children[0].attributes.getNamedItem("y2").value,
								 	 0);

				//prim = new MyRectangle(id,p1,p2);
				break;
			}
			case "triangle":{
				var p1 = new MyPoint(primitive.children[0].attributes.getNamedItem("x1").value,
							     primitive.children[0].attributes.getNamedItem("y1").value,
								 primitive.children[0].attributes.getNamedItem("z1").value);

				var p2 = new MyPoint(primitive.children[0].attributes.getNamedItem("x2").value,
								 primitive.children[0].attributes.getNamedItem("y2").value,
								 primitive.children[0].attributes.getNamedItem("z2").value);

				var p3 = new MyPoint(primitive.children[0].attributes.getNamedItem("x3").value,
								 primitive.children[0].attributes.getNamedItem("y3").value,
								 primitive.children[0].attributes.getNamedItem("z3").value);

				//prim = new MyTriangle(id,p1,p2,p3);
				break;
			}
			case "cylinder": {
				var b,t,h,sl,st;

				b = primitive.children[0].attributes.getNamedItem("base").value;
				t = primitive.children[0].attributes.getNamedItem("top").value;
				h = primitive.children[0].attributes.getNamedItem("height").value;
				sl = primitive.children[0].attributes.getNamedItem("slices").value;
				st = primitive.children[0].attributes.getNamedItem("stacks").value;

				//prim = new MyCylinder(id,b,t,h,sl,st);
				break;
			}
			case "sphere": {
				var r,sl,st;
				r = primitive.children[0].attributes.getNamedItem("radius").value;
				sl = primitive.children[0].attributes.getNamedItem("slices").value;
				st = primitive.children[0].attributes.getNamedItem("stacks").value;

				//prim = new MySphere(id,r,sl,st);
				break;
			}
			case "torus" : {
				var inn, o, l,sl;

				inn = primitive.children[0].attributes.getNamedItem("inner").value;
				o = primitive.children[0].attributes.getNamedItem("outer").value,
				sl = primitive.children[0].attributes.getNamedItem("slices").value;
				l = primitive.children[0].attributes.getNamedItem("loops").value;

				//prim = new MyTorus(id,inn,o,sl,l);
				break;
			}
		}
		this.primitivesList.set(id,prim);
		//this.primitivesList.get(id).printInfo();
	}
}

/*
 * Method that parses elements of one block (Components) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseComponents = function(rootElement) {

	//<components>
	var components_elems =  rootElement.getElementsByTagName('components');
	
	if (components_elems == null) {
		return "components element is missing.";
	}
	if (components_elems.length != 1) {
		return "either zero or more than one 'components' element found.";
	}

	var n_components = components_elems[0].children.length;

	//Check all components
	for(var i = 0 ; i < n_components ; i++){

		//<component>
		component = components_elems[0].children[i];
		var id = component.attributes.getNamedItem("id").value;

		//se o component já existe e já está definido => erro
		if(this.componentsList.has(id))
			if(this.componentsList.get(id).isDefined()){
				return "this component "+id+" is already defined!";
			}
	
		//<transformation>
		var matrixId;

		var transformation = component.children[0];
		var n_transformations= transformation.children.length;		//inside <transformation>

		/*Error for : 
			 - more than one <transformationref>
			 - just one <transformationref> and <rotate>/<scale>/<translate> transformations
			 - none transformations
		*/
		if(	(n_transformations > 1 && transformation.getElementsByTagName("transformationref").length == 1) ||
			transformation.getElementsByTagName("transformationref").length > 1){
			return "component with 0 transformation or 'transformationref' and rot/scale/trans tranformations at the same time";
		}

		// a matriz é a identidade 
		if(transformation.length == 0 )
		{
			matrixId = "default_"+id;
			var temp = new MyTransformation(matrixId);
			this.transformationsList.set(matrixId,temp);

			var transfComponent = this.transformationsList.get(matrixId); // transformation from component
		}
		else if(transformation.getElementsByTagName("transformationref").length == 1) //<transformationref>
		{
			var pos;
			matrixId = transformation.getElementsByTagName("transformationref")[0].attributes.getNamedItem("id").value;
			
			if(!this.transformationsList.has(matrixId)) //not found
			{ 
				return "transformationref id not found";
			}
			var transfComponent = this.transformationsList.get(matrixId);
		}
		else		//<rotate>/<scale>/<translate>
		{
			for(var j = 0; j < n_transformations;j++){

				var tag_name = transformation.children[j].tagName;
				matrixId = "default_"+id;
				var transfComponent = new MyTransformation(matrixId);

				switch(tag_name){
					case "translate":
						transfComponent.translate(transformation.children[j].attributes.getNamedItem("x").value,
										  transformation.children[j].attributes.getNamedItem("y").value,
										  transformation.children[j].attributes.getNamedItem("z").value);
						break;
					case "rotate":
						transfComponent.rotate(transformation.children[j].attributes.getNamedItem("axis").value,
									   transformation.children[j].attributes.getNamedItem("angle").value);
						break;
					case "scale":
						transfComponent.scale(transformation.children[j].attributes.getNamedItem("x").value,
									  transformation.children[j].attributes.getNamedItem("y").value,
									  transformation.children[j].attributes.getNamedItem("z").value);
						break;
					default:
						return "inexisting tag name";
				
				}
				//temp.display();
			}
			this.transformationsList.set(matrixId,transfComponent);	//adicionar a nova matriz
		}

		//<materials>
		var materials, n_materials, materialId;
		var materialsComponent = new Map();

		materials = component.children[1];
		n_materials = materials.children.length;

		for(var j = 0; j < n_materials ; j++){
			
			materialId = materials.children[j].attributes.getNamedItem("id").value;
			
			/*Error
			 - id doesn't found on materialsList and id != "inherit" */
			if(!this.materialsList.has(materialId) && materialId != "inherit")
			{
				return "Components '" + id + "' materialsId '" +materialId + "' not found";
			}

			materialsComponent.set(materialId, this.materialsList.get(materialId));
		}

		//<texture>
		var texture = component.getElementsByTagName("texture");
		
		if(texture.length != 1){
			return "Components '" + id + "' has more than one component's texture";
		}

		var textureId = texture[0].attributes.getNamedItem("id").value;
		
		if(!this.texturesList.has(textureId) && textureId != "inherit" && textureId != "none"){
			return "Components '" + id + "' textureId '" + textureId + "' not found";
		}

		var textureComponent = this.texturesList.get(textureId);

		//<children>
        var children_elems = component.getElementsByTagName("children");
		var childrenId;
		var childComponent = new Map();
		var primitiveComponent = new Map();

        if(children_elems.length != 1){
        	return "Component '" + id + "' has more than one children block";
        }

      	//<componentref>
         var compRef = children_elems[0].getElementsByTagName("componentref");
         for(var j = 0; j < compRef.length ;j++)
         {
         	childrenId = compRef[j].attributes.getNamedItem("id").value;	//id do filho tipo component

         	//se existir este id, adiciona o que está na lista
         	if(this.componentsList.has(childrenId))
         		childComponent.set(childrenId,this.componentsList.get(childrenId));
         	else{
         		var temp = new MyComponent(childrenId,false);		//cria o component
         		this.componentsList.set(childrenId,temp); 	//adciona a lista de components
         		childComponent.set(childrenId,temp);		//adiciona a lista de filhos deste component
         	}
         }

         //<primitiveref>
         var primitRef = children_elems[0].getElementsByTagName("primitiveref");
         for(var j = 0; j < primitRef.length ;j++)
         {
         	childrenId = primitRef[j].attributes.getNamedItem("id").value; //id do filho do tipo primitiva

         	if(!this.primitivesList.has(childrenId)){		//not found
				return "Component '" + id + "' primitiveref '" + childrenPrimitivesId[j] + "' not in the list of primitives";
         	}
         	primitiveComponent.set(childrenId,this.primitivesList.get(childrenId));
         }

        if(this.componentsList.has(id)){
        	var comp = this.componentsList.get(id);
        }else{
        	var comp = new MyComponent(id,true);
        }

		comp.setTransformation(transfComponent);
        comp.setMaterials(materialsComponent);
       	comp.setTexture(textureComponent);
        comp.setComponents(childComponent);
       	comp.setPrimitives(primitiveComponent);
       		
        this.componentsList.set(id,comp);
		comp.display();
	}

	if(!this.isChildrensDefined()){
		return "Not all components definied!!!";
	}
}

/*
 * Method that verifies componentsList.
 * Percorre toda a lista e verifica os seus filhos. Para cada filho, verifica se esse component está na lista
 * e se (caso esteja na lista) está definido.  
 */
MySceneGraph.prototype.isChildrensDefined = function() {

	for (var [id, value] of this.componentsList) {
		var childrens = value.getComponentsChilds();
  		for(var j = 0; j < childrens.length; j++)
		{
			if(!this.componentsList.has(childrens[j]))
				return false;
			if(!this.componentsList.get(childrens[j]).isDefined())
				return false;
		}
	}
	return true;
}

/**
 * This method returns true if 'list' has any element with id 'id'.
 * Returns the position or -1 if id it's not found in the list
 *
MySceneGraph.prototype.verifyExistingId = function(id, list) {
	for(var i = 0; i < list.length; i++)
	{
		if(id == list[i].getId())	return i;
	}
	return -1;
}*/

/*
 *
 */
MySceneGraph.prototype.getGlobals = function() {
	return this.globals;
}