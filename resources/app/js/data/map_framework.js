//Base functions
{
  function clearFill (province_id) {
    try {
      var is_sea_province = false;

      if (provinces[province_id])
        if (provinces[province_id].type == "sea")
          is_sea_province = true;

      (!is_sea_province) ?
        province_map.getElementById(province_id).style.fill = "#b3b3b3" :
        province_map.getElementById(province_id).style.fill = RGBToHex([33, 68, 120]);
    } catch {}
  }

  function clearMap () {
    //Clear map
    for (var i = 0; i < all_provinces.length; i++)
      clearFill(all_provinces[i]);

    removeAllAdjacencies();
  }

	function createAdjacency (svg, prov1, prov2) {
    if (prov1 != "" && prov2 != "") {
      createProvince(prov1);
      createProvince(prov2);

      provinces[prov1].adjacencies.push(prov2);

      if (provinces[prov1].adjacencies.length > 0)
  		  declutterAdjacencies();

  		renderNewAdjacency(top_svg, prov1, prov2);
    }
	}

  function createProvince (province_id) {
    if (!provinces[province_id])
      provinces[province_id] = {
        adjacencies: []
      };
  }

	function declutterAdjacencies () {
		//Iterate over all provinces and check if their adjacencies have subadjacencies containing the province ID
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = provinces[all_provinces[i]];

      if (local_province.adjacencies) {
        //Make sure each adjacency is needed
        for (var x = 0; x < local_province.adjacencies.length; x++) {
          var local_adjacency = provinces[local_province.adjacencies[x]];

          if (local_adjacency)
            if (local_adjacency.adjacencies)
              for (var y = 0; y < local_adjacency.adjacencies.length; y++)
                if (local_adjacency.adjacencies[y] == all_provinces[i])
                  local_adjacency.adjacencies.splice(y, 1);
        }

        //Remove duplicates
        local_province.adjacencies = [...new Set(local_province.adjacencies)]
      }
    }
	}

	function destroySelectedProvince () {
		var local_prov = province_map.getElementById("selected-province");

    try {
      local_prov.remove();
    } catch {}
	}

  function getAdjacencies (province_id) {
    //Declare local intsance variables
    var adjacencies_array = [];

    //Iterate over all provinces and push to adjacencies_array
    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = provinces[all_provinces[i]];

      if (local_province.adjacencies)
        if (local_province.adjacencies.includes(province_id))
          if (!adjacencies_array.includes(all_provinces[i]))
            adjacencies_array.push(all_provinces[i]);
    }

    //Push own adjacencies to adjacencies_array
    if (provinces[province_id].adjacencies)
      for (var i = 0; i < provinces[province_id].adjacencies.length; i++)
        adjacencies_array.push(provinces[province_id].adjacencies[i]);

    //Return statement
    return adjacencies_array;
  }

	function getCentre (el) {
		var local_el = province_map.getElementById(el);
		if (local_el != undefined) {
			let centre_x = local_el.getBBox().x + (local_el.getBBox().width/2);
			let centre_y = local_el.getBBox().y + (local_el.getBBox().height/2);

			return [centre_x, centre_y];
		}
	}

  function getTotalAdjacencies () {
    var total_adjacency_count = 0;

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = provinces[all_provinces[i]];
      if (local_province.adjacencies)
        total_adjacency_count += local_province.adjacencies.length;
    }

    //Return statement
    return total_adjacency_count;
  }

  function hasAdjacency (province_id) {
    //Declare local instance variables
    var has_adjacency = false;

    //Iterate over all provinces to find adjacency to province
    for (var i = 0; i < all_provinces.length; i++)
      if (provinces[all_provinces[i]].adjacencies)
        if (provinces[all_provinces[i]].adjacencies.includes(province_id))
          has_adjacency = true;

    if (provinces[province_id])
      if (provinces[province_id].adjacencies)
        if (provinces[province_id].adjacencies.length > 0)
          has_adjacency = true;

    //Return statement
    return has_adjacency;
  }

  function jumpToProvince (province_id) {
    //Declare local instance variables
    var province_cache_obj = province_cache[province_id];

    //Pan to province, error trap
    try {
      pan(province_cache_obj.centre[0], province_cache_obj.centre[1]);
      selected_province = province_id;
    } catch (e) {
      console.log(e);
    }
  }

  function pan (x, y) {
    var x = (image_size[0]/svg_size[0])*x - window.innerWidth/2;
    var y_a = (
      (image_size[1]/svg_size[1])*(y + adjacency_y_offset/panzoom.getScale()) +
      (image_size[1]/svg_size[1])*(y + adjacency_y_offset)
    )/2 - window.innerHeight/(2 + (panzoom.getScale() - 1));
    var y_b = (
      (image_size[1]/svg_size[1])*(y + adjacency_y_offset/panzoom.getScale()) +
      (image_size[1]/svg_size[1])*(y + adjacency_y_offset)
    )/2 - window.innerHeight/2;

    y = (y_a + y_b)/2;

    panzoom.pan(
      x*-1,
      y*-1
    );
  }

	function removeAdjacency (svg, prov1, prov2) {
		var all_matching_adjacencies = svg.querySelectorAll("*[id='" + prov1 + "-" + prov2 + "'], *[id='" + prov2 + "-" + prov1 + "']");
		console.log("Matching adjacencies:");
		console.log(all_matching_adjacencies);
		for (var i = 0; i < all_matching_adjacencies.length; i++)
			all_matching_adjacencies[i].remove();
	}

	function removeAllAdjacencies (svg) {
		var all_adjacencies = top_svg.querySelectorAll(".adjacency_line");
		for (var i = 0; i < all_adjacencies.length; i++)
			all_adjacencies[i].remove();
    log.info("Adjacencies hidden.");
	}

  function renderAdjacencies (svg) {
    //Push all adjacencies to local array
    var all_adjacencies = [];

    for (var i = 0; i < all_provinces.length; i++) {
      var local_province = provinces[all_provinces[i]];

      for (var x = 0; x < local_province.adjacencies.length; x++)
        if (!all_adjacencies.includes(`${all_provinces[i]}-${local_province.adjacencies[x]}`) && !all_adjacencies.includes(`${local_province.adjacencies[x]}-${all_provinces[i]}`))
          all_adjacencies.push(`${all_provinces[i]}-${local_province.adjacencies[x]}`);
    }

    //Render all adjacencies from local array
    for (var i = 0; i < all_adjacencies.length; i++) {
      var local_array = all_adjacencies[i].split("-");

      try {
        renderNewAdjacency(top_svg, local_array[0], local_array[1]);
      } catch {}
    }

    log.info(`Adjacencies fully rendered.`);
  }

	function renderNewAdjacency (svg, prov1, prov2) {
		if (province_cache[prov1] != undefined && province_cache[prov2] != undefined)
      if (province_cache[prov1].centre && province_cache[prov2].centre) {
  			var new_adjacency = document.createElementNS("http://www.w3.org/2000/svg", "line");
  			new_adjacency.setAttribute("id", prov1 + "-" + prov2);
  			new_adjacency.setAttribute("class", "adjacency_line");
  			new_adjacency.setAttribute("x1", province_cache[prov1].centre[0]);
  			new_adjacency.setAttribute("y1", province_cache[prov1].centre[1] + adjacency_y_offset);
  			new_adjacency.setAttribute("x2", province_cache[prov2].centre[0]);
  			new_adjacency.setAttribute("y2", province_cache[prov2].centre[1] + adjacency_y_offset);
  			new_adjacency.style.stroke = "rgb(0, 190, 230)";
  			new_adjacency.style.strokeWidth = "0.25px";
  			svg.appendChild(new_adjacency);
  		}
	}

  function selectProvince () {
    var current_province = province_map.getElementById(selected_province);

    if (selected_province != "")
      destroySelectedProvince();

    //Select province
    var new_province = document.createElementNS("http://www.w3.org/2000/svg", "path");
    new_province.setAttribute("id", "selected-province");
    new_province.setAttribute("d", current_province.getAttribute("d"));
    new_province.style.fill = "rgba(0, 0, 0, 0)";
    new_province.style.stroke = "rgb(245, 224, 66)";
    new_province.style.strokeWidth = "0.5px";
    svg.appendChild(new_province);
  }

  function setFill (province_id, colour) {
    try {
      province_map.getElementById(province_id).style.fill = RGBToHex(colour[0], colour[1], colour[2]);
    } catch {}
  }
}

//Config/File functions
function exportProvinces () {
  //Set all centre fields
  for (var i = 0; i < all_provinces.length; i++) {
    var local_province = provinces[all_provinces[i]];

    local_province.centre = getCentre(all_provinces[i]);

    if (local_province.centre)
      if (Array.isArray(local_province.centre))
        local_province.centre[1] += adjacency_y_offset;
  }

	fs.writeFile("./resources/app/generated_files/provinces.js", JSON.stringify(provinces), function (err, data) { if (err) { return console.log(err); } });
}
function importProvinces () {
	var raw_provinces = fs.readFileSync("./resources/app/generated_files/provinces.js");
	provinces = JSON.parse(raw_provinces.toString());

  window.all_provinces = Object.keys(provinces);
  setTimeout(initOptimisation, 3000);
}

importProvinces();
declutterAdjacencies();
