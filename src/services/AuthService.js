// src/services/AuthService.js
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

export const registerUser = async (fullName,email, password) => {
  const user =  await createUserWithEmailAndPassword(auth, email, password);
  await user.updateProfile({
    displayName: fullName
  });
  return user;
};

export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = async () => {
  return await signOut(auth);
};
