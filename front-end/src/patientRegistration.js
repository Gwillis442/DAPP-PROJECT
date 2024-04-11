// PatientRegistration.js

import { ethers } from 'ethers';
import React, { useState } from 'react';

const PatientRegistration = ({ contractAddress }) => {
  const [patient, setPatient] = useState(null);

  async function registerPatient() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
      "function registerPatient(string name, uint age, string gender, string addr, string medicalHistory) public",
      "function getPatient(uint id) public view returns (string name, uint age, string gender, string addr, string medicalHistory)"
    ], signer);

    await contract.registerPatient("John Doe", 30, "Male", "123 Main St", "None");

    const patient = await contract.getPatient(0);
    setPatient(patient);
  }

  return (
    <div>
      <button onClick={registerPatient}>Register Patient</button>
      {patient && (
        <div>
          <p>Name: {patient.name}</p>
          <p>Age: {patient.age.toString()}</p>
          <p>Gender: {patient.gender}</p>
          <p>Address: {patient.addr}</p>
          <p>Medical History: {patient.medicalHistory}</p>
        </div>
      )}
    </div>
  );
};

export default PatientRegistration;