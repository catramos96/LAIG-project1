/**
 * MyInterface
 * @constructor
 */
 
 //call CGFinterface constructor 
function MyInterface(scene) {
	CGFinterface.call(this);
	this.scene = scene;
};

MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI. For more information on the methods, check:
	//  http://workshop.chromeexperiments.com/examples/gui
	
	this.gui = new dat.GUI();

	this.lightsGroup = this.gui.addFolder("Lights");
	this.lightsGroup.open();

	this.gui.add(this.scene, 'updateCamera');
	this.gui.add(this.scene, 'updateMaterials');

	return true;
};

MyInterface.prototype.addLights = function(id) {
	
	this.lightsGroup.add(this.scene, id);
	
}

/**
 * processKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes e.g. here: http://www.asciitable.com/
	// or use String.fromCharCode(event.keyCode) to compare chars
	
	// for better cross-browser support, you may also check suggestions on using event.which in http://www.w3schools.com/jsref/event_key_keycode.asp
	switch (event.keyCode)
	{
		case 86: case 118: //Muda de camara - V/v 
			this.scene.updateCamera();
			break;
		case 77: case 109: //Muda materiais - M/m
			this.scene.updateMaterials();
			break;
		default:
			break;
	

	};
};