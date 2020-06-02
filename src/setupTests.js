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
    return this.store[key] || null;
  }
  async set(values) {
    Object.keys(values).forEach((key) => {
      this.store[key] = values[key];
    });
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
