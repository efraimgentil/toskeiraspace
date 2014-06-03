window.menu = function() {
  html = JST['app/templates/menu.us']();
  document.getElementById('menu_aqui').innerHTML += html;
};

if(window.addEventListener) {
  window.addEventListener('DOMContentLoaded', menu, false);
} else {
  window.attachEvent('onload', menu);
}
