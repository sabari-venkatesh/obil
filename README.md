# OBIL - templates

## Dependencies:
- Webpack 3.x

## Base structure

**src/**

#### Entry point:
- app.js - main project file where all other files are included

#### PostCSS (postcss/) / Sass (scss/):
- main source file (scss/main.scss)
- base/: base html elements styles
- elements/: buttons, links etc.,
- layout/: layouts
- components/: BEM, Atomic Design
- utilities/: project setup (variables, etc), mixins, functions

#### JavaScript (js/):
- main source file (main.js)
- modules/: folder for javascript modules

#### Images (img/):
- img/ - source images

#### Fonts (fonts/) - source fonts

**dist/**

- css/main.css - output css
- js/main.js - output js
- assets/ - output files which relate to build (fonts)

## Requirements

- Node.js - latest v6.x LTS is recommended

## Installation

`npm install`

## Usage

- `npm run build` - build project
- `npm run start` - build and watch changes (with BrowserSync)
- `npm run build:prod` - build production-ready code

Also, you can see subtasks in `package.json`.

## Browser support

- \> 0.5%
- last 2 versions
- IE11+
