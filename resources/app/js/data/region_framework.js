function addRegion (region_name) {
  //Declare local instance variables
  var new_colour = generateRandomColour();
  var region_id = getIDString(region_name);

  //Initialise local instance variables
  var local_id = `input-region-list-${region_id}`;

  //Format new element
  var new_element =
  `<div id = "region-list-${region_id}" class = "region-list-entry">
    ID: <input id = "input-region-list-${region_id}-id" value = "${region_id}">
    |
    Name: <input id = "input-region-list-${region_id}-name" value = "${region_name}">
    |

    <input id = "input-region-list-${region_id}-colour-r" type = "number" min = "0" max = "255" placeholder = "R" value = "${new_colour[0]}"></input>
    <input id = "input-region-list-${region_id}-colour-g" type = "number" min = "0" max = "255" placeholder = "G" value = "${new_colour[1]}"></input>
    <input id = "input-region-list-${region_id}-colour-b" type = "number" min = "0" max = "255" placeholder = "B" value = "${new_colour[2]}"></input>

    <span id = "colour-preview-${region_id}" class = "colour-preview" style = "background-color: rgb(${new_colour[0]}, ${new_colour[1]}, ${new_colour[2]});"></span>

    <button id = "remove-region" class = "btn-remove-region-${region_name}" onclick = "removeRegion('${region_name}')">Remove Region</button>
  </div>`;
  var new_option = `<option id = "region-option-${region_id}" value = "${region_id}">${region_name}</option>`

  //Append element to regions_viewer, select menu
  regions_viewer.insertAdjacentHTML("beforeend", new_element);

  setTimeout(function(){
    document.getElementById("select-region-type").insertAdjacentHTML("beforeend", new_option);
  }, randomNumber(500, 3000));

  //Add event listeners
  regions_viewer.addEventListener("input", function (e) {
    if (e.target.id.startsWith("input-region-list-")) {
      var region_id = e.target.id.replace("input-region-list-", "")
        .replace("-colour-r", "")
        .replace("-colour-g", "")
        .replace("-colour-b", "")
      changeRegionColourPreview(region_id);
    }
  });
}

function changeRegionColourPreview (region_id) {
  //Declare local instance variables
  var pattern = `input-region-list-${region_id}-colour`;

  var r_field = document.getElementById(`${pattern}-r`).value;
  var g_field = document.getElementById(`${pattern}-g`).value;
  var b_field = document.getElementById(`${pattern}-b`).value;

  //Adjust colour preview
  try {
    document.getElementById(`colour-preview-${region_id}`).style = `background-color: rgb(${r_field}, ${g_field}, ${b_field})`;
  } catch {}
}

function declutterRegions () {
  //Declare local instance variables
  var all_regions = Object.keys(config.map.regions);

  for (var i = 0; i < all_regions.length; i++) {
    var local_region = config.map.regions[all_regions[i]];
    var region_exists = false;

    //Check if any provinces have this ID
    for (var x = 0; x < all_provinces.length; x++)
      if (provinces[all_provinces[x]].region == getIDString(local_region.name))
        region_exists = true;

    //Remove region only if it doesn't exist
    if (!region_exists)
      removeRegion(local_region.name);
  }
}

function loadRegions () {
  //Declare local instance variables
  var all_regions = Object.keys(config.map.regions);

  for (var i = 0; i < all_regions.length; i++) {
    var local_region = config.map.regions[all_regions[i]];

    //Add region name
    addRegion(local_region.name);

    //Begin modifying properties
    setTimeout(function(region_id, local_region){
      try {
        var input_pattern = `input-region-list-${region_id}`;

        document.getElementById(`${input_pattern}-id`).value = region_id;
        document.getElementById(`${input_pattern}-colour-r`).value = local_region.colour[0];
        document.getElementById(`${input_pattern}-colour-g`).value = local_region.colour[1];
        document.getElementById(`${input_pattern}-colour-b`).value = local_region.colour[2];

        //Set colour preview
        document.getElementById(`colour-preview-${region_id}`).setAttribute("style", `background-color: rgb(${local_region.colour.join(", ")});`);
      } catch {}
    }, 500, all_regions[i], local_region);
  }
}

function removeRegion (region_name) {
  //Declare local instance variables
  var region_id = getIDString(region_name);

  //Iterate over all provinces to make sure no provinces can have this region
  for (var i = 0; i < all_provinces.length; i++) {
    var local_province = provinces[all_provinces[i]];

    if (local_province.region == region_id)
      delete local_province.region;
  }

  //Log to console
  log.info(`${region_name} Region deleted.`);

  //Destroy element
  document.getElementById(`region-list-${region_id}`).remove();
  document.getElementById(`region-option-${region_id}`).remove();

  //Destroy object
  delete config.map.regions[region_id];
}

function reloadRegions () {
  if (current_mapmode == "regions") {
    var all_regions = Object.keys(config.map.regions);

    clearMap();

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = provinces[all_provinces[i]];
      var local_region = config.map.regions[local_province.region];

      if (local_region)
        if (local_region.colour)
          setFill(all_provinces[i], local_region.colour);
    }
  }
}

function setRegionData () {
  //Iterate through all region elements
  var all_regions = document.querySelectorAll(".region-list-entry");
  var set_region_data_btn = document.getElementById("set-region-data");

  for (var i = 0; i < all_regions.length; i++) {
    var local_region = all_regions[i].id.replace("region-list-", "");
    var local_region_colour = [
      document.getElementById(`input-region-list-${local_region}-colour-r`).value,
      document.getElementById(`input-region-list-${local_region}-colour-g`).value,
      document.getElementById(`input-region-list-${local_region}-colour-b`).value
    ];
    var local_region_id = document.getElementById(`input-region-list-${local_region}-id`).value;
    var local_region_name = document.getElementById(`input-region-list-${local_region}-name`).value;

    if (!config.map.regions[local_region_id])
      config.map.regions[local_region_id] = {
        name: local_region_name,
        colour: local_region_colour
      };
    else {
      var region_obj = config.map.regions[local_region_id];

      region_obj.name = local_region_name;
      region_obj.colour = local_region_colour;
    }
  }

  //Reload regions
  reloadRegions();

  //Export config
  exportConfig();

  //Quick set animation
  set_region_data_btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>&nbsp;&nbsp; Region Data Set!`;

  setTimeout(function(){
    set_region_data_btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>&nbsp; &nbsp; Set Region Data`;
  }, 1000);
}
