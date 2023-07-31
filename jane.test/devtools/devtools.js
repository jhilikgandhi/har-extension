console.log(':::::inside devtools');

// function handleNavigated(url) {
//     console.log('::::' + url);
// }

// chrome.devtools.network.onNavigated.addListener(handleNavigated);

// const downloadHar = async() => {
//     await DelayNode(5000);
//     console.log('Waited 5s');

//     chrome.devtools.network.getHAR(
//         function (harLog) {
//             let updatedHarLog = {};
//             updatedHarLog.log = harLog;
    
//             let harBLOB = new Blob([JSON.stringify(updatedHarLog)]);
    
//             let url = URL.createObjectURL(harBLOB);
    
//             chrome.downloads.download({
//                 url: url,
//                 filename: "test.har"
//             });
//             console.log(':::::har log downloaded');
//         }
//     );
// }

var interval = setInterval( function() {
    clearInterval(interval);
    chrome.devtools.network.getHAR(
        function (harLog) {
            let updatedHarLog = {};
            updatedHarLog.log = harLog;
    
            let harBLOB = new Blob([JSON.stringify(updatedHarLog)]);
    
            let url = URL.createObjectURL(harBLOB);
    
            chrome.downloads.download({
                url: url,
                filename: "test.har"
            });
            console.log(':::::har log downloaded');
        }
    );             
     }, 5000 );

     
chrome.devtools.panels.create("Test", null, "devtools/panel.html", function(panel) {
    // code invoked on panel creation
    console.log(':::::inside panel.create');
});