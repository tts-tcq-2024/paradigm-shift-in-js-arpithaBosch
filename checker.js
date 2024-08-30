function batteryIsOk(temperature, soc, chargeRate) {
    const isTemperatureOk = (temperature >= 0 && temperature <= 45);
    const isSocOk = (soc >= 20 && soc <= 80);
    const isChargeRateOk = (chargeRate <= 0.8);

    if (!isTemperatureOk) {
        console.log("Temperature is out of range!");
        return false;
    }
    if (!isSocOk) {
        console.log("State of Charge is out of range!");
        return false;
    }
    if (!isChargeRateOk) {
        console.log("Charge Rate is out of range!");
        return false;
    }

    return true;
}

function  ExpectTrue(expression) {
    if(!expression) {
        console.log("Expected true, but got false");
        
    }
}
function ExpectFalse(expression) {
    if(expression) {
        console.log("Expected false, but got true");
        Environment.Exit(1);
    }
}
function main() {
    ExpectTrue(batteryIsOk(25, 70, 0.7));
    ExpectFalse(batteryIsOk(50, 85, 0.0));
    console.log("All ok");
    return 0;
}

main();
