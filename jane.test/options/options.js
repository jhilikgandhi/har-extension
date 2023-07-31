function harSaveOptions() {
  let email = document.getElementById('email').value;
  let limit = document.getElementById('limit').value;
  chrome.storage.local.set({
      email:email,
      limit: limit

  }, function () {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      console.log("Save?");
      setTimeout(function () {
          status.textContent = '';
      }, 750);
  });
}
document.getElementById('save').addEventListener('click',harSaveOptions);
