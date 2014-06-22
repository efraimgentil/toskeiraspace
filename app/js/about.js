window.about = function() {
  developers = [
    {
        username: "Sombriks",
        description:"Noob Saibot",
        avatar_url: "https://avatars2.githubusercontent.com/u/556695?s=150",
        github_url: "https://github.com/sombriks"
    },
    {
        username: "Eprogramming",
        description:"Hulk",
        avatar_url: "https://avatars2.githubusercontent.com/u/6443576?s=150",
        github_url: "https://github.com/eprogramming"
    },
    {
        username: "Daniel Cunha (soro)",
        description:"Deadpool",
        avatar_url: "https://avatars1.githubusercontent.com/u/350841?s=150",
        github_url: "https://github.com/danielsoro"
    },
    {
        username: "Efraim Gentil",
        description:"Lanterna verde",
        avatar_url: "http://1.gravatar.com/avatar/72cdf06d6642a3d2e896f50aa103fe63?s=150",
        github_url: "https://github.com/efraimgentil"
    },
     {
         username: "Felipe Martins",
         description:"Noturno",
         avatar_url: "https://avatars0.githubusercontent.com/u/5208478?s=140",
         github_url: "https://github.com/felipewmartins"
     },
       {
           username: "Boaglio",
           description:"Gilgamesh",
           avatar_url: "https://avatars2.githubusercontent.com/u/6140?s=460",
           github_url: "https://github.com/boaglio"
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

