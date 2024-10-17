const { batteryIsOk } = require('./batteryManagement');

// Default reporter for console logging.
function defaultReporter(message) {
    console.log(message);
}

//Configuration object for warnings and tolerances.
const config = {
    temperature: { tolerance: 0.05, enableWarning: true },
    soc: { tolerance: 0.05, enableWarning: true },
    chargeRate: { tolerance: 0.05, enableWarning: true }
};

module.exports = { config, batteryIsOk, defaultReporter };
