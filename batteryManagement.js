const { checkWarning } = require('./batteryWarnings');

// Return an error message if the value is below the minimum.
function checkMinValue(value, min, parameterName) {
  return value < min ? `${parameterName} is too low!` : null;
}

// Return an error message if the value exceeds the maximum.
function checkMaxValue(value, max, parameterName) {
  return value > max ? `${parameterName} is too high!` : null;
}

/**
 * Checks if the given value is in the specified range and returns an object containing
 * information about the range check, warnings, and possible exception messages.
 **/
// Check if the value is within the range and return all error messages.
function checkRange(value, min, max, config, parameterName) {
  const errors = [
    checkMinValue(value, min, parameterName),
    checkMaxValue(value, max, parameterName),
  ].filter(Boolean); // Filters out null values (i.e., no error)

  if (errors.length) {
    return { inRange: false, warning: false, message: errors.join(", ") };
  }

  // Check warnings only if no critical errors
  return checkWarning(value, min, max, config, parameterName);
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
