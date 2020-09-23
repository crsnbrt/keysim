# KeySim

https://keyboardsimulator.xyz/

design and test virtual 3d keyboards.

## getting started

```
npm install
npm start
```

## adding colorways

run the command `npm run create-colorway COLORWAY_ID "COLORWAY_NAME"` to create the file: `/src/config/colorways/colorway`. Edit this file directly or paste json from the advanced section of the editor tab.

## configuration

json configuration for layouts and keymaps are based on [qmk](https://beta.docs.qmk.fm/). keymaps can be changed by switching the corresponding [keycodes](https://beta.docs.qmk.fm/using-qmk/simple-keycodes/keycodes).

_NOTE: Special keys from keyboards with custom firmware (e.g. [layer switching](https://beta.docs.qmk.fm/using-qmk/software-features/feature_layers)) may not trigger keydown events, as these are not [supported](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) in javascript_

![alt example image](./public/example-1.jpg?raw=true)

![alt example image](./public/example-2.jpg?raw=true)

![alt example image](./public/example-3.jpg?raw=true)
