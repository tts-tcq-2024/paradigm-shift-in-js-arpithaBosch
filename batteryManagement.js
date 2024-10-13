const { checkWarning } = require('./warnings');

/**
 * Checks if the given value is in the specified range and returns an object containing
 * information about the range check, warnings, and possible exception messages.
 * 
 * @param {number} value - The value to check.
 * @param {number} min - The minimum acceptable value.
 * @param {number} max - The maximum acceptable value.
 * @param {Object} config - Configuration object for warnings and tolerances.
 * @param {string} parameterName - Name of the parameter for reporting.
 * @returns {Object} Result object containing inRange and warning status.
 */
function checkRange(value, min, max, config, parameterName) {
    try {
        if (value < min) {
            throw new Error(`${parameterName} is too low!`);
        }
        if (value > max) {
            throw new Error(`${parameterName} is too high!`);
        }
        return checkWarning(value, min, max, config, parameterName);
    } catch (error) {
        return { inRange: false, warning: false, message: error.message };
    }
}

/**
 * Validates the battery parameters and checks for limits and warnings.
 * 
 * @param {number} temperature - The temperature value.
 * @param {number} soc - The state of charge value.
 * @param {number} chargeRate - The charge rate value.
 * @param {Object} config - Configuration object for warnings and tolerances.
 * @param {function} reporter - Function to handle reporting of messages.
 * @returns {boolean} True if all parameters are within range; otherwise, false.
 */
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
