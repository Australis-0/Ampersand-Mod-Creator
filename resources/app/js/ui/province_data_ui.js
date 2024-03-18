document.getElementById("remove-empty-regions").onclick = function () {
  declutterRegions();
};
document.getElementById("add-region").onclick = function () {
  var new_region = document.getElementById("add-region-name").value;

  if (new_region.length > 0) {
    if (!config.map.regions[getIDString(new_region)]) {
      addRegion(new_region);
      setRegionData();

      //Reset box value
      document.getElementById("add-region-name").value = "";
    } else {
      printAlert("region-alert", "Cannot set region with duplicate ID!");
    }
  } else {
    printAlert("region-alert", "New region type must have a name!");
  }
};
document.getElementById("set-region-data").onclick = function () {
  setRegionData();
};
