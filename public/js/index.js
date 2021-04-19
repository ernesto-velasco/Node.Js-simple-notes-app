var html = document.querySelector('html').classList;
var button = document.querySelector(".button-switch");
var outerSpan = document.querySelector(".outer-span");
var lightSwitch = document.querySelector(".light-switch");
var darkSwitch = document.querySelector(".dark-switch");

function toggleTheme() {
  button.classList.toggle("bg-gray-800");
  outerSpan.classList.toggle("translate-x-5");
  lightSwitch.classList.toggle("opacity-100");
  darkSwitch.classList.toggle("opacity-100");
}

if (localStorage.theme === 'dark' || (!'theme' in localStorage && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.querySelector('html').classList.add('dark')
  toggleTheme()
} else if (localStorage.theme === 'dark') {
  document.querySelector('html').classList.add('dark')
  toggleTheme()
}

button.addEventListener("click", function () {
  if (localStorage.theme == 'dark' ) {
    html.remove('dark');
    localStorage.removeItem('theme')
  } else {
    html.add('dark');
    localStorage.theme = 'dark';
  }
  toggleTheme()
});