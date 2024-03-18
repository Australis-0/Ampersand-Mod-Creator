//Debugging functions
function logIssues () {
  log_top = true;

  //Declare local instance variables
  var have_invalid_adjacencies = [];
  var no_land_adjacencies = [];
  var no_sea_adjacencies = [];

  //Check if provinces have adjacencies
  log.info(`Checking Adjacencies:`);
  log.info(`-`);
  log.info("");
  log.info(`Land Adjacencies:`);
  log.info(`-`);
  log.info("");

  //Land adjacencies
  for (var i = 0; i < all_provinces.length; i++)
    if (provinces[all_provinces[i]].type != "sea")
      if (!hasAdjacency(all_provinces[i]))
        no_land_adjacencies.push(`Land Province #${all_provinces[i]} has no adjacencies. | <span class = "interactive" onclick = "jumpToProvince('${all_provinces[i]}')">Jump to province</span>`);

  log.warn(no_land_adjacencies.join("<br>"));

  log.info("");
  log.info(`Sea Adjacencies:`);
  log.info(`-`);
  log.info("");

  //Sea adjacencies
  for (var i = 0; i < all_provinces.length; i++)
    if (provinces[all_provinces[i]].type == "sea")
      if (!hasAdjacency(all_provinces[i]))
        no_sea_adjacencies.push(`Sea Province #${all_provinces[i]} has no adjacencies. | <span class = "interactive" onclick = "jumpToProvince('${all_provinces[i]}')">Jump to province</span>`);

  log.warn(no_sea_adjacencies.join("<br>"));
  log.info("");

  log.info(`Invalid Adjacencies:`);

  for (var i = 0; i < all_provinces.length; i++)
    if (provinces[all_provinces[i]].adjacencies.includes(""))
      have_invalid_adjacencies.push(`<span class = "interactive" onclick = "jumpToProvince('${all_provinces[i]}')">#${all_provinces[i]}</span>`);

  if (have_invalid_adjacencies.length > 0)
    log.warn(`Provinces ${have_invalid_adjacencies.join(", ")} have invalid adjacencies.`);

  delete window.log_top;
}
