function addTerrain (terrain_name) {
  //Declare local instance variables
  var new_colour = generateRandomColour();
  var terrain_id = getIDString(terrain_name);

  //Initialise local instance variables
  var local_id = `input-terrain-list-${terrain_id}`;

  //Format new_element
  var new_element =
  `<div id = "terrain-list-${terrain_id}" class = "terrain-list-entry">
    ID: <input id = "input-terrain-list-${terrain_id}-id" value = "${terrain_id}">
    |
    Name: <input id = "input-terrain-list-${terrain_id}-name" value = "${terrain_name}">
    |

    <input id = "input-terrain-list-${terrain_id}-colour-r" type = "number" min = "0" max = "255" placeholder = "R"></input>
    <input id = "input-terrain-list-${terrain_id}-colour-g" type = "number" min = "0" max = "255" placeholder = "G"></input>
    <input id = "input-terrain-list-${terrain_id}-colour-b" type = "number" min = "0" max = "255" placeholder = "B"></input>

    <span id = "colour-preview-${terrain_id}" class = "terrain-colour-preview" style = "background-color: rgb(${new_colour[0]}, ${new_colour[1]}, ${new_colour[2]});"></span>

    <button id = "remove-terrain" class = "btn-remove-terrain-${terrain_name}" onclick = "removeTerrain('${terrain_name}')">Remove Terrain</button>
  </div>`;
  var new_option = `<option id = "terrain-option-${terrain_id}" value = "${terrain_id}">${terrain_name}</option>`;

  //Append element to terrain_viewer
  terrain_viewer.insertAdjacentHTML("beforeend", new_element);

  setTimeout(function(){
    document.getElementById("select-terrain-type").insertAdjacentHTML("beforeend", new_option);
  }, randomNumber(500, 3000));

  //Change colour status
  document.getElementById(`${local_id}-colour-r`).value = new_colour[0];
  document.getElementById(`${local_id}-colour-g`).value = new_colour[1];
  document.getElementById(`${local_id}-colour-b`).value = new_colour[2];

  //Add event listeners
  document.getElementById(`terrain-list-${terrain_id}`).addEventListener("input", function (e) {
    changeTerrainColourPreview(terrain_id);
  });
}

function changeTerrainColourPreview (terrain_name) {
  //Declare local instance variables
  var r_field = document.getElementById(`input-terrain-list-${terrain_name}-colour-r`).value;
  var g_field = document.getElementById(`input-terrain-list-${terrain_name}-colour-g`).value;
  var b_field = document.getElementById(`input-terrain-list-${terrain_name}-colour-b`).value;

  //Adjust colour preview
  try {
    document.getElementById(`colour-preview-${terrain_name}`).style = `background-color: rgb(${r_field}, ${g_field}, ${b_field});`;
  } catch {}
}

function loadTerrain () {
  //Declare local instance variables
  var all_terrains = Object.keys(config.terrain);

  for (var i = 0; i < all_terrains.length; i++) {
    var local_terrain = config.terrain[all_terrains[i]];

    //Add terrain name
    addTerrain(local_terrain.name);

    //Begin modifying properties
    setTimeout(function(terrain_name, local_terrain){
      try {
        document.getElementById(`input-terrain-list-${terrain_name}-id`).value = terrain_name;
        document.getElementById(`input-terrain-list-${terrain_name}-colour-r`).value = local_terrain.colour[0];
        document.getElementById(`input-terrain-list-${terrain_name}-colour-g`).value = local_terrain.colour[1];
        document.getElementById(`input-terrain-list-${terrain_name}-colour-b`).value = local_terrain.colour[2];

        //Set colour preview
        document.getElementById(`colour-preview-${terrain_name}`).setAttribute("style", `background-color: rgb(${local_terrain.colour.join(", ")});`);
      } catch {}
    }, 500, all_terrains[i], local_terrain);
  }
}

function reloadTerrain () {
  if (current_mapmode == "terrain") {
    var all_terrains = Object.keys(config.terrain);

    clearMap();

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = provinces[all_provinces[i]];
      var local_terrain = config.terrain[local_province.terrain];

      if (local_terrain)
        if (local_terrain.colour)
          setFill(all_provinces[i], local_terrain.colour);
    }
  }
}

function removeTerrain (terrain_name) {
  //Declare local instance variables
  var terrain_id = getIDString(terrain_name);

  //Destroy element
  document.getElementById(`terrain-list-${terrain_id}`).remove();

  //Destroy object
  delete config.terrain[terrain_id];
}

function setTerrainData () {
  //Iterate through all terrain elements
  var all_terrains = document.querySelectorAll(".terrain-list-entry");
  var set_terrain_data_btn = document.getElementById("set-terrain-data");

  for (var i = 0; i < all_terrains.length; i++) {
    var local_terrain = all_terrains[i].id.replace("terrain-list-", "");
    var local_terrain_colour = [
      document.getElementById(`input-terrain-list-${local_terrain}-colour-r`).value,
      document.getElementById(`input-terrain-list-${local_terrain}-colour-g`).value,
      document.getElementById(`input-terrain-list-${local_terrain}-colour-b`).value
    ];
    var local_terrain_id = document.getElementById(`input-terrain-list-${local_terrain}-id`).value;
    var local_terrain_name = document.getElementById(`input-terrain-list-${local_terrain}-name`).value;

    if (!config.terrain[local_terrain_id])
      config.terrain[local_terrain_id] = {
        name: local_terrain_name,
        colour: local_terrain_colour
      };
    else {
      var terrain_obj = config.terrain[local_terrain_id];

      terrain_obj.name = local_terrain_name;
      terrain_obj.colour = local_terrain_colour;
    }
  }

  //Reload terrain
  reloadTerrain();

  //Export config
  exportConfig();

  //Quick set animation
  set_terrain_data_btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>&nbsp;&nbsp; Terrain Data Set!`;

  setTimeout(function(){
    set_terrain_data_btn.innerHTML = `<i class="fas fa-check" aria-hidden="true"></i>&nbsp; &nbsp; Set Terrain Data`;
  }, 1000);
}
