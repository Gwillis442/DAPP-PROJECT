// Importing necessary modules from react and ethers.js
import React, { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';

// The Ethereum contract address
const contractAddress = "0x405a439617439e6DBf3FBF2aAa1d0e8490567728";

// The main component of the app
export default function App() {
  // State variables for the app
  const [address, setAddress] = useState(''); // Ethereum address of the patient
  const [patient, setPatient] = useState(null); // Patient data
  const [isRegistered, setIsRegistered] = useState(true); // Registration status
  const [name, setName] = useState(''); // Patient's name
  const [age, setAge] = useState(''); // Patient's age
  const [gender, setGender] = useState(''); // Patient's gender
  const [addr, setAddr] = useState(''); // Patient's physical address
  const [medicalHistory, setMedicalHistory] = useState(''); // Patient's medical history
  const [isPatientAdded, setIsPatientAdded] = useState(false); // Status of patient addition

  // Function to register a patient
  async function registerPatient(e) {
    e.preventDefault();

    // Requesting access to the user's Ethereum accounts
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    // Creating a new Ethereum provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // Getting the signer from the provider
    const signer = provider.getSigner();
    // Creating a new contract instance
    const contract = new ethers.Contract(contractAddress, [
      "function registerPatient(string name, uint age, string gender, string addr, string medicalHistory) public"
    ], signer);

    // Registering the patient
    try {
      const tx = await contract.registerPatient(name, age, gender, addr, medicalHistory);
      await tx.wait();
      setIsRegistered(true);
      setIsPatientAdded(true);
      console.log("Patient registered successfully");
    } catch (error) {
      console.error("Failed to register patient:", error);
    }
  }

  // Function to retrieve a patient
  async function retrievePatient(e) {
    e.preventDefault();
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, [
        "function getPatient(address patientAddress) public view returns (string name, uint age, string gender, string addr, string medicalHistory)"
      ], signer);

      // Retrieving the patient
      const data = await contract.getPatient(address);
      const patient = {
        name: data[0],
        age: data[1].toNumber(),
        gender: data[2],
        addr: data[3],
        medicalHistory: data[4]
      };
      setPatient(patient);
      setIsRegistered(true);
      console.log("Patient retrieved successfully:", patient);
    } catch (error) {
      console.error("Failed to retrieve patient:", error);
      setIsRegistered(false);
    }
  }


  return (
    <div className="app">
      <h1>Medicords</h1>
      <form onSubmit={retrievePatient}>
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Ethereum address" />
        <button type="submit" id='getPatient'>Retrieve Patient</button>
      </form>
      {!isRegistered && (
        <form onSubmit={registerPatient}className="register-form">
            <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" required />
            <input type="text" value={gender} onChange={e => setGender(e.target.value)} placeholder="Gender" required />
            <input type="text" value={addr} onChange={e => setAddr(e.target.value)} placeholder="Address" required />
            <textarea value={medicalHistory} onChange={e => setMedicalHistory(e.target.value)} placeholder="Medical History" required />
            <button type="submit">Register Patient</button>
        </form>
      )}
      {isPatientAdded && (
        <p>Patient added successfully!</p>
      )}
      {patient && (
      <div className="patient-details">
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