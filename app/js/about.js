window.about = function() {
  developers = [
    {
        username: "Sombriks",
        description:"Some cool stuff here",
        avatar_url: "https://avatars2.githubusercontent.com/u/556695?s=150",
        github_url: "https://github.com/sombriks"
    },
    {
        username: "Eprogramming",
        description:"HULK SMASH",
        avatar_url: "https://avatars2.githubusercontent.com/u/6443576?s=150",
        github_url: "https://github.com/eprogramming"
    },
    {
        username: "Daniel Cunha",
        description:"Floripa guy",
        avatar_url: "https://avatars1.githubusercontent.com/u/350841?s=150",
        github_url: "https://github.com/danielsoro"
    },
    {
        username: "Efraim Gentil",
        description:"The only one that don't have a cool nickname =(",
        avatar_url: "http://1.gravatar.com/avatar/72cdf06d6642a3d2e896f50aa103fe63?s=150",
        github_url: "https://github.com/efraimgentil"
    },
     {
         username: "Felipe Martins",
         description:"Só os ósso",
         avatar_url: "https://avatars0.githubusercontent.com/u/5208478?s=140",
         github_url: "https://github.com/felipewmartins"
     }
  ];
  
  html = "";
  _.each( developers , function( developer){
    partial = JST['app/templates/about_programmer.us'](developer);
    html += partial;
  });
  document.getElementById('developers').innerHTML += html;
};

if(window.addEventListener) {
  window.addEventListener('DOMContentLoaded', about, false);
} else {
  window.attachEvent('onload', about);
}