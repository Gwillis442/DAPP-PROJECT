// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientRegistration {
    struct Patient {
        string name;
        uint age;
        string gender;
        string addr;
        string medicalHistory;
    }

    mapping(uint => Patient) public patients;
    uint public patientCount = 0;

    function registerPatient(string memory name, uint age, string memory gender, string memory addr, string memory medicalHistory) public {
        patients[patientCount] = Patient(name, age, gender, addr, medicalHistory);
        patientCount++;
    }

    function getPatient(uint id) public view returns (string memory name, uint age, string memory gender, string memory addr, string memory medicalHistory) {
        Patient memory patient = patients[id];
        return (patient.name, patient.age, patient.gender, patient.addr, patient.medicalHistory);
    }
}