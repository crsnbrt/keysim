export default class SoundUtil {
  static switchSound = undefined;
  static playSwitch() {
    if (!this.switchSound) {
      this.switchSound = document.getElementById("switch-sound");
    }
    if (this.switchSound) {
      this.switchSound.cloneNode(true).play();
    }
  }
}
