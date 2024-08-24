chrome.storage.sync.get('darkMode', function(data) {
  if (data.darkMode) {
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    document.body.style.backgroundColor = "#121212";
  }
});
