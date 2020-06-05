import { format, parse } from "../../utils/date";

import "./index.css";

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let notification = document.getElementById("travo-notification");
  if (notification) {
    return;
  }
  const voucher = message.voucher;
  notification = document.createElement("div");
  notification.id = "travo-notification";
  notification.className = "fade-in";
  notification.innerHTML = `
  There is a voucher to use!
  <br/>
  <p>${voucher.company}</p>
  <p>${format(parse(voucher.expiryDate))}</p>
  <p>${voucher.code}</p>
  `;
  console.log("here");
  document.body.appendChild(notification);
});
