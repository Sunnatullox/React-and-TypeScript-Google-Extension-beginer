chrome.runtime.sendMessage("Hello Content", (res) => {
    console.log(res)
})