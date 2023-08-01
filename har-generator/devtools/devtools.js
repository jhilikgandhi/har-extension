const settings = {
    // interval: 600000,            // Default: 10 minutes
    interval: 60000,                // Testing: 1 minute
    email: 'OPOET@freddiemac.com',  // Default: OPOET@freddiemac.com
    employeeId: 'f00000'            // Default: f00000
};

class CustomHar {
    static arrayRequests = new Array();

    constructor() {
        console.log('::::Creating CustomHar');
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

function createValidHar() {
    let harJson = {
        "log": {
            "version": "1.2",
            "creator": {
              "name": "WebInspector",
              "version": "537.36"
            },
            "pages": [
              {
                "startedDateTime": "2023-08-01T14:43:26.263Z",
                "id": "page_2",
                "title": "https://developer.chrome.com/",
                "pageTimings": {
                  "onContentLoad": 480.81699998874683,
                  "onLoad": 687.0179999968968
                }
              }
            ],
            "entries": CustomHar.generateHar()
          }
    }
    
    let harBlob = new Blob([JSON.stringify(harJson)]);
    console.log('::::Generated harBlob');
    console.log(harBlob);
    return harBlob;
}

var interval = setInterval( function() {
    clearInterval(interval);
    // let harBlob = new Blob([JSON.stringify(CustomHar.generateHar())]);
    let harBlob = createValidHar();
    let url = URL.createObjectURL(harBlob);

    let currentDatetime =  new Date();
    let formattedFilename = settings.employeeId.split('@')[0] + "-" + currentDatetime.getFullYear() + currentDatetime.getMonth() + 
        currentDatetime.getDay() + '_' + currentDatetime.getHours() + currentDatetime.getMinutes() + ".txt";    

    chrome.downloads.download({
        url: url,
        filename: formattedFilename
    });
    console.log('::::' + formattedFilename);

  }, settings.interval );

chrome.devtools.panels.create("Logging Info", null, "devtools/panel.html", function(panel) {
    // code invoked on panel creation
    trace.log('::::inside panel.create');
});

chrome.devtools.network.onRequestFinished.addListener( (request) => {
    console.log('::::onRequestfinished');
    console.log(request);
    CustomHar.addRequest(request);
});
