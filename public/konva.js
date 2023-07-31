!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : ((t = "undefined" != typeof globalThis ? globalThis : t || self).Konva =
        e());
})(this, function () {
  "use strict";
  /*
   * Konva JavaScript Framework v9.2.0
   * http://konvajs.org/
   * Licensed under the MIT
   * Date: Mon Jun 05 2023
   *
   * Original work Copyright (C) 2011 - 2013 by Eric Rowell (KineticJS)
   * Modified work Copyright (C) 2014 - present by Anton Lavrenov (Konva)
   *
   * @license
   */ var t = Math.PI / 180;
  const e =
      "undefined" != typeof global
        ? global
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof WorkerGlobalScope
        ? self
        : {},
    i = {
      _global: e,
      version: "9.2.0",
      isBrowser:
        "undefined" != typeof window &&
        ("[object Window]" === {}.toString.call(window) ||
          "[object global]" === {}.toString.call(window)),
      isUnminified: /param/.test(function (t) {}.toString()),
      dblClickWindow: 400,
      getAngle: (e) => (i.angleDeg ? e * t : e),
      enableTrace: !1,
      pointerEventsEnabled: !0,
      autoDrawEnabled: !0,
      hitOnDragEnabled: !1,
      capturePointerEventsEnabled: !1,
      _mouseListenClick: !1,
      _touchListenClick: !1,
      _pointerListenClick: !1,
      _mouseInDblClickWindow: !1,
      _touchInDblClickWindow: !1,
      _pointerInDblClickWindow: !1,
      _mouseDblClickPointerId: null,
      _touchDblClickPointerId: null,
      _pointerDblClickPointerId: null,
      pixelRatio:
        ("undefined" != typeof window && window.devicePixelRatio) || 1,
      dragDistance: 3,
      angleDeg: !0,
      showWarnings: !0,
      dragButtons: [0, 1],
      isDragging: () => i.DD.isDragging,
      isDragReady: () => !!i.DD.node,
      releaseCanvasOnDestroy: !0,
      document: e.document,
      _injectGlobal(t) {
        e.Konva = t;
      },
    },
    r = (t) => {
      i[t.prototype.getClassName()] = t;
    };
  i._injectGlobal(i);
  class a {
    constructor(t = [1, 0, 0, 1, 0, 0]) {
      (this.dirty = !1), (this.m = (t && t.slice()) || [1, 0, 0, 1, 0, 0]);
    }
    reset() {
      (this.m[0] = 1),
        (this.m[1] = 0),
        (this.m[2] = 0),
        (this.m[3] = 1),
        (this.m[4] = 0),
        (this.m[5] = 0);
    }
    copy() {
      return new a(this.m);
    }
    copyInto(t) {
      (t.m[0] = this.m[0]),
        (t.m[1] = this.m[1]),
        (t.m[2] = this.m[2]),
        (t.m[3] = this.m[3]),
        (t.m[4] = this.m[4]),
        (t.m[5] = this.m[5]);
    }
    point(t) {
      var e = this.m;
      return {
        x: e[0] * t.x + e[2] * t.y + e[4],
        y: e[1] * t.x + e[3] * t.y + e[5],
      };
    }
    translate(t, e) {
      return (
        (this.m[4] += this.m[0] * t + this.m[2] * e),
        (this.m[5] += this.m[1] * t + this.m[3] * e),
        this
      );
    }
    scale(t, e) {
      return (
        (this.m[0] *= t),
        (this.m[1] *= t),
        (this.m[2] *= e),
        (this.m[3] *= e),
        this
      );
    }
    rotate(t) {
      var e = Math.cos(t),
        i = Math.sin(t),
        r = this.m[0] * e + this.m[2] * i,
        a = this.m[1] * e + this.m[3] * i,
        n = this.m[0] * -i + this.m[2] * e,
        s = this.m[1] * -i + this.m[3] * e;
      return (
        (this.m[0] = r), (this.m[1] = a), (this.m[2] = n), (this.m[3] = s), this
      );
    }
    getTranslation() {
      return { x: this.m[4], y: this.m[5] };
    }
    skew(t, e) {
      var i = this.m[0] + this.m[2] * e,
        r = this.m[1] + this.m[3] * e,
        a = this.m[2] + this.m[0] * t,
        n = this.m[3] + this.m[1] * t;
      return (
        (this.m[0] = i), (this.m[1] = r), (this.m[2] = a), (this.m[3] = n), this
      );
    }
    multiply(t) {
      var e = this.m[0] * t.m[0] + this.m[2] * t.m[1],
        i = this.m[1] * t.m[0] + this.m[3] * t.m[1],
        r = this.m[0] * t.m[2] + this.m[2] * t.m[3],
        a = this.m[1] * t.m[2] + this.m[3] * t.m[3],
        n = this.m[0] * t.m[4] + this.m[2] * t.m[5] + this.m[4],
        s = this.m[1] * t.m[4] + this.m[3] * t.m[5] + this.m[5];
      return (
        (this.m[0] = e),
        (this.m[1] = i),
        (this.m[2] = r),
        (this.m[3] = a),
        (this.m[4] = n),
        (this.m[5] = s),
        this
      );
    }
    invert() {
      var t = 1 / (this.m[0] * this.m[3] - this.m[1] * this.m[2]),
        e = this.m[3] * t,
        i = -this.m[1] * t,
        r = -this.m[2] * t,
        a = this.m[0] * t,
        n = t * (this.m[2] * this.m[5] - this.m[3] * this.m[4]),
        s = t * (this.m[1] * this.m[4] - this.m[0] * this.m[5]);
      return (
        (this.m[0] = e),
        (this.m[1] = i),
        (this.m[2] = r),
        (this.m[3] = a),
        (this.m[4] = n),
        (this.m[5] = s),
        this
      );
    }
    getMatrix() {
      return this.m;
    }
    decompose() {
      var t = this.m[0],
        e = this.m[1],
        i = this.m[2],
        r = this.m[3],
        a = t * r - e * i;
      let n = {
        x: this.m[4],
        y: this.m[5],
        rotation: 0,
        scaleX: 0,
        scaleY: 0,
        skewX: 0,
        skewY: 0,
      };
      if (0 != t || 0 != e) {
        var s = Math.sqrt(t * t + e * e);
        (n.rotation = e > 0 ? Math.acos(t / s) : -Math.acos(t / s)),
          (n.scaleX = s),
          (n.scaleY = a / s),
          (n.skewX = (t * i + e * r) / a),
          (n.skewY = 0);
      } else if (0 != i || 0 != r) {
        var o = Math.sqrt(i * i + r * r);
        (n.rotation =
          Math.PI / 2 - (r > 0 ? Math.acos(-i / o) : -Math.acos(i / o))),
          (n.scaleX = a / o),
          (n.scaleY = o),
          (n.skewX = 0),
          (n.skewY = (t * i + e * r) / a);
      }
      return (n.rotation = g._getRotation(n.rotation)), n;
    }
  }
  var n = Math.PI / 180,
    s = 180 / Math.PI,
    o = "Konva error: ",
    h = {
      aliceblue: [240, 248, 255],
      antiquewhite: [250, 235, 215],
      aqua: [0, 255, 255],
      aquamarine: [127, 255, 212],
      azure: [240, 255, 255],
      beige: [245, 245, 220],
      bisque: [255, 228, 196],
      black: [0, 0, 0],
      blanchedalmond: [255, 235, 205],
      blue: [0, 0, 255],
      blueviolet: [138, 43, 226],
      brown: [165, 42, 42],
      burlywood: [222, 184, 135],
      cadetblue: [95, 158, 160],
      chartreuse: [127, 255, 0],
      chocolate: [210, 105, 30],
      coral: [255, 127, 80],
      cornflowerblue: [100, 149, 237],
      cornsilk: [255, 248, 220],
      crimson: [220, 20, 60],
      cyan: [0, 255, 255],
      darkblue: [0, 0, 139],
      darkcyan: [0, 139, 139],
      darkgoldenrod: [184, 132, 11],
      darkgray: [169, 169, 169],
      darkgreen: [0, 100, 0],
      darkgrey: [169, 169, 169],
      darkkhaki: [189, 183, 107],
      darkmagenta: [139, 0, 139],
      darkolivegreen: [85, 107, 47],
      darkorange: [255, 140, 0],
      darkorchid: [153, 50, 204],
      darkred: [139, 0, 0],
      darksalmon: [233, 150, 122],
      darkseagreen: [143, 188, 143],
      darkslateblue: [72, 61, 139],
      darkslategray: [47, 79, 79],
      darkslategrey: [47, 79, 79],
      darkturquoise: [0, 206, 209],
      darkviolet: [148, 0, 211],
      deeppink: [255, 20, 147],
      deepskyblue: [0, 191, 255],
      dimgray: [105, 105, 105],
      dimgrey: [105, 105, 105],
      dodgerblue: [30, 144, 255],
      firebrick: [178, 34, 34],
      floralwhite: [255, 255, 240],
      forestgreen: [34, 139, 34],
      fuchsia: [255, 0, 255],
      gainsboro: [220, 220, 220],
      ghostwhite: [248, 248, 255],
      gold: [255, 215, 0],
      goldenrod: [218, 165, 32],
      gray: [128, 128, 128],
      green: [0, 128, 0],
      greenyellow: [173, 255, 47],
      grey: [128, 128, 128],
      honeydew: [240, 255, 240],
      hotpink: [255, 105, 180],
      indianred: [205, 92, 92],
      indigo: [75, 0, 130],
      ivory: [255, 255, 240],
      khaki: [240, 230, 140],
      lavender: [230, 230, 250],
      lavenderblush: [255, 240, 245],
      lawngreen: [124, 252, 0],
      lemonchiffon: [255, 250, 205],
      lightblue: [173, 216, 230],
      lightcoral: [240, 128, 128],
      lightcyan: [224, 255, 255],
      lightgoldenrodyellow: [250, 250, 210],
      lightgray: [211, 211, 211],
      lightgreen: [144, 238, 144],
      lightgrey: [211, 211, 211],
      lightpink: [255, 182, 193],
      lightsalmon: [255, 160, 122],
      lightseagreen: [32, 178, 170],
      lightskyblue: [135, 206, 250],
      lightslategray: [119, 136, 153],
      lightslategrey: [119, 136, 153],
      lightsteelblue: [176, 196, 222],
      lightyellow: [255, 255, 224],
      lime: [0, 255, 0],
      limegreen: [50, 205, 50],
      linen: [250, 240, 230],
      magenta: [255, 0, 255],
      maroon: [128, 0, 0],
      mediumaquamarine: [102, 205, 170],
      mediumblue: [0, 0, 205],
      mediumorchid: [186, 85, 211],
      mediumpurple: [147, 112, 219],
      mediumseagreen: [60, 179, 113],
      mediumslateblue: [123, 104, 238],
      mediumspringgreen: [0, 250, 154],
      mediumturquoise: [72, 209, 204],
      mediumvioletred: [199, 21, 133],
      midnightblue: [25, 25, 112],
      mintcream: [245, 255, 250],
      mistyrose: [255, 228, 225],
      moccasin: [255, 228, 181],
      navajowhite: [255, 222, 173],
      navy: [0, 0, 128],
      oldlace: [253, 245, 230],
      olive: [128, 128, 0],
      olivedrab: [107, 142, 35],
      orange: [255, 165, 0],
      orangered: [255, 69, 0],
      orchid: [218, 112, 214],
      palegoldenrod: [238, 232, 170],
      palegreen: [152, 251, 152],
      paleturquoise: [175, 238, 238],
      palevioletred: [219, 112, 147],
      papayawhip: [255, 239, 213],
      peachpuff: [255, 218, 185],
      peru: [205, 133, 63],
      pink: [255, 192, 203],
      plum: [221, 160, 203],
      powderblue: [176, 224, 230],
      purple: [128, 0, 128],
      rebeccapurple: [102, 51, 153],
      red: [255, 0, 0],
      rosybrown: [188, 143, 143],
      royalblue: [65, 105, 225],
      saddlebrown: [139, 69, 19],
      salmon: [250, 128, 114],
      sandybrown: [244, 164, 96],
      seagreen: [46, 139, 87],
      seashell: [255, 245, 238],
      sienna: [160, 82, 45],
      silver: [192, 192, 192],
      skyblue: [135, 206, 235],
      slateblue: [106, 90, 205],
      slategray: [119, 128, 144],
      slategrey: [119, 128, 144],
      snow: [255, 255, 250],
      springgreen: [0, 255, 127],
      steelblue: [70, 130, 180],
      tan: [210, 180, 140],
      teal: [0, 128, 128],
      thistle: [216, 191, 216],
      transparent: [255, 255, 255, 0],
      tomato: [255, 99, 71],
      turquoise: [64, 224, 208],
      violet: [238, 130, 238],
      wheat: [245, 222, 179],
      white: [255, 255, 255],
      whitesmoke: [245, 245, 245],
      yellow: [255, 255, 0],
      yellowgreen: [154, 205, 5],
    },
    l = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/,
    d = [];
  const c =
      ("undefined" != typeof requestAnimationFrame && requestAnimationFrame) ||
      function (t) {
        setTimeout(t, 60);
      },
    g = {
      _isElement: (t) => !(!t || 1 != t.nodeType),
      _isFunction: (t) => !!(t && t.constructor && t.call && t.apply),
      _isPlainObject: (t) => !!t && t.constructor === Object,
      _isArray: (t) => "[object Array]" === Object.prototype.toString.call(t),
      _isNumber: (t) =>
        "[object Number]" === Object.prototype.toString.call(t) &&
        !isNaN(t) &&
        isFinite(t),
      _isString: (t) => "[object String]" === Object.prototype.toString.call(t),
      _isBoolean: (t) =>
        "[object Boolean]" === Object.prototype.toString.call(t),
      isObject: (t) => t instanceof Object,
      isValidSelector(t) {
        if ("string" != typeof t) return !1;
        var e = t[0];
        return "#" === e || "." === e || e === e.toUpperCase();
      },
      _sign: (t) => (0 === t || t > 0 ? 1 : -1),
      requestAnimFrame(t) {
        d.push(t),
          1 === d.length &&
            c(function () {
              const t = d;
              (d = []),
                t.forEach(function (t) {
                  t();
                });
            });
      },
      createCanvasElement() {
        var t = document.createElement("canvas");
        try {
          t.style = t.style || {};
        } catch (t) {}
        return t;
      },
      createImageElement: () => document.createElement("img"),
      _isInDocument(t) {
        for (; (t = t.parentNode); ) if (t == document) return !0;
        return !1;
      },
      _urlToImage(t, e) {
        var i = g.createImageElement();
        (i.onload = function () {
          e(i);
        }),
          (i.src = t);
      },
      _rgbToHex: (t, e, i) =>
        ((1 << 24) + (t << 16) + (e << 8) + i).toString(16).slice(1),
      _hexToRgb(t) {
        t = t.replace("#", "");
        var e = parseInt(t, 16);
        return { r: (e >> 16) & 255, g: (e >> 8) & 255, b: 255 & e };
      },
      getRandomColor() {
        for (
          var t = ((16777215 * Math.random()) << 0).toString(16);
          t.length < 6;

        )
          t = "0" + t;
        return "#" + t;
      },
      getRGB(t) {
        var e;
        return t in h
          ? { r: (e = h[t])[0], g: e[1], b: e[2] }
          : "#" === t[0]
          ? this._hexToRgb(t.substring(1))
          : "rgb(" === t.substr(0, 4)
          ? ((e = l.exec(t.replace(/ /g, ""))),
            {
              r: parseInt(e[1], 10),
              g: parseInt(e[2], 10),
              b: parseInt(e[3], 10),
            })
          : { r: 0, g: 0, b: 0 };
      },
      colorToRGBA: (t) => (
        (t = t || "black"),
        g._namedColorToRBA(t) ||
          g._hex3ColorToRGBA(t) ||
          g._hex4ColorToRGBA(t) ||
          g._hex6ColorToRGBA(t) ||
          g._hex8ColorToRGBA(t) ||
          g._rgbColorToRGBA(t) ||
          g._rgbaColorToRGBA(t) ||
          g._hslColorToRGBA(t)
      ),
      _namedColorToRBA(t) {
        var e = h[t.toLowerCase()];
        return e ? { r: e[0], g: e[1], b: e[2], a: 1 } : null;
      },
      _rgbColorToRGBA(t) {
        if (0 === t.indexOf("rgb(")) {
          var e = (t = t.match(/rgb\(([^)]+)\)/)[1]).split(/ *, */).map(Number);
          return { r: e[0], g: e[1], b: e[2], a: 1 };
        }
      },
      _rgbaColorToRGBA(t) {
        if (0 === t.indexOf("rgba(")) {
          var e = (t = t.match(/rgba\(([^)]+)\)/)[1])
            .split(/ *, */)
            .map((t, e) =>
              "%" === t.slice(-1)
                ? 3 === e
                  ? parseInt(t) / 100
                  : (parseInt(t) / 100) * 255
                : Number(t)
            );
          return { r: e[0], g: e[1], b: e[2], a: e[3] };
        }
      },
      _hex8ColorToRGBA(t) {
        if ("#" === t[0] && 9 === t.length)
          return {
            r: parseInt(t.slice(1, 3), 16),
            g: parseInt(t.slice(3, 5), 16),
            b: parseInt(t.slice(5, 7), 16),
            a: parseInt(t.slice(7, 9), 16) / 255,
          };
      },
      _hex6ColorToRGBA(t) {
        if ("#" === t[0] && 7 === t.length)
          return {
            r: parseInt(t.slice(1, 3), 16),
            g: parseInt(t.slice(3, 5), 16),
            b: parseInt(t.slice(5, 7), 16),
            a: 1,
          };
      },
      _hex4ColorToRGBA(t) {
        if ("#" === t[0] && 5 === t.length)
          return {
            r: parseInt(t[1] + t[1], 16),
            g: parseInt(t[2] + t[2], 16),
            b: parseInt(t[3] + t[3], 16),
            a: parseInt(t[4] + t[4], 16) / 255,
          };
      },
      _hex3ColorToRGBA(t) {
        if ("#" === t[0] && 4 === t.length)
          return {
            r: parseInt(t[1] + t[1], 16),
            g: parseInt(t[2] + t[2], 16),
            b: parseInt(t[3] + t[3], 16),
            a: 1,
          };
      },
      _hslColorToRGBA(t) {
        if (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.test(t)) {
          const [e, ...i] = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(t),
            r = Number(i[0]) / 360,
            a = Number(i[1]) / 100,
            n = Number(i[2]) / 100;
          let s, o, h;
          if (0 === a)
            return (
              (h = 255 * n),
              { r: Math.round(h), g: Math.round(h), b: Math.round(h), a: 1 }
            );
          s = n < 0.5 ? n * (1 + a) : n + a - n * a;
          const l = 2 * n - s,
            d = [0, 0, 0];
          for (let t = 0; t < 3; t++)
            (o = r + (1 / 3) * -(t - 1)),
              o < 0 && o++,
              o > 1 && o--,
              (h =
                6 * o < 1
                  ? l + 6 * (s - l) * o
                  : 2 * o < 1
                  ? s
                  : 3 * o < 2
                  ? l + (s - l) * (2 / 3 - o) * 6
                  : l),
              (d[t] = 255 * h);
          return {
            r: Math.round(d[0]),
            g: Math.round(d[1]),
            b: Math.round(d[2]),
            a: 1,
          };
        }
      },
      haveIntersection: (t, e) =>
        !(
          e.x > t.x + t.width ||
          e.x + e.width < t.x ||
          e.y > t.y + t.height ||
          e.y + e.height < t.y
        ),
      cloneObject(t) {
        var e = {};
        for (var i in t)
          this._isPlainObject(t[i])
            ? (e[i] = this.cloneObject(t[i]))
            : this._isArray(t[i])
            ? (e[i] = this.cloneArray(t[i]))
            : (e[i] = t[i]);
        return e;
      },
      cloneArray: (t) => t.slice(0),
      degToRad: (t) => t * n,
      radToDeg: (t) => t * s,
      _degToRad: (t) => (
        g.warn(
          "Util._degToRad is removed. Please use public Util.degToRad instead."
        ),
        g.degToRad(t)
      ),
      _radToDeg: (t) => (
        g.warn(
          "Util._radToDeg is removed. Please use public Util.radToDeg instead."
        ),
        g.radToDeg(t)
      ),
      _getRotation: (t) => (i.angleDeg ? g.radToDeg(t) : t),
      _capitalize: (t) => t.charAt(0).toUpperCase() + t.slice(1),
      throw(t) {
        throw new Error(o + t);
      },
      error(t) {
        console.error(o + t);
      },
      warn(t) {
        i.showWarnings && console.warn("Konva warning: " + t);
      },
      each(t, e) {
        for (var i in t) e(i, t[i]);
      },
      _inRange: (t, e, i) => e <= t && t < i,
      _getProjectionToSegment(t, e, i, r, a, n) {
        var s,
          o,
          h,
          l = (t - i) * (t - i) + (e - r) * (e - r);
        if (0 == l)
          (s = t), (o = e), (h = (a - i) * (a - i) + (n - r) * (n - r));
        else {
          var d = ((a - t) * (i - t) + (n - e) * (r - e)) / l;
          d < 0
            ? ((s = t), (o = e), (h = (t - a) * (t - a) + (e - n) * (e - n)))
            : d > 1
            ? ((s = i), (o = r), (h = (i - a) * (i - a) + (r - n) * (r - n)))
            : (h =
                ((s = t + d * (i - t)) - a) * (s - a) +
                ((o = e + d * (r - e)) - n) * (o - n));
        }
        return [s, o, h];
      },
      _getProjectionToLine(t, e, i) {
        var r = g.cloneObject(t),
          a = Number.MAX_VALUE;
        return (
          e.forEach(function (n, s) {
            if (i || s !== e.length - 1) {
              var o = e[(s + 1) % e.length],
                h = g._getProjectionToSegment(n.x, n.y, o.x, o.y, t.x, t.y),
                l = h[0],
                d = h[1],
                c = h[2];
              c < a && ((r.x = l), (r.y = d), (a = c));
            }
          }),
          r
        );
      },
      _prepareArrayForTween(t, e, i) {
        var r,
          a = [],
          n = [];
        if (t.length > e.length) {
          var s = e;
          (e = t), (t = s);
        }
        for (r = 0; r < t.length; r += 2) a.push({ x: t[r], y: t[r + 1] });
        for (r = 0; r < e.length; r += 2) n.push({ x: e[r], y: e[r + 1] });
        var o = [];
        return (
          n.forEach(function (t) {
            var e = g._getProjectionToLine(t, a, i);
            o.push(e.x), o.push(e.y);
          }),
          o
        );
      },
      _prepareToStringify(t) {
        var e;
        for (var i in ((t.visitedByCircularReferenceRemoval = !0), t))
          if (t.hasOwnProperty(i) && t[i] && "object" == typeof t[i])
            if (
              ((e = Object.getOwnPropertyDescriptor(t, i)),
              t[i].visitedByCircularReferenceRemoval || g._isElement(t[i]))
            ) {
              if (!e.configurable) return null;
              delete t[i];
            } else if (null === g._prepareToStringify(t[i])) {
              if (!e.configurable) return null;
              delete t[i];
            }
        return delete t.visitedByCircularReferenceRemoval, t;
      },
      _assign(t, e) {
        for (var i in e) t[i] = e[i];
        return t;
      },
      _getFirstPointerId: (t) =>
        t.touches ? t.changedTouches[0].identifier : t.pointerId || 999,
      releaseCanvas(...t) {
        i.releaseCanvasOnDestroy &&
          t.forEach((t) => {
            (t.width = 0), (t.height = 0);
          });
      },
      drawRoundedRectPath(t, e, i, r) {
        let a = 0,
          n = 0,
          s = 0,
          o = 0;
        "number" == typeof r
          ? (a = n = s = o = Math.min(r, e / 2, i / 2))
          : ((a = Math.min(r[0] || 0, e / 2, i / 2)),
            (n = Math.min(r[1] || 0, e / 2, i / 2)),
            (o = Math.min(r[2] || 0, e / 2, i / 2)),
            (s = Math.min(r[3] || 0, e / 2, i / 2))),
          t.moveTo(a, 0),
          t.lineTo(e - n, 0),
          t.arc(e - n, n, n, (3 * Math.PI) / 2, 0, !1),
          t.lineTo(e, i - o),
          t.arc(e - o, i - o, o, 0, Math.PI / 2, !1),
          t.lineTo(s, i),
          t.arc(s, i - s, s, Math.PI / 2, Math.PI, !1),
          t.lineTo(0, a),
          t.arc(a, a, a, Math.PI, (3 * Math.PI) / 2, !1);
      },
    };
  function u(t) {
    return g._isString(t)
      ? '"' + t + '"'
      : "[object Number]" === Object.prototype.toString.call(t) ||
        g._isBoolean(t)
      ? t
      : Object.prototype.toString.call(t);
  }
  function f(t) {
    return t > 255 ? 255 : t < 0 ? 0 : Math.round(t);
  }
  function p() {
    if (i.isUnminified)
      return function (t, e) {
        return (
          g._isNumber(t) ||
            g.warn(
              u(t) +
                ' is a not valid value for "' +
                e +
                '" attribute. The value should be a number.'
            ),
          t
        );
      };
  }
  function v(t) {
    if (i.isUnminified)
      return function (e, i) {
        let r = g._isNumber(e),
          a = g._isArray(e) && e.length == t;
        return (
          r ||
            a ||
            g.warn(
              u(e) +
                ' is a not valid value for "' +
                i +
                '" attribute. The value should be a number or Array<number>(' +
                t +
                ")"
            ),
          e
        );
      };
  }
  function m() {
    if (i.isUnminified)
      return function (t, e) {
        return (
          g._isNumber(t) ||
            "auto" === t ||
            g.warn(
              u(t) +
                ' is a not valid value for "' +
                e +
                '" attribute. The value should be a number or "auto".'
            ),
          t
        );
      };
  }
  function _() {
    if (i.isUnminified)
      return function (t, e) {
        return (
          g._isString(t) ||
            g.warn(
              u(t) +
                ' is a not valid value for "' +
                e +
                '" attribute. The value should be a string.'
            ),
          t
        );
      };
  }
  function y() {
    if (i.isUnminified)
      return function (t, e) {
        const i = g._isString(t),
          r =
            "[object CanvasGradient]" === Object.prototype.toString.call(t) ||
            (t && t.addColorStop);
        return (
          i ||
            r ||
            g.warn(
              u(t) +
                ' is a not valid value for "' +
                e +
                '" attribute. The value should be a string or a native gradient.'
            ),
          t
        );
      };
  }
  function x() {
    if (i.isUnminified)
      return function (t, e) {
        return (
          !0 === t ||
            !1 === t ||
            g.warn(
              u(t) +
                ' is a not valid value for "' +
                e +
                '" attribute. The value should be a boolean.'
            ),
          t
        );
      };
  }
  var b = "get",
    S = "set";
  const w = {
    addGetterSetter(t, e, i, r, a) {
      w.addGetter(t, e, i),
        w.addSetter(t, e, r, a),
        w.addOverloadedGetterSetter(t, e);
    },
    addGetter(t, e, i) {
      var r = b + g._capitalize(e);
      t.prototype[r] =
        t.prototype[r] ||
        function () {
          var t = this.attrs[e];
          return void 0 === t ? i : t;
        };
    },
    addSetter(t, e, i, r) {
      var a = S + g._capitalize(e);
      t.prototype[a] || w.overWriteSetter(t, e, i, r);
    },
    overWriteSetter(t, e, i, r) {
      var a = S + g._capitalize(e);
      t.prototype[a] = function (t) {
        return (
          i && null != t && (t = i.call(this, t, e)),
          this._setAttr(e, t),
          r && r.call(this),
          this
        );
      };
    },
    addComponentsGetterSetter(t, e, r, a, n) {
      var s,
        o,
        h = r.length,
        l = g._capitalize,
        d = b + l(e),
        c = S + l(e);
      t.prototype[d] = function () {
        var t = {};
        for (s = 0; s < h; s++) t[(o = r[s])] = this.getAttr(e + l(o));
        return t;
      };
      var f = (function (t) {
        if (i.isUnminified)
          return function (e, i) {
            return (
              null == e ||
                g.isObject(e) ||
                g.warn(
                  u(e) +
                    ' is a not valid value for "' +
                    i +
                    '" attribute. The value should be an object with properties ' +
                    t
                ),
              e
            );
          };
      })(r);
      (t.prototype[c] = function (t) {
        var i,
          s = this.attrs[e];
        for (i in (a && (t = a.call(this, t)), f && f.call(this, t, e), t))
          t.hasOwnProperty(i) && this._setAttr(e + l(i), t[i]);
        return (
          t ||
            r.forEach((t) => {
              this._setAttr(e + l(t), void 0);
            }),
          this._fireChangeEvent(e, s, t),
          n && n.call(this),
          this
        );
      }),
        w.addOverloadedGetterSetter(t, e);
    },
    addOverloadedGetterSetter(t, e) {
      var i = g._capitalize(e),
        r = S + i,
        a = b + i;
      t.prototype[e] = function () {
        return arguments.length ? (this[r](arguments[0]), this) : this[a]();
      };
    },
    addDeprecatedGetterSetter(t, e, i, r) {
      g.error("Adding deprecated " + e);
      var a = b + g._capitalize(e),
        n =
          e +
          " property is deprecated and will be removed soon. Look at Konva change log for more information.";
      (t.prototype[a] = function () {
        g.error(n);
        var t = this.attrs[e];
        return void 0 === t ? i : t;
      }),
        w.addSetter(t, e, r, function () {
          g.error(n);
        }),
        w.addOverloadedGetterSetter(t, e);
    },
    backCompat(t, e) {
      g.each(e, function (e, i) {
        var r = t.prototype[i],
          a = b + g._capitalize(e),
          n = S + g._capitalize(e);
        function s() {
          r.apply(this, arguments),
            g.error(
              '"' +
                e +
                '" method is deprecated and will be removed soon. Use ""' +
                i +
                '" instead.'
            );
        }
        (t.prototype[e] = s), (t.prototype[a] = s), (t.prototype[n] = s);
      });
    },
    afterSetFilter() {
      this._filterUpToDate = !1;
    },
  };
  var C = [
    "arc",
    "arcTo",
    "beginPath",
    "bezierCurveTo",
    "clearRect",
    "clip",
    "closePath",
    "createLinearGradient",
    "createPattern",
    "createRadialGradient",
    "drawImage",
    "ellipse",
    "fill",
    "fillText",
    "getImageData",
    "createImageData",
    "lineTo",
    "moveTo",
    "putImageData",
    "quadraticCurveTo",
    "rect",
    "restore",
    "rotate",
    "save",
    "scale",
    "setLineDash",
    "setTransform",
    "stroke",
    "strokeText",
    "transform",
    "translate",
  ];
  class P {
    constructor(t) {
      (this.canvas = t),
        i.enableTrace && ((this.traceArr = []), this._enableTrace());
    }
    fillShape(t) {
      t.fillEnabled() && this._fill(t);
    }
    _fill(t) {}
    strokeShape(t) {
      t.hasStroke() && this._stroke(t);
    }
    _stroke(t) {}
    fillStrokeShape(t) {
      t.attrs.fillAfterStrokeEnabled
        ? (this.strokeShape(t), this.fillShape(t))
        : (this.fillShape(t), this.strokeShape(t));
    }
    getTrace(t, e) {
      var i,
        r,
        a,
        n,
        s = this.traceArr,
        o = s.length,
        h = "";
      for (i = 0; i < o; i++)
        (a = (r = s[i]).method)
          ? ((n = r.args),
            (h += a),
            t
              ? (h += "()")
              : g._isArray(n[0])
              ? (h += "([" + n.join(",") + "])")
              : (e &&
                  (n = n.map((t) =>
                    "number" == typeof t ? Math.floor(t) : t
                  )),
                (h += "(" + n.join(",") + ")")))
          : ((h += r.property), t || (h += "=" + r.val)),
          (h += ";");
      return h;
    }
    clearTrace() {
      this.traceArr = [];
    }
    _trace(t) {
      var e = this.traceArr;
      e.push(t), e.length >= 100 && e.shift();
    }
    reset() {
      var t = this.getCanvas().getPixelRatio();
      this.setTransform(1 * t, 0, 0, 1 * t, 0, 0);
    }
    getCanvas() {
      return this.canvas;
    }
    clear(t) {
      var e = this.getCanvas();
      t
        ? this.clearRect(t.x || 0, t.y || 0, t.width || 0, t.height || 0)
        : this.clearRect(
            0,
            0,
            e.getWidth() / e.pixelRatio,
            e.getHeight() / e.pixelRatio
          );
    }
    _applyLineCap(t) {
      const e = t.attrs.lineCap;
      e && this.setAttr("lineCap", e);
    }
    _applyOpacity(t) {
      var e = t.getAbsoluteOpacity();
      1 !== e && this.setAttr("globalAlpha", e);
    }
    _applyLineJoin(t) {
      const e = t.attrs.lineJoin;
      e && this.setAttr("lineJoin", e);
    }
    setAttr(t, e) {
      this._context[t] = e;
    }
    arc(t, e, i, r, a, n) {
      this._context.arc(t, e, i, r, a, n);
    }
    arcTo(t, e, i, r, a) {
      this._context.arcTo(t, e, i, r, a);
    }
    beginPath() {
      this._context.beginPath();
    }
    bezierCurveTo(t, e, i, r, a, n) {
      this._context.bezierCurveTo(t, e, i, r, a, n);
    }
    clearRect(t, e, i, r) {
      this._context.clearRect(t, e, i, r);
    }
    clip(...t) {
      this._context.clip.apply(this._context, t);
    }
    closePath() {
      this._context.closePath();
    }
    createImageData(t, e) {
      var i = arguments;
      return 2 === i.length
        ? this._context.createImageData(t, e)
        : 1 === i.length
        ? this._context.createImageData(t)
        : void 0;
    }
    createLinearGradient(t, e, i, r) {
      return this._context.createLinearGradient(t, e, i, r);
    }
    createPattern(t, e) {
      return this._context.createPattern(t, e);
    }
    createRadialGradient(t, e, i, r, a, n) {
      return this._context.createRadialGradient(t, e, i, r, a, n);
    }
    drawImage(t, e, i, r, a, n, s, o, h) {
      var l = arguments,
        d = this._context;
      3 === l.length
        ? d.drawImage(t, e, i)
        : 5 === l.length
        ? d.drawImage(t, e, i, r, a)
        : 9 === l.length && d.drawImage(t, e, i, r, a, n, s, o, h);
    }
    ellipse(t, e, i, r, a, n, s, o) {
      this._context.ellipse(t, e, i, r, a, n, s, o);
    }
    isPointInPath(t, e, i, r) {
      return i
        ? this._context.isPointInPath(i, t, e, r)
        : this._context.isPointInPath(t, e, r);
    }
    fill(...t) {
      this._context.fill.apply(this._context, t);
    }
    fillRect(t, e, i, r) {
      this._context.fillRect(t, e, i, r);
    }
    strokeRect(t, e, i, r) {
      this._context.strokeRect(t, e, i, r);
    }
    fillText(t, e, i, r) {
      r ? this._context.fillText(t, e, i, r) : this._context.fillText(t, e, i);
    }
    measureText(t) {
      return this._context.measureText(t);
    }
    getImageData(t, e, i, r) {
      return this._context.getImageData(t, e, i, r);
    }
    lineTo(t, e) {
      this._context.lineTo(t, e);
    }
    moveTo(t, e) {
      this._context.moveTo(t, e);
    }
    rect(t, e, i, r) {
      this._context.rect(t, e, i, r);
    }
    putImageData(t, e, i) {
      this._context.putImageData(t, e, i);
    }
    quadraticCurveTo(t, e, i, r) {
      this._context.quadraticCurveTo(t, e, i, r);
    }
    restore() {
      this._context.restore();
    }
    rotate(t) {
      this._context.rotate(t);
    }
    save() {
      this._context.save();
    }
    scale(t, e) {
      this._context.scale(t, e);
    }
    setLineDash(t) {
      this._context.setLineDash
        ? this._context.setLineDash(t)
        : "mozDash" in this._context
        ? (this._context.mozDash = t)
        : "webkitLineDash" in this._context &&
          (this._context.webkitLineDash = t);
    }
    getLineDash() {
      return this._context.getLineDash();
    }
    setTransform(t, e, i, r, a, n) {
      this._context.setTransform(t, e, i, r, a, n);
    }
    stroke(t) {
      t ? this._context.stroke(t) : this._context.stroke();
    }
    strokeText(t, e, i, r) {
      this._context.strokeText(t, e, i, r);
    }
    transform(t, e, i, r, a, n) {
      this._context.transform(t, e, i, r, a, n);
    }
    translate(t, e) {
      this._context.translate(t, e);
    }
    _enableTrace() {
      var t,
        e,
        i = this,
        r = C.length,
        a = this.setAttr,
        n = function (t) {
          var r,
            a = i[t];
          i[t] = function () {
            return (
              (e = (function (t) {
                var e,
                  i,
                  r = [],
                  a = t.length,
                  n = g;
                for (e = 0; e < a; e++)
                  (i = t[e]),
                    n._isNumber(i)
                      ? (i = Math.round(1e3 * i) / 1e3)
                      : n._isString(i) || (i += ""),
                    r.push(i);
                return r;
              })(Array.prototype.slice.call(arguments, 0))),
              (r = a.apply(i, arguments)),
              i._trace({ method: t, args: e }),
              r
            );
          };
        };
      for (t = 0; t < r; t++) n(C[t]);
      i.setAttr = function () {
        a.apply(i, arguments);
        var t = arguments[0],
          e = arguments[1];
        ("shadowOffsetX" !== t &&
          "shadowOffsetY" !== t &&
          "shadowBlur" !== t) ||
          (e /= this.canvas.getPixelRatio()),
          i._trace({ property: t, val: e });
      };
    }
    _applyGlobalCompositeOperation(t) {
      const e = t.attrs.globalCompositeOperation;
      !e || "source-over" === e || this.setAttr("globalCompositeOperation", e);
    }
  }
  [
    "fillStyle",
    "strokeStyle",
    "shadowColor",
    "shadowBlur",
    "shadowOffsetX",
    "shadowOffsetY",
    "lineCap",
    "lineDashOffset",
    "lineJoin",
    "lineWidth",
    "miterLimit",
    "font",
    "textAlign",
    "textBaseline",
    "globalAlpha",
    "globalCompositeOperation",
    "imageSmoothingEnabled",
  ].forEach(function (t) {
    Object.defineProperty(P.prototype, t, {
      get() {
        return this._context[t];
      },
      set(e) {
        this._context[t] = e;
      },
    });
  });
  class k extends P {
    constructor(t, { willReadFrequently: e = !1 } = {}) {
      super(t),
        (this._context = t._canvas.getContext("2d", { willReadFrequently: e }));
    }
    _fillColor(t) {
      var e = t.fill();
      this.setAttr("fillStyle", e), t._fillFunc(this);
    }
    _fillPattern(t) {
      this.setAttr("fillStyle", t._getFillPattern()), t._fillFunc(this);
    }
    _fillLinearGradient(t) {
      var e = t._getLinearGradient();
      e && (this.setAttr("fillStyle", e), t._fillFunc(this));
    }
    _fillRadialGradient(t) {
      const e = t._getRadialGradient();
      e && (this.setAttr("fillStyle", e), t._fillFunc(this));
    }
    _fill(t) {
      const e = t.fill(),
        i = t.getFillPriority();
      if (e && "color" === i) return void this._fillColor(t);
      const r = t.getFillPatternImage();
      if (r && "pattern" === i) return void this._fillPattern(t);
      const a = t.getFillLinearGradientColorStops();
      if (a && "linear-gradient" === i) return void this._fillLinearGradient(t);
      const n = t.getFillRadialGradientColorStops();
      n && "radial-gradient" === i
        ? this._fillRadialGradient(t)
        : e
        ? this._fillColor(t)
        : r
        ? this._fillPattern(t)
        : a
        ? this._fillLinearGradient(t)
        : n && this._fillRadialGradient(t);
    }
    _strokeLinearGradient(t) {
      const e = t.getStrokeLinearGradientStartPoint(),
        i = t.getStrokeLinearGradientEndPoint(),
        r = t.getStrokeLinearGradientColorStops(),
        a = this.createLinearGradient(e.x, e.y, i.x, i.y);
      if (r) {
        for (var n = 0; n < r.length; n += 2) a.addColorStop(r[n], r[n + 1]);
        this.setAttr("strokeStyle", a);
      }
    }
    _stroke(t) {
      var e = t.dash(),
        i = t.getStrokeScaleEnabled();
      if (t.hasStroke()) {
        if (!i) {
          this.save();
          var r = this.getCanvas().getPixelRatio();
          this.setTransform(r, 0, 0, r, 0, 0);
        }
        this._applyLineCap(t),
          e &&
            t.dashEnabled() &&
            (this.setLineDash(e),
            this.setAttr("lineDashOffset", t.dashOffset())),
          this.setAttr("lineWidth", t.strokeWidth()),
          t.getShadowForStrokeEnabled() ||
            this.setAttr("shadowColor", "rgba(0,0,0,0)"),
          t.getStrokeLinearGradientColorStops()
            ? this._strokeLinearGradient(t)
            : this.setAttr("strokeStyle", t.stroke()),
          t._strokeFunc(this),
          i || this.restore();
      }
    }
    _applyShadow(t) {
      var e,
        i,
        r,
        a = null !== (e = t.getShadowRGBA()) && void 0 !== e ? e : "black",
        n = null !== (i = t.getShadowBlur()) && void 0 !== i ? i : 5,
        s =
          null !== (r = t.getShadowOffset()) && void 0 !== r
            ? r
            : { x: 0, y: 0 },
        o = t.getAbsoluteScale(),
        h = this.canvas.getPixelRatio(),
        l = o.x * h,
        d = o.y * h;
      this.setAttr("shadowColor", a),
        this.setAttr("shadowBlur", n * Math.min(Math.abs(l), Math.abs(d))),
        this.setAttr("shadowOffsetX", s.x * l),
        this.setAttr("shadowOffsetY", s.y * d);
    }
  }
  class T extends P {
    constructor(t) {
      super(t),
        (this._context = t._canvas.getContext("2d", {
          willReadFrequently: !0,
        }));
    }
    _fill(t) {
      this.save(),
        this.setAttr("fillStyle", t.colorKey),
        t._fillFuncHit(this),
        this.restore();
    }
    strokeShape(t) {
      t.hasHitStroke() && this._stroke(t);
    }
    _stroke(t) {
      if (t.hasHitStroke()) {
        const a = t.getStrokeScaleEnabled();
        if (!a) {
          this.save();
          var e = this.getCanvas().getPixelRatio();
          this.setTransform(e, 0, 0, e, 0, 0);
        }
        this._applyLineCap(t);
        var i = t.hitStrokeWidth(),
          r = "auto" === i ? t.strokeWidth() : i;
        this.setAttr("lineWidth", r),
          this.setAttr("strokeStyle", t.colorKey),
          t._strokeFuncHit(this),
          a || this.restore();
      }
    }
  }
  var A;
  class M {
    constructor(t) {
      (this.pixelRatio = 1),
        (this.width = 0),
        (this.height = 0),
        (this.isCache = !1);
      var e =
        (t || {}).pixelRatio ||
        i.pixelRatio ||
        (function () {
          if (A) return A;
          var t = g.createCanvasElement(),
            e = t.getContext("2d");
          return (
            (A =
              (i._global.devicePixelRatio || 1) /
              (e.webkitBackingStorePixelRatio ||
                e.mozBackingStorePixelRatio ||
                e.msBackingStorePixelRatio ||
                e.oBackingStorePixelRatio ||
                e.backingStorePixelRatio ||
                1)),
            g.releaseCanvas(t),
            A
          );
        })();
      (this.pixelRatio = e),
        (this._canvas = g.createCanvasElement()),
        (this._canvas.style.padding = "0"),
        (this._canvas.style.margin = "0"),
        (this._canvas.style.border = "0"),
        (this._canvas.style.background = "transparent"),
        (this._canvas.style.position = "absolute"),
        (this._canvas.style.top = "0"),
        (this._canvas.style.left = "0");
    }
    getContext() {
      return this.context;
    }
    getPixelRatio() {
      return this.pixelRatio;
    }
    setPixelRatio(t) {
      var e = this.pixelRatio;
      (this.pixelRatio = t),
        this.setSize(this.getWidth() / e, this.getHeight() / e);
    }
    setWidth(t) {
      (this.width = this._canvas.width = t * this.pixelRatio),
        (this._canvas.style.width = t + "px");
      var e = this.pixelRatio;
      this.getContext()._context.scale(e, e);
    }
    setHeight(t) {
      (this.height = this._canvas.height = t * this.pixelRatio),
        (this._canvas.style.height = t + "px");
      var e = this.pixelRatio;
      this.getContext()._context.scale(e, e);
    }
    getWidth() {
      return this.width;
    }
    getHeight() {
      return this.height;
    }
    setSize(t, e) {
      this.setWidth(t || 0), this.setHeight(e || 0);
    }
    toDataURL(t, e) {
      try {
        return this._canvas.toDataURL(t, e);
      } catch (t) {
        try {
          return this._canvas.toDataURL();
        } catch (t) {
          return (
            g.error(
              "Unable to get data URL. " +
                t.message +
                " For more info read https://konvajs.org/docs/posts/Tainted_Canvas.html."
            ),
            ""
          );
        }
      }
    }
  }
  w.addGetterSetter(M, "pixelRatio", void 0, p());
  class G extends M {
    constructor(t = { width: 0, height: 0, willReadFrequently: !1 }) {
      super(t),
        (this.context = new k(this, {
          willReadFrequently: t.willReadFrequently,
        })),
        this.setSize(t.width, t.height);
    }
  }
  class R extends M {
    constructor(t = { width: 0, height: 0 }) {
      super(t),
        (this.hitCanvas = !0),
        (this.context = new T(this)),
        this.setSize(t.width, t.height);
    }
  }
  const E = {
    get isDragging() {
      var t = !1;
      return (
        E._dragElements.forEach((e) => {
          "dragging" === e.dragStatus && (t = !0);
        }),
        t
      );
    },
    justDragged: !1,
    get node() {
      var t;
      return (
        E._dragElements.forEach((e) => {
          t = e.node;
        }),
        t
      );
    },
    _dragElements: new Map(),
    _drag(t) {
      const e = [];
      E._dragElements.forEach((i, r) => {
        const { node: a } = i,
          n = a.getStage();
        n.setPointersPositions(t),
          void 0 === i.pointerId && (i.pointerId = g._getFirstPointerId(t));
        const s = n._changedPointerPositions.find((t) => t.id === i.pointerId);
        if (s) {
          if ("dragging" !== i.dragStatus) {
            var o = a.dragDistance();
            if (
              Math.max(
                Math.abs(s.x - i.startPointerPos.x),
                Math.abs(s.y - i.startPointerPos.y)
              ) < o
            )
              return;
            if ((a.startDrag({ evt: t }), !a.isDragging())) return;
          }
          a._setDragPosition(t, i), e.push(a);
        }
      }),
        e.forEach((e) => {
          e.fire("dragmove", { type: "dragmove", target: e, evt: t }, !0);
        });
    },
    _endDragBefore(t) {
      const e = [];
      E._dragElements.forEach((r) => {
        const { node: a } = r,
          n = a.getStage();
        t && n.setPointersPositions(t);
        if (!n._changedPointerPositions.find((t) => t.id === r.pointerId))
          return;
        ("dragging" !== r.dragStatus && "stopped" !== r.dragStatus) ||
          ((E.justDragged = !0),
          (i._mouseListenClick = !1),
          (i._touchListenClick = !1),
          (i._pointerListenClick = !1),
          (r.dragStatus = "stopped"));
        const s = r.node.getLayer() || (r.node instanceof i.Stage && r.node);
        s && -1 === e.indexOf(s) && e.push(s);
      }),
        e.forEach((t) => {
          t.draw();
        });
    },
    _endDragAfter(t) {
      E._dragElements.forEach((e, i) => {
        "stopped" === e.dragStatus &&
          e.node.fire(
            "dragend",
            { type: "dragend", target: e.node, evt: t },
            !0
          ),
          "dragging" !== e.dragStatus && E._dragElements.delete(i);
      });
    },
  };
  i.isBrowser &&
    (window.addEventListener("mouseup", E._endDragBefore, !0),
    window.addEventListener("touchend", E._endDragBefore, !0),
    window.addEventListener("mousemove", E._drag),
    window.addEventListener("touchmove", E._drag),
    window.addEventListener("mouseup", E._endDragAfter, !1),
    window.addEventListener("touchend", E._endDragAfter, !1));
  var D = "absoluteOpacity",
    L = "allEventListeners",
    O = "absoluteTransform",
    I = "absoluteScale",
    F = "canvas",
    N = "listening",
    B = "mouseenter",
    H = "mouseleave",
    W = "Shape",
    z = " ",
    Y = "stage",
    X = "transform",
    j = "visible",
    q = [
      "xChange.konva",
      "yChange.konva",
      "scaleXChange.konva",
      "scaleYChange.konva",
      "skewXChange.konva",
      "skewYChange.konva",
      "rotationChange.konva",
      "offsetXChange.konva",
      "offsetYChange.konva",
      "transformsEnabledChange.konva",
    ].join(z);
  let U = 1;
  class K {
    constructor(t) {
      (this._id = U++),
        (this.eventListeners = {}),
        (this.attrs = {}),
        (this.index = 0),
        (this._allEventListeners = null),
        (this.parent = null),
        (this._cache = new Map()),
        (this._attachedDepsListeners = new Map()),
        (this._lastPos = null),
        (this._batchingTransformChange = !1),
        (this._needClearTransformCache = !1),
        (this._filterUpToDate = !1),
        (this._isUnderCache = !1),
        (this._dragEventId = null),
        (this._shouldFireChangeEvents = !1),
        this.setAttrs(t),
        (this._shouldFireChangeEvents = !0);
    }
    hasChildren() {
      return !1;
    }
    _clearCache(t) {
      (t !== X && t !== O) || !this._cache.get(t)
        ? t
          ? this._cache.delete(t)
          : this._cache.clear()
        : (this._cache.get(t).dirty = !0);
    }
    _getCache(t, e) {
      var i = this._cache.get(t);
      return (
        (void 0 === i || ((t === X || t === O) && !0 === i.dirty)) &&
          ((i = e.call(this)), this._cache.set(t, i)),
        i
      );
    }
    _calculate(t, e, i) {
      if (!this._attachedDepsListeners.get(t)) {
        const i = e.map((t) => t + "Change.konva").join(z);
        this.on(i, () => {
          this._clearCache(t);
        }),
          this._attachedDepsListeners.set(t, !0);
      }
      return this._getCache(t, i);
    }
    _getCanvasCache() {
      return this._cache.get(F);
    }
    _clearSelfAndDescendantCache(t) {
      this._clearCache(t), t === O && this.fire("absoluteTransformChange");
    }
    clearCache() {
      if (this._cache.has(F)) {
        const { scene: t, filter: e, hit: i } = this._cache.get(F);
        g.releaseCanvas(t, e, i), this._cache.delete(F);
      }
      return this._clearSelfAndDescendantCache(), this._requestDraw(), this;
    }
    cache(t) {
      var e = t || {},
        i = {};
      (void 0 !== e.x &&
        void 0 !== e.y &&
        void 0 !== e.width &&
        void 0 !== e.height) ||
        (i = this.getClientRect({
          skipTransform: !0,
          relativeTo: this.getParent(),
        }));
      var r = Math.ceil(e.width || i.width),
        a = Math.ceil(e.height || i.height),
        n = e.pixelRatio,
        s = void 0 === e.x ? Math.floor(i.x) : e.x,
        o = void 0 === e.y ? Math.floor(i.y) : e.y,
        h = e.offset || 0,
        l = e.drawBorder || !1,
        d = e.hitCanvasPixelRatio || 1;
      if (r && a) {
        (s -= h), (o -= h);
        var c = new G({
            pixelRatio: n,
            width: (r += 2 * h + 1),
            height: (a += 2 * h + 1),
          }),
          u = new G({
            pixelRatio: n,
            width: 0,
            height: 0,
            willReadFrequently: !0,
          }),
          f = new R({ pixelRatio: d, width: r, height: a }),
          p = c.getContext(),
          v = f.getContext();
        return (
          (f.isCache = !0),
          (c.isCache = !0),
          this._cache.delete(F),
          (this._filterUpToDate = !1),
          !1 === e.imageSmoothingEnabled &&
            ((c.getContext()._context.imageSmoothingEnabled = !1),
            (u.getContext()._context.imageSmoothingEnabled = !1)),
          p.save(),
          v.save(),
          p.translate(-s, -o),
          v.translate(-s, -o),
          (this._isUnderCache = !0),
          this._clearSelfAndDescendantCache(D),
          this._clearSelfAndDescendantCache(I),
          this.drawScene(c, this),
          this.drawHit(f, this),
          (this._isUnderCache = !1),
          p.restore(),
          v.restore(),
          l &&
            (p.save(),
            p.beginPath(),
            p.rect(0, 0, r, a),
            p.closePath(),
            p.setAttr("strokeStyle", "red"),
            p.setAttr("lineWidth", 5),
            p.stroke(),
            p.restore()),
          this._cache.set(F, { scene: c, filter: u, hit: f, x: s, y: o }),
          this._requestDraw(),
          this
        );
      }
      g.error(
        "Can not cache the node. Width or height of the node equals 0. Caching is skipped."
      );
    }
    isCached() {
      return this._cache.has(F);
    }
    getClientRect(t) {
      throw new Error('abstract "getClientRect" method call');
    }
    _transformedRect(t, e) {
      var i,
        r,
        a,
        n,
        s = [
          { x: t.x, y: t.y },
          { x: t.x + t.width, y: t.y },
          { x: t.x + t.width, y: t.y + t.height },
          { x: t.x, y: t.y + t.height },
        ],
        o = this.getAbsoluteTransform(e);
      return (
        s.forEach(function (t) {
          var e = o.point(t);
          void 0 === i && ((i = a = e.x), (r = n = e.y)),
            (i = Math.min(i, e.x)),
            (r = Math.min(r, e.y)),
            (a = Math.max(a, e.x)),
            (n = Math.max(n, e.y));
        }),
        { x: i, y: r, width: a - i, height: n - r }
      );
    }
    _drawCachedSceneCanvas(t) {
      t.save(), t._applyOpacity(this), t._applyGlobalCompositeOperation(this);
      const e = this._getCanvasCache();
      t.translate(e.x, e.y);
      var i = this._getCachedSceneCanvas(),
        r = i.pixelRatio;
      t.drawImage(i._canvas, 0, 0, i.width / r, i.height / r), t.restore();
    }
    _drawCachedHitCanvas(t) {
      var e = this._getCanvasCache(),
        i = e.hit;
      t.save(),
        t.translate(e.x, e.y),
        t.drawImage(
          i._canvas,
          0,
          0,
          i.width / i.pixelRatio,
          i.height / i.pixelRatio
        ),
        t.restore();
    }
    _getCachedSceneCanvas() {
      var t,
        e,
        i,
        r,
        a = this.filters(),
        n = this._getCanvasCache(),
        s = n.scene,
        o = n.filter,
        h = o.getContext();
      if (a) {
        if (!this._filterUpToDate) {
          var l = s.pixelRatio;
          o.setSize(s.width / s.pixelRatio, s.height / s.pixelRatio);
          try {
            for (
              t = a.length,
                h.clear(),
                h.drawImage(
                  s._canvas,
                  0,
                  0,
                  s.getWidth() / l,
                  s.getHeight() / l
                ),
                e = h.getImageData(0, 0, o.getWidth(), o.getHeight()),
                i = 0;
              i < t;
              i++
            )
              "function" == typeof (r = a[i])
                ? (r.call(this, e), h.putImageData(e, 0, 0))
                : g.error(
                    "Filter should be type of function, but got " +
                      typeof r +
                      " instead. Please check correct filters"
                  );
          } catch (t) {
            g.error(
              "Unable to apply filter. " +
                t.message +
                " This post my help you https://konvajs.org/docs/posts/Tainted_Canvas.html."
            );
          }
          this._filterUpToDate = !0;
        }
        return o;
      }
      return s;
    }
    on(t, e) {
      if ((this._cache && this._cache.delete(L), 3 === arguments.length))
        return this._delegate.apply(this, arguments);
      var i,
        r,
        a,
        n,
        s = t.split(z),
        o = s.length;
      for (i = 0; i < o; i++)
        (a = (r = s[i].split("."))[0]),
          (n = r[1] || ""),
          this.eventListeners[a] || (this.eventListeners[a] = []),
          this.eventListeners[a].push({ name: n, handler: e });
      return this;
    }
    off(t, e) {
      var i,
        r,
        a,
        n,
        s,
        o = (t || "").split(z),
        h = o.length;
      if ((this._cache && this._cache.delete(L), !t))
        for (r in this.eventListeners) this._off(r);
      for (i = 0; i < h; i++)
        if (((n = (a = o[i].split("."))[0]), (s = a[1]), n))
          this.eventListeners[n] && this._off(n, s, e);
        else for (r in this.eventListeners) this._off(r, s, e);
      return this;
    }
    dispatchEvent(t) {
      var e = { target: this, type: t.type, evt: t };
      return this.fire(t.type, e), this;
    }
    addEventListener(t, e) {
      return (
        this.on(t, function (t) {
          e.call(this, t.evt);
        }),
        this
      );
    }
    removeEventListener(t) {
      return this.off(t), this;
    }
    _delegate(t, e, i) {
      var r = this;
      this.on(t, function (t) {
        for (var a = t.target.findAncestors(e, !0, r), n = 0; n < a.length; n++)
          ((t = g.cloneObject(t)).currentTarget = a[n]), i.call(a[n], t);
      });
    }
    remove() {
      return (
        this.isDragging() && this.stopDrag(),
        E._dragElements.delete(this._id),
        this._remove(),
        this
      );
    }
    _clearCaches() {
      this._clearSelfAndDescendantCache(O),
        this._clearSelfAndDescendantCache(D),
        this._clearSelfAndDescendantCache(I),
        this._clearSelfAndDescendantCache(Y),
        this._clearSelfAndDescendantCache(j),
        this._clearSelfAndDescendantCache(N);
    }
    _remove() {
      this._clearCaches();
      var t = this.getParent();
      t &&
        t.children &&
        (t.children.splice(this.index, 1),
        t._setChildrenIndices(),
        (this.parent = null));
    }
    destroy() {
      return this.remove(), this.clearCache(), this;
    }
    getAttr(t) {
      var e = "get" + g._capitalize(t);
      return g._isFunction(this[e]) ? this[e]() : this.attrs[t];
    }
    getAncestors() {
      for (var t = this.getParent(), e = []; t; )
        e.push(t), (t = t.getParent());
      return e;
    }
    getAttrs() {
      return this.attrs || {};
    }
    setAttrs(t) {
      return (
        this._batchTransformChanges(() => {
          var e, i;
          if (!t) return this;
          for (e in t)
            "children" !== e &&
              ((i = "set" + g._capitalize(e)),
              g._isFunction(this[i]) ? this[i](t[e]) : this._setAttr(e, t[e]));
        }),
        this
      );
    }
    isListening() {
      return this._getCache(N, this._isListening);
    }
    _isListening(t) {
      if (!this.listening()) return !1;
      const e = this.getParent();
      return !e || e === t || this === t || e._isListening(t);
    }
    isVisible() {
      return this._getCache(j, this._isVisible);
    }
    _isVisible(t) {
      if (!this.visible()) return !1;
      const e = this.getParent();
      return !e || e === t || this === t || e._isVisible(t);
    }
    shouldDrawHit(t, e = !1) {
      if (t) return this._isVisible(t) && this._isListening(t);
      var r = this.getLayer(),
        a = !1;
      E._dragElements.forEach((t) => {
        "dragging" === t.dragStatus &&
          ("Stage" === t.node.nodeType || t.node.getLayer() === r) &&
          (a = !0);
      });
      var n = !e && !i.hitOnDragEnabled && a;
      return this.isListening() && this.isVisible() && !n;
    }
    show() {
      return this.visible(!0), this;
    }
    hide() {
      return this.visible(!1), this;
    }
    getZIndex() {
      return this.index || 0;
    }
    getAbsoluteZIndex() {
      var t,
        e,
        i,
        r,
        a = this.getDepth(),
        n = this,
        s = 0;
      return (
        "Stage" !== n.nodeType &&
          (function o(h) {
            for (t = [], e = h.length, i = 0; i < e; i++)
              (r = h[i]),
                s++,
                r.nodeType !== W && (t = t.concat(r.getChildren().slice())),
                r._id === n._id && (i = e);
            t.length > 0 && t[0].getDepth() <= a && o(t);
          })(n.getStage().getChildren()),
        s
      );
    }
    getDepth() {
      for (var t = 0, e = this.parent; e; ) t++, (e = e.parent);
      return t;
    }
    _batchTransformChanges(t) {
      (this._batchingTransformChange = !0),
        t(),
        (this._batchingTransformChange = !1),
        this._needClearTransformCache &&
          (this._clearCache(X), this._clearSelfAndDescendantCache(O)),
        (this._needClearTransformCache = !1);
    }
    setPosition(t) {
      return (
        this._batchTransformChanges(() => {
          this.x(t.x), this.y(t.y);
        }),
        this
      );
    }
    getPosition() {
      return { x: this.x(), y: this.y() };
    }
    getRelativePointerPosition() {
      if (!this.getStage()) return null;
      var t = this.getStage().getPointerPosition();
      if (!t) return null;
      var e = this.getAbsoluteTransform().copy();
      return e.invert(), e.point(t);
    }
    getAbsolutePosition(t) {
      let e = !1,
        i = this.parent;
      for (; i; ) {
        if (i.isCached()) {
          e = !0;
          break;
        }
        i = i.parent;
      }
      e && !t && (t = !0);
      var r = this.getAbsoluteTransform(t).getMatrix(),
        n = new a(),
        s = this.offset();
      return (n.m = r.slice()), n.translate(s.x, s.y), n.getTranslation();
    }
    setAbsolutePosition(t) {
      var e = this._clearTransform();
      (this.attrs.x = e.x),
        (this.attrs.y = e.y),
        delete e.x,
        delete e.y,
        this._clearCache(X);
      var i = this._getAbsoluteTransform().copy();
      return (
        i.invert(),
        i.translate(t.x, t.y),
        (t = {
          x: this.attrs.x + i.getTranslation().x,
          y: this.attrs.y + i.getTranslation().y,
        }),
        this._setTransform(e),
        this.setPosition({ x: t.x, y: t.y }),
        this._clearCache(X),
        this._clearSelfAndDescendantCache(O),
        this
      );
    }
    _setTransform(t) {
      var e;
      for (e in t) this.attrs[e] = t[e];
    }
    _clearTransform() {
      var t = {
        x: this.x(),
        y: this.y(),
        rotation: this.rotation(),
        scaleX: this.scaleX(),
        scaleY: this.scaleY(),
        offsetX: this.offsetX(),
        offsetY: this.offsetY(),
        skewX: this.skewX(),
        skewY: this.skewY(),
      };
      return (
        (this.attrs.x = 0),
        (this.attrs.y = 0),
        (this.attrs.rotation = 0),
        (this.attrs.scaleX = 1),
        (this.attrs.scaleY = 1),
        (this.attrs.offsetX = 0),
        (this.attrs.offsetY = 0),
        (this.attrs.skewX = 0),
        (this.attrs.skewY = 0),
        t
      );
    }
    move(t) {
      var e = t.x,
        i = t.y,
        r = this.x(),
        a = this.y();
      return (
        void 0 !== e && (r += e),
        void 0 !== i && (a += i),
        this.setPosition({ x: r, y: a }),
        this
      );
    }
    _eachAncestorReverse(t, e) {
      var i,
        r,
        a = [],
        n = this.getParent();
      if (!e || e._id !== this._id) {
        for (a.unshift(this); n && (!e || n._id !== e._id); )
          a.unshift(n), (n = n.parent);
        for (i = a.length, r = 0; r < i; r++) t(a[r]);
      }
    }
    rotate(t) {
      return this.rotation(this.rotation() + t), this;
    }
    moveToTop() {
      if (!this.parent)
        return g.warn("Node has no parent. moveToTop function is ignored."), !1;
      var t = this.index;
      return (
        t < this.parent.getChildren().length - 1 &&
        (this.parent.children.splice(t, 1),
        this.parent.children.push(this),
        this.parent._setChildrenIndices(),
        !0)
      );
    }
    moveUp() {
      if (!this.parent)
        return g.warn("Node has no parent. moveUp function is ignored."), !1;
      var t = this.index;
      return (
        t < this.parent.getChildren().length - 1 &&
        (this.parent.children.splice(t, 1),
        this.parent.children.splice(t + 1, 0, this),
        this.parent._setChildrenIndices(),
        !0)
      );
    }
    moveDown() {
      if (!this.parent)
        return g.warn("Node has no parent. moveDown function is ignored."), !1;
      var t = this.index;
      return (
        t > 0 &&
        (this.parent.children.splice(t, 1),
        this.parent.children.splice(t - 1, 0, this),
        this.parent._setChildrenIndices(),
        !0)
      );
    }
    moveToBottom() {
      if (!this.parent)
        return (
          g.warn("Node has no parent. moveToBottom function is ignored."), !1
        );
      var t = this.index;
      return (
        t > 0 &&
        (this.parent.children.splice(t, 1),
        this.parent.children.unshift(this),
        this.parent._setChildrenIndices(),
        !0)
      );
    }
    setZIndex(t) {
      if (!this.parent)
        return g.warn("Node has no parent. zIndex parameter is ignored."), this;
      (t < 0 || t >= this.parent.children.length) &&
        g.warn(
          "Unexpected value " +
            t +
            " for zIndex property. zIndex is just index of a node in children of its parent. Expected value is from 0 to " +
            (this.parent.children.length - 1) +
            "."
        );
      var e = this.index;
      return (
        this.parent.children.splice(e, 1),
        this.parent.children.splice(t, 0, this),
        this.parent._setChildrenIndices(),
        this
      );
    }
    getAbsoluteOpacity() {
      return this._getCache(D, this._getAbsoluteOpacity);
    }
    _getAbsoluteOpacity() {
      var t = this.opacity(),
        e = this.getParent();
      return e && !e._isUnderCache && (t *= e.getAbsoluteOpacity()), t;
    }
    moveTo(t) {
      return this.getParent() !== t && (this._remove(), t.add(this)), this;
    }
    toObject() {
      var t,
        e,
        i,
        r,
        a = {},
        n = this.getAttrs();
      for (t in ((a.attrs = {}), n))
        (e = n[t]),
          (g.isObject(e) && !g._isPlainObject(e) && !g._isArray(e)) ||
            ((i = "function" == typeof this[t] && this[t]),
            delete n[t],
            (r = i ? i.call(this) : null),
            (n[t] = e),
            r !== e && (a.attrs[t] = e));
      return (a.className = this.getClassName()), g._prepareToStringify(a);
    }
    toJSON() {
      return JSON.stringify(this.toObject());
    }
    getParent() {
      return this.parent;
    }
    findAncestors(t, e, i) {
      var r = [];
      e && this._isMatch(t) && r.push(this);
      for (var a = this.parent; a; ) {
        if (a === i) return r;
        a._isMatch(t) && r.push(a), (a = a.parent);
      }
      return r;
    }
    isAncestorOf(t) {
      return !1;
    }
    findAncestor(t, e, i) {
      return this.findAncestors(t, e, i)[0];
    }
    _isMatch(t) {
      if (!t) return !1;
      if ("function" == typeof t) return t(this);
      var e,
        i,
        r = t.replace(/ /g, "").split(","),
        a = r.length;
      for (e = 0; e < a; e++)
        if (
          ((i = r[e]),
          g.isValidSelector(i) ||
            (g.warn(
              'Selector "' +
                i +
                '" is invalid. Allowed selectors examples are "#foo", ".bar" or "Group".'
            ),
            g.warn(
              'If you have a custom shape with such className, please change it to start with upper letter like "Triangle".'
            ),
            g.warn("Konva is awesome, right?")),
          "#" === i.charAt(0))
        ) {
          if (this.id() === i.slice(1)) return !0;
        } else if ("." === i.charAt(0)) {
          if (this.hasName(i.slice(1))) return !0;
        } else if (this.className === i || this.nodeType === i) return !0;
      return !1;
    }
    getLayer() {
      var t = this.getParent();
      return t ? t.getLayer() : null;
    }
    getStage() {
      return this._getCache(Y, this._getStage);
    }
    _getStage() {
      var t = this.getParent();
      return t ? t.getStage() : void 0;
    }
    fire(t, e = {}, i) {
      return (
        (e.target = e.target || this),
        i ? this._fireAndBubble(t, e) : this._fire(t, e),
        this
      );
    }
    getAbsoluteTransform(t) {
      return t
        ? this._getAbsoluteTransform(t)
        : this._getCache(O, this._getAbsoluteTransform);
    }
    _getAbsoluteTransform(t) {
      var e;
      if (t)
        return (
          (e = new a()),
          this._eachAncestorReverse(function (t) {
            var i = t.transformsEnabled();
            "all" === i
              ? e.multiply(t.getTransform())
              : "position" === i &&
                e.translate(t.x() - t.offsetX(), t.y() - t.offsetY());
          }, t),
          e
        );
      (e = this._cache.get(O) || new a()),
        this.parent
          ? this.parent.getAbsoluteTransform().copyInto(e)
          : e.reset();
      var i = this.transformsEnabled();
      if ("all" === i) e.multiply(this.getTransform());
      else if ("position" === i) {
        const t = this.attrs.x || 0,
          i = this.attrs.y || 0,
          r = this.attrs.offsetX || 0,
          a = this.attrs.offsetY || 0;
        e.translate(t - r, i - a);
      }
      return (e.dirty = !1), e;
    }
    getAbsoluteScale(t) {
      for (var e = this; e; ) e._isUnderCache && (t = e), (e = e.getParent());
      const i = this.getAbsoluteTransform(t).decompose();
      return { x: i.scaleX, y: i.scaleY };
    }
    getAbsoluteRotation() {
      return this.getAbsoluteTransform().decompose().rotation;
    }
    getTransform() {
      return this._getCache(X, this._getTransform);
    }
    _getTransform() {
      var t,
        e,
        r = this._cache.get(X) || new a();
      r.reset();
      var n = this.x(),
        s = this.y(),
        o = i.getAngle(this.rotation()),
        h = null !== (t = this.attrs.scaleX) && void 0 !== t ? t : 1,
        l = null !== (e = this.attrs.scaleY) && void 0 !== e ? e : 1,
        d = this.attrs.skewX || 0,
        c = this.attrs.skewY || 0,
        g = this.attrs.offsetX || 0,
        u = this.attrs.offsetY || 0;
      return (
        (0 === n && 0 === s) || r.translate(n, s),
        0 !== o && r.rotate(o),
        (0 === d && 0 === c) || r.skew(d, c),
        (1 === h && 1 === l) || r.scale(h, l),
        (0 === g && 0 === u) || r.translate(-1 * g, -1 * u),
        (r.dirty = !1),
        r
      );
    }
    clone(t) {
      var e,
        i,
        r,
        a,
        n,
        s = g.cloneObject(this.attrs);
      for (e in t) s[e] = t[e];
      var o = new this.constructor(s);
      for (e in this.eventListeners)
        for (r = (i = this.eventListeners[e]).length, a = 0; a < r; a++)
          (n = i[a]).name.indexOf("konva") < 0 &&
            (o.eventListeners[e] || (o.eventListeners[e] = []),
            o.eventListeners[e].push(n));
      return o;
    }
    _toKonvaCanvas(t) {
      t = t || {};
      var e = this.getClientRect(),
        i = this.getStage(),
        r = void 0 !== t.x ? t.x : Math.floor(e.x),
        a = void 0 !== t.y ? t.y : Math.floor(e.y),
        n = t.pixelRatio || 1,
        s = new G({
          width: t.width || Math.ceil(e.width) || (i ? i.width() : 0),
          height: t.height || Math.ceil(e.height) || (i ? i.height() : 0),
          pixelRatio: n,
        }),
        o = s.getContext();
      return (
        !1 === t.imageSmoothingEnabled &&
          (o._context.imageSmoothingEnabled = !1),
        o.save(),
        (r || a) && o.translate(-1 * r, -1 * a),
        this.drawScene(s),
        o.restore(),
        s
      );
    }
    toCanvas(t) {
      return this._toKonvaCanvas(t)._canvas;
    }
    toDataURL(t) {
      var e = (t = t || {}).mimeType || null,
        i = t.quality || null,
        r = this._toKonvaCanvas(t).toDataURL(e, i);
      return t.callback && t.callback(r), r;
    }
    toImage(t) {
      return new Promise((e, i) => {
        try {
          const i = null == t ? void 0 : t.callback;
          i && delete t.callback,
            g._urlToImage(this.toDataURL(t), function (t) {
              e(t), null == i || i(t);
            });
        } catch (t) {
          i(t);
        }
      });
    }
    toBlob(t) {
      return new Promise((e, i) => {
        try {
          const i = null == t ? void 0 : t.callback;
          i && delete t.callback,
            this.toCanvas(t).toBlob((t) => {
              e(t), null == i || i(t);
            });
        } catch (t) {
          i(t);
        }
      });
    }
    setSize(t) {
      return this.width(t.width), this.height(t.height), this;
    }
    getSize() {
      return { width: this.width(), height: this.height() };
    }
    getClassName() {
      return this.className || this.nodeType;
    }
    getType() {
      return this.nodeType;
    }
    getDragDistance() {
      return void 0 !== this.attrs.dragDistance
        ? this.attrs.dragDistance
        : this.parent
        ? this.parent.getDragDistance()
        : i.dragDistance;
    }
    _off(t, e, i) {
      var r,
        a,
        n,
        s = this.eventListeners[t];
      for (r = 0; r < s.length; r++)
        if (
          ((a = s[r].name),
          (n = s[r].handler),
          !(
            ("konva" === a && "konva" !== e) ||
            (e && a !== e) ||
            (i && i !== n)
          ))
        ) {
          if ((s.splice(r, 1), 0 === s.length)) {
            delete this.eventListeners[t];
            break;
          }
          r--;
        }
    }
    _fireChangeEvent(t, e, i) {
      this._fire(t + "Change", { oldVal: e, newVal: i });
    }
    addName(t) {
      if (!this.hasName(t)) {
        var e = this.name(),
          i = e ? e + " " + t : t;
        this.name(i);
      }
      return this;
    }
    hasName(t) {
      if (!t) return !1;
      const e = this.name();
      return !!e && -1 !== (e || "").split(/\s/g).indexOf(t);
    }
    removeName(t) {
      var e = (this.name() || "").split(/\s/g),
        i = e.indexOf(t);
      return -1 !== i && (e.splice(i, 1), this.name(e.join(" "))), this;
    }
    setAttr(t, e) {
      var i = this["set" + g._capitalize(t)];
      return g._isFunction(i) ? i.call(this, e) : this._setAttr(t, e), this;
    }
    _requestDraw() {
      if (i.autoDrawEnabled) {
        const t = this.getLayer() || this.getStage();
        null == t || t.batchDraw();
      }
    }
    _setAttr(t, e) {
      var i = this.attrs[t];
      (i !== e || g.isObject(e)) &&
        (null == e ? delete this.attrs[t] : (this.attrs[t] = e),
        this._shouldFireChangeEvents && this._fireChangeEvent(t, i, e),
        this._requestDraw());
    }
    _setComponentAttr(t, e, i) {
      var r;
      void 0 !== i &&
        ((r = this.attrs[t]) || (this.attrs[t] = this.getAttr(t)),
        (this.attrs[t][e] = i),
        this._fireChangeEvent(t, r, i));
    }
    _fireAndBubble(t, e, i) {
      if (
        (e && this.nodeType === W && (e.target = this),
        !(
          (t === B || t === H) &&
          ((i && (this === i || (this.isAncestorOf && this.isAncestorOf(i)))) ||
            ("Stage" === this.nodeType && !i))
        ))
      ) {
        this._fire(t, e);
        var r =
          (t === B || t === H) &&
          i &&
          i.isAncestorOf &&
          i.isAncestorOf(this) &&
          !i.isAncestorOf(this.parent);
        ((e && !e.cancelBubble) || !e) &&
          this.parent &&
          this.parent.isListening() &&
          !r &&
          (i && i.parent
            ? this._fireAndBubble.call(this.parent, t, e, i)
            : this._fireAndBubble.call(this.parent, t, e));
      }
    }
    _getProtoListeners(t) {
      var e, i, r;
      const a = null !== (e = this._cache.get(L)) && void 0 !== e ? e : {};
      let n = null == a ? void 0 : a[t];
      if (void 0 === n) {
        n = [];
        let e = Object.getPrototypeOf(this);
        for (; e; ) {
          const a =
            null !==
              (r =
                null === (i = e.eventListeners) || void 0 === i
                  ? void 0
                  : i[t]) && void 0 !== r
              ? r
              : [];
          n.push(...a), (e = Object.getPrototypeOf(e));
        }
        (a[t] = n), this._cache.set(L, a);
      }
      return n;
    }
    _fire(t, e) {
      ((e = e || {}).currentTarget = this), (e.type = t);
      const i = this._getProtoListeners(t);
      if (i) for (var r = 0; r < i.length; r++) i[r].handler.call(this, e);
      const a = this.eventListeners[t];
      if (a) for (r = 0; r < a.length; r++) a[r].handler.call(this, e);
    }
    draw() {
      return this.drawScene(), this.drawHit(), this;
    }
    _createDragElement(t) {
      var e = t ? t.pointerId : void 0,
        i = this.getStage(),
        r = this.getAbsolutePosition(),
        a = i._getPointerById(e) || i._changedPointerPositions[0] || r;
      E._dragElements.set(this._id, {
        node: this,
        startPointerPos: a,
        offset: { x: a.x - r.x, y: a.y - r.y },
        dragStatus: "ready",
        pointerId: e,
      });
    }
    startDrag(t, e = !0) {
      E._dragElements.has(this._id) || this._createDragElement(t);
      (E._dragElements.get(this._id).dragStatus = "dragging"),
        this.fire(
          "dragstart",
          { type: "dragstart", target: this, evt: t && t.evt },
          e
        );
    }
    _setDragPosition(t, e) {
      const i = this.getStage()._getPointerById(e.pointerId);
      if (i) {
        var r = { x: i.x - e.offset.x, y: i.y - e.offset.y },
          a = this.dragBoundFunc();
        if (void 0 !== a) {
          const e = a.call(this, r, t);
          e
            ? (r = e)
            : g.warn(
                "dragBoundFunc did not return any value. That is unexpected behavior. You must return new absolute position from dragBoundFunc."
              );
        }
        (this._lastPos && this._lastPos.x === r.x && this._lastPos.y === r.y) ||
          (this.setAbsolutePosition(r), this._requestDraw()),
          (this._lastPos = r);
      }
    }
    stopDrag(t) {
      const e = E._dragElements.get(this._id);
      e && (e.dragStatus = "stopped"), E._endDragBefore(t), E._endDragAfter(t);
    }
    setDraggable(t) {
      this._setAttr("draggable", t), this._dragChange();
    }
    isDragging() {
      const t = E._dragElements.get(this._id);
      return !!t && "dragging" === t.dragStatus;
    }
    _listenDrag() {
      this._dragCleanup(),
        this.on("mousedown.konva touchstart.konva", function (t) {
          if (
            (!(void 0 !== t.evt.button) ||
              i.dragButtons.indexOf(t.evt.button) >= 0) &&
            !this.isDragging()
          ) {
            var e = !1;
            E._dragElements.forEach((t) => {
              this.isAncestorOf(t.node) && (e = !0);
            }),
              e || this._createDragElement(t);
          }
        });
    }
    _dragChange() {
      if (this.attrs.draggable) this._listenDrag();
      else {
        if ((this._dragCleanup(), !this.getStage())) return;
        const t = E._dragElements.get(this._id),
          e = t && "dragging" === t.dragStatus,
          i = t && "ready" === t.dragStatus;
        e ? this.stopDrag() : i && E._dragElements.delete(this._id);
      }
    }
    _dragCleanup() {
      this.off("mousedown.konva"), this.off("touchstart.konva");
    }
    isClientRectOnScreen(t = { x: 0, y: 0 }) {
      const e = this.getStage();
      if (!e) return !1;
      const i = {
        x: -t.x,
        y: -t.y,
        width: e.width() + 2 * t.x,
        height: e.height() + 2 * t.y,
      };
      return g.haveIntersection(i, this.getClientRect());
    }
    static create(t, e) {
      return g._isString(t) && (t = JSON.parse(t)), this._createNode(t, e);
    }
    static _createNode(t, e) {
      var r,
        a,
        n,
        s = K.prototype.getClassName.call(t),
        o = t.children;
      e && (t.attrs.container = e),
        i[s] ||
          (g.warn(
            'Can not find a node with class name "' +
              s +
              '". Fallback to "Shape".'
          ),
          (s = "Shape"));
      if (((r = new (0, i[s])(t.attrs)), o))
        for (a = o.length, n = 0; n < a; n++) r.add(K._createNode(o[n]));
      return r;
    }
  }
  (K.prototype.nodeType = "Node"),
    (K.prototype._attrsAffectingSize = []),
    (K.prototype.eventListeners = {}),
    K.prototype.on.call(K.prototype, q, function () {
      this._batchingTransformChange
        ? (this._needClearTransformCache = !0)
        : (this._clearCache(X), this._clearSelfAndDescendantCache(O));
    }),
    K.prototype.on.call(K.prototype, "visibleChange.konva", function () {
      this._clearSelfAndDescendantCache(j);
    }),
    K.prototype.on.call(K.prototype, "listeningChange.konva", function () {
      this._clearSelfAndDescendantCache(N);
    }),
    K.prototype.on.call(K.prototype, "opacityChange.konva", function () {
      this._clearSelfAndDescendantCache(D);
    });
  const V = w.addGetterSetter;
  V(K, "zIndex"),
    V(K, "absolutePosition"),
    V(K, "position"),
    V(K, "x", 0, p()),
    V(K, "y", 0, p()),
    V(K, "globalCompositeOperation", "source-over", _()),
    V(K, "opacity", 1, p()),
    V(K, "name", "", _()),
    V(K, "id", "", _()),
    V(K, "rotation", 0, p()),
    w.addComponentsGetterSetter(K, "scale", ["x", "y"]),
    V(K, "scaleX", 1, p()),
    V(K, "scaleY", 1, p()),
    w.addComponentsGetterSetter(K, "skew", ["x", "y"]),
    V(K, "skewX", 0, p()),
    V(K, "skewY", 0, p()),
    w.addComponentsGetterSetter(K, "offset", ["x", "y"]),
    V(K, "offsetX", 0, p()),
    V(K, "offsetY", 0, p()),
    V(K, "dragDistance", null, p()),
    V(K, "width", 0, p()),
    V(K, "height", 0, p()),
    V(K, "listening", !0, x()),
    V(K, "preventDefault", !0, x()),
    V(K, "filters", null, function (t) {
      return (this._filterUpToDate = !1), t;
    }),
    V(K, "visible", !0, x()),
    V(K, "transformsEnabled", "all", _()),
    V(K, "size"),
    V(K, "dragBoundFunc"),
    V(K, "draggable", !1, x()),
    w.backCompat(K, {
      rotateDeg: "rotate",
      setRotationDeg: "setRotation",
      getRotationDeg: "getRotation",
    });
  class Q extends K {
    constructor() {
      super(...arguments), (this.children = []);
    }
    getChildren(t) {
      if (!t) return this.children || [];
      const e = this.children || [];
      var i = [];
      return (
        e.forEach(function (e) {
          t(e) && i.push(e);
        }),
        i
      );
    }
    hasChildren() {
      return this.getChildren().length > 0;
    }
    removeChildren() {
      return (
        this.getChildren().forEach((t) => {
          (t.parent = null), (t.index = 0), t.remove();
        }),
        (this.children = []),
        this._requestDraw(),
        this
      );
    }
    destroyChildren() {
      return (
        this.getChildren().forEach((t) => {
          (t.parent = null), (t.index = 0), t.destroy();
        }),
        (this.children = []),
        this._requestDraw(),
        this
      );
    }
    add(...t) {
      if (0 === t.length) return this;
      if (t.length > 1) {
        for (var e = 0; e < t.length; e++) this.add(t[e]);
        return this;
      }
      const i = t[0];
      return i.getParent()
        ? (i.moveTo(this), this)
        : (this._validateAdd(i),
          (i.index = this.getChildren().length),
          (i.parent = this),
          i._clearCaches(),
          this.getChildren().push(i),
          this._fire("add", { child: i }),
          this._requestDraw(),
          this);
    }
    destroy() {
      return (
        this.hasChildren() && this.destroyChildren(), super.destroy(), this
      );
    }
    find(t) {
      return this._generalFind(t, !1);
    }
    findOne(t) {
      var e = this._generalFind(t, !0);
      return e.length > 0 ? e[0] : void 0;
    }
    _generalFind(t, e) {
      var i = [];
      return (
        this._descendants((r) => {
          const a = r._isMatch(t);
          return a && i.push(r), !(!a || !e);
        }),
        i
      );
    }
    _descendants(t) {
      let e = !1;
      const i = this.getChildren();
      for (const r of i) {
        if (((e = t(r)), e)) return !0;
        if (r.hasChildren() && ((e = r._descendants(t)), e)) return !0;
      }
      return !1;
    }
    toObject() {
      var t = K.prototype.toObject.call(this);
      return (
        (t.children = []),
        this.getChildren().forEach((e) => {
          t.children.push(e.toObject());
        }),
        t
      );
    }
    isAncestorOf(t) {
      for (var e = t.getParent(); e; ) {
        if (e._id === this._id) return !0;
        e = e.getParent();
      }
      return !1;
    }
    clone(t) {
      var e = K.prototype.clone.call(this, t);
      return (
        this.getChildren().forEach(function (t) {
          e.add(t.clone());
        }),
        e
      );
    }
    getAllIntersections(t) {
      var e = [];
      return (
        this.find("Shape").forEach(function (i) {
          i.isVisible() && i.intersects(t) && e.push(i);
        }),
        e
      );
    }
    _clearSelfAndDescendantCache(t) {
      var e;
      super._clearSelfAndDescendantCache(t),
        this.isCached() ||
          null === (e = this.children) ||
          void 0 === e ||
          e.forEach(function (e) {
            e._clearSelfAndDescendantCache(t);
          });
    }
    _setChildrenIndices() {
      var t;
      null === (t = this.children) ||
        void 0 === t ||
        t.forEach(function (t, e) {
          t.index = e;
        }),
        this._requestDraw();
    }
    drawScene(t, e) {
      var i = this.getLayer(),
        r = t || (i && i.getCanvas()),
        a = r && r.getContext(),
        n = this._getCanvasCache(),
        s = n && n.scene,
        o = r && r.isCache;
      if (!this.isVisible() && !o) return this;
      if (s) {
        a.save();
        var h = this.getAbsoluteTransform(e).getMatrix();
        a.transform(h[0], h[1], h[2], h[3], h[4], h[5]),
          this._drawCachedSceneCanvas(a),
          a.restore();
      } else this._drawChildren("drawScene", r, e);
      return this;
    }
    drawHit(t, e) {
      if (!this.shouldDrawHit(e)) return this;
      var i = this.getLayer(),
        r = t || (i && i.hitCanvas),
        a = r && r.getContext(),
        n = this._getCanvasCache();
      if (n && n.hit) {
        a.save();
        var s = this.getAbsoluteTransform(e).getMatrix();
        a.transform(s[0], s[1], s[2], s[3], s[4], s[5]),
          this._drawCachedHitCanvas(a),
          a.restore();
      } else this._drawChildren("drawHit", r, e);
      return this;
    }
    _drawChildren(t, e, i) {
      var r,
        a = e && e.getContext(),
        n = this.clipWidth(),
        s = this.clipHeight(),
        o = this.clipFunc(),
        h = (n && s) || o;
      const l = i === this;
      if (h) {
        a.save();
        var d = this.getAbsoluteTransform(i),
          c = d.getMatrix();
        let t;
        if ((a.transform(c[0], c[1], c[2], c[3], c[4], c[5]), a.beginPath(), o))
          t = o.call(this, a, this);
        else {
          var g = this.clipX(),
            u = this.clipY();
          a.rect(g, u, n, s);
        }
        a.clip.apply(a, t),
          (c = d.copy().invert().getMatrix()),
          a.transform(c[0], c[1], c[2], c[3], c[4], c[5]);
      }
      var f =
        !l &&
        "source-over" !== this.globalCompositeOperation() &&
        "drawScene" === t;
      f && (a.save(), a._applyGlobalCompositeOperation(this)),
        null === (r = this.children) ||
          void 0 === r ||
          r.forEach(function (r) {
            r[t](e, i);
          }),
        f && a.restore(),
        h && a.restore();
    }
    getClientRect(t) {
      var e,
        i,
        r,
        a,
        n,
        s = (t = t || {}).skipTransform,
        o = t.relativeTo,
        h = { x: 1 / 0, y: 1 / 0, width: 0, height: 0 },
        l = this;
      null === (e = this.children) ||
        void 0 === e ||
        e.forEach(function (e) {
          if (e.visible()) {
            var s = e.getClientRect({
              relativeTo: l,
              skipShadow: t.skipShadow,
              skipStroke: t.skipStroke,
            });
            (0 === s.width && 0 === s.height) ||
              (void 0 === i
                ? ((i = s.x),
                  (r = s.y),
                  (a = s.x + s.width),
                  (n = s.y + s.height))
                : ((i = Math.min(i, s.x)),
                  (r = Math.min(r, s.y)),
                  (a = Math.max(a, s.x + s.width)),
                  (n = Math.max(n, s.y + s.height))));
          }
        });
      for (var d = this.find("Shape"), c = !1, g = 0; g < d.length; g++) {
        if (d[g]._isVisible(this)) {
          c = !0;
          break;
        }
      }
      return (
        (h =
          c && void 0 !== i
            ? { x: i, y: r, width: a - i, height: n - r }
            : { x: 0, y: 0, width: 0, height: 0 }),
        s ? h : this._transformedRect(h, o)
      );
    }
  }
  w.addComponentsGetterSetter(Q, "clip", ["x", "y", "width", "height"]),
    w.addGetterSetter(Q, "clipX", void 0, p()),
    w.addGetterSetter(Q, "clipY", void 0, p()),
    w.addGetterSetter(Q, "clipWidth", void 0, p()),
    w.addGetterSetter(Q, "clipHeight", void 0, p()),
    w.addGetterSetter(Q, "clipFunc");
  const J = new Map(),
    Z = void 0 !== i._global.PointerEvent;
  function $(t) {
    return J.get(t);
  }
  function tt(t) {
    return { evt: t, pointerId: t.pointerId };
  }
  function et(t, e) {
    return J.get(t) === e;
  }
  function it(t, e) {
    rt(t);
    e.getStage() &&
      (J.set(t, e),
      Z &&
        e._fire(
          "gotpointercapture",
          tt(new PointerEvent("gotpointercapture"))
        ));
  }
  function rt(t, e) {
    const i = J.get(t);
    if (!i) return;
    const r = i.getStage();
    r && r.content,
      J.delete(t),
      Z &&
        i._fire(
          "lostpointercapture",
          tt(new PointerEvent("lostpointercapture"))
        );
  }
  var at = "mouseleave",
    nt = "mouseover",
    st = "mouseenter",
    ot = "mousemove",
    ht = "mousedown",
    lt = "mouseup",
    dt = "pointermove",
    ct = "pointerdown",
    gt = "pointerup",
    ut = "pointercancel",
    ft = "pointerout",
    pt = "pointerleave",
    vt = "pointerover",
    mt = "pointerenter",
    _t = "contextmenu",
    yt = "touchstart",
    xt = "touchend",
    bt = "touchmove",
    St = "touchcancel",
    wt = "wheel",
    Ct = [
      [st, "_pointerenter"],
      [ht, "_pointerdown"],
      [ot, "_pointermove"],
      [lt, "_pointerup"],
      [at, "_pointerleave"],
      [yt, "_pointerdown"],
      [bt, "_pointermove"],
      [xt, "_pointerup"],
      [St, "_pointercancel"],
      [nt, "_pointerover"],
      [wt, "_wheel"],
      [_t, "_contextmenu"],
      [ct, "_pointerdown"],
      [dt, "_pointermove"],
      [gt, "_pointerup"],
      [ut, "_pointercancel"],
      ["lostpointercapture", "_lostpointercapture"],
    ];
  const Pt = {
      mouse: {
        [ft]: "mouseout",
        [pt]: at,
        [vt]: nt,
        [mt]: st,
        [dt]: ot,
        [ct]: ht,
        [gt]: lt,
        [ut]: "mousecancel",
        pointerclick: "click",
        pointerdblclick: "dblclick",
      },
      touch: {
        [ft]: "touchout",
        [pt]: "touchleave",
        [vt]: "touchover",
        [mt]: "touchenter",
        [dt]: bt,
        [ct]: yt,
        [gt]: xt,
        [ut]: St,
        pointerclick: "tap",
        pointerdblclick: "dbltap",
      },
      pointer: {
        [ft]: ft,
        [pt]: pt,
        [vt]: vt,
        [mt]: mt,
        [dt]: dt,
        [ct]: ct,
        [gt]: gt,
        [ut]: ut,
        pointerclick: "pointerclick",
        pointerdblclick: "pointerdblclick",
      },
    },
    kt = (t) =>
      t.indexOf("pointer") >= 0
        ? "pointer"
        : t.indexOf("touch") >= 0
        ? "touch"
        : "mouse",
    Tt = (t) => {
      const e = kt(t);
      return "pointer" === e
        ? i.pointerEventsEnabled && Pt.pointer
        : "touch" === e
        ? Pt.touch
        : "mouse" === e
        ? Pt.mouse
        : void 0;
    };
  function At(t = {}) {
    return (
      (t.clipFunc || t.clipWidth || t.clipHeight) &&
        g.warn(
          "Stage does not support clipping. Please use clip for Layers or Groups."
        ),
      t
    );
  }
  const Mt = [];
  class Gt extends Q {
    constructor(t) {
      super(At(t)),
        (this._pointerPositions = []),
        (this._changedPointerPositions = []),
        this._buildDOM(),
        this._bindContentEvents(),
        Mt.push(this),
        this.on("widthChange.konva heightChange.konva", this._resizeDOM),
        this.on("visibleChange.konva", this._checkVisibility),
        this.on(
          "clipWidthChange.konva clipHeightChange.konva clipFuncChange.konva",
          () => {
            At(this.attrs);
          }
        ),
        this._checkVisibility();
    }
    _validateAdd(t) {
      const e = "Layer" === t.getType(),
        i = "FastLayer" === t.getType();
      e || i || g.throw("You may only add layers to the stage.");
    }
    _checkVisibility() {
      if (!this.content) return;
      const t = this.visible() ? "" : "none";
      this.content.style.display = t;
    }
    setContainer(t) {
      if ("string" == typeof t) {
        if ("." === t.charAt(0)) {
          var e = t.slice(1);
          t = document.getElementsByClassName(e)[0];
        } else {
          var i;
          (i = "#" !== t.charAt(0) ? t : t.slice(1)),
            (t = document.getElementById(i));
        }
        if (!t) throw "Can not find container in document with id " + i;
      }
      return (
        this._setAttr("container", t),
        this.content &&
          (this.content.parentElement &&
            this.content.parentElement.removeChild(this.content),
          t.appendChild(this.content)),
        this
      );
    }
    shouldDrawHit() {
      return !0;
    }
    clear() {
      var t,
        e = this.children,
        i = e.length;
      for (t = 0; t < i; t++) e[t].clear();
      return this;
    }
    clone(t) {
      return (
        t || (t = {}),
        (t.container =
          "undefined" != typeof document && document.createElement("div")),
        Q.prototype.clone.call(this, t)
      );
    }
    destroy() {
      super.destroy();
      var t = this.content;
      t && g._isInDocument(t) && this.container().removeChild(t);
      var e = Mt.indexOf(this);
      return (
        e > -1 && Mt.splice(e, 1),
        g.releaseCanvas(
          this.bufferCanvas._canvas,
          this.bufferHitCanvas._canvas
        ),
        this
      );
    }
    getPointerPosition() {
      const t = this._pointerPositions[0] || this._changedPointerPositions[0];
      return t
        ? { x: t.x, y: t.y }
        : (g.warn(
            "Pointer position is missing and not registered by the stage. Looks like it is outside of the stage container. You can set it manually from event: stage.setPointersPositions(event);"
          ),
          null);
    }
    _getPointerById(t) {
      return this._pointerPositions.find((e) => e.id === t);
    }
    getPointersPositions() {
      return this._pointerPositions;
    }
    getStage() {
      return this;
    }
    getContent() {
      return this.content;
    }
    _toKonvaCanvas(t) {
      ((t = t || {}).x = t.x || 0),
        (t.y = t.y || 0),
        (t.width = t.width || this.width()),
        (t.height = t.height || this.height());
      var e = new G({
          width: t.width,
          height: t.height,
          pixelRatio: t.pixelRatio || 1,
        }),
        i = e.getContext()._context,
        r = this.children;
      return (
        (t.x || t.y) && i.translate(-1 * t.x, -1 * t.y),
        r.forEach(function (e) {
          if (e.isVisible()) {
            var r = e._toKonvaCanvas(t);
            i.drawImage(
              r._canvas,
              t.x,
              t.y,
              r.getWidth() / r.getPixelRatio(),
              r.getHeight() / r.getPixelRatio()
            );
          }
        }),
        e
      );
    }
    getIntersection(t) {
      if (!t) return null;
      var e,
        i = this.children;
      for (e = i.length - 1; e >= 0; e--) {
        const r = i[e].getIntersection(t);
        if (r) return r;
      }
      return null;
    }
    _resizeDOM() {
      var t = this.width(),
        e = this.height();
      this.content &&
        ((this.content.style.width = t + "px"),
        (this.content.style.height = e + "px")),
        this.bufferCanvas.setSize(t, e),
        this.bufferHitCanvas.setSize(t, e),
        this.children.forEach((i) => {
          i.setSize({ width: t, height: e }), i.draw();
        });
    }
    add(t, ...e) {
      if (arguments.length > 1) {
        for (var r = 0; r < arguments.length; r++) this.add(arguments[r]);
        return this;
      }
      super.add(t);
      var a = this.children.length;
      return (
        a > 5 &&
          g.warn(
            "The stage has " +
              a +
              " layers. Recommended maximum number of layers is 3-5. Adding more layers into the stage may drop the performance. Rethink your tree structure, you can use Konva.Group."
          ),
        t.setSize({ width: this.width(), height: this.height() }),
        t.draw(),
        i.isBrowser && this.content.appendChild(t.canvas._canvas),
        this
      );
    }
    getParent() {
      return null;
    }
    getLayer() {
      return null;
    }
    hasPointerCapture(t) {
      return et(t, this);
    }
    setPointerCapture(t) {
      it(t, this);
    }
    releaseCapture(t) {
      rt(t);
    }
    getLayers() {
      return this.children;
    }
    _bindContentEvents() {
      i.isBrowser &&
        Ct.forEach(([t, e]) => {
          this.content.addEventListener(
            t,
            (t) => {
              this[e](t);
            },
            { passive: !1 }
          );
        });
    }
    _pointerenter(t) {
      this.setPointersPositions(t);
      const e = Tt(t.type);
      this._fire(e.pointerenter, { evt: t, target: this, currentTarget: this });
    }
    _pointerover(t) {
      this.setPointersPositions(t);
      const e = Tt(t.type);
      this._fire(e.pointerover, { evt: t, target: this, currentTarget: this });
    }
    _getTargetShape(t) {
      let e = this[t + "targetShape"];
      return e && !e.getStage() && (e = null), e;
    }
    _pointerleave(t) {
      const e = Tt(t.type),
        r = kt(t.type);
      if (e) {
        this.setPointersPositions(t);
        var a = this._getTargetShape(r),
          n = !E.isDragging || i.hitOnDragEnabled;
        a && n
          ? (a._fireAndBubble(e.pointerout, { evt: t }),
            a._fireAndBubble(e.pointerleave, { evt: t }),
            this._fire(e.pointerleave, {
              evt: t,
              target: this,
              currentTarget: this,
            }),
            (this[r + "targetShape"] = null))
          : n &&
            (this._fire(e.pointerleave, {
              evt: t,
              target: this,
              currentTarget: this,
            }),
            this._fire(e.pointerout, {
              evt: t,
              target: this,
              currentTarget: this,
            })),
          (this.pointerPos = void 0),
          (this._pointerPositions = []);
      }
    }
    _pointerdown(t) {
      const e = Tt(t.type),
        r = kt(t.type);
      if (e) {
        this.setPointersPositions(t);
        var a = !1;
        this._changedPointerPositions.forEach((n) => {
          var s = this.getIntersection(n);
          (E.justDragged = !1), (i["_" + r + "ListenClick"] = !0);
          if (!(s && s.isListening())) return;
          i.capturePointerEventsEnabled && s.setPointerCapture(n.id),
            (this[r + "ClickStartShape"] = s),
            s._fireAndBubble(e.pointerdown, { evt: t, pointerId: n.id }),
            (a = !0);
          const o = t.type.indexOf("touch") >= 0;
          s.preventDefault() && t.cancelable && o && t.preventDefault();
        }),
          a ||
            this._fire(e.pointerdown, {
              evt: t,
              target: this,
              currentTarget: this,
              pointerId: this._pointerPositions[0].id,
            });
      }
    }
    _pointermove(t) {
      const e = Tt(t.type),
        r = kt(t.type);
      if (!e) return;
      if (
        (E.isDragging &&
          E.node.preventDefault() &&
          t.cancelable &&
          t.preventDefault(),
        this.setPointersPositions(t),
        !(!E.isDragging || i.hitOnDragEnabled))
      )
        return;
      var a = {};
      let n = !1;
      var s = this._getTargetShape(r);
      this._changedPointerPositions.forEach((i) => {
        const o = $(i.id) || this.getIntersection(i),
          h = i.id,
          l = { evt: t, pointerId: h };
        var d = s !== o;
        if (
          (d &&
            s &&
            (s._fireAndBubble(e.pointerout, Object.assign({}, l), o),
            s._fireAndBubble(e.pointerleave, Object.assign({}, l), o)),
          o)
        ) {
          if (a[o._id]) return;
          a[o._id] = !0;
        }
        o && o.isListening()
          ? ((n = !0),
            d &&
              (o._fireAndBubble(e.pointerover, Object.assign({}, l), s),
              o._fireAndBubble(e.pointerenter, Object.assign({}, l), s),
              (this[r + "targetShape"] = o)),
            o._fireAndBubble(e.pointermove, Object.assign({}, l)))
          : s &&
            (this._fire(e.pointerover, {
              evt: t,
              target: this,
              currentTarget: this,
              pointerId: h,
            }),
            (this[r + "targetShape"] = null));
      }),
        n ||
          this._fire(e.pointermove, {
            evt: t,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id,
          });
    }
    _pointerup(t) {
      const e = Tt(t.type),
        r = kt(t.type);
      if (!e) return;
      this.setPointersPositions(t);
      const a = this[r + "ClickStartShape"],
        n = this[r + "ClickEndShape"];
      var s = {};
      let o = !1;
      this._changedPointerPositions.forEach((h) => {
        const l = $(h.id) || this.getIntersection(h);
        if (l) {
          if ((l.releaseCapture(h.id), s[l._id])) return;
          s[l._id] = !0;
        }
        const d = h.id,
          c = { evt: t, pointerId: d };
        let g = !1;
        i["_" + r + "InDblClickWindow"]
          ? ((g = !0), clearTimeout(this[r + "DblTimeout"]))
          : E.justDragged ||
            ((i["_" + r + "InDblClickWindow"] = !0),
            clearTimeout(this[r + "DblTimeout"])),
          (this[r + "DblTimeout"] = setTimeout(function () {
            i["_" + r + "InDblClickWindow"] = !1;
          }, i.dblClickWindow)),
          l && l.isListening()
            ? ((o = !0),
              (this[r + "ClickEndShape"] = l),
              l._fireAndBubble(e.pointerup, Object.assign({}, c)),
              i["_" + r + "ListenClick"] &&
                a &&
                a === l &&
                (l._fireAndBubble(e.pointerclick, Object.assign({}, c)),
                g &&
                  n &&
                  n === l &&
                  l._fireAndBubble(e.pointerdblclick, Object.assign({}, c))))
            : ((this[r + "ClickEndShape"] = null),
              i["_" + r + "ListenClick"] &&
                this._fire(e.pointerclick, {
                  evt: t,
                  target: this,
                  currentTarget: this,
                  pointerId: d,
                }),
              g &&
                this._fire(e.pointerdblclick, {
                  evt: t,
                  target: this,
                  currentTarget: this,
                  pointerId: d,
                }));
      }),
        o ||
          this._fire(e.pointerup, {
            evt: t,
            target: this,
            currentTarget: this,
            pointerId: this._changedPointerPositions[0].id,
          }),
        (i["_" + r + "ListenClick"] = !1),
        t.cancelable && "touch" !== r && t.preventDefault();
    }
    _contextmenu(t) {
      this.setPointersPositions(t);
      var e = this.getIntersection(this.getPointerPosition());
      e && e.isListening()
        ? e._fireAndBubble(_t, { evt: t })
        : this._fire(_t, { evt: t, target: this, currentTarget: this });
    }
    _wheel(t) {
      this.setPointersPositions(t);
      var e = this.getIntersection(this.getPointerPosition());
      e && e.isListening()
        ? e._fireAndBubble(wt, { evt: t })
        : this._fire(wt, { evt: t, target: this, currentTarget: this });
    }
    _pointercancel(t) {
      this.setPointersPositions(t);
      const e =
        $(t.pointerId) || this.getIntersection(this.getPointerPosition());
      e && e._fireAndBubble(gt, tt(t)), rt(t.pointerId);
    }
    _lostpointercapture(t) {
      rt(t.pointerId);
    }
    setPointersPositions(t) {
      var e = this._getContentPosition(),
        i = null,
        r = null;
      void 0 !== (t = t || window.event).touches
        ? ((this._pointerPositions = []),
          (this._changedPointerPositions = []),
          Array.prototype.forEach.call(t.touches, (t) => {
            this._pointerPositions.push({
              id: t.identifier,
              x: (t.clientX - e.left) / e.scaleX,
              y: (t.clientY - e.top) / e.scaleY,
            });
          }),
          Array.prototype.forEach.call(t.changedTouches || t.touches, (t) => {
            this._changedPointerPositions.push({
              id: t.identifier,
              x: (t.clientX - e.left) / e.scaleX,
              y: (t.clientY - e.top) / e.scaleY,
            });
          }))
        : ((i = (t.clientX - e.left) / e.scaleX),
          (r = (t.clientY - e.top) / e.scaleY),
          (this.pointerPos = { x: i, y: r }),
          (this._pointerPositions = [
            { x: i, y: r, id: g._getFirstPointerId(t) },
          ]),
          (this._changedPointerPositions = [
            { x: i, y: r, id: g._getFirstPointerId(t) },
          ]));
    }
    _setPointerPosition(t) {
      g.warn(
        'Method _setPointerPosition is deprecated. Use "stage.setPointersPositions(event)" instead.'
      ),
        this.setPointersPositions(t);
    }
    _getContentPosition() {
      if (!this.content || !this.content.getBoundingClientRect)
        return { top: 0, left: 0, scaleX: 1, scaleY: 1 };
      var t = this.content.getBoundingClientRect();
      return {
        top: t.top,
        left: t.left,
        scaleX: t.width / this.content.clientWidth || 1,
        scaleY: t.height / this.content.clientHeight || 1,
      };
    }
    _buildDOM() {
      if (
        ((this.bufferCanvas = new G({
          width: this.width(),
          height: this.height(),
        })),
        (this.bufferHitCanvas = new R({
          pixelRatio: 1,
          width: this.width(),
          height: this.height(),
        })),
        i.isBrowser)
      ) {
        var t = this.container();
        if (!t) throw "Stage has no container. A container is required.";
        (t.innerHTML = ""),
          (this.content = document.createElement("div")),
          (this.content.style.position = "relative"),
          (this.content.style.userSelect = "none"),
          (this.content.className = "konvajs-content"),
          this.content.setAttribute("role", "presentation"),
          t.appendChild(this.content),
          this._resizeDOM();
      }
    }
    cache() {
      return (
        g.warn(
          "Cache function is not allowed for stage. You may use cache only for layers, groups and shapes."
        ),
        this
      );
    }
    clearCache() {
      return this;
    }
    batchDraw() {
      return (
        this.getChildren().forEach(function (t) {
          t.batchDraw();
        }),
        this
      );
    }
  }
  (Gt.prototype.nodeType = "Stage"), r(Gt), w.addGetterSetter(Gt, "container");
  var Rt = "hasShadow",
    Et = "shadowRGBA",
    Dt = "patternImage",
    Lt = "linearGradient",
    Ot = "radialGradient";
  let It;
  function Ft() {
    return It || ((It = g.createCanvasElement().getContext("2d")), It);
  }
  const Nt = {};
  class Bt extends K {
    constructor(t) {
      let e;
      for (super(t); (e = g.getRandomColor()), !e || e in Nt; );
      (this.colorKey = e), (Nt[e] = this);
    }
    getContext() {
      return (
        g.warn(
          "shape.getContext() method is deprecated. Please do not use it."
        ),
        this.getLayer().getContext()
      );
    }
    getCanvas() {
      return (
        g.warn("shape.getCanvas() method is deprecated. Please do not use it."),
        this.getLayer().getCanvas()
      );
    }
    getSceneFunc() {
      return this.attrs.sceneFunc || this._sceneFunc;
    }
    getHitFunc() {
      return this.attrs.hitFunc || this._hitFunc;
    }
    hasShadow() {
      return this._getCache(Rt, this._hasShadow);
    }
    _hasShadow() {
      return (
        this.shadowEnabled() &&
        0 !== this.shadowOpacity() &&
        !!(
          this.shadowColor() ||
          this.shadowBlur() ||
          this.shadowOffsetX() ||
          this.shadowOffsetY()
        )
      );
    }
    _getFillPattern() {
      return this._getCache(Dt, this.__getFillPattern);
    }
    __getFillPattern() {
      if (this.fillPatternImage()) {
        const t = Ft().createPattern(
          this.fillPatternImage(),
          this.fillPatternRepeat() || "repeat"
        );
        if (t && t.setTransform) {
          const e = new a();
          e.translate(this.fillPatternX(), this.fillPatternY()),
            e.rotate(i.getAngle(this.fillPatternRotation())),
            e.scale(this.fillPatternScaleX(), this.fillPatternScaleY()),
            e.translate(
              -1 * this.fillPatternOffsetX(),
              -1 * this.fillPatternOffsetY()
            );
          const r = e.getMatrix(),
            n =
              "undefined" == typeof DOMMatrix
                ? { a: r[0], b: r[1], c: r[2], d: r[3], e: r[4], f: r[5] }
                : new DOMMatrix(r);
          t.setTransform(n);
        }
        return t;
      }
    }
    _getLinearGradient() {
      return this._getCache(Lt, this.__getLinearGradient);
    }
    __getLinearGradient() {
      var t = this.fillLinearGradientColorStops();
      if (t) {
        for (
          var e = Ft(),
            i = this.fillLinearGradientStartPoint(),
            r = this.fillLinearGradientEndPoint(),
            a = e.createLinearGradient(i.x, i.y, r.x, r.y),
            n = 0;
          n < t.length;
          n += 2
        )
          a.addColorStop(t[n], t[n + 1]);
        return a;
      }
    }
    _getRadialGradient() {
      return this._getCache(Ot, this.__getRadialGradient);
    }
    __getRadialGradient() {
      var t = this.fillRadialGradientColorStops();
      if (t) {
        for (
          var e = Ft(),
            i = this.fillRadialGradientStartPoint(),
            r = this.fillRadialGradientEndPoint(),
            a = e.createRadialGradient(
              i.x,
              i.y,
              this.fillRadialGradientStartRadius(),
              r.x,
              r.y,
              this.fillRadialGradientEndRadius()
            ),
            n = 0;
          n < t.length;
          n += 2
        )
          a.addColorStop(t[n], t[n + 1]);
        return a;
      }
    }
    getShadowRGBA() {
      return this._getCache(Et, this._getShadowRGBA);
    }
    _getShadowRGBA() {
      if (this.hasShadow()) {
        var t = g.colorToRGBA(this.shadowColor());
        return t
          ? "rgba(" +
              t.r +
              "," +
              t.g +
              "," +
              t.b +
              "," +
              t.a * (this.shadowOpacity() || 1) +
              ")"
          : void 0;
      }
    }
    hasFill() {
      return this._calculate(
        "hasFill",
        [
          "fillEnabled",
          "fill",
          "fillPatternImage",
          "fillLinearGradientColorStops",
          "fillRadialGradientColorStops",
        ],
        () =>
          this.fillEnabled() &&
          !!(
            this.fill() ||
            this.fillPatternImage() ||
            this.fillLinearGradientColorStops() ||
            this.fillRadialGradientColorStops()
          )
      );
    }
    hasStroke() {
      return this._calculate(
        "hasStroke",
        [
          "strokeEnabled",
          "strokeWidth",
          "stroke",
          "strokeLinearGradientColorStops",
        ],
        () =>
          this.strokeEnabled() &&
          this.strokeWidth() &&
          !(!this.stroke() && !this.strokeLinearGradientColorStops())
      );
    }
    hasHitStroke() {
      const t = this.hitStrokeWidth();
      return "auto" === t ? this.hasStroke() : this.strokeEnabled() && !!t;
    }
    intersects(t) {
      var e = this.getStage().bufferHitCanvas;
      return (
        e.getContext().clear(),
        this.drawHit(e, null, !0),
        e.context.getImageData(Math.round(t.x), Math.round(t.y), 1, 1).data[3] >
          0
      );
    }
    destroy() {
      return (
        K.prototype.destroy.call(this),
        delete Nt[this.colorKey],
        delete this.colorKey,
        this
      );
    }
    _useBufferCanvas(t) {
      var e;
      if (!this.getStage()) return !1;
      if (!(null === (e = this.attrs.perfectDrawEnabled) || void 0 === e || e))
        return !1;
      const i = t || this.hasFill(),
        r = this.hasStroke(),
        a = 1 !== this.getAbsoluteOpacity();
      if (i && r && a) return !0;
      const n = this.hasShadow(),
        s = this.shadowForStrokeEnabled();
      return !!(i && r && n && s);
    }
    setStrokeHitEnabled(t) {
      g.warn(
        "strokeHitEnabled property is deprecated. Please use hitStrokeWidth instead."
      ),
        t ? this.hitStrokeWidth("auto") : this.hitStrokeWidth(0);
    }
    getStrokeHitEnabled() {
      return 0 !== this.hitStrokeWidth();
    }
    getSelfRect() {
      var t = this.size();
      return {
        x: this._centroid ? -t.width / 2 : 0,
        y: this._centroid ? -t.height / 2 : 0,
        width: t.width,
        height: t.height,
      };
    }
    getClientRect(t = {}) {
      const e = t.skipTransform,
        i = t.relativeTo,
        r = this.getSelfRect(),
        a = (!t.skipStroke && this.hasStroke() && this.strokeWidth()) || 0,
        n = r.width + a,
        s = r.height + a,
        o = !t.skipShadow && this.hasShadow(),
        h = o ? this.shadowOffsetX() : 0,
        l = o ? this.shadowOffsetY() : 0,
        d = n + Math.abs(h),
        c = s + Math.abs(l),
        g = (o && this.shadowBlur()) || 0,
        u = {
          width: d + 2 * g,
          height: c + 2 * g,
          x: -(a / 2 + g) + Math.min(h, 0) + r.x,
          y: -(a / 2 + g) + Math.min(l, 0) + r.y,
        };
      return e ? u : this._transformedRect(u, i);
    }
    drawScene(t, e) {
      var i,
        r,
        a = this.getLayer(),
        n = t || a.getCanvas(),
        s = n.getContext(),
        o = this._getCanvasCache(),
        h = this.getSceneFunc(),
        l = this.hasShadow(),
        d = n.isCache,
        c = e === this;
      if (!this.isVisible() && !c) return this;
      if (o) {
        s.save();
        var g = this.getAbsoluteTransform(e).getMatrix();
        return (
          s.transform(g[0], g[1], g[2], g[3], g[4], g[5]),
          this._drawCachedSceneCanvas(s),
          s.restore(),
          this
        );
      }
      if (!h) return this;
      if ((s.save(), this._useBufferCanvas() && !d)) {
        (r = (i = this.getStage().bufferCanvas).getContext()).clear(),
          r.save(),
          r._applyLineJoin(this);
        var u = this.getAbsoluteTransform(e).getMatrix();
        r.transform(u[0], u[1], u[2], u[3], u[4], u[5]),
          h.call(this, r, this),
          r.restore();
        var f = i.pixelRatio;
        l && s._applyShadow(this),
          s._applyOpacity(this),
          s._applyGlobalCompositeOperation(this),
          s.drawImage(i._canvas, 0, 0, i.width / f, i.height / f);
      } else {
        if ((s._applyLineJoin(this), !c)) {
          u = this.getAbsoluteTransform(e).getMatrix();
          s.transform(u[0], u[1], u[2], u[3], u[4], u[5]),
            s._applyOpacity(this),
            s._applyGlobalCompositeOperation(this);
        }
        l && s._applyShadow(this), h.call(this, s, this);
      }
      return s.restore(), this;
    }
    drawHit(t, e, i = !1) {
      if (!this.shouldDrawHit(e, i)) return this;
      var r = this.getLayer(),
        a = t || r.hitCanvas,
        n = a && a.getContext(),
        s = this.hitFunc() || this.sceneFunc(),
        o = this._getCanvasCache(),
        h = o && o.hit;
      if (
        (this.colorKey ||
          g.warn(
            "Looks like your canvas has a destroyed shape in it. Do not reuse shape after you destroyed it. If you want to reuse shape you should call remove() instead of destroy()"
          ),
        h)
      ) {
        n.save();
        var l = this.getAbsoluteTransform(e).getMatrix();
        return (
          n.transform(l[0], l[1], l[2], l[3], l[4], l[5]),
          this._drawCachedHitCanvas(n),
          n.restore(),
          this
        );
      }
      if (!s) return this;
      n.save(), n._applyLineJoin(this);
      if (!(this === e)) {
        var d = this.getAbsoluteTransform(e).getMatrix();
        n.transform(d[0], d[1], d[2], d[3], d[4], d[5]);
      }
      return s.call(this, n, this), n.restore(), this;
    }
    drawHitFromCache(t = 0) {
      var e,
        i,
        r,
        a,
        n,
        s = this._getCanvasCache(),
        o = this._getCachedSceneCanvas(),
        h = s.hit,
        l = h.getContext(),
        d = h.getWidth(),
        c = h.getHeight();
      l.clear(), l.drawImage(o._canvas, 0, 0, d, c);
      try {
        for (
          r = (i = (e = l.getImageData(0, 0, d, c)).data).length,
            a = g._hexToRgb(this.colorKey),
            n = 0;
          n < r;
          n += 4
        )
          i[n + 3] > t
            ? ((i[n] = a.r),
              (i[n + 1] = a.g),
              (i[n + 2] = a.b),
              (i[n + 3] = 255))
            : (i[n + 3] = 0);
        l.putImageData(e, 0, 0);
      } catch (t) {
        g.error(
          "Unable to draw hit graph from cached scene canvas. " + t.message
        );
      }
      return this;
    }
    hasPointerCapture(t) {
      return et(t, this);
    }
    setPointerCapture(t) {
      it(t, this);
    }
    releaseCapture(t) {
      rt(t);
    }
  }
  (Bt.prototype._fillFunc = function (t) {
    const e = this.attrs.fillRule;
    e ? t.fill(e) : t.fill();
  }),
    (Bt.prototype._strokeFunc = function (t) {
      t.stroke();
    }),
    (Bt.prototype._fillFuncHit = function (t) {
      t.fill();
    }),
    (Bt.prototype._strokeFuncHit = function (t) {
      t.stroke();
    }),
    (Bt.prototype._centroid = !1),
    (Bt.prototype.nodeType = "Shape"),
    r(Bt),
    (Bt.prototype.eventListeners = {}),
    Bt.prototype.on.call(
      Bt.prototype,
      "shadowColorChange.konva shadowBlurChange.konva shadowOffsetChange.konva shadowOpacityChange.konva shadowEnabledChange.konva",
      function () {
        this._clearCache(Rt);
      }
    ),
    Bt.prototype.on.call(
      Bt.prototype,
      "shadowColorChange.konva shadowOpacityChange.konva shadowEnabledChange.konva",
      function () {
        this._clearCache(Et);
      }
    ),
    Bt.prototype.on.call(
      Bt.prototype,
      "fillPriorityChange.konva fillPatternImageChange.konva fillPatternRepeatChange.konva fillPatternScaleXChange.konva fillPatternScaleYChange.konva fillPatternOffsetXChange.konva fillPatternOffsetYChange.konva fillPatternXChange.konva fillPatternYChange.konva fillPatternRotationChange.konva",
      function () {
        this._clearCache(Dt);
      }
    ),
    Bt.prototype.on.call(
      Bt.prototype,
      "fillPriorityChange.konva fillLinearGradientColorStopsChange.konva fillLinearGradientStartPointXChange.konva fillLinearGradientStartPointYChange.konva fillLinearGradientEndPointXChange.konva fillLinearGradientEndPointYChange.konva",
      function () {
        this._clearCache(Lt);
      }
    ),
    Bt.prototype.on.call(
      Bt.prototype,
      "fillPriorityChange.konva fillRadialGradientColorStopsChange.konva fillRadialGradientStartPointXChange.konva fillRadialGradientStartPointYChange.konva fillRadialGradientEndPointXChange.konva fillRadialGradientEndPointYChange.konva fillRadialGradientStartRadiusChange.konva fillRadialGradientEndRadiusChange.konva",
      function () {
        this._clearCache(Ot);
      }
    ),
    w.addGetterSetter(Bt, "stroke", void 0, y()),
    w.addGetterSetter(Bt, "strokeWidth", 2, p()),
    w.addGetterSetter(Bt, "fillAfterStrokeEnabled", !1),
    w.addGetterSetter(Bt, "hitStrokeWidth", "auto", m()),
    w.addGetterSetter(Bt, "strokeHitEnabled", !0, x()),
    w.addGetterSetter(Bt, "perfectDrawEnabled", !0, x()),
    w.addGetterSetter(Bt, "shadowForStrokeEnabled", !0, x()),
    w.addGetterSetter(Bt, "lineJoin"),
    w.addGetterSetter(Bt, "lineCap"),
    w.addGetterSetter(Bt, "sceneFunc"),
    w.addGetterSetter(Bt, "hitFunc"),
    w.addGetterSetter(Bt, "dash"),
    w.addGetterSetter(Bt, "dashOffset", 0, p()),
    w.addGetterSetter(Bt, "shadowColor", void 0, _()),
    w.addGetterSetter(Bt, "shadowBlur", 0, p()),
    w.addGetterSetter(Bt, "shadowOpacity", 1, p()),
    w.addComponentsGetterSetter(Bt, "shadowOffset", ["x", "y"]),
    w.addGetterSetter(Bt, "shadowOffsetX", 0, p()),
    w.addGetterSetter(Bt, "shadowOffsetY", 0, p()),
    w.addGetterSetter(Bt, "fillPatternImage"),
    w.addGetterSetter(Bt, "fill", void 0, y()),
    w.addGetterSetter(Bt, "fillPatternX", 0, p()),
    w.addGetterSetter(Bt, "fillPatternY", 0, p()),
    w.addGetterSetter(Bt, "fillLinearGradientColorStops"),
    w.addGetterSetter(Bt, "strokeLinearGradientColorStops"),
    w.addGetterSetter(Bt, "fillRadialGradientStartRadius", 0),
    w.addGetterSetter(Bt, "fillRadialGradientEndRadius", 0),
    w.addGetterSetter(Bt, "fillRadialGradientColorStops"),
    w.addGetterSetter(Bt, "fillPatternRepeat", "repeat"),
    w.addGetterSetter(Bt, "fillEnabled", !0),
    w.addGetterSetter(Bt, "strokeEnabled", !0),
    w.addGetterSetter(Bt, "shadowEnabled", !0),
    w.addGetterSetter(Bt, "dashEnabled", !0),
    w.addGetterSetter(Bt, "strokeScaleEnabled", !0),
    w.addGetterSetter(Bt, "fillPriority", "color"),
    w.addComponentsGetterSetter(Bt, "fillPatternOffset", ["x", "y"]),
    w.addGetterSetter(Bt, "fillPatternOffsetX", 0, p()),
    w.addGetterSetter(Bt, "fillPatternOffsetY", 0, p()),
    w.addComponentsGetterSetter(Bt, "fillPatternScale", ["x", "y"]),
    w.addGetterSetter(Bt, "fillPatternScaleX", 1, p()),
    w.addGetterSetter(Bt, "fillPatternScaleY", 1, p()),
    w.addComponentsGetterSetter(Bt, "fillLinearGradientStartPoint", ["x", "y"]),
    w.addComponentsGetterSetter(Bt, "strokeLinearGradientStartPoint", [
      "x",
      "y",
    ]),
    w.addGetterSetter(Bt, "fillLinearGradientStartPointX", 0),
    w.addGetterSetter(Bt, "strokeLinearGradientStartPointX", 0),
    w.addGetterSetter(Bt, "fillLinearGradientStartPointY", 0),
    w.addGetterSetter(Bt, "strokeLinearGradientStartPointY", 0),
    w.addComponentsGetterSetter(Bt, "fillLinearGradientEndPoint", ["x", "y"]),
    w.addComponentsGetterSetter(Bt, "strokeLinearGradientEndPoint", ["x", "y"]),
    w.addGetterSetter(Bt, "fillLinearGradientEndPointX", 0),
    w.addGetterSetter(Bt, "strokeLinearGradientEndPointX", 0),
    w.addGetterSetter(Bt, "fillLinearGradientEndPointY", 0),
    w.addGetterSetter(Bt, "strokeLinearGradientEndPointY", 0),
    w.addComponentsGetterSetter(Bt, "fillRadialGradientStartPoint", ["x", "y"]),
    w.addGetterSetter(Bt, "fillRadialGradientStartPointX", 0),
    w.addGetterSetter(Bt, "fillRadialGradientStartPointY", 0),
    w.addComponentsGetterSetter(Bt, "fillRadialGradientEndPoint", ["x", "y"]),
    w.addGetterSetter(Bt, "fillRadialGradientEndPointX", 0),
    w.addGetterSetter(Bt, "fillRadialGradientEndPointY", 0),
    w.addGetterSetter(Bt, "fillPatternRotation", 0),
    w.addGetterSetter(Bt, "fillRule", void 0, _()),
    w.backCompat(Bt, {
      dashArray: "dash",
      getDashArray: "getDash",
      setDashArray: "getDash",
      drawFunc: "sceneFunc",
      getDrawFunc: "getSceneFunc",
      setDrawFunc: "setSceneFunc",
      drawHitFunc: "hitFunc",
      getDrawHitFunc: "getHitFunc",
      setDrawHitFunc: "setHitFunc",
    });
  var Ht = [
      { x: 0, y: 0 },
      { x: -1, y: -1 },
      { x: 1, y: -1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
    ],
    Wt = Ht.length;
  class zt extends Q {
    constructor(t) {
      super(t),
        (this.canvas = new G()),
        (this.hitCanvas = new R({ pixelRatio: 1 })),
        (this._waitingForDraw = !1),
        this.on("visibleChange.konva", this._checkVisibility),
        this._checkVisibility(),
        this.on("imageSmoothingEnabledChange.konva", this._setSmoothEnabled),
        this._setSmoothEnabled();
    }
    createPNGStream() {
      return this.canvas._canvas.createPNGStream();
    }
    getCanvas() {
      return this.canvas;
    }
    getNativeCanvasElement() {
      return this.canvas._canvas;
    }
    getHitCanvas() {
      return this.hitCanvas;
    }
    getContext() {
      return this.getCanvas().getContext();
    }
    clear(t) {
      return (
        this.getContext().clear(t),
        this.getHitCanvas().getContext().clear(t),
        this
      );
    }
    setZIndex(t) {
      super.setZIndex(t);
      var e = this.getStage();
      return (
        e &&
          e.content &&
          (e.content.removeChild(this.getNativeCanvasElement()),
          t < e.children.length - 1
            ? e.content.insertBefore(
                this.getNativeCanvasElement(),
                e.children[t + 1].getCanvas()._canvas
              )
            : e.content.appendChild(this.getNativeCanvasElement())),
        this
      );
    }
    moveToTop() {
      K.prototype.moveToTop.call(this);
      var t = this.getStage();
      return (
        t &&
          t.content &&
          (t.content.removeChild(this.getNativeCanvasElement()),
          t.content.appendChild(this.getNativeCanvasElement())),
        !0
      );
    }
    moveUp() {
      if (!K.prototype.moveUp.call(this)) return !1;
      var t = this.getStage();
      return (
        !(!t || !t.content) &&
        (t.content.removeChild(this.getNativeCanvasElement()),
        this.index < t.children.length - 1
          ? t.content.insertBefore(
              this.getNativeCanvasElement(),
              t.children[this.index + 1].getCanvas()._canvas
            )
          : t.content.appendChild(this.getNativeCanvasElement()),
        !0)
      );
    }
    moveDown() {
      if (K.prototype.moveDown.call(this)) {
        var t = this.getStage();
        if (t) {
          var e = t.children;
          t.content &&
            (t.content.removeChild(this.getNativeCanvasElement()),
            t.content.insertBefore(
              this.getNativeCanvasElement(),
              e[this.index + 1].getCanvas()._canvas
            ));
        }
        return !0;
      }
      return !1;
    }
    moveToBottom() {
      if (K.prototype.moveToBottom.call(this)) {
        var t = this.getStage();
        if (t) {
          var e = t.children;
          t.content &&
            (t.content.removeChild(this.getNativeCanvasElement()),
            t.content.insertBefore(
              this.getNativeCanvasElement(),
              e[1].getCanvas()._canvas
            ));
        }
        return !0;
      }
      return !1;
    }
    getLayer() {
      return this;
    }
    remove() {
      var t = this.getNativeCanvasElement();
      return (
        K.prototype.remove.call(this),
        t && t.parentNode && g._isInDocument(t) && t.parentNode.removeChild(t),
        this
      );
    }
    getStage() {
      return this.parent;
    }
    setSize({ width: t, height: e }) {
      return (
        this.canvas.setSize(t, e),
        this.hitCanvas.setSize(t, e),
        this._setSmoothEnabled(),
        this
      );
    }
    _validateAdd(t) {
      var e = t.getType();
      "Group" !== e &&
        "Shape" !== e &&
        g.throw("You may only add groups and shapes to a layer.");
    }
    _toKonvaCanvas(t) {
      return (
        ((t = t || {}).width = t.width || this.getWidth()),
        (t.height = t.height || this.getHeight()),
        (t.x = void 0 !== t.x ? t.x : this.x()),
        (t.y = void 0 !== t.y ? t.y : this.y()),
        K.prototype._toKonvaCanvas.call(this, t)
      );
    }
    _checkVisibility() {
      const t = this.visible();
      this.canvas._canvas.style.display = t ? "block" : "none";
    }
    _setSmoothEnabled() {
      this.getContext()._context.imageSmoothingEnabled =
        this.imageSmoothingEnabled();
    }
    getWidth() {
      if (this.parent) return this.parent.width();
    }
    setWidth() {
      g.warn(
        'Can not change width of layer. Use "stage.width(value)" function instead.'
      );
    }
    getHeight() {
      if (this.parent) return this.parent.height();
    }
    setHeight() {
      g.warn(
        'Can not change height of layer. Use "stage.height(value)" function instead.'
      );
    }
    batchDraw() {
      return (
        this._waitingForDraw ||
          ((this._waitingForDraw = !0),
          g.requestAnimFrame(() => {
            this.draw(), (this._waitingForDraw = !1);
          })),
        this
      );
    }
    getIntersection(t) {
      if (!this.isListening() || !this.isVisible()) return null;
      for (var e = 1, i = !1; ; ) {
        for (let r = 0; r < Wt; r++) {
          const a = Ht[r],
            n = this._getIntersection({ x: t.x + a.x * e, y: t.y + a.y * e }),
            s = n.shape;
          if (s) return s;
          if (((i = !!n.antialiased), !n.antialiased)) break;
        }
        if (!i) return null;
        e += 1;
      }
    }
    _getIntersection(t) {
      const e = this.hitCanvas.pixelRatio,
        i = this.hitCanvas.context.getImageData(
          Math.round(t.x * e),
          Math.round(t.y * e),
          1,
          1
        ).data,
        r = i[3];
      if (255 === r) {
        const t = g._rgbToHex(i[0], i[1], i[2]),
          e = Nt["#" + t];
        return e ? { shape: e } : { antialiased: !0 };
      }
      return r > 0 ? { antialiased: !0 } : {};
    }
    drawScene(t, e) {
      var i = this.getLayer(),
        r = t || (i && i.getCanvas());
      return (
        this._fire("beforeDraw", { node: this }),
        this.clearBeforeDraw() && r.getContext().clear(),
        Q.prototype.drawScene.call(this, r, e),
        this._fire("draw", { node: this }),
        this
      );
    }
    drawHit(t, e) {
      var i = this.getLayer(),
        r = t || (i && i.hitCanvas);
      return (
        i && i.clearBeforeDraw() && i.getHitCanvas().getContext().clear(),
        Q.prototype.drawHit.call(this, r, e),
        this
      );
    }
    enableHitGraph() {
      return this.hitGraphEnabled(!0), this;
    }
    disableHitGraph() {
      return this.hitGraphEnabled(!1), this;
    }
    setHitGraphEnabled(t) {
      g.warn(
        "hitGraphEnabled method is deprecated. Please use layer.listening() instead."
      ),
        this.listening(t);
    }
    getHitGraphEnabled(t) {
      return (
        g.warn(
          "hitGraphEnabled method is deprecated. Please use layer.listening() instead."
        ),
        this.listening()
      );
    }
    toggleHitCanvas() {
      if (this.parent && this.parent.content) {
        var t = this.parent;
        !!this.hitCanvas._canvas.parentNode
          ? t.content.removeChild(this.hitCanvas._canvas)
          : t.content.appendChild(this.hitCanvas._canvas);
      }
    }
    destroy() {
      return (
        g.releaseCanvas(
          this.getNativeCanvasElement(),
          this.getHitCanvas()._canvas
        ),
        super.destroy()
      );
    }
  }
  (zt.prototype.nodeType = "Layer"),
    r(zt),
    w.addGetterSetter(zt, "imageSmoothingEnabled", !0),
    w.addGetterSetter(zt, "clearBeforeDraw", !0),
    w.addGetterSetter(zt, "hitGraphEnabled", !0, x());
  class Yt extends zt {
    constructor(t) {
      super(t),
        this.listening(!1),
        g.warn(
          'Konva.Fast layer is deprecated. Please use "new Konva.Layer({ listening: false })" instead.'
        );
    }
  }
  (Yt.prototype.nodeType = "FastLayer"), r(Yt);
  class Xt extends Q {
    _validateAdd(t) {
      var e = t.getType();
      "Group" !== e &&
        "Shape" !== e &&
        g.throw("You may only add groups and shapes to groups.");
    }
  }
  (Xt.prototype.nodeType = "Group"), r(Xt);
  var jt =
    e.performance && e.performance.now
      ? function () {
          return e.performance.now();
        }
      : function () {
          return new Date().getTime();
        };
  class qt {
    constructor(t, e) {
      (this.id = qt.animIdCounter++),
        (this.frame = { time: 0, timeDiff: 0, lastTime: jt(), frameRate: 0 }),
        (this.func = t),
        this.setLayers(e);
    }
    setLayers(t) {
      var e = [];
      return (e = t ? (t.length > 0 ? t : [t]) : []), (this.layers = e), this;
    }
    getLayers() {
      return this.layers;
    }
    addLayer(t) {
      var e,
        i = this.layers,
        r = i.length;
      for (e = 0; e < r; e++) if (i[e]._id === t._id) return !1;
      return this.layers.push(t), !0;
    }
    isRunning() {
      var t,
        e = qt.animations,
        i = e.length;
      for (t = 0; t < i; t++) if (e[t].id === this.id) return !0;
      return !1;
    }
    start() {
      return (
        this.stop(),
        (this.frame.timeDiff = 0),
        (this.frame.lastTime = jt()),
        qt._addAnimation(this),
        this
      );
    }
    stop() {
      return qt._removeAnimation(this), this;
    }
    _updateFrameObject(t) {
      (this.frame.timeDiff = t - this.frame.lastTime),
        (this.frame.lastTime = t),
        (this.frame.time += this.frame.timeDiff),
        (this.frame.frameRate = 1e3 / this.frame.timeDiff);
    }
    static _addAnimation(t) {
      this.animations.push(t), this._handleAnimation();
    }
    static _removeAnimation(t) {
      var e,
        i = t.id,
        r = this.animations,
        a = r.length;
      for (e = 0; e < a; e++)
        if (r[e].id === i) {
          this.animations.splice(e, 1);
          break;
        }
    }
    static _runFrames() {
      var t,
        e,
        i,
        r,
        a,
        n,
        s,
        o,
        h = {},
        l = this.animations;
      for (r = 0; r < l.length; r++)
        if (
          ((e = (t = l[r]).layers),
          (i = t.func),
          t._updateFrameObject(jt()),
          (n = e.length),
          !i || !1 !== i.call(t, t.frame))
        )
          for (a = 0; a < n; a++) void 0 !== (s = e[a])._id && (h[s._id] = s);
      for (o in h) h.hasOwnProperty(o) && h[o].batchDraw();
    }
    static _animationLoop() {
      var t = qt;
      t.animations.length
        ? (t._runFrames(), g.requestAnimFrame(t._animationLoop))
        : (t.animRunning = !1);
    }
    static _handleAnimation() {
      this.animRunning ||
        ((this.animRunning = !0), g.requestAnimFrame(this._animationLoop));
    }
  }
  (qt.animations = []), (qt.animIdCounter = 0), (qt.animRunning = !1);
  var Ut = { node: 1, duration: 1, easing: 1, onFinish: 1, yoyo: 1 },
    Kt = 0,
    Vt = ["fill", "stroke", "shadowColor"];
  class Qt {
    constructor(t, e, i, r, a, n, s) {
      (this.prop = t),
        (this.propFunc = e),
        (this.begin = r),
        (this._pos = r),
        (this.duration = n),
        (this._change = 0),
        (this.prevPos = 0),
        (this.yoyo = s),
        (this._time = 0),
        (this._position = 0),
        (this._startTime = 0),
        (this._finish = 0),
        (this.func = i),
        (this._change = a - this.begin),
        this.pause();
    }
    fire(t) {
      var e = this[t];
      e && e();
    }
    setTime(t) {
      t > this.duration
        ? this.yoyo
          ? ((this._time = this.duration), this.reverse())
          : this.finish()
        : t < 0
        ? this.yoyo
          ? ((this._time = 0), this.play())
          : this.reset()
        : ((this._time = t), this.update());
    }
    getTime() {
      return this._time;
    }
    setPosition(t) {
      (this.prevPos = this._pos), this.propFunc(t), (this._pos = t);
    }
    getPosition(t) {
      return (
        void 0 === t && (t = this._time),
        this.func(t, this.begin, this._change, this.duration)
      );
    }
    play() {
      (this.state = 2),
        (this._startTime = this.getTimer() - this._time),
        this.onEnterFrame(),
        this.fire("onPlay");
    }
    reverse() {
      (this.state = 3),
        (this._time = this.duration - this._time),
        (this._startTime = this.getTimer() - this._time),
        this.onEnterFrame(),
        this.fire("onReverse");
    }
    seek(t) {
      this.pause(), (this._time = t), this.update(), this.fire("onSeek");
    }
    reset() {
      this.pause(), (this._time = 0), this.update(), this.fire("onReset");
    }
    finish() {
      this.pause(),
        (this._time = this.duration),
        this.update(),
        this.fire("onFinish");
    }
    update() {
      this.setPosition(this.getPosition(this._time)), this.fire("onUpdate");
    }
    onEnterFrame() {
      var t = this.getTimer() - this._startTime;
      2 === this.state
        ? this.setTime(t)
        : 3 === this.state && this.setTime(this.duration - t);
    }
    pause() {
      (this.state = 1), this.fire("onPause");
    }
    getTimer() {
      return new Date().getTime();
    }
  }
  class Jt {
    constructor(t) {
      var e,
        r,
        a = this,
        n = t.node,
        s = n._id,
        o = t.easing || Zt.Linear,
        h = !!t.yoyo;
      (e = void 0 === t.duration ? 0.3 : 0 === t.duration ? 0.001 : t.duration),
        (this.node = n),
        (this._id = Kt++);
      var l = n.getLayer() || (n instanceof i.Stage ? n.getLayers() : null);
      for (r in (l ||
        g.error(
          "Tween constructor have `node` that is not in a layer. Please add node into layer first."
        ),
      (this.anim = new qt(function () {
        a.tween.onEnterFrame();
      }, l)),
      (this.tween = new Qt(
        r,
        function (t) {
          a._tweenFunc(t);
        },
        o,
        0,
        1,
        1e3 * e,
        h
      )),
      this._addListeners(),
      Jt.attrs[s] || (Jt.attrs[s] = {}),
      Jt.attrs[s][this._id] || (Jt.attrs[s][this._id] = {}),
      Jt.tweens[s] || (Jt.tweens[s] = {}),
      t))
        void 0 === Ut[r] && this._addAttr(r, t[r]);
      this.reset(),
        (this.onFinish = t.onFinish),
        (this.onReset = t.onReset),
        (this.onUpdate = t.onUpdate);
    }
    _addAttr(t, e) {
      var i,
        r,
        a,
        n,
        s,
        o,
        h,
        l,
        d = this.node,
        c = d._id;
      if (
        ((a = Jt.tweens[c][t]) && delete Jt.attrs[c][a][t],
        (i = d.getAttr(t)),
        g._isArray(e))
      )
        if (
          ((r = []),
          (s = Math.max(e.length, i.length)),
          "points" === t &&
            e.length !== i.length &&
            (e.length > i.length
              ? ((h = i), (i = g._prepareArrayForTween(i, e, d.closed())))
              : ((o = e), (e = g._prepareArrayForTween(e, i, d.closed())))),
          0 === t.indexOf("fill"))
        )
          for (n = 0; n < s; n++)
            if (n % 2 == 0) r.push(e[n] - i[n]);
            else {
              var u = g.colorToRGBA(i[n]);
              (l = g.colorToRGBA(e[n])),
                (i[n] = u),
                r.push({
                  r: l.r - u.r,
                  g: l.g - u.g,
                  b: l.b - u.b,
                  a: l.a - u.a,
                });
            }
        else for (n = 0; n < s; n++) r.push(e[n] - i[n]);
      else
        -1 !== Vt.indexOf(t)
          ? ((i = g.colorToRGBA(i)),
            (r = {
              r: (l = g.colorToRGBA(e)).r - i.r,
              g: l.g - i.g,
              b: l.b - i.b,
              a: l.a - i.a,
            }))
          : (r = e - i);
      (Jt.attrs[c][this._id][t] = {
        start: i,
        diff: r,
        end: e,
        trueEnd: o,
        trueStart: h,
      }),
        (Jt.tweens[c][t] = this._id);
    }
    _tweenFunc(t) {
      var e,
        i,
        r,
        a,
        n,
        s,
        o,
        h,
        l = this.node,
        d = Jt.attrs[l._id][this._id];
      for (e in d) {
        if (((r = (i = d[e]).start), (a = i.diff), (h = i.end), g._isArray(r)))
          if (
            ((n = []),
            (o = Math.max(r.length, h.length)),
            0 === e.indexOf("fill"))
          )
            for (s = 0; s < o; s++)
              s % 2 == 0
                ? n.push((r[s] || 0) + a[s] * t)
                : n.push(
                    "rgba(" +
                      Math.round(r[s].r + a[s].r * t) +
                      "," +
                      Math.round(r[s].g + a[s].g * t) +
                      "," +
                      Math.round(r[s].b + a[s].b * t) +
                      "," +
                      (r[s].a + a[s].a * t) +
                      ")"
                  );
          else for (s = 0; s < o; s++) n.push((r[s] || 0) + a[s] * t);
        else
          n =
            -1 !== Vt.indexOf(e)
              ? "rgba(" +
                Math.round(r.r + a.r * t) +
                "," +
                Math.round(r.g + a.g * t) +
                "," +
                Math.round(r.b + a.b * t) +
                "," +
                (r.a + a.a * t) +
                ")"
              : r + a * t;
        l.setAttr(e, n);
      }
    }
    _addListeners() {
      (this.tween.onPlay = () => {
        this.anim.start();
      }),
        (this.tween.onReverse = () => {
          this.anim.start();
        }),
        (this.tween.onPause = () => {
          this.anim.stop();
        }),
        (this.tween.onFinish = () => {
          var t = this.node,
            e = Jt.attrs[t._id][this._id];
          e.points && e.points.trueEnd && t.setAttr("points", e.points.trueEnd),
            this.onFinish && this.onFinish.call(this);
        }),
        (this.tween.onReset = () => {
          var t = this.node,
            e = Jt.attrs[t._id][this._id];
          e.points && e.points.trueStart && t.points(e.points.trueStart),
            this.onReset && this.onReset();
        }),
        (this.tween.onUpdate = () => {
          this.onUpdate && this.onUpdate.call(this);
        });
    }
    play() {
      return this.tween.play(), this;
    }
    reverse() {
      return this.tween.reverse(), this;
    }
    reset() {
      return this.tween.reset(), this;
    }
    seek(t) {
      return this.tween.seek(1e3 * t), this;
    }
    pause() {
      return this.tween.pause(), this;
    }
    finish() {
      return this.tween.finish(), this;
    }
    destroy() {
      var t,
        e = this.node._id,
        i = this._id,
        r = Jt.tweens[e];
      for (t in (this.pause(), r)) delete Jt.tweens[e][t];
      delete Jt.attrs[e][i];
    }
  }
  (Jt.attrs = {}),
    (Jt.tweens = {}),
    (K.prototype.to = function (t) {
      var e = t.onFinish;
      (t.node = this),
        (t.onFinish = function () {
          this.destroy(), e && e();
        }),
        new Jt(t).play();
    });
  const Zt = {
      BackEaseIn(t, e, i, r) {
        var a = 1.70158;
        return i * (t /= r) * t * ((a + 1) * t - a) + e;
      },
      BackEaseOut(t, e, i, r) {
        var a = 1.70158;
        return i * ((t = t / r - 1) * t * ((a + 1) * t + a) + 1) + e;
      },
      BackEaseInOut(t, e, i, r) {
        var a = 1.70158;
        return (t /= r / 2) < 1
          ? (i / 2) * (t * t * ((1 + (a *= 1.525)) * t - a)) + e
          : (i / 2) * ((t -= 2) * t * ((1 + (a *= 1.525)) * t + a) + 2) + e;
      },
      ElasticEaseIn(t, e, i, r, a, n) {
        var s = 0;
        return 0 === t
          ? e
          : 1 == (t /= r)
          ? e + i
          : (n || (n = 0.3 * r),
            !a || a < Math.abs(i)
              ? ((a = i), (s = n / 4))
              : (s = (n / (2 * Math.PI)) * Math.asin(i / a)),
            -a *
              Math.pow(2, 10 * (t -= 1)) *
              Math.sin(((t * r - s) * (2 * Math.PI)) / n) +
              e);
      },
      ElasticEaseOut(t, e, i, r, a, n) {
        var s = 0;
        return 0 === t
          ? e
          : 1 == (t /= r)
          ? e + i
          : (n || (n = 0.3 * r),
            !a || a < Math.abs(i)
              ? ((a = i), (s = n / 4))
              : (s = (n / (2 * Math.PI)) * Math.asin(i / a)),
            a *
              Math.pow(2, -10 * t) *
              Math.sin(((t * r - s) * (2 * Math.PI)) / n) +
              i +
              e);
      },
      ElasticEaseInOut(t, e, i, r, a, n) {
        var s = 0;
        return 0 === t
          ? e
          : 2 == (t /= r / 2)
          ? e + i
          : (n || (n = r * (0.3 * 1.5)),
            !a || a < Math.abs(i)
              ? ((a = i), (s = n / 4))
              : (s = (n / (2 * Math.PI)) * Math.asin(i / a)),
            t < 1
              ? a *
                  Math.pow(2, 10 * (t -= 1)) *
                  Math.sin(((t * r - s) * (2 * Math.PI)) / n) *
                  -0.5 +
                e
              : a *
                  Math.pow(2, -10 * (t -= 1)) *
                  Math.sin(((t * r - s) * (2 * Math.PI)) / n) *
                  0.5 +
                i +
                e);
      },
      BounceEaseOut: (t, e, i, r) =>
        (t /= r) < 1 / 2.75
          ? i * (7.5625 * t * t) + e
          : t < 2 / 2.75
          ? i * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
          : t < 2.5 / 2.75
          ? i * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
          : i * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e,
      BounceEaseIn: (t, e, i, r) => i - Zt.BounceEaseOut(r - t, 0, i, r) + e,
      BounceEaseInOut: (t, e, i, r) =>
        t < r / 2
          ? 0.5 * Zt.BounceEaseIn(2 * t, 0, i, r) + e
          : 0.5 * Zt.BounceEaseOut(2 * t - r, 0, i, r) + 0.5 * i + e,
      EaseIn: (t, e, i, r) => i * (t /= r) * t + e,
      EaseOut: (t, e, i, r) => -i * (t /= r) * (t - 2) + e,
      EaseInOut: (t, e, i, r) =>
        (t /= r / 2) < 1
          ? (i / 2) * t * t + e
          : (-i / 2) * (--t * (t - 2) - 1) + e,
      StrongEaseIn: (t, e, i, r) => i * (t /= r) * t * t * t * t + e,
      StrongEaseOut: (t, e, i, r) =>
        i * ((t = t / r - 1) * t * t * t * t + 1) + e,
      StrongEaseInOut: (t, e, i, r) =>
        (t /= r / 2) < 1
          ? (i / 2) * t * t * t * t * t + e
          : (i / 2) * ((t -= 2) * t * t * t * t + 2) + e,
      Linear: (t, e, i, r) => (i * t) / r + e,
    },
    $t = g._assign(i, {
      Util: g,
      Transform: a,
      Node: K,
      Container: Q,
      Stage: Gt,
      stages: Mt,
      Layer: zt,
      FastLayer: Yt,
      Group: Xt,
      DD: E,
      Shape: Bt,
      shapes: Nt,
      Animation: qt,
      Tween: Jt,
      Easings: Zt,
      Context: P,
      Canvas: M,
    });
  class te extends Bt {
    _sceneFunc(t) {
      var e = i.getAngle(this.angle()),
        r = this.clockwise();
      t.beginPath(),
        t.arc(0, 0, this.outerRadius(), 0, e, r),
        t.arc(0, 0, this.innerRadius(), e, 0, !r),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getWidth() {
      return 2 * this.outerRadius();
    }
    getHeight() {
      return 2 * this.outerRadius();
    }
    setWidth(t) {
      this.outerRadius(t / 2);
    }
    setHeight(t) {
      this.outerRadius(t / 2);
    }
    getSelfRect() {
      const t = this.innerRadius(),
        e = this.outerRadius(),
        r = this.clockwise(),
        a = i.getAngle(r ? 360 - this.angle() : this.angle()),
        n = Math.cos(Math.min(a, Math.PI)),
        s = Math.sin(Math.min(Math.max(Math.PI, a), (3 * Math.PI) / 2)),
        o = Math.sin(Math.min(a, Math.PI / 2)),
        h = n * (n > 0 ? t : e),
        l = s * (s > 0 ? t : e),
        d = o * (o > 0 ? e : t);
      return { x: h, y: r ? -1 * d : l, width: 1 * e - h, height: d - l };
    }
  }
  function ee(t, e, i, r, a, n, s) {
    var o = Math.sqrt(Math.pow(i - t, 2) + Math.pow(r - e, 2)),
      h = Math.sqrt(Math.pow(a - i, 2) + Math.pow(n - r, 2)),
      l = (s * o) / (o + h),
      d = (s * h) / (o + h);
    return [i - l * (a - t), r - l * (n - e), i + d * (a - t), r + d * (n - e)];
  }
  function ie(t, e) {
    var i,
      r,
      a = t.length,
      n = [];
    for (i = 2; i < a - 2; i += 2)
      (r = ee(t[i - 2], t[i - 1], t[i], t[i + 1], t[i + 2], t[i + 3], e)),
        isNaN(r[0]) ||
          (n.push(r[0]),
          n.push(r[1]),
          n.push(t[i]),
          n.push(t[i + 1]),
          n.push(r[2]),
          n.push(r[3]));
    return n;
  }
  (te.prototype._centroid = !0),
    (te.prototype.className = "Arc"),
    (te.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"]),
    r(te),
    w.addGetterSetter(te, "innerRadius", 0, p()),
    w.addGetterSetter(te, "outerRadius", 0, p()),
    w.addGetterSetter(te, "angle", 0, p()),
    w.addGetterSetter(te, "clockwise", !1, x());
  class re extends Bt {
    constructor(t) {
      super(t),
        this.on(
          "pointsChange.konva tensionChange.konva closedChange.konva bezierChange.konva",
          function () {
            this._clearCache("tensionPoints");
          }
        );
    }
    _sceneFunc(t) {
      var e,
        i,
        r,
        a = this.points(),
        n = a.length,
        s = this.tension(),
        o = this.closed(),
        h = this.bezier();
      if (n) {
        if ((t.beginPath(), t.moveTo(a[0], a[1]), 0 !== s && n > 4)) {
          for (
            i = (e = this.getTensionPoints()).length,
              r = o ? 0 : 4,
              o || t.quadraticCurveTo(e[0], e[1], e[2], e[3]);
            r < i - 2;

          )
            t.bezierCurveTo(e[r++], e[r++], e[r++], e[r++], e[r++], e[r++]);
          o || t.quadraticCurveTo(e[i - 2], e[i - 1], a[n - 2], a[n - 1]);
        } else if (h)
          for (r = 2; r < n; )
            t.bezierCurveTo(a[r++], a[r++], a[r++], a[r++], a[r++], a[r++]);
        else for (r = 2; r < n; r += 2) t.lineTo(a[r], a[r + 1]);
        o ? (t.closePath(), t.fillStrokeShape(this)) : t.strokeShape(this);
      }
    }
    getTensionPoints() {
      return this._getCache("tensionPoints", this._getTensionPoints);
    }
    _getTensionPoints() {
      return this.closed()
        ? this._getTensionPointsClosed()
        : ie(this.points(), this.tension());
    }
    _getTensionPointsClosed() {
      var t = this.points(),
        e = t.length,
        i = this.tension(),
        r = ee(t[e - 2], t[e - 1], t[0], t[1], t[2], t[3], i),
        a = ee(t[e - 4], t[e - 3], t[e - 2], t[e - 1], t[0], t[1], i),
        n = ie(t, i);
      return [r[2], r[3]]
        .concat(n)
        .concat([
          a[0],
          a[1],
          t[e - 2],
          t[e - 1],
          a[2],
          a[3],
          r[0],
          r[1],
          t[0],
          t[1],
        ]);
    }
    getWidth() {
      return this.getSelfRect().width;
    }
    getHeight() {
      return this.getSelfRect().height;
    }
    getSelfRect() {
      var t = this.points();
      if (t.length < 4)
        return { x: t[0] || 0, y: t[1] || 0, width: 0, height: 0 };
      for (
        var e,
          i,
          r = (t =
            0 !== this.tension()
              ? [
                  t[0],
                  t[1],
                  ...this._getTensionPoints(),
                  t[t.length - 2],
                  t[t.length - 1],
                ]
              : this.points())[0],
          a = t[0],
          n = t[1],
          s = t[1],
          o = 0;
        o < t.length / 2;
        o++
      )
        (e = t[2 * o]),
          (i = t[2 * o + 1]),
          (r = Math.min(r, e)),
          (a = Math.max(a, e)),
          (n = Math.min(n, i)),
          (s = Math.max(s, i));
      return { x: r, y: n, width: a - r, height: s - n };
    }
  }
  (re.prototype.className = "Line"),
    (re.prototype._attrsAffectingSize = ["points", "bezier", "tension"]),
    r(re),
    w.addGetterSetter(re, "closed", !1),
    w.addGetterSetter(re, "bezier", !1),
    w.addGetterSetter(re, "tension", 0, p()),
    w.addGetterSetter(
      re,
      "points",
      [],
      (function () {
        if (i.isUnminified)
          return function (t, e) {
            const i = Int8Array ? Object.getPrototypeOf(Int8Array) : null;
            return (
              (i && t instanceof i) ||
                (g._isArray(t)
                  ? t.forEach(function (t) {
                      g._isNumber(t) ||
                        g.warn(
                          '"' +
                            e +
                            '" attribute has non numeric element ' +
                            t +
                            ". Make sure that all elements are numbers."
                        );
                    })
                  : g.warn(
                      u(t) +
                        ' is a not valid value for "' +
                        e +
                        '" attribute. The value should be a array of numbers.'
                    )),
              t
            );
          };
      })()
    );
  const ae = [
      [],
      [],
      [-0.5773502691896257, 0.5773502691896257],
      [0, -0.7745966692414834, 0.7745966692414834],
      [
        -0.33998104358485626, 0.33998104358485626, -0.8611363115940526,
        0.8611363115940526,
      ],
      [
        0, -0.5384693101056831, 0.5384693101056831, -0.906179845938664,
        0.906179845938664,
      ],
      [
        0.6612093864662645, -0.6612093864662645, -0.2386191860831969,
        0.2386191860831969, -0.932469514203152, 0.932469514203152,
      ],
      [
        0, 0.4058451513773972, -0.4058451513773972, -0.7415311855993945,
        0.7415311855993945, -0.9491079123427585, 0.9491079123427585,
      ],
      [
        -0.1834346424956498, 0.1834346424956498, -0.525532409916329,
        0.525532409916329, -0.7966664774136267, 0.7966664774136267,
        -0.9602898564975363, 0.9602898564975363,
      ],
      [
        0, -0.8360311073266358, 0.8360311073266358, -0.9681602395076261,
        0.9681602395076261, -0.3242534234038089, 0.3242534234038089,
        -0.6133714327005904, 0.6133714327005904,
      ],
      [
        -0.14887433898163122, 0.14887433898163122, -0.4333953941292472,
        0.4333953941292472, -0.6794095682990244, 0.6794095682990244,
        -0.8650633666889845, 0.8650633666889845, -0.9739065285171717,
        0.9739065285171717,
      ],
      [
        0, -0.26954315595234496, 0.26954315595234496, -0.5190961292068118,
        0.5190961292068118, -0.7301520055740494, 0.7301520055740494,
        -0.8870625997680953, 0.8870625997680953, -0.978228658146057,
        0.978228658146057,
      ],
      [
        -0.1252334085114689, 0.1252334085114689, -0.3678314989981802,
        0.3678314989981802, -0.5873179542866175, 0.5873179542866175,
        -0.7699026741943047, 0.7699026741943047, -0.9041172563704749,
        0.9041172563704749, -0.9815606342467192, 0.9815606342467192,
      ],
      [
        0, -0.2304583159551348, 0.2304583159551348, -0.44849275103644687,
        0.44849275103644687, -0.6423493394403402, 0.6423493394403402,
        -0.8015780907333099, 0.8015780907333099, -0.9175983992229779,
        0.9175983992229779, -0.9841830547185881, 0.9841830547185881,
      ],
      [
        -0.10805494870734367, 0.10805494870734367, -0.31911236892788974,
        0.31911236892788974, -0.5152486363581541, 0.5152486363581541,
        -0.6872929048116855, 0.6872929048116855, -0.827201315069765,
        0.827201315069765, -0.9284348836635735, 0.9284348836635735,
        -0.9862838086968123, 0.9862838086968123,
      ],
      [
        0, -0.20119409399743451, 0.20119409399743451, -0.3941513470775634,
        0.3941513470775634, -0.5709721726085388, 0.5709721726085388,
        -0.7244177313601701, 0.7244177313601701, -0.8482065834104272,
        0.8482065834104272, -0.937273392400706, 0.937273392400706,
        -0.9879925180204854, 0.9879925180204854,
      ],
      [
        -0.09501250983763744, 0.09501250983763744, -0.2816035507792589,
        0.2816035507792589, -0.45801677765722737, 0.45801677765722737,
        -0.6178762444026438, 0.6178762444026438, -0.755404408355003,
        0.755404408355003, -0.8656312023878318, 0.8656312023878318,
        -0.9445750230732326, 0.9445750230732326, -0.9894009349916499,
        0.9894009349916499,
      ],
      [
        0, -0.17848418149584785, 0.17848418149584785, -0.3512317634538763,
        0.3512317634538763, -0.5126905370864769, 0.5126905370864769,
        -0.6576711592166907, 0.6576711592166907, -0.7815140038968014,
        0.7815140038968014, -0.8802391537269859, 0.8802391537269859,
        -0.9506755217687678, 0.9506755217687678, -0.9905754753144174,
        0.9905754753144174,
      ],
      [
        -0.0847750130417353, 0.0847750130417353, -0.2518862256915055,
        0.2518862256915055, -0.41175116146284263, 0.41175116146284263,
        -0.5597708310739475, 0.5597708310739475, -0.6916870430603532,
        0.6916870430603532, -0.8037049589725231, 0.8037049589725231,
        -0.8926024664975557, 0.8926024664975557, -0.9558239495713977,
        0.9558239495713977, -0.9915651684209309, 0.9915651684209309,
      ],
      [
        0, -0.16035864564022537, 0.16035864564022537, -0.31656409996362983,
        0.31656409996362983, -0.46457074137596094, 0.46457074137596094,
        -0.600545304661681, 0.600545304661681, -0.7209661773352294,
        0.7209661773352294, -0.8227146565371428, 0.8227146565371428,
        -0.9031559036148179, 0.9031559036148179, -0.96020815213483,
        0.96020815213483, -0.9924068438435844, 0.9924068438435844,
      ],
      [
        -0.07652652113349734, 0.07652652113349734, -0.22778585114164507,
        0.22778585114164507, -0.37370608871541955, 0.37370608871541955,
        -0.5108670019508271, 0.5108670019508271, -0.636053680726515,
        0.636053680726515, -0.7463319064601508, 0.7463319064601508,
        -0.8391169718222188, 0.8391169718222188, -0.912234428251326,
        0.912234428251326, -0.9639719272779138, 0.9639719272779138,
        -0.9931285991850949, 0.9931285991850949,
      ],
      [
        0, -0.1455618541608951, 0.1455618541608951, -0.2880213168024011,
        0.2880213168024011, -0.4243421202074388, 0.4243421202074388,
        -0.5516188358872198, 0.5516188358872198, -0.6671388041974123,
        0.6671388041974123, -0.7684399634756779, 0.7684399634756779,
        -0.8533633645833173, 0.8533633645833173, -0.9200993341504008,
        0.9200993341504008, -0.9672268385663063, 0.9672268385663063,
        -0.9937521706203895, 0.9937521706203895,
      ],
      [
        -0.06973927331972223, 0.06973927331972223, -0.20786042668822127,
        0.20786042668822127, -0.34193582089208424, 0.34193582089208424,
        -0.469355837986757, 0.469355837986757, -0.5876404035069116,
        0.5876404035069116, -0.6944872631866827, 0.6944872631866827,
        -0.7878168059792081, 0.7878168059792081, -0.8658125777203002,
        0.8658125777203002, -0.926956772187174, 0.926956772187174,
        -0.9700604978354287, 0.9700604978354287, -0.9942945854823992,
        0.9942945854823992,
      ],
      [
        0, -0.1332568242984661, 0.1332568242984661, -0.26413568097034495,
        0.26413568097034495, -0.3903010380302908, 0.3903010380302908,
        -0.5095014778460075, 0.5095014778460075, -0.6196098757636461,
        0.6196098757636461, -0.7186613631319502, 0.7186613631319502,
        -0.8048884016188399, 0.8048884016188399, -0.8767523582704416,
        0.8767523582704416, -0.9329710868260161, 0.9329710868260161,
        -0.9725424712181152, 0.9725424712181152, -0.9947693349975522,
        0.9947693349975522,
      ],
      [
        -0.06405689286260563, 0.06405689286260563, -0.1911188674736163,
        0.1911188674736163, -0.3150426796961634, 0.3150426796961634,
        -0.4337935076260451, 0.4337935076260451, -0.5454214713888396,
        0.5454214713888396, -0.6480936519369755, 0.6480936519369755,
        -0.7401241915785544, 0.7401241915785544, -0.820001985973903,
        0.820001985973903, -0.8864155270044011, 0.8864155270044011,
        -0.9382745520027328, 0.9382745520027328, -0.9747285559713095,
        0.9747285559713095, -0.9951872199970213, 0.9951872199970213,
      ],
    ],
    ne = [
      [],
      [],
      [1, 1],
      [0.8888888888888888, 0.5555555555555556, 0.5555555555555556],
      [
        0.6521451548625461, 0.6521451548625461, 0.34785484513745385,
        0.34785484513745385,
      ],
      [
        0.5688888888888889, 0.47862867049936647, 0.47862867049936647,
        0.23692688505618908, 0.23692688505618908,
      ],
      [
        0.3607615730481386, 0.3607615730481386, 0.46791393457269104,
        0.46791393457269104, 0.17132449237917036, 0.17132449237917036,
      ],
      [
        0.4179591836734694, 0.3818300505051189, 0.3818300505051189,
        0.27970539148927664, 0.27970539148927664, 0.1294849661688697,
        0.1294849661688697,
      ],
      [
        0.362683783378362, 0.362683783378362, 0.31370664587788727,
        0.31370664587788727, 0.22238103445337448, 0.22238103445337448,
        0.10122853629037626, 0.10122853629037626,
      ],
      [
        0.3302393550012598, 0.1806481606948574, 0.1806481606948574,
        0.08127438836157441, 0.08127438836157441, 0.31234707704000286,
        0.31234707704000286, 0.26061069640293544, 0.26061069640293544,
      ],
      [
        0.29552422471475287, 0.29552422471475287, 0.26926671930999635,
        0.26926671930999635, 0.21908636251598204, 0.21908636251598204,
        0.1494513491505806, 0.1494513491505806, 0.06667134430868814,
        0.06667134430868814,
      ],
      [
        0.2729250867779006, 0.26280454451024665, 0.26280454451024665,
        0.23319376459199048, 0.23319376459199048, 0.18629021092773426,
        0.18629021092773426, 0.1255803694649046, 0.1255803694649046,
        0.05566856711617366, 0.05566856711617366,
      ],
      [
        0.24914704581340277, 0.24914704581340277, 0.2334925365383548,
        0.2334925365383548, 0.20316742672306592, 0.20316742672306592,
        0.16007832854334622, 0.16007832854334622, 0.10693932599531843,
        0.10693932599531843, 0.04717533638651183, 0.04717533638651183,
      ],
      [
        0.2325515532308739, 0.22628318026289723, 0.22628318026289723,
        0.2078160475368885, 0.2078160475368885, 0.17814598076194574,
        0.17814598076194574, 0.13887351021978725, 0.13887351021978725,
        0.09212149983772845, 0.09212149983772845, 0.04048400476531588,
        0.04048400476531588,
      ],
      [
        0.2152638534631578, 0.2152638534631578, 0.2051984637212956,
        0.2051984637212956, 0.18553839747793782, 0.18553839747793782,
        0.15720316715819355, 0.15720316715819355, 0.12151857068790319,
        0.12151857068790319, 0.08015808715976021, 0.08015808715976021,
        0.03511946033175186, 0.03511946033175186,
      ],
      [
        0.2025782419255613, 0.19843148532711158, 0.19843148532711158,
        0.1861610000155622, 0.1861610000155622, 0.16626920581699392,
        0.16626920581699392, 0.13957067792615432, 0.13957067792615432,
        0.10715922046717194, 0.10715922046717194, 0.07036604748810812,
        0.07036604748810812, 0.03075324199611727, 0.03075324199611727,
      ],
      [
        0.1894506104550685, 0.1894506104550685, 0.18260341504492358,
        0.18260341504492358, 0.16915651939500254, 0.16915651939500254,
        0.14959598881657674, 0.14959598881657674, 0.12462897125553388,
        0.12462897125553388, 0.09515851168249279, 0.09515851168249279,
        0.062253523938647894, 0.062253523938647894, 0.027152459411754096,
        0.027152459411754096,
      ],
      [
        0.17944647035620653, 0.17656270536699264, 0.17656270536699264,
        0.16800410215645004, 0.16800410215645004, 0.15404576107681028,
        0.15404576107681028, 0.13513636846852548, 0.13513636846852548,
        0.11188384719340397, 0.11188384719340397, 0.08503614831717918,
        0.08503614831717918, 0.0554595293739872, 0.0554595293739872,
        0.02414830286854793, 0.02414830286854793,
      ],
      [
        0.1691423829631436, 0.1691423829631436, 0.16427648374583273,
        0.16427648374583273, 0.15468467512626524, 0.15468467512626524,
        0.14064291467065065, 0.14064291467065065, 0.12255520671147846,
        0.12255520671147846, 0.10094204410628717, 0.10094204410628717,
        0.07642573025488905, 0.07642573025488905, 0.0497145488949698,
        0.0497145488949698, 0.02161601352648331, 0.02161601352648331,
      ],
      [
        0.1610544498487837, 0.15896884339395434, 0.15896884339395434,
        0.15276604206585967, 0.15276604206585967, 0.1426067021736066,
        0.1426067021736066, 0.12875396253933621, 0.12875396253933621,
        0.11156664554733399, 0.11156664554733399, 0.09149002162245,
        0.09149002162245, 0.06904454273764123, 0.06904454273764123,
        0.0448142267656996, 0.0448142267656996, 0.019461788229726478,
        0.019461788229726478,
      ],
      [
        0.15275338713072584, 0.15275338713072584, 0.14917298647260374,
        0.14917298647260374, 0.14209610931838204, 0.14209610931838204,
        0.13168863844917664, 0.13168863844917664, 0.11819453196151841,
        0.11819453196151841, 0.10193011981724044, 0.10193011981724044,
        0.08327674157670475, 0.08327674157670475, 0.06267204833410907,
        0.06267204833410907, 0.04060142980038694, 0.04060142980038694,
        0.017614007139152118, 0.017614007139152118,
      ],
      [
        0.14608113364969041, 0.14452440398997005, 0.14452440398997005,
        0.13988739479107315, 0.13988739479107315, 0.13226893863333747,
        0.13226893863333747, 0.12183141605372853, 0.12183141605372853,
        0.10879729916714838, 0.10879729916714838, 0.09344442345603386,
        0.09344442345603386, 0.0761001136283793, 0.0761001136283793,
        0.057134425426857205, 0.057134425426857205, 0.036953789770852494,
        0.036953789770852494, 0.016017228257774335, 0.016017228257774335,
      ],
      [
        0.13925187285563198, 0.13925187285563198, 0.13654149834601517,
        0.13654149834601517, 0.13117350478706238, 0.13117350478706238,
        0.12325237681051242, 0.12325237681051242, 0.11293229608053922,
        0.11293229608053922, 0.10041414444288096, 0.10041414444288096,
        0.08594160621706773, 0.08594160621706773, 0.06979646842452049,
        0.06979646842452049, 0.052293335152683286, 0.052293335152683286,
        0.03377490158481415, 0.03377490158481415, 0.0146279952982722,
        0.0146279952982722,
      ],
      [
        0.13365457218610619, 0.1324620394046966, 0.1324620394046966,
        0.12890572218808216, 0.12890572218808216, 0.12304908430672953,
        0.12304908430672953, 0.11499664022241136, 0.11499664022241136,
        0.10489209146454141, 0.10489209146454141, 0.09291576606003515,
        0.09291576606003515, 0.07928141177671895, 0.07928141177671895,
        0.06423242140852585, 0.06423242140852585, 0.04803767173108467,
        0.04803767173108467, 0.030988005856979445, 0.030988005856979445,
        0.013411859487141771, 0.013411859487141771,
      ],
      [
        0.12793819534675216, 0.12793819534675216, 0.1258374563468283,
        0.1258374563468283, 0.12167047292780339, 0.12167047292780339,
        0.1155056680537256, 0.1155056680537256, 0.10744427011596563,
        0.10744427011596563, 0.09761865210411388, 0.09761865210411388,
        0.08619016153195327, 0.08619016153195327, 0.0733464814110803,
        0.0733464814110803, 0.05929858491543678, 0.05929858491543678,
        0.04427743881741981, 0.04427743881741981, 0.028531388628933663,
        0.028531388628933663, 0.0123412297999872, 0.0123412297999872,
      ],
    ],
    se = [[1], [1, 1], [1, 2, 1], [1, 3, 3, 1]],
    oe = (t, e, i) => {
      let r, a, n;
      (r = i / 2), (a = 0);
      for (let i = 0; i < 20; i++)
        (n = r * ae[20][i] + r), (a += ne[20][i] * le(t, e, n));
      return r * a;
    },
    he = (t, e, i) => {
      void 0 === i && (i = 1);
      const r = t[0] - 2 * t[1] + t[2],
        a = e[0] - 2 * e[1] + e[2],
        n = 2 * t[1] - 2 * t[0],
        s = 2 * e[1] - 2 * e[0],
        o = 4 * (r * r + a * a),
        h = 4 * (r * n + a * s),
        l = n * n + s * s;
      if (0 === o)
        return (
          i * Math.sqrt(Math.pow(t[2] - t[0], 2) + Math.pow(e[2] - e[0], 2))
        );
      const d = h / (2 * o),
        c = i + d,
        g = l / o - d * d,
        u = c * c + g > 0 ? Math.sqrt(c * c + g) : 0,
        f = d * d + g > 0 ? Math.sqrt(d * d + g) : 0,
        p =
          d + Math.sqrt(d * d + g) !== 0
            ? g * Math.log(Math.abs((c + u) / (d + f)))
            : 0;
      return (Math.sqrt(o) / 2) * (c * u - d * f + p);
    };
  function le(t, e, i) {
    const r = de(1, i, t),
      a = de(1, i, e),
      n = r * r + a * a;
    return Math.sqrt(n);
  }
  const de = (t, e, i) => {
      const r = i.length - 1;
      let a, n;
      if (0 === r) return 0;
      if (0 === t) {
        n = 0;
        for (let t = 0; t <= r; t++)
          n += se[r][t] * Math.pow(1 - e, r - t) * Math.pow(e, t) * i[t];
        return n;
      }
      a = new Array(r);
      for (let t = 0; t < r; t++) a[t] = r * (i[t + 1] - i[t]);
      return de(t - 1, e, a);
    },
    ce = (t, e, i) => {
      let r = 1,
        a = t / e,
        n = (t - i(a)) / e,
        s = 0;
      for (; r > 0.001; ) {
        const o = i(a + n),
          h = Math.abs(t - o) / e;
        if (h < r) (r = h), (a += n);
        else {
          const s = i(a - n),
            o = Math.abs(t - s) / e;
          o < r ? ((r = o), (a -= n)) : (n /= 2);
        }
        if ((s++, s > 500)) break;
      }
      return a;
    };
  class ge extends Bt {
    constructor(t) {
      super(t),
        (this.dataArray = []),
        (this.pathLength = 0),
        this._readDataAttribute(),
        this.on("dataChange.konva", function () {
          this._readDataAttribute();
        });
    }
    _readDataAttribute() {
      (this.dataArray = ge.parsePathData(this.data())),
        (this.pathLength = ge.getPathLength(this.dataArray));
    }
    _sceneFunc(t) {
      var e = this.dataArray;
      t.beginPath();
      for (var i = !1, r = 0; r < e.length; r++) {
        var a = e[r].command,
          n = e[r].points;
        switch (a) {
          case "L":
            t.lineTo(n[0], n[1]);
            break;
          case "M":
            t.moveTo(n[0], n[1]);
            break;
          case "C":
            t.bezierCurveTo(n[0], n[1], n[2], n[3], n[4], n[5]);
            break;
          case "Q":
            t.quadraticCurveTo(n[0], n[1], n[2], n[3]);
            break;
          case "A":
            var s = n[0],
              o = n[1],
              h = n[2],
              l = n[3],
              d = n[4],
              c = n[5],
              g = n[6],
              u = n[7],
              f = h > l ? h : l,
              p = h > l ? 1 : h / l,
              v = h > l ? l / h : 1;
            t.translate(s, o),
              t.rotate(g),
              t.scale(p, v),
              t.arc(0, 0, f, d, d + c, 1 - u),
              t.scale(1 / p, 1 / v),
              t.rotate(-g),
              t.translate(-s, -o);
            break;
          case "z":
            (i = !0), t.closePath();
        }
      }
      i || this.hasFill() ? t.fillStrokeShape(this) : t.strokeShape(this);
    }
    getSelfRect() {
      var t = [];
      this.dataArray.forEach(function (e) {
        if ("A" === e.command) {
          var i = e.points[4],
            r = e.points[5],
            a = e.points[4] + r,
            n = Math.PI / 180;
          if ((Math.abs(i - a) < n && (n = Math.abs(i - a)), r < 0))
            for (let r = i - n; r > a; r -= n) {
              const i = ge.getPointOnEllipticalArc(
                e.points[0],
                e.points[1],
                e.points[2],
                e.points[3],
                r,
                0
              );
              t.push(i.x, i.y);
            }
          else
            for (let r = i + n; r < a; r += n) {
              const i = ge.getPointOnEllipticalArc(
                e.points[0],
                e.points[1],
                e.points[2],
                e.points[3],
                r,
                0
              );
              t.push(i.x, i.y);
            }
        } else if ("C" === e.command)
          for (let i = 0; i <= 1; i += 0.01) {
            const r = ge.getPointOnCubicBezier(
              i,
              e.start.x,
              e.start.y,
              e.points[0],
              e.points[1],
              e.points[2],
              e.points[3],
              e.points[4],
              e.points[5]
            );
            t.push(r.x, r.y);
          }
        else t = t.concat(e.points);
      });
      for (
        var e, i, r = t[0], a = t[0], n = t[1], s = t[1], o = 0;
        o < t.length / 2;
        o++
      )
        (e = t[2 * o]),
          (i = t[2 * o + 1]),
          isNaN(e) || ((r = Math.min(r, e)), (a = Math.max(a, e))),
          isNaN(i) || ((n = Math.min(n, i)), (s = Math.max(s, i)));
      return { x: r, y: n, width: a - r, height: s - n };
    }
    getLength() {
      return this.pathLength;
    }
    getPointAtLength(t) {
      return ge.getPointAtLengthOfDataArray(t, this.dataArray);
    }
    static getLineLength(t, e, i, r) {
      return Math.sqrt((i - t) * (i - t) + (r - e) * (r - e));
    }
    static getPathLength(t) {
      let e = 0;
      for (var i = 0; i < t.length; ++i) e += t[i].pathLength;
      return e;
    }
    static getPointAtLengthOfDataArray(t, e) {
      var i,
        r = 0,
        a = e.length;
      if (!a) return null;
      for (; r < a && t > e[r].pathLength; ) (t -= e[r].pathLength), ++r;
      if (r === a) return { x: (i = e[r - 1].points.slice(-2))[0], y: i[1] };
      if (t < 0.01) return { x: (i = e[r].points.slice(0, 2))[0], y: i[1] };
      var n = e[r],
        s = n.points;
      switch (n.command) {
        case "L":
          return ge.getPointOnLine(t, n.start.x, n.start.y, s[0], s[1]);
        case "C":
          return ge.getPointOnCubicBezier(
            ce(t, ge.getPathLength(e), (t) =>
              oe(
                [n.start.x, s[0], s[2], s[4]],
                [n.start.y, s[1], s[3], s[5]],
                t
              )
            ),
            n.start.x,
            n.start.y,
            s[0],
            s[1],
            s[2],
            s[3],
            s[4],
            s[5]
          );
        case "Q":
          return ge.getPointOnQuadraticBezier(
            ce(t, ge.getPathLength(e), (t) =>
              he([n.start.x, s[0], s[2]], [n.start.y, s[1], s[3]], t)
            ),
            n.start.x,
            n.start.y,
            s[0],
            s[1],
            s[2],
            s[3]
          );
        case "A":
          var o = s[0],
            h = s[1],
            l = s[2],
            d = s[3],
            c = s[4],
            g = s[5],
            u = s[6];
          return (
            (c += (g * t) / n.pathLength),
            ge.getPointOnEllipticalArc(o, h, l, d, c, u)
          );
      }
      return null;
    }
    static getPointOnLine(t, e, i, r, a, n, s) {
      void 0 === n && (n = e), void 0 === s && (s = i);
      var o = (a - i) / (r - e + 1e-8),
        h = Math.sqrt((t * t) / (1 + o * o));
      r < e && (h *= -1);
      var l,
        d = o * h;
      if (r === e) l = { x: n, y: s + d };
      else if ((s - i) / (n - e + 1e-8) === o) l = { x: n + h, y: s + d };
      else {
        var c,
          g,
          u = this.getLineLength(e, i, r, a),
          f = (n - e) * (r - e) + (s - i) * (a - i);
        (c = e + (f /= u * u) * (r - e)), (g = i + f * (a - i));
        var p = this.getLineLength(n, s, c, g),
          v = Math.sqrt(t * t - p * p);
        (h = Math.sqrt((v * v) / (1 + o * o))),
          r < e && (h *= -1),
          (l = { x: c + h, y: g + (d = o * h) });
      }
      return l;
    }
    static getPointOnCubicBezier(t, e, i, r, a, n, s, o, h) {
      function l(t) {
        return t * t * t;
      }
      function d(t) {
        return 3 * t * t * (1 - t);
      }
      function c(t) {
        return 3 * t * (1 - t) * (1 - t);
      }
      function g(t) {
        return (1 - t) * (1 - t) * (1 - t);
      }
      return {
        x: o * l(t) + n * d(t) + r * c(t) + e * g(t),
        y: h * l(t) + s * d(t) + a * c(t) + i * g(t),
      };
    }
    static getPointOnQuadraticBezier(t, e, i, r, a, n, s) {
      function o(t) {
        return t * t;
      }
      function h(t) {
        return 2 * t * (1 - t);
      }
      function l(t) {
        return (1 - t) * (1 - t);
      }
      return {
        x: n * o(t) + r * h(t) + e * l(t),
        y: s * o(t) + a * h(t) + i * l(t),
      };
    }
    static getPointOnEllipticalArc(t, e, i, r, a, n) {
      var s = Math.cos(n),
        o = Math.sin(n),
        h = i * Math.cos(a),
        l = r * Math.sin(a);
      return { x: t + (h * s - l * o), y: e + (h * o + l * s) };
    }
    static parsePathData(t) {
      if (!t) return [];
      var e = t,
        i = [
          "m",
          "M",
          "l",
          "L",
          "v",
          "V",
          "h",
          "H",
          "z",
          "Z",
          "c",
          "C",
          "q",
          "Q",
          "t",
          "T",
          "s",
          "S",
          "a",
          "A",
        ];
      e = e.replace(new RegExp(" ", "g"), ",");
      for (var r = 0; r < i.length; r++)
        e = e.replace(new RegExp(i[r], "g"), "|" + i[r]);
      var a,
        n = e.split("|"),
        s = [],
        o = [],
        h = 0,
        l = 0,
        d = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi;
      for (r = 1; r < n.length; r++) {
        var c = n[r],
          g = c.charAt(0);
        for (c = c.slice(1), o.length = 0; (a = d.exec(c)); ) o.push(a[0]);
        for (var u = [], f = 0, p = o.length; f < p; f++)
          if ("00" !== o[f]) {
            var v = parseFloat(o[f]);
            isNaN(v) ? u.push(0) : u.push(v);
          } else u.push(0, 0);
        for (; u.length > 0 && !isNaN(u[0]); ) {
          var m,
            _,
            y,
            x,
            b,
            S,
            w,
            C,
            P,
            k,
            T = null,
            A = [],
            M = h,
            G = l;
          switch (g) {
            case "l":
              (h += u.shift()), (l += u.shift()), (T = "L"), A.push(h, l);
              break;
            case "L":
              (h = u.shift()), (l = u.shift()), A.push(h, l);
              break;
            case "m":
              var R = u.shift(),
                E = u.shift();
              if (
                ((h += R),
                (l += E),
                (T = "M"),
                s.length > 2 && "z" === s[s.length - 1].command)
              )
                for (var D = s.length - 2; D >= 0; D--)
                  if ("M" === s[D].command) {
                    (h = s[D].points[0] + R), (l = s[D].points[1] + E);
                    break;
                  }
              A.push(h, l), (g = "l");
              break;
            case "M":
              (h = u.shift()),
                (l = u.shift()),
                (T = "M"),
                A.push(h, l),
                (g = "L");
              break;
            case "h":
              (h += u.shift()), (T = "L"), A.push(h, l);
              break;
            case "H":
              (h = u.shift()), (T = "L"), A.push(h, l);
              break;
            case "v":
              (l += u.shift()), (T = "L"), A.push(h, l);
              break;
            case "V":
              (l = u.shift()), (T = "L"), A.push(h, l);
              break;
            case "C":
              A.push(u.shift(), u.shift(), u.shift(), u.shift()),
                (h = u.shift()),
                (l = u.shift()),
                A.push(h, l);
              break;
            case "c":
              A.push(
                h + u.shift(),
                l + u.shift(),
                h + u.shift(),
                l + u.shift()
              ),
                (h += u.shift()),
                (l += u.shift()),
                (T = "C"),
                A.push(h, l);
              break;
            case "S":
              (_ = h),
                (y = l),
                "C" === (m = s[s.length - 1]).command &&
                  ((_ = h + (h - m.points[2])), (y = l + (l - m.points[3]))),
                A.push(_, y, u.shift(), u.shift()),
                (h = u.shift()),
                (l = u.shift()),
                (T = "C"),
                A.push(h, l);
              break;
            case "s":
              (_ = h),
                (y = l),
                "C" === (m = s[s.length - 1]).command &&
                  ((_ = h + (h - m.points[2])), (y = l + (l - m.points[3]))),
                A.push(_, y, h + u.shift(), l + u.shift()),
                (h += u.shift()),
                (l += u.shift()),
                (T = "C"),
                A.push(h, l);
              break;
            case "Q":
              A.push(u.shift(), u.shift()),
                (h = u.shift()),
                (l = u.shift()),
                A.push(h, l);
              break;
            case "q":
              A.push(h + u.shift(), l + u.shift()),
                (h += u.shift()),
                (l += u.shift()),
                (T = "Q"),
                A.push(h, l);
              break;
            case "T":
              (_ = h),
                (y = l),
                "Q" === (m = s[s.length - 1]).command &&
                  ((_ = h + (h - m.points[0])), (y = l + (l - m.points[1]))),
                (h = u.shift()),
                (l = u.shift()),
                (T = "Q"),
                A.push(_, y, h, l);
              break;
            case "t":
              (_ = h),
                (y = l),
                "Q" === (m = s[s.length - 1]).command &&
                  ((_ = h + (h - m.points[0])), (y = l + (l - m.points[1]))),
                (h += u.shift()),
                (l += u.shift()),
                (T = "Q"),
                A.push(_, y, h, l);
              break;
            case "A":
              (x = u.shift()),
                (b = u.shift()),
                (S = u.shift()),
                (w = u.shift()),
                (C = u.shift()),
                (P = h),
                (k = l),
                (h = u.shift()),
                (l = u.shift()),
                (T = "A"),
                (A = this.convertEndpointToCenterParameterization(
                  P,
                  k,
                  h,
                  l,
                  w,
                  C,
                  x,
                  b,
                  S
                ));
              break;
            case "a":
              (x = u.shift()),
                (b = u.shift()),
                (S = u.shift()),
                (w = u.shift()),
                (C = u.shift()),
                (P = h),
                (k = l),
                (h += u.shift()),
                (l += u.shift()),
                (T = "A"),
                (A = this.convertEndpointToCenterParameterization(
                  P,
                  k,
                  h,
                  l,
                  w,
                  C,
                  x,
                  b,
                  S
                ));
          }
          s.push({
            command: T || g,
            points: A,
            start: { x: M, y: G },
            pathLength: this.calcLength(M, G, T || g, A),
          });
        }
        ("z" !== g && "Z" !== g) ||
          s.push({ command: "z", points: [], start: void 0, pathLength: 0 });
      }
      return s;
    }
    static calcLength(t, e, i, r) {
      var a,
        n,
        s,
        o,
        h = ge;
      switch (i) {
        case "L":
          return h.getLineLength(t, e, r[0], r[1]);
        case "C":
          return oe([t, r[0], r[2], r[4]], [e, r[1], r[3], r[5]], 1);
        case "Q":
          return he([t, r[0], r[2]], [e, r[1], r[3]], 1);
        case "A":
          a = 0;
          var l = r[4],
            d = r[5],
            c = r[4] + d,
            g = Math.PI / 180;
          if (
            (Math.abs(l - c) < g && (g = Math.abs(l - c)),
            (n = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], l, 0)),
            d < 0)
          )
            for (o = l - g; o > c; o -= g)
              (s = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], o, 0)),
                (a += h.getLineLength(n.x, n.y, s.x, s.y)),
                (n = s);
          else
            for (o = l + g; o < c; o += g)
              (s = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], o, 0)),
                (a += h.getLineLength(n.x, n.y, s.x, s.y)),
                (n = s);
          return (
            (s = h.getPointOnEllipticalArc(r[0], r[1], r[2], r[3], c, 0)),
            (a += h.getLineLength(n.x, n.y, s.x, s.y))
          );
      }
      return 0;
    }
    static convertEndpointToCenterParameterization(t, e, i, r, a, n, s, o, h) {
      var l = h * (Math.PI / 180),
        d = (Math.cos(l) * (t - i)) / 2 + (Math.sin(l) * (e - r)) / 2,
        c = (-1 * Math.sin(l) * (t - i)) / 2 + (Math.cos(l) * (e - r)) / 2,
        g = (d * d) / (s * s) + (c * c) / (o * o);
      g > 1 && ((s *= Math.sqrt(g)), (o *= Math.sqrt(g)));
      var u = Math.sqrt(
        (s * s * (o * o) - s * s * (c * c) - o * o * (d * d)) /
          (s * s * (c * c) + o * o * (d * d))
      );
      a === n && (u *= -1), isNaN(u) && (u = 0);
      var f = (u * s * c) / o,
        p = (u * -o * d) / s,
        v = (t + i) / 2 + Math.cos(l) * f - Math.sin(l) * p,
        m = (e + r) / 2 + Math.sin(l) * f + Math.cos(l) * p,
        _ = function (t) {
          return Math.sqrt(t[0] * t[0] + t[1] * t[1]);
        },
        y = function (t, e) {
          return (t[0] * e[0] + t[1] * e[1]) / (_(t) * _(e));
        },
        x = function (t, e) {
          return (t[0] * e[1] < t[1] * e[0] ? -1 : 1) * Math.acos(y(t, e));
        },
        b = x([1, 0], [(d - f) / s, (c - p) / o]),
        S = [(d - f) / s, (c - p) / o],
        w = [(-1 * d - f) / s, (-1 * c - p) / o],
        C = x(S, w);
      return (
        y(S, w) <= -1 && (C = Math.PI),
        y(S, w) >= 1 && (C = 0),
        0 === n && C > 0 && (C -= 2 * Math.PI),
        1 === n && C < 0 && (C += 2 * Math.PI),
        [v, m, s, o, b, C, l, n]
      );
    }
  }
  (ge.prototype.className = "Path"),
    (ge.prototype._attrsAffectingSize = ["data"]),
    r(ge),
    w.addGetterSetter(ge, "data");
  class ue extends re {
    _sceneFunc(t) {
      super._sceneFunc(t);
      var e = 2 * Math.PI,
        i = this.points(),
        r = i,
        a = 0 !== this.tension() && i.length > 4;
      a && (r = this.getTensionPoints());
      var n,
        s,
        o = this.pointerLength(),
        h = i.length;
      if (a) {
        const t = [
            r[r.length - 4],
            r[r.length - 3],
            r[r.length - 2],
            r[r.length - 1],
            i[h - 2],
            i[h - 1],
          ],
          e = ge.calcLength(r[r.length - 4], r[r.length - 3], "C", t),
          a = ge.getPointOnQuadraticBezier(
            Math.min(1, 1 - o / e),
            t[0],
            t[1],
            t[2],
            t[3],
            t[4],
            t[5]
          );
        (n = i[h - 2] - a.x), (s = i[h - 1] - a.y);
      } else (n = i[h - 2] - i[h - 4]), (s = i[h - 1] - i[h - 3]);
      var l = (Math.atan2(s, n) + e) % e,
        d = this.pointerWidth();
      this.pointerAtEnding() &&
        (t.save(),
        t.beginPath(),
        t.translate(i[h - 2], i[h - 1]),
        t.rotate(l),
        t.moveTo(0, 0),
        t.lineTo(-o, d / 2),
        t.lineTo(-o, -d / 2),
        t.closePath(),
        t.restore(),
        this.__fillStroke(t)),
        this.pointerAtBeginning() &&
          (t.save(),
          t.beginPath(),
          t.translate(i[0], i[1]),
          a
            ? ((n = (r[0] + r[2]) / 2 - i[0]), (s = (r[1] + r[3]) / 2 - i[1]))
            : ((n = i[2] - i[0]), (s = i[3] - i[1])),
          t.rotate((Math.atan2(-s, -n) + e) % e),
          t.moveTo(0, 0),
          t.lineTo(-o, d / 2),
          t.lineTo(-o, -d / 2),
          t.closePath(),
          t.restore(),
          this.__fillStroke(t));
    }
    __fillStroke(t) {
      var e = this.dashEnabled();
      e && ((this.attrs.dashEnabled = !1), t.setLineDash([])),
        t.fillStrokeShape(this),
        e && (this.attrs.dashEnabled = !0);
    }
    getSelfRect() {
      const t = super.getSelfRect(),
        e = this.pointerWidth() / 2;
      return {
        x: t.x - e,
        y: t.y - e,
        width: t.width + 2 * e,
        height: t.height + 2 * e,
      };
    }
  }
  (ue.prototype.className = "Arrow"),
    r(ue),
    w.addGetterSetter(ue, "pointerLength", 10, p()),
    w.addGetterSetter(ue, "pointerWidth", 10, p()),
    w.addGetterSetter(ue, "pointerAtBeginning", !1),
    w.addGetterSetter(ue, "pointerAtEnding", !0);
  class fe extends Bt {
    _sceneFunc(t) {
      t.beginPath(),
        t.arc(0, 0, this.attrs.radius || 0, 0, 2 * Math.PI, !1),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getWidth() {
      return 2 * this.radius();
    }
    getHeight() {
      return 2 * this.radius();
    }
    setWidth(t) {
      this.radius() !== t / 2 && this.radius(t / 2);
    }
    setHeight(t) {
      this.radius() !== t / 2 && this.radius(t / 2);
    }
  }
  (fe.prototype._centroid = !0),
    (fe.prototype.className = "Circle"),
    (fe.prototype._attrsAffectingSize = ["radius"]),
    r(fe),
    w.addGetterSetter(fe, "radius", 0, p());
  class pe extends Bt {
    _sceneFunc(t) {
      var e = this.radiusX(),
        i = this.radiusY();
      t.beginPath(),
        t.save(),
        e !== i && t.scale(1, i / e),
        t.arc(0, 0, e, 0, 2 * Math.PI, !1),
        t.restore(),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getWidth() {
      return 2 * this.radiusX();
    }
    getHeight() {
      return 2 * this.radiusY();
    }
    setWidth(t) {
      this.radiusX(t / 2);
    }
    setHeight(t) {
      this.radiusY(t / 2);
    }
  }
  (pe.prototype.className = "Ellipse"),
    (pe.prototype._centroid = !0),
    (pe.prototype._attrsAffectingSize = ["radiusX", "radiusY"]),
    r(pe),
    w.addComponentsGetterSetter(pe, "radius", ["x", "y"]),
    w.addGetterSetter(pe, "radiusX", 0, p()),
    w.addGetterSetter(pe, "radiusY", 0, p());
  class ve extends Bt {
    constructor(t) {
      super(t),
        this.on("imageChange.konva", () => {
          this._setImageLoad();
        }),
        this._setImageLoad();
    }
    _setImageLoad() {
      const t = this.image();
      (t && t.complete) ||
        (t && 4 === t.readyState) ||
        (t &&
          t.addEventListener &&
          t.addEventListener("load", () => {
            this._requestDraw();
          }));
    }
    _useBufferCanvas() {
      return super._useBufferCanvas(!0);
    }
    _sceneFunc(t) {
      const e = this.getWidth(),
        i = this.getHeight(),
        r = this.cornerRadius(),
        a = this.attrs.image;
      let n;
      if (a) {
        const t = this.attrs.cropWidth,
          r = this.attrs.cropHeight;
        n =
          t && r
            ? [a, this.cropX(), this.cropY(), t, r, 0, 0, e, i]
            : [a, 0, 0, e, i];
      }
      (this.hasFill() || this.hasStroke() || r) &&
        (t.beginPath(),
        r ? g.drawRoundedRectPath(t, e, i, r) : t.rect(0, 0, e, i),
        t.closePath(),
        t.fillStrokeShape(this)),
        a && (r && t.clip(), t.drawImage.apply(t, n));
    }
    _hitFunc(t) {
      var e = this.width(),
        i = this.height(),
        r = this.cornerRadius();
      t.beginPath(),
        r ? g.drawRoundedRectPath(t, e, i, r) : t.rect(0, 0, e, i),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getWidth() {
      var t, e;
      return null !== (t = this.attrs.width) && void 0 !== t
        ? t
        : null === (e = this.image()) || void 0 === e
        ? void 0
        : e.width;
    }
    getHeight() {
      var t, e;
      return null !== (t = this.attrs.height) && void 0 !== t
        ? t
        : null === (e = this.image()) || void 0 === e
        ? void 0
        : e.height;
    }
    static fromURL(t, e, i = null) {
      var r = g.createImageElement();
      (r.onload = function () {
        var t = new ve({ image: r });
        e(t);
      }),
        (r.onerror = i),
        (r.crossOrigin = "Anonymous"),
        (r.src = t);
    }
  }
  (ve.prototype.className = "Image"),
    r(ve),
    w.addGetterSetter(ve, "cornerRadius", 0, v(4)),
    w.addGetterSetter(ve, "image"),
    w.addComponentsGetterSetter(ve, "crop", ["x", "y", "width", "height"]),
    w.addGetterSetter(ve, "cropX", 0, p()),
    w.addGetterSetter(ve, "cropY", 0, p()),
    w.addGetterSetter(ve, "cropWidth", 0, p()),
    w.addGetterSetter(ve, "cropHeight", 0, p());
  var me = [
      "fontFamily",
      "fontSize",
      "fontStyle",
      "padding",
      "lineHeight",
      "text",
      "width",
      "height",
      "pointerDirection",
      "pointerWidth",
      "pointerHeight",
    ],
    _e = "up",
    ye = "right",
    xe = "down",
    be = "left",
    Se = me.length;
  class we extends Xt {
    constructor(t) {
      super(t),
        this.on("add.konva", function (t) {
          this._addListeners(t.child), this._sync();
        });
    }
    getText() {
      return this.find("Text")[0];
    }
    getTag() {
      return this.find("Tag")[0];
    }
    _addListeners(t) {
      var e,
        i = this,
        r = function () {
          i._sync();
        };
      for (e = 0; e < Se; e++) t.on(me[e] + "Change.konva", r);
    }
    getWidth() {
      return this.getText().width();
    }
    getHeight() {
      return this.getText().height();
    }
    _sync() {
      var t,
        e,
        i,
        r,
        a,
        n,
        s,
        o = this.getText(),
        h = this.getTag();
      if (o && h) {
        switch (
          ((t = o.width()),
          (e = o.height()),
          (i = h.pointerDirection()),
          (r = h.pointerWidth()),
          (s = h.pointerHeight()),
          (a = 0),
          (n = 0),
          i)
        ) {
          case _e:
            (a = t / 2), (n = -1 * s);
            break;
          case ye:
            (a = t + r), (n = e / 2);
            break;
          case xe:
            (a = t / 2), (n = e + s);
            break;
          case be:
            (a = -1 * r), (n = e / 2);
        }
        h.setAttrs({ x: -1 * a, y: -1 * n, width: t, height: e }),
          o.setAttrs({ x: -1 * a, y: -1 * n });
      }
    }
  }
  (we.prototype.className = "Label"), r(we);
  class Ce extends Bt {
    _sceneFunc(t) {
      var e = this.width(),
        i = this.height(),
        r = this.pointerDirection(),
        a = this.pointerWidth(),
        n = this.pointerHeight(),
        s = this.cornerRadius();
      let o = 0,
        h = 0,
        l = 0,
        d = 0;
      "number" == typeof s
        ? (o = h = l = d = Math.min(s, e / 2, i / 2))
        : ((o = Math.min(s[0] || 0, e / 2, i / 2)),
          (h = Math.min(s[1] || 0, e / 2, i / 2)),
          (d = Math.min(s[2] || 0, e / 2, i / 2)),
          (l = Math.min(s[3] || 0, e / 2, i / 2))),
        t.beginPath(),
        t.moveTo(o, 0),
        r === _e &&
          (t.lineTo((e - a) / 2, 0),
          t.lineTo(e / 2, -1 * n),
          t.lineTo((e + a) / 2, 0)),
        t.lineTo(e - h, 0),
        t.arc(e - h, h, h, (3 * Math.PI) / 2, 0, !1),
        r === ye &&
          (t.lineTo(e, (i - n) / 2),
          t.lineTo(e + a, i / 2),
          t.lineTo(e, (i + n) / 2)),
        t.lineTo(e, i - d),
        t.arc(e - d, i - d, d, 0, Math.PI / 2, !1),
        r === xe &&
          (t.lineTo((e + a) / 2, i),
          t.lineTo(e / 2, i + n),
          t.lineTo((e - a) / 2, i)),
        t.lineTo(l, i),
        t.arc(l, i - l, l, Math.PI / 2, Math.PI, !1),
        r === be &&
          (t.lineTo(0, (i + n) / 2),
          t.lineTo(-1 * a, i / 2),
          t.lineTo(0, (i - n) / 2)),
        t.lineTo(0, o),
        t.arc(o, o, o, Math.PI, (3 * Math.PI) / 2, !1),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getSelfRect() {
      var t = 0,
        e = 0,
        i = this.pointerWidth(),
        r = this.pointerHeight(),
        a = this.pointerDirection(),
        n = this.width(),
        s = this.height();
      return (
        a === _e
          ? ((e -= r), (s += r))
          : a === xe
          ? (s += r)
          : a === be
          ? ((t -= 1.5 * i), (n += i))
          : a === ye && (n += 1.5 * i),
        { x: t, y: e, width: n, height: s }
      );
    }
  }
  (Ce.prototype.className = "Tag"),
    r(Ce),
    w.addGetterSetter(Ce, "pointerDirection", "none"),
    w.addGetterSetter(Ce, "pointerWidth", 0, p()),
    w.addGetterSetter(Ce, "pointerHeight", 0, p()),
    w.addGetterSetter(Ce, "cornerRadius", 0, v(4));
  class Pe extends Bt {
    _sceneFunc(t) {
      var e = this.cornerRadius(),
        i = this.width(),
        r = this.height();
      t.beginPath(),
        e ? g.drawRoundedRectPath(t, i, r, e) : t.rect(0, 0, i, r),
        t.closePath(),
        t.fillStrokeShape(this);
    }
  }
  (Pe.prototype.className = "Rect"),
    r(Pe),
    w.addGetterSetter(Pe, "cornerRadius", 0, v(4));
  class ke extends Bt {
    _sceneFunc(t) {
      const e = this._getPoints();
      t.beginPath(), t.moveTo(e[0].x, e[0].y);
      for (var i = 1; i < e.length; i++) t.lineTo(e[i].x, e[i].y);
      t.closePath(), t.fillStrokeShape(this);
    }
    _getPoints() {
      const t = this.attrs.sides,
        e = this.attrs.radius || 0,
        i = [];
      for (var r = 0; r < t; r++)
        i.push({
          x: e * Math.sin((2 * r * Math.PI) / t),
          y: -1 * e * Math.cos((2 * r * Math.PI) / t),
        });
      return i;
    }
    getSelfRect() {
      const t = this._getPoints();
      var e = t[0].x,
        i = t[0].y,
        r = t[0].x,
        a = t[0].y;
      return (
        t.forEach((t) => {
          (e = Math.min(e, t.x)),
            (i = Math.max(i, t.x)),
            (r = Math.min(r, t.y)),
            (a = Math.max(a, t.y));
        }),
        { x: e, y: r, width: i - e, height: a - r }
      );
    }
    getWidth() {
      return 2 * this.radius();
    }
    getHeight() {
      return 2 * this.radius();
    }
    setWidth(t) {
      this.radius(t / 2);
    }
    setHeight(t) {
      this.radius(t / 2);
    }
  }
  (ke.prototype.className = "RegularPolygon"),
    (ke.prototype._centroid = !0),
    (ke.prototype._attrsAffectingSize = ["radius"]),
    r(ke),
    w.addGetterSetter(ke, "radius", 0, p()),
    w.addGetterSetter(ke, "sides", 0, p());
  var Te = 2 * Math.PI;
  class Ae extends Bt {
    _sceneFunc(t) {
      t.beginPath(),
        t.arc(0, 0, this.innerRadius(), 0, Te, !1),
        t.moveTo(this.outerRadius(), 0),
        t.arc(0, 0, this.outerRadius(), Te, 0, !0),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getWidth() {
      return 2 * this.outerRadius();
    }
    getHeight() {
      return 2 * this.outerRadius();
    }
    setWidth(t) {
      this.outerRadius(t / 2);
    }
    setHeight(t) {
      this.outerRadius(t / 2);
    }
  }
  (Ae.prototype.className = "Ring"),
    (Ae.prototype._centroid = !0),
    (Ae.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"]),
    r(Ae),
    w.addGetterSetter(Ae, "innerRadius", 0, p()),
    w.addGetterSetter(Ae, "outerRadius", 0, p());
  class Me extends Bt {
    constructor(t) {
      super(t),
        (this._updated = !0),
        (this.anim = new qt(() => {
          var t = this._updated;
          return (this._updated = !1), t;
        })),
        this.on("animationChange.konva", function () {
          this.frameIndex(0);
        }),
        this.on("frameIndexChange.konva", function () {
          this._updated = !0;
        }),
        this.on("frameRateChange.konva", function () {
          this.anim.isRunning() &&
            (clearInterval(this.interval), this._setInterval());
        });
    }
    _sceneFunc(t) {
      var e = this.animation(),
        i = this.frameIndex(),
        r = 4 * i,
        a = this.animations()[e],
        n = this.frameOffsets(),
        s = a[r + 0],
        o = a[r + 1],
        h = a[r + 2],
        l = a[r + 3],
        d = this.image();
      if (
        ((this.hasFill() || this.hasStroke()) &&
          (t.beginPath(),
          t.rect(0, 0, h, l),
          t.closePath(),
          t.fillStrokeShape(this)),
        d)
      )
        if (n) {
          var c = n[e],
            g = 2 * i;
          t.drawImage(d, s, o, h, l, c[g + 0], c[g + 1], h, l);
        } else t.drawImage(d, s, o, h, l, 0, 0, h, l);
    }
    _hitFunc(t) {
      var e = this.animation(),
        i = this.frameIndex(),
        r = 4 * i,
        a = this.animations()[e],
        n = this.frameOffsets(),
        s = a[r + 2],
        o = a[r + 3];
      if ((t.beginPath(), n)) {
        var h = n[e],
          l = 2 * i;
        t.rect(h[l + 0], h[l + 1], s, o);
      } else t.rect(0, 0, s, o);
      t.closePath(), t.fillShape(this);
    }
    _useBufferCanvas() {
      return super._useBufferCanvas(!0);
    }
    _setInterval() {
      var t = this;
      this.interval = setInterval(function () {
        t._updateIndex();
      }, 1e3 / this.frameRate());
    }
    start() {
      if (!this.isRunning()) {
        var t = this.getLayer();
        this.anim.setLayers(t), this._setInterval(), this.anim.start();
      }
    }
    stop() {
      this.anim.stop(), clearInterval(this.interval);
    }
    isRunning() {
      return this.anim.isRunning();
    }
    _updateIndex() {
      var t = this.frameIndex(),
        e = this.animation();
      t < this.animations()[e].length / 4 - 1
        ? this.frameIndex(t + 1)
        : this.frameIndex(0);
    }
  }
  (Me.prototype.className = "Sprite"),
    r(Me),
    w.addGetterSetter(Me, "animation"),
    w.addGetterSetter(Me, "animations"),
    w.addGetterSetter(Me, "frameOffsets"),
    w.addGetterSetter(Me, "image"),
    w.addGetterSetter(Me, "frameIndex", 0, p()),
    w.addGetterSetter(Me, "frameRate", 17, p()),
    w.backCompat(Me, {
      index: "frameIndex",
      getIndex: "getFrameIndex",
      setIndex: "setFrameIndex",
    });
  class Ge extends Bt {
    _sceneFunc(t) {
      var e = this.innerRadius(),
        i = this.outerRadius(),
        r = this.numPoints();
      t.beginPath(), t.moveTo(0, 0 - i);
      for (var a = 1; a < 2 * r; a++) {
        var n = a % 2 == 0 ? i : e,
          s = n * Math.sin((a * Math.PI) / r),
          o = -1 * n * Math.cos((a * Math.PI) / r);
        t.lineTo(s, o);
      }
      t.closePath(), t.fillStrokeShape(this);
    }
    getWidth() {
      return 2 * this.outerRadius();
    }
    getHeight() {
      return 2 * this.outerRadius();
    }
    setWidth(t) {
      this.outerRadius(t / 2);
    }
    setHeight(t) {
      this.outerRadius(t / 2);
    }
  }
  function Re(t) {
    return Array.from(t);
  }
  (Ge.prototype.className = "Star"),
    (Ge.prototype._centroid = !0),
    (Ge.prototype._attrsAffectingSize = ["innerRadius", "outerRadius"]),
    r(Ge),
    w.addGetterSetter(Ge, "numPoints", 5, p()),
    w.addGetterSetter(Ge, "innerRadius", 0, p()),
    w.addGetterSetter(Ge, "outerRadius", 0, p());
  var Ee,
    De = "auto",
    Le = "justify",
    Oe = "left",
    Ie = "middle",
    Fe = "normal",
    Ne = " ",
    Be = "none",
    He = [
      "fontFamily",
      "fontSize",
      "fontStyle",
      "fontVariant",
      "padding",
      "align",
      "verticalAlign",
      "lineHeight",
      "text",
      "width",
      "height",
      "wrap",
      "ellipsis",
      "letterSpacing",
    ],
    We = He.length;
  function ze() {
    return Ee || (Ee = g.createCanvasElement().getContext("2d"));
  }
  class Ye extends Bt {
    constructor(t) {
      super(
        (function (t) {
          return (
            (t = t || {}).fillLinearGradientColorStops ||
              t.fillRadialGradientColorStops ||
              t.fillPatternImage ||
              (t.fill = t.fill || "black"),
            t
          );
        })(t)
      ),
        (this._partialTextX = 0),
        (this._partialTextY = 0);
      for (var e = 0; e < We; e++)
        this.on(He[e] + "Change.konva", this._setTextData);
      this._setTextData();
    }
    _sceneFunc(t) {
      var e = this.textArr,
        i = e.length;
      if (this.text()) {
        var r,
          a = this.padding(),
          n = this.fontSize(),
          s = this.lineHeight() * n,
          o = this.verticalAlign(),
          h = 0,
          l = this.align(),
          d = this.getWidth(),
          c = this.letterSpacing(),
          g = this.fill(),
          u = this.textDecoration(),
          f = -1 !== u.indexOf("underline"),
          p = -1 !== u.indexOf("line-through"),
          v = 0,
          m = ((v = s / 2), 0),
          _ = 0;
        for (
          t.setAttr("font", this._getContextFont()),
            t.setAttr("textBaseline", Ie),
            t.setAttr("textAlign", Oe),
            o === Ie
              ? (h = (this.getHeight() - i * s - 2 * a) / 2)
              : "bottom" === o && (h = this.getHeight() - i * s - 2 * a),
            t.translate(a, h + a),
            r = 0;
          r < i;
          r++
        ) {
          (m = 0), (_ = 0);
          var y,
            x,
            b,
            S = e[r],
            w = S.text,
            C = S.width,
            P = S.lastInParagraph;
          if (
            (t.save(),
            "right" === l
              ? (m += d - C - 2 * a)
              : "center" === l && (m += (d - C - 2 * a) / 2),
            f)
          ) {
            t.save(),
              t.beginPath(),
              t.moveTo(m, v + _ + Math.round(n / 2)),
              (x = 0 === (y = w.split(" ").length - 1)),
              (b = l !== Le || P ? C : d - 2 * a),
              t.lineTo(m + Math.round(b), v + _ + Math.round(n / 2)),
              (t.lineWidth = n / 15);
            const e = this._getLinearGradient();
            (t.strokeStyle = e || g), t.stroke(), t.restore();
          }
          if (p) {
            t.save(),
              t.beginPath(),
              t.moveTo(m, v + _),
              (x = 0 === (y = w.split(" ").length - 1)),
              (b = l === Le && P && !x ? d - 2 * a : C),
              t.lineTo(m + Math.round(b), v + _),
              (t.lineWidth = n / 15);
            const e = this._getLinearGradient();
            (t.strokeStyle = e || g), t.stroke(), t.restore();
          }
          if (0 !== c || l === Le) {
            y = w.split(" ").length - 1;
            for (var k = Re(w), T = 0; T < k.length; T++) {
              var A = k[T];
              " " !== A || P || l !== Le || (m += (d - 2 * a - C) / y),
                (this._partialTextX = m),
                (this._partialTextY = v + _),
                (this._partialText = A),
                t.fillStrokeShape(this),
                (m += this.measureSize(A).width + c);
            }
          } else
            (this._partialTextX = m),
              (this._partialTextY = v + _),
              (this._partialText = w),
              t.fillStrokeShape(this);
          t.restore(), i > 1 && (v += s);
        }
      }
    }
    _hitFunc(t) {
      var e = this.getWidth(),
        i = this.getHeight();
      t.beginPath(), t.rect(0, 0, e, i), t.closePath(), t.fillStrokeShape(this);
    }
    setText(t) {
      var e = g._isString(t) ? t : null == t ? "" : t + "";
      return this._setAttr("text", e), this;
    }
    getWidth() {
      return this.attrs.width === De || void 0 === this.attrs.width
        ? this.getTextWidth() + 2 * this.padding()
        : this.attrs.width;
    }
    getHeight() {
      return this.attrs.height === De || void 0 === this.attrs.height
        ? this.fontSize() * this.textArr.length * this.lineHeight() +
            2 * this.padding()
        : this.attrs.height;
    }
    getTextWidth() {
      return this.textWidth;
    }
    getTextHeight() {
      return (
        g.warn(
          "text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."
        ),
        this.textHeight
      );
    }
    measureSize(t) {
      var e,
        i = ze(),
        r = this.fontSize();
      return (
        i.save(),
        (i.font = this._getContextFont()),
        (e = i.measureText(t)),
        i.restore(),
        { width: e.width, height: r }
      );
    }
    _getContextFont() {
      return (
        this.fontStyle() +
        Ne +
        this.fontVariant() +
        Ne +
        (this.fontSize() + "px ") +
        this.fontFamily()
          .split(",")
          .map((t) => {
            const e = (t = t.trim()).indexOf(" ") >= 0,
              i = t.indexOf('"') >= 0 || t.indexOf("'") >= 0;
            return e && !i && (t = `"${t}"`), t;
          })
          .join(", ")
      );
    }
    _addTextLine(t) {
      this.align() === Le && (t = t.trim());
      var e = this._getTextWidth(t);
      return this.textArr.push({ text: t, width: e, lastInParagraph: !1 });
    }
    _getTextWidth(t) {
      var e = this.letterSpacing(),
        i = t.length;
      return ze().measureText(t).width + (i ? e * (i - 1) : 0);
    }
    _setTextData() {
      var t = this.text().split("\n"),
        e = +this.fontSize(),
        i = 0,
        r = this.lineHeight() * e,
        a = this.attrs.width,
        n = this.attrs.height,
        s = a !== De && void 0 !== a,
        o = n !== De && void 0 !== n,
        h = this.padding(),
        l = a - 2 * h,
        d = n - 2 * h,
        c = 0,
        g = this.wrap(),
        u = "char" !== g && g !== Be,
        f = this.ellipsis();
      (this.textArr = []), (ze().font = this._getContextFont());
      for (
        var p = f ? this._getTextWidth("…") : 0, v = 0, m = t.length;
        v < m;
        ++v
      ) {
        var _ = t[v],
          y = this._getTextWidth(_);
        if (s && y > l)
          for (; _.length > 0; ) {
            for (var x = 0, b = _.length, S = "", w = 0; x < b; ) {
              var C = (x + b) >>> 1,
                P = _.slice(0, C + 1),
                k = this._getTextWidth(P) + p;
              k <= l ? ((x = C + 1), (S = P), (w = k)) : (b = C);
            }
            if (!S) break;
            if (u) {
              var T,
                A = _[S.length];
              (T =
                (A === Ne || "-" === A) && w <= l
                  ? S.length
                  : Math.max(S.lastIndexOf(Ne), S.lastIndexOf("-")) + 1) > 0 &&
                ((x = T), (S = S.slice(0, x)), (w = this._getTextWidth(S)));
            }
            if (
              ((S = S.trimRight()),
              this._addTextLine(S),
              (i = Math.max(i, w)),
              (c += r),
              this._shouldHandleEllipsis(c))
            ) {
              this._tryToAddEllipsisToLastLine();
              break;
            }
            if (
              (_ = (_ = _.slice(x)).trimLeft()).length > 0 &&
              (y = this._getTextWidth(_)) <= l
            ) {
              this._addTextLine(_), (c += r), (i = Math.max(i, y));
              break;
            }
          }
        else
          this._addTextLine(_),
            (c += r),
            (i = Math.max(i, y)),
            this._shouldHandleEllipsis(c) &&
              v < m - 1 &&
              this._tryToAddEllipsisToLastLine();
        if (
          (this.textArr[this.textArr.length - 1] &&
            (this.textArr[this.textArr.length - 1].lastInParagraph = !0),
          o && c + r > d)
        )
          break;
      }
      (this.textHeight = e), (this.textWidth = i);
    }
    _shouldHandleEllipsis(t) {
      var e = +this.fontSize(),
        i = this.lineHeight() * e,
        r = this.attrs.height,
        a = r !== De && void 0 !== r,
        n = r - 2 * this.padding();
      return !(this.wrap() !== Be) || (a && t + i > n);
    }
    _tryToAddEllipsisToLastLine() {
      var t = this.attrs.width,
        e = t !== De && void 0 !== t,
        i = t - 2 * this.padding(),
        r = this.ellipsis(),
        a = this.textArr[this.textArr.length - 1];
      if (a && r) {
        if (e)
          this._getTextWidth(a.text + "…") < i ||
            (a.text = a.text.slice(0, a.text.length - 3));
        this.textArr.splice(this.textArr.length - 1, 1),
          this._addTextLine(a.text + "…");
      }
    }
    getStrokeScaleEnabled() {
      return !0;
    }
  }
  (Ye.prototype._fillFunc = function (t) {
    t.fillText(this._partialText, this._partialTextX, this._partialTextY);
  }),
    (Ye.prototype._strokeFunc = function (t) {
      t.setAttr("miterLimit", 2),
        t.strokeText(this._partialText, this._partialTextX, this._partialTextY);
    }),
    (Ye.prototype.className = "Text"),
    (Ye.prototype._attrsAffectingSize = [
      "text",
      "fontSize",
      "padding",
      "wrap",
      "lineHeight",
      "letterSpacing",
    ]),
    r(Ye),
    w.overWriteSetter(Ye, "width", m()),
    w.overWriteSetter(Ye, "height", m()),
    w.addGetterSetter(Ye, "fontFamily", "Arial"),
    w.addGetterSetter(Ye, "fontSize", 12, p()),
    w.addGetterSetter(Ye, "fontStyle", Fe),
    w.addGetterSetter(Ye, "fontVariant", Fe),
    w.addGetterSetter(Ye, "padding", 0, p()),
    w.addGetterSetter(Ye, "align", Oe),
    w.addGetterSetter(Ye, "verticalAlign", "top"),
    w.addGetterSetter(Ye, "lineHeight", 1, p()),
    w.addGetterSetter(Ye, "wrap", "word"),
    w.addGetterSetter(Ye, "ellipsis", !1, x()),
    w.addGetterSetter(Ye, "letterSpacing", 0, p()),
    w.addGetterSetter(Ye, "text", "", _()),
    w.addGetterSetter(Ye, "textDecoration", "");
  var Xe = "normal";
  function je(t) {
    t.fillText(this.partialText, 0, 0);
  }
  function qe(t) {
    t.strokeText(this.partialText, 0, 0);
  }
  class Ue extends Bt {
    constructor(t) {
      super(t),
        (this.dummyCanvas = g.createCanvasElement()),
        (this.dataArray = []),
        this._readDataAttribute(),
        this.on("dataChange.konva", function () {
          this._readDataAttribute(), this._setTextData();
        }),
        this.on(
          "textChange.konva alignChange.konva letterSpacingChange.konva kerningFuncChange.konva fontSizeChange.konva fontFamilyChange.konva",
          this._setTextData
        ),
        this._setTextData();
    }
    _getTextPathLength() {
      return ge.getPathLength(this.dataArray);
    }
    _getPointAtLength(t) {
      if (!this.attrs.data) return null;
      return t - 1 > this.pathLength
        ? null
        : ge.getPointAtLengthOfDataArray(t, this.dataArray);
    }
    _readDataAttribute() {
      (this.dataArray = ge.parsePathData(this.attrs.data)),
        (this.pathLength = this._getTextPathLength());
    }
    _sceneFunc(t) {
      t.setAttr("font", this._getContextFont()),
        t.setAttr("textBaseline", this.textBaseline()),
        t.setAttr("textAlign", "left"),
        t.save();
      var e = this.textDecoration(),
        i = this.fill(),
        r = this.fontSize(),
        a = this.glyphInfo;
      "underline" === e && t.beginPath();
      for (var n = 0; n < a.length; n++) {
        t.save();
        var s = a[n].p0;
        t.translate(s.x, s.y),
          t.rotate(a[n].rotation),
          (this.partialText = a[n].text),
          t.fillStrokeShape(this),
          "underline" === e &&
            (0 === n && t.moveTo(0, r / 2 + 1), t.lineTo(r, r / 2 + 1)),
          t.restore();
      }
      "underline" === e &&
        ((t.strokeStyle = i), (t.lineWidth = r / 20), t.stroke()),
        t.restore();
    }
    _hitFunc(t) {
      t.beginPath();
      var e = this.glyphInfo;
      if (e.length >= 1) {
        var i = e[0].p0;
        t.moveTo(i.x, i.y);
      }
      for (var r = 0; r < e.length; r++) {
        var a = e[r].p1;
        t.lineTo(a.x, a.y);
      }
      t.setAttr("lineWidth", this.fontSize()),
        t.setAttr("strokeStyle", this.colorKey),
        t.stroke();
    }
    getTextWidth() {
      return this.textWidth;
    }
    getTextHeight() {
      return (
        g.warn(
          "text.getTextHeight() method is deprecated. Use text.height() - for full height and text.fontSize() - for one line height."
        ),
        this.textHeight
      );
    }
    setText(t) {
      return Ye.prototype.setText.call(this, t);
    }
    _getContextFont() {
      return Ye.prototype._getContextFont.call(this);
    }
    _getTextSize(t) {
      var e = this.dummyCanvas.getContext("2d");
      e.save(), (e.font = this._getContextFont());
      var i = e.measureText(t);
      return (
        e.restore(),
        { width: i.width, height: parseInt(`${this.fontSize()}`, 10) }
      );
    }
    _setTextData() {
      const { width: t, height: e } = this._getTextSize(this.attrs.text);
      if (
        ((this.textWidth = t),
        (this.textHeight = e),
        (this.glyphInfo = []),
        !this.attrs.data)
      )
        return null;
      const i = this.letterSpacing(),
        r = this.align(),
        a = this.kerningFunc(),
        n = Math.max(
          this.textWidth + ((this.attrs.text || "").length - 1) * i,
          0
        );
      let s = 0;
      "center" === r && (s = Math.max(0, this.pathLength / 2 - n / 2)),
        "right" === r && (s = Math.max(0, this.pathLength - n));
      const o = Re(this.text());
      let h = s;
      for (var l = 0; l < o.length; l++) {
        const t = this._getPointAtLength(h);
        if (!t) return;
        let e = this._getTextSize(o[l]).width + i;
        if (" " === o[l] && "justify" === r) {
          const t = this.text().split(" ").length - 1;
          e += (this.pathLength - n) / t;
        }
        const s = this._getPointAtLength(h + e);
        if (!s) return;
        const d = ge.getLineLength(t.x, t.y, s.x, s.y);
        let c = 0;
        if (a)
          try {
            c = a(o[l - 1], o[l]) * this.fontSize();
          } catch (t) {
            c = 0;
          }
        (t.x += c), (s.x += c), (this.textWidth += c);
        const g = ge.getPointOnLine(c + d / 2, t.x, t.y, s.x, s.y),
          u = Math.atan2(s.y - t.y, s.x - t.x);
        this.glyphInfo.push({
          transposeX: g.x,
          transposeY: g.y,
          text: o[l],
          rotation: u,
          p0: t,
          p1: s,
        }),
          (h += e);
      }
    }
    getSelfRect() {
      if (!this.glyphInfo.length) return { x: 0, y: 0, width: 0, height: 0 };
      var t = [];
      this.glyphInfo.forEach(function (e) {
        t.push(e.p0.x), t.push(e.p0.y), t.push(e.p1.x), t.push(e.p1.y);
      });
      for (
        var e,
          i,
          r = t[0] || 0,
          a = t[0] || 0,
          n = t[1] || 0,
          s = t[1] || 0,
          o = 0;
        o < t.length / 2;
        o++
      )
        (e = t[2 * o]),
          (i = t[2 * o + 1]),
          (r = Math.min(r, e)),
          (a = Math.max(a, e)),
          (n = Math.min(n, i)),
          (s = Math.max(s, i));
      var h = this.fontSize();
      return {
        x: r - h / 2,
        y: n - h / 2,
        width: a - r + h,
        height: s - n + h,
      };
    }
    destroy() {
      return g.releaseCanvas(this.dummyCanvas), super.destroy();
    }
  }
  (Ue.prototype._fillFunc = je),
    (Ue.prototype._strokeFunc = qe),
    (Ue.prototype._fillFuncHit = je),
    (Ue.prototype._strokeFuncHit = qe),
    (Ue.prototype.className = "TextPath"),
    (Ue.prototype._attrsAffectingSize = ["text", "fontSize", "data"]),
    r(Ue),
    w.addGetterSetter(Ue, "data"),
    w.addGetterSetter(Ue, "fontFamily", "Arial"),
    w.addGetterSetter(Ue, "fontSize", 12, p()),
    w.addGetterSetter(Ue, "fontStyle", Xe),
    w.addGetterSetter(Ue, "align", "left"),
    w.addGetterSetter(Ue, "letterSpacing", 0, p()),
    w.addGetterSetter(Ue, "textBaseline", "middle"),
    w.addGetterSetter(Ue, "fontVariant", Xe),
    w.addGetterSetter(Ue, "text", ""),
    w.addGetterSetter(Ue, "textDecoration", null),
    w.addGetterSetter(Ue, "kerningFunc", null);
  var Ke = "tr-konva",
    Ve = [
      "resizeEnabledChange",
      "rotateAnchorOffsetChange",
      "rotateEnabledChange",
      "enabledAnchorsChange",
      "anchorSizeChange",
      "borderEnabledChange",
      "borderStrokeChange",
      "borderStrokeWidthChange",
      "borderDashChange",
      "anchorStrokeChange",
      "anchorStrokeWidthChange",
      "anchorFillChange",
      "anchorCornerRadiusChange",
      "ignoreStrokeChange",
      "anchorStyleFuncChange",
    ]
      .map((t) => t + `.${Ke}`)
      .join(" "),
    Qe = "nodesRect",
    Je = [
      "widthChange",
      "heightChange",
      "scaleXChange",
      "scaleYChange",
      "skewXChange",
      "skewYChange",
      "rotationChange",
      "offsetXChange",
      "offsetYChange",
      "transformsEnabledChange",
      "strokeWidthChange",
    ],
    Ze = {
      "top-left": -45,
      "top-center": 0,
      "top-right": 45,
      "middle-right": -90,
      "middle-left": 90,
      "bottom-left": -135,
      "bottom-center": 180,
      "bottom-right": 135,
    };
  const $e = "ontouchstart" in i._global;
  var ti = [
    "top-left",
    "top-center",
    "top-right",
    "middle-right",
    "middle-left",
    "bottom-left",
    "bottom-center",
    "bottom-right",
  ];
  function ei(t, e, i) {
    const r = i.x + (t.x - i.x) * Math.cos(e) - (t.y - i.y) * Math.sin(e),
      a = i.y + (t.x - i.x) * Math.sin(e) + (t.y - i.y) * Math.cos(e);
    return Object.assign(Object.assign({}, t), {
      rotation: t.rotation + e,
      x: r,
      y: a,
    });
  }
  function ii(t, e) {
    const i = (function (t) {
      return {
        x:
          t.x +
          (t.width / 2) * Math.cos(t.rotation) +
          (t.height / 2) * Math.sin(-t.rotation),
        y:
          t.y +
          (t.height / 2) * Math.cos(t.rotation) +
          (t.width / 2) * Math.sin(t.rotation),
      };
    })(t);
    return ei(t, e, i);
  }
  class ri extends Xt {
    constructor(t) {
      super(t),
        (this._transforming = !1),
        this._createElements(),
        (this._handleMouseMove = this._handleMouseMove.bind(this)),
        (this._handleMouseUp = this._handleMouseUp.bind(this)),
        (this.update = this.update.bind(this)),
        this.on(Ve, this.update),
        this.getNode() && this.update();
    }
    attachTo(t) {
      return this.setNode(t), this;
    }
    setNode(t) {
      return (
        g.warn(
          "tr.setNode(shape), tr.node(shape) and tr.attachTo(shape) methods are deprecated. Please use tr.nodes(nodesArray) instead."
        ),
        this.setNodes([t])
      );
    }
    getNode() {
      return this._nodes && this._nodes[0];
    }
    _getEventNamespace() {
      return Ke + this._id;
    }
    setNodes(t = []) {
      this._nodes && this._nodes.length && this.detach();
      const e = t.filter(
        (t) =>
          !t.isAncestorOf(this) ||
          (g.error(
            "Konva.Transformer cannot be an a child of the node you are trying to attach"
          ),
          !1)
      );
      return (
        (this._nodes = t = e),
        1 === t.length && this.useSingleNodeRotation()
          ? this.rotation(t[0].getAbsoluteRotation())
          : this.rotation(0),
        this._nodes.forEach((t) => {
          const e = () => {
              1 === this.nodes().length &&
                this.useSingleNodeRotation() &&
                this.rotation(this.nodes()[0].getAbsoluteRotation()),
                this._resetTransformCache(),
                this._transforming || this.isDragging() || this.update();
            },
            i = t._attrsAffectingSize
              .map((t) => t + "Change." + this._getEventNamespace())
              .join(" ");
          t.on(i, e),
            t.on(
              Je.map((t) => t + `.${this._getEventNamespace()}`).join(" "),
              e
            ),
            t.on(`absoluteTransformChange.${this._getEventNamespace()}`, e),
            this._proxyDrag(t);
        }),
        this._resetTransformCache(),
        !!this.findOne(".top-left") && this.update(),
        this
      );
    }
    _proxyDrag(t) {
      let e;
      t.on(`dragstart.${this._getEventNamespace()}`, (i) => {
        (e = t.getAbsolutePosition()),
          this.isDragging() ||
            t === this.findOne(".back") ||
            this.startDrag(i, !1);
      }),
        t.on(`dragmove.${this._getEventNamespace()}`, (i) => {
          if (!e) return;
          const r = t.getAbsolutePosition(),
            a = r.x - e.x,
            n = r.y - e.y;
          this.nodes().forEach((e) => {
            if (e === t) return;
            if (e.isDragging()) return;
            const r = e.getAbsolutePosition();
            e.setAbsolutePosition({ x: r.x + a, y: r.y + n }), e.startDrag(i);
          }),
            (e = null);
        });
    }
    getNodes() {
      return this._nodes || [];
    }
    getActiveAnchor() {
      return this._movingAnchorName;
    }
    detach() {
      this._nodes &&
        this._nodes.forEach((t) => {
          t.off("." + this._getEventNamespace());
        }),
        (this._nodes = []),
        this._resetTransformCache();
    }
    _resetTransformCache() {
      this._clearCache(Qe),
        this._clearCache("transform"),
        this._clearSelfAndDescendantCache("absoluteTransform");
    }
    _getNodeRect() {
      return this._getCache(Qe, this.__getNodeRect);
    }
    __getNodeShape(t, e = this.rotation(), r) {
      var a = t.getClientRect({
          skipTransform: !0,
          skipShadow: !0,
          skipStroke: this.ignoreStroke(),
        }),
        n = t.getAbsoluteScale(r),
        s = t.getAbsolutePosition(r),
        o = a.x * n.x - t.offsetX() * n.x,
        h = a.y * n.y - t.offsetY() * n.y;
      const l =
        (i.getAngle(t.getAbsoluteRotation()) + 2 * Math.PI) % (2 * Math.PI);
      return ei(
        {
          x: s.x + o * Math.cos(l) + h * Math.sin(-l),
          y: s.y + h * Math.cos(l) + o * Math.sin(l),
          width: a.width * n.x,
          height: a.height * n.y,
          rotation: l,
        },
        -i.getAngle(e),
        { x: 0, y: 0 }
      );
    }
    __getNodeRect() {
      if (!this.getNode())
        return { x: -1e8, y: -1e8, width: 0, height: 0, rotation: 0 };
      const t = [];
      this.nodes().map((e) => {
        const i = e.getClientRect({
          skipTransform: !0,
          skipShadow: !0,
          skipStroke: this.ignoreStroke(),
        });
        var r = [
            { x: i.x, y: i.y },
            { x: i.x + i.width, y: i.y },
            { x: i.x + i.width, y: i.y + i.height },
            { x: i.x, y: i.y + i.height },
          ],
          a = e.getAbsoluteTransform();
        r.forEach(function (e) {
          var i = a.point(e);
          t.push(i);
        });
      });
      const e = new a();
      var r, n, s, o;
      e.rotate(-i.getAngle(this.rotation())),
        t.forEach(function (t) {
          var i = e.point(t);
          void 0 === r && ((r = s = i.x), (n = o = i.y)),
            (r = Math.min(r, i.x)),
            (n = Math.min(n, i.y)),
            (s = Math.max(s, i.x)),
            (o = Math.max(o, i.y));
        }),
        e.invert();
      const h = e.point({ x: r, y: n });
      return {
        x: h.x,
        y: h.y,
        width: s - r,
        height: o - n,
        rotation: i.getAngle(this.rotation()),
      };
    }
    getX() {
      return this._getNodeRect().x;
    }
    getY() {
      return this._getNodeRect().y;
    }
    getWidth() {
      return this._getNodeRect().width;
    }
    getHeight() {
      return this._getNodeRect().height;
    }
    _createElements() {
      this._createBack(),
        ti.forEach(
          function (t) {
            this._createAnchor(t);
          }.bind(this)
        ),
        this._createAnchor("rotater");
    }
    _createAnchor(t) {
      var e = new Pe({
          stroke: "rgb(0, 161, 255)",
          fill: "white",
          strokeWidth: 1,
          name: t + " _anchor",
          dragDistance: 0,
          draggable: !0,
          hitStrokeWidth: $e ? 10 : "auto",
        }),
        r = this;
      e.on("mousedown touchstart", function (t) {
        r._handleMouseDown(t);
      }),
        e.on("dragstart", (t) => {
          e.stopDrag(), (t.cancelBubble = !0);
        }),
        e.on("dragend", (t) => {
          t.cancelBubble = !0;
        }),
        e.on("mouseenter", () => {
          var r = i.getAngle(this.rotation()),
            a = (function (t, e) {
              if ("rotater" === t) return "crosshair";
              e += g.degToRad(Ze[t] || 0);
              var i = ((g.radToDeg(e) % 360) + 360) % 360;
              return g._inRange(i, 337.5, 360) || g._inRange(i, 0, 22.5)
                ? "ns-resize"
                : g._inRange(i, 22.5, 67.5)
                ? "nesw-resize"
                : g._inRange(i, 67.5, 112.5)
                ? "ew-resize"
                : g._inRange(i, 112.5, 157.5)
                ? "nwse-resize"
                : g._inRange(i, 157.5, 202.5)
                ? "ns-resize"
                : g._inRange(i, 202.5, 247.5)
                ? "nesw-resize"
                : g._inRange(i, 247.5, 292.5)
                ? "ew-resize"
                : g._inRange(i, 292.5, 337.5)
                ? "nwse-resize"
                : (g.error(
                    "Transformer has unknown angle for cursor detection: " + i
                  ),
                  "pointer");
            })(t, r);
          e.getStage().content && (e.getStage().content.style.cursor = a),
            (this._cursorChange = !0);
        }),
        e.on("mouseout", () => {
          e.getStage().content && (e.getStage().content.style.cursor = ""),
            (this._cursorChange = !1);
        }),
        this.add(e);
    }
    _createBack() {
      var t = new Bt({
        name: "back",
        width: 0,
        height: 0,
        draggable: !0,
        sceneFunc(t) {
          var e = this.getParent(),
            i = e.padding();
          t.beginPath(),
            t.rect(-i, -i, this.width() + 2 * i, this.height() + 2 * i),
            t.moveTo(this.width() / 2, -i),
            e.rotateEnabled() &&
              t.lineTo(
                this.width() / 2,
                -e.rotateAnchorOffset() * g._sign(this.height()) - i
              ),
            t.fillStrokeShape(this);
        },
        hitFunc: (t, e) => {
          if (this.shouldOverdrawWholeArea()) {
            var i = this.padding();
            t.beginPath(),
              t.rect(-i, -i, e.width() + 2 * i, e.height() + 2 * i),
              t.fillStrokeShape(e);
          }
        },
      });
      this.add(t),
        this._proxyDrag(t),
        t.on("dragstart", (t) => {
          t.cancelBubble = !0;
        }),
        t.on("dragmove", (t) => {
          t.cancelBubble = !0;
        }),
        t.on("dragend", (t) => {
          t.cancelBubble = !0;
        }),
        this.on("dragmove", (t) => {
          this.update();
        });
    }
    _handleMouseDown(t) {
      this._movingAnchorName = t.target.name().split(" ")[0];
      var e = this._getNodeRect(),
        i = e.width,
        r = e.height,
        a = Math.sqrt(Math.pow(i, 2) + Math.pow(r, 2));
      (this.sin = Math.abs(r / a)),
        (this.cos = Math.abs(i / a)),
        "undefined" != typeof window &&
          (window.addEventListener("mousemove", this._handleMouseMove),
          window.addEventListener("touchmove", this._handleMouseMove),
          window.addEventListener("mouseup", this._handleMouseUp, !0),
          window.addEventListener("touchend", this._handleMouseUp, !0)),
        (this._transforming = !0);
      var n = t.target.getAbsolutePosition(),
        s = t.target.getStage().getPointerPosition();
      (this._anchorDragOffset = { x: s.x - n.x, y: s.y - n.y }),
        this._fire("transformstart", { evt: t.evt, target: this.getNode() }),
        this._nodes.forEach((e) => {
          e._fire("transformstart", { evt: t.evt, target: e });
        });
    }
    _handleMouseMove(t) {
      var e,
        r,
        a,
        n = this.findOne("." + this._movingAnchorName),
        s = n.getStage();
      s.setPointersPositions(t);
      const o = s.getPointerPosition();
      let h = {
        x: o.x - this._anchorDragOffset.x,
        y: o.y - this._anchorDragOffset.y,
      };
      const l = n.getAbsolutePosition();
      this.anchorDragBoundFunc() && (h = this.anchorDragBoundFunc()(l, h, t)),
        n.setAbsolutePosition(h);
      const d = n.getAbsolutePosition();
      if (l.x !== d.x || l.y !== d.y)
        if ("rotater" !== this._movingAnchorName) {
          var c,
            g = this.shiftBehavior();
          c =
            "inverted" === g
              ? this.keepRatio() && !t.shiftKey
              : "none" === g
              ? this.keepRatio()
              : this.keepRatio() || t.shiftKey;
          var u = this.centeredScaling() || t.altKey;
          if ("top-left" === this._movingAnchorName) {
            if (c) {
              var f = u
                ? { x: this.width() / 2, y: this.height() / 2 }
                : {
                    x: this.findOne(".bottom-right").x(),
                    y: this.findOne(".bottom-right").y(),
                  };
              a = Math.sqrt(
                Math.pow(f.x - n.x(), 2) + Math.pow(f.y - n.y(), 2)
              );
              var p = this.findOne(".top-left").x() > f.x ? -1 : 1,
                v = this.findOne(".top-left").y() > f.y ? -1 : 1;
              (e = a * this.cos * p),
                (r = a * this.sin * v),
                this.findOne(".top-left").x(f.x - e),
                this.findOne(".top-left").y(f.y - r);
            }
          } else if ("top-center" === this._movingAnchorName)
            this.findOne(".top-left").y(n.y());
          else if ("top-right" === this._movingAnchorName) {
            if (c) {
              f = u
                ? { x: this.width() / 2, y: this.height() / 2 }
                : {
                    x: this.findOne(".bottom-left").x(),
                    y: this.findOne(".bottom-left").y(),
                  };
              a = Math.sqrt(
                Math.pow(n.x() - f.x, 2) + Math.pow(f.y - n.y(), 2)
              );
              (p = this.findOne(".top-right").x() < f.x ? -1 : 1),
                (v = this.findOne(".top-right").y() > f.y ? -1 : 1);
              (e = a * this.cos * p),
                (r = a * this.sin * v),
                this.findOne(".top-right").x(f.x + e),
                this.findOne(".top-right").y(f.y - r);
            }
            var m = n.position();
            this.findOne(".top-left").y(m.y),
              this.findOne(".bottom-right").x(m.x);
          } else if ("middle-left" === this._movingAnchorName)
            this.findOne(".top-left").x(n.x());
          else if ("middle-right" === this._movingAnchorName)
            this.findOne(".bottom-right").x(n.x());
          else if ("bottom-left" === this._movingAnchorName) {
            if (c) {
              f = u
                ? { x: this.width() / 2, y: this.height() / 2 }
                : {
                    x: this.findOne(".top-right").x(),
                    y: this.findOne(".top-right").y(),
                  };
              a = Math.sqrt(
                Math.pow(f.x - n.x(), 2) + Math.pow(n.y() - f.y, 2)
              );
              (p = f.x < n.x() ? -1 : 1), (v = n.y() < f.y ? -1 : 1);
              (e = a * this.cos * p),
                (r = a * this.sin * v),
                n.x(f.x - e),
                n.y(f.y + r);
            }
            (m = n.position()),
              this.findOne(".top-left").x(m.x),
              this.findOne(".bottom-right").y(m.y);
          } else if ("bottom-center" === this._movingAnchorName)
            this.findOne(".bottom-right").y(n.y());
          else if ("bottom-right" === this._movingAnchorName) {
            if (c) {
              f = u
                ? { x: this.width() / 2, y: this.height() / 2 }
                : {
                    x: this.findOne(".top-left").x(),
                    y: this.findOne(".top-left").y(),
                  };
              a = Math.sqrt(
                Math.pow(n.x() - f.x, 2) + Math.pow(n.y() - f.y, 2)
              );
              (p = this.findOne(".bottom-right").x() < f.x ? -1 : 1),
                (v = this.findOne(".bottom-right").y() < f.y ? -1 : 1);
              (e = a * this.cos * p),
                (r = a * this.sin * v),
                this.findOne(".bottom-right").x(f.x + e),
                this.findOne(".bottom-right").y(f.y + r);
            }
          } else
            console.error(
              new Error(
                "Wrong position argument of selection resizer: " +
                  this._movingAnchorName
              )
            );
          if ((u = this.centeredScaling() || t.altKey)) {
            var _ = this.findOne(".top-left"),
              y = this.findOne(".bottom-right"),
              x = _.x(),
              b = _.y(),
              S = this.getWidth() - y.x(),
              w = this.getHeight() - y.y();
            y.move({ x: -x, y: -b }), _.move({ x: S, y: w });
          }
          var C = this.findOne(".top-left").getAbsolutePosition();
          (e = C.x), (r = C.y);
          var P =
              this.findOne(".bottom-right").x() - this.findOne(".top-left").x(),
            k =
              this.findOne(".bottom-right").y() - this.findOne(".top-left").y();
          this._fitNodesInto(
            {
              x: e,
              y: r,
              width: P,
              height: k,
              rotation: i.getAngle(this.rotation()),
            },
            t
          );
        } else {
          var T = this._getNodeRect();
          (e = n.x() - T.width / 2), (r = -n.y() + T.height / 2);
          let a = Math.atan2(-r, e) + Math.PI / 2;
          T.height < 0 && (a -= Math.PI);
          const s = i.getAngle(this.rotation()) + a,
            o = i.getAngle(this.rotationSnapTolerance()),
            h = ii(
              T,
              (function (t, e, r) {
                let a = e;
                for (let n = 0; n < t.length; n++) {
                  const s = i.getAngle(t[n]),
                    o = Math.abs(s - e) % (2 * Math.PI);
                  Math.min(o, 2 * Math.PI - o) < r && (a = s);
                }
                return a;
              })(this.rotationSnaps(), s, o) - T.rotation
            );
          this._fitNodesInto(h, t);
        }
    }
    _handleMouseUp(t) {
      this._removeEvents(t);
    }
    getAbsoluteTransform() {
      return this.getTransform();
    }
    _removeEvents(t) {
      if (this._transforming) {
        (this._transforming = !1),
          "undefined" != typeof window &&
            (window.removeEventListener("mousemove", this._handleMouseMove),
            window.removeEventListener("touchmove", this._handleMouseMove),
            window.removeEventListener("mouseup", this._handleMouseUp, !0),
            window.removeEventListener("touchend", this._handleMouseUp, !0));
        var e = this.getNode();
        this._fire("transformend", { evt: t, target: e }),
          e &&
            this._nodes.forEach((e) => {
              e._fire("transformend", { evt: t, target: e });
            }),
          (this._movingAnchorName = null);
      }
    }
    _fitNodesInto(t, e) {
      var r = this._getNodeRect();
      if (g._inRange(t.width, 2 * -this.padding() - 1, 1))
        return void this.update();
      if (g._inRange(t.height, 2 * -this.padding() - 1, 1))
        return void this.update();
      const n = this.flipEnabled();
      var s = new a();
      if (
        (s.rotate(i.getAngle(this.rotation())),
        this._movingAnchorName &&
          t.width < 0 &&
          this._movingAnchorName.indexOf("left") >= 0)
      ) {
        const e = s.point({ x: 2 * -this.padding(), y: 0 });
        if (
          ((t.x += e.x),
          (t.y += e.y),
          (t.width += 2 * this.padding()),
          (this._movingAnchorName = this._movingAnchorName.replace(
            "left",
            "right"
          )),
          (this._anchorDragOffset.x -= e.x),
          (this._anchorDragOffset.y -= e.y),
          !n)
        )
          return void this.update();
      } else if (
        this._movingAnchorName &&
        t.width < 0 &&
        this._movingAnchorName.indexOf("right") >= 0
      ) {
        const e = s.point({ x: 2 * this.padding(), y: 0 });
        if (
          ((this._movingAnchorName = this._movingAnchorName.replace(
            "right",
            "left"
          )),
          (this._anchorDragOffset.x -= e.x),
          (this._anchorDragOffset.y -= e.y),
          (t.width += 2 * this.padding()),
          !n)
        )
          return void this.update();
      }
      if (
        this._movingAnchorName &&
        t.height < 0 &&
        this._movingAnchorName.indexOf("top") >= 0
      ) {
        const e = s.point({ x: 0, y: 2 * -this.padding() });
        if (
          ((t.x += e.x),
          (t.y += e.y),
          (this._movingAnchorName = this._movingAnchorName.replace(
            "top",
            "bottom"
          )),
          (this._anchorDragOffset.x -= e.x),
          (this._anchorDragOffset.y -= e.y),
          (t.height += 2 * this.padding()),
          !n)
        )
          return void this.update();
      } else if (
        this._movingAnchorName &&
        t.height < 0 &&
        this._movingAnchorName.indexOf("bottom") >= 0
      ) {
        const e = s.point({ x: 0, y: 2 * this.padding() });
        if (
          ((this._movingAnchorName = this._movingAnchorName.replace(
            "bottom",
            "top"
          )),
          (this._anchorDragOffset.x -= e.x),
          (this._anchorDragOffset.y -= e.y),
          (t.height += 2 * this.padding()),
          !n)
        )
          return void this.update();
      }
      if (this.boundBoxFunc()) {
        const e = this.boundBoxFunc()(r, t);
        e
          ? (t = e)
          : g.warn(
              "boundBoxFunc returned falsy. You should return new bound rect from it!"
            );
      }
      const o = 1e7,
        h = new a();
      h.translate(r.x, r.y),
        h.rotate(r.rotation),
        h.scale(r.width / o, r.height / o);
      const l = new a();
      l.translate(t.x, t.y),
        l.rotate(t.rotation),
        l.scale(t.width / o, t.height / o);
      const d = l.multiply(h.invert());
      this._nodes.forEach((t) => {
        var i;
        const r = t.getParent().getAbsoluteTransform(),
          n = t.getTransform().copy();
        n.translate(t.offsetX(), t.offsetY());
        const s = new a();
        s.multiply(r.copy().invert()).multiply(d).multiply(r).multiply(n);
        const o = s.decompose();
        t.setAttrs(o),
          this._fire("transform", { evt: e, target: t }),
          t._fire("transform", { evt: e, target: t }),
          null === (i = t.getLayer()) || void 0 === i || i.batchDraw();
      }),
        this.rotation(g._getRotation(t.rotation)),
        this._resetTransformCache(),
        this.update(),
        this.getLayer().batchDraw();
    }
    forceUpdate() {
      this._resetTransformCache(), this.update();
    }
    _batchChangeChild(t, e) {
      this.findOne(t).setAttrs(e);
    }
    update() {
      var t,
        e = this._getNodeRect();
      this.rotation(g._getRotation(e.rotation));
      var i = e.width,
        r = e.height,
        a = this.enabledAnchors(),
        n = this.resizeEnabled(),
        s = this.padding(),
        o = this.anchorSize();
      const h = this.find("._anchor");
      h.forEach((t) => {
        t.setAttrs({
          width: o,
          height: o,
          offsetX: o / 2,
          offsetY: o / 2,
          stroke: this.anchorStroke(),
          strokeWidth: this.anchorStrokeWidth(),
          fill: this.anchorFill(),
          cornerRadius: this.anchorCornerRadius(),
        });
      }),
        this._batchChangeChild(".top-left", {
          x: 0,
          y: 0,
          offsetX: o / 2 + s,
          offsetY: o / 2 + s,
          visible: n && a.indexOf("top-left") >= 0,
        }),
        this._batchChangeChild(".top-center", {
          x: i / 2,
          y: 0,
          offsetY: o / 2 + s,
          visible: n && a.indexOf("top-center") >= 0,
        }),
        this._batchChangeChild(".top-right", {
          x: i,
          y: 0,
          offsetX: o / 2 - s,
          offsetY: o / 2 + s,
          visible: n && a.indexOf("top-right") >= 0,
        }),
        this._batchChangeChild(".middle-left", {
          x: 0,
          y: r / 2,
          offsetX: o / 2 + s,
          visible: n && a.indexOf("middle-left") >= 0,
        }),
        this._batchChangeChild(".middle-right", {
          x: i,
          y: r / 2,
          offsetX: o / 2 - s,
          visible: n && a.indexOf("middle-right") >= 0,
        }),
        this._batchChangeChild(".bottom-left", {
          x: 0,
          y: r,
          offsetX: o / 2 + s,
          offsetY: o / 2 - s,
          visible: n && a.indexOf("bottom-left") >= 0,
        }),
        this._batchChangeChild(".bottom-center", {
          x: i / 2,
          y: r,
          offsetY: o / 2 - s,
          visible: n && a.indexOf("bottom-center") >= 0,
        }),
        this._batchChangeChild(".bottom-right", {
          x: i,
          y: r,
          offsetX: o / 2 - s,
          offsetY: o / 2 - s,
          visible: n && a.indexOf("bottom-right") >= 0,
        }),
        this._batchChangeChild(".rotater", {
          x: i / 2,
          y: -this.rotateAnchorOffset() * g._sign(r) - s,
          visible: this.rotateEnabled(),
        }),
        this._batchChangeChild(".back", {
          width: i,
          height: r,
          visible: this.borderEnabled(),
          stroke: this.borderStroke(),
          strokeWidth: this.borderStrokeWidth(),
          dash: this.borderDash(),
          x: 0,
          y: 0,
        });
      const l = this.anchorStyleFunc();
      l &&
        h.forEach((t) => {
          l(t);
        }),
        null === (t = this.getLayer()) || void 0 === t || t.batchDraw();
    }
    isTransforming() {
      return this._transforming;
    }
    stopTransform() {
      if (this._transforming) {
        this._removeEvents();
        var t = this.findOne("." + this._movingAnchorName);
        t && t.stopDrag();
      }
    }
    destroy() {
      return (
        this.getStage() &&
          this._cursorChange &&
          this.getStage().content &&
          (this.getStage().content.style.cursor = ""),
        Xt.prototype.destroy.call(this),
        this.detach(),
        this._removeEvents(),
        this
      );
    }
    toObject() {
      return K.prototype.toObject.call(this);
    }
    clone(t) {
      return K.prototype.clone.call(this, t);
    }
    getClientRect() {
      return this.nodes().length > 0
        ? super.getClientRect()
        : { x: 0, y: 0, width: 0, height: 0 };
    }
  }
  (ri.prototype.className = "Transformer"),
    r(ri),
    w.addGetterSetter(ri, "enabledAnchors", ti, function (t) {
      return (
        t instanceof Array || g.warn("enabledAnchors value should be an array"),
        t instanceof Array &&
          t.forEach(function (t) {
            -1 === ti.indexOf(t) &&
              g.warn(
                "Unknown anchor name: " +
                  t +
                  ". Available names are: " +
                  ti.join(", ")
              );
          }),
        t || []
      );
    }),
    w.addGetterSetter(ri, "flipEnabled", !0, x()),
    w.addGetterSetter(ri, "resizeEnabled", !0),
    w.addGetterSetter(ri, "anchorSize", 10, p()),
    w.addGetterSetter(ri, "rotateEnabled", !0),
    w.addGetterSetter(ri, "rotationSnaps", []),
    w.addGetterSetter(ri, "rotateAnchorOffset", 50, p()),
    w.addGetterSetter(ri, "rotationSnapTolerance", 5, p()),
    w.addGetterSetter(ri, "borderEnabled", !0),
    w.addGetterSetter(ri, "anchorStroke", "rgb(0, 161, 255)"),
    w.addGetterSetter(ri, "anchorStrokeWidth", 1, p()),
    w.addGetterSetter(ri, "anchorFill", "white"),
    w.addGetterSetter(ri, "anchorCornerRadius", 0, p()),
    w.addGetterSetter(ri, "borderStroke", "rgb(0, 161, 255)"),
    w.addGetterSetter(ri, "borderStrokeWidth", 1, p()),
    w.addGetterSetter(ri, "borderDash"),
    w.addGetterSetter(ri, "keepRatio", !0),
    w.addGetterSetter(ri, "shiftBehavior", "default"),
    w.addGetterSetter(ri, "centeredScaling", !1),
    w.addGetterSetter(ri, "ignoreStroke", !1),
    w.addGetterSetter(ri, "padding", 0, p()),
    w.addGetterSetter(ri, "node"),
    w.addGetterSetter(ri, "nodes"),
    w.addGetterSetter(ri, "boundBoxFunc"),
    w.addGetterSetter(ri, "anchorDragBoundFunc"),
    w.addGetterSetter(ri, "anchorStyleFunc"),
    w.addGetterSetter(ri, "shouldOverdrawWholeArea", !1),
    w.addGetterSetter(ri, "useSingleNodeRotation", !0),
    w.backCompat(ri, {
      lineEnabled: "borderEnabled",
      rotateHandlerOffset: "rotateAnchorOffset",
      enabledHandlers: "enabledAnchors",
    });
  class ai extends Bt {
    _sceneFunc(t) {
      t.beginPath(),
        t.arc(
          0,
          0,
          this.radius(),
          0,
          i.getAngle(this.angle()),
          this.clockwise()
        ),
        t.lineTo(0, 0),
        t.closePath(),
        t.fillStrokeShape(this);
    }
    getWidth() {
      return 2 * this.radius();
    }
    getHeight() {
      return 2 * this.radius();
    }
    setWidth(t) {
      this.radius(t / 2);
    }
    setHeight(t) {
      this.radius(t / 2);
    }
  }
  function ni() {
    (this.r = 0), (this.g = 0), (this.b = 0), (this.a = 0), (this.next = null);
  }
  (ai.prototype.className = "Wedge"),
    (ai.prototype._centroid = !0),
    (ai.prototype._attrsAffectingSize = ["radius"]),
    r(ai),
    w.addGetterSetter(ai, "radius", 0, p()),
    w.addGetterSetter(ai, "angle", 0, p()),
    w.addGetterSetter(ai, "clockwise", !1),
    w.backCompat(ai, {
      angleDeg: "angle",
      getAngleDeg: "getAngle",
      setAngleDeg: "setAngle",
    });
  var si = [
      512, 512, 456, 512, 328, 456, 335, 512, 405, 328, 271, 456, 388, 335, 292,
      512, 454, 405, 364, 328, 298, 271, 496, 456, 420, 388, 360, 335, 312, 292,
      273, 512, 482, 454, 428, 405, 383, 364, 345, 328, 312, 298, 284, 271, 259,
      496, 475, 456, 437, 420, 404, 388, 374, 360, 347, 335, 323, 312, 302, 292,
      282, 273, 265, 512, 497, 482, 468, 454, 441, 428, 417, 405, 394, 383, 373,
      364, 354, 345, 337, 328, 320, 312, 305, 298, 291, 284, 278, 271, 265, 259,
      507, 496, 485, 475, 465, 456, 446, 437, 428, 420, 412, 404, 396, 388, 381,
      374, 367, 360, 354, 347, 341, 335, 329, 323, 318, 312, 307, 302, 297, 292,
      287, 282, 278, 273, 269, 265, 261, 512, 505, 497, 489, 482, 475, 468, 461,
      454, 447, 441, 435, 428, 422, 417, 411, 405, 399, 394, 389, 383, 378, 373,
      368, 364, 359, 354, 350, 345, 341, 337, 332, 328, 324, 320, 316, 312, 309,
      305, 301, 298, 294, 291, 287, 284, 281, 278, 274, 271, 268, 265, 262, 259,
      257, 507, 501, 496, 491, 485, 480, 475, 470, 465, 460, 456, 451, 446, 442,
      437, 433, 428, 424, 420, 416, 412, 408, 404, 400, 396, 392, 388, 385, 381,
      377, 374, 370, 367, 363, 360, 357, 354, 350, 347, 344, 341, 338, 335, 332,
      329, 326, 323, 320, 318, 315, 312, 310, 307, 304, 302, 299, 297, 294, 292,
      289, 287, 285, 282, 280, 278, 275, 273, 271, 269, 267, 265, 263, 261, 259,
    ],
    oi = [
      9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17, 17, 17, 17,
      17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19, 19, 19, 19, 19, 19,
      19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20,
      20, 20, 20, 20, 20, 20, 20, 20, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
      21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22,
      22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
      22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
      23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
      23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
      23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
      24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
      24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
      24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
      24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
      24, 24,
    ];
  w.addGetterSetter(K, "blurRadius", 0, p(), w.afterSetFilter);
  w.addGetterSetter(K, "brightness", 0, p(), w.afterSetFilter);
  w.addGetterSetter(K, "contrast", 0, p(), w.afterSetFilter);
  function hi(t, e, i, r, a) {
    var n = i - e,
      s = a - r;
    return 0 === n ? r + s / 2 : 0 === s ? r : s * ((t - e) / n) + r;
  }
  w.addGetterSetter(K, "embossStrength", 0.5, p(), w.afterSetFilter),
    w.addGetterSetter(K, "embossWhiteLevel", 0.5, p(), w.afterSetFilter),
    w.addGetterSetter(K, "embossDirection", "top-left", null, w.afterSetFilter),
    w.addGetterSetter(K, "embossBlend", !1, null, w.afterSetFilter);
  w.addGetterSetter(K, "enhance", 0, p(), w.afterSetFilter);
  w.addGetterSetter(K, "hue", 0, p(), w.afterSetFilter),
    w.addGetterSetter(K, "saturation", 0, p(), w.afterSetFilter),
    w.addGetterSetter(K, "luminance", 0, p(), w.afterSetFilter);
  w.addGetterSetter(K, "hue", 0, p(), w.afterSetFilter),
    w.addGetterSetter(K, "saturation", 0, p(), w.afterSetFilter),
    w.addGetterSetter(K, "value", 0, p(), w.afterSetFilter);
  function li(t, e, i) {
    var r = 4 * (i * t.width + e),
      a = [];
    return a.push(t.data[r++], t.data[r++], t.data[r++], t.data[r++]), a;
  }
  function di(t, e) {
    return Math.sqrt(
      Math.pow(t[0] - e[0], 2) +
        Math.pow(t[1] - e[1], 2) +
        Math.pow(t[2] - e[2], 2)
    );
  }
  w.addGetterSetter(K, "kaleidoscopePower", 2, p(), w.afterSetFilter),
    w.addGetterSetter(K, "kaleidoscopeAngle", 0, p(), w.afterSetFilter);
  w.addGetterSetter(K, "threshold", 0, p(), w.afterSetFilter);
  w.addGetterSetter(K, "noise", 0.2, p(), w.afterSetFilter);
  w.addGetterSetter(K, "pixelSize", 8, p(), w.afterSetFilter);
  w.addGetterSetter(K, "levels", 0.5, p(), w.afterSetFilter);
  w.addGetterSetter(K, "red", 0, function (t) {
    return (
      (this._filterUpToDate = !1), t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    );
  }),
    w.addGetterSetter(K, "green", 0, function (t) {
      return (
        (this._filterUpToDate = !1), t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
      );
    }),
    w.addGetterSetter(K, "blue", 0, f, w.afterSetFilter);
  w.addGetterSetter(K, "red", 0, function (t) {
    return (
      (this._filterUpToDate = !1), t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
    );
  }),
    w.addGetterSetter(K, "green", 0, function (t) {
      return (
        (this._filterUpToDate = !1), t > 255 ? 255 : t < 0 ? 0 : Math.round(t)
      );
    }),
    w.addGetterSetter(K, "blue", 0, f, w.afterSetFilter),
    w.addGetterSetter(K, "alpha", 1, function (t) {
      return (this._filterUpToDate = !1), t > 1 ? 1 : t < 0 ? 0 : t;
    });
  w.addGetterSetter(K, "threshold", 0.5, p(), w.afterSetFilter);
  return $t.Util._assign($t, {
    Arc: te,
    Arrow: ue,
    Circle: fe,
    Ellipse: pe,
    Image: ve,
    Label: we,
    Tag: Ce,
    Line: re,
    Path: ge,
    Rect: Pe,
    RegularPolygon: ke,
    Ring: Ae,
    Sprite: Me,
    Star: Ge,
    Text: Ye,
    TextPath: Ue,
    Transformer: ri,
    Wedge: ai,
    Filters: {
      Blur: function (t) {
        var e = Math.round(this.blurRadius());
        e > 0 &&
          (function (t, e) {
            var i,
              r,
              a,
              n,
              s,
              o,
              h,
              l,
              d,
              c,
              g,
              u,
              f,
              p,
              v,
              m,
              _,
              y,
              x,
              b,
              S,
              w,
              C,
              P,
              k = t.data,
              T = t.width,
              A = t.height,
              M = e + e + 1,
              G = T - 1,
              R = A - 1,
              E = e + 1,
              D = (E * (E + 1)) / 2,
              L = new ni(),
              O = null,
              I = L,
              F = null,
              N = null,
              B = si[e],
              H = oi[e];
            for (a = 1; a < M; a++) (I = I.next = new ni()), a === E && (O = I);
            for (I.next = L, h = o = 0, r = 0; r < A; r++) {
              for (
                m = _ = y = x = l = d = c = g = 0,
                  u = E * (b = k[o]),
                  f = E * (S = k[o + 1]),
                  p = E * (w = k[o + 2]),
                  v = E * (C = k[o + 3]),
                  l += D * b,
                  d += D * S,
                  c += D * w,
                  g += D * C,
                  I = L,
                  a = 0;
                a < E;
                a++
              )
                (I.r = b), (I.g = S), (I.b = w), (I.a = C), (I = I.next);
              for (a = 1; a < E; a++)
                (n = o + ((G < a ? G : a) << 2)),
                  (l += (I.r = b = k[n]) * (P = E - a)),
                  (d += (I.g = S = k[n + 1]) * P),
                  (c += (I.b = w = k[n + 2]) * P),
                  (g += (I.a = C = k[n + 3]) * P),
                  (m += b),
                  (_ += S),
                  (y += w),
                  (x += C),
                  (I = I.next);
              for (F = L, N = O, i = 0; i < T; i++)
                (k[o + 3] = C = (g * B) >> H),
                  0 !== C
                    ? ((C = 255 / C),
                      (k[o] = ((l * B) >> H) * C),
                      (k[o + 1] = ((d * B) >> H) * C),
                      (k[o + 2] = ((c * B) >> H) * C))
                    : (k[o] = k[o + 1] = k[o + 2] = 0),
                  (l -= u),
                  (d -= f),
                  (c -= p),
                  (g -= v),
                  (u -= F.r),
                  (f -= F.g),
                  (p -= F.b),
                  (v -= F.a),
                  (n = (h + ((n = i + e + 1) < G ? n : G)) << 2),
                  (l += m += F.r = k[n]),
                  (d += _ += F.g = k[n + 1]),
                  (c += y += F.b = k[n + 2]),
                  (g += x += F.a = k[n + 3]),
                  (F = F.next),
                  (u += b = N.r),
                  (f += S = N.g),
                  (p += w = N.b),
                  (v += C = N.a),
                  (m -= b),
                  (_ -= S),
                  (y -= w),
                  (x -= C),
                  (N = N.next),
                  (o += 4);
              h += T;
            }
            for (i = 0; i < T; i++) {
              for (
                _ = y = x = m = d = c = g = l = 0,
                  u = E * (b = k[(o = i << 2)]),
                  f = E * (S = k[o + 1]),
                  p = E * (w = k[o + 2]),
                  v = E * (C = k[o + 3]),
                  l += D * b,
                  d += D * S,
                  c += D * w,
                  g += D * C,
                  I = L,
                  a = 0;
                a < E;
                a++
              )
                (I.r = b), (I.g = S), (I.b = w), (I.a = C), (I = I.next);
              for (s = T, a = 1; a <= e; a++)
                (o = (s + i) << 2),
                  (l += (I.r = b = k[o]) * (P = E - a)),
                  (d += (I.g = S = k[o + 1]) * P),
                  (c += (I.b = w = k[o + 2]) * P),
                  (g += (I.a = C = k[o + 3]) * P),
                  (m += b),
                  (_ += S),
                  (y += w),
                  (x += C),
                  (I = I.next),
                  a < R && (s += T);
              for (o = i, F = L, N = O, r = 0; r < A; r++)
                (k[3 + (n = o << 2)] = C = (g * B) >> H),
                  C > 0
                    ? ((C = 255 / C),
                      (k[n] = ((l * B) >> H) * C),
                      (k[n + 1] = ((d * B) >> H) * C),
                      (k[n + 2] = ((c * B) >> H) * C))
                    : (k[n] = k[n + 1] = k[n + 2] = 0),
                  (l -= u),
                  (d -= f),
                  (c -= p),
                  (g -= v),
                  (u -= F.r),
                  (f -= F.g),
                  (p -= F.b),
                  (v -= F.a),
                  (n = (i + ((n = r + E) < R ? n : R) * T) << 2),
                  (l += m += F.r = k[n]),
                  (d += _ += F.g = k[n + 1]),
                  (c += y += F.b = k[n + 2]),
                  (g += x += F.a = k[n + 3]),
                  (F = F.next),
                  (u += b = N.r),
                  (f += S = N.g),
                  (p += w = N.b),
                  (v += C = N.a),
                  (m -= b),
                  (_ -= S),
                  (y -= w),
                  (x -= C),
                  (N = N.next),
                  (o += T);
            }
          })(t, e);
      },
      Brighten: function (t) {
        var e,
          i = 255 * this.brightness(),
          r = t.data,
          a = r.length;
        for (e = 0; e < a; e += 4)
          (r[e] += i), (r[e + 1] += i), (r[e + 2] += i);
      },
      Contrast: function (t) {
        var e,
          i = Math.pow((this.contrast() + 100) / 100, 2),
          r = t.data,
          a = r.length,
          n = 150,
          s = 150,
          o = 150;
        for (e = 0; e < a; e += 4)
          (n = r[e]),
            (s = r[e + 1]),
            (o = r[e + 2]),
            (n /= 255),
            (n -= 0.5),
            (n *= i),
            (n += 0.5),
            (s /= 255),
            (s -= 0.5),
            (s *= i),
            (s += 0.5),
            (o /= 255),
            (o -= 0.5),
            (o *= i),
            (o += 0.5),
            (n = (n *= 255) < 0 ? 0 : n > 255 ? 255 : n),
            (s = (s *= 255) < 0 ? 0 : s > 255 ? 255 : s),
            (o = (o *= 255) < 0 ? 0 : o > 255 ? 255 : o),
            (r[e] = n),
            (r[e + 1] = s),
            (r[e + 2] = o);
      },
      Emboss: function (t) {
        var e = 10 * this.embossStrength(),
          i = 255 * this.embossWhiteLevel(),
          r = this.embossDirection(),
          a = this.embossBlend(),
          n = 0,
          s = 0,
          o = t.data,
          h = t.width,
          l = t.height,
          d = 4 * h,
          c = l;
        switch (r) {
          case "top-left":
            (n = -1), (s = -1);
            break;
          case "top":
            (n = -1), (s = 0);
            break;
          case "top-right":
            (n = -1), (s = 1);
            break;
          case "right":
            (n = 0), (s = 1);
            break;
          case "bottom-right":
            (n = 1), (s = 1);
            break;
          case "bottom":
            (n = 1), (s = 0);
            break;
          case "bottom-left":
            (n = 1), (s = -1);
            break;
          case "left":
            (n = 0), (s = -1);
            break;
          default:
            g.error("Unknown emboss direction: " + r);
        }
        do {
          var u = (c - 1) * d,
            f = n;
          c + f < 1 && (f = 0), c + f > l && (f = 0);
          var p = (c - 1 + f) * h * 4,
            v = h;
          do {
            var m = u + 4 * (v - 1),
              _ = s;
            v + _ < 1 && (_ = 0), v + _ > h && (_ = 0);
            var y = p + 4 * (v - 1 + _),
              x = o[m] - o[y],
              b = o[m + 1] - o[y + 1],
              S = o[m + 2] - o[y + 2],
              w = x,
              C = w > 0 ? w : -w;
            if (
              ((b > 0 ? b : -b) > C && (w = b),
              (S > 0 ? S : -S) > C && (w = S),
              (w *= e),
              a)
            ) {
              var P = o[m] + w,
                k = o[m + 1] + w,
                T = o[m + 2] + w;
              (o[m] = P > 255 ? 255 : P < 0 ? 0 : P),
                (o[m + 1] = k > 255 ? 255 : k < 0 ? 0 : k),
                (o[m + 2] = T > 255 ? 255 : T < 0 ? 0 : T);
            } else {
              var A = i - w;
              A < 0 ? (A = 0) : A > 255 && (A = 255),
                (o[m] = o[m + 1] = o[m + 2] = A);
            }
          } while (--v);
        } while (--c);
      },
      Enhance: function (t) {
        var e,
          i,
          r,
          a,
          n = t.data,
          s = n.length,
          o = n[0],
          h = o,
          l = n[1],
          d = l,
          c = n[2],
          g = c,
          u = this.enhance();
        if (0 !== u) {
          for (a = 0; a < s; a += 4)
            (e = n[a + 0]) < o ? (o = e) : e > h && (h = e),
              (i = n[a + 1]) < l ? (l = i) : i > d && (d = i),
              (r = n[a + 2]) < c ? (c = r) : r > g && (g = r);
          var f, p, v, m, _, y, x, b, S;
          for (
            h === o && ((h = 255), (o = 0)),
              d === l && ((d = 255), (l = 0)),
              g === c && ((g = 255), (c = 0)),
              u > 0
                ? ((p = h + u * (255 - h)),
                  (v = o - u * (o - 0)),
                  (_ = d + u * (255 - d)),
                  (y = l - u * (l - 0)),
                  (b = g + u * (255 - g)),
                  (S = c - u * (c - 0)))
                : ((p = h + u * (h - (f = 0.5 * (h + o)))),
                  (v = o + u * (o - f)),
                  (_ = d + u * (d - (m = 0.5 * (d + l)))),
                  (y = l + u * (l - m)),
                  (b = g + u * (g - (x = 0.5 * (g + c)))),
                  (S = c + u * (c - x))),
              a = 0;
            a < s;
            a += 4
          )
            (n[a + 0] = hi(n[a + 0], o, h, v, p)),
              (n[a + 1] = hi(n[a + 1], l, d, y, _)),
              (n[a + 2] = hi(n[a + 2], c, g, S, b));
        }
      },
      Grayscale: function (t) {
        var e,
          i,
          r = t.data,
          a = r.length;
        for (e = 0; e < a; e += 4)
          (i = 0.34 * r[e] + 0.5 * r[e + 1] + 0.16 * r[e + 2]),
            (r[e] = i),
            (r[e + 1] = i),
            (r[e + 2] = i);
      },
      HSL: function (t) {
        var e,
          i,
          r,
          a,
          n,
          s = t.data,
          o = s.length,
          h = Math.pow(2, this.saturation()),
          l = Math.abs(this.hue() + 360) % 360,
          d = 127 * this.luminance(),
          c = 1 * h * Math.cos((l * Math.PI) / 180),
          g = 1 * h * Math.sin((l * Math.PI) / 180),
          u = 0.299 + 0.701 * c + 0.167 * g,
          f = 0.587 - 0.587 * c + 0.33 * g,
          p = 0.114 - 0.114 * c - 0.497 * g,
          v = 0.299 - 0.299 * c - 0.328 * g,
          m = 0.587 + 0.413 * c + 0.035 * g,
          _ = 0.114 - 0.114 * c + 0.293 * g,
          y = 0.299 - 0.3 * c + 1.25 * g,
          x = 0.587 - 0.586 * c - 1.05 * g,
          b = 0.114 + 0.886 * c - 0.2 * g;
        for (e = 0; e < o; e += 4)
          (i = s[e + 0]),
            (r = s[e + 1]),
            (a = s[e + 2]),
            (n = s[e + 3]),
            (s[e + 0] = u * i + f * r + p * a + d),
            (s[e + 1] = v * i + m * r + _ * a + d),
            (s[e + 2] = y * i + x * r + b * a + d),
            (s[e + 3] = n);
      },
      HSV: function (t) {
        var e,
          i,
          r,
          a,
          n,
          s = t.data,
          o = s.length,
          h = Math.pow(2, this.value()),
          l = Math.pow(2, this.saturation()),
          d = Math.abs(this.hue() + 360) % 360,
          c = h * l * Math.cos((d * Math.PI) / 180),
          g = h * l * Math.sin((d * Math.PI) / 180),
          u = 0.299 * h + 0.701 * c + 0.167 * g,
          f = 0.587 * h - 0.587 * c + 0.33 * g,
          p = 0.114 * h - 0.114 * c - 0.497 * g,
          v = 0.299 * h - 0.299 * c - 0.328 * g,
          m = 0.587 * h + 0.413 * c + 0.035 * g,
          _ = 0.114 * h - 0.114 * c + 0.293 * g,
          y = 0.299 * h - 0.3 * c + 1.25 * g,
          x = 0.587 * h - 0.586 * c - 1.05 * g,
          b = 0.114 * h + 0.886 * c - 0.2 * g;
        for (e = 0; e < o; e += 4)
          (i = s[e + 0]),
            (r = s[e + 1]),
            (a = s[e + 2]),
            (n = s[e + 3]),
            (s[e + 0] = u * i + f * r + p * a),
            (s[e + 1] = v * i + m * r + _ * a),
            (s[e + 2] = y * i + x * r + b * a),
            (s[e + 3] = n);
      },
      Invert: function (t) {
        var e,
          i = t.data,
          r = i.length;
        for (e = 0; e < r; e += 4)
          (i[e] = 255 - i[e]),
            (i[e + 1] = 255 - i[e + 1]),
            (i[e + 2] = 255 - i[e + 2]);
      },
      Kaleidoscope: function (t) {
        var e,
          i,
          r,
          a,
          n,
          s,
          o,
          h,
          l,
          d = t.width,
          c = t.height,
          u = Math.round(this.kaleidoscopePower()),
          f = Math.round(this.kaleidoscopeAngle()),
          p = Math.floor((d * (f % 360)) / 360);
        if (!(u < 1)) {
          var v = g.createCanvasElement();
          (v.width = d), (v.height = c);
          var m = v.getContext("2d").getImageData(0, 0, d, c);
          g.releaseCanvas(v),
            (function (t, e, i) {
              var r,
                a,
                n,
                s,
                o = t.data,
                h = e.data,
                l = t.width,
                d = t.height,
                c = i.polarCenterX || l / 2,
                g = i.polarCenterY || d / 2,
                u = 0,
                f = 0,
                p = 0,
                v = 0,
                m = Math.sqrt(c * c + g * g);
              (a = l - c),
                (n = d - g),
                (m = (s = Math.sqrt(a * a + n * n)) > m ? s : m);
              var _,
                y,
                x,
                b,
                S = d,
                w = l,
                C = ((360 / w) * Math.PI) / 180;
              for (y = 0; y < w; y += 1)
                for (
                  x = Math.sin(y * C), b = Math.cos(y * C), _ = 0;
                  _ < S;
                  _ += 1
                )
                  (a = Math.floor(c + ((m * _) / S) * b)),
                    (u =
                      o[
                        0 +
                          (r =
                            4 *
                            ((n = Math.floor(g + ((m * _) / S) * x)) * l + a))
                      ]),
                    (f = o[r + 1]),
                    (p = o[r + 2]),
                    (v = o[r + 3]),
                    (h[0 + (r = 4 * (y + _ * l))] = u),
                    (h[r + 1] = f),
                    (h[r + 2] = p),
                    (h[r + 3] = v);
            })(t, m, { polarCenterX: d / 2, polarCenterY: c / 2 });
          for (var _ = d / Math.pow(2, u); _ <= 8; ) (_ *= 2), (u -= 1);
          var y = (_ = Math.ceil(_)),
            x = 0,
            b = y,
            S = 1;
          for (p + _ > d && ((x = y), (b = 0), (S = -1)), i = 0; i < c; i += 1)
            for (e = x; e !== b; e += S)
              (h = 4 * (d * i + (Math.round(e + p) % d))),
                (a = m.data[h + 0]),
                (n = m.data[h + 1]),
                (s = m.data[h + 2]),
                (o = m.data[h + 3]),
                (l = 4 * (d * i + e)),
                (m.data[l + 0] = a),
                (m.data[l + 1] = n),
                (m.data[l + 2] = s),
                (m.data[l + 3] = o);
          for (i = 0; i < c; i += 1)
            for (y = Math.floor(_), r = 0; r < u; r += 1) {
              for (e = 0; e < y + 1; e += 1)
                (h = 4 * (d * i + e)),
                  (a = m.data[h + 0]),
                  (n = m.data[h + 1]),
                  (s = m.data[h + 2]),
                  (o = m.data[h + 3]),
                  (l = 4 * (d * i + 2 * y - e - 1)),
                  (m.data[l + 0] = a),
                  (m.data[l + 1] = n),
                  (m.data[l + 2] = s),
                  (m.data[l + 3] = o);
              y *= 2;
            }
          !(function (t, e, i) {
            var r,
              a,
              n,
              s,
              o,
              h,
              l = t.data,
              d = e.data,
              c = t.width,
              g = t.height,
              u = i.polarCenterX || c / 2,
              f = i.polarCenterY || g / 2,
              p = 0,
              v = 0,
              m = 0,
              _ = 0,
              y = Math.sqrt(u * u + f * f);
            (a = c - u),
              (n = g - f),
              (y = (h = Math.sqrt(a * a + n * n)) > y ? h : y);
            var x,
              b,
              S,
              w = g,
              C = c,
              P = i.polarRotation || 0;
            for (a = 0; a < c; a += 1)
              for (n = 0; n < g; n += 1)
                (s = a - u),
                  (o = n - f),
                  (x = (Math.sqrt(s * s + o * o) * w) / y),
                  (b =
                    ((b =
                      ((180 * Math.atan2(o, s)) / Math.PI + 360 + P) % 360) *
                      C) /
                    360),
                  (S = Math.floor(b)),
                  (p = l[0 + (r = 4 * (Math.floor(x) * c + S))]),
                  (v = l[r + 1]),
                  (m = l[r + 2]),
                  (_ = l[r + 3]),
                  (d[0 + (r = 4 * (n * c + a))] = p),
                  (d[r + 1] = v),
                  (d[r + 2] = m),
                  (d[r + 3] = _);
          })(m, t, { polarRotation: 0 });
        }
      },
      Mask: function (t) {
        var e = (function (t, e) {
          var i = li(t, 0, 0),
            r = li(t, t.width - 1, 0),
            a = li(t, 0, t.height - 1),
            n = li(t, t.width - 1, t.height - 1),
            s = e || 10;
          if (di(i, r) < s && di(r, n) < s && di(n, a) < s && di(a, i) < s) {
            for (
              var o = (function (t) {
                  for (var e = [0, 0, 0], i = 0; i < t.length; i++)
                    (e[0] += t[i][0]), (e[1] += t[i][1]), (e[2] += t[i][2]);
                  return (
                    (e[0] /= t.length),
                    (e[1] /= t.length),
                    (e[2] /= t.length),
                    e
                  );
                })([r, i, n, a]),
                h = [],
                l = 0;
              l < t.width * t.height;
              l++
            ) {
              var d = di(o, [
                t.data[4 * l],
                t.data[4 * l + 1],
                t.data[4 * l + 2],
              ]);
              h[l] = d < s ? 0 : 255;
            }
            return h;
          }
        })(t, this.threshold());
        return (
          e &&
            (function (t, e) {
              for (var i = 0; i < t.width * t.height; i++)
                t.data[4 * i + 3] = e[i];
            })(
              t,
              (e = (function (t, e, i) {
                for (
                  var r = [
                      1 / 9,
                      1 / 9,
                      1 / 9,
                      1 / 9,
                      1 / 9,
                      1 / 9,
                      1 / 9,
                      1 / 9,
                      1 / 9,
                    ],
                    a = Math.round(Math.sqrt(r.length)),
                    n = Math.floor(a / 2),
                    s = [],
                    o = 0;
                  o < i;
                  o++
                )
                  for (var h = 0; h < e; h++) {
                    for (var l = o * e + h, d = 0, c = 0; c < a; c++)
                      for (var g = 0; g < a; g++) {
                        var u = o + c - n,
                          f = h + g - n;
                        if (u >= 0 && u < i && f >= 0 && f < e) {
                          var p = r[c * a + g];
                          d += t[u * e + f] * p;
                        }
                      }
                    s[l] = d;
                  }
                return s;
              })(
                (e = (function (t, e, i) {
                  for (
                    var r = [1, 1, 1, 1, 1, 1, 1, 1, 1],
                      a = Math.round(Math.sqrt(r.length)),
                      n = Math.floor(a / 2),
                      s = [],
                      o = 0;
                    o < i;
                    o++
                  )
                    for (var h = 0; h < e; h++) {
                      for (var l = o * e + h, d = 0, c = 0; c < a; c++)
                        for (var g = 0; g < a; g++) {
                          var u = o + c - n,
                            f = h + g - n;
                          if (u >= 0 && u < i && f >= 0 && f < e) {
                            var p = r[c * a + g];
                            d += t[u * e + f] * p;
                          }
                        }
                      s[l] = d >= 1020 ? 255 : 0;
                    }
                  return s;
                })(
                  (e = (function (t, e, i) {
                    for (
                      var r = [1, 1, 1, 1, 0, 1, 1, 1, 1],
                        a = Math.round(Math.sqrt(r.length)),
                        n = Math.floor(a / 2),
                        s = [],
                        o = 0;
                      o < i;
                      o++
                    )
                      for (var h = 0; h < e; h++) {
                        for (var l = o * e + h, d = 0, c = 0; c < a; c++)
                          for (var g = 0; g < a; g++) {
                            var u = o + c - n,
                              f = h + g - n;
                            if (u >= 0 && u < i && f >= 0 && f < e) {
                              var p = r[c * a + g];
                              d += t[u * e + f] * p;
                            }
                          }
                        s[l] = 2040 === d ? 255 : 0;
                      }
                    return s;
                  })(e, t.width, t.height)),
                  t.width,
                  t.height
                )),
                t.width,
                t.height
              ))
            ),
          t
        );
      },
      Noise: function (t) {
        var e,
          i = 255 * this.noise(),
          r = t.data,
          a = r.length,
          n = i / 2;
        for (e = 0; e < a; e += 4)
          (r[e + 0] += n - 2 * n * Math.random()),
            (r[e + 1] += n - 2 * n * Math.random()),
            (r[e + 2] += n - 2 * n * Math.random());
      },
      Pixelate: function (t) {
        var e,
          i,
          r,
          a,
          n,
          s,
          o,
          h,
          l,
          d,
          c,
          u,
          f,
          p,
          v = Math.ceil(this.pixelSize()),
          m = t.width,
          _ = t.height,
          y = Math.ceil(m / v),
          x = Math.ceil(_ / v),
          b = t.data;
        if (v <= 0) g.error("pixelSize value can not be <= 0");
        else
          for (u = 0; u < y; u += 1)
            for (f = 0; f < x; f += 1) {
              for (
                a = 0,
                  n = 0,
                  s = 0,
                  o = 0,
                  l = (h = u * v) + v,
                  c = (d = f * v) + v,
                  p = 0,
                  e = h;
                e < l;
                e += 1
              )
                if (!(e >= m))
                  for (i = d; i < c; i += 1)
                    i >= _ ||
                      ((a += b[(r = 4 * (m * i + e)) + 0]),
                      (n += b[r + 1]),
                      (s += b[r + 2]),
                      (o += b[r + 3]),
                      (p += 1));
              for (a /= p, n /= p, s /= p, o /= p, e = h; e < l; e += 1)
                if (!(e >= m))
                  for (i = d; i < c; i += 1)
                    i >= _ ||
                      ((b[(r = 4 * (m * i + e)) + 0] = a),
                      (b[r + 1] = n),
                      (b[r + 2] = s),
                      (b[r + 3] = o));
            }
      },
      Posterize: function (t) {
        var e,
          i = Math.round(254 * this.levels()) + 1,
          r = t.data,
          a = r.length,
          n = 255 / i;
        for (e = 0; e < a; e += 1) r[e] = Math.floor(r[e] / n) * n;
      },
      RGB: function (t) {
        var e,
          i,
          r = t.data,
          a = r.length,
          n = this.red(),
          s = this.green(),
          o = this.blue();
        for (e = 0; e < a; e += 4)
          (i = (0.34 * r[e] + 0.5 * r[e + 1] + 0.16 * r[e + 2]) / 255),
            (r[e] = i * n),
            (r[e + 1] = i * s),
            (r[e + 2] = i * o),
            (r[e + 3] = r[e + 3]);
      },
      RGBA: function (t) {
        var e,
          i,
          r = t.data,
          a = r.length,
          n = this.red(),
          s = this.green(),
          o = this.blue(),
          h = this.alpha();
        for (e = 0; e < a; e += 4)
          (i = 1 - h),
            (r[e] = n * h + r[e] * i),
            (r[e + 1] = s * h + r[e + 1] * i),
            (r[e + 2] = o * h + r[e + 2] * i);
      },
      Sepia: function (t) {
        var e,
          i,
          r,
          a,
          n = t.data,
          s = n.length;
        for (e = 0; e < s; e += 4)
          (i = n[e + 0]),
            (r = n[e + 1]),
            (a = n[e + 2]),
            (n[e + 0] = Math.min(255, 0.393 * i + 0.769 * r + 0.189 * a)),
            (n[e + 1] = Math.min(255, 0.349 * i + 0.686 * r + 0.168 * a)),
            (n[e + 2] = Math.min(255, 0.272 * i + 0.534 * r + 0.131 * a));
      },
      Solarize: function (t) {
        var e = t.data,
          i = t.width,
          r = 4 * i,
          a = t.height;
        do {
          var n = (a - 1) * r,
            s = i;
          do {
            var o = n + 4 * (s - 1),
              h = e[o],
              l = e[o + 1],
              d = e[o + 2];
            h > 127 && (h = 255 - h),
              l > 127 && (l = 255 - l),
              d > 127 && (d = 255 - d),
              (e[o] = h),
              (e[o + 1] = l),
              (e[o + 2] = d);
          } while (--s);
        } while (--a);
      },
      Threshold: function (t) {
        var e,
          i = 255 * this.threshold(),
          r = t.data,
          a = r.length;
        for (e = 0; e < a; e += 1) r[e] = r[e] < i ? 0 : 255;
      },
    },
  });
});
