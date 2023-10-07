//% color="#FFBF00" icon="\uf12e" weight=70
namespace Brickcell {
    let samplingRate = 10;          // Get 10 samples for averaging
    let nominalResistance = 10000;  // 10 Kilo Ohms
    let betaValue = 3950;           // The beta coefficient or the B value of the thermistor 
    // (usually 3000-4000) check the datasheet for the accurate value.

    /**
    * Read NTC temperature
    */
    //% block="Read NTC temperature on pin $ntcPin"
    //% blockId=brickcell_temperature_ntc_read
    //% subcategory="temperature ntc"
    export function readTemperature(ntcPin: AnalogPin): number {
        let _temperature;

        // Read analog value and calculate approximate temperature
        let samples = 0;
        for (let i = 0; i < samplingRate; i++) {
            samples += pins.analogReadPin(ntcPin);
            basic.pause(10);
        }
        let average = samples / samplingRate;
        let resistance = 1023 / average - 1;
        resistance = nominalResistance / resistance;

        // temperature in *C is calculated using the Steinhart-Hart equation
        _temperature = 1 / (Math.log(resistance / nominalResistance) / betaValue + 1 / (25 + 273.15)) - 273.15;
        _temperature = Math.round(_temperature);

        return _temperature;
    }
}