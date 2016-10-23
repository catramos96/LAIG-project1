/**
 * Data Struct of Light
 */
 function MyLight(id,enable,location,ambient,diffuse,specular,angle,exponent,target){

   this.id = id;
   this.enable = enable;

   //spot
   if(angle != null){
		this.spot = 1;
		this.angle = angle;
		this.exponent = exponent;
		this.target = target;
    }
	//omni
    else{
		this.spot = 0;
		this.angle = 0;
		this.exponent = 0;
		this.target = new MyPoint(0,0,0);
    }
	//mutual attributs
	this.location = location;
	this.ambient = ambient;
	this.diffuse = diffuse;
	this.specular = specular;
 }

/**
 * Displays on the console the ligh information
 */
MyLight.prototype.printInfo = function(){   
 
   if(this.spot == 1){
     console.log("Light - Spot; Id - " + this.id + " ; enable - " + this.enable);
     console.log("Angle - " + this.angle + "; Exponent - " + this.exponent);
     this.target.printInfo();
   }
   else{
     console.log("Light - Omni; Id - " + this.id + " ; enable - " + this.enable);
   }
   console.log("Location - " + this.location);

   this.ambient.printInfo();
   this.diffuse.printInfo();
   this.specular.printInfo();
 }

/**
 * GETS
 */
 MyLight.prototype.getId = function(){          // ID
   return this.id;
 }

 MyLight.prototype.getEnable = function(){      // ENABLE
   return this.enable;
 }

 MyLight.prototype.getLocation = function(){    // LOCATION
   return this.location;
 }


 MyLight.prototype.getAmbient = function(){     // AMBIENT
   return this.ambient;
 }

 MyLight.prototype.getDiffuse = function(){     // DIFFUSE
   return this.diffuse;
 }

 MyLight.prototype.getSpecular = function(){    // SPECULAR
   return this.specular;
 }
  
 MyLight.prototype.getAngle = function(){       // ANGLE (only spot or = 0)
   return this.angle;
 }

 MyLight.prototype.getExponent = function(){    // EXPONENT (only exponent or = 0)
   return this.exponent;
 }

 MyLight.prototype.getTarget = function(){      // TARGET (only spot or x,y,z = 0)
   return this.id;
 }

 MyLight.prototype.isSpot = function(){         // SPOT ?
   return this.spot;
 }

 /**
  * Light Initialization
  * Recieves the scene and the index i of light[i] of the scene
  * Initializes the information recieved from the parser
  */
 MyLight.prototype.init = function(scene, i){
	
	scene.lights[i].setPosition(this.location[0],this.location[1],this.location[2],1);
	scene.lights[i].setDiffuse(this.diffuse.getR(),this.diffuse.getG(),this.diffuse.getB(),this.diffuse.getA());
	scene.lights[i].setAmbient(this.ambient.getR(),this.ambient.getG(),this.ambient.getB(),this.ambient.getA());
	scene.lights[i].setSpecular(this.specular.getR(),this.specular.getG(),this.specular.getB(),this.specular.getA());
	
	if(this.isSpot())
	{
		scene.lights[i].setSpotDirection(vec3.distance(vec3.fromValues(this.location[0],this.location[1],this.location[2]),
														vec3.fromValues(this.target.getX(),this.target.getY(),this.target.getZ())));
		scene.lights[i].setSpotCutOff(this.angle);
		scene.lights[i].setSpotExponent(this.exponent);					  
	}
	
	scene.lights[i].setVisible(true);
	
	var bool;

	//Enable?
	if(this.enable){
		scene.lights[i].enable();
		eval("scene."+this.id+"=true");		//adds boolean = true to scene
	}
	else{
		scene.lights[i].disable();
		eval("scene."+this.id+"=false");	//adds boolean = false to scene
	}	
	
	scene.interface.addLights(this.id,this.spot);	//adds the light to the interface folder of lights

 }