const colorPickerEl = document.getElementById("fontColor");
const submitBtnEl = document.getElementById("submit");

submitBtnEl.addEventListener("click", () => {
  const color = colorPickerEl.value;
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { todo: "changeColor", color: color });
  });
});
