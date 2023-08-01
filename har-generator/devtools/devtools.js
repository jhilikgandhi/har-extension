const settings = {
    // interval: 600000,            // Default: 10 minutes
    interval: 60000,                // Testing: 1 minute
    email: 'OPOET@freddiemac.com',  // Default: OPOET@freddiemac.com
    employeeId: 'f00000'            // Default: f00000
};

class CustomHar {
    // static arrayRequests = new Array();

    // constructor() {
    //     console.log('Creating CustomHar');
    // }

    // static addRequest(request) {
    //     console.log('::::Adding request');
    //     this.arrayRequests.push(request);
    // }

    // static generateHar() {
    //     console.log('::::Generating HAR');
    //     return this.arrayRequests;
    // }

    // static clearRequest() {
    //     console.log('::::Clearing HAR')
    //     this.arrayRequests.length = 0;
    // }
    static arrayRequests = new Array();

    constructor() {
        console.log('Creating CustomHar');
    }

    static addRequest(request) {
        console.log('::::Adding request');
        this.arrayRequests.push(request);
    }

    static generateHar() {
        console.log('::::Generating HAR');
        return this.arrayRequests;
    }

    static clearRequest() {
        console.log('::::Clearing HAR')
        this.arrayRequests.length = 0;
    }
}

const trace = {
    log: function(...args) {
        const escaped = args.map(JSON.stringify).join(",");
        chrome.devtools.inspectedWindow.eval(`console.log(${escaped});`);
    },
};
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

// var interval = setInterval( function() {
//     clearInterval(interval);
//     chrome.devtools.network.getHAR(
//         function (harLog) {
//             let updatedHarLog = {};
//             updatedHarLog.log = harLog;

//             let harBLOB = new Blob([JSON.stringify(updatedHarLog)]);
//             let url = URL.createObjectURL(harBLOB);

//             let currentDatetime =  new Date();
//             let formattedFilename = settings.employeeId.split('@')[0] + "-" + currentDatetime.getFullYear() + currentDatetime.getMonth() + currentDatetime.getDay() + ':' + currentDatetime.getHours() + currentDatetime.getMinutes() + ".txt"

//             chrome.downloads.download({
//                 url: url,
//                 filename: formattedFilename
//             });
//             console.log(':::::har log downloaded');
//             console.log(':::::' + formattedFilename);
//         }
//     );
//   }, settings.interval );

var interval = setInterval( function() {
    clearInterval(interval);
    let harBlob = new Blob([JSON.stringify(Customhar.generateHar())]);
    let url = URL.createObjectURL(harBlob);

    let currentDatetime =  new Date();
    let formattedFilename = settings.employeeId.split('@')[0] + "-" + currentDatetime.getFullYear() + currentDatetime.getMonth() + 
        currentDatetime.getDay() + '_' + currentDatetime.getHours() + currentDatetime.getMinutes() + ".txt";    

    chrome.downloads.download({
        url: url,
        filename: formattedFilename
    });
    console.log(':::::harBlob');
    console.log(harBlob);
    console.log(':::::har log downloaded');
    console.log(':::::' + formattedFilename);

  }, settings.interval );

chrome.devtools.panels.create("Test", null, "devtools/panel.html", function(panel) {
    // code invoked on panel creation
    trace.log(':::::inside panel.create');
});

chrome.devtools.network.onRequestFinished.addListener( (request) => {
    console.log(':::::request finished');
    console.log(request);
    CustomHar.addRequest(request);
});
