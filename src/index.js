const path = require("path");

module.exports = function(context) {
  const { siteConfig } = context;
  const { themeConfig } = siteConfig;
  const { facebookChat } = themeConfig || {};

  if (!facebookChat) {
    throw new Error(
      `You need to specify 'facebookChat' object in 'themeConfig'`
    );
  }

  const {
    page_id,
  } = facebookChat;

  if (!page_id) {
    throw new Error(
      "page_id is missing. Please add a page_id to continue."
    );
  }

  return {
    name: "@skgandikota/docusaurus-plugin-facebookchat",

    injectHtmlTags() {
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
            var chatbox = document.getElementById('fb-customer-chat');
            chatbox.setAttribute("page_id", '${page_id}');
            chatbox.setAttribute("attribution", "biz_inbox");
            `
          },
          {
            tagName: "script",
            innerHTML: `
            window.fbAsyncInit = function() {
              FB.init({
                xfbml            : true,
                version          : 'v12.0'
              });
            };
      
            (function(d, s, id) {
              var js, fjs = d.getElementsByTagName(s)[0];
              if (d.getElementById(id)) return;
              js = d.createElement(s); js.id = id;
              js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
              fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
            `
          },
        ],
        preBodyTags:[
          {
            tagName: "div",
            innerHTML: `
            <div id="fb-root"></div>
            <div id="fb-customer-chat" class="fb-customerchat"></div>
            `
          }
        ]
      };
    }
  };
};
