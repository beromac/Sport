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
  function defaults() {
    return { profile: { name: '', height: '', goal: '' }, weights: [], waist: [], pains: [], sessions: [],
      settings: { ack: false, rest: 45 }, videos: {} };
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
        d.settings = Object.assign({ ack: false, rest: 45 }, j.settings || {});
        d.profile = Object.assign({ name: '', height: '', goal: '' }, j.profile || {});
        migrateWaist(d);
      }
    } catch (e) { /* données illisibles : on repart de zéro */ }
    return d;
  }
  var S = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* stockage plein ou bloqué */ } }

  var ui = { tab: 'home', track: 'poids', grp: 'Tous' };
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
    function X(t) { return x1 === x0 ? pl + (W - pl - pr) / 2 : pl + (t - x0) / (x1 - x0) * (W - pl - pr); }
    function Y(v) { return pt + (1 - (v - y0) / (y1 - y0)) * (H - pt - pb); }
    var out = '<svg class="chart" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(o.label || 'Graphique') + '">';
    for (var i = 0; i <= 3; i++) {
      var v = y0 + (y1 - y0) * i / 3, y = Y(v);
      out += '<line class="gl" x1="' + pl + '" y1="' + y.toFixed(1) + '" x2="' + (W - pr) + '" y2="' + y.toFixed(1) + '"/>' +
        '<text x="' + (pl - 4) + '" y="' + (y + 3).toFixed(1) + '" text-anchor="end">' + (o.dec ? v.toFixed(o.dec) : Math.round(v)) + '</text>';
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
    var wkSessions = S.sessions.filter(function (s) { return weekStart(s.d) === wk; });
    var days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    var dots = days.map(function (l, i) {
      var d = parse(wk); d.setDate(d.getDate() + i); var k = ymd(d);
      var on = S.sessions.some(function (s) { return s.d === k; });
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
    var h = '<h1>Séances</h1>';
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

  function viewTrack() {
    var tabs = [['poids', 'Poids'], ['ventre', 'Ventre'], ['douleur', 'Douleurs'], ['histo', 'Séances']];
    var h = '<h1>Suivi</h1><div class="seg">' + tabs.map(function (t) {
      return '<button class="' + (ui.track === t[0] ? 'on' : '') + '" data-act="track" data-t="' + t[0] + '">' + t[1] + '</button>';
    }).join('') + '</div>';
    if (ui.track === 'poids') {
      var w = sortedWeights();
      h += '<section class="card"><h2>Ajouter une pesée</h2><label for="wkg">Poids (kg)</label><input id="wkg" type="text" inputmode="decimal" placeholder="ex. 84,5">' +
        '<button class="btn primary big" data-act="addweight" style="margin-top:12px">Enregistrer</button></section>';
      h += '<section class="card"><h2>Évolution</h2>' + chart([{ name: 'Poids', color: '#0f766e', pts: w.map(function (x) { return { x: x.d, y: x.kg }; }) }], { dec: 1, label: 'Évolution du poids' });
      var hgt = num(S.profile.height);
      if (w.length && hgt && hgt > 100) {
        var imc = w[w.length - 1].kg / Math.pow(hgt / 100, 2);
        h += '<p class="muted">IMC actuel : ' + (Math.round(imc * 10) / 10).toString().replace('.', ',') + '</p>';
      }
      h += '</section>';
      h += '<section class="card"><h2>Historique</h2>' + (w.length ? '<ul class="list">' + w.slice().reverse().slice(0, 30).map(function (x) {
        return '<li><div class="grow"><b>' + fmtKg(x.kg) + '</b>' + '<div class="muted">' + fmtDate(x.d) + '</div></div><button class="btn small danger" data-act="delweight" data-d="' + x.d + '" aria-label="Supprimer">🗑</button></li>';
      }).join('') + '</ul>' : '<p class="muted">Aucune pesée.</p>') + '</section>';
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
    } else {
      var tot = S.sessions.length, mins = S.sessions.reduce(function (a, s) { return a + (s.mins || 0); }, 0);
      h += '<section class="card"><div class="row"><div class="grow"><div class="big-num">' + tot + '</div><div class="muted">séances</div></div><div class="grow"><div class="big-num">' + mins + '</div><div class="muted">minutes</div></div></div></section>';
      h += '<section class="card"><h2>Séances faites</h2>' + (tot ? '<ul class="list">' + S.sessions.slice().reverse().slice(0, 40).map(function (s) {
        return '<li><div class="grow"><b>' + esc(s.name) + '</b><div class="muted">' + fmtDate(s.d) + ' · ' + s.mins + ' min' + (s.sci != null ? ' · douleur après : dos ' + s.sci + ', genou ' + s.knee : '') + '</div></div></li>';
      }).join('') + '</ul>' : '<p class="muted">Aucune séance pour l\'instant.</p>') + '</section>';
    }
    return h;
  }

  function viewProfile() {
    var p = S.profile;
    return '<h1>Profil</h1><section class="card"><label for="pname">Prénom</label><input id="pname" type="text" value="' + esc(p.name) + '">' +
      '<label for="pheight">Taille (cm)</label><input id="pheight" type="text" inputmode="decimal" value="' + esc(p.height) + '">' +
      '<label for="pgoal">Poids objectif (kg)</label><input id="pgoal" type="text" inputmode="decimal" step="0.1" value="' + esc(p.goal) + '">' +
      '<label for="prest">Temps de repos entre séries</label><select id="prest">' + [30, 45, 60, 90].map(function (v) {
        return '<option value="' + v + '"' + (S.settings.rest === v ? ' selected' : '') + '>' + v + ' secondes</option>';
      }).join('') + '</select>' +
      '<button class="btn primary big" data-act="saveprofile" style="margin-top:12px">Enregistrer</button></section>' +
      '<section class="card"><h2>Sauvegarde</h2><p class="muted">Vos données restent sur ce téléphone. Exportez-les de temps en temps.</p>' +
      '<div class="row"><button class="btn grow" data-act="export">⬇ Exporter</button><button class="btn grow" data-act="import">⬆ Importer</button></div>' +
      '<input type="file" id="file" accept="application/json,.json" hidden></section>' +
      '<section class="card"><button class="btn big" data-act="safety">🛟 Règles de sécurité</button>' +
      (deferredInstall ? '<button class="btn big" data-act="install" style="margin-top:10px">📲 Installer l\'application</button>' : '') +
      '<button class="btn big danger" data-act="reset" style="margin-top:10px">Effacer toutes mes données</button></section>' +
      '<p class="muted" style="text-align:center">FitSanté · ne remplace pas un avis médical</p>';
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
    h += '<div class="banner bad">⚠️ <b>Arrêtez si :</b> ' + esc(ex.stop) + '</div>';
    h += '<details><summary>Version plus facile</summary><p>' + esc(ex.easier) + '</p></details>';
    h += '<a class="btn big" target="_blank" rel="noopener" href="' + esc(ytUrl(ex)) + '">▶ Voir des vidéos de cet exercice</a>';
    if (mine) h += '<a class="btn big" style="margin-top:8px" target="_blank" rel="noopener" href="' + esc(mine) + '">🎬 Ma vidéo (kiné)</a>';
    h += '<details><summary>Ajouter ma propre vidéo</summary><label for="vurl">Lien (https://…)</label><input id="vurl" type="url" value="' + esc(mine) + '" placeholder="https://…">' +
      '<button class="btn primary" style="margin-top:8px" data-act="savevideo" data-id="' + id + '">Enregistrer le lien</button></details>';
    openSheet(h);
  }

  function previewSheet(id) {
    var s = sessionObj(id);
    var h = '<div class="top"><h2 style="margin:0">' + esc(s.name) + '</h2><button class="x" data-act="close" aria-label="Fermer">✕</button></div>' +
      '<p class="muted">' + esc(s.desc) + ' Environ ' + estMinutes(s.items) + ' min.</p><ul class="list">' +
      s.items.map(function (it) {
        var ex = EX[it.id];
        return '<li><button class="chip" data-act="exo" data-id="' + ex.id + '" style="border:0;background:none;padding:0;text-align:left;flex:1"><b>' + ex.icon + ' ' + esc(ex.name) + '</b><div class="muted">' + esc(doseLabel(doseOf(ex, it))) + '</div></button></li>';
      }).join('') + '</ul>' +
      '<div class="banner warn">Échauffez-vous, restez à 3/10 de douleur maximum et arrêtez si la douleur descend dans la jambe.</div>' +
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
  var P = null, tick = null, wake = null;
  function stopTick() { if (tick) { clearInterval(tick); tick = null; } }
  function buzz(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) { /* ignoré */ } }
  function startTick() {
    stopTick();
    tick = setInterval(function () {
      if (!P) { stopTick(); return; }
      P.t -= 1;
      var half = P.mode === 'timer' && P.side && P.t === Math.floor(P.total / 2);
      if (half) { buzz([200, 100, 200]); var s = $('#pside'); if (s) s.textContent = '🔁 Changez de côté !'; }
      if (P.t <= 0) {
        stopTick(); buzz(400);
        if (P.mode === 'timer') finishSet(); else { P.mode = 'ready'; renderPlayer(); }
        return;
      }
      var el = $('#ptime'); if (el) el.textContent = mmss(P.t);
    }, 1000);
  }
  function startSession(id) {
    var s = sessionObj(id);
    P = { sid: id, name: s.name, items: s.items.map(function (it) { return { ex: EX[it.id], dose: doseOf(EX[it.id], it) }; }),
      i: 0, set: 1, mode: 'ready', t: 0, total: 0, side: false, started: Date.now(), done: [] };
    try { if (navigator.wakeLock) navigator.wakeLock.request('screen').then(function (w) { wake = w; }).catch(function () { }); } catch (e) { /* ignoré */ }
    renderPlayer();
  }
  function endPlayer() {
    stopTick(); P = null;
    try { if (wake) { wake.release(); wake = null; } } catch (e) { /* ignoré */ }
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
    var h = '<div class="top"><div class="grow"><b>' + esc(P.name) + '</b><div class="muted">Exercice ' + (P.i + 1) + ' sur ' + n + '</div></div><button class="x" data-act="quit" aria-label="Quitter">✕</button></div>' +
      '<div class="bar"><i style="width:' + Math.round(P.i / n * 100) + '%"></i></div>';
    if (P.mode === 'rest') {
      var next = ex;
      h += '<h2 style="text-align:center">Repos</h2><div class="timer" id="ptime">' + mmss(P.t) + '</div>' +
        '<p class="muted" style="text-align:center">Prochain : série ' + P.set + ' sur ' + d.sets + ' · ' + esc(next.name) + '</p>' +
        '<div class="row"><button class="btn grow" data-act="restplus">+15 s</button><button class="btn primary grow" data-act="restskip">Passer</button></div>';
    } else {
      h += '<h2>' + ex.icon + ' ' + esc(ex.name) + '</h2>' + figBox(ex) +
        '<p style="text-align:center"><b>' + esc(doseLabel(d)) + '</b>' + (d.type !== 'cardio' ? ' · série ' + P.set + '/' + d.sets : '') + '</p>';
      if (d.type === 'reps') {
        h += '<button class="btn primary big" data-act="setdone">✔ Série terminée</button>';
      } else if (P.mode === 'timer') {
        h += '<div class="timer" id="ptime">' + mmss(P.t) + '</div>' + (P.side ? '<p class="muted" id="pside" style="text-align:center">Premier côté, puis le chrono vous prévient.</p>' : '') +
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
      var t = today();
      S.weights = S.weights.filter(function (w) { return w.d !== t; });
      S.weights.push({ d: t, kg: kg }); save(); render();
    },
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
    install: function () {
      if (!deferredInstall) return;
      deferredInstall.prompt();
      deferredInstall.userChoice.then(function () { deferredInstall = null; render(); });
    },
    /* lecteur */
    setdone: function () { stopTick(); finishSet(); },
    tstart: function () {
      var d = P.items[P.i].dose;
      P.side = d.type === 'time' && !!d.perSide;
      P.total = d.type === 'time' ? d.secs * (d.perSide ? 2 : 1) : d.mins * 60;
      P.t = P.total; P.mode = 'timer'; startTick(); renderPlayer();
    },
    tstop: function () { stopTick(); P.mode = 'ready'; renderPlayer(); },
    restplus: function () { P.t += 15; var el = $('#ptime'); if (el) el.textContent = mmss(P.t); },
    restskip: function () { stopTick(); P.mode = 'ready'; renderPlayer(); },
    skip: function () { if (confirm('Passer cet exercice ?')) nextEx(); },
    quit: function () {
      if (confirm('Quitter la séance ? Votre progression ne sera pas enregistrée.')) endPlayer();
    },
    finish: function () {
      var sci = +$('#overlay #sci').value, knee = +$('#overlay #knee').value, t = today();
      S.sessions.push({ d: t, id: P.sid, name: P.name, mins: Math.max(1, Math.round((Date.now() - P.started) / 60000)), n: P.done.length, sci: sci, knee: knee });
      if (!todayPain()) S.pains.push({ d: t, sci: sci, knee: knee });
      save(); endPlayer();
    }
  };

  document.addEventListener('click', function (e) {
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

  function safetyFirst() { if (!S.settings.ack) safetySheet(true); }

  render();
  safetyFirst();
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('./sw.js').catch(function () { }); });
  }
})();
