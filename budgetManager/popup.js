"use strict";
const spentTextEl = document.getElementById("spent");
const limitTextEl = document.getElementById("limit");
const amountInputEl = document.getElementById("amount");
const submitBtnEl = document.getElementById("submit");
const clearBtnEl = document.getElementById("clear");

let totalSpent;
chrome.storage.sync.get("total", (res) => {
  totalSpent = Number(res.total) || 0;
  spentTextEl.textContent = totalSpent;
});

let limit;
chrome.storage.sync.get("limit", (res) => {
  limit = Number(res.limit) || 1000;
  limitTextEl.textContent = limit;
});

submitBtnEl.addEventListener("click", () => {
  if (amountInputEl.value && Number(amountInputEl.value)) {
    const enteredAmount = Number(amountInputEl.value);
    totalSpent += enteredAmount;
    chrome.storage.sync.set({ total: totalSpent }, () => {
      spentTextEl.textContent = totalSpent;
      if (totalSpent >= limit) {
        chrome.notifications.create("limit", {
          type: "basic",
          title: "Limit reached!",
          message: "Uh oh! it looks like you've reached your limit!",
          iconUrl: "icon48.png",
        });
      }
    });
  }
  amountInputEl.value = "";
});

clearBtnEl.addEventListener("click", () => {
  chrome.storage.sync.set({ total: 0 }, () => {
    totalSpent = 0;
    spentTextEl.textContent = 0;
    chrome.notifications.create("clear", {
      type: "basic",
      title: "cleared successfully!",
      message: "everything has been cleared and you can start from 0.",
      iconUrl: "icon48.png",
    });
  });
  amountInputEl.value = "";
});
