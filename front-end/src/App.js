import { ethers } from 'ethers';
import React, { useState } from 'react';

const PatientRegistration = ({ contractAddress }) => {
  const [patient, setPatient] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [addr, setAddr] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  const [patientId, setPatientId] = useState('');
  

  async function registerPatient(e) {
    e.preventDefault();
  
    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
      "function registerPatient(string name, uint age, string gender, string addr, string medicalHistory) public",
      "function getPatient(uint id) public view returns (string name, uint age, string gender, string addr, string medicalHistory)",
      "event PatientRegistered(uint id)"
    ], signer);
  
    const tx = await contract.registerPatient(name, age, gender, addr, medicalHistory);
    const receipt = await tx.wait();
    const patientRegisteredEvent = receipt.events.find(e => e.event === 'PatientRegistered');
    const patientId = patientRegisteredEvent.args.id;
  
    const patient = await contract.getPatient(patientId);
    setPatient(patient);
  }
  
  async function retrievePatient(e) {
    e.preventDefault();

    const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
      "function getPatient(uint id) public view returns (string name, uint age, string gender, string addr, string medicalHistory)"
    ], signer);

    const patient = await contract.getPatient(patientId);
    setPatient(patient);
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
      <form onSubmit={retrievePatient}>
        <input type="number" value={patientId} onChange={e => setPatientId(e.target.value)} placeholder="Patient ID" />
        <button type="submit">Retrieve Patient</button>
      </form>
      {/* display patient details */}
    </div>
  );
};

export default PatientRegistration;