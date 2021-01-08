const fs = require('fs');
const path = require('path');

const appDir = path.dirname(__dirname);

fs.writeFileSync(`${appDir}/static/js/fb_sdk.js`,

`window.fbAsyncInit = function() {
  FB.init({
    appId      : '${process.env.FACEBOOK_APP_ID}',
    cookie     : true,
    xfbml      : true,
    version    : 'v9.0'
  });
    
  FB.AppEvents.logPageView();   
    
};

(
  function(d, s, id) {
    let js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk')
);
`

);
