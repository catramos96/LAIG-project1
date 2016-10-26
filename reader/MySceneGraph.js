/**
 * Scene Graph
 * Gets all the information from the parser and analizes it to display the scene
 * Only recieves the scene and the name of the .dsx file with the scene description
 */
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

	//parameters
	this.globals = new MyGlobals();				//globals variables
	this.perspectiveList = new Map();			//perspectives map
	this.lightsList = [];						//lights list
	this.texturesList = new Map();				//textures map
	this.materialsList = new Map();				//materials map
	this.transformationsList = new Map();		//transformations map
	this.primitivesList = new Map();			//primitives map
	this.componentsList = new Map();			//components map

	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	this.reader.open('scenes/'+filename, this);  
};

/**
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement; //neste caso, dsx
	
	// no errors
	this.loadedOk=true;
	
	// method that calls all parse functions and verifies errors
	this.readSceneGraphFile(rootElement);		
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	if(this.loadedOk)
		this.scene.onGraphLoaded();
};

/**
 * Calls all parsers and verifies errors. Also verifies the order of the childrens
 */
MySceneGraph.prototype.readSceneGraphFile = function(rootElement) {
	//The file is not .dsx
	if(rootElement.nodeName != "dsx"){
		this.onXMLError("File does not have 'dsx' tag.");
		return;
	}
	
	//The number of elements must be equal to 9
	if(rootElement.children.length != 9)
	{
		this.onXMLError("File does not have 9 children tags.");
		return;
	}

	var error;
	
	//To insure that the order of the elements is correct
	//Parse Globals
	if(rootElement.children[0].nodeName != "scene"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseGlobals(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Views
	if(rootElement.children[1].nodeName != "views"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseViews(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Illumination
	if(rootElement.children[2].nodeName != "illumination"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseIllumination(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Lights
	if(rootElement.children[3].nodeName != "lights"){
		console.log("WARNING : dsx does not respect the formal order!");
	}		
	if ((error = this.parseLights(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Textures
	if(rootElement.children[4].nodeName != "textures"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseTextures(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Materials
	if(rootElement.children[5].nodeName != "materials"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseMaterials(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Transformations
	if(rootElement.children[6].nodeName != "transformations"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseTransformations(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Primitives
	if(rootElement.children[7].nodeName != "primitives"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parsePrimitives(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}

	//Parse Components
	if(rootElement.children[8].nodeName != "components"){
		console.log("WARNING : dsx does not respect the formal order!");
	}
	if ((error = this.parseComponents(rootElement)) != null) {
		this.onXMLError(error);
		return;
	}
	
	//detecao de filhos nao inicializados nos components
	if(!this.isChildrensDefined())
	{
		this.onXMLError("Not all components definied!!!");
		return;
	}
	
	//detecao de ciclos
	var visitedNodes = [];
	if(this.hasCycles(this.root,visitedNodes))
	{
		this.onXMLError("This graph has cycles!!!");
		return;
	}
};

/**
 * Callback to be executed on any read error
 */
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message+"\nExiting...");	
	this.loadedOk=false;
};

/**
 * Method that parses elements of one block (Scene) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseGlobals = function(rootElement) {

	var scene_elems =  rootElement.getElementsByTagName('scene');		//ELEMENT 0
	
	//error cases
	if (scene_elems == null) {
		return "Scene element is missing.";
	}
	if (scene_elems.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	//get scene
	var scene = scene_elems[0];

	//init globals
	var name = this.reader.getString(scene, 'root');
	if(name == ""){
		console.log("WARNING : root without name!");
	}

	this.globals.setRoot(name);

	//verifies if axis_length is positive
	var ret = this.globals.setAxisLength(this.reader.getFloat(scene, 'axis_length'));
	if(ret != null) 
		return ret;
	
	//DEBUG
	//console.log("Globals read from file: {Root=" + this.globals.root + ", axis_length=" + this.globals.axis_length +"}");
};

/**
 * Method that parses elements of one block (Views) and stores information in a specific data structure (perspectiveList)
 * perspectiveList is a list of Objects of type MyPerspective.
 */
MySceneGraph.prototype.parseViews = function(rootElement) {

	var views_elems = rootElement.getElementsByTagName('views');		//ELEMENT 1

	//errors
	if (views_elems == null  || views_elems.length==0) 
	{
		return "'View' element is missing.";
	}
	var nnodes = views_elems[0].children.length; // number of perspectives
	if (nnodes.length == 0) 
	{
		return "Zero child elements at 'views'.";
	}
	
	//default perspective
	var defaultId = this.reader.getString(views_elems[0], 'default');

	//Each perspective...
	for (var i=0; i < nnodes; i++)
	{
		var tempP = views_elems[0].children[i];
		
		if(tempP.nodeName != 'perspective')
		{
			return "Unknown child element found at the 'views'.";
		}

		var perspective = new MyPerspective(); //Creates a nem object MyPerspective

		//Processes and gathers the perspective information
		var id = this.reader.getString(tempP, 'id');

		if(!this.perspectiveList.has(id))	//ok if it doesn't exist already
		{	
			perspective.setId(id);
		}
		else
			return "id repetead at 'views'!";
		
		// If the defaultId is not defined then this perspective is the default one		
		if (defaultId == "" && i == 0)	
			defaultId = id;

		if (defaultId == id)	
			perspective.setDefault(true);
			
		perspective.setNear(this.reader.getFloat(tempP, 'near'));
		perspective.setFar(this.reader.getFloat(tempP, 'far'));
		perspective.setAngle(this.reader.getFloat(tempP, 'angle')*Math.PI*2/360);

		//Gathers the children values <to> and <from>
		if(tempP.children.length != 2)
		{
			return "Perspective element does not have two children elements.";
		}
		
		var a,b,c;
		var elem = tempP.children[0];

		a = this.reader.getFloat(elem, 'x');
		b = this.reader.getFloat(elem, 'y');
		c = this.reader.getFloat(elem, 'z');

		//sets point from perspective
		perspective.setFromPoint(new MyPoint(a,b,c));

		elem = tempP.children[1];

		a = this.reader.getFloat(elem, 'x');
		b = this.reader.getFloat(elem, 'y');
		c = this.reader.getFloat(elem, 'z');

		//sets point to perspective
		perspective.setToPoint(new MyPoint(a,b,c));

		//adds the perspective to the list
		this.perspectiveList.set(id, perspective);
	}

	/*
	//DEBUG
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

/**
 * Method that parses elements of one block (ILUMINATION) and stores information in a specific data structure (MyGlobals)
 */
MySceneGraph.prototype.parseIllumination = function(rootElement) {

	var illumination_elems =  rootElement.getElementsByTagName('illumination');	//ELEMENT 2
	
	//errors
	if (illumination_elems == null)
	{
		return "Ilumination element is missing.";
	}
	if (illumination_elems.length != 1) 
	{
		return "Either zero or more than one 'ilumination' element found.";
	}

	//get first illumination child from block <illumination>
	var illumination = illumination_elems[0];

	this.globals.setDoublesided(this.reader.getFloat(illumination, 'doublesided'));
	this.globals.setLocal(this.reader.getFloat(illumination, 'local'));

	var n_illumination = illumination_elems[0].children.length;

	//we just want background and ambient
	if (n_illumination != 2) 
	{
		return "There are more/less components then ambient and background on illumination";
	}

	//ambient
	var temp = illumination_elems[0].children[0];

	var ambient = new MyColor(this.reader.getFloat(temp, 'r'),
								this.reader.getFloat(temp, 'g'),
								this.reader.getFloat(temp, 'b'),
								this.reader.getFloat(temp, 'a'));
	this.globals.setAmbient(ambient);

	//background
	temp = illumination_elems[0].children[1];

	var background = new MyColor(this.reader.getFloat(temp, 'r'),
								this.reader.getFloat(temp, 'g'),
								this.reader.getFloat(temp, 'b'),
								this.reader.getFloat(temp, 'a'));
	this.globals.setBackground(background);
	
	//DEBUG
	/*console.log("Illumination read from file: {Doublesided=" + this.globals.doublesided + ", local=" + this.globals.local +"}");
	  ambient.printInfo();
	  background.printInfo();*/

}

/**
 * Method that parses elements of one block (LIGHTS) and stores information in a specific data structure (lightsList).
 * lightsList is a list of Objects of type MyLight.
 */
MySceneGraph.prototype.parseLights = function(rootElement) {

	var lights_elems =  rootElement.getElementsByTagName('lights');		//ELEMENT 3

	//errors
	if (lights_elems == null) 
	{
		return "Lights element is missing.";
	}
	if (lights_elems.length != 1) 
	{
		return "Either zero or more than one 'lights' element found.";
	}

	n_lights = lights_elems[0].children.length;	//number of lights

	if (n_lights == 0) 
	{
		return "There are zero lights";
	}
	if(n_lights > 8)
	{
		console.log("WARNING: there are too many lights in this scene!\nThe maximum is 8, so there will be displayed only the first 8 lights.")
		n_lights = 8;
	}
	
	var id, enable, location, ambient,diffuse, specular, angle, target, exponent;
	var temp;
	var spot;

	var lights;

	//Each Light ...
	for(var i = 0; i < n_lights; i++){

		lights = lights_elems[0].children[i];

		if(lights.children.length == 4){	//OMNI
			spot = 0;
		}
		else{								//SPOT
			spot = 1;
		}
		
		//verifies if 'id' is unique on lightsList
		id = this.reader.getString(lights, 'id');
		
		for(var i = 0; i < this.lightsList.length; i++)
		{
			
			if(this.lightsList[i].getId() == id)
				return "id "+id+" from block 'lights' already exists!";
			
		}
		
		enable = this.reader.getFloat(lights, 'enabled');

		//extra elements for spot Light
		if(spot == 1){
			angle = this.reader.getFloat(lights, 'angle')*Math.PI*2/360;
			exponent = this.reader.getFloat(lights, 'exponent');

			lights = lights_elems[0].children[i].children[0];
			target = new MyPoint(this.reader.getFloat(lights, 'x'),
								this.reader.getFloat(lights, 'y'),
								this.reader.getFloat(lights, 'z'));

			lights = lights_elems[0].children[i].children[1];
			location = [this.reader.getFloat(lights, 'x'),
						this.reader.getFloat(lights, 'y'),
						this.reader.getFloat(lights, 'z')];
		}
		else{
			lights = lights_elems[0].children[i].children[0];
			location = [this.reader.getFloat(lights, 'x'),
						this.reader.getFloat(lights, 'y'),
						this.reader.getFloat(lights, 'z'),
						this.reader.getFloat(lights, 'w')];
		}
		
		lights = lights_elems[0].children[i].children[1 + spot];
		ambient = new MyColor(this.reader.getFloat(lights, 'r'),
								this.reader.getFloat(lights, 'g'),
								this.reader.getFloat(lights, 'b'),
								this.reader.getFloat(lights, 'a'));

		lights = lights_elems[0].children[i].children[2 + spot];
		diffuse = new MyColor(this.reader.getFloat(lights, 'r'),
								this.reader.getFloat(lights, 'g'),
								this.reader.getFloat(lights, 'b'),
								this.reader.getFloat(lights, 'a'));

		lights = lights_elems[0].children[i].children[3 + spot];
		specular = new MyColor(this.reader.getFloat(lights, 'r'),
								this.reader.getFloat(lights, 'g'),
								this.reader.getFloat(lights, 'b'),
								this.reader.getFloat(lights, 'a'));

		//Creates a MyLight object and adds it to the lights list
		if(spot == 1){ //SPOT
			this.lightsList.push(new MyLight(id,enable,location,ambient,diffuse,specular,angle,exponent,target));
		}
		else{			//OMNI
			this.lightsList.push(new MyLight(id,enable,location,ambient,diffuse,specular));
		}

		//DEBUG
		//this.lightsList.get(id).printInfo();
	}
	
}

/**
 * Method that parses elements of one block (Textures) and stores information in a specific data structure (texturesList).
 * texturesList is a list of Objects of type MyTexture.
 */
MySceneGraph.prototype.parseTextures = function(rootElement) {

	var texture_elems =  rootElement.getElementsByTagName('textures');	//ELEMENT 4

	//errors
	if (texture_elems == null || texture_elems.length != 1) 
	{
		return "'Texture' element is missing.";
	}
	var nnodes = texture_elems[0].children.length;	//number of textures

	if(nnodes == 0)
	{
		return "Zero 'texture' elements";
	}

	//Each texture...
	for (var i=0; i < nnodes; i++)
	{
		var temp = texture_elems[0].children[i];
		
		if(temp.nodeName != 'texture')
		{
			return "Unknown child element found at the 'textures' element.";
		}

		//checks if the id already exists on texturesList
		var id = this.reader.getString(temp, 'id');

		if(this.texturesList.has(id))
		{
			return "id "+id+" from block 'textures' already exists!";
		}
		if(id == "inherit" || id == "none")
		{
			return "Invalid id for a 'texture'";
		}

		var file = this.reader.getString(temp, 'file');
		var length_t = this.reader.getFloat(temp, 'length_t');
		var length_s = this.reader.getFloat(temp, 'length_s');

		//creates the texture
		var texture = new MyTexture(id,file,length_t,length_s);

		//adds to the texture list
		this.texturesList.set(id,texture);
	}
/*
	//DEBUG
	for (var [id, value] of this.texturesList) {
  		console.log(id);
  		console.log("Textura "+value.getId() + " , length_t = "+value.getLengthT()+" , length_s = "+value.getLengthS());
	}
*/
};

/**
 * Method that parses elements of one block (Materials) and stores information in a specific data structure (materialsList).
 * materialsList is a list of Objects of type MyMaterial.
 */
MySceneGraph.prototype.parseMaterials = function(rootElement) {

	var material_elems =  rootElement.getElementsByTagName('materials');	//ELEMENT 5
	
	//errors
	if (material_elems == null || material_elems.length == 1) 
	{
		return "'materials' element is missing or more than one block 'materials'.";
	}
	var nnodes = material_elems[0].children.length;	//number of materials

	if(nnodes == 0)
	{
		return "Zero 'material' elements, 'materials' is empty!";
	}

	//Each material ...
	for (var i=0; i < nnodes; i++)
	{
		var temp = material_elems[0].children[i];
		
		if(temp.nodeName != 'material')
		{
			return "Unknown child element found at the 'materials' element.";
		}

		//verifies repetead id
		var id = this.reader.getString(temp, 'id');

		if(this.materialsList.has(id)) //existe este id
		{ 
			return "id "+id+" from block 'materials' already exists!";
		}
		if(id == "inherit")
		{
			return "'material' has an invalid id";
		}
		
		//creates a MyMaterial object
		var material = new MyMaterial(id);

		//Checks the material information (5 tags under material)
		if(temp.children.length != 5)
		{
			return "'material' has a different number of child elements.";
		}
		for(var j = 0; j < 4; j++)
		{
			var r,g,b,a;
			var child = temp.children[j];

			r = this.reader.getFloat(child, 'r');
			g = this.reader.getFloat(child, 'g');
			b = this.reader.getFloat(child, 'b');
			a = this.reader.getFloat(child, 'a');

			if(child.nodeName == 'emission') material.setMyEmission(r,g,b,a);
			else if(child.nodeName == 'ambient') material.setMyAmbient(r,g,b,a);
			else if(child.nodeName == 'diffuse') material.setMyDiffuse(r,g,b,a);
			else if(child.nodeName == 'specular') material.setMySpecular(r,g,b,a);
		}

		material.setMyShininess(this.reader.getFloat(temp.children[4], 'value'));

		//adds to the materialsList
		this.materialsList.set(id,material);
	}

/*
	//DEBUG
	for (var [id, value] of this.materialsList) {
  		console.log(id);
  		console.log("Material "+ value.getId()); //acabar isto?
  	}
*/
};

/**
 * Method that parses elements of one block (TRANSFORMATIONS) and stores information in a specific data structure (transformationsList).
 * transformationsList is a list of Objects of type MyTransformation.
 */
MySceneGraph.prototype.parseTransformations = function(rootElement) {

	var transformations_elems =  rootElement.getElementsByTagName('transformations');	//ELEMENT 6
	
	//errors
	if (transformations_elems == null || transformations_elems.length != 1) 
	{
		return "'transformations' element is missing.";
	}

	var n_transformation = transformations_elems[0].children.length;	//number of transformations

	if(n_transformation == 0)
	{
		return "Zero 'transformation' elements";
	}

	var final_t; //final transformation

	//Each transformation...
	for (var i=0; i < n_transformation; i++)
	{
		var transformation = transformations_elems[0].children[i];
		
		if(transformation.nodeName != 'transformation')
		{
			return "Unknown child element found at the 'transformation' element.";
		}

		var id = this.reader.getString(transformation, 'id')

		//Verify if id already exists
		if(this.transformationsList.has(id))
		{ 	
			return "id "+id+" from block 'transformations' already exists!";
		}

		//Identity matrix at the beggining
		final_t = new MyTransformation(id);

		//error (we need at least 1 transformation)
		if(transformation.children.length == 0)
		{
			return "Transformation without information!";
		}

		//multiply all transformations to final_t
		for(var j = 0; j < transformation.children.length ; j++)
		{
			var tag_name = transformation.children[j].tagName;

			switch(tag_name){
				case "translate":
					final_t.translate(this.reader.getFloat(transformation.children[j], 'x'),
									  this.reader.getFloat(transformation.children[j], 'y'),
									  this.reader.getFloat(transformation.children[j], 'z'));
					break;
				case "rotate":
					final_t.rotate(this.reader.getString(transformation.children[j], 'axis'),
								this.reader.getFloat(transformation.children[j], 'angle')*Math.PI*2/360);
					break;
				case "scale":
					final_t.scale(this.reader.getFloat(transformation.children[j], 'x'),
									  this.reader.getFloat(transformation.children[j], 'y'),
									  this.reader.getFloat(transformation.children[j], 'z'));
					break;
				default:
					return "inexisting tag name";
			}
		}
		//adds the final matrix at transformationsList map
		this.transformationsList.set(id,final_t);

		//DEBUG
		//this.transformationsList.get(id).display();
	}
}

/**
 * Method that parses elements of one block (PRIMITIVES) and stores information in a specific data structure (primitivesList).
 * primitivesList is a list of Objects of type MyPrimitive.
 */
MySceneGraph.prototype.parsePrimitives = function(rootElement) {

	var primitives_elems =  rootElement.getElementsByTagName('primitives');	//ELEMENT 7
	
	//errors
	if (primitives_elems == null || primitives_elems.length != 1) 
	{
		return "'primitives' element is missing.";
	}

	var n_primitives = primitives_elems[0].children.length;	//number of primitives

	if(n_primitives == 0)
	{
		return "zero 'primitive' elements";
	}

	var primitive,prim,tagName;

	//Each primitice...
	for(var i = 0; i < n_primitives; i++){

		primitive = primitives_elems[0].children[i];

		//error -> just one element for primitive
		if(primitive.children.length != 1)
		{
			return "more/less than one primitive component";
		}
		
		tagName = primitive.children[0].tagName;

		var id = this.reader.getString(primitive, 'id');

		//Check if the id already exists
		if(this.primitivesList.has(id))	
		{
			return "id "+id+" from block 'primitives' already exists!";
		}

		//different primitives for different tag names
		switch(tagName){
			case "rectangle":{
				var p1 = new MyPoint(this.reader.getFloat(primitive.children[0], 'x1'),
								 	 this.reader.getFloat(primitive.children[0], 'y1'),
								 	 0);
				var p2 = new MyPoint(this.reader.getFloat(primitive.children[0], 'x2'),
								 	 this.reader.getFloat(primitive.children[0], 'y2'),
								 	 0);

				prim = new MyRectangleData(id,p1,p2);
				break;
			}
			case "triangle":{
				var p1 = new MyPoint(this.reader.getFloat(primitive.children[0], 'x1'),
								 	 this.reader.getFloat(primitive.children[0], 'y1'),
								 	 this.reader.getFloat(primitive.children[0], 'z1'));

				var p2 = new MyPoint(this.reader.getFloat(primitive.children[0], 'x2'),
								 	 this.reader.getFloat(primitive.children[0], 'y2'),
								 	 this.reader.getFloat(primitive.children[0], 'z2'));

				var p3 = new MyPoint(this.reader.getFloat(primitive.children[0], 'x3'),
								 	 this.reader.getFloat(primitive.children[0], 'y3'),
								 	 this.reader.getFloat(primitive.children[0], 'z3'));

				prim = new MyTriangleData(id,p1,p2,p3);
				break;
			}
			case "cylinder": {
				var b,t,h,sl,st;

				var b = this.reader.getFloat(primitive.children[0], 'base');
				var t = this.reader.getFloat(primitive.children[0], 'top');
				var h = this.reader.getFloat(primitive.children[0], 'height');
				var sl = this.reader.getFloat(primitive.children[0], 'slices');
				var st = this.reader.getFloat(primitive.children[0], 'stacks');

				prim = new MyCylinderData(id,b,t,h,sl,st);
				break;
			}
			case "sphere": {
				var r,sl,st;
				r = this.reader.getFloat(primitive.children[0], 'radius');
				sl = this.reader.getFloat(primitive.children[0], 'slices');
				st = this.reader.getFloat(primitive.children[0], 'stacks');

				prim = new MySphereData(id,r,sl,st);
				break;
			}
			case "torus" : {
				var inn, o, l,sl;

				inn = this.reader.getFloat(primitive.children[0], 'inner');
				o = this.reader.getFloat(primitive.children[0], 'outer');
				sl = this.reader.getFloat(primitive.children[0], 'slices');
				l = this.reader.getFloat(primitive.children[0], 'loops');
				
				prim = new MyTorusData(id,inn,o,sl,l);
				break;
			}
		}
		this.primitivesList.set(id,prim);
		
		//DEBUG
		//this.primitivesList.get(id).printInfo();
	}
}

/**
 * Method that parses elements of one block (Components) and stores information in a specific data structure (ComponentList)
 */
MySceneGraph.prototype.parseComponents = function(rootElement) {

	//<components>
	var components_elems =  rootElement.getElementsByTagName('components');	//ELEMENT 8 
	
	//errors
	if (components_elems == null) 
	{
		return "components element is missing.";
	}
	if (components_elems.length != 1) 
	{
		return "either zero or more than one 'components' element found.";
	}

	var n_components = components_elems[0].children.length;

	//Each component ...
	for(var i = 0 ; i < n_components ; i++){

		//<component>
		component = components_elems[0].children[i];

		if(component.nodeName != 'component')
		{
			return "Unknown 'child' element found at the 'components' element."; 
		}
		
		var id = this.reader.getString(component, 'id');	

		//Checks if the id already exists
		if(this.componentsList.has(id))
			if(this.componentsList.get(id).isDefined())	//already has been processed
			{
				return "this component "+id+" is already defined!";
			}
	
		//Checks the number of children (tags) inside component
		if(component.children.length != 4)
		{
			return "The component element with id = " + id + " does not have exactly four children elements.";			
		}
	
		//<transformation>
		var matrixId;
		var transformation = component.children[0];

		var n_transformations = transformation.children.length;		//number of transformations

		/*Error for : 
			 - more than one <transformationref>
			 - just one <transformationref> and <rotate>/<scale>/<translate> transformations
		*/
		if(	(n_transformations > 1 && transformation.getElementsByTagName("transformationref").length == 1))
		{
			return "component with 'transformationref' and rot/scale/trans tranformations at the same time.";
		}
		if(transformation.getElementsByTagName("transformationref").length > 1)
		{
			return "'component' with more than one transformationref tag";
		}

		// Identidy matrix
		if(n_transformations == 0 )
		{
			var temp = new MyTransformation("identity");
			this.transformationsList.set("identity",temp);	//new

			var transfComponent = this.transformationsList.get("identity"); // transformation from component
		}
		//<transformationref> (only one)
		else if(transformation.getElementsByTagName("transformationref").length == 1) 
		{
			matrixId = this.reader.getString(transformation.getElementsByTagName("transformationref")[0], 'id');
			
			if(!this.transformationsList.has(matrixId)) //not found
			{ 
				return "transformationref id not found";
			}
			var transfComponent = this.transformationsList.get(matrixId);
		}
		//<rotate>/<scale>/<translate>
		else		
		{
			matrixId = "default_"+id;
			var transfComponent = new MyTransformation(matrixId);

			//Each rot/scale/transl transformation...
			for(var j = 0; j < n_transformations ;j++){
		
				var tag_name = transformation.children[j].tagName;
				
				switch(tag_name){
					case "translate":{
						transfComponent.translate(this.reader.getFloat(transformation.children[j],'x'),
										  			this.reader.getFloat(transformation.children[j],'y'),
										  			this.reader.getFloat(transformation.children[j],'z'));
						console.log("translate - " + transfComponent.getMatrix());
						break;
					}
					case "rotate":{
						transfComponent.rotate(this.reader.getString(transformation.children[j],'axis'),
						this.reader.getFloat(transformation.children[j],'angle')*Math.PI*2/360);
						console.log("rotate - " + transfComponent.getMatrix());
						break;
					}
					case "scale":{
						transfComponent.scale(this.reader.getFloat(transformation.children[j],'x'),
										  			this.reader.getFloat(transformation.children[j],'y'),
										  			this.reader.getFloat(transformation.children[j],'z'));
						console.log(transfComponent.getMatrix());
						break;
					}
				
				}
			
			}

			//Adds the nem transformation to the list (identity or transformationref or new)
			this.transformationsList.set(matrixId,transfComponent);	
		}

		//<materials>
		var materials, n_materials, materialId;
		var materialsComponent = [];

		materials = component.children[1];

		n_materials = materials.children.length;	//number of materials

		//Each material...
		for(var j = 0; j < n_materials ; j++){
			
			materialId = this.reader.getString(materials.children[j], 'id');
			
			/*Error
			 - id doesn't found on materialsList and id != "inherit" */
			if(!this.materialsList.has(materialId))
			{
				if(materialId != "inherit")
					return "Components '" + id + "' materialsId '" +materialId + "' not found";
				else
				{
					//It will be processed later on XML scene
					materialsComponent.push("inherit"); //adds to the list of materials (from component)
				}
			}
			else	
				materialsComponent.push(this.materialsList.get(materialId));	 //adds to the list of materials (from component)
		}

		//<texture>
		var texture = component.getElementsByTagName("texture");
		
		if(texture.length != 1){
			return "Components '" + id + "' has more than one component's texture";
		}

		var textureId = this.reader.getString(texture[0],'id');
		var textureComponent;
		
		//If the texture id doesn't exists (can be an error, "inherit" or "none")
		if(!this.texturesList.has(textureId))
		{
			if(textureId == "inherit" || textureId == "none")
			 	textureComponent = textureId;
			else 
				return "Components '" + id + "' textureId '" + textureId + "' not found";
		}
		else
			textureComponent = this.texturesList.get(textureId);

		//<children>
        var children_elems = component.getElementsByTagName("children");
		var childrenId;
		var childComponent = [];
		var primitiveComponent = [];

        if(children_elems.length != 1)
		{
        	return "Component '" + id + "' has more than one children block";
        }

      	//<componentref>
         var compRef = children_elems[0].getElementsByTagName("componentref"); //number of references to components


		//Each referenced component...
         for(var j = 0; j < compRef.length ;j++)
         {
         	childrenId = this.reader.getString(compRef[j],'id');

         	//If the componentref id exists than adds it to the list of childcomponents of the component
         	if(this.componentsList.has(childrenId))
         		childComponent.push(this.componentsList.get(childrenId));

         	//if id doesn't exists
         	else{
         		var temp = new MyComponent(childrenId,false);	//creates a new component with defined = false
         		this.componentsList.set(childrenId,temp); 		//adds it to the componentsList
				
				//adds the list of children of this componentref
				//adds this new component from the componentsList to the childcomponents of our component
         		childComponent.push(this.componentsList.get(childrenId));
         	}
         }

         //<primitiveref>
         var primitRef = children_elems[0].getElementsByTagName("primitiveref"); //number of primitiveref
		 
		 //For each primitiveref...
         for(var j = 0; j < primitRef.length ;j++)
         {
         	childrenId = this.reader.getString(primitRef[j],'id'); //id do filho do tipo primitiva

			//If the primitive's id exists
         	if(!this.primitivesList.has(childrenId))	
			{
				return "Component '" + id + "' primitiveref '" + childrenPrimitivesId[j] + "' not in the list of primitives";
         	}
         	//adds to the primitivescomponets of the component
         	primitiveComponent.push(this.primitivesList.get(childrenId));
         }

		// If the processing component already exists, than it's updated
        if(this.componentsList.has(id))
		{
        	var comp = this.componentsList.get(id);
			comp.setDefined(true);
        }
        //Or creates a new one that has defined = true
		else
		{
        	var comp = new MyComponent(id,true);
        }

		comp.setTransformation(transfComponent);
        comp.setMaterials(materialsComponent);
       	comp.setTexture(textureComponent);
        comp.setComponents(childComponent);
       	comp.setPrimitives(primitiveComponent);
       		
       	//Adds the component to the componentsList
        this.componentsList.set(id,comp);
		
		if(id == this.globals.root)
			this.root = comp;

		//DEBUG
		//comp.display();
	}
}

/**
 * Method that verifies componentsList.
 *
 * Percorre toda a lista de components e verifica os seus filhos. Para cada component filho verifica se está na lista componentsList.
 * Caso esteja na lista está definido, se nao retorna falso.  
 */
MySceneGraph.prototype.isChildrensDefined = function() {

	for (var [id, value] of this.componentsList) 
	{
		if(!value.isDefined())	//There is a component not defined
			return false;
	}
	return true; 
}

/**
 * Method that verifies if the graph has cycles.
 *
 * Percorre os filhos em profundidade e vai guardando os antecedentes. 
 * Se por acaso for verificado um nó com id igual ao do componente atual na lista de antecessores é porque existe um ciclo.
 */
MySceneGraph.prototype.hasCycles = function(atualComponent, visitedNodes) {
	
	//coloca o component atual como verificado caso nao esteja na lista
	for(var i = 0; i < visitedNodes.length; i++){
		if(atualComponent.getId() == visitedNodes[i])
			return true;
	}
	visitedNodes.push(atualComponent.getId());
	
	//verifica os filhos do component atual
	var list = atualComponent.getComponentsChilds();
	for(var j = 0; j < list.length; j++)
	{
		if(this.hasCycles(list[j],visitedNodes))
			return true;
		visitedNodes.pop();
	}
	
	return false; //retorna falso se nao tiver ciclos
}

/**
 * GETS
 */
MySceneGraph.prototype.getGlobals = function() {
	return this.globals;
}

MySceneGraph.prototype.getRoot = function() {
	return this.root;
}