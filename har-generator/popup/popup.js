const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");
const emailInput = document.querySelector("#email");
const intervalInput = document.querySelector("#interval");
const urlInput = document.querySelector("#url");
const fidInput = document.querySelector("#fid");

const inputs = [
    emailInput,
    intervalInput,
    fidInput,
    urlInput
];

inputs.forEach(i => i.addEventListener("blur", onBlur));

startButton.addEventListener("click", () => {
    if (!validate())
        return;

    updateUi(true);
    chrome.runtime.sendMessage({ type: "start" });
});

stopButton.addEventListener("click", () => {
    updateUi(false);
    chrome.runtime.sendMessage({ type: "stop" });
});

function onBlur(e) {
    if (!validate())
        return;

    chrome.storage.local.set({
        email: emailInput.value,
        urlPattern: urlInput.value,
        fid: fidInput.value,
        interval: intervalInput.value
    });
}

function validate() {
    clearErrors();

    if (!urlInput.value) {
        urlInput.value = "<all_urls>";
    }

    let isValid = true;

    if (!validateEmail(emailInput.value)) {
        showError(emailInput);
        isValid = false;
    }

    if (!validateInterval(intervalInput.value)) {
        showError(intervalInput);
        isValid = false;
    }

    if (!validateInterval(fidInput.value)){
        showError(fidInput);
        isvalid = false;
    }
    return isValid;
}

function validateEmail(email) {
    if (!email)
        return true;

    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

function validateInterval(interval) {
    interval = parseInt(interval);
    return !isNaN(interval) && interval > 0;
}

function validateFid(fid) {
    return true;
}

function clearErrors() {
    document.querySelectorAll(".invalid-feedback").forEach(e => {
        e.classList.add("d-none");
    });

    inputs.forEach(i => {
        i.classList.remove("is-invalid");
    });
}

function showError(el) {
    el.classList.add("is-invalid");
    document.querySelector(`#${el.id}-feedback`).classList.remove("d-none");
}


function updateUi(enabled) {
    if (!enabled) {
        startButton.classList.remove("d-none");
        stopButton.classList.add("d-none");

        inputs.forEach(i => i.removeAttribute("disabled"));
    } else {
        startButton.classList.add("d-none");
        stopButton.classList.remove("d-none");

        inputs.forEach(i => i.setAttribute("disabled", "disabled"));
    }
}

chrome.storage.local.get({
    email: null,
    urlPattern: "*://*.stackexchange.com/*",
    interval: 1,
    fid: null
}, function (settings) {
    emailInput.value = settings.email;
    intervalInput.value = settings.interval;
    urlInput.value = settings.urlPattern;
    fidInput.value = settings.fid;
});

// chrome.runtime.sendMessage({ type: "state" }, (enabled) => {
//     updateUi(enabled);
// });
