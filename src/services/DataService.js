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

export class LocalStorageService {
  getItem(key) {
    const data = localStorage.getItem(key);
    return Promise.resolve(data ? JSON.parse(data) : null);
  }

  setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return Promise.resolve();
  }
}
