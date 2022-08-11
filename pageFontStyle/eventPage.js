chrome.runtime.onMessage.addListener((req, sender, res) => {
  if (req.todo === "showPageAction") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.pageAction.show(tabs[0].id);
    });
  }
});
