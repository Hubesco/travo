// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

class SyncStorageMock {
  store: Record<string, any>;

  constructor() {
    this.store = {};
  }

  get(key: string, callback: Function) {
    const value = this.store[key];
    if (callback) {
      callback(value || {});
    }
  }

  set(values: any, callback: Function) {
    // eslint-disable-next-line
    for (const property in values) {
      const objectToStore: any = {};
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

const globalAny: any = global;

globalAny.chrome = {
  storage: {
    sync: new SyncStorageMock(),
  },
};

afterEach(() => {
  jest.clearAllMocks();
  globalAny.chrome.storage.sync.clear();
});
