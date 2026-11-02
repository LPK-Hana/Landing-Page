/* Page checks and small text helper shared by every section. */
export function install(S) {
  S.lang = "id";
  try {
    if (localStorage.getItem("hana-lang") === "ja") S.lang = "ja";
  } catch (err) {}

  S.tx = function tx(id, ja) {
    return S.lang === "ja" ? ja : id;
  };

  S.applyLabels = function applyLabels() {
    S.DAFTAR_LABEL = S.tx("-> Daftar <-", "-> 申し込み <-");
    S.FLOAT_DAFTAR_LABEL = S.tx("Daftar", "申し込み");
    S.WA_TEXT = S.tx("Halo kak saya mau bertanya perihal LPK HANA", "こんにちは。LPK HANAについて質問があります。");
    S.WA_HREF = "https://wa.me/6285795838179?text=" + encodeURIComponent(S.WA_TEXT);
    var was = document.querySelectorAll(".hana-float-wa, a[data-hana-wa='1']");
    for (var i = 0; i < was.length; i++) {
      if (was[i].getAttribute("href") !== S.WA_HREF) was[i].setAttribute("href", S.WA_HREF);
    }
    document.documentElement.lang = S.lang === "ja" ? "ja" : "id";
    var floats = document.querySelectorAll(".hana-float-daftar");
    for (var f = 0; f < floats.length; f++) {
      if (floats[f].textContent !== S.FLOAT_DAFTAR_LABEL) floats[f].textContent = S.FLOAT_DAFTAR_LABEL;
    }
    var heroBtns = document.querySelectorAll(".hana-daftar");
    for (var b = 0; b < heroBtns.length; b++) {
      if (heroBtns[b].textContent !== S.DAFTAR_LABEL) heroBtns[b].textContent = S.DAFTAR_LABEL;
    }
  };

  S.setLang = function setLang(lang) {
    S.lang = lang === "ja" ? "ja" : "id";
    try { localStorage.setItem("hana-lang", S.lang); } catch (err) {}
    var drop = document.querySelectorAll(".hana-contact, .hana-info, .hana-flows, .hana-facility-grid, .hana-menu");
    for (var i = 0; i < drop.length; i++) drop[i].remove();
    S.applyLabels();
    S.apply();
  };

  S.setTextOnce = function setTextOnce(el, text) {
    if (!el || el.textContent === text) return;
    el.textContent = text;
  }

  S.isProgramPage = function isProgramPage() {
    return (location.pathname || "").replace(/\/+$/, "") === "/program";
  }

  S.isHomePage = function isHomePage() {
    var path = (location.pathname || "").replace(/\/+$/, "") || "/";
    return path === "/";
  }

  S.isContactPage = function isContactPage() {
    return (location.pathname || "").replace(/\/+$/, "") === "/contact";
  }

  S.pageTitle = function pageTitle() {
    var next = S.isHomePage() ? "LPK HANAKARYA" : (S.isProgramPage() ? S.tx("Program | LPK HANAKARYA", "プログラム | LPK HANAKARYA") : (S.isContactPage() ? S.tx("Contact Us | LPK HANAKARYA", "お問い合わせ | LPK HANAKARYA") : ""));
    if (next && document.title !== next) document.title = next;
  }
}
