function iLCD() {
    var i2c = require('i2c');
    var address = 0x27;


// commands
    var LCD_CLEARDISPLAY = 0x01;
    var LCD_RETURNHOME = 0x02;
    var LCD_ENTRYMODESET = 0x04;
    var LCD_DISPLAYCONTROL = 0x08;
    var LCD_CURSORSHIFT = 0x10;
    var LCD_FUNCTIONSET = 0x20;
    var LCD_SETCGRAMADDR = 0x40;
    var LCD_SETDDRAMADDR = 0x80;

//flags for display entry mode
    var LCD_ENTRYRIGHT = 0x00;
    var LCD_ENTRYLEFT = 0x02;
    var LCD_ENTRYSHIFTINCREMENT = 0x01;
    var LCD_ENTRYSHIFTDECREMENT = 0x00;

//flags for display on/off control
    var LCD_DISPLAYON = 0x04;
    var LCD_DISPLAYOFF = 0x00;
    var LCD_CURSORON = 0x02;
    var LCD_CURSOROFF = 0x00;
    var LCD_BLINKON = 0x01;
    var LCD_BLINKOFF = 0x00;

// flags for display/cursor shift
    var LCD_DISPLAYMOVE = 0x08;
    var LCD_CURSORMOVE = 0x00;
    var LCD_MOVERIGHT = 0x04;
    var LCD_MOVELEFT = 0x00;

//flags for function set
    var LCD_8BITMODE = 0x10;
    var LCD_4BITMODE = 0x00;
    var LCD_2LINE = 0x08;
    var LCD_1LINE = 0x00;
    var LCD_5x10DOTS = 0x04;
    var LCD_5x8DOTS = 0x00;

// flags for backlight control
    var LCD_BACKLIGHT = 0x08;
    var LCD_NOBACKLIGHT = 0x00;

    var En = 0x4;//0b00000100 // Enable bit
    var Rw = 0x2;//0b00000010 // Read/Write bit
    var Rs = 0x1;//0b00000001 // Register select bit
    var self = this;
    this.lcd_device = undefined;
//----------- Constractor------------
    self.lcd_device = new i2c(address, {device: '/dev/i2c-1'});

    var WritRaw = function (RawData) {
        self.lcd_device.write(RawData, function (err) {
        });
    };
    //clocks EN to latch command
    function lcdStrobe(data) {
        WritRaw([(data | En | LCD_BACKLIGHT)]);
        // sleep(.0005)
        WritRaw(((data & ~En) | LCD_BACKLIGHT));
        // sleep(.0001)
    }
    var ClearLine = function (line) {

        var str = "";
        for (ii = 1; ii <= 16; ii++) {
            str += " ";
        }
        self.lineOut(str, line);
    };

    function lcdWrite4(data) {

        WritRaw(Buffer([(data | LCD_BACKLIGHT)]));
        WritRaw(Buffer([(data | LCD_DISPLAYON | LCD_BACKLIGHT)]));
        WritRaw(Buffer([((data & ~LCD_DISPLAYON) | LCD_BACKLIGHT)]));
        //  lcdStrobe(data);

    }

    function lcdWrite(data, mode) {
        lcdWrite4(mode | (data & 0xF0));
        lcdWrite4(mode | ((data << 4) & 0xF0));
    }

    function LCDINIT() {
        if (is_rpi_available) {
            lcdWrite(0x03, 0);
            lcdWrite(0x03, 0);
            lcdWrite(0x03, 0);
            lcdWrite(0x02, 0);

            lcdWrite(LCD_FUNCTIONSET | LCD_2LINE | LCD_5x8DOTS | LCD_4BITMODE, 0);
            lcdWrite(LCD_DISPLAYCONTROL | LCD_DISPLAYON, 0);
            lcdWrite(LCD_CLEARDISPLAY, 0);
            lcdWrite(LCD_ENTRYMODESET | LCD_ENTRYLEFT, 0);
        }
    }

    this.ShowTime = function () {

        //  var now = new Date();
        //  if (_LastMinuteValue != now.getMinutes()) {
        var j = Jdate.JDate();
        var persianDateStr = j.toString('yy/MM/ddHH:mm:ss');

        self.lineOut(persianDateStr, 2);
        j = null;

        // _LastMinuteValue = now.getMinutes();
        //   }

    };

    /*
     * Write a string to the specified LCD line.
     */
    this.lineOut = function (str, addr) {
        if (addr == 1)
            lcdWrite(0x80, 0);
        if (addr == 2)
            lcdWrite(0xC0, 0);
        if (addr == 3)
            lcdWrite(0x94, 0);
        if (addr == 4)
            lcdWrite(0xD4, 0);


        str.split('').forEach(function (c) {
            lcdWrite(c.charCodeAt(0), 1);
        });
    };
    LCDINIT();
  //  lcdWrite(LCD_CLEARDISPLAY, 0);
}


module.exports.iLCD = new iLCD();

