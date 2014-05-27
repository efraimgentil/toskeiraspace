window.helloText = function() {
  return 'Hail from the other side !';
};

window.hello = function() {
  html = JST['app/templates/hello.us']({text: helloText()});
  document.body.innerHTML += html;
};

if(window.addEventListener) {
  window.addEventListener('DOMContentLoaded', hello, false);
} else {
  window.attachEvent('onload', hello);
}
