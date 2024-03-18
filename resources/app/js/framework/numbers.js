//Define reference variables
window.alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
window.numbers = "0123456789".split("");

//Define global framework functions
window.addLeadingZero = function (current_string) {
  return (parseInt(current_string) < 10) ? "0" + current_string : current_string;
}
window.getAspectRatio = function () {
  var r = GCD(window.innerWidth, window.innerHeight);
  return [
    window.innerWidth/r,
    window.innerHeight/r
  ];
}
window.GCD = function (a, b, iterations) {
  return (b == 0) ? a : GCD (b, a % b);
}
window.numbersOnly = function (current_string) {
  return /^\d+$/.test(current_string);
}
window.randomNumber = function (min, max) {
  //Return statement
	return Math.round(Math.random() * (max - min) + min);
}
