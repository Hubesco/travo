const Storage = {
  set: async (keys) => {
    /*eslint-disable no-undef*/
    await browser.storage.sync.set(keys);
    /*eslint-enable no-undef*/
  },
  get: async (key) => {
    /*eslint-disable no-undef*/
    return await browser.storage.sync.get(key);
    /*eslint-enable no-undef*/
  },
};

export default Storage;
