function exportConfig () {
  //Regions
  fs.writeFile("./resources/app/mod/common/map/regions.js", [
    `config.map.regions = ` + beautyStringify(config.map.regions) + `;`
  ].join("\n"), "utf8", function (err, data) {
    if (err) return console.log(err);
  });

  //Terrain
  fs.writeFile("./resources/app/mod/common/terrain/terrain.js", [
    `config.terrain = ` + beautyStringify(config.terrain) + `;`
  ].join("\n"), "utf8", function (err, data) {
    if (err) return console.log(err);
  });

  //Settings
  fs.writeFile("./resources/app/settings/settings.js", [
    `window.settings = ` + beautyStringify(settings) + `;`
  ].join("\n"), "utf8", function (err, data) {
    if (err) return console.log(err);
  });
}

function getAllFiles (folder_name) {
  //Declare local instance variables
  var file_array = [];

  try {
    var files = fs.readdirSync(__dirname + "/" + folder_name);

    for (var i = 0; i < files.length; i++) {
      //Self-reference to fetch files in sub-directories
      local_dir_array = (fs.statSync(`${__dirname}/${folder_name}/${files[i]}`).isDirectory()) ?
        getAllFiles(`${folder_name}/${files[i]}`) :
        file_array.push(path.join(folder_name, "/", files[i]));

      //Add files from local_dir_array to file_array
      for (var x = 0; x < local_dir_array.length; x++)
        file_array.push(local_dir_array[x]);
    }
  } catch (e) {
    console.log(e);
  }

  //Return statement
  return file_array;
}

function importConfig () {
  //Declare local instance variables
  var loaded_files = [];

  //Load config backend files individually first
  var local_load_order = load_order.load_files;

  for (var i = 0; i < local_load_order.length; i++)
    for (var x = 0; x < load_order.load_directories.length; x++) {
      var local_dir = load_order.load_directories[x];
      var all_directory_files = getAllFiles(local_dir);

      for (var y = 0; y < all_directory_files.length; y++)
        if (all_directory_files[y].includes(local_load_order)) {
          loadFile(all_directory_files[y]);
          loaded_files.push(local_load_order[i]);
          log.info(`Loaded imperative file ${all_directory_files[y]}`);
        }
    }

  //Load each load directory separately
  for (var i = 0; i < load_order.load_directories.length; i++) {
    var local_dir = load_order.load_directories[i];
    var all_directory_files = getAllFiles(local_dir);

    for (var x = 0; x < all_directory_files.length; x++)
      if (!loaded_files.includes(all_directory_files[x])) {
        loadFile(all_directory_files[x]);
        loaded_files.push(all_directory_files[x]);
      }
  }

  //Log to console
  log.info(`Loaded ${loaded_files.length} files from ${load_order.load_directories.length} directories.`);

  //Load system parsers
  var load_parsers = setInterval(function(){
    try {
      loadSettings();
      loadRegions();
      loadTerrain();

      clearInterval(load_parsers);
    } catch (e) {
      console.log(e);
    }
  }, 3000);
}

function loadFile (file_name) {
  //Declare local instance variables
  var file_path = path.join(__dirname, file_name);

  //Evaluate file contents
  try {
    var local_script = document.createElement("script");
    local_script.type = "text/javascript";
    local_script.src = file_path;

    //Append to header
    document.head.appendChild(local_script);
  } catch (e) {
    log.error(`Failed to load ${file_path}.`);
    console.log(e);
  }
}
