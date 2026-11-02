/* Homepage copy: company, gallery, program list, news, facilities, and flows. */
export function install(S) {
  S.companySection = function companySection() {
    var LABEL = "( LPK HANAKARYA )";
    var HEAD_ID = "Bersama Meraih Masa Depan di Jepang,";
    var HEAD_JA = "一緒に、日本での未来をつかもう。";
    var HEAD = S.tx(HEAD_ID, HEAD_JA);
    var P1 = S.tx(
      "Sebagai lembaga pelatihan bahasa dan persiapan kerja nomor 1 dan terbaik di Bandung, kami hadir dengan misi mewujudkan impian Anda.",
      "バンドンで一番の日本語・就職準備の訓練機関として、あなたの夢の実現をお手伝いします。"
    );
    var P2 = S.tx(
      "Kami menyadari bahwa melangkah ke dunia kerja internasional membutuhkan lebih dari sekadar keberanian. Oleh karena itu, kami merancang layanan yang komprehensif—mulai dari pelatihan bahasa Jepang, pembinaan karakter dan kedisiplinan, pemberkasan, hingga pendampingan penuh untuk keberangkatan magang dan karier di Jepang.",
      "海外で働くには、勇気だけでは足りません。日本語の訓練、規律と人格の育成、書類手続き、そして実習や就職のための出発まで、一貫して支えます。"
    );
    var P3 = S.tx(
      "Dengan semangat \"Dari Indonesia Untuk Masa Depan yang Lebih Baik\", kami berkomitmen untuk tidak sekadar menjadi tempat belajar, melainkan jembatan menuju peluang karier yang lebih luas. Mari belajar, bertumbuh, dan meraih masa depan yang gemilang bersama kami.",
      "「インドネシアから、より良い未来へ」。学ぶ場所であるだけでなく、広いキャリアへの橋になります。一緒に学び、成長し、未来をつかみましょう。"
    );
    var groups = [
      {
        text: P1,
        keys: ["ミッション実現を目指し、", "オールジャンル動画講座サービス『ミルーム』を提供しています。"]
      },
      {
        text: P2,
        keys: [
          "ミルームは、AIが人間の活動を少しずつ置き換え、",
          "再定義していく時代において、",
          "人々が自分の身体や感覚を使い、",
          "日常の中で何かに没頭する時間をつくるためのプロダクトです。"
        ]
      },
      {
        text: P3,
        keys: [
          "特定のジャンルに閉じることなく、肩肘張った学びでもなく、",
          "あらゆる領域でリアルのためのデジタルを追求することで、",
          "一人ひとりの「自分の時間」を豊かにしていきます。"
        ]
      }
    ];

    var scopes = document.querySelectorAll('[data-framer-name="company"]');
    if (!scopes.length) scopes = document.querySelectorAll(".framer-13h9rym");

    for (var s = 0; s < scopes.length; s++) {
      var scope = scopes[s];

      var labelHosts = scope.querySelectorAll('[data-framer-name="( company )"]');
      for (var l = 0; l < labelHosts.length; l++) {
        var labelText = labelHosts[l].querySelector("p, span") || labelHosts[l];
        S.setTextOnce(labelText, LABEL);
        labelText.classList.add("hana-company-label");
      }

      var headHosts = scope.querySelectorAll(".framer-t0s11p");
      var headDone = false;
      for (var h = 0; h < headHosts.length; h++) {
        var lines = headHosts[h].querySelectorAll("p");
        for (var hi = 0; hi < lines.length; hi++) {
          var ht = (lines[hi].textContent || "").trim();
          if (!headDone && (ht === "リアルのためのデジタルを追求し、" || ht === HEAD_ID || ht === HEAD_JA || lines[hi].classList.contains("hana-company-head"))) {
            S.setTextOnce(lines[hi], HEAD);
            lines[hi].classList.add("hana-company-head");
            headDone = true;
          } else if (headDone) {
            if (lines[hi].style.display !== "none") lines[hi].style.display = "none";
          }
        }
      }

      var bodies = scope.querySelectorAll(".framer-15c9k3j");
      for (var b = 0; b < bodies.length; b++) {
        var list = [];
        for (var di = 0; di < bodies[b].children.length; di++) {
          if (bodies[b].children[di].tagName === "P") list.push(bodies[b].children[di]);
        }
        if (!list.length) continue;

        function lineHas(text, key) {
          if (!text || !key) return false;
          if (text.indexOf(key) >= 0) return true;
          return text.length > 12 && key.indexOf(text) === 0;
        }

        for (var g = 0; g < groups.length; g++) {
          var keys = groups[g].keys;
          var start = -1;
          for (var li = 0; li < list.length; li++) {
            if (list[li].classList.contains("hana-company-copy") && list[li].dataset.hanaCopy === String(g)) {
              start = li;
              break;
            }
          }
          if (start < 0) {
            for (var lj = 0; lj < list.length; lj++) {
              if (list[lj].classList.contains("hana-company-copy")) continue;
              var probe = (list[lj].textContent || "").trim();
              if (lineHas(probe, keys[0])) {
                start = lj;
                break;
              }
            }
          }
          if (start < 0) continue;
          S.setTextOnce(list[start], groups[g].text);
          list[start].classList.add("hana-company-copy");
          list[start].dataset.hanaCopy = String(g);
          if (list[start].style.display === "none") list[start].style.display = "";
          for (var k = 0; k < keys.length; k++) {
            for (var lk = 0; lk < list.length; lk++) {
              if (lk === start || list[lk].classList.contains("hana-company-copy")) continue;
              var rest = (list[lk].textContent || "").trim();
              if (lineHas(rest, keys[k]) && list[lk].style.display !== "none") {
                list[lk].style.display = "none";
              }
            }
          }
        }

        for (var z = 0; z < list.length; z++) {
          if (list[z].classList.contains("hana-company-copy")) continue;
          if (!(list[z].textContent || "").trim() && list[z].style.display !== "none") {
            list[z].style.display = "none";
          }
        }
      }

      var MAPS = "https://maps.app.goo.gl/RE3WatdxG3f6hNwY8";
      var locLinks = scope.querySelectorAll("a");
      for (var a = 0; a < locLinks.length; a++) {
        var link = locLinks[a];
        var label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        if (label !== "learn more" && label !== "checkout location" && label !== "地図を見る") continue;
        if (link.getAttribute("href") !== MAPS) link.setAttribute("href", MAPS);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        var locText = link.querySelector("p, span");
        if (locText) S.setTextOnce(locText, S.tx("Checkout Location", "地図を見る"));
        if (!link.dataset.hanaMaps) {
          link.dataset.hanaMaps = "1";
          link.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            window.open(MAPS, "_blank", "noopener,noreferrer");
          }, true);
        }
      }
    }
  }

  S.paintPref = function paintPref() {
    if (S.paintingPref) return;
    var rotSpans = document.querySelectorAll(".framer-2ywmmu-container span");
    if (!rotSpans.length) return;
    S.paintingPref = true;
    for (var r = 0; r < rotSpans.length; r++) {
      var raw = (rotSpans[r].textContent || "").trim();
      if (!raw || S.PREF_SET[raw]) continue;
      var shown;
      if (raw !== S.lastPrefRaw) {
        shown = S.PREFS[S.prefCursor];
        S.lastPrefRaw = raw;
        S.prefCursor = (S.prefCursor + 1) % S.PREFS.length;
      } else {
        shown = S.PREFS[(S.prefCursor + S.PREFS.length - 1) % S.PREFS.length];
      }
      S.setTextOnce(rotSpans[r], shown);
    }
    S.paintingPref = false;
  }

  S.bindPref = function bindPref() {
    var box = document.querySelector(".framer-2ywmmu-container");
    if (!box || box.dataset.hanaPref) return;
    box.dataset.hanaPref = "1";
    new MutationObserver(function () { S.paintPref(); }).observe(box, {
      subtree: true,
      childList: true,
      characterData: true
    });
  }

  S.galleryBand = function galleryBand() {
    var TITLE = "Galery HANAKARYA";
    var COPY = S.tx("Potret siswa LPK Hana Karya yang telah melangkah ke berbagai prefektur di Jepang.", "日本の各地へ歩み出した、LPK Hana Karyaの生徒たちの姿です。");
    var SPREAD = S.tx("Siswa kami tersebar luas", "生徒は日本各地で活躍しています");

    var expHosts = document.querySelectorAll('[data-framer-name="3,000+ experiences"]');
    for (var e = 0; e < expHosts.length; e++) {
      var expText = expHosts[e].querySelector("span") || expHosts[e].querySelector("p");
      if (!expText) continue;
      S.setTextOnce(expText, TITLE);
      expText.classList.add("hana-gallery-title");
    }

    var copyHosts = document.querySelectorAll(".framer-19ko5lp");
    for (var ch = 0; ch < copyHosts.length; ch++) {
      var copyHost = copyHosts[ch];
      var lines = [];
      for (var c = 0; c < copyHost.children.length; c++) {
        if (copyHost.children[c].tagName === "P") lines.push(copyHost.children[c]);
      }
      if (!lines.length) continue;
      S.setTextOnce(lines[0], COPY);
      lines[0].classList.add("hana-gallery-copy");
      if (lines[0].style.display === "none") lines[0].style.display = "";
      for (var n = 1; n < lines.length; n++) {
        if (lines[n].style.display !== "none") lines[n].style.display = "none";
      }
    }

    var spreadHosts = document.querySelectorAll('[data-framer-name="my time for"]');
    for (var sh = 0; sh < spreadHosts.length; sh++) {
      var spread = spreadHosts[sh].querySelector("span") || spreadHosts[sh].querySelector("p");
      if (!spread) continue;
      S.setTextOnce(spread, SPREAD);
      spread.classList.add("hana-spread-label");
    }

    S.bindPref();
    S.paintPref();
    S.photoGallery();
  }

  S.GALLERY_SLOTS = {
    "Cooking & Baking": { src: "/brand/gallery/01.webp", caption: "Di bandara", ja: "空港にて" },
    "Accessory Making": { src: "/brand/gallery/15.webp", caption: "Diskusi materi", ja: "教材の話し合い" },
    Sewing: { src: "/brand/gallery/12.webp", caption: "Di luar kelas", ja: "教室の外で" },
    "Illustration & Watercolor": { src: "/brand/gallery/09.webp", caption: "Kegiatan belajar mengajar", ja: "授業の様子" },
    "Nail Art": { src: "/brand/gallery/06.webp", caption: "Keberangkatan", ja: "出発" },
    "Flower Arrangement": { src: "/brand/gallery/10.webp", caption: "Foto bersama", ja: "集合写真" }
  };

  S.gallerySlotFor = function gallerySlotFor(text) {
    var slots = S.GALLERY_SLOTS;
    if (slots[text]) return slots[text];
    var keys = Object.keys(slots);
    for (var i = 0; i < keys.length; i++) {
      if (slots[keys[i]].caption === text || slots[keys[i]].ja === text) return slots[keys[i]];
    }
    return null;
  };

  S.paintGalleryCards = function paintGalleryCards() {
    if (S.galleryPainting) return;
    S.galleryPainting = true;
    try {
      var strips = document.querySelectorAll(".hana-photos");
      for (var i = 0; i < strips.length; i++) strips[i].remove();
      var hosts = document.querySelectorAll(".hana-photo-host");
      for (var h = 0; h < hosts.length; h++) hosts[h].classList.remove("hana-photo-host");
      var cards = document.querySelectorAll(".framer-9NJR2");
      for (var c = 0; c < cards.length; c++) {
        var card = cards[c];
        var label = card.querySelector("p");
        var text = label ? label.textContent.replace(/\s+/g, " ").trim() : "";
        var slot = S.gallerySlotFor(text);
        if (!slot) continue;
        var shown = S.tx(slot.caption, slot.ja);
        var img = card.querySelector("img");
        if (img) {
          if (img.getAttribute("src") !== slot.src) img.setAttribute("src", slot.src);
          if (img.hasAttribute("srcset")) img.removeAttribute("srcset");
          if (img.alt !== shown) img.alt = shown;
        }
        if (label && text !== shown) label.textContent = shown;
      }
    } finally {
      S.galleryPainting = false;
    }
  };

  S.watchGallery = function watchGallery() {
    if (!window.MutationObserver) return;
    var roots = document.querySelectorAll(".framer-qap69v, .framer-yufhmn");
    if (!roots.length) return;
    if (!S.galleryWatch) {
      S.galleryWatch = new MutationObserver(function () { S.paintGalleryCards(); });
    }
    for (var i = 0; i < roots.length; i++) {
      if (roots[i].dataset.hanaWatch) continue;
      roots[i].dataset.hanaWatch = "1";
      S.galleryWatch.observe(roots[i], {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true,
        attributeFilter: ["src", "srcset"]
      });
    }
  };

  S.photoGallery = function photoGallery() {
    S.paintGalleryCards();
    S.watchGallery();
  };

  S.programSection = function programSection() {
    var LABEL_ID = "( Program Kami )";
    var LABEL_JA = "( プログラム )";
    var LABEL = S.tx(LABEL_ID, LABEL_JA);
    var SUB = S.tx("Temukan jalur terbaik menuju masa depan Anda di Jepang.", "日本での未来へ、最適な道を見つけましょう。");
    var TITLE = S.tx("Gino Jisshusei | Ikusei Shuro | Tokutei Ginou | Gijinkoku | Nihongo Gakko", "技能実習 | 育成就労 | 特定技能 | 技人国 | 日本語学校");
    var copies = [
      {
        id: "LPK Hana Karya Career Center menyediakan berbagai pilihan jalur resmi untuk belajar dan bekerja di Jepang yang dapat disesuaikan dengan kualifikasi, keahlian, dan tujuan Anda.",
        ja: "LPK Hana Karyaキャリアセンターは、資格や目標に合わせて選べる、日本で学び働くための正式な道を用意しています。"
      },
      {
        id: "Mulai dari sistem pemagangan, tenaga kerja berkeahlian spesifik, visa profesional, hingga program sekolah bahasa, kami memberikan fasilitas persiapan bahasa dan pendampingan dokumen yang komprehensif.",
        ja: "実習、特定技能、専門職のビザ、日本語学校まで。日本語の準備と書類のサポートをまとめて行います。"
      },
      {
        id: "Pelajari lebih lanjut rincian setiap program untuk mengetahui persyaratan dan temukan jalur mana yang paling sesuai dengan impian karier Anda.",
        ja: "各プログラムの条件を確認し、あなたの目標に合う道を見つけてください。"
      }
    ];
    function copyText(index) { return S.tx(copies[index].id, copies[index].ja); }
    var keys = [
      "ミルームは、様々なジャンルの動画講座を定額で受講することができるサブスクリプションサービスです。",
      "多様なクリエイターによる3,000以上の講座と、材料・道具が揃った「キット」をお届けすることで、",
      "誰もが自分のペースで好きなことに没頭できる環境を提供しています。"
    ];

    var scopes = document.querySelectorAll(".framer-188gjld");
    if (!scopes.length) scopes = [document];

    for (var s = 0; s < scopes.length; s++) {
      var scope = scopes[s];
      var label = scope.querySelector(".framer-1ckxuxv p");
      if (label) {
        var lt = (label.textContent || "").trim();
        if (lt === "( Our Product )" || lt === LABEL_ID || lt === LABEL_JA || label.classList.contains("hana-program-label")) {
          S.setTextOnce(label, LABEL);
          label.classList.add("hana-program-label");
        }
      }

      var h2 = scope.querySelector(".framer-1lqo01v h2");
      if (h2) {
        if (!h2.querySelector(".hana-program-title")) {
          h2.textContent = "";
          var sub = document.createElement("span");
          sub.className = "hana-program-sub";
          sub.textContent = SUB;
          var title = document.createElement("span");
          title.className = "hana-program-title";
          title.textContent = TITLE;
          h2.appendChild(sub);
          h2.appendChild(title);
        } else {
          S.setTextOnce(h2.querySelector(".hana-program-sub"), SUB);
          S.setTextOnce(h2.querySelector(".hana-program-title"), TITLE);
        }
      }

      var body = scope.querySelector(".framer-1o1yhvw");
      if (!body) continue;
      var lines = [];
      for (var i = 0; i < body.children.length; i++) {
        if (body.children[i].tagName === "P") lines.push(body.children[i]);
      }
      for (var li = 0; li < lines.length; li++) {
        if (lines[li].dataset.hanaCopy != null && lines[li].dataset.hanaCopy !== "") {
          S.setTextOnce(lines[li], copyText(Number(lines[li].dataset.hanaCopy)));
          lines[li].classList.add("hana-program-copy");
          continue;
        }
        var text = (lines[li].textContent || "").trim();
        var hits = [];
        for (var g = 0; g < copies.length; g++) {
          if (text === copies[g].id || text === copies[g].ja || text === keys[g] || (keys[g] && text.indexOf(keys[g]) !== -1)) hits.push(g);
        }
        if (!hits.length) continue;
        S.setTextOnce(lines[li], copyText(hits[0]));
        lines[li].dataset.hanaCopy = String(hits[0]);
        lines[li].classList.add("hana-program-copy");
        if (lines[li].style.display === "none") lines[li].style.display = "";
        var anchor = lines[li];
        for (var h = 1; h < hits.length; h++) {
          var want = copyText(hits[h]);
          var next = anchor.nextElementSibling;
          if (next && next.tagName === "P" && (next.textContent || "").trim() === want) {
            next.dataset.hanaCopy = String(hits[h]);
            anchor = next;
            continue;
          }
          var extra = document.createElement("p");
          extra.className = lines[li].className;
          extra.textContent = want;
          extra.dataset.hanaCopy = String(hits[h]);
          extra.classList.add("hana-program-copy");
          anchor.insertAdjacentElement("afterend", extra);
          anchor = extra;
        }
      }
    }
  }

  S.storySection = function storySection() {
    var newsLabels = document.querySelectorAll('[data-framer-name="( news )"] p');
    for (var n = 0; n < newsLabels.length; n++) {
      var nl = (newsLabels[n].textContent || "").trim();
      if (nl === "( news )" || nl === "( Berita )" || nl === "( お知らせ )") S.setTextOnce(newsLabels[n], S.tx("( Berita )", "( お知らせ )"));
    }

    var semua = S.tx("Semua", "すべて");
    var chipProgram = S.tx("Program", "プログラム");
    var lembaga = S.tx("Lembaga", "法人");
    var chipMap = { All: semua, Semua: semua, "すべて": semua, product: chipProgram, Program: chipProgram, "プログラム": chipProgram, Corporate: lembaga, Lembaga: lembaga, "法人": lembaga };
    var chips = document.querySelectorAll(".framer-gcscc p");
    for (var c = 0; c < chips.length; c++) {
      var chip = (chips[c].textContent || "").trim();
      if (chipMap[chip]) S.setTextOnce(chips[c], chipMap[chip]);
    }

    var stories = [
      {
        from: "コーポレートサイトをリニューアルしました",
        title: "Pendaftaran pelatihan bahasa dan persiapan kerja ke Jepang dibuka di Bandung",
        ja: "日本で働くための語学・準備訓練の募集を、バンドンで開始",
        cat: "Lembaga",
        date: "2026/09/04"
      },
      {
        from: "タレントの横澤夏子さんをイメージモデルとして起用した広告が公開されました",
        title: "Lima jalur resmi dibuka, dari pemagangan hingga sekolah bahasa",
        ja: "実習から日本語学校まで、5つの正式な道を開放",
        cat: "Program",
        date: "2026/07/01"
      },
      {
        from: "講座の数が3,000を突破しました",
        title: "Asrama dan kelas siap menemani siswa sampai keberangkatan",
        ja: "寮と教室が、出発まで生徒に寄り添います",
        cat: "Program",
        date: "2025/09/26"
      }
    ];
    var cards = document.querySelectorAll("a.framer-Usk5n");
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      var titleEl = card.querySelector(".framer-1oc1i22 p");
      if (!titleEl) continue;
      var current = (titleEl.textContent || "").trim();
      var story = null;
      for (var s = 0; s < stories.length; s++) {
        if (current === stories[s].from || current === stories[s].title || current === stories[s].ja) story = stories[s];
      }
      if (!story) continue;
      S.setTextOnce(titleEl, S.tx(story.title, story.ja));
      var catEl = card.querySelector(".framer-q9h0ex p");
      if (catEl) S.setTextOnce(catEl, story.cat === "Lembaga" ? S.tx("Lembaga", "法人") : S.tx("Program", "プログラム"));
      var dates = card.querySelectorAll(".framer-1rtzz2b time, .framer-1rtzz2b p");
      for (var d = 0; d < dates.length; d++) S.setTextOnce(dates[d], story.date);
      if (card.getAttribute("href") && card.getAttribute("href").indexOf("./news/") === 0) {
        card.setAttribute("href", "#berita");
      }
      if (!card.dataset.hanaNews) {
        card.dataset.hanaNews = "1";
        card.addEventListener("click", function (event) {
          event.preventDefault();
          event.stopPropagation();
        }, true);
      }
      S.disarm(card);
    }

    var careerLabels = document.querySelectorAll('[data-framer-name="( career )"] p');
    for (var cl = 0; cl < careerLabels.length; cl++) {
      var ct = (careerLabels[cl].textContent || "").trim();
      if (ct.toLowerCase() === "( careers )" || ct === "( Karier )" || ct === "( キャリア )") S.setTextOnce(careerLabels[cl], S.tx("( Karier )", "( キャリア )"));
    }

    var ask = S.tx("Tanya langsung soal LPK.", "LPKについて、直接聞いてください。");
    var guide = S.tx("Dari pilihan jalur sampai syarat keberangkatan, tim Hana Karya siap membantu Anda memahaminya.", "どの道を選ぶか、出発の条件まで。Hana Karyaがわかりやすく案内します。");
    var chat = S.tx("Tekan Get in touch dan kirim chat. Kami balas lewat WhatsApp.", "お問い合わせを押してチャットを送ってください。WhatsAppで返信します。");
    var guideChat = S.tx("Dari pilihan jalur sampai syarat keberangkatan, tim Hana Karya siap membantu Anda memahaminya. Tekan Get in touch dan kirim chat. Kami balas lewat WhatsApp.", "どの道を選ぶか、出発の条件まで。Hana Karyaがわかりやすく案内します。お問い合わせを押してチャットを送ってください。WhatsAppで返信します。");
    var lines = {
      "Bring Your Passion.": S.tx("Siapkan Langkahmu.", "一歩を、踏み出そう。"),
      "Siapkan Langkahmu.": S.tx("Siapkan Langkahmu.", "一歩を、踏み出そう。"),
      "一歩を、踏み出そう。": S.tx("Siapkan Langkahmu.", "一歩を、踏み出そう。"),
      "Unlock Your Potential.": S.tx("Kuatkan Bahasamu.", "言葉を、鍛えよう。"),
      "Kuatkan Bahasamu.": S.tx("Kuatkan Bahasamu.", "言葉を、鍛えよう。"),
      "言葉を、鍛えよう。": S.tx("Kuatkan Bahasamu.", "言葉を、鍛えよう。"),
      "Build What’s Next With Us.": S.tx("Raih Karier di Jepang.", "日本で、キャリアを。"),
      "Raih Karier di Jepang.": S.tx("Raih Karier di Jepang.", "日本で、キャリアを。"),
      "日本で、キャリアを。": S.tx("Raih Karier di Jepang.", "日本で、キャリアを。"),
      "リアルのためのデジタルを、共につくる。": ask,
      "リアルのためのデジタルを、": ask,
      "Dari Bandung, menuju Jepang.": ask,
      "Tanya langsung soal LPK.": ask,
      "LPKについて、直接聞いてください。": ask,
      "テクノロジー、コンテンツ、ロジスティクス、マーケティングなど、あらゆる領域でプロダクトを磨き、": guide,
      "LPK Hana Karya melatih bahasa, karakter, dan kedisiplinan agar siswa siap magang, bekerja, atau sekolah di Jepang.": guide,
      "Dari pilihan jalur sampai syarat keberangkatan, tim Hana Karya siap membantu Anda memahaminya.": guide,
      "どの道を選ぶか、出発の条件まで。Hana Karyaがわかりやすく案内します。": guide,
      "テクノロジー、コンテンツ、ロジスティクス、マーケティングなど、あらゆる領域でプロダクトを磨き、未来に残る「リアルのためのデジタル」を共につくる仲間を募集しています。": guideChat,
      "Dari pilihan jalur sampai syarat keberangkatan, tim Hana Karya siap membantu Anda memahaminya. Tekan Get in touch dan kirim chat. Kami balas lewat WhatsApp.": guideChat,
      "どの道を選ぶか、出発の条件まで。Hana Karyaがわかりやすく案内します。お問い合わせを押してチャットを送ってください。WhatsAppで返信します。": guideChat,
      "未来に残る「リアルのためのデジタル」を共につくる仲間を募集しています。": chat,
      "Pengajar dan tim pendamping kami terbuka bagi yang ingin ikut menyiapkan keberangkatan itu.": chat,
      "Tekan Daftar dan kirim chat. Kami balas lewat WhatsApp.": chat,
      "Tekan Get in touch dan kirim chat. Kami balas lewat WhatsApp.": chat,
      "お問い合わせを押してチャットを送ってください。WhatsAppで返信します。": chat
    };
    var careerRoots = document.querySelectorAll(".framer-1dgx6g1");
    if (!careerRoots.length) careerRoots = [document];
    for (var r = 0; r < careerRoots.length; r++) {
      var paras = careerRoots[r].querySelectorAll("p");
      for (var p = 0; p < paras.length; p++) {
        var key = (paras[p].textContent || "").trim();
        if (key === "共につくる。") {
          paras[p].style.display = "none";
          continue;
        }
        if (lines[key]) S.setTextOnce(paras[p], lines[key]);
        else if (key.toLowerCase() === "get in touch" || key === "Daftar" || key === "お問い合わせ" || key === "申し込み") S.setTextOnce(paras[p], S.tx("Get in touch", "お問い合わせ"));
      }
      var touchLinks = careerRoots[r].querySelectorAll("a");
      for (var a = 0; a < touchLinks.length; a++) {
        var link = touchLinks[a];
        var label = (link.textContent || "").replace(/\s+/g, " ").trim().toLowerCase();
        if (label !== "daftar" && label !== "get in touch" && label !== "お問い合わせ" && label !== "申し込み") continue;
        if (link.getAttribute("href") !== S.WA_HREF) link.setAttribute("href", S.WA_HREF);
        link.setAttribute("target", "_blank");
        link.setAttribute("rel", "noopener noreferrer");
        if (!link.dataset.hanaWa) {
          link.dataset.hanaWa = "1";
          link.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();
            window.open(S.WA_HREF, "_blank", "noopener,noreferrer");
          }, true);
        }
        S.disarm(link);
      }
    }
  }

  S.fasilitasBand = function fasilitasBand() {
    var onProgram = S.isProgramPage();
    var alur = S.tx("Alur Pendaftaran", "申し込みの流れ");
    var SLOGAN = onProgram ? "program" : alur;
    var OLD = "Find Something You Love. Make Time for It.";
    var aliases = onProgram
      ? [OLD, '"' + OLD + '"', "Fasilitas", "施設", "program"]
      : [OLD, '"' + OLD + '"', "Alur Pendaftaran", "申し込みの流れ"];
    var dapur = S.tx("Dapur Standar", "キッチン");
    var bersih = S.tx("Kebersihan", "清掃");
    var kelas = S.tx("Ruang Kelas", "教室");
    var olahraga = S.tx("Area Olahraga", "運動スペース");
    var guru = S.tx("Ruang Guru", "講師室");
    var asrama = S.tx("Asrama Siswa", "生徒寮");
    var labels = onProgram ? {} : {
      Planning: dapur, "Dapur Standar": dapur, "キッチン": dapur,
      Shooting: bersih, Kebersihan: bersih, "清掃": bersih,
      Editing: kelas, "Ruang Kelas": kelas, "教室": kelas,
      Logistics: olahraga, "Area Olahraga": olahraga, "運動スペース": olahraga,
      Delivery: guru, "Ruang Guru": guru, "講師室": guru,
      Experience: asrama, "Asrama Siswa": asrama, "生徒寮": asrama
    };
    var nodes = document.querySelectorAll("p, span");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.closest && el.closest('[data-framer-name="( news )"]')) continue;
      if (el.childNodes.length !== 1 || el.childNodes[0].nodeType !== 3) continue;
      var text = (el.textContent || "").trim();
      if (aliases.indexOf(text) !== -1) {
        S.setTextOnce(el, SLOGAN);
        el.style.paddingRight = "";
        if (onProgram) el.classList.add("hana-program-word");
        else el.classList.add("hana-alur-word");
      }
      else if (labels[text]) S.setTextOnce(el, labels[text]);
    }
    var items = document.querySelectorAll(".ticker-item");
    for (var t = 0; t < items.length; t++) {
      var item = items[t];
      var raw = item.textContent || "";
      if (raw.indexOf(SLOGAN) < 0 && raw.indexOf("Find Something You Love") < 0 && raw.indexOf("Fasilitas") < 0 && raw.indexOf("Alur Pendaftaran") < 0 && raw.indexOf("申し込みの流れ") < 0 && raw.indexOf("施設") < 0) continue;
      var track = item.parentElement;
      if (!track) continue;
      track.classList.add("hana-fasilitas-track");
      track.style.setProperty("transform", "none", "important");
      var kids = track.children;
      var kept = false;
      for (var k = 0; k < kids.length; k++) {
        var kid = kids[k];
        if (!kept && !kid.classList.contains("clone-item")) {
          kept = true;
          kid.classList.add("hana-fasilitas-one");
          kid.style.removeProperty("display");
        } else {
          kid.classList.remove("hana-fasilitas-one");
          kid.style.setProperty("display", "none", "important");
        }
      }
    }
  }

  S.hanaIcon = function hanaIcon(name) {
    var nodes = S.HANA_ICONS[name];
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.75");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    svg.classList.add("hana-ico");
    if (!nodes) return svg;
    for (var i = 0; i < nodes.length; i++) {
      var el = document.createElementNS(ns, nodes[i][0]);
      var attrs = nodes[i][1];
      for (var key in attrs) el.setAttribute(key, attrs[key]);
      svg.appendChild(el);
    }
    return svg;
  }

  S.flowBlock = function flowBlock(title, steps, icons) {
    var block = document.createElement("div");
    block.className = "hana-flow";
    if (title) {
      var heading = document.createElement("h3");
      heading.className = "hana-flow-title";
      heading.textContent = title;
      block.appendChild(heading);
    }
    var list = document.createElement("ol");
    list.className = title ? "hana-flow-list" : "hana-flow-rail";
    for (var i = 0; i < steps.length; i++) {
      var item = document.createElement("li");
      item.className = "hana-step";
      item.style.setProperty("--i", String(i));
      var num = document.createElement("span");
      num.className = "hana-step-no";
      num.textContent = i < 9 ? "0" + (i + 1) : String(i + 1);
      var main = document.createElement("span");
      main.className = "hana-step-main";
      if (icons && icons[i]) main.appendChild(S.hanaIcon(icons[i]));
      var text = document.createElement("span");
      text.className = "hana-step-tx";
      text.textContent = steps[i];
      main.appendChild(text);
      item.appendChild(num);
      item.appendChild(main);
      if (!title && i < steps.length - 1) {
        var join = document.createElement("span");
        join.className = "hana-join";
        item.appendChild(join);
      }
      list.appendChild(item);
    }
    block.appendChild(list);
    return block;
  }

  S.homeFlows = function homeFlows() {
    if (!S.isHomePage()) return;
    var gone = document.querySelectorAll(".hana-flow-note");
    for (var g = 0; g < gone.length; g++) gone[g].remove();
    var service = document.querySelector('.framer-188gjld[data-framer-name="service"]');
    var staleFlow = service && service.querySelector(".hana-flows");
    if (staleFlow && !staleFlow.classList.contains("is-soft")) staleFlow.remove();
    if (service && !service.querySelector(".hana-flows")) {
      var root = document.createElement("div");
      root.className = "hana-flows is-soft";
      root.appendChild(S.flowBlock("", [
        S.tx("Klik Daftar", "申し込みを押す"),
        S.tx("Buat akun", "アカウント作成"),
        S.tx("Login", "ログイン"),
        S.tx("Isi data diri", "本人情報を入力"),
        S.tx("Tunggu dihubungi Admin", "担当者からの連絡を待つ")
      ], ["mouse-pointer-click", "user-plus", "log-in", "id-card", "headset"]));
      var pair = document.createElement("div");
      pair.className = "hana-flow-pair";
      pair.appendChild(S.flowBlock(S.tx("Alur Magang / Gino Jisshusei", "実習の流れ / 技能実習"), [
        S.tx("Pendaftaran Peserta", "参加者登録"),
        S.tx("Pendidikan Dasar Bahasa Jepang (Target kelulusan minimal tingkat JLPT N5 atau setara)", "日本語の基礎教育（JLPT N5相当以上が目標）"),
        S.tx("Pencocokan Kerja (Job Matching)", "仕事のマッチング"),
        S.tx("Pendidikan dan Pelatihan (Diklat) Pra-Pemberangkatan", "出発前の教育・訓練"),
        S.tx("Pengurusan dan Penerbitan Certificate of Eligibility (CoE)", "在留資格認定証明書（CoE）の申請と発行"),
        S.tx("Keberangkatan", "出発")
      ], ["clipboard-list", "languages", "handshake", "graduation-cap", "file-check", "plane"]));
      pair.appendChild(S.flowBlock(S.tx("Alur Tokuteiginou", "特定技能の流れ"), [
        S.tx("Pendaftaran Peserta", "参加者登録"),
        S.tx("Sertifikasi Bahasa Jepang (Target kelulusan tingkat JFT-Basic A2 atau JLPT N4)", "日本語の資格（JFT-Basic A2またはJLPT N4が目標）"),
        S.tx("Sertifikasi Keterampilan Bidang (Specified Skilled Worker / SSW)", "分野別の技能試験（特定技能）"),
        S.tx("Pencocokan Kerja (Job Matching)", "仕事のマッチング"),
        S.tx("Pengurusan dan Penerbitan Certificate of Eligibility (CoE)", "在留資格認定証明書（CoE）の申請と発行"),
        S.tx("Keberangkatan", "出発")
      ], ["clipboard-list", "languages", "badge-check", "handshake", "file-check", "plane"]));
      root.appendChild(pair);
      service.appendChild(root);
      if ("IntersectionObserver" in window) {
        var watcher = new IntersectionObserver(function (entries) {
          for (var n = 0; n < entries.length; n++) {
            if (!entries[n].isIntersecting) continue;
            entries[n].target.classList.add("is-in");
            watcher.unobserve(entries[n].target);
          }
        }, { threshold: 0.15 });
        watcher.observe(root);
      } else {
        root.classList.add("is-in");
      }
    }

    var newsLabel = document.querySelector('[data-framer-name="( news )"] p');
    if (newsLabel) S.setTextOnce(newsLabel, S.tx("Fasilitas", "施設"));
    var newsHost = document.querySelector(".framer-6m01aj-container");
    var oldGrid = newsHost && newsHost.querySelector(".hana-facility-grid");
    if (oldGrid && !oldGrid.classList.contains("is-center")) oldGrid.remove();
    if (newsHost && !newsHost.querySelector(".hana-facility-grid")) {
      var facilities = [
        [S.tx("Dapur Standar", "キッチン"), S.tx("Dapur untuk kebutuhan harian siswa selama pelatihan.", "訓練中の毎日の食事をまかなう厨房です。"), "utensils"],
        [S.tx("Kebersihan", "清掃"), S.tx("Lingkungan belajar dan asrama yang dijaga tetap bersih.", "教室と寮を、いつも清潔に保ちます。"), "sparkles"],
        [S.tx("Ruang Kelas", "教室"), S.tx("Kelas bahasa Jepang dan materi pra-keberangkatan.", "日本語の授業と、出発前の教材があります。"), "book-open"],
        [S.tx("Area Olahraga", "運動スペース"), S.tx("Ruang gerak di luar jam belajar.", "授業の外で体を動かす場所です。"), "dumbbell"],
        [S.tx("Ruang Guru", "講師室"), S.tx("Ruang pengajar dan pendamping.", "講師とサポート担当の部屋です。"), "presentation"],
        [S.tx("Asrama Siswa", "生徒寮"), S.tx("Tempat tinggal siswa selama masa pelatihan.", "訓練期間中、生徒が暮らす場所です。"), "bed"]
      ];
      var grid = document.createElement("div");
      grid.className = "hana-facility-grid is-soft is-center";
      for (var f = 0; f < facilities.length; f++) {
        var card = document.createElement("article");
        card.className = "hana-fac";
        var body = document.createElement("div");
        body.className = "hana-fac-body";
        var head = document.createElement("div");
        head.className = "hana-fac-head";
        head.appendChild(S.hanaIcon(facilities[f][2]));
        var name = document.createElement("strong");
        name.textContent = facilities[f][0];
        var copy = document.createElement("p");
        copy.textContent = facilities[f][1];
        head.appendChild(name);
        body.appendChild(head);
        body.appendChild(copy);
        card.style.setProperty("--i", String(f));
        card.appendChild(body);
        grid.appendChild(card);
      }
      newsHost.appendChild(grid);
    }
    var rows = newsHost && newsHost.querySelector(".hana-facility-grid");
    if (rows) {
      S.armRows(rows);
      S.centerFacilities(rows);
    }
  }

  S.centerFacilities = function centerFacilities(grid) {
    grid.style.width = "";
    grid.style.marginLeft = "auto";
    grid.style.marginRight = "auto";
  }

  S.armRows = function armRows(grid) {
    var cards = grid.querySelectorAll(".hana-fac");
    for (var i = 0; i < cards.length; i++) cards[i].style.setProperty("--i", String(i));
    if (!grid.dataset.armed) {
      grid.dataset.armed = "1";
      var step = 0;
      window.setInterval(function () {
        if (grid.matches(":hover")) return;
        for (var n = 0; n < cards.length; n++) cards[n].classList.toggle("is-on", n === step);
        step = (step + 1) % cards.length;
      }, 1700);
    }
    if (grid.dataset.seen) return;
    grid.dataset.seen = "1";
    if (!("IntersectionObserver" in window)) {
      grid.classList.add("is-in");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      grid.classList.add("is-in");
      io.disconnect();
    }, { threshold: 0.2 });
    io.observe(grid);
  }
}
