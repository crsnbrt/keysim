import SceneManager from "./sceneManager";
import CaseManager from "./case/caseManager";
import KeyManager from "./key/keyManager";
import * as webfont from "webfontloader";

const SCREEN_SCALE = 50;

export default (element) => {
  //ensure fonts loaded for canvas textures
  webfont.load({
    custom: {
      families: ["legends", "Varela Round"],
    },
    active: function () {
      //MAIN THREE JS SETUP
      //-------------------------------------
      const ThreeApp = new SceneManager({
        scale: SCREEN_SCALE,
        el: element,
      });

      const KEYS = new KeyManager({
        scene: ThreeApp.scene,
      });

      new CaseManager({
        scene: ThreeApp.scene,
      });

      //start render loop
      ThreeApp.add(KEYS);
      ThreeApp.tick();
    },
  });
};
