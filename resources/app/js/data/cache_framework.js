function initOptimisation () {
  //Declare global variables
  window.province_cache = {};

  //Initialise province cache
  var province_list = all_provinces;

  for (var i = 0; i < province_list.length; i++)
    try {
      window.province_cache[province_list[i]] = {
        centre: getCentre(province_list[i])
      };
    } catch {}

  //Adjust all centres to have correct y value
  var highest_province = ["", 99999];
  var y_offset = 0;

  for (var i = 0; i < province_list.length; i++) {
    var local_province = province_cache[province_list[i]];

    try {
      if (local_province.centre[1] < highest_province[1])
        highest_province = [province_list[i], local_province.centre[1]];
    } catch {}
  }

  //Set new y offset
  window.adjacency_y_offset = Math.abs(
    province_map.getElementById(highest_province[0])
      .getBBox().y
  );
  svg_size = [svg_size[0], svg_size[1] + adjacency_y_offset];
}
