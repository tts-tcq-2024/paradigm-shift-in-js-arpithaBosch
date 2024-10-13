const { batteryIsOk, config, defaultReporter } = require("../index");

// Calculation of tolerance as per given config:
// Temp: 0,45 - Warning tolerance 2.25 - (0-2.25 and 42.75-45)
// SoC: 20,80 - Warning tolerance 4 - (20-24 and 76-80)
// Charge rate: 0.3,0.8 - Warning tolerance 0.04 -(0.3-0.34 and 0.76-0.8)

describe("Battery Management System Tests", () => {
  let mockReporter;

  beforeEach(() => {
    mockReporter = jasmine.createSpy("reporter");
    spyOn(console, "log");
  });

  it("should return true for valid battery parameters with mockReporter", () => {
    // Testing the scenario where all battery parameters (temperature, SOC, charge rate)
    // are within their acceptable ranges, expecting no warnings.
    const result = batteryIsOk(25, 70, 0.5, config, mockReporter);
    expect(result).toBe(true);
    expect(mockReporter).not.toHaveBeenCalled(); // No warnings expected
  });

  it("should return false for too high temperature with mockReporter", () => {
    // Testing the scenario where the temperature exceeds the maximum limit,
    // expecting the function to return false and log a high temperature warning.
    const result = batteryIsOk(50, 70, 0.8, config, mockReporter);
    expect(result).toBe(false);
    expect(mockReporter).toHaveBeenCalledWith("Temperature is too high!");
  });

  it("should return false for too high charge rate with mockReporter", () => {
    // Testing the scenario where the charge rate exceeds the maximum acceptable limit,
    // expecting the function to return false and log a high charge rate warning.
    const result = batteryIsOk(40, 70, 1, config, mockReporter);
    expect(result).toBe(false);
    expect(mockReporter).toHaveBeenCalledWith("Charge Rate is too high!");
  });

  it("should use defaultReporter and report warning for SOC approaching charge-peak", () => {
    // Testing the scenario where the SOC is close to its upper limit,
    // expecting the function to return true and log a warning for approaching charge-peak.
    const result = batteryIsOk(23, 79, 0.7, config, defaultReporter);
    expect(result).toBe(true); // All parameters are in range
    expect(console.log).toHaveBeenCalledWith(
      "State of Charge Warning: Approaching charge-peak!"
    );
  });

  it("should log multiple warnings for Temperature, SOC, and charge rate values", () => {
    // Testing the scenario where multiple battery parameters (temperature, SOC, charge rate)
    // are approaching their lower or upper limits, expecting all corresponding warnings to be logged.
    batteryIsOk(2, 21, 0.78, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "Temperature Warning: Approaching discharge!"
    );
    expect(console.log).toHaveBeenCalledWith(
      "State of Charge Warning: Approaching discharge!"
    );
    expect(console.log).toHaveBeenCalledWith(
      "Charge Rate Warning: Approaching charge-peak!"
    );
  });

  it("should log warning using defaultReporter when SOC approaches charge-peak", () => {
    // Testing the scenario where the SOC is very close to its upper limit,
    // expecting a warning for approaching charge-peak to be logged.
    batteryIsOk(35, 76, 0.5, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "State of Charge Warning: Approaching charge-peak!"
    );
  });

  it("should log warning using defaultReporter for temperature approaching discharge", () => {
    // Testing the scenario where the temperature is very low, close to its minimum limit,
    // expecting a warning for approaching discharge to be logged.
    batteryIsOk(2, 70, 0.5, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "Temperature Warning: Approaching discharge!"
    );
  });

  it("should log warning using defaultReporter for charge rate approaching peak", () => {
    // Testing the scenario where the charge rate is close to its maximum limit,
    // expecting a warning for approaching charge-peak to be logged.
    batteryIsOk(25, 70, 0.76, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "Charge Rate Warning: Approaching charge-peak!"
    );
  });
});
