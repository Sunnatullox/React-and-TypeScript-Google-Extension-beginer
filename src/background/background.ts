chrome.runtime.onMessage.addListener((msg, sender, sendRes) => {
    console.log(msg);
    console.log(sender);
    sendRes("Hello from background")
    
})