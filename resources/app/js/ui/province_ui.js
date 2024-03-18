//Default selection values
document.getElementById(default_tab + "-tab").setAttribute("class", "active");

//Initialise Province UI
province_ui.innerHTML = province_ui.innerHTML.replace(/ \|( |\n)/gm, "&nbsp;&nbsp;|&nbsp;&nbsp;");

var get_all_confirmation_elements = document.querySelectorAll(".confirmation-button");
var get_all_tabs = document.querySelectorAll(".province-tabs-container div");

for (var i = 0; i < get_all_confirmation_elements.length; i++) {
	get_all_confirmation_elements[i].innerHTML = `<i class = "fas fa-check"></i>`;
}
for (var i = 0; i < get_all_tabs.length; i++) {
	if (!get_all_tabs[i].getAttribute("class")) {
		get_all_tabs[i].setAttribute("class", "");
	}
}

//Province UI
setInterval(function(){
	if (selected_province != "") {
		//Render selection
		selectProvince();

		//Make things visible
		document.getElementById("province-information").setAttribute("class", "province-information-display");
		document.getElementById("province-modding-buttons").setAttribute("class", "province-modding-buttons");

		document.getElementById("province-id-text-display").innerHTML = "Province ";
		document.getElementById("province-id-number-display").innerHTML = selected_province + ":";

		//Adjacency UI
		var adjacencies_string = getAdjacencies(selected_province).join(", ");
		var prov_obj = (provinces[selected_province]) ? provinces[selected_province] : undefined;

		document.getElementById("province-adjacencies-display").innerHTML = (adjacencies_string != "") ? adjacencies_string : "None.";

		if (selected_adjacency != "") {
			document.getElementById("set-adjacency-button").innerHTML = "Set Adjacency";
			document.getElementById("currently-selected-adjacency").innerHTML = "Province #" + selected_adjacency + " selected.";
			document.getElementById("remove-adjacency-button").setAttribute("class", "");
		} else {
			document.getElementById("set-adjacency-button").innerHTML = "Select Adjacency";
			document.getElementById("currently-selected-adjacency").innerHTML = "None selected.";
			document.getElementById("remove-adjacency-button").setAttribute("class", "hidden");
		}

		//Province Display Region UI
		document.getElementById("province-region-display").innerHTML = (config.map.regions[provinces[selected_province].region]) ?
			config.map.regions[provinces[selected_province].region].name :
			`None.`;
		document.getElementById("province-terrain-display").innerHTML = (config.terrain[provinces[selected_province].terrain]) ?
			config.terrain[provinces[selected_province].terrain].name :
			`None.`;
		document.getElementById("remove-province-region").setAttribute("class",
			(!provinces[selected_province].region) ?
				"hidden" :
				""
		);

		//Province Display Type UI
		var province_type;

		if (prov_obj)
			if (localisation.colours)
				province_type = localisation.colours[prov_obj.type];

		//Display Province Type
		document.getElementById("province-type-display").innerHTML = province_type;
	} else {
		clearProvinceInterface();
	}
}, 100);

//Province UI Tabs
function hideAllTabs () {
	var all_tab_content = document.querySelectorAll(".province-info-container > div");
	for (var i = 0; i < all_tab_content.length; i++) {
		all_tab_content[i].setAttribute("class", "hidden");
	}
}
function selectTab (element_id) {
	//Clear all tab selections first
	var all_tabs = document.querySelectorAll(".province-tabs-container > div");
	for (var i = 0; i < all_tabs.length; i++) {
		all_tabs[i].setAttribute("class", "");
	}

	//Apply active class to new element
	var element_obj = document.getElementById(element_id);
	var new_string = (element_obj.getAttribute("class") == "") ? "active" : "";

	element_obj.setAttribute("class", new_string);
	hideAllTabs();
}

document.getElementById("map-tab").onclick = function () {
	selectTab("map-tab");
	document.getElementById("province-map-tab").setAttribute("class", "");
}
document.getElementById("ai-tab").onclick = function () {
	selectTab("ai-tab");
	document.getElementById("province-ai-tab").setAttribute("class", "");
}
