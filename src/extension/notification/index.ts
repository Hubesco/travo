import browser from "../../infrastructure/browser";

import "./index.css";

console.log("notification");

browser.runtime.onMessage.addListener(
  (message: any, sender: any, sendResponse: any) => {
    let notification = document.getElementById("travo-notification");
    if (notification) {
      return;
    }
    const { voucher } = message;
    console.log(voucher);
    notification = document.createElement("div");
    notification.id = "travo-notification";
    notification.className = "fade-in";
    notification.innerHTML = `
  There is a voucher to use!
  <br/>
  <p>${voucher.company}</p>
  <p></p>
  <p>${voucher.code}</p>
  `;
    document.body.appendChild(notification);
  }
);
