//Import Node Modules
tippy = require("tippy.js");
//select_pure = require("select-pure");

//Import Variables
var provinces;

//Import FileSystem
const fs = window.require("fs");
const path = window.require("path");

//Console/Log Variables
var console_container = document.getElementById("console-container");
var console_el = document.getElementById("console-subcontainer");

//Load order
window.load_order = {
  load_directories: [
    "mod/common",
    "localisation",
    "settings"
  ],
  load_files: [
    ".config_backend.js",
    ".localisation_backend.js",
    "settings.js"
  ]
};

//Map Variables
var adjacency_y_offset = 846.008117675812; //Unknown what is causing this bug
window.config = {}; //Extremely important
var borders_hidden = false;
var colour_settings = document.getElementById("settings-colours-viewer");
var current_mapmode = "normal";
var current_tab = "map";
var header_indicator_el = document.querySelector(".main-header ul hr");
var id_overlay = document.getElementById("map-subcontainer");
var labels_hidden = false;
var localisation = {};
var map_background = document.getElementById("map-background");
var province_temp = document.getElementById("province-map");
var province_map;
var regions_viewer = document.getElementById("regions-viewer");
var terrain_viewer = document.getElementById("terrain-viewer");

//Mapmode Variables
var mapmodes = {
  normal: "Normal",
  adjacencies: "Adjacencies",
  coastal: "Coastal",
  regions: "Regions",
  terrain: "Terrain"
};
var svg_size = [3000, 270];
var image_size = [map_background.width, map_background.height]

//UI variables
var adjacency_mode = false;
var coastal_mode = false;
var normal_mode = false;
var region_mode = false;
var terrain_mode = false;

var default_tab = "map";
var province_ui = document.getElementById("province-ui");

//Base variables
var selected_adjacency = "";
var selected_province = "";

//Zoom and Pan functions
var position_x = 0;
var position_y = 0;
var zoom = 1;

var pointer_events = false;
