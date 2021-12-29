### @skgandikota/docusaurus-plugin-facebookchat

This plugin enables facebook-chat in Docusaurus powered websites.
#### Install the plugin

1. Add the plugin to your project.

```
yarn add @skgandikota/docusaurus-plugin-facebookchat
```

or

```
npm install @skgandikota/docusaurus-plugin-facebookchat --save
```

2. Configure the plugin in `docusaurus.config.js`

```js
// docusaurus.config.js
module.exports = {
  plugins: ["@skgandikota/docusaurus-plugin-facebookchat"],
  themeConfig: {
    facebookChat: {
      page_id: "9999999999999999999"
    }
  }
};
```
