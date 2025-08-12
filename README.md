# Prerequisite Software
* [Go v1.24](https://go.dev/doc/install)
* [NodeJS v22.14.0](https://nodejs.org/en/download)
    * Recommend using a version manager like NVM, fnm, or Volta
* [Hugo](https://gohugo.io/about/introduction/) [v0.148](https://gohugo.io/installation/)

# Standup Project
Run [the following commands](https://gohugo.io/getting-started/quick-start/) to set up base website
```
hugo new site mattykakesmakes (generates)
cd mattykakesmakes
git init
git submodule add https://github.com/nusserstudios/tailbliss.git themes/tailbliss
npm -g install postcss
echo "theme = 'tailbliss'" >> hugo.toml
```

Install theme dependencies
```
cd themes/tailbliss
npm install
cd ../..
```
Install [PostCSS Hugo plugin](https://gohugo.io/functions/css/postcss/)
```
npm i -D postcss postcss-cli autoprefixer
```
Create a PostCSS configuration file in the project root: `postcss.config.js`
```
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
};
```
Start Hugo development server
```
hugo server
```

# Quick Reference
### Hugo
* [Hugo Directory Structure](https://gohugo.io/getting-started/directory-structure/)

### Other
* [Favicon Generator](https://realfavicongenerator.net/)