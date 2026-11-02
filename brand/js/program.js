/* Program page diagram, orbit, and copy. */
export function install(S) {
  S.flatText = function flatText(el) {
    return (el.textContent || "").replace(/\s+/g, "");
  }

  S.fillLines = function fillLines(root, keys, text, slot) {
    if (slot) {
      var marked = root.querySelector('[data-hana-fill="' + slot + '"]');
      if (marked) {
        S.setTextOnce(marked, text);
        return;
      }
    }
    var ps = root.querySelectorAll("p");
    var key0 = keys[0].replace(/\s+/g, "");
    var start = -1;
    for (var i = 0; i < ps.length; i++) {
      var n = S.flatText(ps[i]);
      if (n && (n.indexOf(key0) === 0 || key0.indexOf(n) === 0)) {
        start = i;
        break;
      }
    }
    if (start < 0) return;
    S.setTextOnce(ps[start], text);
    if (slot) ps[start].dataset.hanaFill = slot;
    ps[start].classList.remove("hana-program-hide");
    for (var k = 1; k < keys.length; k++) {
      if (ps[start + k]) ps[start + k].classList.add("hana-program-hide");
    }
  }

  S.paintHeroMark = function paintHeroMark(h3) {
    var lead = S.tx("Berbagai Pilihan Program di 『", "選べるプログラム『");
    if (h3.querySelector(".hana-program-link")) {
      if (h3.firstChild && h3.firstChild.nodeType === 3) h3.firstChild.nodeValue = lead;
      return;
    }
    h3.textContent = "";
    h3.appendChild(document.createTextNode(lead));
    var mark = document.createElement("span");
    mark.className = "hana-program-link";
    mark.textContent = "LPK Hana Karya";
    h3.appendChild(mark);
    h3.appendChild(document.createTextNode("』"));
  }

  S.programOrbit = function programOrbit(host, active) {
    host.classList.add("hana-orbit-host");
    var names = ["Gino\nJisshusei", "Ikusei\nShuro", "Tokutei\nGinou", "Gijinkoku", "Nihongo\nGakko"];
    var orbit = host.querySelector(".hana-orbit");
    if (!orbit) {
      orbit = document.createElement("div");
      orbit.className = "hana-orbit";
      var ring = document.createElement("div");
      ring.className = "hana-orbit-ring";
      var center = document.createElement("div");
      center.className = "hana-orbit-center";
      center.textContent = "Program";
      orbit.appendChild(ring);
      orbit.appendChild(center);
      for (var i = 0; i < names.length; i++) {
        var item = document.createElement("div");
        item.className = "hana-orbit-item";
        item.style.setProperty("--a", (i * 72) + "deg");
        item.textContent = names[i];
        orbit.appendChild(item);
      }
      host.appendChild(orbit);
    }
    var items = orbit.querySelectorAll(".hana-orbit-item");
    for (var n = 0; n < items.length; n++) items[n].classList.toggle("is-on", n === active);
  }

  S.svgEl = function svgEl(name) {
    return document.createElementNS("http://www.w3.org/2000/svg", name);
  }

  S.arcEase = function arcEase(x) {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    var t = Math.cbrt(x);
    return 3 * (1 - t) * t * t + t * t * t;
  }

  S.placeArc = function placeArc(host) {
    var rect = host.getBoundingClientRect();
    var span = rect.height;
    if (span < 40) return;
    var progress = (0 - rect.top) / span;
    if (progress < 0) progress = 0;
    if (progress > 1) progress = 1;
    var frame = progress * 131;
    var groups = host.querySelectorAll(".hana-arc-g");
    for (var i = 0; i < groups.length; i++) {
      var local = (frame - i * 12) / 72;
      if (local < 0) local = 0;
      if (local > 1) local = 1;
      var y = 528 + (28 - 528) * S.arcEase(local);
      groups[i].setAttribute("transform", "translate(" + S.ARC_X[i] + " " + y.toFixed(2) + ")");
    }
  }

  S.tickArcs = function tickArcs() {
    var hosts = document.querySelectorAll(".hana-arc-stage");
    for (var i = 0; i < hosts.length; i++) S.placeArc(hosts[i]);
  }

  S.ensureArcTick = function ensureArcTick() {
    if (S.arcTicking) return;
    S.arcTicking = true;
    var loop = function () {
      if (!document.documentElement.classList.contains("hana-program-page")) {
        S.arcTicking = false;
        return;
      }
      S.tickArcs();
      window.requestAnimationFrame(loop);
    };
    window.requestAnimationFrame(loop);
  }

  S.programArc = function programArc(host) {
    var canvas = host.querySelector("canvas");
    var box = canvas && canvas.parentElement ? canvas.parentElement : null;
    if (!box) return;
    host.classList.add("hana-arc-host");
    box.classList.add("hana-arc-stage");
    if (!box.querySelector(".hana-arc")) {
      if (!box.dataset.arcId) box.dataset.arcId = "hana-dash-" + Math.round(Math.random() * 1e9);
      var rid = box.dataset.arcId;
      var svg = S.svgEl("svg");
      svg.setAttribute("class", "hana-arc");
      svg.setAttribute("viewBox", "0 0 1046 1117");
      svg.setAttribute("preserveAspectRatio", "none");
      var defs = S.svgEl("defs");
      var ring = S.svgEl("path");
      ring.setAttribute("id", rid);
      ring.setAttribute("d", S.ARC_DASH);
      defs.appendChild(ring);
      svg.appendChild(defs);
      for (var i = 0; i < S.ARC_NAMES.length; i++) {
        var g = S.svgEl("g");
        g.setAttribute("class", "hana-arc-g");
        var use = S.svgEl("use");
        use.setAttribute("href", "#" + rid);
        g.appendChild(use);
        var num = S.svgEl("text");
        num.setAttribute("class", "hana-arc-num");
        num.setAttribute("x", "30");
        num.setAttribute("y", "266");
        num.setAttribute("font-size", "14");
        num.textContent = S.ARC_NAMES[i][0];
        var name = S.svgEl("text");
        name.setAttribute("class", "hana-arc-name");
        name.setAttribute("x", "30");
        name.setAttribute("y", "298");
        name.setAttribute("font-size", "22");
        var line = S.svgEl("tspan");
        line.setAttribute("x", "30");
        line.textContent = S.ARC_NAMES[i][1];
        name.appendChild(line);
        if (S.ARC_NAMES[i][2]) {
          var line2 = S.svgEl("tspan");
          line2.setAttribute("x", "30");
          line2.setAttribute("dy", "26");
          line2.textContent = S.ARC_NAMES[i][2];
          name.appendChild(line2);
        }
        g.appendChild(num);
        g.appendChild(name);
        svg.appendChild(g);
      }
      box.appendChild(svg);
    }
    S.placeArc(box);
    S.ensureArcTick();
  }

  S.programRow = function programRow(host) {
    host.classList.add("hana-row-host");
    if (host.querySelector(".hana-row")) return;
    var names = ["Gino\nJisshusei", "Ikusei\nShuro", "Tokutei\nGinou", "Gijinkoku", "Nihongo\nGakko"];
    var row = document.createElement("div");
    row.className = "hana-row";
    for (var i = 0; i < names.length; i++) {
      var item = document.createElement("div");
      item.className = "hana-row-item";
      item.style.setProperty("--i", String(i));
      var num = document.createElement("small");
      num.textContent = "0" + (i + 1);
      var name = document.createElement("strong");
      name.textContent = names[i];
      item.appendChild(num);
      item.appendChild(name);
      row.appendChild(item);
    }
    host.appendChild(row);
  }

  S.programPage = function programPage() {
    document.documentElement.classList.toggle("hana-program-page", S.isProgramPage());
    if (!S.isProgramPage()) return;

    var nodes = document.querySelectorAll("h1, h2, h3, p, span");
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i];
      if (el.children.length) continue;
      var raw = S.flatText(el);
      if (el.dataset.hanaSlot === "slogan" || raw === "好きなことから、役立つことまで。" || raw === "TemukanjalurterbaikmenujumasadepanAnda." || raw === "あなたに合う、日本への道を見つけましょう。") {
        el.dataset.hanaSlot = "slogan";
        S.setTextOnce(el, S.tx("Temukan jalur terbaik menuju masa depan Anda.", "あなたに合う、日本への道を見つけましょう。"));
      } else if (el.dataset.hanaSlot === "body1" || raw === "ミルームは、様々なジャンルの動画講座を定額で受講することができるサブスクリプションサービスです。" || raw.indexOf("LPKHanaKaryaCareerCenter") === 0 || raw.indexOf("LPKHanaKaryaキャリアセンター") === 0) {
        el.dataset.hanaSlot = "body1";
        S.setTextOnce(el, S.tx("LPK Hana Karya Career Center menyediakan berbagai pilihan jalur resmi untuk belajar dan bekerja di Jepang yang dapat disesuaikan dengan kualifikasi, keahlian, dan tujuan Anda.", "LPK Hana Karyaキャリアセンターは、資格や目標に合わせて選べる、日本で学び働くための正式な道を用意しています。"));
      } else if (el.dataset.hanaSlot === "body2" || raw.indexOf("多様なクリエイターによる3,000以上の講座と") === 0 || raw.indexOf("MulaidariprogramGinoJisshusei") === 0 || raw.indexOf("技能実習、育成就労") === 0) {
        el.dataset.hanaSlot = "body2";
        S.setTextOnce(el, S.tx("Mulai dari program Gino Jisshusei, Ikusei Shuro, Tokutei Ginou, Gijinkoku, hingga Nihongo Gakko, kami memberikan fasilitas persiapan bahasa Jepang dan pendampingan dokumen secara komprehensif agar Anda siap melangkah ke dunia kerja internasional.", "技能実習、育成就労、特定技能、技術・人文知識・国際業務、日本語学校まで。日本語の準備と書類のサポートをまとめ、海外で働く準備を整えます。"));
      } else if (raw === "プロダクト") S.setTextOnce(el, "プログラム");
    }

    var titles = document.querySelectorAll("h3");
    for (var h = 0; h < titles.length; h++) {
      var title = titles[h];
      var compact = S.flatText(title);
      if (compact.indexOf("オールジャンル動画講座サービス") === 0 || compact.indexOf("BerbagaiPilihanProgramdi") === 0 || compact.indexOf("選べるプログラム") === 0 || title.querySelector(".hana-program-link")) S.paintHeroMark(title);
    }

    var infos = document.querySelectorAll('[data-framer-name="info"]');
    for (var s = 0; s < infos.length; s++) {
      var info = infos[s];
      var labels = info.querySelectorAll("p");
      for (var l = 0; l < labels.length; l++) {
        var labelFlat = S.flatText(labels[l]);
        if (labels[l].dataset.hanaSlot === "plabel" || labelFlat === "(Strength)" || labelFlat === "(ProgramKami)" || labelFlat === "(プログラム)") {
          labels[l].dataset.hanaSlot = "plabel";
          S.setTextOnce(labels[l], S.tx("( Program Kami )", "( プログラム )"));
        }
      }
      var heads = info.querySelectorAll("h2");
      for (var hd = 0; hd < heads.length; hd++) {
        var headFlat = S.flatText(heads[hd]);
        if (heads[hd].dataset.hanaSlot === "phead" || headFlat.indexOf("オールジャンル×完全内製の体制で") === 0 || headFlat.indexOf("5JalurResmiMenujuKarier") === 0 || headFlat.indexOf("日本でのキャリアと学びへ") === 0) {
          heads[hd].dataset.hanaSlot = "phead";
          S.setTextOnce(heads[hd], S.tx("5 Jalur Resmi Menuju Karier dan Pendidikan Impian Anda di Jepang", "日本でのキャリアと学びへ。5つの正式な道。"));
        }
      }
      S.fillLines(info, ["特定ジャンルに限定しないことで、人々が自分でも想像していなかった", "コンテンツに出会える場を提供しています。"], S.tx("Kami tidak membatasi impian Anda pada satu jalan saja. LPK Hana Karya menawarkan berbagai opsi program yang dirancang khusus untuk memenuhi kualifikasi dan tujuan masa depan Anda di Jepang.", "夢を一つの道に限りません。LPK Hana Karyaは、資格と目標に合わせて選べるプログラムを用意しています。"), "opt");
      S.fillLines(info, ["企画・撮影・編集、キットの制作・配送、マーケティング、", "そしてアプリ・Webなどのプロダクト開発まで、", "サービスに関わるすべてを自社で内製化。"], S.tx("Mulai dari sistem pemagangan, tenaga kerja dengan keahlian spesifik, visa profesional, hingga program sekolah bahasa. Semuanya didukung dengan pelatihan bahasa Jepang dan pembinaan kedisiplinan yang terpadu.", "実習、特定技能、専門職のビザ、日本語学校まで。日本語の訓練と規律の指導をまとめて支えます。"), "paths");
      S.fillLines(info, ["クリエイターが創作に集中できる環境の構築から、ユーザー体験の継続的な改善まで、", "バリューチェーン全体を自分たちの手でコントロールできることが最大の強みです。"], S.tx("Dari proses awal pendaftaran, pelatihan, pemberkasan, hingga pemberangkatan, kami memastikan setiap kandidat mendapatkan pendampingan penuh agar siap melangkah dengan percaya diri.", "登録、訓練、書類、出発まで。一人ひとりが自信を持って踏み出せるよう、最後まで伴走します。"), "escort");
    }

    var steps = [
      {
        label: "Gino Jisshusei",
        title: S.tx("Program Pemagangan Teknik untuk Keterampilan Masa Depan", "将来の技能を身につける、技術実習プログラム"),
        body: S.tx("Gino Jisshusei adalah program pemagangan resmi dari pemerintah Jepang yang memungkinkan Anda belajar dan bekerja sambil menguasai keterampilan teknis langsung dari industri Jepang. Kami memberikan pelatihan bahasa dan fisik agar Anda siap menjalani masa magang dengan disiplin dan etos kerja yang tinggi.", "技能実習は、日本政府の正式な実習制度です。現場で技術を学びながら働けます。言語と体力の訓練で、規律ある実習に備えます。")
      },
      {
        label: "Ikusei Shuro",
        title: S.tx("Jalur Pelatihan Kerja Generasi Baru Menuju Karier Profesional", "専門的なキャリアへ進む、新しい就労訓練"),
        body: S.tx("Ikusei Shuro merupakan sistem baru yang dirancang dengan fokus yang lebih kuat pada perlindungan pekerja dan pengembangan karier jangka panjang. LPK Hana Karya siap mendampingi Anda beradaptasi dengan regulasi terbaru ini untuk mencapai keahlian spesifik.", "育成就労は、労働者の保護と長期的なキャリアを重視した新しい制度です。最新のルールに沿って、専門技能まで伴走します。")
      },
      {
        label: "Tokutei Ginou",
        title: S.tx("Peluang Kerja Menjanjikan bagi Tenaga Kerja Berkeahlian Spesifik", "特定の技能を持つ人のための、確かな仕事の機会"),
        body: S.tx("Bagi Anda yang memiliki keahlian khusus dan kemampuan bahasa Jepang, program Tokutei Ginou membuka jalan untuk bekerja secara profesional di berbagai sektor industri Jepang. Kami menyediakan kelas persiapan ujian SSW dan JFT-Basic untuk memastikan kelulusan Anda.", "専門技能と日本語がある人に、特定技能は日本のさまざまな産業で働く道を開きます。特定技能とJFT-Basicの受験対策で、合格まで支えます。")
      },
      {
        label: "Gijinkoku",
        title: S.tx("Kembangkan Karier Global sebagai Tenaga Profesional di Jepang", "日本で専門職として、キャリアを広げる"),
        body: S.tx("Program ini ditujukan bagi lulusan Diploma atau Sarjana yang ingin bekerja di Jepang sesuai dengan latar belakang akademis mereka, seperti IT, teknik, atau bisnis. Kami membantu proses pencocokan dengan perusahaan Jepang serta pendampingan pemberkasan visa kerja profesional.", "専門学校や大学を卒業し、IT、工学、ビジネスなど学んだ分野で日本で働きたい人のためのプログラムです。企業とのマッチングと、就労ビザの書類を支援します。")
      },
      {
        label: "Nihongo Gakko",
        title: S.tx("Langkah Awal Menguasai Bahasa dan Budaya Langsung di Jepang", "日本で、言葉と文化を学ぶ最初の一歩"),
        body: S.tx("Ingin melanjutkan studi atau mencari pekerjaan bergengsi di Jepang? Program Nihongo Gakko memungkinkan Anda belajar bahasa Jepang langsung di negaranya. Kami bekerja sama dengan berbagai sekolah bahasa terbaik di Jepang untuk merencanakan rute pendidikan Anda.", "日本で進学や就職を目指すなら、日本語学校で現地の日本語を学べます。日本の日本語学校と協力し、学びの道筋を一緒に作ります。")
      }
    ];
    var cards = document.querySelectorAll('[data-framer-name$="tab"], [data-framer-name$="pc"], [data-framer-name$="sp"]');
    for (var t = 0; t < cards.length; t++) {
      var card = cards[t];
      var leaves = card.querySelectorAll("p, h3");
      var labelEl = null;
      var titleEl = null;
      var bodyEl = null;
      var num = "";
      for (var n = 0; n < leaves.length; n++) {
        var leaf = leaves[n];
        if (leaf.tagName !== "H3" && leaf.children.length) continue;
        var value = S.flatText(leaf);
        if (/^0[1-6]$/.test(value)) {
          num = value;
          continue;
        }
        if (leaf.tagName === "H3") titleEl = leaf;
        else if (!labelEl) labelEl = leaf;
        else if (!bodyEl) bodyEl = leaf;
      }
      if (num === "06") {
        card.classList.add("hana-program-card-hide");
        if (card.parentElement) card.parentElement.classList.add("hana-program-slot");
        continue;
      }
      var stepIndex = parseInt(num, 10) - 1;
      if (!(stepIndex >= 0 && stepIndex < steps.length)) continue;
      if (labelEl) S.setTextOnce(labelEl, steps[stepIndex].label);
      if (titleEl) S.setTextOnce(titleEl, steps[stepIndex].title);
      if (bodyEl) S.setTextOnce(bodyEl, steps[stepIndex].body);
      var hosts = card.querySelectorAll(".framer-19azdf-container");
      for (var o = 0; o < hosts.length; o++) S.programOrbit(hosts[o], stepIndex);
    }

    var rows = document.querySelectorAll('[data-framer-name="info"] .framer-8ayv25-container');
    for (var row = 0; row < rows.length; row++) S.programRow(rows[row]);
    var wide = document.querySelectorAll('[data-framer-name="info"] .framer-1euglta');
    for (var w = 0; w < wide.length; w++) {
      wide[w].classList.remove("hana-arc-stage");
      var leftover = wide[w].querySelector(".hana-arc");
      if (leftover && leftover.parentElement === wide[w]) leftover.remove();
    }
    var arcs = document.querySelectorAll('[data-framer-name="info"] .framer-1njowho-container');
    for (var arc = 0; arc < arcs.length; arc++) S.programArc(arcs[arc]);
  }
}
