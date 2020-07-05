import browser from "./browser";

const Storage = {
  set: async (keys) => {
    return new Promise((resolve, reject) => {
      browser.storage.sync.set(keys, () => {
        resolve();
      });
    });
  },
  get: async (key) => {
    return new Promise((resolve, reject) => {
      browser.storage.sync.get(key, (result) => {
        resolve(result);
      });
    });
  },
};

export const STORAGE_KEYS = {
  VOUCHERS: "vouchers",
};
export default Storage;
