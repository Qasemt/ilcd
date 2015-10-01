# ilcd
Driver for LCD ( with i2c )  [1602] , [2004] .is Tested in Raspberry Pi and BeagleBone,Cubieboard A20.
## Install
````bash
$ npm install ilcd
````

## Usage
````javascript
var _lcd = require("ilcd").iLCD;
//  by default address = 0x27
// _lcd.SetAddress(0x22);
 var line =1;

_lcd.lineOut("Hello world...", line);


_lcd.ClearLine(line);


_lcd.ClearDisplay();

//_lcd.BackLightOn();
//_lcd.BackLightOff();
//_lcd.DisplayOff();
//_lcd.BackLightOn();


````


### Author:

* Qasem Taheri: Qasemt@gmail.com


### License:
 [The MIT License (MIT)](http://opensource.org/licenses/MIT)