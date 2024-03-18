//Map functionality
var svg;
var top_svg;

province_temp.addEventListener("load", function () {
	//Initialise variables
	var draw = SVG();
  province_map = province_temp.contentDocument;

  var all_layers = province_map.getElementsByTagName("g");
	var all_paths = province_map.querySelectorAll("path");
	svg = all_layers[0];
  top_svg = all_layers[all_layers.length - 1];

	//Zoom/Pan
	const elem = document.getElementById("map-subcontainer");
	window.panzoom = Panzoom(document.querySelector(".map-subcontainer"), {
		maxZoom: 20,
		minZoom: 0.5
	});
	document.querySelector(".map-subcontainer").addEventListener("wheel", function (event) {
		return panzoom.zoomWithWheel(event);
	})

	province_map.addEventListener("mousedown", function (e) {
		document.querySelector(".overlay-image").style.pointerEvents = "auto";
	});
	document.querySelector(".overlay-image").addEventListener("click", function (e) {
		document.querySelector(".overlay-image").style.pointerEvents = "none";
	});

	//Mouse Interactivity
	province_map.addEventListener("click", function (e) {
		var province = e.target;

		if (e.target.nodeName == "path" && e.target.id != "selected-province") {
			//Select Province
			selected_province = province.id.toString();

			selectProvince();
			document.querySelector(".overlay-image").style.pointerEvents = "auto";
		} else {
			//De-selection by clicking on the background
			destroySelectedProvince();
			selected_province = "";
		}
	});
	province_map.onkeydown = function (e) {
		keypressDetection(e);
	};
});
