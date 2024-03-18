//Colours framework
function componentToHex (c) {
  var hex = parseInt(c).toString(16);

  //Return statement
  return hex.length == 1 ? "0" + hex : hex;
}
function generateRandomColour () {
  //Return statement
  return [randomNumber(0, 255), randomNumber(0, 255), randomNumber(0, 255)];
}
function hexToRGB (hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  //Return statement
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : undefined;
}
function RGBToHex (r, g, b) {
  //Return statement
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
