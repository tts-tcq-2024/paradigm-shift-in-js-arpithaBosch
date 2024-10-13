const { batteryIsOk, config, defaultReporter } = require("../main");

describe("Battery Management System Tests", () => {
  let mockReporter;

  beforeEach(() => {
    mockReporter = jasmine.createSpy("reporter");
    spyOn(console, "log");
  });

  // Calculation of tolerance as per given config:
  // Temp: 0,45 - Warning tolerance 2.25 - (0-2.25 and 42.75-45)
  // SoC: 20,80 - Warning tolerance 4 - (20-24 and 76-80)
  // Charge rate: 0.3,0.8 - Warning tolerance 0.04 -(0.3-0.34 and 0.76-0.8)

  // Test valid battery parameters with mockReporter
  it("should return true for valid battery parameters with mockReporter", () => {
    const result = batteryIsOk(25, 70, 0.5, config, mockReporter);
    expect(result).toBe(true);
    expect(mockReporter).not.toHaveBeenCalled(); // No warnings expected
  });

  // Test case for too high temperature with mockReporter
  it("should return false for too high temperature with mockReporter", () => {
    const result = batteryIsOk(50, 70, 0.8, config, mockReporter);
    expect(result).toBe(false);
    expect(mockReporter).toHaveBeenCalledWith("Temperature is too high!");
  });

  // Test case for too high charge rate with mockReporter
  it("should return false for too high charge rate with mockReporter", () => {
    const result = batteryIsOk(40, 70, 1, config, mockReporter);
    expect(result).toBe(false);
    expect(mockReporter).toHaveBeenCalledWith("Charge Rate is too high!");
  });

  // Test valid battery parameters and warning for SOC approaching charge-peak
  it("should use defaultReporter and report warning for SOC approaching charge-peak", () => {
    const result = batteryIsOk(23, 79, 0.7, config, defaultReporter);
    expect(result).toBe(true); // All parameters are in range
    expect(console.log).toHaveBeenCalledWith(
      "State of Charge Warning: Approaching charge-peak!"
    );
  });

  // Test multiple warnings for low temperature and SOC
  it("should log multiple warnings for Temperature, SOC, and charge rate values", () => {
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

  // Test warning when SOC approaches charge-peak at upper limit
  it("should log warning using defaultReporter when SOC approaches charge-peak", () => {
    batteryIsOk(35, 76, 0.5, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "State of Charge Warning: Approaching charge-peak!"
    );
  });

  // Test case for temperature warning approaching discharge
  it("should log warning using defaultReporter for temperature approaching discharge", () => {
    batteryIsOk(2, 70, 0.5, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "Temperature Warning: Approaching discharge!"
    );
  });

  // Test case for charge rate warning approaching peak
  it("should log warning using defaultReporter for charge rate approaching peak", () => {
    batteryIsOk(25, 70, 0.76, config, defaultReporter);
    expect(console.log).toHaveBeenCalledWith(
      "Charge Rate Warning: Approaching charge-peak!"
    );
  });
});
