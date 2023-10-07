serial.setBaudRate(BaudRate.BaudRate115200)
basic.forever(function () {
    serial.writeLine("" + (Brickcell.readTemperature(AnalogPin.P0)))
    basic.pause(2000)
})
