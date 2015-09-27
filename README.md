# ilcd
Driver for LCD ( with i2c )  [1602] , [2004] .is Tested in Raspberry Pi and BeagleBone.
## Install
````bash
$ npm install ilcd
````

## Usage
````javascript
var _lcd = require("./ilcd").iLCD;
//  by default address = 0x27
// _lcd.SetAddress(0x22);
 var line =1;

_lcd.lineOut("Hello world...", line);
````
