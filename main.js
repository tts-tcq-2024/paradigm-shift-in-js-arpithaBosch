const { batteryIsOk } = require('./batteryManagement');

/**
 * Default reporter for console logging.
 * 
 * @param {string} message - Message to log.
 */
function defaultReporter(message) {
    console.log(message);
}

/**
 * Configuration object for warnings and tolerances.
 * 
 * @type {Object}
 */
const config = {
    temperature: { tolerance: 0.05, enableWarning: true }, // Enable warning for temperature
    soc: { tolerance: 0.05, enableWarning: true },         // Enable warning for SoC
    chargeRate: { tolerance: 0.05, enableWarning: true }   // Enable warning for charge rate
};

module.exports = { config, batteryIsOk, defaultReporter };
