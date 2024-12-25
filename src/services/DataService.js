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
    this.pendingSync = [];
    this.isOnline = navigator.onLine;
    
    // Set up online/offline event listeners
    window.addEventListener('online', this.handleOnline.bind(this));
    window.addEventListener('offline', this.handleOffline.bind(this));
  }

  // Handle coming online
  async handleOnline() {
    this.isOnline = true;
    await this.syncPendingChanges();
  }

  // Handle going offline
  handleOffline() {
    this.isOnline = false;
  }

  // Get localStorage key
  getStorageKey(key) {
    return `${this.user_id}_${key}`;
  }

  // Get pending sync key for localStorage
  getPendingSyncKey() {
    return `pendingSync_${this.user_id}`;
  }

  // Save to localStorage
  saveToLocal(key, value) {
    const data = {
      value: value,
      creationDate: new Date().toISOString()
    };
    localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
  }

  // Get from localStorage
  getFromLocal(key) {
    const data = localStorage.getItem(this.getStorageKey(key));
    return data ? JSON.parse(data).value : null;
  }

  // Add to pending sync queue
  addToPendingSync(key, value) {
    this.pendingSync = this.getPendingSyncFromStorage();
    this.pendingSync.push({ key, value });
    localStorage.setItem(this.getPendingSyncKey(), JSON.stringify(this.pendingSync));
  }

  // Get pending sync items from storage
  getPendingSyncFromStorage() {
    const pendingSyncData = localStorage.getItem(this.getPendingSyncKey());
    return pendingSyncData ? JSON.parse(pendingSyncData) : [];
  }

  // Sync pending changes to Firestore
  async syncPendingChanges() {
    if (!this.isOnline) return;

    const pendingItems = this.getPendingSyncFromStorage();
    if (pendingItems.length === 0) return;

    try {
      for (const item of pendingItems) {
        await this.setItemToFirestore(item.key, item.value);
      }
      // Clear pending sync after successful sync
      localStorage.setItem(this.getPendingSyncKey(), JSON.stringify([]));
    } catch (error) {
      console.error('Error syncing pending changes:', error);
    }
  }

  // Set item to Firestore
  async setItemToFirestore(key, value) {
    if (!this.user_id) {
      throw new Error("User ID is not set.");
    }
    const data = {
      value: value,
      creationDate: new Date()
    };
    const docRef = doc(firestore, this.user_id, `${key}`);
    await setDoc(docRef, data);
  }

  // Fetch data from Firestore
  async getItem(key) {
    if (!this.user_id) {
      throw new Error("User ID is not set.");
    }

    // If offline, get from localStorage
    if (!this.isOnline) {
      return this.getFromLocal(key);
    }

    try {
      const docRef = doc(firestore, this.user_id, key);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        // Update localStorage with latest data
        this.saveToLocal(key, data.value);
        return data.value;
      } else {
        // Check localStorage as fallback
        return this.getFromLocal(key);
      }
    } catch (error) {
      console.error('Error fetching from Firestore:', error);
      // Fallback to localStorage if Firestore fetch fails
      return this.getFromLocal(key);
    }
  }

  // Set data
  async setItem(key, value) {
    // Always save to localStorage first
    this.saveToLocal(key, value);

    if (!this.isOnline) {
      // Add to pending sync queue if offline
      this.addToPendingSync(key, value);
      return;
    }

    try {
      // Try to save to Firestore if online
      await this.setItemToFirestore(key, value);
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      // Add to pending sync queue if Firestore save fails
      this.addToPendingSync(key, value);
    }
  }
}