/* Wires the sections together and keeps Framer updates from redoing finished work. */
import { S } from "./state.js";
import { install as installRoutes } from "./routes.js";
import { install as installChrome } from "./chrome.js";
import { install as installHero } from "./hero.js";
import { install as installHome } from "./home.js";
import { install as installProgram } from "./program.js";

installRoutes(S);
installChrome(S);
installHero(S);
installHome(S);
installProgram(S);

export function install(S) {
  S.apply = function apply() {
    if (S.busy || S.applying) return;
    S.busy = true;
    S.applying = true;
    try {
      S.prepareRoute();
      S.applyLabels();
      document.documentElement.classList.toggle("hana-home-page", S.isHomePage());
      S.header();
      S.pageTitle();
      S.title();
      S.stripTickerKickers();
      S.subtitle();
      S.subtitleLoose();
      if (S.isHomePage()) {
        S.companySection();
        S.programSection();
        S.galleryBand();
        S.homeFlows();
      }
      S.storySection();
      if (S.isHomePage() || S.isProgramPage()) S.fasilitasBand();
      S.programPage();
      S.word();
      S.cleanHeroLogo();
      S.language();
      S.chromeLabels();
      S.placeDaftar();
      S.footerBrand();
      var facGrid = document.querySelector(".hana-facility-grid");
      if (facGrid && S.isHomePage()) S.centerFacilities(facGrid);
      S.programNav();
      S.hideEmptyNav();
      S.contactPage();
      S.scatter();
    } finally {
      S.applying = false;
      S.busy = false;
    }
  }

  S.scheduleApply = function scheduleApply() {
    if (S.applying) return;
    if (S.applyTimer) window.clearTimeout(S.applyTimer);
    S.applyTimer = window.setTimeout(function () {
      S.applyTimer = 0;
      S.apply();
    }, 80);
  }
}

install(S);

  S.apply();
  S.revealTick();
  S.guardDeadLinks();
  S.pageTitle();
  var titleNode = document.querySelector("title");
  if (titleNode && window.MutationObserver) {
    new MutationObserver(function () { S.pageTitle(); }).observe(titleNode, { childList: true, characterData: true, subtree: true });
  }
  new MutationObserver(function (muts) {
    if (S.applying) return;
    for (var i = 0; i < muts.length; i++) {
      var mut = muts[i];
      var node = mut.target;
      if (node && node.closest && node.closest(".framer-2ywmmu-container")) continue;
      var nodes = [node];
      if (mut.addedNodes) for (var a = 0; a < mut.addedNodes.length; a++) nodes.push(mut.addedNodes[a]);
      if (mut.removedNodes) for (var r = 0; r < mut.removedNodes.length; r++) nodes.push(mut.removedNodes[r]);
      var outside = false;
      for (var n = 0; n < nodes.length; n++) {
        var el = nodes[n] && nodes[n].nodeType === 1 ? nodes[n] : (nodes[n] && nodes[n].parentElement);
        if (!el || !el.closest) continue;
        if (el.closest("a.framer-Usk5n, a.framer-VQAlz, .framer-gcscc, .framer-uu7Sn, .framer-1dgx6g1, .framer-2ywmmu-container, .framer-GFbLs, .hana-rings, .hana-wordmark, .hana-type, .hana-contact, .hana-float, .hana-info, .hana-facility-grid, .hana-flows, .hana-flow, .hana-arc, .hana-orbit, .hana-row, .hana-menu, .hana-photos")) continue;
        outside = true;
        break;
      }
      if (!outside) continue;
      S.scheduleApply();
      return;
    }
  }).observe(document.documentElement, { childList: true, subtree: true });
  window.setInterval(S.galleryBand, 450);
  window.addEventListener("resize", function () {
    S.title();
    S.ensureFlag();
    S.fitOpenMenu();
    S.fitHeroWords(true);
    S.placeDaftar();
    S.scatter();
    var arcs = document.querySelectorAll(".hana-arc-stage");
    for (var i = 0; i < arcs.length; i++) S.placeArc(arcs[i]);
  });
  var scrollFrame = 0;
  window.addEventListener("scroll", function () {
    if (scrollFrame) return;
    scrollFrame = window.requestAnimationFrame(function () {
      scrollFrame = 0;
      S.ensureFlag();
      S.placeDaftar();
      S.scatter();
      if (document.documentElement.classList.contains("hana-program-page")) S.tickArcs();
    });
  }, { passive: true });
  document.addEventListener("click", function (event) {
    var target = event.target;
    if (target && target.closest && target.closest(".framer-buevnb-container, .framer-lkyr3c")) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!(target && target.closest && target.closest(".hana-menu, .framer-GFbLs")) && !S.menuIsOpen()) {
      document.documentElement.classList.remove("hana-menu-force-shut");
    }
    if (target && target.closest && target.closest(".hana-flag")) return;
    if (!(target && target.closest && target.closest(".framer-GFbLs"))) return;
    S.ensureSiteMenu();
    window.requestAnimationFrame(function () { S.fitOpenMenu(); });
    window.setTimeout(S.fitOpenMenu, 40);
  }, true);
  window.addEventListener("pointerdown", function (event) {
    if (!document.documentElement.classList.contains("hana-menu-force-shut") || !S.menuIsOpen()) return;
    var target = event.target;
    if (!(target && target.closest && target.closest(".framer-GFbLs"))) return;
    if (target.closest(".hana-menu")) return;
    event.preventDefault();
    event.stopPropagation();
    document.documentElement.classList.remove("hana-menu-force-shut");
    S.fitOpenMenu();
  }, true);
  document.addEventListener("click", function (event) {
    if (event.defaultPrevented || event.button) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    var link = event.target && event.target.closest ? event.target.closest("a[href]") : null;
    if (!link || link.target === "_blank") return;
    var href = link.getAttribute("href") || "";
    if (!S.localPage(href)) return;
    event.preventDefault();
    event.stopPropagation();
    S.visit(href);
  }, true);
  window.addEventListener("popstate", function () {
    S.wantContact = false;
    S.scheduleApply();
  });
  window.addEventListener("load", function () { S.apply(); S.revealTick(); });
  window.setTimeout(S.apply, 600);
  window.setTimeout(S.apply, 1600);
  var revealPoll = window.setInterval(function () {
    if (document.getElementById("hana-loader")) return;
    window.clearInterval(revealPoll);
    S.revealTick();
  }, 300);

