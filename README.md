# KeySim

https://keyboardsimulator.xyz/

design and test virtual 3d keyboards.

## getting started

```
nvm use
npm install
npm start
```

## contributing

**colorways:** Any PR's for new colorways will be accepted as long as there is a real physical version of that colorway, or an ongoing group buy.

**layouts:** The goal of this project is not to recreate every possible keyboard layout, therefore I have no plans to add any new layouts myself. However PR's for new layouts will be accepted as long as they are not too similar to current layouts.

## adding new colorways

run the command `npm run create-colorway COLORWAY_ID "COLORWAY_NAME"` to create the file: `/src/config/colorways/colorway_COLORWAY_ID`. Edit this file directly or paste json from the advanced section of the editor tab.

## A note on three.js version

This project was built before the [depreciation](https://discourse.threejs.org/t/three-geometry-will-be-removed-from-core-with-r125/22401) of `THREE.Geometry` there are currently no plans to update three past version 125 as this would require a rewrite of the case and key geometry to support BufferGeometry.

## configuration

json configuration for layouts and keymaps are based on [qmk](https://beta.docs.qmk.fm/). keymaps can be changed by switching the corresponding [keycodes](https://beta.docs.qmk.fm/using-qmk/simple-keycodes/keycodes).

_NOTE: Special keys from keyboards with custom firmware (e.g. [layer switching](https://beta.docs.qmk.fm/using-qmk/software-features/feature_layers)) may not trigger keydown events, as these are not [supported](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) in javascript_

## screenshots

![alt example image](./public/example-1.jpg?raw=true)

![alt example image](./public/example-2.jpg?raw=true)

![alt example image](./public/example-3.jpg?raw=true)
