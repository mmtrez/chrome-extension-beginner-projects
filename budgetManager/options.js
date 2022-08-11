"use strict";
const limitInputEl = document.getElementById("limit");
const submitBtnEl = document.getElementById("submit");

submitBtnEl.addEventListener("click", () => {
  if (limitInputEl.value && Number(limitInputEl.value)) {
    chrome.storage.sync.set({ limit: limitInputEl.value }, () => {
      close();
    });
  }
  limitInputEl.value = "";
});
