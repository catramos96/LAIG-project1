/**
 * MyInterface
 * @constructor
 */
 
 //call CGFinterface constructor 
function MyInterface() {
	CGFinterface.call(this);
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
	
/*	var group = this.gui.addFolder("Lights");
	group.open();
	for(i = 0; i < 5; i++)
		group.add(this.scene, 'light'+i);
		
	this.gui.add(this.scene, 'clockAnimation');


	droneAppearanceList =  {Red: 0, Hal: 1, Chuck: 2, Blue: 3, 
Bomb: 4, Stella: 5, Bubbles: 6, Matilda: 7, Terrence: 8, MightyEagle: 9}; 

	this.gui.add(this.scene, 'droneAppearance',droneAppearanceList);

	this.gui.add(this.scene, 'droneSpeed', 0.1, 2);
*/
	return true;
};

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
		//Rotation

		//Left - A/a
		case 65: case 97:
		{
			/*this.scene.drone.setState("RotLeft");
			this.scene.rotDrone(Math.PI/24);*/
			break;
		}
		//Right - D/d
		case 68: case 100:
		{
			/*this.scene.drone.setState("RotRight");
			this.scene.rotDrone(-Math.PI/24);*/
			break;
		}

	};
};
