/* Header, menu, footer, language switch, and the contact page. */
export function install(S) {
  S.header = function header() {
    var links = document.querySelectorAll("a.framer-1gk72qp");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      if (link.querySelector(".hana-header-logo")) continue;
      var img = document.createElement("img");
      img.className = "hana-header-logo";
      img.src = "/brand/hana-banner.png";
      img.alt = "Hana Karya Nihongo Gakkou";
      link.appendChild(img);
    }
  }

  S.fitTitle = function fitTitle(el) {
    el.classList.add("hana-hero-title");
    el.style.fontSize = "";
    el.style.marginLeft = "";
    el.style.transform = "";
    var n = el.parentElement;
    for (var i = 0; i < 5 && n; i++) {
      n.style.overflow = "visible";
      n.style.maxWidth = "none";
      if (!n.classList.contains("framer-t022jh")) {
        n.style.width = "100%";
        n.style.display = n.style.display || "";
      }
      n = n.parentElement;
    }
  }

  S.subtitle = function subtitle() {
    var NEW_SUB = S.tx("Gino Jisshusei | Ikusei Shuro | Tokutei Ginou | Gijinkoku | Nihongo Gakko", "技能実習 | 育成就労 | 特定技能 | 技人国 | 日本語学校");
    var OLD_A = "リアルのためのデジタルを追求し、";
    var OLD_B = "手触りのある人間らしい社会を実現する";
    var titleEl = null;
    var nodes = document.querySelectorAll("span, p");
    var titleJa = "一緒に、日本での未来へ。";
    var titleNow = S.tx(S.TITLE, titleJa);
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].childNodes.length !== 1) continue;
      var currentTitle = nodes[i].textContent;
      if (currentTitle !== S.TITLE && currentTitle !== titleJa) continue;
      if (currentTitle !== titleNow) nodes[i].textContent = titleNow;
      titleEl = nodes[i];
      break;
    }
    var scope = titleEl ? titleEl.closest(".framer-5tr2uw, .framer-1ke59rw, .framer-t022jh") || titleEl.parentElement : null;
    if (!scope) return;
    var marked = scope.querySelector(".hana-hero-sub");
    if (marked) {
      if ((marked.textContent || "").replace(/\s+/g, " ").trim() !== NEW_SUB) marked.textContent = NEW_SUB;
      return;
    }
    var hit = null;
    var kids = scope.querySelectorAll("p, span");
    for (var j = 0; j < kids.length; j++) {
      var t = (kids[j].textContent || "").trim();
      if (t === OLD_A || t === OLD_B || t.indexOf("Gino Jisshusei") === 0 || t.indexOf("技能実習") === 0 || t.indexOf("Pursuing digital") === 0 || t.indexOf("to create") === 0 || t.indexOf("Ikusei Sh") === 0) {
        hit = kids[j].parentElement && kids[j].parentElement !== scope ? kids[j].parentElement : kids[j];
        break;
      }
    }
    if (!hit) return;
    hit.textContent = NEW_SUB;
    hit.classList.add("hana-hero-sub");
    var sibs = hit.parentElement ? hit.parentElement.querySelectorAll("p, span") : [];
    for (var k = 0; k < sibs.length; k++) {
      if (sibs[k] === hit || sibs[k].closest(".hana-hero-sub") === hit) continue;
      var st = (sibs[k].textContent || "").trim();
      if (st === OLD_A || st === OLD_B || !st) sibs[k].style.display = "none";
    }
  }

  S.title = function title() {
    var nodes = document.querySelectorAll("span, p");
    var titleJa = "一緒に、日本での未来へ。";
    var titleNow = S.tx(S.TITLE, titleJa);
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.childNodes.length !== 1) continue;
      var currentTitle = el.textContent;
      if (currentTitle !== S.TITLE && currentTitle !== titleJa) continue;
      if (currentTitle !== titleNow) el.textContent = titleNow;
      if (parseFloat(getComputedStyle(el).fontSize) > 28 || el.classList.contains("hana-hero-title")) S.fitTitle(el);
      if (S.isHomePage()) S.placeKicker(el);
    }
  }

  S.placeKicker = function placeKicker(el) {
    if (!el.closest(".framer-t022jh, #kv")) return;
    var parent = el.parentElement;
    if (!parent) return;
    var label = S.tx("#LPKTERBAIKDIBANDUNG", "#バンドンで一番のLPK");
    var kick = parent.querySelector(":scope > .hana-hero-kicker");
    if (!kick) {
      kick = document.createElement("p");
      kick.className = "hana-hero-kicker";
      parent.insertBefore(kick, el);
    }
    if (kick.textContent !== label) kick.textContent = label;
  }

  S.stripTickerKickers = function stripTickerKickers() {
    var kicks = document.querySelectorAll(".hana-hero-kicker");
    for (var i = 0; i < kicks.length; i++) {
      if (kicks[i].closest(".framer-t022jh, #kv")) continue;
      kicks[i].remove();
    }
  }

  S.chromeLabels = function chromeLabels() {
    var more = S.tx("Selengkapnya", "詳しく見る");
    var nodes = document.querySelectorAll("p, span");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && el.closest("[data-hana-maps='1']")) continue;
      if (el.childNodes.length !== 1 || el.childNodes[0].nodeType !== 3) continue;
      var t = (el.textContent || "").trim();
      if (t === "learn more" || t === "Learn More" || t === "Selengkapnya" || t === "詳しく見る") S.setTextOnce(el, more);
    }
  }

  S.language = function language() {
    var nodes = document.querySelectorAll("p, span");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.childNodes.length !== 1 || el.childNodes[0].nodeType !== 3) continue;
      var t = el.textContent;
      if (t === "JA") el.textContent = "ID";
      else if (t === "EN") el.textContent = "JP";
    }
    var named = document.querySelectorAll('[data-framer-name="JA"], [data-framer-name="EN"], [data-framer-name="ID"], [data-framer-name="JP"]');
    for (var n = 0; n < named.length; n++) {
      var node = named[n];
      var name = node.getAttribute("data-framer-name");
      if (name === "JA") node.setAttribute("data-framer-name", "ID");
      if (name === "EN") node.setAttribute("data-framer-name", "JP");
      var text = node.querySelector("p, span");
      if (text && text.textContent === "JA") text.textContent = "ID";
      if (text && text.textContent === "EN") text.textContent = "JP";
      if (!node.dataset.hanaLangBound) {
        node.dataset.hanaLangBound = "1";
        node.addEventListener("click", function () {
          window.setTimeout(function () {
            var marks = document.querySelectorAll(".framer-1qc1yuk .hana-wordmark");
            for (var m = 0; m < marks.length; m++) S.playWordAnim(marks[m]);
          }, 80);
        }, true);
      }
    }
  }

  S.armFooterRoll = function armFooterRoll(label) {
    if (label.dataset.footerRoll) return;
    label.dataset.footerRoll = "1";
    label.dataset.rollDir = "rtl";
    var start = function () { S.settleWord(label); };
    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      io.disconnect();
      start();
    }, { threshold: 0.35 });
    io.observe(label);
  }

  S.footerBrand = function footerBrand() {
    // Undo accidental hero logo swaps from older patches
    var heroLogos = document.querySelectorAll(".framer-t022jh [data-framer-name='logo'], #kv [data-framer-name='logo']");
    for (var h = 0; h < heroLogos.length; h++) {
      heroLogos[h].classList.remove("hana-logo-swapped");
      var bad = heroLogos[h].querySelector(".hana-foot-word");
      if (bad) bad.remove();
      var kids = heroLogos[h].children;
      for (var hk = 0; hk < kids.length; hk++) {
        kids[hk].style.visibility = "";
        kids[hk].style.opacity = "";
        kids[hk].style.pointerEvents = "";
      }
    }

    // Footer letter row (the colorful MIROOM) becomes the hero HANAKARYA wordmark
    var feet = document.querySelectorAll('[data-framer-name="footer"]');
    for (var i = 0; i < feet.length; i++) {
      var foot = feet[i];
      if (foot.closest(".framer-t022jh, #kv")) continue;
      foot.classList.add("hana-footer-mark");
      var stale = foot.querySelectorAll(".hana-foot-word, .hana-logo-swapped");
      for (var s = 0; s < stale.length; s++) {
        stale[s].classList.remove("hana-logo-swapped");
      }
      var nested = foot.querySelectorAll(".hana-foot-word");
      for (var n = 0; n < nested.length; n++) nested[n].remove();
      var label = foot.querySelector(":scope > .hana-wordmark");
      if (!label) {
        label = document.createElement("div");
        label.className = "hana-wordmark";
        label.innerHTML = S.buildWordmarkHtml(false);
        foot.appendChild(label);
      } else if (!label.querySelector(".hana-type")) {
        label.innerHTML = S.buildWordmarkHtml(false);
      }
      var oldRoll = label.querySelector(".hana-roll");
      if (oldRoll) oldRoll.remove();
      label.style.visibility = "visible";
      var width = foot.getBoundingClientRect().width || 1100;
      var height = foot.getBoundingClientRect().height || 205;
      if (height < 120) height = 205;
      var size = Math.min(height * 0.82, 168);
      var text = label.querySelector(".hana-wordmark-base");
      label.style.fontSize = size + "px";
      var guard = 0;
      var textWidth = text ? text.scrollWidth : 0;
      while (text && textWidth > width * 0.9 && size > 64 && guard < 18) {
        size *= (width * 0.9) / textWidth;
        label.style.fontSize = size + "px";
        textWidth = text.scrollWidth;
        guard++;
      }
      S.armFooterRoll(label);
    }

    // MIROOM SVG wordmark in footer -> banner
    var svgs = document.querySelectorAll("svg");
    for (var u = 0; u < svgs.length; u++) {
      var svg = svgs[u];
      if (svg.dataset.hanaReplaced) continue;
      var use = svg.querySelector('use');
      if (!use) continue;
      var href = use.getAttribute("href") || use.getAttribute("xlink:href") || "";
      if (href.indexOf("svg221082935_5626") < 0) continue;
      svg.dataset.hanaReplaced = "1";
      var host = svg.parentElement;
      if (!host) continue;
      svg.style.display = "none";
      var existingLogo = host.querySelector(".hana-footer-logo");
      if (existingLogo) {
        if (existingLogo.getAttribute("src") !== "/brand/hana-emblem.png") {
          existingLogo.src = "/brand/hana-emblem.png";
          existingLogo.alt = "LPK Hana Karya";
        }
        continue;
      }
      var logo = document.createElement("img");
      logo.className = "hana-footer-logo";
      logo.src = "/brand/hana-emblem.png";
      logo.alt = "LPK Hana Karya";
      host.appendChild(logo);
    }
    var logos = document.querySelectorAll(".hana-footer-logo");
    for (var L = 0; L < logos.length; L++) {
      if (logos[L].getAttribute("src") !== "/brand/hana-emblem.png") {
        logos[L].src = "/brand/hana-emblem.png";
        logos[L].alt = "LPK Hana Karya";
      }
      logos[L].style.imageRendering = "auto";
    }

    // Also text nodes that say MIROOM as sole content near footer
    var nodes = document.querySelectorAll("p, span, div");
    for (var n = 0; n < nodes.length; n++) {
      var el = nodes[n];
      if (el.childNodes.length !== 1 || el.childNodes[0].nodeType !== 3) continue;
      var t = (el.textContent || "").trim();
      if (t === "MIROOM" || t === "Miroom") {
        el.textContent = "HANA KARYA";
        el.style.fontFamily = '"Baloo 2", Poppins, sans-serif';
        el.style.fontWeight = "800";
        el.style.letterSpacing = "-0.04em";
      }
      if (t === "© Miroom, Inc." || t === "© Miroom, Inc") {
        el.textContent = "©LPK Hana Karya";
      }
    }
    var named = document.querySelectorAll('[data-framer-name="© Miroom, Inc."]');
    for (var c = 0; c < named.length; c++) {
      var p = named[c].querySelector("p, span") || named[c];
      if ((p.textContent || "").indexOf("Miroom") >= 0) p.textContent = "©LPK Hana Karya";
    }
    S.stackFooterBrand();
    S.ensureInfoFooter();
  }

  S.ensureInfoFooter = function ensureInfoFooter() {
    var MAPS = "https://maps.app.goo.gl/RE3WatdxG3f6hNwY8";
    var feet = document.querySelectorAll(".framer-5PlRZ");
    for (var i = 0; i < feet.length; i++) {
      var foot = feet[i];
      if (foot.querySelector(".hana-info")) continue;
      var info = document.createElement("section");
      if (!document.getElementById("kontak")) info.id = "kontak";
      info.className = "hana-info";
      info.innerHTML =
        '<div class="hana-info-grid">' +
          '<div class="hana-info-brand">' +
            '<div class="hana-info-name"><img src="/brand/hana-emblem.png" alt=""><strong>LPK HANA KARYA</strong></div>' +
            '<p>' + S.tx("Lembaga pelatihan bahasa dan persiapan kerja ke Jepang. Dari Bandung, menuju masa depan di Jepang.", "日本語と就職の準備をする訓練機関です。バンドンから、日本の未来へ。") + '</p>' +
            '<small>© 2026 LPK Hana Karya. All Rights Reserved.</small>' +
          '</div>' +
          '<div>' +
            '<h3>' + S.tx("Lokasi Pusat", "所在地") + '</h3>' +
            '<a class="hana-info-row" href="' + MAPS + '" target="_blank" rel="noopener noreferrer">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
              '<span>LPK Hana Karya, Bojongsari, Bojongsoang, Kabupaten Bandung, Jawa Barat 40375</span>' +
            '</a>' +
            '<a class="hana-info-row" href="tel:+6285795838179">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3A2 2 0 0 1 19 19 16.5 16.5 0 0 1 5 5a2 2 0 0 1 1.5-1.5z"/></svg>' +
              '<span>0857 9583 8179</span>' +
            '</a>' +
            '<a class="hana-info-row" href="mailto:hanakaryacc@gmail.com">' +
              '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg>' +
              '<span>hanakaryacc@gmail.com</span>' +
            '</a>' +
          '</div>' +
          '<nav class="hana-info-nav">' +
            '<h3>' + S.tx("Navigasi", "ナビゲーション") + '</h3>' +
            '<a href="/">' + S.tx("Beranda", "ホーム") + '</a>' +
            '<a href="/#company">' + S.tx("Tentang Kami", "私たちについて") + '</a>' +
            '<a href="/program">' + S.tx("Program", "プログラム") + '</a>' +
            '<a href="/contact">' + S.tx("Kontak", "お問い合わせ") + '</a>' +
          '</nav>' +
        '</div>';
      foot.appendChild(info);
    }
  }

  S.ensureSiteMenu = function ensureSiteMenu() {
    var menu = document.querySelector(".framer-GFbLs");
    if (!menu) return;
    var host = menu.querySelector(".framer-19smlq2");
    if (!host || host.querySelector(".hana-menu")) return;
    var nav = document.createElement("nav");
    nav.className = "hana-menu";
    nav.innerHTML =
      '<a href="/">' + S.tx("Beranda", "ホーム") + '</a>' +
      '<a href="/program">' + S.tx("Program", "プログラム") + '</a>' +
      '<a href="/contact">' + S.tx("Contact Us", "お問い合わせ") + '</a>';
    var here = (location.pathname || "").replace(/\/+$/, "") || "/";
    var marks = nav.querySelectorAll("a");
    for (var m = 0; m < marks.length; m++) {
      var dest = marks[m].getAttribute("href");
      if ((dest === "/" && here === "/") || (dest === "/program" && here === "/program") || (dest === "/contact" && here === "/contact")) marks[m].classList.add("is-on");
    }
    nav.addEventListener("click", function (event) {
      var link = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!link) return;
      event.preventDefault();
      event.stopPropagation();
      document.documentElement.classList.add("hana-menu-force-shut");
      S.visit(link.getAttribute("href") || "/");
    });
    host.appendChild(nav);
  }

  S.stackFooterBrand = function stackFooterBrand() {
    var feet = document.querySelectorAll(".framer-5PlRZ");
    for (var i = 0; i < feet.length; i++) {
      var foot = feet[i];
      var logoLink = foot.querySelector("a.framer-n733on");
      var copy = foot.querySelector(".framer-daqgjx");
      if (!logoLink || !copy) continue;
      var stack = logoLink.closest(".hana-foot-brand");
      if (!stack) {
        stack = document.createElement("div");
        stack.className = "hana-foot-brand";
        logoLink.parentElement.insertBefore(stack, logoLink);
        stack.appendChild(logoLink);
      }
      if (copy.parentElement !== stack) stack.appendChild(copy);
    }
  }

  S.subtitleLoose = function subtitleLoose() {
    var NEW_SUB = S.tx("Gino Jisshusei | Ikusei Shuro | Tokutei Ginou | Gijinkoku | Nihongo Gakko", "技能実習 | 育成就労 | 特定技能 | 技人国 | 日本語学校");
    var OLD_A = "リアルのためのデジタルを追求し、";
    var OLD_B = "手触りのある人間らしい社会を実現する";
    var scopes = document.querySelectorAll(".framer-t022jh, #kv, .framer-5tr2uw, .framer-1ke59rw");
    for (var s = 0; s < scopes.length; s++) {
      var nodes = scopes[s].querySelectorAll("p, span");
      for (var i = 0; i < nodes.length; i++) {
        var el = nodes[i];
        var t = (el.textContent || "").trim();
        if (t === OLD_A || t === "Pursuing digital for the real world," || t.indexOf("Gino Jisshusei") === 0 || t.indexOf("技能実習") === 0 || el.classList.contains("hana-hero-sub")) {
          if (t !== NEW_SUB) el.textContent = NEW_SUB;
          el.classList.add("hana-hero-sub");
        } else if (t === OLD_B || t.indexOf("to create a human") === 0) {
          el.style.display = "none";
        }
      }
    }
  }

  S.contactPage = function contactPage() {
    var on = S.isContactPage();
    document.documentElement.classList.toggle("hana-contact-page", on || !!S.wantContact);
    if (!on) {
      if (!S.wantContact) {
        var stale = document.querySelectorAll(".hana-contact");
        for (var s = 0; s < stale.length; s++) stale[s].remove();
      }
      return;
    }
    var root = document.querySelector(".framer-o75jI");
    if (!root || root.querySelector(".hana-contact")) return;
    var MAPS = "https://maps.app.goo.gl/RE3WatdxG3f6hNwY8";
    var page = document.createElement("section");
    page.className = "hana-contact";
    page.innerHTML =
      '<div class="hana-contact-wrap">' +
        '<p class="hana-contact-kicker">CONTACT US</p>' +
        '<h1>' + S.tx("Hubungi LPK Hana Karya", "LPK Hana Karyaへの連絡") + '</h1>' +
        '<p class="hana-contact-lead">' + S.tx("Lembaga pelatihan bahasa dan persiapan kerja ke Jepang di Bandung. Silakan hubungi kami untuk bertanya tentang program, persyaratan, atau keberangkatan.", "バンドンにある、日本で学ぶ・働くための訓練機関です。プログラム、条件、出発について、お気軽にご連絡ください。") + '</p>' +
        '<div class="hana-contact-layout">' +
          '<div class="hana-contact-list">' +
            '<a class="hana-contact-card" href="' + MAPS + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="hana-contact-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span>' +
              '<span><small>' + S.tx("Alamat", "住所") + '</small><strong>LPK Hana Karya, Bojongsari, Bojongsoang, Kabupaten Bandung, Jawa Barat 40375</strong></span>' +
            '</a>' +
            '<a class="hana-contact-card" href="tel:+6285795838179">' +
              '<span class="hana-contact-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6.5 3.5h3l1.5 4-2 1.5a12 12 0 0 0 6 6l1.5-2 4 1.5v3A2 2 0 0 1 19 19 16.5 16.5 0 0 1 5 5a2 2 0 0 1 1.5-1.5z"/></svg></span>' +
              '<span><small>' + S.tx("Telepon", "電話") + '</small><strong>0857 9583 8179</strong></span>' +
            '</a>' +
            '<a class="hana-contact-card" href="' + S.WA_HREF + '" target="_blank" rel="noopener noreferrer">' +
              '<span class="hana-contact-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 19l1.2-3.4A8 8 0 1 1 12 20a8 8 0 0 1-3.6-.8z"/><path d="M9 10.2c.2 1.6 1.8 3.1 3.4 3.5"/></svg></span>' +
              '<span><small>WhatsApp</small><strong>Chat 0857 9583 8179</strong></span>' +
            '</a>' +
            '<a class="hana-contact-card" href="mailto:hanakaryacc@gmail.com">' +
              '<span class="hana-contact-ico" aria-hidden="true"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 7 9-7"/></svg></span>' +
              '<span><small>' + S.tx("Email", "メール") + '</small><strong>hanakaryacc@gmail.com</strong></span>' +
            '</a>' +
          '</div>' +
          '<div class="hana-contact-map">' +
            '<iframe title="Peta LPK Hana Karya" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://maps.google.com/maps?q=-6.9887534,107.6469491&amp;z=16&amp;hl=id&amp;output=embed"></iframe>' +
            '<div class="hana-contact-map-bar">' +
              '<p>' + S.tx("Lokasi pusat LPK Hana Karya di Bojongsoang, Kabupaten Bandung.", "LPK Hana Karyaの所在地。ボジョンスアン、バンドン県。") + '</p>' +
              '<a href="' + MAPS + '" target="_blank" rel="noopener noreferrer">' + S.tx("Buka peta", "地図を開く") + '</a>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    var foot = root.querySelector(".framer-5PlRZ");
    var before = foot;
    while (before && before.parentElement !== root) before = before.parentElement;
    if (before && before.parentElement === root) root.insertBefore(page, before);
    else root.appendChild(page);
  }

  S.guardDeadLinks = function guardDeadLinks() {
    window.addEventListener("mouseover", function (event) {
      var link = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!S.deadLink(link)) return;
      S.disarm(link);
      event.stopPropagation();
    }, true);
    window.addEventListener("click", function (event) {
      var link = event.target && event.target.closest ? event.target.closest("a") : null;
      if (!S.deadLink(link)) return;
      event.preventDefault();
      event.stopPropagation();
      if (link.dataset.hanaWa === "1") {
        window.open(S.WA_HREF, "_blank", "noopener,noreferrer");
        return;
      }
    }, true);
  }

  S.deadLink = function deadLink(link) {
    if (!link) return false;
    if (link.dataset.hanaWa === "1" || link.dataset.hanaNews === "1") return true;
    if (link.closest(".framer-1dgx6g1") && /daftar|get in touch/i.test(link.textContent || "")) return true;
    if (link.classList.contains("framer-Usk5n")) return true;
    var href = link.getAttribute("href") || "";
    return href.indexOf("./news/") === 0 || href.indexOf("./careers") === 0;
  }

  S.disarm = function disarm(link) {
    var key = null;
    var names = Object.keys(link);
    for (var i = 0; i < names.length; i++) {
      if (names[i].indexOf("__reactProps") === 0) { key = names[i]; break; }
    }
    if (!key || !link[key]) return;
    var props = link[key];
    props.onMouseEnter = function () {};
    props.onClick = function (event) {
      if (event && event.preventDefault) event.preventDefault();
      if (event && event.stopPropagation) event.stopPropagation();
    };
    if (link.dataset.hanaWa === "1" || (link.closest(".framer-1dgx6g1") && /daftar|get in touch/i.test(link.textContent || ""))) {
      props.href = S.WA_HREF;
    } else {
      props.href = undefined;
    }
  }

  S.isProductHref = function isProductHref(href) {
    if (!href) return false;
    var path = href.split("?")[0].split("#")[0];
    return /(?:^|\/|\.)product\/?$/.test(path);
  }

  S.programNav = function programNav() {
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = link.getAttribute("href") || "";
      if (S.isProductHref(href)) link.setAttribute("href", href.replace(/product(\/?)(?=$|\?|#)/, "program$1"));
      var bits = link.querySelectorAll("p, span");
      for (var b = 0; b < bits.length; b++) {
        var raw = (bits[b].textContent || "").replace(/\s+/g, " ").trim();
        if (raw.toLowerCase() === "our product") S.setTextOnce(bits[b], "Program");
      }
    }
    var titles = document.querySelectorAll("p, h1, span");
    for (var t = 0; t < titles.length; t++) {
      var el = titles[t];
      if (el.closest("a") || el.childElementCount) continue;
      var text = (el.textContent || "").replace(/\s+/g, " ").trim();
      if (text.toLowerCase() === "our product") S.setTextOnce(el, "our Program");
    }
  }

  S.emptyPagePath = function emptyPagePath(href) {
    var path = (href || "").split("?")[0].split("#")[0].replace(/^\.\//, "/").replace(/\/+$/, "");
    if (!path) return false;
    if (path.charAt(0) !== "/") path = "/" + path;
    return path === "/company" || path === "/news" || path === "/careers";
  }

  S.hideEmptyNav = function hideEmptyNav() {
    S.ensureSiteMenu();
    var boxes = document.querySelectorAll(
      ".framer-GFbLs .framer-1odh8up-container, .framer-GFbLs .framer-11ticdh-container, .framer-GFbLs .framer-cx8srn-container, .framer-5PlRZ a.framer-azuhcf, .framer-5PlRZ a.framer-1uk09yy, .framer-5PlRZ a.framer-1l5ovh1"
    );
    for (var i = 0; i < boxes.length; i++) boxes[i].style.setProperty("display", "none", "important");

    var links = document.querySelectorAll(".framer-19smlq2 a, .framer-1db5hky a");
    for (var j = 0; j < links.length; j++) {
      var link = links[j];
      var href = link.getAttribute("href") || "";
      var label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
      var named = label === "company" || label.indexOf("company ") === 0 || label === "news" || label.indexOf("news ") === 0 || label === "careers" || label.indexOf("careers ") === 0 || label.indexOf("会社概要") !== -1 || label.indexOf("ニュース") !== -1 || label.indexOf("採用情報") !== -1;
      if (!S.emptyPagePath(href) && !named) continue;
      if (/privacy/.test(label)) continue;
      var row = link.closest(".framer-1rn6r11 > *, .framer-1db5hky > a") || link;
      row.style.setProperty("display", "none", "important");
    }
    S.fitOpenMenu();
  }

  S.ensureFlag = function ensureFlag() {
    var flag = document.querySelector("body > .hana-flag");
    if (!flag) {
      flag = document.createElement("button");
      flag.type = "button";
      flag.className = "hana-flag";
      flag.innerHTML = '<span class="hana-flag-jp" aria-hidden="true"></span>';
      flag.addEventListener("pointerdown", function (event) { event.stopPropagation(); }, true);
      flag.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation();
        S.setLang(S.lang === "ja" ? "id" : "ja");
      }, true);
      document.body.appendChild(flag);
    }
    var on = S.lang === "ja";
    var mark = flag.querySelector("span");
    if (mark) mark.className = on ? "hana-flag-id" : "hana-flag-jp";
    flag.setAttribute("aria-pressed", on ? "true" : "false");
    flag.setAttribute("aria-label", on ? "Bahasa Indonesia" : "Bahasa Jepang");
    var btn = document.querySelector(".framer-GFbLs .framer-pcffpq") || document.querySelector(".framer-GFbLs .framer-ww2ww5");
    if (!btn) return;
    var rect = btn.getBoundingClientRect();
    var top = Math.round(rect.top + (rect.height - 28) / 2);
    var left = Math.round(rect.left - 40 - 8);
    if (flag._hanaTop !== top) {
      flag._hanaTop = top;
      flag.style.top = top + "px";
    }
    if (flag._hanaLeft !== left) {
      flag._hanaLeft = left;
      flag.style.left = left + "px";
    }
  }

  S.menuIsOpen = function menuIsOpen() {
    var menu = document.querySelector(".framer-GFbLs");
    if (!menu) return false;
    return menu.classList.contains("framer-v-10nzhj2") || menu.classList.contains("framer-v-vrys9k") || menu.classList.contains("framer-v-1fcapuz") || menu.classList.contains("framer-v-ifl215");
  }

  S.watchMenu = function watchMenu() {
    var menu = document.querySelector(".framer-GFbLs");
    if (!menu || menu.dataset.hanaWatch) return;
    menu.dataset.hanaWatch = "1";
    new MutationObserver(function () {
      if (!S.menuIsOpen()) document.documentElement.classList.remove("hana-menu-force-shut");
      if (S.applying) return;
      S.ensureSiteMenu();
      S.fitOpenMenu();
    }).observe(menu, { childList: true, subtree: true, attributes: true, attributeFilter: ["class"] });
  }

  S.fitOpenMenu = function fitOpenMenu() {
    var menu = document.querySelector(".framer-GFbLs");
    if (!menu) return;
    S.ensureFlag();
    S.watchMenu();
    var open = S.menuIsOpen();
    var content = menu.querySelector(".framer-19smlq2");
    if (!open || !content) return;
    S.ensureSiteMenu();
    var btn = menu.querySelector(".framer-ww2ww5") || menu.querySelector(".framer-pcffpq");
    if (!btn) return;
    var parent = content.offsetParent || menu;
    var gap = Math.ceil(btn.getBoundingClientRect().bottom - parent.getBoundingClientRect().top + 10);
    if (gap < 64) gap = 72;
    if (content._hanaTop !== gap) {
      content._hanaTop = gap;
      content.style.setProperty("top", gap + "px", "important");
    }
  }

  S.localPage = function localPage(href) {
    if (!href || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0) return null;
    var url;
    try { url = new URL(href, location.href); } catch (err) { return null; }
    if (url.origin !== location.origin) return null;
    var path = url.pathname.replace(/\/+$/, "") || "/";
    if (path === "/product") path = "/program";
    if (path !== "/" && path !== "/program" && path !== "/contact") return null;
    return { path: path, hash: url.hash || "" };
  }

  S.herePath = function herePath() {
    return (location.pathname || "").replace(/\/+$/, "") || "/";
  }

  S.framerAnchor = function framerAnchor(path) {
    var want = path === "/" ? ["./", "/", "./index"] : ["./program", "/program", "./product", "/product"];
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      var href = (link.getAttribute("href") || "").split("#")[0].split("?")[0];
      if (want.indexOf(href) < 0) continue;
      var names = Object.keys(link);
      for (var k = 0; k < names.length; k++) {
        if (names[k].indexOf("__reactProps") !== 0) continue;
        if (link[names[k]] && typeof link[names[k]].onClick === "function") return link;
      }
    }
    return null;
  }

  S.invokeFramer = function invokeFramer(link) {
    var key = null;
    var names = Object.keys(link);
    for (var i = 0; i < names.length; i++) {
      if (names[i].indexOf("__reactProps") === 0) { key = names[i]; break; }
    }
    if (!key || !link[key] || typeof link[key].onClick !== "function") return false;
    try {
      link[key].onClick({
        preventDefault: function () {},
        stopPropagation: function () {},
        nativeEvent: { button: 0, metaKey: false, ctrlKey: false, shiftKey: false, altKey: false },
        button: 0,
        metaKey: false,
        ctrlKey: false,
        shiftKey: false,
        altKey: false,
        currentTarget: link,
        target: link
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  S.scrollPageTop = function scrollPageTop() {
    window.scrollTo(0, 0);
  }

  S.prepareRoute = function prepareRoute() {
    if (!(S.wantContact && document.querySelector(".framer-o75jI"))) return;
    S.wantContact = false;
    if (S.herePath() !== "/contact") history.replaceState(history.state, "", "/contact");
    S.scrollPageTop();
  }

  S.visit = function visit(href) {
    var page = S.localPage(href);
    if (!page) {
      if (href) window.location.assign(href);
      return;
    }
    var now = Date.now();
    var key = page.path + page.hash;
    if (S.visitKey === key && now - S.visitAt < 500) return;
    S.visitKey = key;
    S.visitAt = now;
    document.documentElement.classList.add("hana-menu-force-shut");
    var here = S.herePath();
    if (page.path === here && page.hash === (location.hash || "")) return;
    if (page.path === "/contact") {
      S.openContact();
      return;
    }
    S.wantContact = false;
    var onHome = (history.state && history.state.routeId === "augiA20Il") || !!document.querySelector(".framer-o75jI");
    if (page.path === "/" && onHome) {
      history.pushState(history.state, "", "/" + page.hash);
      S.scrollPageTop();
      S.apply();
      return;
    }
    var anchor = S.framerAnchor(page.path);
    if (!anchor || !S.invokeFramer(anchor)) window.location.assign(page.path + page.hash);
  }

  S.openContact = function openContact() {
    if (S.herePath() === "/contact") return;
    var onHome = (history.state && history.state.routeId === "augiA20Il") || !!document.querySelector(".framer-o75jI");
    if (onHome) {
      history.pushState(history.state, "", "/contact");
      S.scrollPageTop();
      S.apply();
      return;
    }
    S.wantContact = true;
    document.documentElement.classList.add("hana-contact-page");
    var home = S.framerAnchor("/");
    if (!home || !S.invokeFramer(home)) window.location.assign("/contact");
  }
}
