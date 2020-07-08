import companies from "../../domain/companies";
import browser from "../../infrastructure/browser";
import storage, { STORAGE_KEYS } from "../../infrastructure/storage";
import Voucher from '../../domain/voucher.type'

browser.tabs.onUpdated.addListener(async (tabId: any, changeInfo: any, tab: any) => {
  const tabUrl = tab.url;
  const companyName = getCompanyNameFromUrl(tabUrl);
  if (!companyName) {
    return;
  }
  const matchedVoucher = await matchVoucherWithCompanyName(companyName);
  if (!matchedVoucher) {
    return;
  }
  await sendNotification(matchedVoucher, tab.id);
});

function getCompanyNameFromUrl(tabUrl: string) {
  let matchedCompanyName;
  Object.entries(companies).forEach(([companyName, companyDomain]) => {
    if (tabUrl.includes(companyDomain)) {
      matchedCompanyName = companyName;
    }
  });
  return matchedCompanyName;
}

async function matchVoucherWithCompanyName(companyName: string) {
  const vouchers = (await storage.get(STORAGE_KEYS.VOUCHERS) as any).vouchers;
  if (!vouchers) {
    return;
  }

  let matchedVoucher;
  Object.entries(vouchers).forEach(([id, voucher]) => {
    if ((voucher as Voucher).company === companyName) {
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
