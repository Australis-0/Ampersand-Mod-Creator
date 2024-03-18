window.onload = function () {
	window.deleteRegion = function () {
		if (selected_province != "")
			if (provinces[selected_province].region) {
				var region_obj = config.map.regions[provinces[selected_province].region];

				try {
					//Delete region
					removeRegion(region_obj.name);

					//Update map
					reloadRegions();
				} catch {}
			}
	};
	window.removeProvinceRegion = function () {
		if (selected_province != "") {
			delete provinces[selected_province].region;
			clearFill(selected_province);
		}
	};
	window.removeProvinceTerrain = function () {
		if (selected_province != "") {
			delete provinces[selected_province].terrain;
			clearFill(selected_province);
		}
	};
	window.setAdjacency = function () {
		if (selected_adjacency == "") {
			selected_adjacency = selected_province;
		} else {
			if (selected_adjacency != selected_province) {
				//Create province if not defined
				createProvince(selected_province);

				//Set adjacency
				createAdjacency(top_svg, selected_adjacency, selected_province);
				selected_adjacency = "";
			}
		}
	};
	window.setCoastal = function () {
		if (selected_province != "") {
			var province_type = document.getElementById("select-province-type").value;

			//Create province if not defined
			createProvince(selected_province);

			//Set new province colour
			provinces[selected_province].type = province_type;
			setFill(selected_province, settings.colours[province_type]);
		}
	};
	window.setRegion = function () {
		if (selected_province != "") {
			var local_region_id = getIDString(document.getElementById("select-region").value.trim());

			//Create province if not defined
			createProvince(selected_province);

			//Set new province colour
			if (config.map.regions[local_region_id]) {
				var local_region = config.map.regions[local_region_id];

				provinces[selected_province].region = local_region_id;
				setFill(selected_province, local_region.colour);
			} else {
				window.removeProvinceRegion();
			}
		}
	}
	window.setTerrain = function () {
		if (selected_province != "") {
			var local_terrain_id = getIDString(document.getElementById("select-terrain").value.trim());

			//Create province if not defined
			createProvince(selected_province);

			//Set new province colour
			if (config.terrain[local_terrain_id]) {
				var local_terrain = config.terrain[local_terrain_id];

				provinces[selected_province].terrain = local_terrain_id;
				setFill(selected_province, local_terrain.colour);
			} else {
				window.removeProvinceTerrain();
			}
		}
	}

  //Header Buttons
	{
		document.getElementById("hide-labels").onclick = function () {
			if (!labels_hidden) {
				labels_hidden = true;
				document.getElementById("map-overlay").setAttribute("src", "./map/empty.png");
				document.getElementById("hide-labels").innerHTML = "Show Labels";
			} else {
				labels_hidden = false;
				document.getElementById("map-overlay").setAttribute("src", "./map/province_ids.png");
				document.getElementById("hide-labels").innerHTML = "Hide Labels";
			}
		};
		document.getElementById("hide-borders").onclick = function () {
			if (!borders_hidden) {
				borders_hidden = true;
				document.getElementById("hide-borders").innerHTML = "Show Borders";
				for (var i = 0; i < all_provinces.length; i++)
					try {
						province_map.getElementById(all_provinces[i]).style.strokeOpacity = "0";
						province_map.getElementById(all_provinces[i]).style.strokeWidth = "0px";
					} catch {}
			} else {
				borders_hidden = false;
				document.getElementById("hide-borders").innerHTML = "Hide Borders";
				for (var i = 0; i < all_provinces.length; i++)
					try {
						province_map.getElementById(all_provinces[i]).style.strokeOpacity = "1";
						province_map.getElementById(all_provinces[i]).style.strokeWidth = "0.264583px";
					} catch {}
			}
		};

	  document.querySelector(".map").onclick = function () {
	    switchTab("map");
	    hideAllWindows();
	    header_indicator_el.style.marginLeft = "0%";
	  };
	  document.querySelector(".terrain").onclick = function () {
	    switchTab("terrain");
	    hideAllWindows();
	    header_indicator_el.style.marginLeft = "calc(10% + 0.25rem)";

	    //Open terrain window
	    document.getElementById("terrain-container").setAttribute("class", "terrain-container visible");
	  };
		document.querySelector(".provinces").onclick = function () {
	    switchTab("provinces");
	    hideAllWindows();
	    header_indicator_el.style.marginLeft = "calc(20% + 0.5rem)";

	    //Open provinces window
	    document.getElementById("provinces-container").setAttribute("class", "provinces-container visible");
	  };
	  document.querySelector(".settings").onclick = function () {
	    switchTab("settings");
	    hideAllWindows();
	    header_indicator_el.style.marginLeft = "calc(30% + 0.75rem)";

	    //Open settings window
	    document.getElementById("settings-container").setAttribute("class", "settings-container visible");
	  };
	}

  //Province UI
	{
		document.getElementById("confirm-province-type").onclick = function () {
			window.setCoastal();
		};
		document.getElementById("confirm-province-region").onclick = function () {
			window.setRegion();
		};
		document.getElementById("confirm-province-terrain").onclick = function () {
			window.setTerrain();
		};
		document.getElementById("export-data").onclick = function () {
			exportConfig();
			exportProvinces();

			document.getElementById("export-data").innerHTML = "Data Exported!";
			setTimeout(function(){
				document.getElementById("export-data").innerHTML = "Export Data";
			}, 3000);
		};
		document.getElementById("set-adjacency-button").onclick = function () {
			window.setAdjacency();
		};
		document.getElementById("remove-adjacency-button").onclick = function () {
			if (selected_adjacency != "" && selected_province != "")
				for (var i = 0; i < all_provinces.length; i++)
					if (provinces[all_provinces[i]].adjacencies != undefined)
						for (var x = 0; x < provinces[all_provinces[i]].adjacencies.length; x++)
							if (provinces[all_provinces[i]].adjacencies[x] == selected_adjacency || provinces[all_provinces[i]].adjacencies[x] == selected_province)
								provinces[all_provinces[i]].adjacencies.splice(x, 1);

				removeAdjacency(top_svg, selected_adjacency, selected_province);
				selected_adjacency = "";
		};
		document.getElementById("remove-province-region").onclick = function () {
			window.deleteRegion();
		};
	}

  //Keypress event handler
	window.onkeydown = function (e) {
		keypressDetection(e);
	};
}
