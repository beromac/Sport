'use strict';
(function () {
  var D = window.DATA, Fig = window.Fig;
  var EX = {};
  D.exos.forEach(function (e) { EX[e.id] = e; });
  var KEY = 'fitsante.v1';

  /* ---------- utilitaires ---------- */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function ymd(d) {
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function today() { return ymd(new Date()); }
  function parse(s) { return new Date(s + 'T12:00:00'); }
  function fmtDate(s) { return parse(s).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); }
  function weekStart(s) {
    var d = parse(s); d.setDate(d.getDate() - ((d.getDay() + 6) % 7)); return ymd(d);
  }
  function num(v) { var x = parseFloat(String(v).replace(',', '.')); return isFinite(x) ? x : null; }
  function fmtKg(v) { return (Math.round(v * 10) / 10).toString().replace('.', ',') + ' kg'; }
  function mmss(t) { t = Math.max(0, Math.round(t)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); }

  /* ---------- données ---------- */
  function defaultHave() { return (D.equipment || []).filter(function (e) { return e.def; }).map(function (e) { return e.id; }); }
  function defaults() {
    return { profile: { name: '', height: '', goal: '', age: '', sex: '' }, weights: [], waist: [], pains: [], sessions: [], activities: [],
      equip: { have: defaultHave(), custom: [], weights: '' }, variant: {},
      settings: { ack: false, rest: 45, awake: true, sound: true }, videos: {} };
  }
  /* anciennes versions : le tour de taille était rangé dans la pesée */
  function migrateWaist(d) {
    if (!Array.isArray(d.waist)) d.waist = [];
    (d.weights || []).forEach(function (w) {
      if (w.waist && !d.waist.some(function (x) { return x.d === w.d; })) d.waist.push({ d: w.d, cm: w.waist });
      delete w.waist;
    });
  }
  function load() {
    var d = defaults();
    try {
      var j = JSON.parse(localStorage.getItem(KEY));
      if (j && typeof j === 'object') {
        Object.keys(d).forEach(function (k) { if (j[k] != null) d[k] = j[k]; });
        d.settings = Object.assign({ ack: false, rest: 45, awake: true, sound: true }, j.settings || {});
        d.profile = Object.assign({ name: '', height: '', goal: '', age: '', sex: '' }, j.profile || {});
        migrateWaist(d);
      }
    } catch (e) { /* données illisibles : on repart de zéro */ }
    if (!Array.isArray(d.activities)) d.activities = [];
    if (!d.equip || typeof d.equip !== 'object') d.equip = { have: defaultHave(), custom: [], weights: '' };
    if (!Array.isArray(d.equip.have)) d.equip.have = defaultHave();
    if (!Array.isArray(d.equip.custom)) d.equip.custom = [];
    if (typeof d.equip.weights !== 'string') d.equip.weights = '';
    if (!d.variant || typeof d.variant !== 'object') d.variant = {};
    return d;
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* stockage plein ou bloqué */ } }

  var ui = { metric: 'kg', prog: null, tab: 'home', track: 'poids', grp: 'Tous' };
  var deferredInstall = null;

  /* ---------- doses ---------- */
  function doseOf(ex, o) { return Object.assign({}, ex.dose, o || {}); }
  function doseLabel(d) {
    var side = d.perSide ? ' par côté' : '';
    if (d.type === 'reps') return d.sets + ' × ' + d.reps + ' répétitions' + side;
    if (d.type === 'time') return d.sets + ' × ' + d.secs + ' s' + side;
    return d.mins + ' min';
  }
  function estMinutes(items) {
    var s = 0;
    items.forEach(function (it) {
      var ex = EX[it.id], d = doseOf(ex, it), k = d.perSide ? 2 : 1;
      if (d.type === 'reps') s += d.sets * (d.reps * k * 3.5) + (d.sets - 1) * ex.rest;
      else if (d.type === 'time') s += d.sets * d.secs * k + (d.sets - 1) * ex.rest;
      else s += d.mins * 60;
      s += 30;
    });
    return Math.max(5, Math.ceil(s / 60 / 5) * 5);
  }

  /* ---------- graphiques ---------- */
  function chart(series, o) {
    o = o || {};
    var all = [];
    series.forEach(function (s) { all = all.concat(s.pts); });
    if (!all.length) return '<p class="muted">Pas encore de données.</p>';
    var W = 320, H = 170, pl = 30, pr = 10, pt = 10, pb = 22;
    var xs = all.map(function (p) { return parse(p.x).getTime(); });
    var x0 = Math.min.apply(null, xs), x1 = Math.max.apply(null, xs);
    var ys = all.map(function (p) { return p.y; });
    var y0 = o.min != null ? o.min : Math.min.apply(null, ys);
    var y1 = o.max != null ? o.max : Math.max.apply(null, ys);
    if (y0 === y1) { y0 -= 1; y1 += 1; }
    if (o.min == null) { var pad = (y1 - y0) * 0.15; y0 -= pad; y1 += pad; }
    var dec = o.dec != null ? o.dec : ((y1 - y0) < 4 ? 1 : 0);
    function X(t) { return x1 === x0 ? pl + (W - pl - pr) / 2 : pl + (t - x0) / (x1 - x0) * (W - pl - pr); }
    function Y(v) { return pt + (1 - (v - y0) / (y1 - y0)) * (H - pt - pb); }
    var out = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || 'Graphique') + '">';
    for (var i = 0; i <= 3; i++) {
      var v = y0 + (y1 - y0) * i / 3, y = Y(v);
      out += '<line class="gl" x1="' + pl + '" y1="' + y.toFixed(1) + '" x2="' + (W - pr) + '" y2="' + y.toFixed(1) + '"/>' +
        '<text x="' + (pl - 4) + '" y="' + (y + 3).toFixed(1) + '" text-anchor="end">' + (dec ? v.toFixed(dec) : Math.round(v)) + '</text>';
    }
    series.forEach(function (s) {
      var pts = s.pts.map(function (p) { return X(parse(p.x).getTime()).toFixed(1) + ',' + Y(p.y).toFixed(1); });
      out += '<polyline fill="none" stroke="' + s.color + '" stroke-width="2.5" stroke-linejoin="round" points="' + pts.join(' ') + '"/>';
      s.pts.forEach(function (p) {
        out += '<circle cx="' + X(parse(p.x).getTime()).toFixed(1) + '" cy="' + Y(p.y).toFixed(1) + '" r="3" fill="' + s.color + '"/>';
      });
    });
    var first = all.slice().sort(function (a, b) { return a.x < b.x ? -1 : 1; });
    out += '<text x="' + pl + '" y="' + (H - 6) + '">' + fmtDate(first[0].x) + '</text>' +
      '<text x="' + (W - pr) + '" y="' + (H - 6) + '" text-anchor="end">' + fmtDate(first[first.length - 1].x) + '</text></svg>';
    if (series.length > 1) {
      out += '<div class="legend">' + series.map(function (s) { return '<span><b style="background:' + s.color + '"></b>' + esc(s.name) + '</span>'; }).join('') + '</div>';
    }
    return out;
  }

  /* ---------- illustrations ---------- */
  function figBox(ex) {
    var cap = ex.cap && ex.frames && ex.frames.length > 1 ? '<div class="figcap">' + esc(ex.cap[0]) + ' → ' + esc(ex.cap[1]) + '</div>' :
      (ex.cap && ex.frames ? '<div class="figcap">' + esc(ex.cap[0]) + '</div>' : '');
    return '<div class="figbox">' + Fig.figureSvg(ex) + cap + '</div>';
  }
  function ytUrl(ex) { return 'https://www.youtube.com/results?search_query=' + encodeURIComponent(ex.yt || ex.name); }
  function safeUrl(u) { return /^https?:\/\//i.test(u || '') ? u : ''; }

  /* ---------- recommandation du jour ---------- */
  function todayPain() { return S.pains.filter(function (p) { return p.d === today(); })[0]; }
  function recommendation(p) {
    if (!p) return null;
    var m = Math.max(p.sci, p.knee);
    if (m >= 7) return { lvl: 'bad', text: 'Douleur élevée aujourd\'hui : pas de séance. Marchez très doucement si c\'est confortable, changez souvent de position. Si cela dure plus de quelques jours, voyez votre médecin ou votre kiné.', session: null };
    if (m >= 4) return { lvl: 'warn', text: 'Douleur modérée : faites plutôt la séance douce aujourd\'hui, et stoppez au moindre signe d\'aggravation.', session: 'douce' };
    return { lvl: 'ok', text: 'Douleur faible : une séance complète est possible. Gardez la douleur à 3/10 maximum pendant l\'effort.', session: nextSession() };
  }
  function nextSession() {
    var order = ['A', 'B', 'C'];
    var last = null;
    for (var i = S.sessions.length - 1; i >= 0; i--) {
      if (order.indexOf(S.sessions[i].id) >= 0) { last = S.sessions[i].id; break; }
    }
    return last ? order[(order.indexOf(last) + 1) % 3] : 'A';
  }
  function sessionObj(id) { return D.sessions.filter(function (s) { return s.id === id; })[0]; }

  /* ---------- vues ---------- */
  function viewHome() {
    var p = todayPain(), rec = recommendation(p);
    var wk = weekStart(today());
    var wkSessions = S.sessions.filter(function (s) { return weekStart(s.d) === wk; })
      .concat(S.activities.filter(function (a) { return a.coach && weekStart(a.d) === wk; }));
    var days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    var dots = days.map(function (l, i) {
      var d = parse(wk); d.setDate(d.getDate() + i); var k = ymd(d);
      var on = S.sessions.some(function (s) { return s.d === k; }) || S.activities.some(function (a) { return a.d === k; });
      return '<div class="dot' + (on ? ' on' : '') + (k === today() ? ' today' : '') + '"><i></i>' + l + '</div>';
    }).join('');
    var h = '<h1>Bonjour' + (S.profile.name ? ' ' + esc(S.profile.name) : '') + ' 👋</h1>';
    h += '<section class="card"><h2>Comment vous sentez-vous aujourd\'hui ?</h2>' +
      slider('sci', 'Douleur sciatique', p ? p.sci : 0) + slider('knee', 'Douleur au genou', p ? p.knee : 0) +
      '<button class="btn primary big" data-act="savepain" style="margin-top:12px">' + (p ? 'Mettre à jour' : 'Enregistrer') + '</button>';
    if (rec) {
      h += '<div class="banner ' + rec.lvl + '">' + esc(rec.text) + '</div>';
      if (rec.session) h += '<button class="btn primary big" data-act="preview" data-id="' + rec.session + '">▶ ' + esc(sessionObj(rec.session).name) + '</button>';
    }
    h += '</section>';
    h += '<section class="card"><div class="row sb"><h2>Cette semaine</h2><span class="pill">' + wkSessions.length + ' / 3 séances</span></div>' +
      '<div class="dots">' + dots + '</div>' +
      '<p class="muted">Objectif : 3 séances et de la marche les autres jours. Un jour de repos entre deux séances de renforcement.</p></section>';
    h += '<button class="btn big" data-act="addact" style="margin-bottom:12px">➕ Ajouter une activité faite</button>';
    h += weightCard();
    if (deferredInstall) h += '<button class="btn big" data-act="install">📲 Installer l\'application sur le téléphone</button>';
    h += '<button class="btn big" data-act="safety" style="margin-top:10px">🛟 Règles de sécurité</button>';
    return h;
  }
  function slider(id, label, v) {
    return '<label for="' + id + '">' + label + ' : <b id="' + id + 'v">' + v + '</b>/10</label>' +
      '<input class="rng" type="range" id="' + id + '" min="0" max="10" step="1" value="' + v + '">';
  }
  function sortedWeights() { return S.weights.slice().sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; }); }
  function sortedWaist() { return S.waist.slice().sort(function (a, b) { return a.d < b.d ? -1 : a.d > b.d ? 1 : 0; }); }
  function fmtCm(v) { return (Math.round(v * 10) / 10).toString().replace('.', ',') + ' cm'; }
  function signed(v) { var r = Math.round(v * 10) / 10; return (r > 0 ? '+' : '') + r.toString().replace('.', ','); }
  function weightCard() {
    var w = sortedWeights(), wa = sortedWaist(), belly = '';
    if (wa.length) {
      var wl = wa[wa.length - 1], wd = wl.cm - wa[0].cm;
      belly = '<div class="row sb" style="margin-top:10px;padding-top:10px;border-top:1px solid var(--line)"><div><b>Tour de ventre : ' + fmtCm(wl.cm) + '</b><div class="muted">au ' + fmtDate(wl.d) + '</div></div>' +
        (wa.length > 1 ? '<div style="text-align:right"><b>' + signed(wd) + ' cm</b><div class="muted">depuis le début</div></div>' : '') + '</div>';
    }
    if (!w.length) return '<section class="card"><h2>Poids</h2><p class="muted">Ajoutez votre poids dans l\'onglet Suivi pour voir votre progression.</p>' + belly + '</section>';
    var last = w[w.length - 1], first = w[0], diff = last.kg - first.kg;
    var goal = num(S.profile.goal);
    var h = '<section class="card"><h2>Poids</h2><div class="row sb"><div><div class="big-num">' + fmtKg(last.kg) + '</div><div class="muted">au ' + fmtDate(last.d) + '</div></div>' +
      '<div style="text-align:right"><b>' + (diff > 0 ? '+' : '') + (Math.round(diff * 10) / 10).toString().replace('.', ',') + ' kg</b><div class="muted">depuis le début</div></div></div>';
    if (goal) h += '<p class="muted">Objectif : ' + fmtKg(goal) + ' (reste ' + fmtKg(Math.max(0, last.kg - goal)) + ')</p>';
    return h + belly + '</section>';
  }

  function viewSessions() {
    var h = '<h1>Séances</h1><button class="btn big" data-act="addact" style="margin-bottom:12px">➕ Ajouter une activité hors séance</button>';
    D.sessions.forEach(function (s) {
      h += '<section class="card"><div class="row sb"><h2 style="margin:0">' + esc(s.name) + '</h2><span class="pill">' + esc(s.tag) + '</span></div>' +
        '<p class="muted">' + esc(s.desc) + '</p><p class="muted">' + s.items.length + ' exercices · environ ' + estMinutes(s.items) + ' min</p>' +
        '<button class="btn primary" data-act="preview" data-id="' + s.id + '">Voir et démarrer</button></section>';
    });
    h += '<section class="card"><h2>Semaine type</h2><ul class="t"><li>Lundi : séance A</li><li>Mardi : marche (20 à 30 min)</li><li>Mercredi : séance B</li><li>Jeudi : vélo ou piscine, ou marche</li><li>Vendredi : séance A</li><li>Samedi : séance C</li><li>Dimanche : repos</li></ul>' +
      '<p class="muted">Les jours de douleur, remplacez par la séance douce.</p></section>';
    return h;
  }

  function viewExos() {
    var chips = ['Tous'].concat(D.groups).map(function (g) {
      return '<button class="chip' + (ui.grp === g ? ' on' : '') + '" data-act="grp" data-g="' + esc(g) + '">' + esc(g) + '</button>';
    }).join('');
    var list = D.exos.filter(function (e) { return ui.grp === 'Tous' || e.group === ui.grp; });
    return '<h1>Exercices</h1><div class="chips">' + chips + '</div><div class="grid">' + list.map(function (e) {
      return '<button class="ex" data-act="exo" data-id="' + e.id + '">' + figBox(e).replace(/<div class="figcap">.*?<\/div>/, '') +
        '<div class="t">' + esc(e.name) + '</div><div class="d">' + esc(doseLabel(e.dose)) + '</div></button>';
    }).join('') + '</div>';
  }


  /* ---------- composition corporelle ---------- */
  var BODY_COLOR = '#0f766e';
  function f1(v, d) { var k = Math.pow(10, d); return (Math.round(v * k) / k).toString().replace('.', ','); }
  function bsigned(v, d) { var r = Math.round(v * Math.pow(10, d)) / Math.pow(10, d); return (r > 0 ? '+' : '') + r.toString().replace('.', ','); }
  function imcOf(kg) { var hg = num(S.profile.height); return hg && hg > 100 && hg < 250 ? kg / Math.pow(hg / 100, 2) : null; }
  var METRICS = [
    { k: 'kg', n: 'Poids', u: 'kg', dec: 1, get: function (x) { return x.kg; } },
    { k: 'imc', n: 'IMC', u: '', dec: 1, get: function (x) { return imcOf(x.kg); } },
    { k: 'fat', n: 'Graisse', u: '%', dec: 1, get: function (x) { return x.fat; } },
    { k: 'muscle', n: 'Muscle', u: 'kg', dec: 1, get: function (x) { return x.muscle; } },
    { k: 'visc', n: 'Viscérale', u: '', dec: 1, get: function (x) { return x.visc; } },
    { k: 'bone', n: 'Os', u: 'kg', dec: 2, get: function (x) { return x.bone; } }
  ];
  function metricPts(m) {
    return sortedWeights().map(function (x) { var v = m.get(x); return v == null ? null : { x: x.d, y: v }; }).filter(Boolean);
  }
  /* IMC : classification de l'OMS */
  function imcCat(v) {
    if (v < 18.5) return { t: 'insuffisance pondérale', c: 'warn' };
    if (v < 25) return { t: 'corpulence normale', c: 'ok' };
    if (v < 30) return { t: 'surpoids', c: 'warn' };
    return { t: 'obésité', c: 'bad' };
  }
  /* graisse corporelle : plages indicatives par sexe et tranche d'âge (adultes) */
  function fatRange() {
    var sex = S.profile.sex, age = num(S.profile.age);
    if (!sex || !age || age < 20) return null;
    var i = age < 40 ? 0 : age < 60 ? 1 : 2;
    return sex === 'F' ? [[21, 33], [23, 35], [24, 36]][i] : [[8, 20], [11, 22], [13, 25]][i];
  }
  function fatCat(v) {
    var r = fatRange(); if (!r) return null;
    var rg = r[0] + '–' + r[1] + ' %';
    if (v < r[0]) return { t: 'sous les repères (' + rg + ')', c: 'warn' };
    if (v > r[1]) return { t: 'au-dessus des repères (' + rg + ')', c: 'warn' };
    return { t: 'dans les repères (' + rg + ')', c: 'ok' };
  }
  /* graisse viscérale : échelle propre à chaque marque de balance */
  function viscCat(v) {
    if (v <= 9) return { t: 'normal', c: 'ok' };
    if (v <= 12) return { t: 'zone limite', c: 'warn' };
    if (v < 15) return { t: 'élevé', c: 'bad' };
    return { t: 'très élevé', c: 'bad' };
  }
  function bodyView() {
    var w = sortedWeights(), last = w[w.length - 1], hgt = num(S.profile.height);
    var hasH = hgt && hgt > 100 && hgt < 250;
    var h = '';
    if (!w.length) {
      h += '<section class="card"><h2>Mes mesures</h2><p class="muted">Pesez-vous, puis saisissez ce que votre balance affiche (seul le poids est obligatoire).</p></section>';
    } else {
      h += '<section class="card"><h2>Mes mesures</h2><div class="tiles">' + METRICS.map(function (m) {
        var pts = metricPts(m), l = pts[pts.length - 1], pv = pts[pts.length - 2], tag = '', sub = '';
        if (m.k === 'imc' && !hasH) tag = '<div class="tag info">indiquez votre taille ci-dessous</div>';
        if (l) {
          sub = fmtDate(l.x) + (pv ? ' · ' + bsigned(l.y - pv.y, m.dec) : '');
          var c = null;
          if (m.k === 'imc') c = imcCat(l.y);
          else if (m.k === 'fat') { c = fatCat(l.y); if (!c) tag = '<div class="tag info">indiquez sexe et âge dans Profil</div>'; }
          else if (m.k === 'visc') c = viscCat(l.y);
          else if (m.k === 'muscle') {
            var en = w.filter(function (x) { return x.d === l.x; })[0];
            if (en && en.kg) tag = '<div class="tag info">' + f1(l.y / en.kg * 100, 0) + ' % du poids</div>';
          } else if (m.k === 'bone') tag = '<div class="tag info">suivre la tendance</div>';
          if (c) tag = '<div class="tag ' + c.c + '">' + esc(c.t) + '</div>';
        }
        return '<div class="tile"><div class="tl">' + m.n + '</div><div class="tv">' + (l ? f1(l.y, m.dec) + (m.u ? ' <small>' + m.u + '</small>' : '') : '—') + '</div>' +
          (sub ? '<div class="muted">' + sub + '</div>' : '') + tag + '</div>';
      }).join('') + '</div></section>';
    }
    h += '<section class="card"><h2>Ajouter une mesure</h2>' +
      '<label for="wkg">Poids (kg)</label><input id="wkg" type="text" inputmode="decimal" placeholder="obligatoire, ex. 62,5">' +
      (hasH ? '' : '<label for="bheight">Taille (cm) — pour calculer l\'IMC</label><input id="bheight" type="text" inputmode="decimal" placeholder="ex. 165">') +
      '<div class="row"><div class="grow"><label for="wfat">Graisse (%)</label><input id="wfat" type="text" inputmode="decimal" placeholder="facultatif"></div>' +
      '<div class="grow"><label for="wvisc">Viscérale</label><input id="wvisc" type="text" inputmode="decimal" placeholder="indice, facultatif"></div></div>' +
      '<label for="wmus">Masse musculaire</label><div class="row"><input id="wmus" type="text" inputmode="decimal" placeholder="facultatif"><select id="wmunit" style="width:84px;flex:none"><option value="kg">kg</option><option value="%">%</option></select></div>' +
      '<label for="wbone">Masse osseuse (kg)</label><input id="wbone" type="text" inputmode="decimal" placeholder="facultatif">';

    h += '<button class="btn primary big" data-act="addweight" style="margin-top:12px">Enregistrer</button>' +
      '<p class="muted">Une mesure par jour : si vous enregistrez de nouveau aujourd\'hui, les champs remplis remplacent les anciens.</p></section>';
    var shown = METRICS.filter(function (m) { return m.k === 'kg' || metricPts(m).length; });
    var cur = shown.filter(function (m) { return m.k === ui.metric; })[0] || shown[0];
    h += '<section class="card"><h2>Évolution</h2><div class="chips">' + shown.map(function (m) {
      return '<button class="chip' + (m === cur ? ' on' : '') + '" data-act="metric" data-m="' + m.k + '">' + m.n + '</button>';
    }).join('') + '</div>' +
      chart([{ name: cur.n, color: BODY_COLOR, pts: metricPts(cur) }], { dec: cur.dec, label: 'Évolution : ' + cur.n }) +
      '<p class="muted">Objectif : une graisse corporelle qui baisse, en gardant (ou en augmentant) la masse musculaire.</p></section>';
    h += '<section class="card"><details><summary>Comment lire ces chiffres ?</summary>' +
      '<ul class="t"><li><b>Même conditions à chaque fois</b> : même balance, le matin, à jeun, pieds secs. Les balances connectées (impédance) donnent des estimations : regardez la tendance, pas un chiffre isolé.</li>' +
      '<li><b>IMC</b> : classification de l\'OMS (moins de 18,5 · 18,5 à 24,9 · 25 à 29,9 · 30 et plus). Elle ne distingue pas le muscle de la graisse.</li>' +
      '<li><b>Graisse corporelle</b> : repères indicatifs selon le sexe et l\'âge (adultes de 20 à 79 ans).</li>' +
      '<li><b>Graisse viscérale</b> : l\'échelle dépend de la marque de la balance (en général 9 ou moins = normal, 10 à 12 = limite selon les marques, 13 et plus = élevé, 15 et plus = très élevé). C\'est un indicateur relatif, pas un diagnostic.</li>' +
      '<li><b>Masse musculaire et osseuse</b> : pas de seuil fiable avec une balance, on suit l\'évolution dans le temps. Une baisse durable de la masse osseuse mérite d\'en parler à votre médecin.</li></ul>' +
      '<p class="muted">Ces repères ne remplacent pas un avis médical.</p></details></section>';
    h += '<section class="card"><h2>Historique</h2>' + (w.length ? '<ul class="list">' + w.slice().reverse().slice(0, 30).map(function (x) {
      var bits = [];
      if (x.fat != null) bits.push('graisse ' + f1(x.fat, 1) + ' %');
      if (x.muscle != null) bits.push('muscle ' + f1(x.muscle, 1) + ' kg');
      if (x.visc != null) bits.push('visc. ' + f1(x.visc, 1));
      if (x.bone != null) bits.push('os ' + f1(x.bone, 2) + ' kg');

      return '<li><div class="grow"><b>' + fmtKg(x.kg) + '</b><div class="muted">' + fmtDate(x.d) + (bits.length ? ' · ' + bits.join(' · ') : '') + '</div></div>' +
        '<button class="btn small danger" data-act="delweight" data-d="' + x.d + '" aria-label="Supprimer la mesure du ' + fmtDate(x.d) + '">✕</button></li>';
    }).join('') + '</ul>' : '<p class="muted">Aucune mesure.</p>') + '</section>';
    return h;
  }
  function viewTrack() {
    var tabs = [['poids', 'Corps'], ['ventre', 'Ventre'], ['douleur', 'Douleurs'], ['prog', 'Progrès'], ['histo', 'Séances']];
    var h = '<h1>Suivi</h1><div class="seg">' + tabs.map(function (t) {
      return '<button class="' + (ui.track === t[0] ? 'on' : '') + '" data-act="track" data-t="' + t[0] + '">' + t[1] + '</button>';
    }).join('') + '</div>';
    if (ui.track === 'poids') {
      h += bodyView();
    } else if (ui.track === 'ventre') {
      var wa = sortedWaist();
      h += '<section class="card"><h2>Ajouter une mesure</h2><label for="wcm">Tour de ventre (cm)</label><input id="wcm" type="text" inputmode="decimal" placeholder="ex. 98,5">' +
        '<button class="btn primary big" data-act="addwaist" style="margin-top:12px">Enregistrer</button>' +
        '<details><summary>Comment bien mesurer</summary><p>Debout, ventre relâché, mètre de couturière à plat au niveau du nombril (sans serrer ni creuser le ventre). Mesurez après une expiration normale, de préférence le matin, et toujours de la même façon.</p></details></section>';
      h += '<section class="card"><h2>Évolution</h2>' + chart([{ name: 'Tour de ventre', color: '#b45309', pts: wa.map(function (x) { return { x: x.d, y: x.cm }; }) }], { dec: 1, label: 'Évolution du tour de ventre' });
      if (wa.length > 1) {
        var wl2 = wa[wa.length - 1], wp = wa[wa.length - 2];
        h += '<div class="row sb" style="margin-top:8px"><div><b>' + signed(wl2.cm - wp.cm) + ' cm</b><div class="muted">depuis la mesure précédente</div></div>' +
          '<div style="text-align:right"><b>' + signed(wl2.cm - wa[0].cm) + ' cm</b><div class="muted">depuis le début</div></div></div>';
      }
      h += '<p class="muted">Mesurez une fois par semaine, pas tous les jours : les variations d\'un jour à l\'autre sont normales. Une baisse régulière sur plusieurs semaines est un bon signe, même quand la balance bouge peu.</p></section>';
      h += '<section class="card"><h2>Historique</h2>' + (wa.length ? '<ul class="list">' + wa.slice().reverse().slice(0, 30).map(function (x) {
        return '<li><div class="grow"><b>' + fmtCm(x.cm) + '</b><div class="muted">' + fmtDate(x.d) + '</div></div><button class="btn small danger" data-act="delwaist" data-d="' + x.d + '" aria-label="Supprimer">🗑</button></li>';
      }).join('') + '</ul>' : '<p class="muted">Aucune mesure.</p>') + '</section>';
    } else if (ui.track === 'douleur') {
      var p = S.pains.slice().sort(function (a, b) { return a.d < b.d ? -1 : 1; }).slice(-30);
      h += '<section class="card"><h2>Douleurs (0 à 10)</h2>' + chart([
        { name: 'Sciatique', color: '#d97706', pts: p.map(function (x) { return { x: x.d, y: x.sci }; }) },
        { name: 'Genou', color: '#2563eb', pts: p.map(function (x) { return { x: x.d, y: x.knee }; }) }
      ], { min: 0, max: 10, label: 'Évolution des douleurs' }) +
        '<p class="muted">Enregistrez votre douleur chaque jour depuis l\'accueil. Montrez ce graphique à votre médecin ou kiné.</p></section>';
    } else if (ui.track === 'prog') {
      h += progHtml();
    } else {
      var nCoach = S.activities.filter(function (a) { return a.coach; }).length, tot = S.sessions.length + nCoach, mins = S.sessions.reduce(function (a, s) { return a + (s.mins || 0); }, 0) + totalActMins();
      h += '<section class="card"><div class="row"><div class="grow"><div class="big-num">' + tot + '</div><div class="muted">séances</div></div><div class="grow"><div class="big-num">' + mins + '</div><div class="muted">minutes</div></div></div></section>';
      h += '<section class="card"><h2>Séances faites</h2>' + (S.sessions.length ? '<ul class="list">' + S.sessions.slice().reverse().slice(0, 40).map(function (s) {
        return '<li><div class="grow"><b>' + esc(s.name) + '</b><div class="muted">' + fmtDate(s.d) + ' · ' + s.mins + ' min' + (s.sci != null ? ' · douleur après : dos ' + s.sci + ', genou ' + s.knee : '') + '</div>' + detHtml(s) + '</div></li>';
      }).join('') + '</ul>' : '<p class="muted">Aucune séance enregistrée dans l\'appli' + (nCoach ? ' (vos séances Coach sont dans la liste ci-dessous).' : '.') + '</p>') + '</section>';
      h += actListHtml();
    }
    return h;
  }

  function viewProfile() {
    var p = S.profile;
    return '<h1>Profil</h1><section class="card"><label for="pname">Prénom</label><input id="pname" type="text" value="' + esc(p.name) + '">' +
      '<label for="pheight">Taille (cm)</label><input id="pheight" type="text" inputmode="decimal" value="' + esc(p.height) + '">' +
      '<label for="page">Âge</label><input id="page" type="text" inputmode="numeric" value="' + esc(p.age) + '">' +
      '<label for="psex">Sexe (pour interpréter le taux de graisse)</label><select id="psex"><option value="">—</option><option value="F"' + (p.sex === 'F' ? ' selected' : '') + '>Femme</option><option value="M"' + (p.sex === 'M' ? ' selected' : '') + '>Homme</option></select>' +
      '<label for="pgoal">Poids objectif (kg)</label><input id="pgoal" type="text" inputmode="decimal" step="0.1" value="' + esc(p.goal) + '">' +
      '<label for="prest">Temps de repos entre séries</label><select id="prest">' + [30, 45, 60, 90].map(function (v) {
        return '<option value="' + v + '"' + (S.settings.rest === v ? ' selected' : '') + '>' + v + ' secondes</option>';
      }).join('') + '</select>' +
      '<button class="btn primary big" data-act="saveprofile" style="margin-top:12px">Enregistrer</button></section>' +
      equipCard() +
      '<section class="card"><h2>Écran et son</h2>' +
      '<label class="chk"><input type="checkbox" id="sawake"' + (S.settings.awake !== false ? ' checked' : '') + '> Garder l\'écran allumé quand l\'application est ouverte</label>' +
      '<label class="chk"><input type="checkbox" id="ssound"' + (S.settings.sound !== false ? ' checked' : '') + '> Bip à la fin du chrono et au changement de côté</label>' +
      '<button class="btn big" data-act="testsound">🔊 Tester le son</button><p class="muted">Si vous n\'entendez rien, montez le volume multimédia du téléphone.</p></section>' +
      '<section class="card"><h2>Sauvegarde</h2><p class="muted">Vos données restent sur ce téléphone. Exportez-les de temps en temps.</p>' +
      '<div class="row"><button class="btn grow" data-act="export">⬇ Exporter</button><button class="btn grow" data-act="import">⬆ Importer</button></div>' +
      '<input type="file" id="file" accept="application/json,.json" hidden></section>' +
      '<section class="card"><button class="btn big" data-act="safety">🛟 Règles de sécurité</button>' +
      (deferredInstall ? '<button class="btn big" data-act="install" style="margin-top:10px">📲 Installer l\'application</button>' : '') +
      '<button class="btn big danger" data-act="reset" style="margin-top:10px">Effacer toutes mes données</button></section>' +
      '<p class="muted" style="text-align:center">FitSanté v8 · ne remplace pas un avis médical</p>';
  }

  /* ---------- matériel et versions « avec / sans matériel » ---------- */
  function eqInfo(id) { return (D.equipment || []).filter(function (e) { return e.id === id; })[0]; }
  function eqShort(id) { var e = eqInfo(id); return e ? e.short : id; }
  function hasEq(id) {
    return S.equip.have.indexOf(id) >= 0 || S.equip.custom.some(function (c) { return c.type === id; });
  }
  function eqOK(ex) { return !ex.eq || ex.eq.some(hasEq); }
  function eqNames(ex) { return ex.eq.map(eqShort).join(' ou '); }
  function effNoEq(ex) {
    var m = S.variant[ex.id];
    if (m === 'eq') return false;
    if (m === 'noeq') return true;
    return !eqOK(ex);
  }
  var noeqCache = {};
  function resolveEx(ex) {
    if (!ex.eq || ex.dose.type === 'cardio' || !effNoEq(ex)) return ex;
    if (ex.sub && EX[ex.sub]) return EX[ex.sub];
    if (!noeqCache[ex.id]) noeqCache[ex.id] = Object.assign({}, ex, {
      loaded: false, noeqView: true, name: ex.name + ' (sans matériel)',
      steps: ex.noeq ? [ex.noeq].concat(ex.steps) : ex.steps
    });
    return noeqCache[ex.id];
  }
  function eqBlock(ex) {
    if (!ex.eq) return '';
    var have = eqOK(ex), miss = have ? '' : ' (non coché dans Profil)';
    if (ex.dose.type === 'cardio') return '<div class="banner ' + (have ? 'ok' : 'warn') + '">🧰 Matériel : ' + esc(eqNames(ex)) + miss + '</div>';
    var ne = effNoEq(ex);
    return '<div class="banner ok">🧰 Matériel : ' + esc(eqNames(ex)) + miss + '</div>' +
      '<label for="xvar">Version à faire</label><select id="xvar" data-id="' + ex.id + '"><option value="eq"' + (ne ? '' : ' selected') + '>Avec matériel</option><option value="noeq"' + (ne ? ' selected' : '') + '>Sans matériel</option></select>' +
      (ex.noeq ? '<details' + (ne ? ' open' : '') + '><summary>Version sans matériel</summary><p>' + esc(ex.noeq) + (ex.sub && EX[ex.sub] ? ' Dans les séances, cet exercice est remplacé par « ' + esc(EX[ex.sub].name) + ' ».' : '') + '</p></details>' : '');
  }
  function equipCard() {
    var eq = S.equip;
    var h = '<section class="card"><h2>Mon matériel</h2><p class="muted">Cochez ce que vous avez à la maison. Quand un exercice demande du matériel que vous n\'avez pas, il passe automatiquement en version « sans matériel ». Vous pouvez aussi choisir la version à la main sur chaque exercice.</p>';
    h += D.equipment.map(function (e) {
      return '<label class="chk"><input type="checkbox" data-eq="' + e.id + '"' + (eq.have.indexOf(e.id) >= 0 ? ' checked' : '') + '> ' + esc(e.name) + '</label>';
    }).join('');
    h += '<label for="eqweights">Charges disponibles (kg), facultatif</label><input id="eqweights" type="text" maxlength="60" value="' + esc(eq.weights) + '" placeholder="ex. 2, 4, 8">';
    h += '<h3>Ajouter un autre matériel</h3>';
    if (eq.custom.length) h += '<ul class="list">' + eq.custom.map(function (c) {
      var t = eqInfo(c.type);
      return '<li><div class="grow"><b>' + esc(c.name) + '</b><div class="muted">' + (t ? 'compte comme : ' + esc(t.short) : 'noté seulement') + '</div></div><button class="btn small danger" data-act="delcustom" data-k="' + esc(c.k) + '" aria-label="Supprimer">🗑</button></li>';
    }).join('') + '</ul>';
    h += '<label for="cname">Nom (ex. kettlebell 8 kg)</label><input id="cname" type="text" maxlength="40">' +
      '<label for="ctype">Il remplace…</label><select id="ctype">' + D.equipment.map(function (e) { return '<option value="' + e.id + '">' + esc(e.short) + '</option>'; }).join('') + '<option value="">rien (juste le noter)</option></select>' +
      '<button class="btn big" data-act="addcustom" style="margin-top:10px">➕ Ajouter</button>' +
      '<button class="btn big" data-act="resetvar" style="margin-top:8px">Remettre les versions en automatique</button></section>';
    return h;
  }

  /* ---------- résultats réalisés, activités libres, progrès ---------- */
  function sgn(v) { var r = Math.round(v * 10) / 10; return (r > 0 ? '+' : '') + String(r).replace('.', ','); }
  function plannedOf(d) { return d.type === 'reps' ? d.reps : (d.type === 'time' ? d.secs : d.mins); }
  function unitOf(ex) { var t = ex.dose.type; return t === 'reps' ? ' rép.' : (t === 'time' ? ' s' : ' min'); }
  function planStr(ex, x) {
    var t = ex.dose.type, side = ex.dose.perSide ? ' par côté' : '';
    if (t === 'cardio') return x.plan + ' min';
    return x.sets + ' × ' + x.plan + (t === 'time' ? ' s' : ' rép.') + side;
  }
  function doneStr(ex, done) { return done.length ? done.join(' + ') + unitOf(ex) : 'passé'; }
  function isFull(ex, x) {
    var n = ex.dose.type === 'cardio' ? 1 : x.sets;
    return x.done.length >= n && x.done.every(function (v) { return v >= x.plan; });
  }
  function badge(ok) {
    return ok ? '<span class="pill">complet</span>' : '<span class="pill" style="background:var(--warn-bg);color:var(--warn)">partiel</span>';
  }
  function recordSet(v) { P.res[P.i] = (P.res[P.i] || []).concat([v]); }
  function readDone(natural) {
    var d = P.items[P.i].dose, plan = plannedOf(d), el = $('#pdone');
    var max = d.type === 'reps' ? 500 : (d.type === 'time' ? 3600 : 600);
    var touched = !!el && el.value.trim() !== String(plan);
    if (!natural && !touched && P.mode === 'timer' && d.type !== 'reps' && !(d.type === 'time' && d.perSide)) {
      var left = remaining();
      if (left > 0) {
        var elapsed = P.total - left;
        return d.type === 'time' ? Math.max(1, elapsed) : Math.max(1, Math.round(elapsed / 60));
      }
      return plan;
    }
    if (!el) return plan;
    var v = num(el.value);
    if (v == null || v < 0 || v > max || Math.round(v) !== v) {
      if (natural) return plan;
      alert('Entrez un nombre entier valide pour ce que vous avez réellement fait.');
      return null;
    }
    return v;
  }
  function buildDet() {
    return P.items.map(function (it, i) {
      var d = it.dose;
      return { id: it.ex.id, sets: d.type === 'cardio' ? 1 : d.sets, plan: plannedOf(d), done: P.res[i] || [] };
    });
  }
  function detHtml(s) {
    if (!s.det || !s.det.length) return '';
    return '<details><summary>Détail des exercices</summary><ul class="list">' + s.det.map(function (x) {
      var ex = EX[x.id]; if (!ex) return '';
      return '<li><div class="grow"><b>' + ex.icon + ' ' + esc(ex.name) + '</b><div class="muted">Prévu : ' + esc(planStr(ex, x)) + ' · Réalisé : ' + esc(doneStr(ex, x.done)) + '</div></div>' +
        (x.done.length ? badge(isFull(ex, x)) : '') + '</li>';
    }).join('') + '</ul></details>';
  }
  function validDate(d) { return /^\d{4}-\d{2}-\d{2}$/.test(d || '') && d <= today(); }
  function actMins(a) {
    if (a.coach) return a.mins || 0;
    var ex = EX[a.id]; if (!ex) return 0;
    var k = ex.dose.perSide ? 2 : 1;
    if (ex.dose.type === 'cardio') return a.mins || 0;
    if (ex.dose.type === 'time') return Math.max(1, Math.round(a.sets * a.secs * k / 60));
    return Math.max(1, Math.round(a.sets * a.reps * k * 3.5 / 60));
  }
  function totalActMins() { return S.activities.reduce(function (t, a) { return t + actMins(a); }, 0); }
  function actLabel(a) {
    var ex = EX[a.id]; if (!ex) return '';
    var side = ex.dose.perSide ? ' par côté' : '';
    if (ex.dose.type === 'cardio') return a.mins + ' min';
    if (ex.dose.type === 'time') return a.sets + ' × ' + a.secs + ' s' + side;
    return a.sets + ' × ' + a.reps + ' répétitions' + side + (a.kg ? ' · ' + String(a.kg).replace('.', ',') + ' kg' : '');
  }
  function actFields(id) {
    var ex = EX[id], d = ex.dose, side = d.perSide ? ' (par côté)' : '';
    function f(i, label, v) { return '<div class="grow"><label for="' + i + '">' + label + '</label><input id="' + i + '" type="text" inputmode="numeric" value="' + esc(v) + '"></div>'; }
    if (d.type === 'cardio') return '<div class="row">' + f('amin', 'Durée (minutes)', d.mins) + '</div>';
    if (d.type === 'time') return '<div class="row">' + f('asets', 'Séries', d.sets) + f('asecs', 'Secondes par série' + side, d.secs) + '</div>';
    var h = '<div class="row">' + f('asets', 'Séries', d.sets) + f('areps', 'Répétitions par série' + side, d.reps) + '</div>';
    if (ex.loaded) {
      var lk = S.loads && S.loads[id];
      h += '<label for="akg">Charge (kg), facultatif</label><input id="akg" type="text" inputmode="decimal" value="' + (lk != null ? esc(String(lk).replace('.', ',')) : '') + '">';
    }
    return h;
  }
  function actSheet(pre) {
    var id = pre && EX[pre] ? pre : D.exos[0].id;
    var opts = D.groups.map(function (g) {
      return '<optgroup label="' + esc(g) + '">' + D.exos.filter(function (e) { return e.group === g; }).map(function (e) {
        return '<option value="' + e.id + '"' + (e.id === id ? ' selected' : '') + '>' + esc(e.name) + '</option>';
      }).join('') + '</optgroup>';
    }).join('');
    openSheet('<div class="top"><h2 style="margin:0">Ajouter une activité</h2><button class="x" data-act="close" aria-label="Fermer">✕</button></div>' +
      '<p class="muted">Notez ce que vous avez fait en dehors des séances prévues, avec les quantités réellement faites.</p>' +
      '<button class="btn" data-act="coachsheet" style="width:100%;margin-bottom:4px">🏋️ C\'était une séance Coach (méthode Lafay)</button>' +
      '<label for="aex">Exercice</label><select id="aex">' + opts + '</select>' +
      '<label for="adate">Date</label><input id="adate" type="date" value="' + today() + '" max="' + today() + '">' +
      '<div id="afields" style="margin-top:4px">' + actFields(id) + '</div>' +
      '<button class="btn primary big" data-act="saveact" style="margin-top:16px">Enregistrer</button>');
  }
  function actListHtml() {
    var list = S.activities.slice().sort(function (a, b) { return a.d < b.d ? 1 : (a.d > b.d ? -1 : (a.k < b.k ? 1 : -1)); }).slice(0, 40);
    return '<section class="card"><div class="row sb"><h2 style="margin:0">Activités libres</h2><button class="btn small" data-act="addact">➕ Ajouter</button></div>' +
      (list.length ? '<ul class="list">' + list.map(function (a) {
        if (a.coach) return '<li><div class="grow"><b>🏋️ ' + esc(a.title || 'Séance Coach Lafay') + '</b><div class="muted">' + fmtDate(a.d) + ' · Coach Lafay · ' + a.mins + ' min' + (a.note ? ' · ' + esc(a.note) : '') + '</div></div><button class="btn small danger" data-act="delact" data-k="' + esc(a.k) + '" aria-label="Supprimer">🗑</button></li>';
        var ex = EX[a.id]; if (!ex) return '';
        return '<li><div class="grow"><b>' + ex.icon + ' ' + esc(ex.name) + '</b><div class="muted">' + fmtDate(a.d) + ' · ' + esc(actLabel(a)) + '</div></div><button class="btn small danger" data-act="delact" data-k="' + esc(a.k) + '" aria-label="Supprimer">🗑</button></li>';
      }).join('') + '</ul>' : '<p class="muted">Aucune activité pour l\'instant. Elles s\'ajoutent à vos minutes et à vos jours actifs de la semaine.</p>') + '</section>';
  }
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; t.setAttribute('role', 'status');
    document.body.appendChild(t); setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 2600);
  }
  function recs(id) {
    var ex = EX[id], out = [];
    if (!ex) return out;
    S.sessions.forEach(function (s) {
      (s.det || []).forEach(function (x) { if (x.id === id && x.done && x.done.length) out.push({ d: s.d, done: x.done, plan: x.plan, sets: x.sets, src: 'séance' }); });
    });
    S.activities.forEach(function (a) {
      if (a.id !== id) return;
      var t = ex.dose.type, v = t === 'reps' ? a.reps : (t === 'time' ? a.secs : a.mins), n = t === 'cardio' ? 1 : a.sets, arr = [];
      for (var i = 0; i < n; i++) arr.push(v);
      out.push({ d: a.d, done: arr, plan: v, sets: n, src: 'libre' });
    });
    return out.sort(function (a, b) { return a.d < b.d ? -1 : (a.d > b.d ? 1 : 0); });
  }
  function progHtml() {
    var list = D.exos.filter(function (e) { return !e.warm && recs(e.id).length; });
    if (!list.length) return '<section class="card"><h2>Progrès</h2><p class="muted">Terminez une séance ou ajoutez une activité libre : vos résultats apparaîtront ici, exercice par exercice.</p></section>';
    if (!ui.prog || !list.some(function (e) { return e.id === ui.prog; })) ui.prog = list[0].id;
    var ex = EX[ui.prog], unit = unitOf(ex).trim(), rs = recs(ui.prog);
    var pts = rs.map(function (r) { return { x: r.d, y: r.done.reduce(function (a, b) { return a + b; }, 0) }; });
    var best = Math.max.apply(null, rs.map(function (r) { return Math.max.apply(null, r.done); }));
    var h = '<section class="card"><label for="pgx" style="margin-top:0">Exercice</label><select id="pgx">' + list.map(function (e) {
      return '<option value="' + e.id + '"' + (e.id === ui.prog ? ' selected' : '') + '>' + esc(e.name) + '</option>';
    }).join('') + '</select><h2 style="margin-top:14px">Total par séance (' + unit + ')</h2>' +
      chart([{ name: ex.name, color: '#0f766e', pts: pts }], { label: 'Progrès : ' + ex.name }) +
      '<div class="row sb" style="margin-top:8px"><div><b>' + best + ' ' + unit + '</b><div class="muted">meilleure série</div></div>' +
      (pts.length > 1 ? '<div style="text-align:right"><b>' + sgn(pts[pts.length - 1].y - pts[0].y) + ' ' + unit + '</b><div class="muted">depuis le début</div></div>' : '') + '</div></section>';
    h += '<section class="card"><h2>Dernières fois</h2><ul class="list">' + rs.slice(-8).reverse().map(function (r) {
      return '<li><div class="grow"><b>' + fmtDate(r.d) + '</b> <span class="muted">· ' + r.src + '</span><div class="muted">' + (r.src === 'libre' ? '' : 'Prévu : ' + esc(planStr(ex, r)) + ' · ') + 'Réalisé : ' + esc(doneStr(ex, r.done)) + '</div></div>' + (r.src === 'libre' ? '' : badge(isFull(ex, r))) + '</li>';
    }).join('') + '</ul></section>';
    return h;
  }

  /* ---------- rendu principal ---------- */
  var TABS = [['home', '🏠', 'Accueil'], ['sessions', '🏋️', 'Séances'], ['exos', '📖', 'Exercices'], ['track', '📈', 'Suivi'], ['profile', '👤', 'Profil']];
  function render() {
    var v = { home: viewHome, sessions: viewSessions, exos: viewExos, track: viewTrack, profile: viewProfile }[ui.tab];
    $('#view').innerHTML = v();
    $('#nav').innerHTML = TABS.map(function (t) {
      return '<button class="' + (ui.tab === t[0] ? 'on' : '') + '" data-act="tab" data-t="' + t[0] + '"><span>' + t[1] + '</span>' + t[2] + '</button>';
    }).join('');
  }

  /* ---------- feuilles (détails) ---------- */
  function openSheet(html, full) {
    var o = $('#overlay');
    o.className = full ? 'full' : '';
    o.innerHTML = '<div class="sheet" role="dialog" aria-modal="true">' + html + '</div>';
    o.hidden = false;
  }
  function closeSheet() { $('#overlay').hidden = true; $('#overlay').innerHTML = ''; }

  function exoSheet(id) {
    var ex = EX[id], mine = safeUrl(S.videos[id]);
    var h = '<div class="top"><h2 style="margin:0">' + esc(ex.name) + '</h2><button class="x" data-act="close" aria-label="Fermer">✕</button></div>' +
      figBox(ex) + '<p><span class="pill">' + esc(ex.group) + '</span> <b>' + esc(doseLabel(ex.dose)) + '</b></p>' +
      '<h3>Comment faire</h3><ol>' + ex.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>';
    if (ex.tips && ex.tips.length) h += '<div class="banner ok">💡 ' + esc(ex.tips.join(' ')) + '</div>';
    h += eqBlock(ex);
    h += '<div class="banner bad">⚠️ <b>Arrêtez si :</b> ' + esc(ex.stop) + '</div>';
    h += '<details><summary>Version plus facile</summary><p>' + esc(ex.easier) + '</p></details>';
    h += '<button class="btn big" data-act="addact" data-id="' + id + '" style="margin-bottom:8px">➕ Noter que je l\'ai fait</button>';
    h += '<a class="btn big" target="_blank" rel="noopener" href="' + esc(ytUrl(ex)) + '">▶ Voir des vidéos de cet exercice</a>';
    if (mine) h += '<a class="btn big" style="margin-top:8px" target="_blank" rel="noopener" href="' + esc(mine) + '">🎬 Ma vidéo (kiné)</a>';
    h += '<details><summary>Ajouter ma propre vidéo</summary><label for="vurl">Lien (https://…)</label><input id="vurl" type="url" value="' + esc(mine) + '" placeholder="https://…">' +
      '<button class="btn primary" style="margin-top:8px" data-act="savevideo" data-id="' + id + '">Enregistrer le lien</button></details>';
    openSheet(h);
  }

  function previewSheet(id) {
    var s = sessionObj(id), adapted = 0, need = [];
    var rs = s.items.map(function (it) {
      var o = EX[it.id], r = resolveEx(o);
      if (o.eq && o.dose.type !== 'cardio') {
        if (effNoEq(o)) adapted++;
        else o.eq.forEach(function (q) { if (hasEq(q) && eqInfo(q) && !eqInfo(q).def && need.indexOf(q) < 0) need.push(q); });
      }
      return { it: it, o: o, ex: r, warm: !!(it.w || o.warm) };
    });
    function row(r) {
      var dd = doseOf(r.ex, r.ex.dose.type === r.o.dose.type ? r.it : null);
      return '<li><button class="chip" data-act="exo" data-id="' + r.o.id + '" style="border:0;background:none;padding:0;text-align:left;flex:1"><b>' + r.ex.icon + ' ' + esc(r.ex.name) + '</b><div class="muted">' + esc(doseLabel(dd)) + '</div></button></li>';
    }
    var warm = rs.filter(function (r) { return r.warm; }), main = rs.filter(function (r) { return !r.warm; });
    var h = '<div class="top"><h2 style="margin:0">' + esc(s.name) + '</h2><button class="x" data-act="close" aria-label="Fermer">✕</button></div>' +
      '<p class="muted">' + esc(s.desc) + ' Environ ' + estMinutes(s.items) + ' min.</p>';
    if (need.length) h += '<p class="muted">🧰 Matériel utilisé : ' + esc(need.map(eqShort).join(', ')) + '</p>';
    if (adapted) h += '<p class="muted">♻️ ' + adapted + ' exercice(s) adapté(s) sans matériel (modifiable dans Profil → Mon matériel).</p>';
    if (warm.length) h += '<h3>🔥 Échauffement</h3><ul class="list">' + warm.map(row).join('') + '</ul>';
    h += '<h3>' + (warm.length ? '💪 Séance' : 'Exercices') + '</h3><ul class="list">' + main.map(row).join('') + '</ul>' +
      '<div class="banner warn">Restez à 3/10 de douleur maximum pendant l\'effort et arrêtez si la douleur descend dans la jambe.</div>' +
      '<button class="btn primary big" data-act="start" data-id="' + id + '">▶ Démarrer la séance</button>';
    openSheet(h);
  }

  function safetySheet(first) {
    var sf = D.safety;
    var h = '<div class="top"><h2 style="margin:0">Avant de commencer</h2>' + (first ? '' : '<button class="x" data-act="close" aria-label="Fermer">✕</button>') + '</div>' +
      '<div class="banner warn">' + esc(sf.intro) + '</div>' +
      '<h3>Les règles d\'or</h3><ul class="t">' + sf.rules.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '<h3>À éviter</h3><ul class="t">' + sf.avoid.map(function (r) { return '<li>' + esc(r) + '</li>'; }).join('') + '</ul>' +
      '<h3>Consulter sans attendre</h3><div class="banner bad">' + sf.urgent.map(function (r) { return '<p>' + esc(r) + '</p>'; }).join('') + '</div>' +
      '<h3>Perte de poids</h3><p>' + esc(sf.weight) + '</p>';
    if (first) {
      h += '<h3>Votre profil (modifiable plus tard)</h3><label for="onname">Prénom</label><input id="onname" type="text">' +
        '<div class="row"><div class="grow"><label for="onh">Taille (cm)</label><input id="onh" type="text" inputmode="decimal"></div>' +
        '<div class="grow"><label for="onw">Poids (kg)</label><input id="onw" type="text" inputmode="decimal" step="0.1"></div></div>' +
        '<label for="onv">Tour de ventre (cm), facultatif</label><input id="onv" type="text" inputmode="decimal">' +
        '<label for="ong">Poids objectif (kg)</label><input id="ong" type="text" inputmode="decimal" step="0.1">' +
        '<button class="btn primary big" style="margin-top:16px" data-act="ack">J\'ai compris, commencer</button>';
    } else h += '<button class="btn big" data-act="close" style="margin-top:12px">Fermer</button>';
    openSheet(h, first);
  }

  /* ---------- lecteur de séance ---------- */
  var P = null, tick = null, wake = null, waking = false, audioCtx = null;

  /* --- écran allumé (Wake Lock) : repris à chaque retour sur l'appli --- */
  function requestWake() {
    if (S.settings.awake === false || wake || waking) return;
    try {
      if (navigator.wakeLock && document.visibilityState === 'visible') {
        waking = true;
        navigator.wakeLock.request('screen').then(function (w) {
          waking = false; wake = w;
          w.addEventListener('release', function () { if (wake === w) wake = null; });
        }).catch(function () { waking = false; });
      }
    } catch (e) { waking = false; }
  }
  function releaseWake() {
    try { if (wake) { var w = wake; wake = null; w.release(); } } catch (e) { /* ignoré */ }
  }

  /* --- sons et vibrations --- */
  function unlockAudio() {
    try {
      if (!audioCtx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) audioCtx = new AC(); }
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    } catch (e) { /* ignoré */ }
  }
  function beep(freq, dur, when, vol) {
    if (!audioCtx || S.settings.sound === false) return;
    try {
      var t0 = audioCtx.currentTime + (when || 0), o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = 'sine'; o.frequency.value = freq;
      g.gain.setValueAtTime(0.0001, t0);
      g.gain.exponentialRampToValueAtTime(vol || 0.6, t0 + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
      o.connect(g); g.connect(audioCtx.destination); o.start(t0); o.stop(t0 + dur + 0.05);
    } catch (e) { /* ignoré */ }
  }
  function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { /* ignoré */ } }
  function countSignal() { beep(880, 0.12); }
  function sideSignal() { beep(660, 0.2, 0); beep(990, 0.2, 0.3); beep(660, 0.2, 0.6); buzz([200, 100, 200, 100, 200]); }
  function endSignal() { beep(880, 0.2, 0); beep(880, 0.2, 0.3); beep(1175, 0.6, 0.6); buzz([400, 150, 400]); }

  /* --- chrono basé sur l'heure réelle : reste exact même si le téléphone ralentit l'appli --- */
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function remaining() { return Math.max(0, Math.ceil((P.end - Date.now()) / 1000)); }
  function showTime() { var el = $('#ptime'); if (el) el.textContent = mmss(P.t); }
  function step() {
    if (!P || !tick) return;
    var rem = remaining();
    P.t = rem;
    if (rem <= 0) {
      stopTick(); endSignal();
      if (P.mode === 'timer') { recordSet(readDone(true)); finishSet(); } else { P.mode = 'ready'; renderPlayer(); }
      return;
    }
    var sideNow = false;
    if (P.mode === 'timer' && P.side && !P.sideDone && rem <= P.total / 2) {
      P.sideDone = true; sideNow = true; sideSignal();
      var sd = $('#pside'); if (sd) sd.textContent = '🔁 Changez de côté !';
    }
    if (!sideNow && rem <= 3 && P.lastBeep !== rem) { P.lastBeep = rem; countSignal(); }
    showTime();
  }
  function startTick() {
    stopTick();
    P.end = Date.now() + P.t * 1000; P.lastBeep = null;
    tick = setInterval(step, 250);
  }
  function startSession(id) {
    var s = sessionObj(id);
    P = { sid: id, name: s.name, items: s.items.map(function (it) {
        var o = EX[it.id], r = resolveEx(o);
        return { ex: r, orig: o, warm: !!(it.w || o.warm), dose: doseOf(r, r.dose.type === o.dose.type ? it : null) };
      }),
      i: 0, set: 1, mode: 'ready', t: 0, total: 0, side: false, sideDone: false, end: 0, lastBeep: null, started: Date.now(), done: [], res: {} };
    requestWake();
    renderPlayer();
  }
  function endPlayer() {
    stopTick(); P = null;
    closeSheet(); render();
  }
  function finishSet() {
    var it = P.items[P.i];
    if (P.set < it.dose.sets && it.dose.type !== 'cardio') {
      P.set += 1; P.mode = 'rest'; P.t = S.settings.rest; P.total = P.t;
      startTick();
    } else {
      if (P.done.indexOf(it.ex.id) < 0) P.done.push(it.ex.id);
      nextEx();
      return;
    }
    renderPlayer();
  }
  function nextEx() {
    stopTick(); P.i += 1; P.set = 1; P.mode = P.i >= P.items.length ? 'done' : 'ready'; renderPlayer();
  }
  function renderPlayer() {
    if (!P) return;
    var n = P.items.length;
    if (P.mode === 'done') {
      var mins = Math.max(1, Math.round((Date.now() - P.started) / 60000));
      var tp = todayPain() || { sci: 0, knee: 0 };
      openSheet('<h2>🎉 Séance terminée !</h2><p>' + P.done.length + ' exercice(s) faits en ' + mins + ' min. Bravo, la régularité est ce qui compte.</p>' +
        '<div class="card">' + slider('sci', 'Douleur sciatique maintenant', tp.sci) + slider('knee', 'Douleur au genou maintenant', tp.knee) + '</div>' +
        '<button class="btn primary big" data-act="finish">Enregistrer la séance</button>', true);
      return;
    }
    var it = P.items[P.i], ex = it.ex, d = it.dose;
    var h = '<div class="top"><div class="grow"><b>' + esc(P.name) + '</b><div class="muted">Exercice ' + (P.i + 1) + ' sur ' + n + (it.warm ? ' · <b>🔥 Échauffement</b>' : '') + '</div></div><button class="x" data-act="quit" aria-label="Quitter">✕</button></div>' +
      '<div class="bar"><i style="width:' + Math.round(P.i / n * 100) + '%"></i></div>';
    if (P.mode === 'rest') {
      var next = ex;
      h += '<h2 style="text-align:center">Repos</h2><div class="timer" id="ptime">' + mmss(P.t) + '</div>' +
        '<p class="muted" style="text-align:center">Prochain : série ' + P.set + ' sur ' + d.sets + ' · ' + esc(next.name) + '</p>' +
        '<div class="row"><button class="btn grow" data-act="restplus">+15 s</button><button class="btn primary grow" data-act="restskip">Passer</button></div>';
    } else {
      h += '<h2>' + ex.icon + ' ' + esc(ex.name) + '</h2>' + figBox(ex) +
        '<p style="text-align:center"><b>' + esc(doseLabel(d)) + '</b>' + (d.type !== 'cardio' ? ' · série ' + P.set + '/' + d.sets : '') + '</p>';
      if (d.type === 'cardio' && d.mins >= 10 && P.mode === 'ready') {
        h += '<label for="palt" style="margin:0 0 4px">Activité du jour</label><select id="palt" style="margin-bottom:10px">' + D.exos.filter(function (e) { return e.dose.type === 'cardio' && (eqOK(e) || e.id === ex.id); }).map(function (e) {
          return '<option value="' + e.id + '"' + (e.id === ex.id ? ' selected' : '') + '>' + esc(e.name) + '</option>';
        }).join('') + '</select>';
      }
      if (it.orig && it.orig.eq && d.type !== 'cardio' && P.mode === 'ready') {
        var ne = effNoEq(it.orig);
        h += '<label for="pvar" style="margin:0 0 4px">Version</label><select id="pvar" style="margin-bottom:10px"><option value="eq"' + (ne ? '' : ' selected') + '>Avec matériel (' + esc(eqNames(it.orig)) + ')</option><option value="noeq"' + (ne ? ' selected' : '') + '>Sans matériel</option></select>';
      }
      var plan = plannedOf(d), pl = d.type === 'reps' ? 'Répétitions réalisées' : (d.type === 'time' ? 'Secondes réalisées' : 'Minutes réalisées');
      if (d.perSide && d.type !== 'cardio') pl += ' (par côté)';
      if (d.type !== 'cardio') pl += ' sur cette série';
      h += '<div class="card" style="padding:10px"><label for="pdone" style="margin:0 0 4px">' + pl + ' <span class="muted">(prévu : ' + plan + ')</span></label><input id="pdone" type="text" inputmode="numeric" value="' + plan + '"></div>';
      if (d.type === 'reps') {
        h += '<button class="btn primary big" data-act="setdone">✔ Série terminée</button>';
      } else if (P.mode === 'timer') {
        h += '<div class="timer" id="ptime">' + mmss(P.t) + '</div>' + (P.side ? '<p class="muted" id="pside" style="text-align:center">' + (P.sideDone ? '🔁 Changez de côté !' : 'Premier côté, puis un bip vous prévient.') + '</p>' : '') +
          '<div class="row"><button class="btn grow" data-act="tstop">Arrêter</button><button class="btn primary grow" data-act="setdone">✔ Terminé</button></div>';
      } else {
        var lab = d.type === 'time' ? (d.perSide ? d.secs + ' s de chaque côté' : d.secs + ' s') : d.mins + ' min';
        h += '<button class="btn primary big" data-act="tstart">⏱ Lancer le chrono (' + lab + ')</button>' +
          '<button class="btn big" data-act="setdone" style="margin-top:8px">✔ Déjà fait</button>';
      }
      h += '<details><summary>Comment faire</summary><ol>' + ex.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol></details>' +
        '<details><summary>Ça fait mal ? Version plus facile</summary><p>' + esc(ex.easier) + '</p><p><b>Arrêtez si :</b> ' + esc(ex.stop) + '</p></details>' +
        '<div class="row" style="margin-top:8px"><a class="btn grow" target="_blank" rel="noopener" href="' + esc(ytUrl(ex)) + '">▶ Vidéo</a><button class="btn grow" data-act="skip">Passer l\'exercice</button></div>';
    }
    openSheet(h, true);
  }

  /* ---------- actions ---------- */
  var actions = {
    tab: function (el) { ui.tab = el.dataset.t; render(); window.scrollTo(0, 0); },
    track: function (el) { ui.track = el.dataset.t; render(); },
    grp: function (el) { ui.grp = el.dataset.g; render(); },
    exo: function (el) { exoSheet(el.dataset.id); },
    preview: function (el) { previewSheet(el.dataset.id); },
    close: function () { closeSheet(); },
    safety: function () { safetySheet(false); },
    start: function (el) { startSession(el.dataset.id); },
    savepain: function () {
      var sci = +$('#view #sci').value, knee = +$('#view #knee').value, t = today();
      S.pains = S.pains.filter(function (p) { return p.d !== t; });
      S.pains.push({ d: t, sci: sci, knee: knee }); save(); render();
    },
    addweight: function () {
      var kg = num($('#wkg').value);
      if (!kg || kg < 30 || kg > 300) { alert('Entrez un poids valide (en kg).'); return; }
      var fat = num($('#wfat').value), visc = num($('#wvisc').value), mus = num($('#wmus').value), bone = num($('#wbone').value);
      if (fat != null && (fat < 3 || fat > 70)) { alert('Graisse corporelle : entrez une valeur entre 3 et 70 %.'); return; }
      if (visc != null && (visc < 0.5 || visc > 59)) { alert('Graisse viscérale : entrez l\'indice affiché par la balance (1 à 59).'); return; }
      if (bone != null && (bone < 0.5 || bone > 8)) { alert('Masse osseuse : entrez une valeur en kg (entre 0,5 et 8).'); return; }
      if (mus != null) {
        if ($('#wmunit').value === '%') {
          if (mus < 10 || mus > 80) { alert('Masse musculaire : entrez un pourcentage entre 10 et 80.'); return; }
          mus = Math.round(kg * mus / 10) / 10;
        } else if (mus < 10 || mus > 150) { alert('Masse musculaire : entrez une valeur en kg (entre 10 et 150).'); return; }
      }
      var hin = $('#bheight'), hv = hin ? num(hin.value) : null;
      if (hv != null) { if (hv < 100 || hv > 250) { alert('Entrez une taille valide (en cm).'); return; } S.profile.height = String(hv); }
      var t = today(), e = Object.assign({}, S.weights.filter(function (w) { return w.d === t; })[0] || {}, { d: t, kg: kg });
      if (fat != null) e.fat = fat; if (visc != null) e.visc = visc; if (mus != null) e.muscle = mus; if (bone != null) e.bone = bone;
      S.weights = S.weights.filter(function (w) { return w.d !== t; });
      S.weights.push(e); save(); render();
    },
    metric: function (el) { ui.metric = el.dataset.m; render(); },
    addwaist: function () {
      var cm = num($('#wcm').value);
      if (!cm || cm < 40 || cm > 250) { alert('Entrez un tour de ventre valide (en cm).'); return; }
      var t = today();
      S.waist = S.waist.filter(function (x) { return x.d !== t; });
      S.waist.push({ d: t, cm: cm }); save(); render();
    },
    delwaist: function (el) {
      if (confirm('Supprimer cette mesure ?')) { S.waist = S.waist.filter(function (x) { return x.d !== el.dataset.d; }); save(); render(); }
    },
    delweight: function (el) {
      if (confirm('Supprimer cette pesée ?')) { S.weights = S.weights.filter(function (w) { return w.d !== el.dataset.d; }); save(); render(); }
    },
    saveprofile: function () {
      S.profile.name = $('#pname').value.trim(); S.profile.height = $('#pheight').value; S.profile.goal = $('#pgoal').value;
      S.profile.age = $('#page').value; S.profile.sex = $('#psex').value;
      S.settings.rest = +$('#prest').value; save(); render(); alert('Profil enregistré ✔');
    },
    savevideo: function (el) {
      var u = $('#vurl').value.trim();
      if (u && !safeUrl(u)) { alert('Le lien doit commencer par https://'); return; }
      if (u) S.videos[el.dataset.id] = u; else delete S.videos[el.dataset.id];
      save(); exoSheet(el.dataset.id);
    },
    ack: function () {
      var w = num($('#onw').value), t = today();
      S.profile.name = $('#onname').value.trim(); S.profile.height = $('#onh').value; S.profile.goal = $('#ong').value;
      if (w && w >= 30 && w <= 300) S.weights.push({ d: t, kg: w });
      var v = num($('#onv').value);
      if (v && v >= 40 && v <= 250) S.waist.push({ d: t, cm: v });
      S.settings.ack = true; save(); closeSheet(); render();
    },
    export: function () {
      var blob = new Blob([JSON.stringify(S, null, 1)], { type: 'application/json' });
      var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'fitsante-sauvegarde-' + today() + '.json';
      document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
    },
    import: function () { $('#file').click(); },
    reset: function () {
      if (confirm('Effacer toutes vos données (poids, douleurs, séances) ? Action irréversible.')) {
        try { localStorage.removeItem(KEY); } catch (e) { /* ignoré */ }
        S = defaults(); safetyFirst(); render();
      }
    },
    addact: function (el) { actSheet(el && el.dataset && el.dataset.id ? el.dataset.id : 'walk'); },
    saveact: function () {
      var id = $('#aex').value, ex = EX[id], d = ex.dose, dt = $('#adate').value;
      if (!validDate(dt)) { alert('Choisissez une date valide (pas dans le futur).'); return; }
      function n(sel, max) { var v = num($(sel).value); return v != null && v >= 1 && v <= max && Math.round(v) === v ? v : null; }
      var a = { k: String(Date.now()), d: dt, id: id };
      if (d.type === 'cardio') {
        a.mins = n('#amin', 600); if (!a.mins) { alert('Indiquez une durée en minutes (1 à 600).'); return; }
      } else {
        a.sets = n('#asets', 20); if (!a.sets) { alert('Indiquez le nombre de séries (1 à 20).'); return; }
        if (d.type === 'time') {
          a.secs = n('#asecs', 3600); if (!a.secs) { alert('Indiquez la durée en secondes (1 à 3600).'); return; }
        } else {
          a.reps = n('#areps', 500); if (!a.reps) { alert('Indiquez le nombre de répétitions (1 à 500).'); return; }
          var kgEl = $('#akg');
          if (kgEl && kgEl.value.trim()) {
            var kg = num(kgEl.value);
            if (kg == null || kg < 0 || kg > 200) { alert('Charge invalide (en kg).'); return; }
            a.kg = kg; if (kg > 0 && S.loads) S.loads[id] = kg;
          }
        }
      }
      S.activities.push(a); save(); closeSheet(); render(); toast('✔ Ajouté : ' + ex.name);
    },
    coachsheet: function () {
      openSheet('<div class="top"><h2 style="margin:0">Séance Coach (Lafay)</h2><button class="x" data-act="close" aria-label="Fermer">✕</button></div>' +
        '<p class="muted">Notez une séance faite avec l\'application Coach (méthode Lafay). Elle compte dans vos minutes et vos jours actifs.</p>' +
        '<label for="ctitle">Nom de la séance</label><input id="ctitle" type="text" maxlength="60" placeholder="ex. Séance 3 – niveau 1">' +
        '<label for="adate">Date</label><input id="adate" type="date" value="' + today() + '" max="' + today() + '">' +
        '<label for="cmin">Durée (minutes)</label><input id="cmin" type="text" inputmode="numeric" placeholder="ex. 45">' +
        '<label for="cnote">Remarque (facultatif)</label><input id="cnote" type="text" maxlength="120" placeholder="ex. pompes : 3 × 12, dips plus durs">' +
        '<button class="btn primary big" data-act="savecoach" style="margin-top:16px">Enregistrer</button>' +
        '<button class="btn big" data-act="addact" style="margin-top:8px">← Choisir un exercice à la place</button>');
    },
    savecoach: function () {
      var dt = $('#adate').value, m = num($('#cmin').value);
      if (!validDate(dt)) { alert('Choisissez une date valide (pas dans le futur).'); return; }
      if (m == null || m < 1 || m > 600 || Math.round(m) !== m) { alert('Indiquez une durée en minutes (1 à 600).'); return; }
      S.activities.push({ k: String(Date.now()), d: dt, coach: 'lafay', title: $('#ctitle').value.trim() || 'Séance Coach Lafay', mins: m, note: $('#cnote').value.trim() });
      save(); closeSheet(); render(); toast('✔ Séance Coach ajoutée');
    },
    delact: function (el) {
      if (confirm('Supprimer cette activité ?')) { S.activities = S.activities.filter(function (a) { return a.k !== el.dataset.k; }); save(); render(); }
    },
    addcustom: function () {
      var name = $('#cname').value.trim().slice(0, 40);
      if (!name) { alert('Indiquez le nom du matériel.'); return; }
      S.equip.custom.push({ k: String(Date.now()), name: name, type: $('#ctype').value });
      save(); render(); toast('✔ Matériel ajouté : ' + name);
    },
    delcustom: function (el) {
      if (confirm('Supprimer ce matériel ?')) { S.equip.custom = S.equip.custom.filter(function (c) { return c.k !== el.dataset.k; }); save(); render(); }
    },
    resetvar: function () {
      if (confirm('Remettre toutes les versions « avec / sans matériel » en automatique ?')) { S.variant = {}; save(); toast('✔ Versions remises en automatique'); }
    },
    testsound: function () { unlockAudio(); sideSignal(); setTimeout(endSignal, 1100); },
    install: function () {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      deferredInstall.userChoice.then(function () { deferredInstall = null; render(); });
    },
    /* lecteur */
    setdone: function () {
      var v = readDone(false); if (v === null) return;
      stopTick(); recordSet(v); finishSet();
    },
    tstart: function () {
      var d = P.items[P.i].dose;
      P.side = d.type === 'time' && !!d.perSide;
      P.total = d.type === 'time' ? d.secs * (d.perSide ? 2 : 1) : d.mins * 60;
      P.t = P.total; P.mode = 'timer'; P.sideDone = false; startTick(); renderPlayer();
    },
    tstop: function () { stopTick(); P.mode = 'ready'; renderPlayer(); },
    restplus: function () { P.end += 15000; P.t = remaining(); showTime(); },
    restskip: function () { stopTick(); P.mode = 'ready'; renderPlayer(); },
    skip: function () { if (confirm('Passer cet exercice ?')) nextEx(); },
    quit: function () {
      if (confirm('Quitter la séance ? Votre progression ne sera pas enregistrée.')) endPlayer();
    },
    finish: function () {
      var sci = +$('#overlay #sci').value, knee = +$('#overlay #knee').value, t = today();
      S.sessions.push({ d: t, id: P.sid, name: P.name, mins: Math.max(1, Math.round((Date.now() - P.started) / 60000)), n: P.done.length, det: buildDet(), sci: sci, knee: knee });
      if (!todayPain()) S.pains.push({ d: t, sci: sci, knee: knee });
      save(); endPlayer();
    }
  };

  document.addEventListener('click', function (e) {
    unlockAudio();
    var el = e.target.closest('[data-act]');
    if (el && actions[el.dataset.act]) { e.preventDefault(); actions[el.dataset.act](el); return; }
    if (e.target.id === 'overlay' && !(P || !S.settings.ack)) closeSheet();
  });
  document.addEventListener('input', function (e) {
    if (e.target.classList && e.target.classList.contains('rng')) {
      var lab = e.target.previousElementSibling, o = lab && lab.querySelector('b'); if (o) o.textContent = e.target.value;
    }
  });
  document.addEventListener('change', function (e) {
    if (e.target.dataset && e.target.dataset.eq) {
      var q = e.target.dataset.eq, i = S.equip.have.indexOf(q);
      if (e.target.checked && i < 0) S.equip.have.push(q);
      if (!e.target.checked && i >= 0) S.equip.have.splice(i, 1);
      save(); return;
    }
    if (e.target.id === 'eqweights') { S.equip.weights = e.target.value.trim().slice(0, 60); save(); return; }
    if (e.target.id === 'xvar') { S.variant[e.target.dataset.id] = e.target.value; save(); exoSheet(e.target.dataset.id); return; }
    if (e.target.id === 'pvar' && P) {
      var cur = P.items[P.i]; S.variant[cur.orig.id] = e.target.value; save(); cur.ex = resolveEx(cur.orig); renderPlayer(); return;
    }
    if (e.target.id === 'aex') { $('#afields').innerHTML = actFields(e.target.value); return; }
    if (e.target.id === 'pgx') { ui.prog = e.target.value; render(); return; }
    if (e.target.id === 'palt' && P) { P.items[P.i].ex = EX[e.target.value]; renderPlayer(); return; }
    if (e.target.id === 'sawake') { S.settings.awake = e.target.checked; save(); if (e.target.checked) requestWake(); else releaseWake(); return; }
    if (e.target.id === 'ssound') { S.settings.sound = e.target.checked; save(); if (e.target.checked) { unlockAudio(); beep(880, 0.15); } return; }
    if (e.target.id !== 'file' || !e.target.files[0]) return;
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var j = JSON.parse(fr.result);
        if (!j || !Array.isArray(j.weights) || !Array.isArray(j.sessions)) throw new Error('format');
        if (!confirm('Remplacer vos données actuelles par cette sauvegarde ?')) return;
        S = Object.assign(defaults(), j); migrateWaist(S); save(); render(); alert('Sauvegarde importée ✔');
      } catch (err) { alert('Fichier non valide.'); }
    };
    fr.readAsText(e.target.files[0]);
  });
  window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredInstall = e; if (!P) render(); });

  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') {
      wake = null; waking = false; requestWake();
      if (P && tick) step();
    }
  });

  function safetyFirst() { if (!S.settings.ack) safetySheet(true); }

  render();
  safetyFirst();
  requestWake();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js').catch(function () { }); });
  }
})();
