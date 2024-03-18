//Apply empty classes to all mapmodes
var all_mapmodes = document.querySelectorAll(".mapmode-button-container button");

//Set empty class parameters if not found
for (var i = 0; i < all_mapmodes.length; i++) {
  if (!all_mapmodes[i].getAttribute("class")) {
    all_mapmodes[i].setAttribute("class", "");
  }
}

//Basic framework functions
{
  function switchMapmode (mapmode) {
    var active_button = document.getElementById(mapmode + "-mapmode");
     ;

    for (var i = 0; i < all_mapmodes.length; i++)
      all_mapmodes[i].setAttribute("class", "");

    active_button.setAttribute("class", "active");

    switch (mapmode) {
      case "normal":
        current_mapmode = "normal";
        clearMap();

        break;
      case "adjacencies":
        current_mapmode = "adjacencies";
        clearMap();
        renderAdjacencies(svg);

        break;
      case "coastal":
        current_mapmode = "coastal";
        clearMap();

        for (var i = 0; i < all_provinces.length; i++)
          (provinces[all_provinces[i]].type) ?
            setFill(all_provinces[i], settings.colours[provinces[all_provinces[i]].type]) :
            setFill(all_provinces[i], settings.colours.land);

        break;
      case "regions":
        current_mapmode = "regions";
        reloadRegions();

        break;
      case "terrain":
        current_mapmode = "terrain";
        reloadTerrain();

        break;
    }
  }
}

//Button functionality for switching mapmodes
for (var i = 0; i < all_mapmodes.length; i++) {
  all_mapmodes[i].onclick = function (e) {
    //Retrieve button element
    var button_obj;
    for (var i = 0; i < e.path.length; i++) {
      try {
        if (e.path[i].getAttribute("id").includes("-mapmode")) {
          button_obj = e.path[i];
        }
      } catch {}
    }
    console.log(e)
    var local_mapmode_name = button_obj.getAttribute("id").replace("-mapmode", "");
    if (local_mapmode_name != current_mapmode) {
      switchMapmode(local_mapmode_name);

      //Set various painting/keybind modes to their defaults
      adjacency_mode = (local_mapmode_name == "adjacencies");
      coastal_mode = (local_mapmode_name == "coastal");
      normal_mode = (local_mapmode_name == "normal");
      region_mode = (local_mapmode_name == "regions");
      terrain_mode = (local_mapmode_name == "terrain");
    }
  };
}

//Mapmode logic loop
setInterval(function(){
  //Try/catch just for routine error trapping
  try {
    document.getElementById("current-mapmode-indicator").innerHTML = mapmodes[current_mapmode];
  } catch {}
}, 100);

//Tooltip functionality
var specified_mapmodes = Object.keys(mapmodes);
for (var i = 0; i < specified_mapmodes.length; i++)
  try {
    document.getElementById(`${specified_mapmodes[i]}-mapmode`).setAttribute("data-tippy-content", mapmodes[specified_mapmodes[i]]);
  } catch {}

tippy.default("[data-tippy-content]", { arrow: true });
