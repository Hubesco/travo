// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

class SyncStorageMock {
  constructor() {
    this.store = {};
  }

  get(key, callback) {
    const value = this.store[key];
    if (callback) {
      callback(value || {});
    }
  }
  set(values, callback) {
    for (let property in values) {
      const objectToStore = {};
      objectToStore[property] = values[property];
      this.store[property] = objectToStore;
    }
    if (callback) {
      callback();
    }
  }

  clear() {
    this.store = {};
  }
}

global.chrome = {
  storage: {
    sync: new SyncStorageMock(),
  },
};

afterEach(() => {
  jest.clearAllMocks();
  chrome.storage.sync.clear();
});
