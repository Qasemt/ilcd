/**
 * Created by Taaheri on 2015-09-27.
 */
var _lcd = require("./ilcd").iLCD;

var ic = 0;
setInterval(function () {

    _lcd.lineOut("Hi LCD ", 1);

    var now = new Date();
    var dateFormat = now.toISOString().substr(0, 10);
    _lcd.lineOut("T:" + dateFormat, 2);

    ic++;
}, 1000);