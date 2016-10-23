/**
 * MyInterface
 * @constructor
 */
function MyInterface(scene) {
	CGFinterface.call(this);
	this.scene = scene;
};

// interface object
MyInterface.prototype = Object.create(CGFinterface.prototype);
MyInterface.prototype.constructor = MyInterface;

/**
 * init
 * @param {CGFapplication} application
 */
MyInterface.prototype.init = function(application) {
	// call CGFinterface init
	CGFinterface.prototype.init.call(this, application);
	
	// init GUI
	this.gui = new dat.GUI();

	//LightsGroup to switch on/off lights
	this.omniGroup = this.gui.addFolder("Omni Lights");
	this.omniGroup.open();
	this.spotGroup = this.gui.addFolder("Spot Lights");
	this.spotGroup.open();

	//Methods to update camera/materials
	this.gui.add(this.scene, 'updateCamera');
	this.gui.add(this.scene, 'updateMaterials');

	return true;
};

/**
 * Adds a light to the group
 */
MyInterface.prototype.addLights = function(id, isSpot) {
	
	if(isSpot)	this.spotGroup.add(this.scene, id);
	else	this.omniGroup.add(this.scene, id);
}

/**
 * ProcessKeyboard
 * @param event {Event}
 */
MyInterface.prototype.processKeyboard = function(event) {
	// call CGFinterface default code (omit if you want to override)
	CGFinterface.prototype.processKeyboard.call(this,event);
	
	// Check key codes
	switch (event.keyCode)
	{
		case 86: case 118: //Change Camera keys: V/v
			this.scene.updateCamera();
			break;
		case 77: case 109: //Change Material keys: M/m
			this.scene.updateMaterials();
			break;
		default:
			break;
	};
};