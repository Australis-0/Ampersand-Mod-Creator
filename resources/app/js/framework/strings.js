function beautyStringify (json_object) {
  //Return statement
  return JSON.stringify(json_object, null, "\t");
}
function getIDString  (string) {
  //Return statement
  return string.toLowerCase().replace(/ /gm, "_");
}
