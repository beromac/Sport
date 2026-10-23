/* Illustrations filaires animées : transforme une "pose" (angles) en SVG. */
(function (root) {
  var LEN = { torso: 38, up: 20, fore: 20, thigh: 30, shin: 30, head: 10 };

  function pt(o, a, l) {
    var r = a * Math.PI / 180;
    return [o[0] + l * Math.cos(r), o[1] + l * Math.sin(r)];
  }
  function n(v) { return Math.round(v * 10) / 10; }
  function seg(a, b, cls) {
    return '<line class="' + (cls || '') + '" x1="' + n(a[0]) + '" y1="' + n(a[1]) + '" x2="' + n(b[0]) + '" y2="' + n(b[1]) + '"/>';
  }
  function limb(o, ang, l1, l2, cls) {
    var m = pt(o, ang[0], l1), e = pt(m, ang[1], l2);
    return '<polyline class="' + (cls || '') + '" points="' + n(o[0]) + ',' + n(o[1]) + ' ' + n(m[0]) + ',' + n(m[1]) + ' ' + n(e[0]) + ',' + n(e[1]) + '"/>';
  }
  function props(list) {
    return (list || []).map(function (q) { return seg([q[0], q[1]], [q[2], q[3]], 'prop'); }).join('');
  }

  function pose(p) {
    var out = props(p.props);
    if (p.raw) {
      p.raw.lines.forEach(function (q) { out += seg([q[0], q[1]], [q[2], q[3]], ''); });
      out += '<circle class="head" cx="' + p.raw.head[0] + '" cy="' + p.raw.head[1] + '" r="7.5"/>';
      return out;
    }
    var pel = p.r;
    var neck = pt(pel, p.t, LEN.torso);
    var head = pt(neck, p.h != null ? p.h : p.t, LEN.head);
    var a1 = p.a || [90, 90], a2 = p.a2 || a1;
    var l1 = p.l || [90, 90], l2 = p.l2 || l1;
    // membres lointains (plus clairs)
    out += limb(neck, a2, LEN.up, LEN.fore, 'far');
    out += limb(pel, l2, LEN.thigh, LEN.shin, 'far');
    // tronc
    if (p.c) {
      var mid = [(pel[0] + neck[0]) / 2, (pel[1] + neck[1]) / 2 - 2 * p.c];
      out += '<path d="M' + n(pel[0]) + ' ' + n(pel[1]) + ' Q' + n(mid[0]) + ' ' + n(mid[1]) + ' ' + n(neck[0]) + ' ' + n(neck[1]) + '"/>';
    } else {
      out += seg(pel, neck, '');
    }
    // membres proches
    out += limb(neck, a1, LEN.up, LEN.fore, '');
    out += limb(pel, l1, LEN.thigh, LEN.shin, '');
    out += '<circle class="head" cx="' + n(head[0]) + '" cy="' + n(head[1]) + '" r="7.5"/>';
    return out;
  }

  function figureSvg(ex) {
    if (!ex.frames) return '<div class="nofig" aria-hidden="true">' + ex.icon + '</div>';
    var fr = ex.frames, multi = fr.length > 1;
    var g = fr.map(function (p, i) {
      return '<g class="fr' + (multi ? ' fr' + i : ' still') + '">' + pose(p) + '</g>';
    }).join('');
    return '<svg class="fig" viewBox="0 0 200 130" role="img" aria-label="Illustration : ' +
      String(ex.name).replace(/"/g, '') + '"><line class="ground" x1="6" y1="124.5" x2="194" y2="124.5"/>' + g + '</svg>';
  }

  root.Fig = { figureSvg: figureSvg, pose: pose };
})(typeof window !== 'undefined' ? window : globalThis);
