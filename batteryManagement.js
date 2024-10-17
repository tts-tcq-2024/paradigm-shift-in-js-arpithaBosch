const { checkWarning } = require('./batteryWarnings');

//Throws an error if the value is below the minimum.
function checkMinValue(value, min, parameterName) {
    if (value < min) {
        throw new Error(`${parameterName} is too low!`);
    }
}

//Throws an error if the value exceeds the maximum.
function checkMaxValue(value, max, parameterName) {
    if (value > max) {
        throw new Error(`${parameterName} is too high!`);
    }
}

/**
 * Checks if the given value is in the specified range and returns an object containing
 * information about the range check, warnings, and possible exception messages.
 **/
function checkRange(value, min, max, config, parameterName) {
    try {
        checkMinValue(value, min, parameterName);  // Check minimum
        checkMaxValue(value, max, parameterName);  // Check maximum
        return checkWarning(value, min, max, config, parameterName);
    } catch (error) {
        return { inRange: false, warning: false, message: error.message };
    }
}

// Validates the battery parameters and checks for limits and warnings.
function batteryIsOk(temperature, soc, chargeRate, config, reporter) {
    const temperatureCheck = checkRange(temperature, 0, 45, config.temperature, "Temperature");
    const socCheck = checkRange(soc, 20, 80, config.soc, "State of Charge");
    const chargeRateCheck = checkRange(chargeRate, 0.3, 0.8, config.chargeRate, "Charge Rate");

    // Report any messages
    [temperatureCheck, socCheck, chargeRateCheck].forEach(check => {
        if (check.message) {
            reporter(check.message);
        }
    });

    return temperatureCheck.inRange && socCheck.inRange && chargeRateCheck.inRange;
}

module.exports = { batteryIsOk };
