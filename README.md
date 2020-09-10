# KeySim

https://keyboardsimulator.xyz/

design and test virtual keyboards,

![alt example image](./public/preview.png?raw=true)

![alt example image](./public/example-1.jpg?raw=true)

## running locally

```
npm install
npm start
```

## configuration

configuration for layouts and keymaps are based on qmk https://beta.docs.qmk.fm/ keymaps can be changed by switching the corresponding [keycodes](https://beta.docs.qmk.fm/using-qmk/simple-keycodes/keycodes).

_NOTE: javascript only [supports](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values) the most common keys that a keyboard might trigger. Some boards with custom firmware might have keys, such as those used to change layers on smaller size keyboards, which will not trigger a keydown event_
