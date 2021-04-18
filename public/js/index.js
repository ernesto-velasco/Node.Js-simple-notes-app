var html = document.querySelector("#html");
var button = document.querySelector(".button-switch");
var outerSpan = document.querySelector(".outer-span");
var lightSwitch = document.querySelector(".light-switch");
var darkSwitch = document.querySelector(".dark-switch");

button.addEventListener("click", function () {
  html.classList.toggle("dark");
  button.classList.toggle("bg-gray-800");
  outerSpan.classList.toggle("translate-x-5");
  lightSwitch.classList.toggle("opacity-100");
  darkSwitch.classList.toggle("opacity-100");
});