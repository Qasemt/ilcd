# ilcd

## Install
Driver for LCD [1602] , [2004] .for Raspberry Pi and BeagleBone.

````bash
$ npm install ilcd
````
##Usage
````javascript
var _lcd = require("./ilcd").iLCD;
//by default address = 0x27
//_lcd.SetAddress(0x22); 
_lcd.lineOut("Hello world...", 2);
````
