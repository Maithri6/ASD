import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase"; // Assuming you have the auth setup from Firebase

export default function Dashboard() {
  const [email, setEmail] = useState("");
  const [person, setPerson] = useState(null);
  const navigate = useNavigate();

  // Fetch the person details based on the email
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

  // Log out the user and redirect to the auth page
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase signOut
      navigate("/auth"); // Redirect to auth page
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  // Navigate to the UpdatePerson page (to edit the person's details)
  const handleUpdatePerson = () => {
    if (person) {
      navigate("/UpdatePerson", { state: { person } }); // Pass the person data for editing
    } else {
      alert("No person found to update!");
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={fetchPerson}>Fetch Details</button>

      {person && (
        <>
          <h3>Person Details:</h3>
          <pre>{JSON.stringify(person, null, 2)}</pre>
          <button onClick={handleUpdatePerson}>Update Person</button>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

