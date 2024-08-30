function batteryIsOk(temperature, soc, chargeRate) {
    const conditions = [
        { check: temperature < 0 || temperature > 45, message: "Temperature is out of range!" },
        { check: soc < 20 || soc > 80, message: "State of Charge is out of range!" },
        { check: chargeRate > 0.8, message: "Charge Rate is out of range!" }
    ];

    for (const condition of conditions) {
        if (condition.check) {
            console.log(condition.message);
            return false;
        }
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
