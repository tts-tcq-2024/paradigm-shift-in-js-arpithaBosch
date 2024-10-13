/**
 * Calculates the warning range based on the tolerance and max value.
 * 
 * @param {number} min - The minimum acceptable value.
 * @param {number} max - The maximum acceptable value.
 * @param {number} tolerance - The tolerance percentage.
 * @returns {Object} An object containing the low and high warning range.
 */
function calculateWarningRange(min, max, tolerance) {
    const warningTolerance = tolerance * max;
    const warningRangeLow = min + warningTolerance;
    const warningRangeHigh = max - warningTolerance;
    
    return { warningRangeLow, warningRangeHigh };
}

/**
 * Checks if a warning condition is met for the given value.
 * 
 * @param {number} value - The value to check.
 * @param {number} min - The minimum acceptable value.
 * @param {number} max - The maximum acceptable value.
 * @param {Object} config - Configuration object for warnings and tolerances.
 * @param {string} parameterName - Name of the parameter for reporting.
 * @returns {Object} Result object containing inRange and warning status.
 */
function checkWarning(value, min, max, config, parameterName) {
    // Check if warning is enabled
    if (!config.enableWarning) {
        return { inRange: true, warning: false, message: '' };
    }
    // Calculate warning ranges
    const { warningRangeLow, warningRangeHigh } = calculateWarningRange(min, max, config.tolerance);
    // Check if value falls within the warning range
    if (value >= min && value <= warningRangeLow) {
        return { inRange: true, warning: true, message: `${parameterName} Warning: Approaching discharge!` };
    }
    if (value <= max && value >= warningRangeHigh) {
        return { inRange: true, warning: true, message: `${parameterName} Warning: Approaching charge-peak!` };
    }
    return { inRange: true, warning: false, message: '' };
}

module.exports = { checkWarning};
