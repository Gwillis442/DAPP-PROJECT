import { ethers } from 'ethers';
import React, { useState } from 'react';

const PatientRegistration = ({ contractAddress }) => {
  const [patient, setPatient] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [addr, setAddr] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

  async function registerPatient(e) {
    e.preventDefault();
    
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
      "function registerPatient(string name, uint age, string gender, string addr, string medicalHistory) public",
      "function getPatient(uint id) public view returns (string name, uint age, string gender, string addr, string medicalHistory)",
      "function patientCount() public view returns (uint)"
    ], signer);
  
    await contract.registerPatient(name, age, gender, addr, medicalHistory);
  
    const patientCount = await contract.patientCount();
    if (patientCount > 0) {
      const patient = await contract.getPatient(patientCount - 1);
      setPatient(patient);
    }
  }

  return (
    <div>
      <form onSubmit={registerPatient}>
        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
        <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" />
        <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" />
        <input type="text" value={addr} onChange={e => setAddr(e.target.value)} placeholder="Address" />
        <input type="text" value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} placeholder="Medical History" />
        <button type="submit">Register Patient</button>
      </form>
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