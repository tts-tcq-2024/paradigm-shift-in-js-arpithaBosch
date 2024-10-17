//Calculates the warning range based on the tolerance and max value.
function calculateWarningRange(min, max, tolerance) {
    const warningTolerance = tolerance * max;
    return {
        warningRangeLow: min + warningTolerance,
        warningRangeHigh: max - warningTolerance,
    };
}

//Generates a warning message based on the parameter name and condition.
function generateWarningMessage(parameterName, condition) {
    return `${parameterName} Warning: Approaching ${condition}!`;
}

//Checks if a value is within the discharge warning range.
function isInDischargeRange(value, min, warningRangeLow) {
    return value >= min && value <= warningRangeLow;
}

// Checks if a value is within the charge peak warning range.
function isInChargePeakRange(value, max, warningRangeHigh) {
    return value <= max && value >= warningRangeHigh;
}

//Checks if a warning condition is met for the given value.
function checkWarning(value, min, max, config, parameterName) {
    if (!config.enableWarning) {
        return { inRange: true, warning: false, message: '' };
    }

    const { warningRangeLow, warningRangeHigh } = calculateWarningRange(min, max, config.tolerance);

    if (isInDischargeRange(value, min, warningRangeLow)) {
        return {
            inRange: true,
            warning: true,
            message: generateWarningMessage(parameterName, 'discharge'),
        };
    }

    if (isInChargePeakRange(value, max, warningRangeHigh)) {
        return {
            inRange: true,
            warning: true,
            message: generateWarningMessage(parameterName, 'charge-peak'),
        };
    }
    return { inRange: true, warning: false, message: '' };
}

module.exports = { checkWarning };
