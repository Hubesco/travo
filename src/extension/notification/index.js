console.log("init");

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let notification = document.getElementById("travo-notification");
  if (notification) {
    return;
  }
  notification = document.createElement("div");
  notification.id = "travo-notification";
  notification.style.boxShadow = "0 4px 8px 0 rgba(0,0,0,0.2)";
  notification.style.borderRadius = "4px";
  notification.style.width = "240px";
  notification.style.height = "120px";
  notification.style.padding = "16px";
  notification.style.position = "fixed";
  notification.style.background = "white";
  notification.style.bottom = "16px";
  notification.style.right = "32px";
  notification.style.zIndex = "10000";
  notification.innerHTML = "my div";
  document.body.appendChild(notification);
});
