/* =========================================================
   ROYAL WEDDING INVITE – script.js
   Easy edits: QUESTIONS (quiz), WHATSAPP_NUMBER (RSVP)
   Wedding date  -> index.html  (#count data-date)
   YouTube film  -> index.html  (#filmFrame data-youtube)
   ========================================================= */

// RSVP replies open WhatsApp with this number (country code + number, no +). Leave "" to just show a thank-you.
const WHATSAPP_NUMBER = "+919235278696";

// Quiz: "a" = index of the correct option (0 = first option)
/*
const QUESTIONS = [
  { q: 'Who said "I love you" first?',          o: ["Vaibhav", "Avantika"],                          a: 0 },
  { q: "Who takes longer to get ready?",        o: ["Vaibhav", "Avantika", "Both equally"],          a: 1 },
  { q: "Who is more likely to plan a surprise?",o: ["Vaibhav", "Avantika"],                          a: 1 },
  { q: "Who is the better cook?",               o: ["Vaibhav", "Avantika", "Neither!"],              a: 1 },
  { q: "Who is more romantic?",                 o: ["Vaibhav", "Avantika"],                          a: 0 },
  { q: "Who is the bigger foodie?",             o: ["Vaibhav", "Avantika", "Both equally"],          a: 2 },
  { q: "Who chose the wedding destination?",    o: ["Vaibhav", "Avantika", "The mothers"],           a: 2 },
  { q: "Who sleeps first?",                     o: ["Vaibhav", "Avantika"],                          a: 1 },
  { q: "Where was their first date?",           o: ["A cafe", "A movie", "A park", "A fort"],   a: 0 },
  { q: "Where did Vaibhav propose?",              o: ["Goa beach", "An old fort", "Paris", "At home"], a: 1 }
];*/

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ---------- 1. envelope intro ---------- */
(function intro() {
  const el = $("#intro");
  const sp = $("#sparkles");
  for (let i = 0; i < 40; i++) {
    const s = document.createElement("span");
    s.style.left = Math.random() * 100 + "%";
    s.style.top = Math.random() * 100 + "%";
    s.style.animationDelay = Math.random() * 2.4 + "s";
    s.style.animationDuration = 1.6 + Math.random() * 2 + "s";
    sp.appendChild(s);
  }
  document.body.style.overflow = "hidden";
  let closed = false;
  const close = () => {
    if (closed) return;
    closed = true;
    el.classList.add("done");
    document.body.style.overflow = "";
    tryMusic();
  };
  el.addEventListener("click", close);
  setTimeout(close, 4800);
})();

/* ---------- hero bokeh ---------- */
(function bokeh() {
  const b = $("#bokeh");
  for (let i = 0; i < 16; i++) {
    const s = document.createElement("span");
    const size = 14 + Math.random() * 30;
    s.style.cssText = `width:${size}px;height:${size}px;left:${Math.random() * 100}%;top:${Math.random() * 100}%;animation-delay:${Math.random() * 6}s`;
    b.appendChild(s);
  }
})();

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
}), { threshold: 0.15 });
$$(".reveal").forEach(el => io.observe(el));

/* ---------- music ---------- */
const bgm = $("#bgm"), mbtn = $("#music-btn");
let playing = false;
function setMusic(on) {
  playing = on;
  mbtn.classList.toggle("paused", !on);
  if (on) bgm.play().catch(() => { playing = false; mbtn.classList.add("paused"); });
  else bgm.pause();
}
function tryMusic() { setMusic(true); }
mbtn.addEventListener("click", () => setMusic(!playing));
mbtn.classList.add("paused");

/* ---------- 5. scratch seal ---------- */
(function scratch() {
  const wrap = $("#seal"), cv = $("#scratch"), ctx = cv.getContext("2d");
  let done = false, drawing = false;

  function paint() {
    const s = wrap.clientWidth, dpr = window.devicePixelRatio || 1;
    cv.width = s * dpr; cv.height = s * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = "source-over";
    const g = ctx.createRadialGradient(s / 2, s / 2, 10, s / 2, s / 2, s / 2);
    g.addColorStop(0, "#6a1230"); g.addColorStop(1, "#430a1c");
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "#d1ab55"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2 - 6, 0, Math.PI * 2); ctx.stroke();
    ctx.strokeStyle = "rgba(201,162,76,.35)"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(s / 2, s / 2, s / 2 - 14, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = "#e0bd6a"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
    ctx.font = `${s * 0.19}px 'Cinzel Decorative', serif`;
    ctx.fillText("V·A", s / 2, s / 2 - 4);
    ctx.font = `${s * 0.035}px 'Cinzel', serif`;
    ctx.fillStyle = "#c9a24c";
    ctx.fillText("S C R A T C H   T H E   S E A L", s / 2, s / 2 + s * 0.15);
  }
  paint();
  document.fonts && document.fonts.ready.then(() => { if (!done) paint(); });

  function pos(e) {
    const r = cv.getBoundingClientRect();
    return [(e.clientX - r.left) * (cv.width / r.width) / (window.devicePixelRatio || 1),
            (e.clientY - r.top) * (cv.height / r.height) / (window.devicePixelRatio || 1)];
  }
  function erase(e) {
    if (!drawing || done) return;
    const [x, y] = pos(e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath(); ctx.arc(x, y, wrap.clientWidth * 0.075, 0, Math.PI * 2); ctx.fill();
    check();
  }
  let n = 0;
  function check() {
    if (++n % 8) return;
    const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
    let clear = 0, tot = 0;
    for (let i = 3; i < d.length; i += 160) { tot++; if (d[i] === 0) clear++; }
    if (clear / tot > 0.4) reveal();
  }
  function reveal() {
    if (done) return;
    done = true;
    wrap.classList.add("revealed");
    petals();
  }
  cv.addEventListener("pointerdown", e => { drawing = true; cv.setPointerCapture(e.pointerId); erase(e); });
  cv.addEventListener("pointermove", erase);
  cv.addEventListener("pointerup", () => drawing = false);
  cv.addEventListener("pointercancel", () => drawing = false);
  $("#revealBtn").addEventListener("click", reveal);

  function petals() {
    const box = $("#petals");
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("i");
      p.style.left = Math.random() * 100 + "%";
      p.style.animationDuration = 3 + Math.random() * 3 + "s";
      p.style.animationDelay = Math.random() * 1.5 + "s";
      box.appendChild(p);
    }
    setTimeout(() => box.innerHTML = "", 8000);
  }
})();

/* ---------- 6. countdown ---------- */
(function countdown() {
  const target = new Date($("#count").dataset.date).getTime();
  const pad = n => String(n).padStart(2, "0");
  function tick() {
    let diff = Math.max(0, target - Date.now());
    const d = Math.floor(diff / 864e5); diff -= d * 864e5;
    const h = Math.floor(diff / 36e5);  diff -= h * 36e5;
    const m = Math.floor(diff / 6e4);   diff -= m * 6e4;
    const s = Math.floor(diff / 1e3);
    $("#cd-d").textContent = pad(d);
    $("#cd-h").textContent = pad(h);
    $("#cd-m").textContent = pad(m);
    $("#cd-s").textContent = pad(s);
  }
  tick(); setInterval(tick, 1000);
})();

/* ---------- 7. event popup ---------- */
(function events() {
  const back = $("#sheetBack"), sheet = $("#sheet");
  const colors = { 1: "#e0b72f", 2: "#4b7d3d", 3: "#6a4ba8", 4: "#b13232", 5: "#c9a24c" };
  $$(".event").forEach((ev, i) => ev.addEventListener("click", () => {
    const d = ev.dataset;
    $("#shDate").textContent = d.date;
    $("#shTitle").textContent = d.title;
    $("#shDesc").textContent = d.desc;
    $("#shTime").textContent = d.time;
    $("#shPlace").textContent = d.place;
    $("#shDress").textContent = d.dress;
    sheet.style.borderTopColor = colors[i + 1];
    back.hidden = false;
    document.body.style.overflow = "hidden";
  }));
  const close = () => { back.hidden = true; document.body.style.overflow = ""; };
  $("#sheetX").addEventListener("click", close);
  back.addEventListener("click", e => { if (e.target === back) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
})();

/* ---------- 10. film ---------- */
(function film() {
  const f = $("#filmFrame");
  f.addEventListener("click", () => {
    const id = f.dataset.youtube.trim();
    if (!id) return;
    f.innerHTML = `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen></iframe>`;
    if (playing) setMusic(false);
  });
})();

/* ---------- 11. quiz ---------- */
(function quiz() {
  const start = $("#gStart"), box = $("#gQuiz"), res = $("#gResult");
  let i = 0, score = 0, name = "";

  $("#beginBtn").addEventListener("click", () => {
    name = $("#playerName").value.trim();
    if (!name) { $("#playerName").focus(); return; }
    i = 0; score = 0;
    start.hidden = true; res.hidden = true; box.hidden = false;
    show();
  });
  $("#playerName").addEventListener("keydown", e => { if (e.key === "Enter") $("#beginBtn").click(); });

  function show() {
    const q = QUESTIONS[i];
    $("#qNo").textContent = "QUESTION " + String(i + 1).padStart(2, "0");
    $("#qCount").textContent = `${i + 1} / ${QUESTIONS.length}`;
    $("#qBar").style.width = ((i + 1) / QUESTIONS.length * 100) + "%";
    $("#qText").textContent = q.q;
    const opts = $("#qOpts"); opts.innerHTML = "";
    q.o.forEach((t, k) => {
      const b = document.createElement("button");
      b.textContent = t;
      b.addEventListener("click", () => pick(k));
      opts.appendChild(b);
    });
  }
  function pick(k) {
    const q = QUESTIONS[i], btns = $$("#qOpts button");
    btns.forEach((b, n) => {
      b.disabled = true;
      if (n === q.a) b.classList.add("correct");
      else if (n === k) b.classList.add("wrong");
      else b.classList.add("dim");
    });
    if (k === q.a) score++;
    setTimeout(() => { i++; i < QUESTIONS.length ? show() : finish(); }, 1100);
  }
  function finish() {
    box.hidden = true; res.hidden = false;
    $("#scoreBig").textContent = `${score} / ${QUESTIONS.length}`;
    $("#scoreMsg").textContent =
      score >= 9 ? "You are royalty — you know them perfectly!" :
      score >= 6 ? "Well played, a true friend of the court!" :
      score >= 4 ? "Not bad, but there is more to learn!" :
                   "The couple has secrets yet to share!";
    let board = [];
    try { board = JSON.parse(localStorage.getItem("darbarBoard") || "[]"); } catch (e) {}
    board.push({ n: name, s: score });
    board.sort((a, b) => b.s - a.s);
    board = board.slice(0, 5);
    try { localStorage.setItem("darbarBoard", JSON.stringify(board)); } catch (e) {}
    $("#board").innerHTML = board.map(r =>
      `<li><span>${r.n.replace(/[<>&]/g, "")}</span><span>${r.s}/${QUESTIONS.length}</span></li>`).join("");
  }
  $("#againBtn").addEventListener("click", () => {
    res.hidden = true; start.hidden = false; $("#playerName").value = "";
  });
})();

/* ---------- 12. RSVP ---------- */
(function rsvp() {
  const name = $("#guestName"), send = $("#sendBtn");
  let choice = "";
  const upd = () => send.disabled = !(name.value.trim() && choice);
  name.addEventListener("input", upd);
  $$(".rsvp-choice button").forEach(b => b.addEventListener("click", () => {
    $$(".rsvp-choice button").forEach(x => x.classList.remove("on"));
    b.classList.add("on"); choice = b.dataset.v; upd();
  }));
  send.addEventListener("click", () => {
    const n = name.value.trim();
    const t = $("#rsvpThanks");
    t.hidden = false;
    t.textContent = choice === "Joyfully Accept"
      ? `Thank you, ${n}! We can't wait to celebrate with you.`
      : `Thank you, ${n}. You will be missed dearly.`;
    send.disabled = true;
    if (WHATSAPP_NUMBER) {
      const msg = encodeURIComponent(`${n} – ${choice} (Avantika & Vaibhav's wedding)`);
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
    }
  });
})();
