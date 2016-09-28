
function MySceneGraph(filename, scene) {
	this.loadedOk = null;
	
	// Establish bidirectional references between scene and graph
	this.scene = scene;
	scene.graph=this;
		
	// File reading 
	this.reader = new CGFXMLreader();

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
	var error = this.parseScene(rootElement);

	if (error != null) {
		this.onXMLError(error);
		return;
	}	

	this.loadedOk=true;
	
	// As the graph loaded ok, signal the scene so that any additional initialization depending on the graph can take place
	this.scene.onGraphLoaded();
};



/*
 * Example of method that parses elements of one block and stores information in a specific data structure
 */
MySceneGraph.prototype.parseScene = function(rootElement) {
	
	// ------ scene ----- //

	var scene_elems =  rootElement.getElementsByTagName('scene');
	if (scene_elems == null) {
		return "scene element is missing.";
	}
	if (scene_elems.length != 1) {
		return "either zero or more than one 'scene' element found.";
	}

	// various examples of different types of access
	var scene = scene_elems[0];
	this.root = this.reader.getString(scene, 'root');
	this.axis_length = this.reader.getFloat(scene, 'axis_length');

	console.log("Globals read from file: {Root=" + this.root + ", axis_length=" + this.axis_length +"}");

	//chama o parseViews ?

};
	
MySceneGraph.prototype.parseViews = function(rootElement) {

	//--------- views ---------- //

	var views_elems = rootElement.getElementsByTagName('views'); 

	if (views_elems == null  || views_elems.length==0) {
		return "views is missing.";
	}

	this.default = this.reader.getString(scene, 'default');

	var nnodes = views_elems[0].children.length; // vai ser um porque só existe uma perspetiva, por agora

	for (var i=0; i< nnodes; i++)
	{
		var e = views_elems[0].children[i]; // varias perspetivas
		this.map = [];

		// process each element and store its information
		this.map["id"] = e.attributes.getNamedItem("id").value;
		this.map["near"] = e.attributes.getNamedItem("near").value;
		this.map["far"] = e.attributes.getNamedItem("far").value;
		this.map["angle"] = e.attributes.getNamedItem("angle").value;

		// ler os filhos 'from' e 'to' guardados em listas

		this.to_list = [];
		this.from_list = [];
		
		//vai buscar os filhos
		var temp = tempList[0].children[i];


		this.to_list[0]=e.attributes.getNamedItem("x").value;

		//fazer console Log
	};




}


/*
 * Callback to be executed on any read error
 */
 
MySceneGraph.prototype.onXMLError=function (message) {
	console.error("XML Loading Error: "+message);	
	this.loadedOk=false;
};


