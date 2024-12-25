import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from '../services/firebase'; // Import Firebase configuration

export class DataService {
  constructor(storage) {
    this.storage = storage;
  }

  async get(key) {
    return this.storage.getItem(key);
  }

  async set(key, value) {
    return this.storage.setItem(key, value);
  }
}
export class FirestoreService {
  constructor(user) {
    this.collectionName = "day-sync";
    this.user_id = user && user.uid ? user.uid : "global";
  }

  // Fetch data from Firestore
  async getItem(key) {
    if (!this.user_id) {
      throw new Error("User ID is not set.");
    }
    console.log(`Fetching data for key: ${key} user_id: ${this.user_id}`);
    // If user_id is "global", we use a global path; otherwise, use user-specific path
    const docRef =doc(firestore, this.user_id, key);
    console.log(`Fetching data for key: ${key} docRef: ${docRef}`);
    const docSnap = await getDoc(docRef);
    console.log(`Data found for key: ${key} value: ${docSnap.exists()}`);
    if (docSnap.exists()) {
      const data =  docSnap.data();
      console.log(`Data found for key: ${key} value: ${data}`);
      return data.value;
    } else {
      console.log(`No data found for key: ${key}`);
      return null;
    }
  }

  // Set data to Firestore
  async setItem(key, value) {
    const data = {
      value: value,
      creationDate: new Date()
    }
    if (!this.user_id) {
      throw new Error("User ID is not set.");
    }
    console.log(`Setting data for key: ${key} value: ${data}`);
    const docRef = doc(firestore, this.user_id, `${key}`);
    await setDoc(docRef, data);
  }
}