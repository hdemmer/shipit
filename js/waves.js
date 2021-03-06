

function makeWave(power, length)
{
    var LENGTH = 100 * length;
    var i = 0;
    this.done = function()
    {
        return i >= LENGTH;
    };
    this.next = function()
    {
        i++;
        var y = Math.sin(i / 10 / length);
        y *= (LENGTH - i) / LENGTH;
        y*=power;
        return y;
    };
    return this;
}

function spawnWave(power)
{
    //if (chargeCurrent > CHARGE_MIN || chargeStep > 0) {

    activeWaves.push(makeWave(power));
    //}
}

////////

var tinyWave = [];
var simpleWave = [];
var notchWave = [];

var WAVES = [tinyWave,simpleWave,notchWave];

(function() {
    var LENGTH = 100;

    for (var i = 0; i < LENGTH; i++) {
        var y = Math.sin(i / 10);
        y *= (LENGTH - i) / LENGTH;
        simpleWave.push(y);
    }

})();

(function() {
    var LENGTH = 60;

    for (var i = 0; i < LENGTH; i++) {
        var y = Math.sin(i / 10) * 0.6;
        y *= (LENGTH - i) / LENGTH;
        tinyWave.push(y);
    }

})();

(function() {
    var LENGTH = 50;

    for (var i = 0; i < LENGTH; i++) {
        var y = Math.abs(i - (LENGTH/2)) / (LENGTH/2);
        y = (1-y) * 5;
        if (y>1)
        {
            y= 1;
        }
        if (i > (LENGTH/2))
        {
            y*=-1;
        }
        notchWave.push(-1 * y);
    }

})();
