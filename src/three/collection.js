export default class Collection {
  constructor(options) {
    options = options || {};
    this.scene = options.scene || this.scene;
    this.components = [];
  }

  //add one or more items to components list
  add() {
    var self = this;
    if (arguments.length) {
      var args = Array.prototype.slice.call(arguments);
      for (var i = 0; i < args.length; i++) {
        this.components.push(args[i]);
        if (args[i].mesh) self.scene.add(args[i].mesh);
      }
    }
  }

  //remove one or more components from components list
  remove() {
    var self = this;
    if (arguments.length) {
      var args = Array.prototype.slice.call(arguments);
      for (var i = 0; i < args.length; i++) {
        let index = self.components.indexOf(args[i]);
        self.components.splice(index, 1);
      }
    }
  }

  //remove one or more components from components list
  removeAll() {
    this.components = [];
  }

  //update any components with an update function
  update() {
    this.components.forEach((item) => {
      if (typeof item.update === "function") item.update();
    });
  }
}
