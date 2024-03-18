document.getElementById("add-terrain").onclick = function () {
  var new_terrain = document.getElementById("add-terrain-name").value;

  if (new_terrain.length > 0) {
    if (!config.terrain[getIDString(new_terrain)]) {
      addTerrain(new_terrain);
      setTerrainData();

      //Reset box value
      document.getElementById("add-terrain-name").value = "";
    } else {
      printAlert("terrain-alert", "Cannot set terrain with duplicate ID!");
    }
  } else {
    printAlert("terrain-alert", "New terrain type must have a name!");
  }
};
document.getElementById("set-terrain-data").onclick = function () {
  setTerrainData();
};
