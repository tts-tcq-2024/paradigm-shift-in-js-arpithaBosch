function isInRange(value, min, max, parameterName, reporter) {
    if (value < min) {
        reporter(`${parameterName} is too low!`);
        return false;
    }
    if (value > max) {
        reporter(`${parameterName} is too high!`);
        return false;
    }
    return true;
}

function batteryIsOk(temperature, soc, chargeRate, reporter) {
    const temperatureOk = isInRange(temperature, 0, 45, "Temperature", reporter);
    const socOk = isInRange(soc, 20, 80, "State of Charge", reporter);
    const chargeRateOk = isInRange(chargeRate, 0.3, 0.8, "Charge Rate", reporter);

    return temperatureOk && socOk && chargeRateOk;
}

function defaultReporter(message) {
    console.log(message);
}

function logTestResult(result, expected, args) {
    if (result !== expected) {
        console.log(`Test failed for args ${args}. Expected ${expected}, but got ${result}.`);
    } else {
        console.log(`Test passed for args ${args}.`);
    }
    console.log("-------------------------------");
}

function runTests(reporter) {
    const tests = [
       { args: [25, 70, 0.7], expected: true },
        { args: [50, 70, 0.7], expected: false },
        { args: [-5, 70, 0.7], expected: false },
        { args: [25, 85, 0.7], expected: false },
        { args: [25, 15, 0.7], expected: false },
        { args: [25, 70, 0.9], expected: false },
        { args: [25, 70, 0.2], expected: false }, 
        { args: [25, 70, 0.3], expected: true},
        { args: [25, 15, 0.7], expected: false },
        { args: [50, 88, 0], expected: false },
        { args: [46, 96, -3], expected: false}
    ];

    tests.forEach(test => {
        logTestResult(batteryIsOk(...test.args, reporter), test.expected, test.args);
    });
}

function main() {
    runTests(defaultReporter);
    console.log("All tests completed.");
}

main();
