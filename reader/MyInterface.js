/**
 * MyInterface
 * @constructor
 */
function MyInterface(scene) {
	CGFinterface.call(this);
	this.scene = scene;
};

// objeto do tipo interface
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

	//lights group para ligar e desligar cada luz
	this.lightsGroup = this.gui.addFolder("Lights");
	this.lightsGroup.open();

	// adiciona os metodos para fazer update das camaras e dos materiais
	this.gui.add(this.scene, 'updateCamera');
	this.gui.add(this.scene, 'updateMaterials');

	return true;
};

/**
 * Adiciona uma luz ao grupo
 */
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
	
	// Check key codes~
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