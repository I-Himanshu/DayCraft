import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from './firebase';

const saveUserToFirestore = async (userId, userData) => {
  try {
    const userRef = doc(firestore, 'users', userId);
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error("Error saving user data to Firestore:", error);
    throw error;
  }
};

export const registerUser = async (fullName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User registered:", user);
    console.log("User Credential:", userCredential);
    await updateProfile(user, {
      displayName: fullName,
    });
    await saveUserToFirestore(user.uid, {
      fullName,
      email,
      displayName: fullName,
      password
    });
    return user;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};
