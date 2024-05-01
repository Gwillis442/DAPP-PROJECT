// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRegistry {
struct Patient {
  bool registered;
  string name;
  uint age;
  string gender;
  string addr;
  string medicalHistory;
}

mapping(address => Patient) public patients;

function registerPatient(string memory name, uint age, string memory gender, string memory addr, string memory medicalHistory) public {
    patients[msg.sender] = Patient(true, name, age, gender, addr, medicalHistory);
  }

function getPatient(address patientAddress) public view returns (string memory name, uint age, string memory gender, string memory addr, string memory medicalHistory) {
  require(patients[patientAddress].registered, "Patient not found");
  Patient memory patient = patients[patientAddress];
  return (patient.name, patient.age, patient.gender, patient.addr, patient.medicalHistory);
}

}
