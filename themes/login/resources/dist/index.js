var Sr = Object.defineProperty;
var Ar = Object.prototype.hasOwnProperty;
var it = Object.getOwnPropertySymbols,
  Or = Object.prototype.propertyIsEnumerable;
var ot = (e, t, r) =>
    t in e
      ? Sr(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r })
      : (e[t] = r),
  N = (e, t) => {
    for (var r in t || (t = {})) Ar.call(t, r) && ot(e, r, t[r]);
    if (it) for (var r of it(t)) Or.call(t, r) && ot(e, r, t[r]);
    return e;
  };
var be = !1,
  me = !1,
  T = [];
function Mr(e) {
  Cr(e);
}
function Cr(e) {
  T.includes(e) || T.push(e), Tr();
}
function at(e) {
  let t = T.indexOf(e);
  t !== -1 && T.splice(t, 1);
}
function Tr() {
  !me && !be && ((be = !0), queueMicrotask(Ir));
}
function Ir() {
  (be = !1), (me = !0);
  for (let e = 0; e < T.length; e++) T[e]();
  (T.length = 0), (me = !1);
}
var K,
  B,
  te,
  st,
  we = !0;
function Rr(e) {
  (we = !1), e(), (we = !0);
}
function Pr(e) {
  (K = e.reactive),
    (te = e.release),
    (B = (t) =>
      e.effect(t, {
        scheduler: (r) => {
          we ? Mr(r) : r();
        },
      })),
    (st = e.raw);
}
function ut(e) {
  B = e;
}
function $r(e) {
  let t = () => {};
  return [
    (n) => {
      let i = B(n);
      return (
        e._x_effects ||
          ((e._x_effects = new Set()),
          (e._x_runEffects = () => {
            e._x_effects.forEach((o) => o());
          })),
        e._x_effects.add(i),
        (t = () => {
          i !== void 0 && (e._x_effects.delete(i), te(i));
        }),
        i
      );
    },
    () => {
      t();
    },
  ];
}
var ct = [],
  lt = [],
  ft = [];
function jr(e) {
  ft.push(e);
}
function dt(e, t) {
  typeof t == "function"
    ? (e._x_cleanups || (e._x_cleanups = []), e._x_cleanups.push(t))
    : ((t = e), lt.push(t));
}
function Lr(e) {
  ct.push(e);
}
function Nr(e, t, r) {
  e._x_attributeCleanups || (e._x_attributeCleanups = {}),
    e._x_attributeCleanups[t] || (e._x_attributeCleanups[t] = []),
    e._x_attributeCleanups[t].push(r);
}
function pt(e, t) {
  !e._x_attributeCleanups ||
    Object.entries(e._x_attributeCleanups).forEach(([r, n]) => {
      (t === void 0 || t.includes(r)) &&
        (n.forEach((i) => i()), delete e._x_attributeCleanups[r]);
    });
}
var Se = new MutationObserver(Ee),
  Ae = !1;
function _t() {
  Se.observe(document, {
    subtree: !0,
    childList: !0,
    attributes: !0,
    attributeOldValue: !0,
  }),
    (Ae = !0);
}
function Fr() {
  Kr(), Se.disconnect(), (Ae = !1);
}
var H = [],
  Oe = !1;
function Kr() {
  (H = H.concat(Se.takeRecords())),
    H.length &&
      !Oe &&
      ((Oe = !0),
      queueMicrotask(() => {
        Dr(), (Oe = !1);
      }));
}
function Dr() {
  Ee(H), (H.length = 0);
}
function x(e) {
  if (!Ae) return e();
  Fr();
  let t = e();
  return _t(), t;
}
var Ce = !1,
  re = [];
function kr() {
  Ce = !0;
}
function zr() {
  (Ce = !1), Ee(re), (re = []);
}
function Ee(e) {
  if (Ce) {
    re = re.concat(e);
    return;
  }
  let t = [],
    r = [],
    n = new Map(),
    i = new Map();
  for (let o = 0; o < e.length; o++)
    if (
      !e[o].target._x_ignoreMutationObserver &&
      (e[o].type === "childList" &&
        (e[o].addedNodes.forEach((a) => a.nodeType === 1 && t.push(a)),
        e[o].removedNodes.forEach((a) => a.nodeType === 1 && r.push(a))),
      e[o].type === "attributes")
    ) {
      let a = e[o].target,
        s = e[o].attributeName,
        u = e[o].oldValue,
        c = () => {
          n.has(a) || n.set(a, []),
            n.get(a).push({ name: s, value: a.getAttribute(s) });
        },
        l = () => {
          i.has(a) || i.set(a, []), i.get(a).push(s);
        };
      a.hasAttribute(s) && u === null
        ? c()
        : a.hasAttribute(s)
        ? (l(), c())
        : l();
    }
  i.forEach((o, a) => {
    pt(a, o);
  }),
    n.forEach((o, a) => {
      ct.forEach((s) => s(a, o));
    });
  for (let o of r)
    if (!t.includes(o) && (lt.forEach((a) => a(o)), o._x_cleanups))
      for (; o._x_cleanups.length; ) o._x_cleanups.pop()();
  t.forEach((o) => {
    (o._x_ignoreSelf = !0), (o._x_ignore = !0);
  });
  for (let o of t)
    r.includes(o) ||
      !o.isConnected ||
      (delete o._x_ignoreSelf,
      delete o._x_ignore,
      ft.forEach((a) => a(o)),
      (o._x_ignore = !0),
      (o._x_ignoreSelf = !0));
  t.forEach((o) => {
    delete o._x_ignoreSelf, delete o._x_ignore;
  }),
    (t = null),
    (r = null),
    (n = null),
    (i = null);
}
function ht(e) {
  return q(F(e));
}
function W(e, t, r) {
  return (
    (e._x_dataStack = [t, ...F(r || e)]),
    () => {
      e._x_dataStack = e._x_dataStack.filter((n) => n !== t);
    }
  );
}
function gt(e, t) {
  let r = e._x_dataStack[0];
  Object.entries(t).forEach(([n, i]) => {
    r[n] = i;
  });
}
function F(e) {
  return e._x_dataStack
    ? e._x_dataStack
    : typeof ShadowRoot == "function" && e instanceof ShadowRoot
    ? F(e.host)
    : e.parentNode
    ? F(e.parentNode)
    : [];
}
function q(e) {
  let t = new Proxy(
    {},
    {
      ownKeys: () => Array.from(new Set(e.flatMap((r) => Object.keys(r)))),
      has: (r, n) => e.some((i) => i.hasOwnProperty(n)),
      get: (r, n) =>
        (e.find((i) => {
          if (i.hasOwnProperty(n)) {
            let o = Object.getOwnPropertyDescriptor(i, n);
            if (
              (o.get && o.get._x_alreadyBound) ||
              (o.set && o.set._x_alreadyBound)
            )
              return !0;
            if ((o.get || o.set) && o.enumerable) {
              let a = o.get,
                s = o.set,
                u = o;
              (a = a && a.bind(t)),
                (s = s && s.bind(t)),
                a && (a._x_alreadyBound = !0),
                s && (s._x_alreadyBound = !0),
                Object.defineProperty(i, n, N(N({}, u), { get: a, set: s }));
            }
            return !0;
          }
          return !1;
        }) || {})[n],
      set: (r, n, i) => {
        let o = e.find((a) => a.hasOwnProperty(n));
        return o ? (o[n] = i) : (e[e.length - 1][n] = i), !0;
      },
    }
  );
  return t;
}
function vt(e) {
  let t = (n) => typeof n == "object" && !Array.isArray(n) && n !== null,
    r = (n, i = "") => {
      Object.entries(Object.getOwnPropertyDescriptors(n)).forEach(
        ([o, { value: a, enumerable: s }]) => {
          if (s === !1 || a === void 0) return;
          let u = i === "" ? o : `${i}.${o}`;
          typeof a == "object" && a !== null && a._x_interceptor
            ? (n[o] = a.initialize(e, u, o))
            : t(a) && a !== n && !(a instanceof Element) && r(a, u);
        }
      );
    };
  return r(e);
}
function xt(e, t = () => {}) {
  let r = {
    initialValue: void 0,
    _x_interceptor: !0,
    initialize(n, i, o) {
      return e(
        this.initialValue,
        () => Br(n, i),
        (a) => Me(n, i, a),
        i,
        o
      );
    },
  };
  return (
    t(r),
    (n) => {
      if (typeof n == "object" && n !== null && n._x_interceptor) {
        let i = r.initialize.bind(r);
        r.initialize = (o, a, s) => {
          let u = n.initialize(o, a, s);
          return (r.initialValue = u), i(o, a, s);
        };
      } else r.initialValue = n;
      return r;
    }
  );
}
function Br(e, t) {
  return t.split(".").reduce((r, n) => r[n], e);
}
function Me(e, t, r) {
  if ((typeof t == "string" && (t = t.split(".")), t.length === 1)) e[t[0]] = r;
  else {
    if (t.length === 0) throw error;
    return e[t[0]] || (e[t[0]] = {}), Me(e[t[0]], t.slice(1), r);
  }
}
var yt = {};
function E(e, t) {
  yt[e] = t;
}
function Te(e, t) {
  return (
    Object.entries(yt).forEach(([r, n]) => {
      Object.defineProperty(e, `$${r}`, {
        get() {
          let [i, o] = bt(t);
          return (i = N({ interceptor: xt }, i)), dt(t, o), n(t, i);
        },
        enumerable: !1,
      });
    }),
    e
  );
}
function Hr(e, t, r, ...n) {
  try {
    return r(...n);
  } catch (i) {
    U(i, e, t);
  }
}
function U(e, t, r = void 0) {
  Object.assign(e, { el: t, expression: r }),
    console.warn(
      `Alpine Expression Error: ${e.message}

${
  r
    ? 'Expression: "' +
      r +
      `"

`
    : ""
}`,
      t
    ),
    setTimeout(() => {
      throw e;
    }, 0);
}
function D(e, t, r = {}) {
  let n;
  return b(e, t)((i) => (n = i), r), n;
}
function b(...e) {
  return mt(...e);
}
var mt = wt;
function qr(e) {
  mt = e;
}
function wt(e, t) {
  let r = {};
  Te(r, e);
  let n = [r, ...F(e)];
  if (typeof t == "function") return Wr(n, t);
  let i = Ur(n, t, e);
  return Hr.bind(null, e, t, i);
}
function Wr(e, t) {
  return (r = () => {}, { scope: n = {}, params: i = [] } = {}) => {
    let o = t.apply(q([n, ...e]), i);
    ne(r, o);
  };
}
var Ie = {};
function Vr(e, t) {
  if (Ie[e]) return Ie[e];
  let r = Object.getPrototypeOf(async function () {}).constructor,
    n =
      /^[\n\s]*if.*\(.*\)/.test(e) || /^(let|const)\s/.test(e)
        ? `(() => { ${e} })()`
        : e,
    o = (() => {
      try {
        return new r(
          ["__self", "scope"],
          `with (scope) { __self.result = ${n} }; __self.finished = true; return __self.result;`
        );
      } catch (a) {
        return U(a, t, e), Promise.resolve();
      }
    })();
  return (Ie[e] = o), o;
}
function Ur(e, t, r) {
  let n = Vr(t, r);
  return (i = () => {}, { scope: o = {}, params: a = [] } = {}) => {
    (n.result = void 0), (n.finished = !1);
    let s = q([o, ...e]);
    if (typeof n == "function") {
      let u = n(n, s).catch((c) => U(c, r, t));
      n.finished
        ? (ne(i, n.result, s, a, r), (n.result = void 0))
        : u
            .then((c) => {
              ne(i, c, s, a, r);
            })
            .catch((c) => U(c, r, t))
            .finally(() => (n.result = void 0));
    }
  };
}
function ne(e, t, r, n, i) {
  if (typeof t == "function") {
    let o = t.apply(r, n);
    o instanceof Promise
      ? o.then((a) => ne(e, a, r, n)).catch((a) => U(a, i, t))
      : e(o);
  } else e(t);
}
var Re = "x-";
function k(e = "") {
  return Re + e;
}
function Gr(e) {
  Re = e;
}
var Et = {};
function v(e, t) {
  Et[e] = t;
}
function Pe(e, t, r) {
  let n = {};
  return Array.from(t)
    .map(St((o, a) => (n[o] = a)))
    .filter(At)
    .map(Yr(n, r))
    .sort(Qr)
    .map((o) => Jr(e, o));
}
function Zr(e) {
  return Array.from(e)
    .map(St())
    .filter((t) => !At(t));
}
var $e = !1,
  V = new Map(),
  Ot = Symbol();
function Xr(e) {
  $e = !0;
  let t = Symbol();
  (Ot = t), V.set(t, []);
  let r = () => {
      for (; V.get(t).length; ) V.get(t).shift()();
      V.delete(t);
    },
    n = () => {
      ($e = !1), r();
    };
  e(r), n();
}
function bt(e) {
  let t = [],
    r = (s) => t.push(s),
    [n, i] = $r(e);
  return (
    t.push(i),
    [
      {
        Alpine: G,
        effect: n,
        cleanup: r,
        evaluateLater: b.bind(b, e),
        evaluate: D.bind(D, e),
      },
      () => t.forEach((s) => s()),
    ]
  );
}
function Jr(e, t) {
  let r = () => {},
    n = Et[t.type] || r,
    [i, o] = bt(e);
  Nr(e, t.original, o);
  let a = () => {
    e._x_ignore ||
      e._x_ignoreSelf ||
      (n.inline && n.inline(e, t, i),
      (n = n.bind(n, e, t, i)),
      $e ? V.get(Ot).push(n) : n());
  };
  return (a.runCleanups = o), a;
}
var Ct =
    (e, t) =>
    ({ name: r, value: n }) => (
      r.startsWith(e) && (r = r.replace(e, t)), { name: r, value: n }
    ),
  Mt = (e) => e;
function St(e = () => {}) {
  return ({ name: t, value: r }) => {
    let { name: n, value: i } = Tt.reduce((o, a) => a(o), {
      name: t,
      value: r,
    });
    return n !== t && e(n, t), { name: n, value: i };
  };
}
var Tt = [];
function je(e) {
  Tt.push(e);
}
function At({ name: e }) {
  return It().test(e);
}
var It = () => new RegExp(`^${Re}([^:^.]+)\\b`);
function Yr(e, t) {
  return ({ name: r, value: n }) => {
    let i = r.match(It()),
      o = r.match(/:([a-zA-Z0-9\-:]+)/),
      a = r.match(/\.[^.\]]+(?=[^\]]*$)/g) || [],
      s = t || e[r] || r;
    return {
      type: i ? i[1] : null,
      value: o ? o[1] : null,
      modifiers: a.map((u) => u.replace(".", "")),
      expression: n,
      original: s,
    };
  };
}
var Le = "DEFAULT",
  ie = [
    "ignore",
    "ref",
    "data",
    "id",
    "bind",
    "init",
    "for",
    "model",
    "modelable",
    "transition",
    "show",
    "if",
    Le,
    "teleport",
    "element",
  ];
function Qr(e, t) {
  let r = ie.indexOf(e.type) === -1 ? Le : e.type,
    n = ie.indexOf(t.type) === -1 ? Le : t.type;
  return ie.indexOf(r) - ie.indexOf(n);
}
function J(e, t, r = {}) {
  e.dispatchEvent(
    new CustomEvent(t, { detail: r, bubbles: !0, composed: !0, cancelable: !0 })
  );
}
var Ne = [],
  Ke = !1;
function Rt(e) {
  Ne.push(e),
    queueMicrotask(() => {
      Ke ||
        setTimeout(() => {
          Fe();
        });
    });
}
function Fe() {
  for (Ke = !1; Ne.length; ) Ne.shift()();
}
function en() {
  Ke = !0;
}
function I(e, t) {
  if (typeof ShadowRoot == "function" && e instanceof ShadowRoot) {
    Array.from(e.children).forEach((i) => I(i, t));
    return;
  }
  let r = !1;
  if ((t(e, () => (r = !0)), r)) return;
  let n = e.firstElementChild;
  for (; n; ) I(n, t), (n = n.nextElementSibling);
}
function oe(e, ...t) {
  console.warn(`Alpine Warning: ${e}`, ...t);
}
function rn() {
  document.body ||
    oe(
      "Unable to initialize. Trying to load Alpine before `<body>` is available. Did you forget to add `defer` in Alpine's `<script>` tag?"
    ),
    J(document, "alpine:init"),
    J(document, "alpine:initializing"),
    _t(),
    jr((t) => O(t, I)),
    dt((t) => tn(t)),
    Lr((t, r) => {
      Pe(t, r).forEach((n) => n());
    });
  let e = (t) => !ae(t.parentElement, !0);
  Array.from(document.querySelectorAll(Pt()))
    .filter(e)
    .forEach((t) => {
      O(t);
    }),
    J(document, "alpine:initialized");
}
var De = [],
  $t = [];
function jt() {
  return De.map((e) => e());
}
function Pt() {
  return De.concat($t).map((e) => e());
}
function Lt(e) {
  De.push(e);
}
function Nt(e) {
  $t.push(e);
}
function ae(e, t = !1) {
  return se(e, (r) => {
    if ((t ? Pt() : jt()).some((i) => r.matches(i))) return !0;
  });
}
function se(e, t) {
  if (!!e) {
    if (t(e)) return e;
    if ((e._x_teleportBack && (e = e._x_teleportBack), !!e.parentElement))
      return se(e.parentElement, t);
  }
}
function nn(e) {
  return jt().some((t) => e.matches(t));
}
function O(e, t = I) {
  Xr(() => {
    t(e, (r, n) => {
      Pe(r, r.attributes).forEach((i) => i()), r._x_ignore && n();
    });
  });
}
function tn(e) {
  I(e, (t) => pt(t));
}
function ke(e, t) {
  return Array.isArray(t)
    ? Kt(e, t.join(" "))
    : typeof t == "object" && t !== null
    ? on(e, t)
    : typeof t == "function"
    ? ke(e, t())
    : Kt(e, t);
}
function Kt(e, t) {
  let r = (i) =>
      i
        .split(" ")
        .filter((o) => !e.classList.contains(o))
        .filter(Boolean),
    n = (i) => (
      e.classList.add(...i),
      () => {
        e.classList.remove(...i);
      }
    );
  return (t = t === !0 ? (t = "") : t || ""), n(r(t));
}
function on(e, t) {
  let r = (s) => s.split(" ").filter(Boolean),
    n = Object.entries(t)
      .flatMap(([s, u]) => (u ? r(s) : !1))
      .filter(Boolean),
    i = Object.entries(t)
      .flatMap(([s, u]) => (u ? !1 : r(s)))
      .filter(Boolean),
    o = [],
    a = [];
  return (
    i.forEach((s) => {
      e.classList.contains(s) && (e.classList.remove(s), a.push(s));
    }),
    n.forEach((s) => {
      e.classList.contains(s) || (e.classList.add(s), o.push(s));
    }),
    () => {
      a.forEach((s) => e.classList.add(s)),
        o.forEach((s) => e.classList.remove(s));
    }
  );
}
function ue(e, t) {
  return typeof t == "object" && t !== null ? an(e, t) : sn(e, t);
}
function an(e, t) {
  let r = {};
  return (
    Object.entries(t).forEach(([n, i]) => {
      (r[n] = e.style[n]),
        n.startsWith("--") || (n = un(n)),
        e.style.setProperty(n, i);
    }),
    setTimeout(() => {
      e.style.length === 0 && e.removeAttribute("style");
    }),
    () => {
      ue(e, r);
    }
  );
}
function sn(e, t) {
  let r = e.getAttribute("style", t);
  return (
    e.setAttribute("style", t),
    () => {
      e.setAttribute("style", r || "");
    }
  );
}
function un(e) {
  return e.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
}
function ze(e, t = () => {}) {
  let r = !1;
  return function () {
    r ? t.apply(this, arguments) : ((r = !0), e.apply(this, arguments));
  };
}
v(
  "transition",
  (e, { value: t, modifiers: r, expression: n }, { evaluate: i }) => {
    typeof n == "function" && (n = i(n)), n ? cn(e, n, t) : ln(e, r, t);
  }
);
function cn(e, t, r) {
  Ft(e, ke, ""),
    {
      enter: (i) => {
        e._x_transition.enter.during = i;
      },
      "enter-start": (i) => {
        e._x_transition.enter.start = i;
      },
      "enter-end": (i) => {
        e._x_transition.enter.end = i;
      },
      leave: (i) => {
        e._x_transition.leave.during = i;
      },
      "leave-start": (i) => {
        e._x_transition.leave.start = i;
      },
      "leave-end": (i) => {
        e._x_transition.leave.end = i;
      },
    }[r](t);
}
function ln(e, t, r) {
  Ft(e, ue);
  let n = !t.includes("in") && !t.includes("out") && !r,
    i = n || t.includes("in") || ["enter"].includes(r),
    o = n || t.includes("out") || ["leave"].includes(r);
  t.includes("in") && !n && (t = t.filter((p, g) => g < t.indexOf("out"))),
    t.includes("out") && !n && (t = t.filter((p, g) => g > t.indexOf("out")));
  let a = !t.includes("opacity") && !t.includes("scale"),
    s = a || t.includes("opacity"),
    u = a || t.includes("scale"),
    c = s ? 0 : 1,
    l = u ? Y(t, "scale", 95) / 100 : 1,
    d = Y(t, "delay", 0),
    h = Y(t, "origin", "center"),
    A = "opacity, transform",
    j = Y(t, "duration", 150) / 1e3,
    X = Y(t, "duration", 75) / 1e3,
    f = "cubic-bezier(0.4, 0.0, 0.2, 1)";
  i &&
    ((e._x_transition.enter.during = {
      transformOrigin: h,
      transitionDelay: d,
      transitionProperty: A,
      transitionDuration: `${j}s`,
      transitionTimingFunction: f,
    }),
    (e._x_transition.enter.start = { opacity: c, transform: `scale(${l})` }),
    (e._x_transition.enter.end = { opacity: 1, transform: "scale(1)" })),
    o &&
      ((e._x_transition.leave.during = {
        transformOrigin: h,
        transitionDelay: d,
        transitionProperty: A,
        transitionDuration: `${X}s`,
        transitionTimingFunction: f,
      }),
      (e._x_transition.leave.start = { opacity: 1, transform: "scale(1)" }),
      (e._x_transition.leave.end = { opacity: c, transform: `scale(${l})` }));
}
function Ft(e, t, r = {}) {
  e._x_transition ||
    (e._x_transition = {
      enter: { during: r, start: r, end: r },
      leave: { during: r, start: r, end: r },
      in(n = () => {}, i = () => {}) {
        Be(
          e,
          t,
          {
            during: this.enter.during,
            start: this.enter.start,
            end: this.enter.end,
          },
          n,
          i
        );
      },
      out(n = () => {}, i = () => {}) {
        Be(
          e,
          t,
          {
            during: this.leave.during,
            start: this.leave.start,
            end: this.leave.end,
          },
          n,
          i
        );
      },
    });
}
window.Element.prototype._x_toggleAndCascadeWithTransitions = function (
  e,
  t,
  r,
  n
) {
  let i = () => {
    document.visibilityState === "visible"
      ? requestAnimationFrame(r)
      : setTimeout(r);
  };
  if (t) {
    e._x_transition && (e._x_transition.enter || e._x_transition.leave)
      ? e._x_transition.enter &&
        (Object.entries(e._x_transition.enter.during).length ||
          Object.entries(e._x_transition.enter.start).length ||
          Object.entries(e._x_transition.enter.end).length)
        ? e._x_transition.in(r)
        : i()
      : e._x_transition
      ? e._x_transition.in(r)
      : i();
    return;
  }
  (e._x_hidePromise = e._x_transition
    ? new Promise((o, a) => {
        e._x_transition.out(
          () => {},
          () => o(n)
        ),
          e._x_transitioning.beforeCancel(() =>
            a({ isFromCancelledTransition: !0 })
          );
      })
    : Promise.resolve(n)),
    queueMicrotask(() => {
      let o = Dt(e);
      o
        ? (o._x_hideChildren || (o._x_hideChildren = []),
          o._x_hideChildren.push(e))
        : queueMicrotask(() => {
            let a = (s) => {
              let u = Promise.all([
                s._x_hidePromise,
                ...(s._x_hideChildren || []).map(a),
              ]).then(([c]) => c());
              return delete s._x_hidePromise, delete s._x_hideChildren, u;
            };
            a(e).catch((s) => {
              if (!s.isFromCancelledTransition) throw s;
            });
          });
    });
};
function Dt(e) {
  let t = e.parentNode;
  if (!!t) return t._x_hidePromise ? t : Dt(t);
}
function Be(
  e,
  t,
  { during: r, start: n, end: i } = {},
  o = () => {},
  a = () => {}
) {
  if (
    (e._x_transitioning && e._x_transitioning.cancel(),
    Object.keys(r).length === 0 &&
      Object.keys(n).length === 0 &&
      Object.keys(i).length === 0)
  ) {
    o(), a();
    return;
  }
  let s, u, c;
  fn(e, {
    start() {
      s = t(e, n);
    },
    during() {
      u = t(e, r);
    },
    before: o,
    end() {
      s(), (c = t(e, i));
    },
    after: a,
    cleanup() {
      u(), c();
    },
  });
}
function fn(e, t) {
  let r,
    n,
    i,
    o = ze(() => {
      x(() => {
        (r = !0),
          n || t.before(),
          i || (t.end(), Fe()),
          t.after(),
          e.isConnected && t.cleanup(),
          delete e._x_transitioning;
      });
    });
  (e._x_transitioning = {
    beforeCancels: [],
    beforeCancel(a) {
      this.beforeCancels.push(a);
    },
    cancel: ze(function () {
      for (; this.beforeCancels.length; ) this.beforeCancels.shift()();
      o();
    }),
    finish: o,
  }),
    x(() => {
      t.start(), t.during();
    }),
    en(),
    requestAnimationFrame(() => {
      if (r) return;
      let a =
          Number(
            getComputedStyle(e)
              .transitionDuration.replace(/,.*/, "")
              .replace("s", "")
          ) * 1e3,
        s =
          Number(
            getComputedStyle(e)
              .transitionDelay.replace(/,.*/, "")
              .replace("s", "")
          ) * 1e3;
      a === 0 &&
        (a =
          Number(getComputedStyle(e).animationDuration.replace("s", "")) * 1e3),
        x(() => {
          t.before();
        }),
        (n = !0),
        requestAnimationFrame(() => {
          r ||
            (x(() => {
              t.end();
            }),
            Fe(),
            setTimeout(e._x_transitioning.finish, a + s),
            (i = !0));
        });
    });
}
function Y(e, t, r) {
  if (e.indexOf(t) === -1) return r;
  let n = e[e.indexOf(t) + 1];
  if (!n || (t === "scale" && isNaN(n))) return r;
  if (t === "duration") {
    let i = n.match(/([0-9]+)ms/);
    if (i) return i[1];
  }
  return t === "origin" &&
    ["top", "right", "left", "center", "bottom"].includes(e[e.indexOf(t) + 2])
    ? [n, e[e.indexOf(t) + 2]].join(" ")
    : n;
}
var He = !1;
function ce(e, t = () => {}) {
  return (...r) => (He ? t(...r) : e(...r));
}
function _n(e, t) {
  t._x_dataStack || (t._x_dataStack = e._x_dataStack),
    (He = !0),
    pn(() => {
      dn(t);
    }),
    (He = !1);
}
function dn(e) {
  let t = !1;
  O(e, (n, i) => {
    I(n, (o, a) => {
      if (t && nn(o)) return a();
      (t = !0), i(o, a);
    });
  });
}
function pn(e) {
  let t = B;
  ut((r, n) => {
    let i = t(r);
    return te(i), () => {};
  }),
    e(),
    ut(t);
}
function kt(e, t, r, n = []) {
  switch (
    (e._x_bindings || (e._x_bindings = K({})),
    (e._x_bindings[t] = r),
    (t = n.includes("camel") ? yn(t) : t),
    t)
  ) {
    case "value":
      hn(e, r);
      break;
    case "style":
      vn(e, r);
      break;
    case "class":
      gn(e, r);
      break;
    default:
      xn(e, t, r);
      break;
  }
}
function hn(e, t) {
  if (e.type === "radio")
    e.attributes.value === void 0 && (e.value = t),
      window.fromModel && (e.checked = zt(e.value, t));
  else if (e.type === "checkbox")
    Number.isInteger(t)
      ? (e.value = t)
      : !Number.isInteger(t) &&
        !Array.isArray(t) &&
        typeof t != "boolean" &&
        ![null, void 0].includes(t)
      ? (e.value = String(t))
      : Array.isArray(t)
      ? (e.checked = t.some((r) => zt(r, e.value)))
      : (e.checked = !!t);
  else if (e.tagName === "SELECT") bn(e, t);
  else {
    if (e.value === t) return;
    e.value = t;
  }
}
function gn(e, t) {
  e._x_undoAddedClasses && e._x_undoAddedClasses(),
    (e._x_undoAddedClasses = ke(e, t));
}
function vn(e, t) {
  e._x_undoAddedStyles && e._x_undoAddedStyles(),
    (e._x_undoAddedStyles = ue(e, t));
}
function xn(e, t, r) {
  [null, void 0, !1].includes(r) && wn(t)
    ? e.removeAttribute(t)
    : (Bt(t) && (r = t), mn(e, t, r));
}
function mn(e, t, r) {
  e.getAttribute(t) != r && e.setAttribute(t, r);
}
function bn(e, t) {
  let r = [].concat(t).map((n) => n + "");
  Array.from(e.options).forEach((n) => {
    n.selected = r.includes(n.value);
  });
}
function yn(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function zt(e, t) {
  return e == t;
}
function Bt(e) {
  return [
    "disabled",
    "checked",
    "required",
    "readonly",
    "hidden",
    "open",
    "selected",
    "autofocus",
    "itemscope",
    "multiple",
    "novalidate",
    "allowfullscreen",
    "allowpaymentrequest",
    "formnovalidate",
    "autoplay",
    "controls",
    "loop",
    "muted",
    "playsinline",
    "default",
    "ismap",
    "reversed",
    "async",
    "defer",
    "nomodule",
  ].includes(e);
}
function wn(e) {
  return ![
    "aria-pressed",
    "aria-checked",
    "aria-expanded",
    "aria-selected",
  ].includes(e);
}
function En(e, t, r) {
  if (e._x_bindings && e._x_bindings[t] !== void 0) return e._x_bindings[t];
  let n = e.getAttribute(t);
  return n === null
    ? typeof r == "function"
      ? r()
      : r
    : Bt(t)
    ? !![t, "true"].includes(n)
    : n === ""
    ? !0
    : n;
}
function Ht(e, t) {
  var r;
  return function () {
    var n = this,
      i = arguments,
      o = function () {
        (r = null), e.apply(n, i);
      };
    clearTimeout(r), (r = setTimeout(o, t));
  };
}
function qt(e, t) {
  let r;
  return function () {
    let n = this,
      i = arguments;
    r || (e.apply(n, i), (r = !0), setTimeout(() => (r = !1), t));
  };
}
function Sn(e) {
  e(G);
}
var R = {},
  Wt = !1;
function An(e, t) {
  if ((Wt || ((R = K(R)), (Wt = !0)), t === void 0)) return R[e];
  (R[e] = t),
    typeof t == "object" &&
      t !== null &&
      t.hasOwnProperty("init") &&
      typeof t.init == "function" &&
      R[e].init(),
    vt(R[e]);
}
function On() {
  return R;
}
var Ut = {};
function Cn(e, t) {
  Ut[e] = typeof t != "function" ? () => t : t;
}
function Mn(e) {
  return (
    Object.entries(Ut).forEach(([t, r]) => {
      Object.defineProperty(e, t, {
        get() {
          return (...n) => r(...n);
        },
      });
    }),
    e
  );
}
var Vt = {};
function Tn(e, t) {
  Vt[e] = t;
}
function In(e, t) {
  return (
    Object.entries(Vt).forEach(([r, n]) => {
      Object.defineProperty(e, r, {
        get() {
          return (...i) => n.bind(t)(...i);
        },
        enumerable: !1,
      });
    }),
    e
  );
}
var Rn = {
    get reactive() {
      return K;
    },
    get release() {
      return te;
    },
    get effect() {
      return B;
    },
    get raw() {
      return st;
    },
    version: "3.9.5",
    flushAndStopDeferringMutations: zr,
    disableEffectScheduling: Rr,
    setReactivityEngine: Pr,
    closestDataStack: F,
    skipDuringClone: ce,
    addRootSelector: Lt,
    addInitSelector: Nt,
    addScopeToNode: W,
    deferMutations: kr,
    mapAttributes: je,
    evaluateLater: b,
    setEvaluator: qr,
    mergeProxies: q,
    findClosest: se,
    closestRoot: ae,
    interceptor: xt,
    transition: Be,
    setStyles: ue,
    mutateDom: x,
    directive: v,
    throttle: qt,
    debounce: Ht,
    evaluate: D,
    initTree: O,
    nextTick: Rt,
    prefixed: k,
    prefix: Gr,
    plugin: Sn,
    magic: E,
    store: An,
    start: rn,
    clone: _n,
    bound: En,
    $data: ht,
    data: Tn,
    bind: Cn,
  },
  G = Rn;
function Pn(e, t) {
  let r = Object.create(null),
    n = e.split(",");
  for (let i = 0; i < n.length; i++) r[n[i]] = !0;
  return t ? (i) => !!r[i.toLowerCase()] : (i) => !!r[i];
}
var $n = Object.freeze({}),
  Ti = Object.freeze([]),
  Gt = Object.assign,
  jn = Object.prototype.hasOwnProperty,
  le = (e, t) => jn.call(e, t),
  P = Array.isArray,
  Q = (e) => Jt(e) === "[object Map]",
  Ln = (e) => typeof e == "string",
  qe = (e) => typeof e == "symbol",
  fe = (e) => e !== null && typeof e == "object",
  Nn = Object.prototype.toString,
  Jt = (e) => Nn.call(e),
  Yt = (e) => Jt(e).slice(8, -1),
  We = (e) =>
    Ln(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
  Kn = (e) => {
    let t = Object.create(null);
    return (r) => t[r] || (t[r] = e(r));
  },
  Fn = Kn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
  Qt = (e, t) => e !== t && (e === e || t === t),
  Ue = new WeakMap(),
  Z = [],
  S,
  $ = Symbol("iterate"),
  Ve = Symbol("Map key iterate");
function Dn(e) {
  return e && e._isEffect === !0;
}
function zn(e, t = $n) {
  Dn(e) && (e = e.raw);
  let r = kn(e, t);
  return t.lazy || r(), r;
}
function Bn(e) {
  e.active && (Zt(e), e.options.onStop && e.options.onStop(), (e.active = !1));
}
var Hn = 0;
function kn(e, t) {
  let r = function () {
    if (!r.active) return e();
    if (!Z.includes(r)) {
      Zt(r);
      try {
        return qn(), Z.push(r), (S = r), e();
      } finally {
        Z.pop(), Xt(), (S = Z[Z.length - 1]);
      }
    }
  };
  return (
    (r.id = Hn++),
    (r.allowRecurse = !!t.allowRecurse),
    (r._isEffect = !0),
    (r.active = !0),
    (r.raw = e),
    (r.deps = []),
    (r.options = t),
    r
  );
}
function Zt(e) {
  let { deps: t } = e;
  if (t.length) {
    for (let r = 0; r < t.length; r++) t[r].delete(e);
    t.length = 0;
  }
}
var z = !0,
  Ge = [];
function Wn() {
  Ge.push(z), (z = !1);
}
function qn() {
  Ge.push(z), (z = !0);
}
function Xt() {
  let e = Ge.pop();
  z = e === void 0 ? !0 : e;
}
function w(e, t, r) {
  if (!z || S === void 0) return;
  let n = Ue.get(e);
  n || Ue.set(e, (n = new Map()));
  let i = n.get(r);
  i || n.set(r, (i = new Set())),
    i.has(S) ||
      (i.add(S),
      S.deps.push(i),
      S.options.onTrack &&
        S.options.onTrack({ effect: S, target: e, type: t, key: r }));
}
function C(e, t, r, n, i, o) {
  let a = Ue.get(e);
  if (!a) return;
  let s = new Set(),
    u = (l) => {
      l &&
        l.forEach((d) => {
          (d !== S || d.allowRecurse) && s.add(d);
        });
    };
  if (t === "clear") a.forEach(u);
  else if (r === "length" && P(e))
    a.forEach((l, d) => {
      (d === "length" || d >= n) && u(l);
    });
  else
    switch ((r !== void 0 && u(a.get(r)), t)) {
      case "add":
        P(e)
          ? We(r) && u(a.get("length"))
          : (u(a.get($)), Q(e) && u(a.get(Ve)));
        break;
      case "delete":
        P(e) || (u(a.get($)), Q(e) && u(a.get(Ve)));
        break;
      case "set":
        Q(e) && u(a.get($));
        break;
    }
  let c = (l) => {
    l.options.onTrigger &&
      l.options.onTrigger({
        effect: l,
        target: e,
        key: r,
        type: t,
        newValue: n,
        oldValue: i,
        oldTarget: o,
      }),
      l.options.scheduler ? l.options.scheduler(l) : l();
  };
  s.forEach(c);
}
var Un = Pn("__proto__,__v_isRef,__isVue"),
  er = new Set(
    Object.getOwnPropertyNames(Symbol)
      .map((e) => Symbol[e])
      .filter(qe)
  ),
  Vn = de(),
  Gn = de(!1, !0),
  Jn = de(!0),
  Yn = de(!0, !0),
  pe = {};
["includes", "indexOf", "lastIndexOf"].forEach((e) => {
  let t = Array.prototype[e];
  pe[e] = function (...r) {
    let n = _(this);
    for (let o = 0, a = this.length; o < a; o++) w(n, "get", o + "");
    let i = t.apply(n, r);
    return i === -1 || i === !1 ? t.apply(n, r.map(_)) : i;
  };
});
["push", "pop", "shift", "unshift", "splice"].forEach((e) => {
  let t = Array.prototype[e];
  pe[e] = function (...r) {
    Wn();
    let n = t.apply(this, r);
    return Xt(), n;
  };
});
function de(e = !1, t = !1) {
  return function (n, i, o) {
    if (i === "__v_isReactive") return !e;
    if (i === "__v_isReadonly") return e;
    if (i === "__v_raw" && o === (e ? (t ? Zn : rr) : t ? Qn : tr).get(n))
      return n;
    let a = P(n);
    if (!e && a && le(pe, i)) return Reflect.get(pe, i, o);
    let s = Reflect.get(n, i, o);
    return (qe(i) ? er.has(i) : Un(i)) || (e || w(n, "get", i), t)
      ? s
      : Ye(s)
      ? !a || !We(i)
        ? s.value
        : s
      : fe(s)
      ? e
        ? nr(s)
        : Je(s)
      : s;
  };
}
var Xn = ir(),
  ei = ir(!0);
function ir(e = !1) {
  return function (r, n, i, o) {
    let a = r[n];
    if (!e && ((i = _(i)), (a = _(a)), !P(r) && Ye(a) && !Ye(i)))
      return (a.value = i), !0;
    let s = P(r) && We(n) ? Number(n) < r.length : le(r, n),
      u = Reflect.set(r, n, i, o);
    return (
      r === _(o) && (s ? Qt(i, a) && C(r, "set", n, i, a) : C(r, "add", n, i)),
      u
    );
  };
}
function ti(e, t) {
  let r = le(e, t),
    n = e[t],
    i = Reflect.deleteProperty(e, t);
  return i && r && C(e, "delete", t, void 0, n), i;
}
function ri(e, t) {
  let r = Reflect.has(e, t);
  return (!qe(t) || !er.has(t)) && w(e, "has", t), r;
}
function ni(e) {
  return w(e, "iterate", P(e) ? "length" : $), Reflect.ownKeys(e);
}
var or = { get: Vn, set: Xn, deleteProperty: ti, has: ri, ownKeys: ni },
  ar = {
    get: Jn,
    set(e, t) {
      return (
        console.warn(
          `Set operation on key "${String(t)}" failed: target is readonly.`,
          e
        ),
        !0
      );
    },
    deleteProperty(e, t) {
      return (
        console.warn(
          `Delete operation on key "${String(t)}" failed: target is readonly.`,
          e
        ),
        !0
      );
    },
  },
  Ii = Gt({}, or, { get: Gn, set: ei }),
  Ri = Gt({}, ar, { get: Yn }),
  Qe = (e) => (fe(e) ? Je(e) : e),
  Ze = (e) => (fe(e) ? nr(e) : e),
  Xe = (e) => e,
  _e = (e) => Reflect.getPrototypeOf(e);
function he(e, t, r = !1, n = !1) {
  e = e.__v_raw;
  let i = _(e),
    o = _(t);
  t !== o && !r && w(i, "get", t), !r && w(i, "get", o);
  let { has: a } = _e(i),
    s = n ? Xe : r ? Ze : Qe;
  if (a.call(i, t)) return s(e.get(t));
  if (a.call(i, o)) return s(e.get(o));
  e !== i && e.get(t);
}
function ge(e, t = !1) {
  let r = this.__v_raw,
    n = _(r),
    i = _(e);
  return (
    e !== i && !t && w(n, "has", e),
    !t && w(n, "has", i),
    e === i ? r.has(e) : r.has(e) || r.has(i)
  );
}
function ve(e, t = !1) {
  return (
    (e = e.__v_raw), !t && w(_(e), "iterate", $), Reflect.get(e, "size", e)
  );
}
function sr(e) {
  e = _(e);
  let t = _(this);
  return _e(t).has.call(t, e) || (t.add(e), C(t, "add", e, e)), this;
}
function cr(e, t) {
  t = _(t);
  let r = _(this),
    { has: n, get: i } = _e(r),
    o = n.call(r, e);
  o ? ur(r, n, e) : ((e = _(e)), (o = n.call(r, e)));
  let a = i.call(r, e);
  return (
    r.set(e, t), o ? Qt(t, a) && C(r, "set", e, t, a) : C(r, "add", e, t), this
  );
}
function lr(e) {
  let t = _(this),
    { has: r, get: n } = _e(t),
    i = r.call(t, e);
  i ? ur(t, r, e) : ((e = _(e)), (i = r.call(t, e)));
  let o = n ? n.call(t, e) : void 0,
    a = t.delete(e);
  return i && C(t, "delete", e, void 0, o), a;
}
function fr() {
  let e = _(this),
    t = e.size !== 0,
    r = Q(e) ? new Map(e) : new Set(e),
    n = e.clear();
  return t && C(e, "clear", void 0, void 0, r), n;
}
function xe(e, t) {
  return function (n, i) {
    let o = this,
      a = o.__v_raw,
      s = _(a),
      u = t ? Xe : e ? Ze : Qe;
    return (
      !e && w(s, "iterate", $), a.forEach((c, l) => n.call(i, u(c), u(l), o))
    );
  };
}
function ye(e, t, r) {
  return function (...n) {
    let i = this.__v_raw,
      o = _(i),
      a = Q(o),
      s = e === "entries" || (e === Symbol.iterator && a),
      u = e === "keys" && a,
      c = i[e](...n),
      l = r ? Xe : t ? Ze : Qe;
    return (
      !t && w(o, "iterate", u ? Ve : $),
      {
        next() {
          let { value: d, done: h } = c.next();
          return h
            ? { value: d, done: h }
            : { value: s ? [l(d[0]), l(d[1])] : l(d), done: h };
        },
        [Symbol.iterator]() {
          return this;
        },
      }
    );
  };
}
function M(e) {
  return function (...t) {
    {
      let r = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(
        `${Fn(e)} operation ${r}failed: target is readonly.`,
        _(this)
      );
    }
    return e === "delete" ? !1 : this;
  };
}
var dr = {
    get(e) {
      return he(this, e);
    },
    get size() {
      return ve(this);
    },
    has: ge,
    add: sr,
    set: cr,
    delete: lr,
    clear: fr,
    forEach: xe(!1, !1),
  },
  pr = {
    get(e) {
      return he(this, e, !1, !0);
    },
    get size() {
      return ve(this);
    },
    has: ge,
    add: sr,
    set: cr,
    delete: lr,
    clear: fr,
    forEach: xe(!1, !0),
  },
  _r = {
    get(e) {
      return he(this, e, !0);
    },
    get size() {
      return ve(this, !0);
    },
    has(e) {
      return ge.call(this, e, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: xe(!0, !1),
  },
  hr = {
    get(e) {
      return he(this, e, !0, !0);
    },
    get size() {
      return ve(this, !0);
    },
    has(e) {
      return ge.call(this, e, !0);
    },
    add: M("add"),
    set: M("set"),
    delete: M("delete"),
    clear: M("clear"),
    forEach: xe(!0, !0),
  },
  ii = ["keys", "values", "entries", Symbol.iterator];
ii.forEach((e) => {
  (dr[e] = ye(e, !1, !1)),
    (_r[e] = ye(e, !0, !1)),
    (pr[e] = ye(e, !1, !0)),
    (hr[e] = ye(e, !0, !0));
});
function gr(e, t) {
  let r = t ? (e ? hr : pr) : e ? _r : dr;
  return (n, i, o) =>
    i === "__v_isReactive"
      ? !e
      : i === "__v_isReadonly"
      ? e
      : i === "__v_raw"
      ? n
      : Reflect.get(le(r, i) && i in n ? r : n, i, o);
}
var oi = { get: gr(!1, !1) },
  ai = { get: gr(!0, !1) };
function ur(e, t, r) {
  let n = _(r);
  if (n !== r && t.call(e, n)) {
    let i = Yt(e);
    console.warn(
      `Reactive ${i} contains both the raw and reactive versions of the same object${
        i === "Map" ? " as keys" : ""
      }, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`
    );
  }
}
var tr = new WeakMap(),
  Qn = new WeakMap(),
  rr = new WeakMap(),
  Zn = new WeakMap();
function si(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function ui(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : si(Yt(e));
}
function Je(e) {
  return e && e.__v_isReadonly ? e : vr(e, !1, or, oi, tr);
}
function nr(e) {
  return vr(e, !0, ar, ai, rr);
}
function vr(e, t, r, n, i) {
  if (!fe(e))
    return console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive)) return e;
  let o = i.get(e);
  if (o) return o;
  let a = ui(e);
  if (a === 0) return e;
  let s = new Proxy(e, a === 2 ? n : r);
  return i.set(e, s), s;
}
function _(e) {
  return (e && _(e.__v_raw)) || e;
}
function Ye(e) {
  return Boolean(e && e.__v_isRef === !0);
}
E("nextTick", () => Rt);
E("dispatch", (e) => J.bind(J, e));
E("watch", (e, { evaluateLater: t, effect: r }) => (n, i) => {
  let o = t(n),
    a = !0,
    s,
    u = r(() =>
      o((c) => {
        JSON.stringify(c),
          a
            ? (s = c)
            : queueMicrotask(() => {
                i(c, s), (s = c);
              }),
          (a = !1);
      })
    );
  e._x_effects.delete(u);
});
E("store", On);
E("data", (e) => ht(e));
E("root", (e) => ae(e));
E(
  "refs",
  (e) => (e._x_refs_proxy || (e._x_refs_proxy = q(ci(e))), e._x_refs_proxy)
);
function ci(e) {
  let t = [],
    r = e;
  for (; r; ) r._x_refs && t.push(r._x_refs), (r = r.parentNode);
  return t;
}
var et = {};
function xr(e) {
  return et[e] || (et[e] = 0), ++et[e];
}
function li(e, t) {
  return se(e, (r) => {
    if (r._x_ids && r._x_ids[t]) return !0;
  });
}
function fi(e, t) {
  e._x_ids || (e._x_ids = {}), e._x_ids[t] || (e._x_ids[t] = xr(t));
}
E("id", (e) => (t, r = null) => {
  let n = li(e, t),
    i = n ? n._x_ids[t] : xr(t);
  return r ? `${t}-${i}-${r}` : `${t}-${i}`;
});
E("el", (e) => e);
v("modelable", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t),
    o = () => {
      let c;
      return i((l) => (c = l)), c;
    },
    a = n(`${t} = __placeholder`),
    s = (c) => a(() => {}, { scope: { __placeholder: c } }),
    u = o();
  s(u),
    queueMicrotask(() => {
      if (!e._x_model) return;
      e._x_removeModelListeners.default();
      let c = e._x_model.get,
        l = e._x_model.set;
      r(() => s(c())), r(() => l(o()));
    });
});
v("teleport", (e, { expression: t }, { cleanup: r }) => {
  e.tagName.toLowerCase() !== "template" &&
    oe("x-teleport can only be used on a <template> tag", e);
  let n = document.querySelector(t);
  n || oe(`Cannot find x-teleport element for selector: "${t}"`);
  let i = e.content.cloneNode(!0).firstElementChild;
  (e._x_teleport = i),
    (i._x_teleportBack = e),
    e._x_forwardEvents &&
      e._x_forwardEvents.forEach((o) => {
        i.addEventListener(o, (a) => {
          a.stopPropagation(), e.dispatchEvent(new a.constructor(a.type, a));
        });
      }),
    W(i, {}, e),
    x(() => {
      n.appendChild(i), O(i), (i._x_ignore = !0);
    }),
    r(() => i.remove());
});
var yr = () => {};
yr.inline = (e, { modifiers: t }, { cleanup: r }) => {
  t.includes("self") ? (e._x_ignoreSelf = !0) : (e._x_ignore = !0),
    r(() => {
      t.includes("self") ? delete e._x_ignoreSelf : delete e._x_ignore;
    });
};
v("ignore", yr);
v("effect", (e, { expression: t }, { effect: r }) => r(b(e, t)));
function br(e, t, r, n) {
  let i = e,
    o = (u) => n(u),
    a = {},
    s = (u, c) => (l) => c(u, l);
  if (
    (r.includes("dot") && (t = di(t)),
    r.includes("camel") && (t = pi(t)),
    r.includes("passive") && (a.passive = !0),
    r.includes("capture") && (a.capture = !0),
    r.includes("window") && (i = window),
    r.includes("document") && (i = document),
    r.includes("prevent") &&
      (o = s(o, (u, c) => {
        c.preventDefault(), u(c);
      })),
    r.includes("stop") &&
      (o = s(o, (u, c) => {
        c.stopPropagation(), u(c);
      })),
    r.includes("self") &&
      (o = s(o, (u, c) => {
        c.target === e && u(c);
      })),
    (r.includes("away") || r.includes("outside")) &&
      ((i = document),
      (o = s(o, (u, c) => {
        e.contains(c.target) ||
          (c.target.isConnected !== !1 &&
            ((e.offsetWidth < 1 && e.offsetHeight < 1) ||
              (e._x_isShown !== !1 && u(c))));
      }))),
    r.includes("once") &&
      (o = s(o, (u, c) => {
        u(c), i.removeEventListener(t, o, a);
      })),
    (o = s(o, (u, c) => {
      (_i(t) && hi(c, r)) || u(c);
    })),
    r.includes("debounce"))
  ) {
    let u = r[r.indexOf("debounce") + 1] || "invalid-wait",
      c = tt(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = Ht(o, c);
  }
  if (r.includes("throttle")) {
    let u = r[r.indexOf("throttle") + 1] || "invalid-wait",
      c = tt(u.split("ms")[0]) ? Number(u.split("ms")[0]) : 250;
    o = qt(o, c);
  }
  return (
    i.addEventListener(t, o, a),
    () => {
      i.removeEventListener(t, o, a);
    }
  );
}
function di(e) {
  return e.replace(/-/g, ".");
}
function pi(e) {
  return e.toLowerCase().replace(/-(\w)/g, (t, r) => r.toUpperCase());
}
function tt(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function gi(e) {
  return e
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]/, "-")
    .toLowerCase();
}
function _i(e) {
  return ["keydown", "keyup"].includes(e);
}
function hi(e, t) {
  let r = t.filter(
    (o) => !["window", "document", "prevent", "stop", "once"].includes(o)
  );
  if (r.includes("debounce")) {
    let o = r.indexOf("debounce");
    r.splice(o, tt((r[o + 1] || "invalid-wait").split("ms")[0]) ? 2 : 1);
  }
  if (r.length === 0 || (r.length === 1 && mr(e.key).includes(r[0]))) return !1;
  let i = ["ctrl", "shift", "alt", "meta", "cmd", "super"].filter((o) =>
    r.includes(o)
  );
  return (
    (r = r.filter((o) => !i.includes(o))),
    !(
      i.length > 0 &&
      i.filter(
        (a) => ((a === "cmd" || a === "super") && (a = "meta"), e[`${a}Key`])
      ).length === i.length &&
      mr(e.key).includes(r[0])
    )
  );
}
function mr(e) {
  if (!e) return [];
  e = gi(e);
  let t = {
    ctrl: "control",
    slash: "/",
    space: "-",
    spacebar: "-",
    cmd: "meta",
    esc: "escape",
    up: "arrow-up",
    down: "arrow-down",
    left: "arrow-left",
    right: "arrow-right",
    period: ".",
    equal: "=",
  };
  return (
    (t[e] = e),
    Object.keys(t)
      .map((r) => {
        if (t[r] === e) return r;
      })
      .filter((r) => r)
  );
}
v("model", (e, { modifiers: t, expression: r }, { effect: n, cleanup: i }) => {
  let o = b(e, r),
    a = `${r} = rightSideOfExpression($event, ${r})`,
    s = b(e, a);
  var u =
    e.tagName.toLowerCase() === "select" ||
    ["checkbox", "radio"].includes(e.type) ||
    t.includes("lazy")
      ? "change"
      : "input";
  let c = vi(e, t, r),
    l = br(e, u, t, (h) => {
      s(() => {}, { scope: { $event: h, rightSideOfExpression: c } });
    });
  e._x_removeModelListeners || (e._x_removeModelListeners = {}),
    (e._x_removeModelListeners.default = l),
    i(() => e._x_removeModelListeners.default());
  let d = b(e, `${r} = __placeholder`);
  (e._x_model = {
    get() {
      let h;
      return o((A) => (h = A)), h;
    },
    set(h) {
      d(() => {}, { scope: { __placeholder: h } });
    },
  }),
    (e._x_forceModelUpdate = () => {
      o((h) => {
        h === void 0 && r.match(/\./) && (h = ""),
          (window.fromModel = !0),
          x(() => kt(e, "value", h)),
          delete window.fromModel;
      });
    }),
    n(() => {
      (t.includes("unintrusive") && document.activeElement.isSameNode(e)) ||
        e._x_forceModelUpdate();
    });
});
function vi(e, t, r) {
  return (
    e.type === "radio" &&
      x(() => {
        e.hasAttribute("name") || e.setAttribute("name", r);
      }),
    (n, i) =>
      x(() => {
        if (n instanceof CustomEvent && n.detail !== void 0)
          return n.detail || n.target.value;
        if (e.type === "checkbox")
          if (Array.isArray(i)) {
            let o = t.includes("number") ? rt(n.target.value) : n.target.value;
            return n.target.checked
              ? i.concat([o])
              : i.filter((a) => !xi(a, o));
          } else return n.target.checked;
        else {
          if (e.tagName.toLowerCase() === "select" && e.multiple)
            return t.includes("number")
              ? Array.from(n.target.selectedOptions).map((o) => {
                  let a = o.value || o.text;
                  return rt(a);
                })
              : Array.from(n.target.selectedOptions).map(
                  (o) => o.value || o.text
                );
          {
            let o = n.target.value;
            return t.includes("number")
              ? rt(o)
              : t.includes("trim")
              ? o.trim()
              : o;
          }
        }
      })
  );
}
function rt(e) {
  let t = e ? parseFloat(e) : null;
  return yi(t) ? t : e;
}
function xi(e, t) {
  return e == t;
}
function yi(e) {
  return !Array.isArray(e) && !isNaN(e);
}
v("cloak", (e) => queueMicrotask(() => x(() => e.removeAttribute(k("cloak")))));
Nt(() => `[${k("init")}]`);
v(
  "init",
  ce((e, { expression: t }, { evaluate: r }) =>
    typeof t == "string" ? !!t.trim() && r(t, {}, !1) : r(t, {}, !1)
  )
);
v("text", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((o) => {
      x(() => {
        e.textContent = o;
      });
    });
  });
});
v("html", (e, { expression: t }, { effect: r, evaluateLater: n }) => {
  let i = n(t);
  r(() => {
    i((o) => {
      x(() => {
        (e.innerHTML = o), (e._x_ignoreSelf = !0), O(e), delete e._x_ignoreSelf;
      });
    });
  });
});
je(Ct(":", Mt(k("bind:"))));
v(
  "bind",
  (
    e,
    { value: t, modifiers: r, expression: n, original: i },
    { effect: o }
  ) => {
    if (!t) return bi(e, n, i);
    if (t === "key") return mi(e, n);
    let a = b(e, n);
    o(() =>
      a((s) => {
        s === void 0 && n.match(/\./) && (s = ""), x(() => kt(e, t, s, r));
      })
    );
  }
);
function bi(e, t, r, n) {
  let i = {};
  Mn(i);
  let o = b(e, t),
    a = [];
  for (; a.length; ) a.pop()();
  o(
    (s) => {
      let u = Object.entries(s).map(([l, d]) => ({ name: l, value: d })),
        c = Zr(u);
      (u = u.map((l) =>
        c.find((d) => d.name === l.name)
          ? { name: `x-bind:${l.name}`, value: `"${l.value}"` }
          : l
      )),
        Pe(e, u, r).map((l) => {
          a.push(l.runCleanups), l();
        });
    },
    { scope: i }
  );
}
function mi(e, t) {
  e._x_keyExpression = t;
}
Lt(() => `[${k("data")}]`);
v(
  "data",
  ce((e, { expression: t }, { cleanup: r }) => {
    t = t === "" ? "{}" : t;
    let n = {};
    Te(n, e);
    let i = {};
    In(i, n);
    let o = D(e, t, { scope: i });
    o === void 0 && (o = {}), Te(o, e);
    let a = K(o);
    vt(a);
    let s = W(e, a);
    a.init && D(e, a.init),
      r(() => {
        a.destroy && D(e, a.destroy), s();
      });
  })
);
v("show", (e, { modifiers: t, expression: r }, { effect: n }) => {
  let i = b(e, r),
    o = () =>
      x(() => {
        (e.style.display = "none"), (e._x_isShown = !1);
      }),
    a = () =>
      x(() => {
        e.style.length === 1 && e.style.display === "none"
          ? e.removeAttribute("style")
          : e.style.removeProperty("display"),
          (e._x_isShown = !0);
      }),
    s = () => setTimeout(a),
    u = ze(
      (d) => (d ? a() : o()),
      (d) => {
        typeof e._x_toggleAndCascadeWithTransitions == "function"
          ? e._x_toggleAndCascadeWithTransitions(e, d, a, o)
          : d
          ? s()
          : o();
      }
    ),
    c,
    l = !0;
  n(() =>
    i((d) => {
      (!l && d === c) ||
        (t.includes("immediate") && (d ? s() : o()), u(d), (c = d), (l = !1));
    })
  );
});
v("for", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = Ei(t),
    o = b(e, i.items),
    a = b(e, e._x_keyExpression || "index");
  (e._x_prevKeys = []),
    (e._x_lookup = {}),
    r(() => wi(e, i, o, a)),
    n(() => {
      Object.values(e._x_lookup).forEach((s) => s.remove()),
        delete e._x_prevKeys,
        delete e._x_lookup;
    });
});
function wi(e, t, r, n) {
  let i = (a) => typeof a == "object" && !Array.isArray(a),
    o = e;
  r((a) => {
    Si(a) && a >= 0 && (a = Array.from(Array(a).keys(), (f) => f + 1)),
      a === void 0 && (a = []);
    let s = e._x_lookup,
      u = e._x_prevKeys,
      c = [],
      l = [];
    if (i(a))
      a = Object.entries(a).map(([f, p]) => {
        let g = wr(t, p, f, a);
        n((y) => l.push(y), { scope: N({ index: f }, g) }), c.push(g);
      });
    else
      for (let f = 0; f < a.length; f++) {
        let p = wr(t, a[f], f, a);
        n((g) => l.push(g), { scope: N({ index: f }, p) }), c.push(p);
      }
    let d = [],
      h = [],
      A = [],
      j = [];
    for (let f = 0; f < u.length; f++) {
      let p = u[f];
      l.indexOf(p) === -1 && A.push(p);
    }
    u = u.filter((f) => !A.includes(f));
    let X = "template";
    for (let f = 0; f < l.length; f++) {
      let p = l[f],
        g = u.indexOf(p);
      if (g === -1) u.splice(f, 0, p), d.push([X, f]);
      else if (g !== f) {
        let y = u.splice(f, 1)[0],
          m = u.splice(g - 1, 1)[0];
        u.splice(f, 0, m), u.splice(g, 0, y), h.push([y, m]);
      } else j.push(p);
      X = p;
    }
    for (let f = 0; f < A.length; f++) {
      let p = A[f];
      s[p]._x_effects && s[p]._x_effects.forEach(at),
        s[p].remove(),
        (s[p] = null),
        delete s[p];
    }
    for (let f = 0; f < h.length; f++) {
      let [p, g] = h[f],
        y = s[p],
        m = s[g],
        L = document.createElement("div");
      x(() => {
        m.after(L),
          y.after(m),
          m._x_currentIfEl && m.after(m._x_currentIfEl),
          L.before(y),
          y._x_currentIfEl && y.after(y._x_currentIfEl),
          L.remove();
      }),
        gt(m, c[l.indexOf(g)]);
    }
    for (let f = 0; f < d.length; f++) {
      let [p, g] = d[f],
        y = p === "template" ? o : s[p];
      y._x_currentIfEl && (y = y._x_currentIfEl);
      let m = c[g],
        L = l[g],
        ee = document.importNode(o.content, !0).firstElementChild;
      W(ee, K(m), o),
        x(() => {
          y.after(ee), O(ee);
        }),
        typeof L == "object" &&
          oe(
            "x-for key cannot be an object, it must be a string or an integer",
            o
          ),
        (s[L] = ee);
    }
    for (let f = 0; f < j.length; f++) gt(s[j[f]], c[l.indexOf(j[f])]);
    o._x_prevKeys = l;
  });
}
function Ei(e) {
  let t = /,([^,\}\]]*)(?:,([^,\}\]]*))?$/,
    r = /^\s*\(|\)\s*$/g,
    n = /([\s\S]*?)\s+(?:in|of)\s+([\s\S]*)/,
    i = e.match(n);
  if (!i) return;
  let o = {};
  o.items = i[2].trim();
  let a = i[1].replace(r, "").trim(),
    s = a.match(t);
  return (
    s
      ? ((o.item = a.replace(t, "").trim()),
        (o.index = s[1].trim()),
        s[2] && (o.collection = s[2].trim()))
      : (o.item = a),
    o
  );
}
function wr(e, t, r, n) {
  let i = {};
  return (
    /^\[.*\]$/.test(e.item) && Array.isArray(t)
      ? e.item
          .replace("[", "")
          .replace("]", "")
          .split(",")
          .map((a) => a.trim())
          .forEach((a, s) => {
            i[a] = t[s];
          })
      : /^\{.*\}$/.test(e.item) && !Array.isArray(t) && typeof t == "object"
      ? e.item
          .replace("{", "")
          .replace("}", "")
          .split(",")
          .map((a) => a.trim())
          .forEach((a) => {
            i[a] = t[a];
          })
      : (i[e.item] = t),
    e.index && (i[e.index] = r),
    e.collection && (i[e.collection] = n),
    i
  );
}
function Si(e) {
  return !Array.isArray(e) && !isNaN(e);
}
function Er() {}
Er.inline = (e, { expression: t }, { cleanup: r }) => {
  let n = ae(e);
  n._x_refs || (n._x_refs = {}),
    (n._x_refs[t] = e),
    r(() => delete n._x_refs[t]);
};
v("ref", Er);
v("if", (e, { expression: t }, { effect: r, cleanup: n }) => {
  let i = b(e, t),
    o = () => {
      if (e._x_currentIfEl) return e._x_currentIfEl;
      let s = e.content.cloneNode(!0).firstElementChild;
      return (
        W(s, {}, e),
        x(() => {
          e.after(s), O(s);
        }),
        (e._x_currentIfEl = s),
        (e._x_undoIf = () => {
          I(s, (u) => {
            u._x_effects && u._x_effects.forEach(at);
          }),
            s.remove(),
            delete e._x_currentIfEl;
        }),
        s
      );
    },
    a = () => {
      !e._x_undoIf || (e._x_undoIf(), delete e._x_undoIf);
    };
  r(() =>
    i((s) => {
      s ? o() : a();
    })
  ),
    n(() => e._x_undoIf && e._x_undoIf());
});
v("id", (e, { expression: t }, { evaluate: r }) => {
  r(t).forEach((i) => fi(e, i));
});
je(Ct("@", Mt(k("on:"))));
v(
  "on",
  ce((e, { value: t, modifiers: r, expression: n }, { cleanup: i }) => {
    let o = n ? b(e, n) : () => {};
    e.tagName.toLowerCase() === "template" &&
      (e._x_forwardEvents || (e._x_forwardEvents = []),
      e._x_forwardEvents.includes(t) || e._x_forwardEvents.push(t));
    let a = br(e, t, r, (s) => {
      o(() => {}, { scope: { $event: s }, params: [s] });
    });
    i(() => a());
  })
);
G.setEvaluator(wt);
G.setReactivityEngine({ reactive: Je, effect: zn, release: Bn, raw: _ });
var Ai = G,
  Oi = Ai,
  nt = Oi;
window.Alpine = nt;
nt.start();
//# sourceMappingURL=index.js.map
