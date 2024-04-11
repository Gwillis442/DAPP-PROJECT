const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const PatientRegiModule = buildModule("PatientRegiModule", (m) => {
  const patientRegi = m.contract("PatientRegistry");

  return { patientRegi };
});

module.exports = PatientRegiModule;



//PatientRegiModule#PatientRegistration - 0xC8B7dbD0c0ECdE7cB97B83d57711034d620d08dc
//PatientRegiModule#PatientRegistry - 0x405a439617439e6DBf3FBF2aAa1d0e8490567728
