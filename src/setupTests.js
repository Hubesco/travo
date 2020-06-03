// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

class SyncStorageMock {
  constructor() {
    this.store = {};
  }

  async get(key) {
    const value = this.store[key];
    if (!value) {
      return {};
    }

    return value;
  }
  async set(values) {
    for (let property in values) {
      const objectToStore = {};
      objectToStore[property] = values[property];
      this.store[property] = objectToStore;
    }
  }

  clear() {
    this.store = {};
  }
}

global.browser = {
  storage: {
    sync: new SyncStorageMock(),
  },
};

afterEach(() => {
  jest.clearAllMocks();
  browser.storage.sync.clear();
});
