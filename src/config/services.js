import { getFirestore, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth } from "./firebase";

// Add user data to Firestore
export const addUserDataToFirestore = async (user) => {
  const db = getFirestore();
  const userDocRef = doc(db, "Person", user.email);

  const userData = {
    name: user.displayName || "Anonymous",
    age: 0,
    level_on_the_spectrum: "Not Specified",
  };

  try {
    await setDoc(userDocRef, userData);
    console.log("User data added to Firestore");
  } catch (error) {
    console.error("Error adding user data:", error);
  }
};

// Fetch user data from Firestore
export const fetchPersonData = async () => {
  const user = auth.currentUser;
  if (!user) return null;

  const db = getFirestore();
  const userDocRef = doc(db, "Person", user.email);

  try {
    const docSnap = await getDoc(userDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};

// Update user data in Firestore
export const updatePersonData = async (updatedData) => {
  const user = auth.currentUser;
  if (!user) return;

  const db = getFirestore();
  const userDocRef = doc(db, "Person", user.email);

  try {
    await updateDoc(userDocRef, updatedData);
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
};

