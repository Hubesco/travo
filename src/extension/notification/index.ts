import browser from "../../infrastructure/browser";
import { format } from "../../utils/date";

import "./index.css";

browser.runtime.onMessage.addListener(
  (message: any, sender: any, sendResponse: any) => {
    let notification = document.getElementById("travo-notification");
    if (notification) {
      return;
    }
    const { voucher } = message;
    notification = document.createElement("div");
    notification.id = "travo-notification";
    notification.className = "fade-in";
    notification.innerHTML = `
      <header>
        <h6>Travo<h6>
      </header>
      <section>
        <p class="title">Voucher available!</p>
        <p>${voucher.company}</p>
        <p>${format(new Date(voucher.expiryDate))}</p>
        <p class="code">${voucher.code}</p>
      </section>
      `;
    document.body.appendChild(notification);
  }
);
