const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const PatientRegiModule = buildModule("PatientRegiModule", (m) => {
  const patientRegi = m.contract("PatientRegistration");

  return { patientRegi };
});

module.exports = PatientRegiModule;