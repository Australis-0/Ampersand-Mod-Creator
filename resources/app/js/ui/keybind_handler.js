//Processing functions
function keypressDetection (passed_element) {
	var e = passed_element;

	//Painters
	if (current_tab == "map" && document.querySelectorAll("*:focus").length == 0) {
		//Adjacency painter
	  if (adjacency_mode)
	  	if (e.keyCode == 32) //SPACE
	  		window.setAdjacency();

		//Coastal painter
		if (coastal_mode)
			if (e.keyCode == 32) //SPACE
				window.setCoastal();

		//Region painter
		if (region_mode)
			if (e.keyCode == 8) { //BACKSPACE
				window.removeProvinceRegion();
			} else if (e.keyCode == 32) { //SPACE
				window.setRegion();
			} else if (e.keyCode == 46) { //DELETE
				window.deleteRegion();
			}

		if (terrain_mode)
			if (e.keyCode == 8) { //BACKSPACE
				window.removeProvinceTerrain();
			} else if (e.keyCode == 32) { //SPACE
				window.setTerrain();
			}
	}
}
