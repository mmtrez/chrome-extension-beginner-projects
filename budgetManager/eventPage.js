chrome.contextMenus.create({
  id: "budgetManager",
  title: "Spend Money",
  contexts: ["selection"],
});

chrome.contextMenus.onClicked.addListener((e) => {
  if (e.menuItemId === "budgetManager") {
    if (!isNaN(e.selectionText) && e.selectionText) {
      let totalSpent;
      let limit;
      chrome.storage.sync.get(["total", "limit"], (res) => {
        totalSpent = res.total || 0;
        limit = res.limit || 1000;
        totalSpent += Number(e.selectionText);
        chrome.storage.sync.set({ total: totalSpent }, () => {
          chrome.notifications.create("added", {
            type: "basic",
            title: "Spent successfully.",
            message: "added to your total spent successfully.",
            iconUrl: "icon48.png",
          });
          if (totalSpent >= limit) {
            chrome.notifications.create("limit", {
              type: "basic",
              title: "Limit reached!",
              message: "Uh oh! it looks like you've reached your limit!",
              iconUrl: "icon48.png",
            });
          }
        });
      });
    }
  }
});
