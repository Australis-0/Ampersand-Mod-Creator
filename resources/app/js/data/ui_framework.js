function clearProvinceInterface () {
	document.getElementById("province-id-text-display").innerHTML = "No province selected.";
	document.getElementById("province-id-number-display").innerHTML = "";
	document.getElementById("province-information").setAttribute("class", "province-information-display hidden");
	document.getElementById("province-modding-buttons").setAttribute("class", "province-modding-buttons hidden");
}

function hideAllWindows () {
	document.getElementById("provinces-container").setAttribute("class", "provinces-container");
  document.getElementById("terrain-container").setAttribute("class", "terrain-container");
  document.getElementById("settings-container").setAttribute("class", "settings-container");
}

function printAlert (element, string) {
  //Declare local instance variables
  var alert_el = document.getElementById(element);
	var old_HTML = JSON.parse(JSON.stringify(alert_el.innerHTML));

	//Immediately set then remove alert after 3 seconds
	alert_el.innerHTML = string;

	setTimeout(function(){
		alert_el.innerHTML = old_HTML;
	}, 3000);
}

function switchTab (new_tab) {
  var all_tabs = document.querySelectorAll(".main-header ul li");
	current_tab = new_tab;

  //Set all tabs to not active
  for (var i = 0; i < all_tabs.length; i++)
    all_tabs[i].setAttribute("class", all_tabs[i].getAttribute("class").replace(" active", ""));

  //Set new tab ID to be active
  var new_tab_el = document.querySelector(`.${new_tab}`);

  new_tab_el.setAttribute("class", `${new_tab_el.getAttribute("class")} active`);
}
