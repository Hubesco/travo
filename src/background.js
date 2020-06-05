import companies from "./domain/companies";
import storage, { STORAGE_KEYS } from "./infrastructure/storage";

const filter = {
  urls: ["https://*.britishairways.com/*", "https://*.eurostar.com/*"],
};

browser.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const tabUrl = tab.url;
  const companyName = getCompanyNameFromUrl(tabUrl);
  if (!companyName) {
    return;
  }
  const matchedVoucher = await matchVoucherWithCompanyName(companyName);
  if (!matchedVoucher) {
    return;
  }
  console.log(matchedVoucher);
  await sendNotification(matchedVoucher, tab.id);
}, filter);

function getCompanyNameFromUrl(tabUrl) {
  let matchedCompanyName;
  Object.entries(companies).forEach(([companyName, companyDomain]) => {
    if (tabUrl.includes(companyDomain)) {
      matchedCompanyName = companyName;
    }
  });
  return matchedCompanyName;
}

async function matchVoucherWithCompanyName(companyName) {
  const vouchers = (await storage.get(STORAGE_KEYS.VOUCHERS)).vouchers;
  if (!vouchers) {
    return;
  }

  let matchedVoucher;
  Object.entries(vouchers).forEach(([id, voucher]) => {
    if (voucher.company === companyName) {
      matchedVoucher = voucher;
    }
  });
  return matchedVoucher;
}

async function sendNotification(voucher, tabId) {
  try {
    await browser.tabs.sendMessage(tabId, {
      voucher,
    });
    console.log("sent");
  } catch (err) {
    console.log(err);
  }
}
