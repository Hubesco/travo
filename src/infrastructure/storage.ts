import browser from "./browser";

const Storage = {
  set: async (keys: any) => {
    return new Promise((resolve, reject) => {
      browser.storage.sync.set(keys, () => {
        resolve();
      });
    });
  },
  get: async (key: string) => {
    return new Promise((resolve, reject) => {
      browser.storage.sync.get(key, (result: any) => {
        resolve(result);
      });
    });
  },
};

export const STORAGE_KEYS = {
  VOUCHERS: "vouchers",
};
export default Storage;
