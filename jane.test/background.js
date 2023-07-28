console.log('inside background.js');

// Example of a simple user data object
const user = {
    username: 'demo-user'
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
// 2. A page requested user data, respond with a copy of `user`
    if (message === 'get-user-data') {
        sendResponse(user);
    }
});

// chrome.runtime.onConnect.addListener(function (port) {
//     if (port.name == "devtools-page") {
//         if (openCount == 0) {
//             alert("DevTools window opening.");
//         }
//         openCount++;

//         port.onDisconnect.addListener(function(port) {
//             openCount--;
//             if (openCount == 0) {
//                 alert("Last DevTools window closing.");
//             }
//         });
//     }
// });
