document.addEventListener('DOMContentLoaded', function() {
  const toggle = document.getElementById('darkModeToggle');

  // Load the current state
  chrome.storage.sync.get('darkMode', function(data) {
    toggle.checked = data.darkMode;
  });

  toggle.addEventListener('change', function() {
    const darkMode = toggle.checked;
    chrome.storage.sync.set({ darkMode });

    // Apply or remove dark mode on the active tab
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: setDarkMode,
        args: [darkMode]
      });
    });
  });
});

function setDarkMode(enabled) {
  if (enabled) {
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    document.body.style.backgroundColor = "#121212";
  } else {
    document.body.style.filter = "";
    document.body.style.backgroundColor = "";
  }
}
