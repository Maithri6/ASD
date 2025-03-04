import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUserDataToFirestore, fetchPersonData } from "../config/services"; // Import the services

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null); // Track the authenticated user
  const [isSignUp, setIsSignUp] = useState(false); // To toggle between SignUp and SignIn
  const navigate = useNavigate();

  // Check if the user is authenticated and update the user state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);  // Update user state
    });
    return unsubscribe; // Cleanup on component unmount
  }, []);

  // Redirect to the appropriate page based on email (existing or new user)
  useEffect(() => {
    if (user !== null) {
      const checkIfUserExists = async () => {
        const personData = await fetchPersonData(); // Check if the user data exists in Firestore
        if (personData) {
          console.log("User exists in database, navigating to dashboard.");
          navigate("/Dashboard"); // Correct routing to dashboard
        } else {
          console.log("New user, navigating to AddPerson.");
          navigate("/AddPerson"); // Correct routing to AddPerson
        }
      };

      checkIfUserExists();  // Execute the check
    }
  }, [user, navigate]); // Ensure this effect runs when 'user' state changes

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add user data to Firestore if it's a new user
      await addUserDataToFirestore(user);

      // Redirection is handled in useEffect after authentication
    } catch (err) {
      console.error("Error during sign-up:", err.message);
    }
  };

  const signIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user data exists in Firestore
      const personData = await fetchPersonData();
      if (!personData) {
        // If no user data exists, add the user data to Firestore
        await addUserDataToFirestore(user);
      }

      // Redirection is handled in useEffect after authentication
    } catch (err) {
      console.error("Error during sign-in:", err.message);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Check if user data exists in Firestore
      const personData = await fetchPersonData();
      if (!personData) {
        // If no user data exists, add the user data to Firestore
        await addUserDataToFirestore(user);
      }

      // Redirection is handled in useEffect after authentication
    } catch (err) {
      console.error("Error during Google sign-in:", err.message);
    }
  };

  const signUpWithGoogle = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Add user data to Firestore if it's a new user
      await addUserDataToFirestore(user);

      // Redirection is handled in useEffect after authentication
    } catch (err) {
      console.error("Error during Google sign-up:", err.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/auth"); // Redirect to the Auth page after logout
    } catch (err) {
      console.error("Error during logout:", err.message);
    }
  };

  return (
    <div>
      <h2>Authentication</h2>

      {/* Toggle between SignUp and SignIn */}
      <button onClick={() => setIsSignUp(true)}>Sign Up</button>
      <button onClick={() => setIsSignUp(false)}>Sign In</button>

      {/* Render SignUp or SignIn forms based on the state */}
      {isSignUp ? (
        <div>
          <h3>Sign Up</h3>
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={signUp}>Sign Up</button>
          <button onClick={signUpWithGoogle}>Sign Up with Google</button>
        </div>
      ) : (
        <div>
          <h3>Sign In</h3>
          <input
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <input
            placeholder="Password..."
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <button onClick={signIn}>Sign In</button>
          <button onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
      )}

      {/* Log out button */}
      {user && <button onClick={logout}>Log Out</button>}
    </div>
  );
};




