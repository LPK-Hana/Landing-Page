/* HANAKARYA intro, ring skeleton, Daftar button, and scroll motion. */
export function install(S) {
  S.buildWordmarkHtml = function buildWordmarkHtml(intro) {
    var word = "HANAKARYA";
    var base = "";
    var color = "";
    for (var i = 0; i < word.length; i++) {
      var cls = i < 4 ? "hana-hana" : "hana-karya";
      base += '<span class="hana-letter" data-i="' + i + '">' + word[i] + "</span>";
      color += '<span class="hana-letter ' + cls + '" data-i="' + i + '">' + word[i] + "</span>";
    }
    var html =
      '<span class="hana-type">' +
        '<span class="hana-wordmark-base">' + base + "</span>" +
        '<span class="hana-wordmark-color" aria-hidden="true">' + color + "</span>" +
      "</span>";
    if (!intro) return html;
    return html + '<span class="hana-rings" aria-hidden="true"></span>';
  }

  S.clearWordTimers = function clearWordTimers(label) {
    var prev = S.colorTimers.get(label);
    if (!prev) return;
    if (prev.raf) window.cancelAnimationFrame(prev.raf);
    var list = prev.timers || prev;
    if (list && list.length) {
      for (var i = 0; i < list.length; i++) window.clearTimeout(list[i]);
    }
    S.colorTimers.delete(label);
  }

  S.settleWord = function settleWord(label) {
    label.classList.remove("is-rolling");
    label.dataset.intro = "";
    label.classList.add("is-show", "is-colored");
    label.dataset.colored = "1";
    var letters = label.querySelectorAll(".hana-letter");
    for (var i = 0; i < letters.length; i++) {
      letters[i].classList.add("is-in", "is-ink");
      letters[i].style.transform = "";
      letters[i].style.opacity = "";
    }
    var rings = label.querySelectorAll(".hana-ring");
    for (var r = 0; r < rings.length; r++) rings[r].classList.add("is-on");
    S.placeDaftar();
  }

  S.finishWordColor = function finishWordColor(label, state) {
    label.classList.remove("is-rolling");
    label.dataset.intro = "";
    S.scatter();
    var colorLetters = label.querySelectorAll(".hana-wordmark-color .hana-letter");
    var left = [3, 2, 1, 0];
    var right = [4, 5, 6, 7, 8];
    var step = S.HANA_ANIM.colorStepMs;
    var colorStart = S.HANA_ANIM.colorStartMs;
    function ink(idx, delay) {
      state.timers.push(window.setTimeout(function () {
        if (colorLetters[idx]) colorLetters[idx].classList.add("is-ink");
      }, delay));
    }
    for (var n = 0; n < left.length; n++) ink(left[n], colorStart + n * step);
    for (var m = 0; m < right.length; m++) ink(right[m], colorStart + m * step);
    state.timers.push(window.setTimeout(function () {
      label.dataset.colored = "1";
      label.classList.add("is-colored");
      S.scatter();
      S.placeDaftar();
    }, colorStart + 4 * step + 780));
    S.colorTimers.set(label, state);
  }

  S.textBox = function textBox(label, base) {
    var letters = base.querySelectorAll(".hana-letter");
    if (!letters.length) return null;
    var saved = [];
    for (var i = 0; i < letters.length; i++) {
      saved.push(letters[i].style.transform);
      letters[i].style.transform = "none";
    }
    var host = label.getBoundingClientRect();
    var a = letters[0].getBoundingClientRect();
    var b = letters[letters.length - 1].getBoundingClientRect();
    for (var j = 0; j < letters.length; j++) letters[j].style.transform = saved[j];
    if (b.right - a.left < 20) return null;
    return {
      left: a.left - host.left,
      width: b.right - a.left,
      mid: ((a.top + a.bottom) / 2) - host.top
    };
  }

  S.buildRings = function buildRings(label) {
    var host = label.querySelector(".hana-rings");
    var base = label.querySelector(".hana-wordmark-base");
    if (!host || !base) return [];
    var fontSize = parseFloat(getComputedStyle(label).fontSize) || 0;
    var type = label.querySelector(".hana-type");
    var prevTf = type ? type.style.transform : "";
    if (type) type.style.transform = "none";
    var box = S.textBox(label, base);
    if (!box || fontSize < 24) {
      if (type) type.style.transform = prevTf;
      return [];
    }
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
      if (type) type.style.transform = prevTf;
      return [];
    }
    var font = '800 ' + fontSize + 'px "Baloo 2", Poppins, sans-serif';
    var text = "HANAKARYA";
    ctx.font = font;
    if ("letterSpacing" in ctx) ctx.letterSpacing = "-0.05em";
    var metrics = ctx.measureText(text);
    var ascent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent || fontSize * 0.8;
    var descent = metrics.fontBoundingBoxDescent || metrics.actualBoundingBoxDescent || fontSize * 0.22;
    var leftBearing = metrics.actualBoundingBoxLeft || 0;
    var pad = 8;
    canvas.width = Math.ceil(metrics.width + leftBearing) + pad * 2;
    canvas.height = Math.ceil(ascent + descent) + pad * 2;
    ctx.font = font;
    if ("letterSpacing" in ctx) ctx.letterSpacing = "-0.05em";
    ctx.fillStyle = "#000";
    ctx.textBaseline = "alphabetic";
    var baselineY = pad + ascent;
    ctx.fillText(text, pad + leftBearing, baselineY);
    var img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = img.data;
    var step = Math.max(8, Math.round(fontSize * 0.092));
    var probe = Math.max(2, Math.round(fontSize * 0.028));
    function inkAt(x, y) {
      x = x | 0;
      y = y | 0;
      if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return false;
      return data[(y * canvas.width + x) * 4 + 3] > 128;
    }
    var dots = [];
    for (var y = 0; y < canvas.height; y += step) {
      for (var x = 0; x < canvas.width; x += step) {
        var found = false;
        for (var yy = y; yy < y + step && !found; yy += 2) {
          for (var xx = x; xx < x + step && !found; xx += 2) {
            if (!inkAt(xx, yy)) continue;
            if (inkAt(xx + probe, yy) && inkAt(xx - probe, yy) && inkAt(xx, yy + probe) && inkAt(xx, yy - probe)) continue;
            dots.push({ x: xx, y: yy });
            found = true;
          }
        }
      }
    }
    dots.sort(function (a, b) {
      if (Math.abs(a.x - b.x) > step * 0.45) return a.x - b.x;
      return a.y - b.y;
    });
    host.textContent = "";
    var letters = base.querySelectorAll(".hana-letter");
    var lineTop = 0;
    if (letters.length) {
      var saved = letters[0].style.transform;
      letters[0].style.transform = "none";
      var hostRect = label.getBoundingClientRect();
      var lineRect = letters[0].getBoundingClientRect();
      letters[0].style.transform = saved;
      lineTop = lineRect.top - hostRect.top;
    }
    var probe = document.createElement("span");
    probe.style.cssText = "display:inline-block;position:absolute;left:-9999px;top:0;visibility:hidden;font:800 " + fontSize + "px 'Baloo 2',Poppins,sans-serif;line-height:0.78;letter-spacing:-0.05em;";
    probe.textContent = "H";
    var mark = document.createElement("span");
    mark.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline;";
    probe.appendChild(mark);
    document.body.appendChild(probe);
    var baselineFromTop = mark.getBoundingClientRect().top - probe.getBoundingClientRect().top;
    probe.remove();
    var baseline = lineTop + baselineFromTop;
    var scaleX = box.width / Math.max(metrics.width, 1);
    var originX = box.left;
    var size = Math.max(7, fontSize * 0.115);
    for (var n = 0; n < dots.length; n++) {
      var el = document.createElement("span");
      el.className = "hana-ring";
      var cx = originX + (dots[n].x - pad - leftBearing) * scaleX;
      var cy = baseline + (dots[n].y - baselineY);
      el.style.width = size + "px";
      el.style.height = size + "px";
      el.style.left = (cx - size / 2) + "px";
      el.style.top = (cy - size / 2) + "px";
      host.appendChild(el);
    }
    label.dataset.ringSize = String(Math.round(fontSize));
    if (type) type.style.transform = prevTf;
    return host.children;
  }

  S.playWordAnim = function playWordAnim(label) {
    if (label.closest(".hana-footer-mark")) {
      S.settleWord(label);
      return;
    }
    S.clearWordTimers(label);
    label.dataset.colored = "";
    label.dataset.intro = "1";
    label.dataset.rollGen = String((parseInt(label.dataset.rollGen || "0", 10) || 0) + 1);
    var gen = label.dataset.rollGen;
    label.classList.remove("is-show", "is-colored", "is-rolling");
    var letters = label.querySelectorAll(".hana-letter");
    for (var i = 0; i < letters.length; i++) {
      letters[i].classList.remove("is-in", "is-ink");
      letters[i].style.transition = "none";
      letters[i].style.transform = "";
      letters[i].style.opacity = "";
    }
    var type = label.querySelector(".hana-type");
    if (type) {
      type.style.transition = "none";
      type.style.opacity = "0";
      type.style.transform = "translateY(34px)";
    }
    void label.offsetWidth;
    if (type) {
      type.style.transition = "";
      type.style.opacity = "";
      type.style.transform = "";
    }
    var state = { raf: 0, timers: [] };
    S.colorTimers.set(label, state);
    var start = function () {
      if (label.dataset.rollGen !== gen) return;
      var box = label.closest(".framer-1qc1yuk");
      if (box) S.fitHeroWord(label, box, true);
      var rings = S.buildRings(label);
      var list = [];
      for (var n = 0; n < rings.length; n++) list.push(rings[n]);
      var sweep = list.length ? S.HANA_ANIM.ringSweepMs : 0;
      var gap = list.length > 1 ? sweep / (list.length - 1) : 0;
      for (var k = 0; k < list.length; k++) {
        (function (ring, delay) {
          state.timers.push(window.setTimeout(function () {
            if (label.dataset.rollGen !== gen) return;
            ring.classList.add("is-on");
          }, delay));
        })(list[k], Math.round(k * gap));
      }
      var riseAt = sweep + 180;
      state.timers.push(window.setTimeout(function () {
        if (label.dataset.rollGen !== gen) return;
        var ringHost = label.querySelector(".hana-rings");
        if (ringHost) ringHost.classList.add("is-settled");
        label.classList.add("is-show");
      }, riseAt));
      state.timers.push(window.setTimeout(function () {
        if (label.dataset.rollGen !== gen) return;
        var ringHost = label.querySelector(".hana-rings");
        if (ringHost) ringHost.classList.add("is-gone");
        label.dataset.intro = "";
        S.finishWordColor(label, state);
      }, riseAt + S.HANA_ANIM.riseMs));
      S.colorTimers.set(label, state);
    };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(start);
    else window.requestAnimationFrame(start);
  }

  S.heroBoxes = function heroBoxes() {
    var kv = document.querySelector(".framer-t022jh") || document.querySelector("#kv");
    var list = [];
    var boxes = (kv || document).querySelectorAll(".framer-1qc1yuk");
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      if (box.closest(".hana-logo-swapped")) continue;
      if (box.getBoundingClientRect().height < 40) continue;
      list.push(box);
    }
    return list;
  }

  S.cleanHeroLogo = function cleanHeroLogo() {
    var kv = document.querySelector(".framer-t022jh") || document.querySelector("#kv");
    if (!kv) return;
    var logos = kv.querySelectorAll('[data-framer-name="logo"]');
    for (var i = 0; i < logos.length; i++) {
      var logo = logos[i];
      var kids = logo.children;
      for (var k = 0; k < kids.length; k++) {
        var child = kids[k];
        var cls = String(child.className || "");
        var keep =
          cls.indexOf("framer-1qc1yuk") >= 0 ||
          cls.indexOf("hana-daftar-wrap") >= 0 ||
          cls.indexOf("hana-wordmark") >= 0;
        if (keep) {
          child.style.setProperty("visibility", "visible", "important");
          child.style.setProperty("opacity", "1", "important");
        } else {
          child.style.setProperty("visibility", "hidden", "important");
          child.style.setProperty("opacity", "0", "important");
          child.style.setProperty("pointer-events", "none", "important");
        }
      }
    }
  }

  S.fitHeroWord = function fitHeroWord(label, box, force) {
    if (!force && label.dataset.intro === "1") return;
    var width = box.offsetWidth;
    var height = box.offsetHeight;
    if (width < 80 || height < 48) return;
    var vw = window.innerWidth || width;
    var bucket = String(Math.round(vw / 32));
    var healthy = width >= Math.min(vw, 1680) * 0.62;
    var size = height * 1.28;
    label.style.fontSize = size + "px";
    var guard = 0;
    while (label.scrollWidth > width * 1.02 && size > 36 && guard < 18) {
      size *= (width * 1.02) / Math.max(label.scrollWidth, 1);
      label.style.fontSize = Math.floor(size) + "px";
      guard++;
    }
    size = Math.floor(size);
    if (!healthy) {
      if (S.wordLock[bucket]) label.style.fontSize = S.wordLock[bucket] + "px";
      return;
    }
    if (!force && S.wordLock[bucket] && size < S.wordLock[bucket] - 2) {
      label.style.fontSize = S.wordLock[bucket] + "px";
      return;
    }
    S.wordLock[bucket] = size;
    label.style.fontSize = size + "px";
    if (label.dataset.intro !== "1" && label.querySelector(".hana-rings")) {
      var rounded = String(size);
      if (label.dataset.ringSize && label.dataset.ringSize !== rounded) {
        var shown = label.classList.contains("is-show");
        S.buildRings(label);
        var ringHost = label.querySelector(".hana-rings");
        if (shown && ringHost) {
          ringHost.classList.add("is-settled", "is-gone");
          var rings = ringHost.children;
          for (var r = 0; r < rings.length; r++) rings[r].classList.add("is-on");
        }
      }
    }
  }

  S.fitHeroWords = function fitHeroWords(force) {
    var boxes = S.heroBoxes();
    for (var i = 0; i < boxes.length; i++) {
      var label = boxes[i].querySelector(".hana-wordmark");
      if (label) S.fitHeroWord(label, boxes[i], !!force);
    }
  }

  S.centerMobileHero = function centerMobileHero() {
    var mobile = (window.innerWidth || 1200) <= 809.98;
    var heroes = document.querySelectorAll(".framer-t022jh, #kv");
    for (var i = 0; i < heroes.length; i++) {
      var kv = heroes[i];
      var word = kv.querySelector(".hana-wordmark");
      var stack = word;
      while (stack && stack.parentElement !== kv) stack = stack.parentElement;
      if (!stack) continue;
      if (!mobile || kv.getBoundingClientRect().height < 200 || word.getBoundingClientRect().height < 24) {
        if (stack.dataset.hanaShift) {
          stack.style.transform = "";
          delete stack.dataset.hanaShift;
        }
        continue;
      }
      var prev = parseFloat(stack.dataset.hanaShift || "0") || 0;
      var rect = word.getBoundingClientRect();
      var extra = Math.round((rect.top + rect.bottom) / 2 - window.innerHeight / 2);
      if (Math.abs(extra) < 2) continue;
      var next = prev + extra;
      var header = document.querySelector(".framer-16g0gst-container");
      var limit = header ? header.getBoundingClientRect().bottom + 12 : 72;
      var room = stack.getBoundingClientRect().top - limit;
      if (extra > room) next = prev + room;
      if (next < 0) next = 0;
      next = Math.round(next);
      if (next === prev) continue;
      stack.dataset.hanaShift = String(next);
      stack.style.transform = next ? "translateY(" + (-next) + "px)" : "";
    }
  }

  S.word = function word() {
    var boxes = S.heroBoxes();
    for (var i = 0; i < boxes.length; i++) {
      var box = boxes[i];
      var label = box.querySelector(".hana-wordmark");
      var created = false;
      if (!label) {
        label = document.createElement("div");
        label.className = "hana-wordmark";
        label.innerHTML = S.buildWordmarkHtml(true);
        box.appendChild(label);
        created = true;
      } else if (label.dataset.intro !== "1" && (!label.querySelector(".hana-type") || !label.querySelector(".hana-rings"))) {
        label.innerHTML = S.buildWordmarkHtml(true);
        created = true;
      }
      // Force visible — never inherit footer logo hide
      label.style.visibility = "visible";
      label.style.opacity = "";
      S.fitHeroWord(label, box, false);
      if (label.dataset.intro === "1") {
        /* sequence already running */
      } else if (created && S.revealed) S.playWordAnim(label);
      else if (!created && S.revealed && label.dataset.colored === "1") {
        label.classList.add("is-show", "is-colored");
      } else if (!created && S.revealed && !label.classList.contains("is-show")) {
        S.playWordAnim(label);
      }
    }
  }

  S.ensureFloat = function ensureFloat() {
    if (S.floatMounted) return;
    S.floatMounted = true;
    var root = document.createElement("div");
    root.className = "hana-float";
    root.innerHTML =
      '<button type="button" class="hana-float-daftar">' + S.FLOAT_DAFTAR_LABEL + "</button>" +
      '<a class="hana-float-wa" href="' + (S.WA_HREF || "#") + '" aria-label="WhatsApp" ' + (S.WA_HREF ? 'target="_blank" rel="noopener noreferrer"' : "") + ">" +
      '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.5 3.5A11.5 11.5 0 0 0 2.4 17.7L1.5 22.5l4.9-.9A11.5 11.5 0 1 0 20.5 3.5zm-8.5 18a9.5 9.5 0 0 1-4.8-1.3l-.3-.2-2.9.5.5-2.8-.2-.3a9.5 9.5 0 1 1 7.7 4.1zm5.5-7.1c-.3-.1-1.7-.8-2-.9s-.5-.2-.7.1c-.2.3-.8.9-.9 1.1s-.4.2-.7.1a7.8 7.8 0 0 1-2.3-1.4 8.6 8.6 0 0 1-1.6-2c-.2-.3 0-.5.1-.6l.5-.6c.1-.2.2-.3.3-.5s0-.4 0-.5-.7-1.7-.9-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.4 1.1 2.8 1.2 3 .2.3 2.1 3.2a13.5 13.5 0 0 0 3.2 2.5c.4.2.8.2 1.1.1s1.7-.7 1.9-1.3.2-1.2.2-1.3-.2-.2-.5-.3z"/></svg>' +
      "</a>";
    document.body.appendChild(root);
    var fd = root.querySelector(".hana-float-daftar");
    fd.addEventListener("click", function () {
      var main = document.querySelector(".hana-daftar");
      if (main) main.click();
      else if (S.DAFTAR_HREF) window.open(S.DAFTAR_HREF, "_blank", "noopener,noreferrer");
    });
    if (!S.WA_HREF) {
      root.querySelector(".hana-float-wa").addEventListener("click", function (ev) {
        ev.preventDefault();
      });
    }
  }

  S.placeDaftar = function placeDaftar() {
    S.ensureFloat();
    var boxes = S.heroBoxes();
    var box = boxes.length ? boxes[0] : null;
    if (!S.daftarScrollLink || !S.daftarScrollLink.isConnected) {
      S.daftarScrollLink = null;
      var links = document.querySelectorAll("a");
      for (var s = 0; s < links.length; s++) {
        var scrollLabel = (links[s].textContent || "").trim().toLowerCase();
        if (scrollLabel === "scroll down" || scrollLabel === "gulir ke bawah" || scrollLabel === "下へスクロール") {
          S.daftarScrollLink = links[s];
          break;
        }
      }
    }
    var scroll = S.daftarScrollLink;
    if (scroll) {
      var scrollText = scroll.querySelector("p, span") || scroll;
      S.setTextOnce(scrollText, S.tx("Gulir ke bawah", "下へスクロール"));
    }
    if (!box || !scroll) return;
    var host = box.parentElement;
    if (!host) return;
    // Never park Daftar inside a swapped footer logo
    if (host.closest && host.closest(".hana-logo-swapped")) return;
    if (getComputedStyle(host).position === "static") host.style.position = "relative";
    var wrap = host.querySelector(".hana-daftar-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "hana-daftar-wrap";
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hana-daftar";
      btn.textContent = S.DAFTAR_LABEL;
      var burst = document.createElement("span");
      burst.className = "hana-pop-burst";
      wrap.appendChild(burst);
      wrap.appendChild(btn);
      host.appendChild(wrap);
      btn.addEventListener("click", function () {
        if (btn.classList.contains("is-pop")) return;
        btn.classList.add("is-pop");
        burst.classList.add("is-on");
        window.setTimeout(function () {
          if (S.DAFTAR_HREF) window.open(S.DAFTAR_HREF, "_blank", "noopener,noreferrer");
          btn.classList.remove("is-pop");
          burst.classList.remove("is-on");
        }, 560);
      });
    }
    var daftarBtn = wrap.querySelector(".hana-daftar");
    if (daftarBtn && daftarBtn.textContent !== S.DAFTAR_LABEL) daftarBtn.textContent = S.DAFTAR_LABEL;
    var floatLabel = document.querySelector(".hana-float-daftar");
    if (floatLabel && floatLabel.textContent !== S.FLOAT_DAFTAR_LABEL) floatLabel.textContent = S.FLOAT_DAFTAR_LABEL;
    wrap.style.visibility = "visible";
    var word = box.querySelector(".hana-wordmark");
    var ready = !!(word && (word.dataset.colored === "1" || word.classList.contains("is-colored")));
    wrap.classList.toggle("is-ready", ready);
    var boxRect = box.getBoundingClientRect();
    var scrollRect = scroll.getBoundingClientRect();
    var hostRect = host.getBoundingClientRect();
    var mid = (boxRect.bottom + scrollRect.top) / 2 - hostRect.top;
    var topPx = Math.round(Math.max(boxRect.bottom - hostRect.top + 18, mid - 12));
    if (wrap._hanaTop !== topPx) {
      wrap._hanaTop = topPx;
      wrap.style.top = topPx + "px";
    }

    var floatBtn = document.querySelector(".hana-float-daftar");
    var dock = boxRect.bottom < 80 || window.scrollY > Math.max(120, boxRect.height * 0.35);
    wrap.classList.toggle("is-docked", dock);
    if (floatBtn) floatBtn.classList.toggle("is-on", dock && ready);
  }

  S.scatter = function scatter() {
    var kv = document.querySelector(".framer-t022jh") || document.querySelector("#kv");
    var label = kv && kv.querySelector(".hana-wordmark");
    if (!kv || !label || label.dataset.intro === "1") return;
    var rect = kv.getBoundingClientRect();
    var total = Math.max(rect.height * 0.85, 1);
    var scrolled = Math.min(Math.max(-rect.top, 0), total);
    var p = scrolled / total;
    var ease = p * p * (3 - 2 * p);
    var rings = label.querySelector(".hana-rings");
    if (rings && label.classList.contains("is-show") && !rings.classList.contains("is-gone")) {
      rings.classList.add("is-gone");
    }
    var key = Math.round(ease * 48);
    if (label._scatterKey === key) return;
    label._scatterKey = key;
    var parts = label.querySelectorAll(".hana-wordmark-base .hana-letter");
    var colorParts = label.querySelectorAll(".hana-wordmark-color .hana-letter");
    for (var i = 0; i < parts.length; i++) {
      var idx = parseInt(parts[i].getAttribute("data-i") || String(i), 10);
      var mid = (parts.length - 1) / 2;
      var fromCenter = idx - mid;
      var lift = ease * (140 + Math.abs(fromCenter) * 28 + (idx % 3) * 36);
      var drift = ease * fromCenter * 18;
      var rot = ease * fromCenter * 4;
      var fade = 1 - ease * 0.15;
      var tf = "translate(" + drift.toFixed(1) + "px," + (-lift).toFixed(1) + "px) rotate(" + rot.toFixed(2) + "deg)";
      parts[i].style.transform = tf;
      parts[i].style.opacity = String(fade);
      if (colorParts[i]) {
        colorParts[i].style.transform = tf;
        colorParts[i].style.opacity = String(fade);
      }
    }
  }

  S.showWord = function showWord() {
    var marks = document.querySelectorAll(".framer-1qc1yuk .hana-wordmark");
    if (S.revealed) {
      for (var e = 0; e < marks.length; e++) {
        if (!marks[e].classList.contains("is-show") && marks[e].dataset.intro !== "1") S.playWordAnim(marks[e]);
      }
      return;
    }
    S.revealed = true;
    for (var m = 0; m < marks.length; m++) S.playWordAnim(marks[m]);
  }

  S.revealTick = function revealTick() {
    if (document.getElementById("hana-loader") || S.scheduled) return;
    S.scheduled = true;
    window.setTimeout(S.showWord, 700);
  }
}
