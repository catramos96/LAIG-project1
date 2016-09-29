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
	this.perspectiveList = [];  			//lista com as diversas perspetivas
	
	/*
	 * Read the contents of the xml file, and refer to this class for loading and error handlers.
	 * After the file is read, the reader calls onXMLReady on this object.
	 * If any error occurs, the reader calls onXMLError on this object, with an error message
	 */
	 
	this.reader.open('scenes/'+filename, this);  
}

/*
 * Callback to be executed after successful reading
 */
MySceneGraph.prototype.onXMLReady=function() 
{
	console.log("XML Loading finished.");
	var rootElement = this.reader.xmlDoc.documentElement; //neste caso, dsx
	
	// Here should go the calls for different functions to parse the various blocks
	var error = this.parseGlobals(rootElement);
	var error1 = this.parseViews(rootElement);

	if ((error || error1) != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
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
	this.globals.root = this.reader.getString(scene, 'root');
	this.globals.axis_length = this.reader.getFloat(scene, 'axis_length');

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

	//percorre cada perspetiva
	for (var i=0; i < nnodes; i++)
	{
		var tempP = views_elems[0].children[i]; // informacao sobre a perspetiva

		var perspective = new MyPerspective(this.scene);

		var ppp = new MyPoint(this.scene);

		// process each element and store its information
		perspective.id = tempP.attributes.getNamedItem("id").value;
		perspective.near = tempP.attributes.getNamedItem("near").value;
		perspective.far = tempP.attributes.getNamedItem("far").value;
		perspective.angle = tempP.attributes.getNamedItem("angle").value;


		// ler os filhos 'from' e 'to'

		var a,b,c;
		
		//vai buscar os valores dos filhos e coloca-os na perspetiva
		var elem = tempP.children[0];
		perspective.fromPoint.x = elem.attributes.getNamedItem("x").value;
		perspective.fromPoint.y = elem.attributes.getNamedItem("y").value;
		perspective.fromPoint.z = elem.attributes.getNamedItem("z").value;

		//coloca-os na perspetiva
		//perspective.fromPoint.setCoordinates(a,b,c);

		elem = tempP.children[1];
		perspective.toPoint.x = elem.attributes.getNamedItem("x").value;
		perspective.toPoint.y = elem.attributes.getNamedItem("y").value;
		perspective.toPoint.z = elem.attributes.getNamedItem("z").value;

		//coloca-os na perspetiva
		//perspective.toPoint.setCoordinates(a,b,c);

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

}


/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


