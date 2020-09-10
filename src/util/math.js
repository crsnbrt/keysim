export default class Util {
  //map value in range to a new value in a new range
  static toRange(val, low1, high1, low2, high2) {
    return low2 + ((val - low1) * (high2 - low2)) / (high1 - low1);
  }
  //retun a random int in the range
  static randInt(min, max) {
    max = max || min;
    min = max === undefined ? 0 : min;
    return Math.floor(this.toRange(Math.random(), 0, 1, min, max));
  }
  static randString() {
    return (
      Math.random().toString(36).substring(5, 8) +
      Math.random().toString(36).substring(4, 6)
    );
  }
  //degrees to radians
  static toDeg(radians) {
    return (radians * 180) / Math.PI;
  }
  //radians to degrees
  static toRad(degrees) {
    return (degrees * Math.PI) / 180;
  }
  //dot product
  static dot2(vecA, vecB) {
    return vecA.x * vecB.x + vecA.y * vecB.y;
  }
  //linear interpolation
  static lerp(t, a, b) {
    return (1 - t) * a + t * b;
  }
  //2D linear interpolation
  static lerp2d(t, a, b) {
    return {
      x: this.lerp(t, a.x, b.x),
      y: this.lerp(t, a.y, b.y),
    };
  }
  //3D linear interpolation
  static lerp3d(t, a, b) {
    return {
      x: this.lerp(t, a.x, b.x),
      y: this.lerp(t, a.y, b.y),
      z: this.lerp(t, a.z, b.z),
    };
  }
  //gets point (x,y) at t, on a cubic bezier curve with points a,b,c,d
  static pointOnCurve(t, a, b, c, d) {
    var e = this.lerp2d(t, a, b),
      f = this.lerp2d(t, b, c),
      g = this.lerp2d(t, c, d),
      h = this.lerp2d(t, e, f),
      i = this.lerp2d(t, f, g);
    return this.lerp2d(t, h, i);
  }
  //get an average x,y of an array of x,y points
  static averagePoint(arr) {
    return {
      x: arr.reduce((a, c) => a + c.x, 0) / arr.length,
      y: arr.reduce((a, c) => a + c.y, 0) / arr.length,
    };
  }
  //normaize array values to 0-1
  static normalizeArray(arr) {
    var min = Math.min.apply(null, arr);
    var max = Math.max.apply(null, arr);
    return arr.map((num) => (num - min) / (max - min));
  }
}
