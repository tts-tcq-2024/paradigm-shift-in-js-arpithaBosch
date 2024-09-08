// Function to check if a value is within a specified range
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

// Function to check if a value is within a minimum and maximum value
function isInRangeWithMin(value, min, max, parameterName, reporter) {
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

// Battery check function utilizing the above helper functions
function batteryIsOk(temperature, soc, chargeRate, reporter) {
    const temperatureOk = isInRange(temperature, 0, 45, "Temperature", reporter);
    const socOk = isInRange(soc, 20, 80, "State of Charge", reporter);
    const chargeRateOk = isInRangeWithMin(chargeRate, 0.3, 0.8, "Charge Rate", reporter);

    return temperatureOk && socOk && chargeRateOk;
}

// Reporter function to log messages
function defaultReporter(message) {
    console.log(message);
}

// Function to test battery conditions and report results
// Function to test battery conditions and report results
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
        { args: [46, 96, -3], expected: false},
    ];

    tests.forEach(test => {
        logTestResult(batteryIsOk(...test.args, reporter), test.expected, test.args);
    });
}

function logTestResult(result, expected, args) {
    if (result !== expected) {
        console.log(`Test failed for args ${args}. Expected ${expected}, but got ${result}.`);
    } else {
        console.log(`Test passed for args ${args}.`);
    }
    console.log("-------------------------------");
}

// Main function to execute tests
function main() {
    runTests(defaultReporter);
    console.log("All tests completed.");
}

main();
