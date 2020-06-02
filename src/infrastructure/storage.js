const Storage = {
  set: (key) => {
    /*eslint-disable no-undef*/
    browser.storage.sync.set(key);
    /*eslint-enable no-undef*/
  },
  get: async (key) => {
    /*eslint-disable no-undef*/
    return await browser.storage.sync.get(key);
    /*eslint-enable no-undef*/
  },
};

export default Storage;
