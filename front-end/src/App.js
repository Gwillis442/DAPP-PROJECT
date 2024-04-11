import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export default function App() {
  const [address, setAddress] = useState('');
  const [patient, setPatient] = useState(null);
  const [isRegistered, setIsRegistered] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [addr, setAddr] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');
  
  async function retrievePatient(e) {
    e.preventDefault();
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
      "function getPatient(address patientAddress) public view returns (string name, uint age, string gender, string addr, string medicalHistory)"
    ], signer);
  
    try {
      const patient = await contract.getPatient(address);
      setPatient(patient);
      setIsRegistered(true);
    } catch (error) {
      console.error("Failed to retrieve patient:", error);
      setIsRegistered(false);
    }
  }
  
  async function registerPatient(e) {
    e.preventDefault();
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, [
    "function registerPatient(string name, uint age, string gender, string addr, string medicalHistory) public"
  ], signer);

  try {
    const tx = await contract.registerPatient(name, age, gender, addr, medicalHistory);
    await tx.wait();
    setIsRegistered(true);
  } catch (error) {
    console.error("Failed to register patient:", error);
  }
    
  }
  
  return (
    <div>
      <form onSubmit={retrievePatient}>
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ethereum address" />
        <button type="submit">Retrieve Patient</button>
      </form>
      {!isRegistered && (
        <form onSubmit={registerPatient}>
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required />
            <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" required />
            <input type="text" value={addr} onChange={e => setAddr(e.target.value)} placeholder="Address" required />
            <input type="text" value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} placeholder="Medical History" required />
            <button type="submit">Register Patient</button>
        </form>
      )}
      {patient && (
      <div>
        <h2>Patient Details</h2>
        <p>Name: {patient.name}</p>
        <p>Age: {patient.age}</p>
        <p>Gender: {patient.gender}</p>
        <p>Address: {patient.addr}</p>
        <p>Medical History: {patient.medicalHistory}</p>
      </div>
)}
    </div>
  );
}