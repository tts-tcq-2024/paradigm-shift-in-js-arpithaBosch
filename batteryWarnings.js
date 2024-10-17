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

//General function to check if a value falls within a specified range.
function isInRange(value, lowerBound, upperBound) {
  return value >= lowerBound && value <= upperBound;
}

//Determines the condition of the warning based on value and ranges.
function determineWarningCondition(value, min, max, warningRange) {
  if (isInRange(value, min, warningRange.warningRangeLow)) {
    return "discharge";
  }
  if (isInRange(value, warningRange.warningRangeHigh, max)) {
    return "charge-peak";
  }
  return null;
}

//Checks if a warning condition is met for the given value.
function checkWarning(value, min, max, config, parameterName) {
  if (!config.enableWarning) {
    return { inRange: true, warning: false, message: "" };
  }

  const warningRange = calculateWarningRange(min, max, config.tolerance);
  const condition = determineWarningCondition(value, min, max, warningRange);

  return condition
    ? {
        inRange: true,
        warning: true,
        message: generateWarningMessage(parameterName, condition),
      }
    : { inRange: true, warning: false, message: "" };
}

module.exports = { checkWarning };
