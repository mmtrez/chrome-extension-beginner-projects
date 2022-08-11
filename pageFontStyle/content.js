chrome.runtime.sendMessage({ todo: "showPageAction" });
chrome.runtime.onMessage.addListener((req, sender, res) => {
  document.getElementsByTagName("body")[0].style.color = req.color;
});
