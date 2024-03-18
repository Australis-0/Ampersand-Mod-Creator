document.getElementById("clear-log").onclick = function () {
  log.clear();

  //Quick UI update animation
  document.getElementById("clear-log").innerHTML = "Log Cleared!";

  setTimeout(function(){
    document.getElementById("clear-log").innerHTML = "Clear Log";
  }, 3000);
};
document.getElementById("debugger-log").onclick = function () {
  logIssues();

  //Quick UI update animation
  document.getElementById("debugger-log").innerHTML = `<i class = "fas fa-scroll"></i>&nbsp;&nbsp; Issues should appear in console!`;

  setTimeout(function(){
    document.getElementById("debugger-log").innerHTML = `<i class = "fas fa-scroll"></i>&nbsp;&nbsp; Log Issues to Console`;
  }, 3000);
};
document.getElementById("set-settings-data").onclick = function () {
  setSettings();
};
