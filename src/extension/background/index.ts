import companies from "../../domain/companies";
import Voucher from "../../domain/voucher.type";
import browser from "../../infrastructure/browser";
import storage, { STORAGE_KEYS } from "../../infrastructure/storage";

console.log("background");

browser.tabs.onUpdated.addListener(
  async (tabId: any, changeInfo: any, tab: any) => {
    const tabUrl = tab.url;
    console.log("1");
    const companyName = getCompanyNameFromUrl(tabUrl);
    if (!companyName) {
      return;
    }
    console.log("2");
    const matchedVoucher = await matchVoucherWithCompanyName(companyName);
    if (!matchedVoucher) {
      return;
    }
    console.log("3");
    await sendNotification(matchedVoucher, tab.id);
  }
);

function getCompanyNameFromUrl(tabUrl: string) {
  let matchedCompanyName;
  Object.keys(companies).forEach((companyKey) => {
    if (tabUrl.includes(companies[companyKey].domain)) {
      matchedCompanyName = companyKey;
    }
  });
  return matchedCompanyName;
}

async function matchVoucherWithCompanyName(
  companyName: string
): Promise<Voucher | null> {
  const { vouchers } = (await storage.get(STORAGE_KEYS.VOUCHERS)) as any;
  if (!vouchers) {
    return null;
  }

  let matchedVoucher = null;
  Object.entries(vouchers).forEach(([id, v]) => {
    const voucher: Voucher = v as Voucher;
    if (voucher.company === companyName) {
      matchedVoucher = voucher;
    }
  });
  return matchedVoucher;
}

async function sendNotification(voucher: Voucher, tabId: string) {
  try {
    await browser.tabs.sendMessage(tabId, {
      voucher,
    });
  } catch (err) {
    console.log(err);
  }
}
