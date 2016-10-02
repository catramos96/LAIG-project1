/*
 * Data Struct of Light
 */

 function MyLight(id,enable,location,ambient,diffuse,specular,angle,exponent,target){
   this.id = id;
   this.enable = enable;

   if(angle != null){           //SPOT
     this.spot = 1;
     this.angle = angle;
     this.exponent = exponent;
     this.target = target;
   }
   
    else{                       //OMNI
     this.spot = 0;
     this.angle = 0;
     this.exponent = 0;
     this.target = new MyPoint(0,0,0);
    }

   this.location = location;
   this.ambient = ambient;
   this.diffuse = diffuse;
   this.specular = specular;
 }

  /*
   * PRINT
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
   this.location.printInfo();
   this.ambient.printInfo();
   this.diffuse.printInfo();
   this.specular.printInfo();
 }

  /*
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
 