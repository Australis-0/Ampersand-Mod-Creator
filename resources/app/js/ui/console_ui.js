var console_text_array = [];

//Add basic button functionality
document.getElementById("open-console").onclick = function () {
  toggleConsoleVisibility();
};

//Log functions meant for global export
var log_top = false;
var log = {
  clear: function () {
    console_text_array = [];
    updateLog();
  },
  error: function (error_msg) {
    //Fetch timestamp and append it to error message
    var current_date = new Date();
    var h = addLeadingZero(current_date.getHours());
    var m = addLeadingZero(current_date.getMinutes());
    var s = addLeadingZero(current_date.getSeconds());
    var formatted_string = `[${h}:${m}:${s}]: `;

    error_msg = formatted_string + error_msg;

    console_text_array[(log_top) ? "unshift" : "push"]("<div class = 'console-msg error-msg'><span class = 'error-prefix'>[Error]</span> " + error_msg + "</div>");
    updateLog();
  },
  info: function (info_msg) {
    //Fetch timestamp and append it to info msg - remember to refactor to global function later WIP
    var current_date = new Date();
    var h = addLeadingZero(current_date.getHours());
    var m = addLeadingZero(current_date.getMinutes());
    var s = addLeadingZero(current_date.getSeconds());
    var formatted_string = `[${h}:${m}:${s}]: `;

    info_msg = formatted_string + info_msg;
    console_text_array[(log_top) ? "unshift" : "push"]("<div class = 'console-msg info-msg'><span class = 'info-prefix'>[Info]</span> " + info_msg + "</div>");
    updateLog();
  },
  warn: function (error_msg) {
    //Fetch timestamp and append it to error message
    var current_date = new Date();
    var h = addLeadingZero(current_date.getHours());
    var m = addLeadingZero(current_date.getMinutes());
    var s = addLeadingZero(current_date.getSeconds());
    var formatted_string = `[${h}:${m}:${s}]: `;

    error_msg = formatted_string + error_msg;

    console_text_array[(log_top) ? "unshift" : "push"]("<div class = 'console-msg warn-msg'><span class = 'warn-prefix'>[Warn]</span> " + error_msg + "</div>");
    updateLog();
  }
};

//Update main button value in header to support closing and opening the console
setInterval(function(){
  updateConsoleIndicator();
}, 100);

//Update log to match the most recent iteration of console_text_array
{
  function isConsoleVisible () {
    return (console_container.getAttribute("class").includes("hidden")) ? true : false;
  }
  function updateConsoleIndicator () {
    var console_indicator = document.getElementById("open-console");
    console_indicator.innerHTML = (isConsoleVisible()) ? "Open Console" : "Close Console";
  }
  function toggleConsoleVisibility () {
    console_container.setAttribute("class",
      (console_container.getAttribute("class").includes("hidden")) ? "console-container" : "console-container hidden"
    );
  }
  function updateLog () {
    var processed_console_array = JSON.parse(JSON.stringify(console_text_array)).reverse();
    console_el.innerHTML = processed_console_array.join("");
  }
}

//Initialise console
toggleConsoleVisibility();
