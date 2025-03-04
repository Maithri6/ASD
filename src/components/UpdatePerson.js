import { useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // assuming you've set up Firebase Authentication

export default function UpdatePerson() {
  const [email, setEmail] = useState("");
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();

  // Fetch person details
  const fetchPerson = async () => {
    try {
      const docRef = doc(db, "Person", email);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPerson(docSnap.data());
      } else {
        alert("No such person found!");
      }
    } catch (error) {
      console.error("Error fetching document:", error.message);
    }
  };

  // Handle updating the person details
  const handleUpdate = async () => {
    try {
      const docRef = doc(db, "Person", email);
      await updateDoc(docRef, person);
      alert("Details updated successfully");
      navigate("/dashboard"); // Navigate to the dashboard after updating
    } catch (error) {
      console.error("Error updating document:", error.message);
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      navigate("/auth"); // Navigate to the auth page after logout
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  // Handle changes to person data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prev) => ({ ...prev, [name]: value }));
  };

  // Handle changes to nested data (e.g., caregiver details, medical history)
  const handleNestedChange = (category, field, value) => {
    setPerson((prev) => ({
      ...prev,
      [category]: { ...prev[category], [field]: value },
    }));
  };

  return (
    <div>
      <h2>Update Person</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchPerson}>Fetch Details</button>

      {person && (
        <div>
          <h3>Edit Person Details</h3>
          <input
            type="text"
            name="name"
            value={person.name}
            onChange={handleChange}
            placeholder="Name"
          />
          <input
            type="number"
            name="age"
            value={person.age}
            onChange={handleChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="gender"
            value={person.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
          <input
            type="number"
            name="level_on_the_spectrum"
            value={person.level_on_the_spectrum}
            onChange={handleChange}
            placeholder="Level on Spectrum"
          />

          <h3>Edit Caregiver Details</h3>
          <input
            type="number"
            name="phone_no"
            value={person.caregiver_details.phone_no}
            onChange={(e) => handleNestedChange('caregiver_details', 'phone_no', e.target.value)}
            placeholder="Caregiver Phone No"
          />
          <input
            type="text"
            name="name"
            value={person.caregiver_details.name}
            onChange={(e) => handleNestedChange('caregiver_details', 'name', e.target.value)}
            placeholder="Caregiver Name"
          />
          <input
            type="number"
            name="age"
            value={person.caregiver_details.age}
            onChange={(e) => handleNestedChange('caregiver_details', 'age', e.target.value)}
            placeholder="Caregiver Age"
          />
          <input
            type="text"
            name="gender"
            value={person.caregiver_details.gender}
            onChange={(e) => handleNestedChange('caregiver_details', 'gender', e.target.value)}
            placeholder="Caregiver Gender"
          />
          <input
            type="text"
            name="relation"
            value={person.caregiver_details.relation}
            onChange={(e) => handleNestedChange('caregiver_details', 'relation', e.target.value)}
            placeholder="Caregiver Relation"
          />

          <h3>Edit Medical History</h3>
          <input
            type="datetime-local"
            name="date_of_diagnosis"
            value={person.medical_history.date_of_diagnosis}
            onChange={(e) => handleNestedChange('medical_history', 'date_of_diagnosis', e.target.value)}
            placeholder="Date of Diagnosis"
          />
          <input
            type="text"
            name="prescriptions"
            value={person.medical_history.prescriptions}
            onChange={(e) => handleNestedChange('medical_history', 'prescriptions', e.target.value)}
            placeholder="Prescriptions"
          />

          <h3>Edit Medical Professional Details</h3>
          <input
            type="number"
            name="phone_no"
            value={person.medical_professional_details.phone_no}
            onChange={(e) => handleNestedChange('medical_professional_details', 'phone_no', e.target.value)}
            placeholder="Medical Professional Phone No"
          />
          <input
            type="text"
            name="name"
            value={person.medical_professional_details.name}
            onChange={(e) => handleNestedChange('medical_professional_details', 'name', e.target.value)}
            placeholder="Medical Professional Name"
          />
          <input
            type="datetime-local"
            name="availability_time"
            value={person.medical_professional_details.availability_time}
            onChange={(e) => handleNestedChange('medical_professional_details', 'availability_time', e.target.value)}
            placeholder="Availability Time"
          />
          <input
            type="text"
            name="specialty"
            value={person.medical_professional_details.specialty}
            onChange={(e) => handleNestedChange('medical_professional_details', 'specialty', e.target.value)}
            placeholder="Specialty"
          />
          <input
            type="text"
            name="hospital"
            value={person.medical_professional_details.hospital}
            onChange={(e) => handleNestedChange('medical_professional_details', 'hospital', e.target.value)}
            placeholder="Hospital"
          />

          <button onClick={handleUpdate}>Update</button>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

