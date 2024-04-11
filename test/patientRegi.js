const { expect } = require("chai");

describe("PatientRegistration", function () {
  it("should allow a patient to be registered", async function () {
    const [owner, otherAccount] = await ethers.getSigners();

    const PatientRegistration = await ethers.getContractFactory("PatientRegistration");
    const patientRegistration = await PatientRegistration.deploy();

    await patientRegistration.registerPatient("John Doe", 30, "Male", "123 Main St", "None");

    const patient = await patientRegistration.getPatient(0);
    expect(patient.name).to.equal("John Doe");
    expect(patient.age).to.equal(30);
    expect(patient.gender).to.equal("Male");
    expect(patient.addr).to.equal("123 Main St");
    expect(patient.medicalHistory).to.equal("None");
  });
});