var s = document.createElement('script');
s.src = chrome.extension.getURL('nanta-ui-logic.js');
(document.head||document.documentElement).appendChild(s);

// clean up call back
s.onload = function() {
  s.parentNode.removeChild(s);

  // send to background script
};

window.addEventListener('message', (e) => {
  const msg = e.data;

  if (msg?.search) {
    chrome.runtime.sendMessage({searchTerm: msg.searchTerm});
  }
});

// receive messages from chrome extension icon
// primary to hide/show the injected UI
chrome.runtime.onMessage.addListener((request, sender, callback) => {
  const msg = request;

  if (msg?.toggleUi) {
    const ui = document.getElementById('nanta-ui');

    if (ui.classList.contains('hidden')) {
      ui.classList.remove('hidden');
    } else {
      ui.classList.add('hidden');
    }
  }

  // have to call this to avoid error
  callback('');
});
