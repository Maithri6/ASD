import { useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { setDoc, doc } from "firebase/firestore";

export default function AddPerson() {
  const [person, setPerson] = useState({
    email: "",
    name: "",
    age: "",
    gender: "",
    level_on_the_spectrum: "",
    caregiver_details: { phone_no: "", name: "", age: "", gender: "", relation: "" },
    medical_history: { date_of_diagnosis: "", prescriptions: [] },
    medical_professional_details: { phone_no: "", name: "", specialty: "", availability_time: "", hospital: "" },
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  // Handles nested changes for caregiver, medical history, and professional details
  const handleNestedChange = (category, field, value) => {
    setPerson((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  const handleSave = async () => {
    try {
      const docRef = doc(db, "Person", person.email);
      await setDoc(docRef, person);
      alert("Details added successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error adding document:", error.message);
    }
  };

  return (
    <div>
      <h2>Add Person</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={person.email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={person.name}
        onChange={handleChange}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={person.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={person.gender}
        onChange={handleChange}
      />
      <input
        type="number"
        name="level_on_the_spectrum"
        placeholder="Level"
        value={person.level_on_the_spectrum}
        onChange={handleChange}
      />

      <h2>Add Caregiver Details</h2>
      <input
        type="number"
        name="phone_no"
        placeholder="Phone No"
        value={person.caregiver_details.phone_no}
        onChange={(e) => handleNestedChange('caregiver_details', 'phone_no', e.target.value)}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={person.caregiver_details.name}
        onChange={(e) => handleNestedChange('caregiver_details', 'name', e.target.value)}
      />
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={person.caregiver_details.age}
        onChange={(e) => handleNestedChange('caregiver_details', 'age', e.target.value)}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={person.caregiver_details.gender}
        onChange={(e) => handleNestedChange('caregiver_details', 'gender', e.target.value)}
      />
      <input
        type="text"
        name="relation"
        placeholder="Relation"
        value={person.caregiver_details.relation}
        onChange={(e) => handleNestedChange('caregiver_details', 'relation', e.target.value)}
      />

      <h2>Add Medical History</h2>
      <input
        type="datetime-local"
        name="date_of_diagnosis"
        placeholder="Date of Diagnosis"
        value={person.medical_history.date_of_diagnosis}
        onChange={(e) => handleNestedChange('medical_history', 'date_of_diagnosis', e.target.value)}
      />
      <input
        type="text"
        name="prescriptions"
        placeholder="Prescriptions"
        value={person.medical_history.prescriptions}
        onChange={(e) => handleNestedChange('medical_history', 'prescriptions', e.target.value)}
      />

      <h2>Add Medical Professional Details</h2>
      <input
        type="number"
        name="phone_no"
        placeholder="Phone No"
        value={person.medical_professional_details.phone_no}
        onChange={(e) => handleNestedChange('medical_professional_details', 'phone_no', e.target.value)}
      />
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={person.medical_professional_details.name}
        onChange={(e) => handleNestedChange('medical_professional_details', 'name', e.target.value)}
      />
      <input
        type="datetime-local"
        name="availability_time"
        placeholder="Availability Time"
        value={person.medical_professional_details.availability_time}
        onChange={(e) => handleNestedChange('medical_professional_details', 'availability_time', e.target.value)}
      />
      <input
        type="text"
        name="specialty"
        placeholder="Specialty"
        value={person.medical_professional_details.specialty}
        onChange={(e) => handleNestedChange('medical_professional_details', 'specialty', e.target.value)}
      />
      <input
        type="text"
        name="hospital"
        placeholder="Hospital"
        value={person.medical_professional_details.hospital}
        onChange={(e) => handleNestedChange('medical_professional_details', 'hospital', e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
}
