//Initialise global settings variables
window.settings = {
  coastal_types: [
    "coastal",
    "land",
    "sea"
  ],
  colours: {
    coastal: [62, 83, 44],
    land: [116, 129, 85],
    sea: [23, 95, 109]
  },
};

//Declare functions
function changeColourPreview (colour_id) {
  var colour_id = colour_id.target.id
    .replace("colour-list-", "")
    .replace("-colour-r", "")
    .replace("-colour-g", "")
    .replace("-colour-b", "");

  //Declare local instance variables
  var r_field = document.getElementById(`colour-list-${colour_id}-colour-r`).value;
  var g_field = document.getElementById(`colour-list-${colour_id}-colour-g`).value;
  var b_field = document.getElementById(`colour-list-${colour_id}-colour-b`).value;

  //Adjust colour preview
  try {
    document.getElementById(`colour-preview-${colour_id}`).style = `background-color: rgb(${r_field}, ${g_field}, ${b_field})`;
  } catch {}
}

function loadSettings () {
  //Declare local instance variables
  var all_colours = Object.keys(settings.colours);

  for (var i = 0; i < all_colours.length; i++) try {
    var local_id = `colour-list-${all_colours[i]}`;

    var local_coastal_field = document.getElementById("select-province-type");
    var local_colour = settings.colours[all_colours[i]];

    //Change colour status
    document.getElementById(`${local_id}-colour-r`).value = local_colour[0];
    document.getElementById(`${local_id}-colour-g`).value = local_colour[1];
    document.getElementById(`${local_id}-colour-b`).value = local_colour[2];

    if (settings.coastal_types.includes(all_colours[i]))
      local_coastal_field.innerHTML += `<option value = "${all_colours[i]}" ${(all_colours[i] == "land") ? "selected" : ""}>${localisation.colours[all_colours[i]]}</option>`;
  } catch {}
}

function setSettings () {
  //Iterate through all colour fields
  var all_colours = document.querySelectorAll(".colour-list-entry");
  var set_settings_data_btn = document.getElementById("set-settings-data");

  for (var i = 0; i < all_colours.length; i++)
    settings.colours[all_colours[i].id.replace("colour-list-", "")] = [
      document.getElementById(`${all_colours[i].id}-colour-r`).value,
      document.getElementById(`${all_colours[i].id}-colour-g`).value,
      document.getElementById(`${all_colours[i].id}-colour-b`).value
    ];

  //Export config
  exportConfig();

  //Quick set animation
  set_settings_data_btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>&nbsp;&nbsp; Settings Set!`;

  setTimeout(function(){
    set_settings_data_btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>&nbsp;&nbsp; Set Settings`;
  }, 1000);

  //Reload settings
  loadSettings();
}

//Add colour settings to settings window
var colour_settings_loader = setInterval(function(){
  try {
    var all_colours = Object.keys(settings.colours);

    for (var i = 0; i < all_colours.length; i++) {
      var local_id = `colour-list-${all_colours[i]}`;

      var local_colour = settings.colours[all_colours[i]];
      var local_colour_field =
      `<div id = "colour-list-${all_colours[i]}" class = "colour-list-entry">
        <span class = "settings-fixed-width-colour-label">${localisation.colours[all_colours[i]]}</span>
        ${localisation.format.pipe_divider}

        <input id = "colour-list-${all_colours[i]}-colour-r" type = "number" min = "0" max = "255" placeholder = "R"></input>
        <input id = "colour-list-${all_colours[i]}-colour-g" type = "number" min = "0" max = "255" placeholder = "G"></input>
        <input id = "colour-list-${all_colours[i]}-colour-b" type = "number" min = "0" max = "255" placeholder = "B"></input>

        <span id = "colour-preview-${all_colours[i]}" class = "colour-preview" style = "background-color: rgb(${local_colour[0]}, ${local_colour[1]}, ${local_colour[2]});"></span>
      </div>`;

      //Append element to terrain viewer
      colour_settings.insertAdjacentHTML("beforeend", local_colour_field);

      //Change colour status
      document.getElementById(`${local_id}-colour-r`).value = local_colour[0];
      document.getElementById(`${local_id}-colour-g`).value = local_colour[1];
      document.getElementById(`${local_id}-colour-b`).value = local_colour[2];

      //Add event listeners
      document.getElementById(`colour-list-${all_colours[i]}`).addEventListener("input", function (e) {
        changeColourPreview(e);
      });
    }

    clearInterval(colour_settings_loader);
  } catch {}
}, 2500);
