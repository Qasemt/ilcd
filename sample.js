/**
 * Created by Taaheri on 2015-09-27.
 */
var _lcd = require("ilcd").iLCD;

var ic = 0;
setTimeout(function() {
    _lcd.BackLightOn();
},1000);
setTimeout(function() {
    _lcd.lineOut("hello worlkd", 2);
},3000);
setTimeout(function() {
    _lcd.ClearDisplay();
},5000);
setTimeout(function() {
    _lcd.lineOut("22222 worlkd222", 1);
},7000);
setTimeout(function() {
    _lcd.BackLightOff();
},8000);
setTimeout(function(){
    _lcd.BackLightOn();
    console.log("on");
},9000);

setTimeout(function(){
    _lcd.DisplayOff();
    console.log("dis off");
},10000);

setTimeout(function(){
    _lcd.DisplayOn();
    console.log("dis On");
},14000);

setTimeout(function() {
    _lcd.lineOut("end of story", 1);
},15000);


/*
setInterval(function () {

    _lcd.lineOut("Hi LCD ", 1);

    var now = new Date();
    var dateFormat = now.toISOString().substr(0, 10);
    //  by default address = 0x27
    // _lcd.SetAddress(0x22);
    _lcd.lineOut("T:" + dateFormat, 2);

    ic++;
}, 1000);

    */