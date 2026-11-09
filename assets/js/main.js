/* Ninh (Johnny) Ha — personal website.
   Part 1 (always): theme toggle, mobile menu, slide galleries + lightbox,
   back-to-top, active nav. Part 2 (only when motion is allowed and GSAP
   loaded): the GSAP + ScrollTrigger + SplitText motion layer. */
(function () {
  "use strict";
  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var desktopMQ = window.matchMedia("(min-width: 1024px)");

  /* ---------- Theme toggle (a constant label; aria-pressed carries the state) ---------- */
  var themeBtn = document.getElementById("theme-btn");
  function syncTheme() { if (themeBtn) themeBtn.setAttribute("aria-pressed", String(root.dataset.theme === "dark")); }
  if (themeBtn) {
    syncTheme();
    themeBtn.addEventListener("click", function () {
      var next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("nh-theme", next); } catch (e) {}
      syncTheme();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    mobileMenu.hidden = true; // hidden only once JS can open it again (QA: no-JS phones keep navigation)
    var setMenu = function (open, focusButton) {
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.textContent = open ? "Close" : "Menu";
      mobileMenu.hidden = !open;
      if (open) { var first = mobileMenu.querySelector("a"); if (first) first.focus(); }
      else if (focusButton) menuBtn.focus();
    };
    var isOpen = function () { return menuBtn.getAttribute("aria-expanded") === "true"; };
    menuBtn.addEventListener("click", function () { setMenu(!isOpen()); });
    mobileMenu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", function () { setMenu(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && isOpen()) setMenu(false, true); });
    document.addEventListener("click", function (e) {
      if (isOpen() && !mobileMenu.contains(e.target) && !menuBtn.contains(e.target)) setMenu(false);
    });
    desktopMQ.addEventListener("change", function (e) { if (e.matches) setMenu(false); }); // QA: don't stay open across a resize
  }

  /* ---------- Gallery toggles ---------- */
  document.querySelectorAll("[data-gallery-toggle]").forEach(function (btn) {
    var grid = document.getElementById(btn.getAttribute("aria-controls"));
    if (!grid) return;
    grid.hidden = true; // visible without JS (QA), collapsed with it
    var total = btn.getAttribute("data-total");
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      grid.hidden = open;
      btn.textContent = open ? "View all " + total + " slides" : "Hide slides";
      if (window.ScrollTrigger) window.ScrollTrigger.refresh();
    });
  });

  /* ---------- Lightbox (native <dialog>) ---------- */
  var dialog = document.getElementById("lightbox");
  if (dialog) {
    var lbImg = document.getElementById("lightbox-img");
    var lbCaption = document.getElementById("lightbox-caption");
    var closeBtn = document.getElementById("lightbox-close");
    var lbInner = dialog.querySelector(".lightbox-inner");
    var deck = [], index = 0, opener = null;
    var show = function (i) {
      index = (i + deck.length) % deck.length;
      lbImg.src = deck[index].full;
      lbImg.alt = deck[index].alt;
      lbCaption.textContent = deck[index].caption;
    };
    var open = function (thumb) {
      var name = thumb.getAttribute("data-deck");
      // The deck is the gallery's own slides, in slide order. The cover button
      // only says which slide to start on, so any cover keeps Next/Prev in order.
      var slides = document.querySelectorAll('.gallery [data-deck="' + name + '"]');
      if (!slides.length) slides = [thumb];
      deck = Array.prototype.map.call(slides, function (b) {
        return { full: b.getAttribute("data-full"), alt: b.getAttribute("data-alt"), caption: b.getAttribute("data-caption") };
      });
      var start = deck.findIndex(function (s) { return s.full === thumb.getAttribute("data-full"); });
      opener = thumb;
      show(start < 0 ? 0 : start);
      dialog.showModal();
      closeBtn.focus();
    };
    document.querySelectorAll(".gallery-thumb").forEach(function (t) { t.addEventListener("click", function () { open(t); }); });
    document.getElementById("lightbox-prev").addEventListener("click", function () { show(index - 1); });
    document.getElementById("lightbox-next").addEventListener("click", function () { show(index + 1); });
    closeBtn.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) { if (e.target === dialog || e.target === lbInner) dialog.close(); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    });
    dialog.addEventListener("close", function () { if (opener) opener.focus(); });
  }

  /* ---------- Header bar + back to top ---------- */
  var header = document.querySelector(".site-header");
  var toTop = document.getElementById("back-to-top");
  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
    if (toTop) toTop.classList.toggle("show", window.scrollY > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  if (toTop) {
    toTop.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); });
  }

  /* ---------- Active nav ---------- */
  var navLinks = document.querySelectorAll(".nav-desktop a, .mobile-menu a");
  var sections = ["home", "about", "work", "experience", "skills", "education", "contact"]
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if ("IntersectionObserver" in window && navLinks.length) {
    var seenId = "";
    var applyActive = function () {
      // Contact is short and last, so it never reaches the 30–40% band; the page bottom selects it.
      var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      var id = atBottom ? "contact" : seenId;
      navLinks.forEach(function (a) {
        if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) seenId = en.target.id; });
      applyActive();
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { io.observe(s); });
    window.addEventListener("scroll", applyActive, { passive: true });
  }

  /* ====================================================================
     Motion layer (GSAP). Everything below only changes how content arrives;
     with reduced motion or no GSAP, content is simply there.
     ==================================================================== */
  var reveals = document.querySelectorAll(".reveal");
  var revealAll = function () { reveals.forEach(function (el) { el.classList.add("in"); }); };

  if (reduceMotion || !window.gsap || !window.ScrollTrigger) {
    root.classList.remove("anim");
    revealAll();
    return;
  }

  var gsap = window.gsap, ST = window.ScrollTrigger, Split = window.SplitText;
  gsap.registerPlugin(ST);
  if (Split) gsap.registerPlugin(Split);
  var ease = "power3.out";
  var splitLines = function (el, type) {
    // SplitText keeps an aria-label with the full text on the element and
    // hides the pieces from screen readers.
    return Split ? Split.create(el, { type: type, mask: type.split(",").pop(), aria: "auto" }) : null;
  };

  /* 1. Intro: header, status pill, the name letter by letter, then the rest. */
  var intro = gsap.timeline({ defaults: { ease: ease } });
  var title = document.querySelector(".hero-title");
  var titleSplit = title ? splitLines(title, "words,chars") : null;
  gsap.set("[data-load]", { opacity: 1 });
  root.classList.remove("anim");
  intro.from(".header-inner", { y: -24, opacity: 0, duration: 0.8 })
    .from(".status", { y: 16, opacity: 0, duration: 0.7 }, "-=0.5");
  if (titleSplit) intro.from(titleSplit.chars, { yPercent: 110, duration: 1.1, stagger: 0.035, ease: "expo.out" }, "-=0.45");
  else if (title) intro.from(title, { y: 40, opacity: 0, duration: 0.9 }, "-=0.45");
  intro.from(".hero-edu", { y: 24, opacity: 0, duration: 0.8 }, "-=0.75")
    .from(".hero-actions > *", { y: 20, opacity: 0, duration: 0.7, stagger: 0.08 }, "-=0.6")
    .from(".strip-track img", { y: 80, opacity: 0, duration: 1.1, stagger: 0.08, ease: "expo.out" }, "-=0.7");

  /* 2. Photo strip drifts left while the hero scrolls away. */
  gsap.to(".strip-track", {
    x: function () { return -Math.min(320, window.innerWidth * 0.25); },
    ease: "none",
    scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.6, invalidateOnRefresh: true }
  });

  /* 3. About statement: words fill from faint to ink as it scrolls through. */
  var statement = document.querySelector(".statement");
  if (statement && Split) {
    var words = Split.create(statement, { type: "words", aria: "auto" }).words;
    gsap.fromTo(words, { opacity: 0.16 }, {
      opacity: 1, ease: "none", stagger: 0.1,
      scrollTrigger: { trigger: statement, start: "top 82%", end: "bottom 48%", scrub: true }
    });
  }

  /* 4. Section headings rise word by word, once. */
  document.querySelectorAll("main section:not(.hero):not(.contact) h2").forEach(function (h) {
    var s = splitLines(h, "words");
    gsap.from(s ? s.words : h, {
      yPercent: s ? 105 : 0, y: s ? 0 : 30, opacity: s ? 1 : 0, duration: 1, stagger: 0.06, ease: "expo.out",
      scrollTrigger: { trigger: h, start: "top 88%", once: true }
    });
  });

  /* 5. Project covers open from an inset frame and settle their zoom. */
  document.querySelectorAll(".project-media").forEach(function (m) {
    var img = m.querySelector("img");
    gsap.fromTo(m, { clipPath: "inset(8% 6% 8% 6% round 24px)" }, {
      clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none",
      scrollTrigger: { trigger: m, start: "top 92%", end: "top 45%", scrub: 0.5 }
    });
    if (img) gsap.fromTo(img, { scale: 1.14 }, {
      scale: 1, ease: "none",
      scrollTrigger: { trigger: m, start: "top bottom", end: "bottom top", scrub: 0.5 },
      clearProps: "transform"
    });
  });

  /* 6. Everything marked .reveal fades up as it enters, in small batches. */
  gsap.set(reveals, { opacity: 0, y: 28 });
  ST.batch(reveals, {
    start: "top 90%",
    once: true,
    onEnter: function (batch) {
      batch.forEach(function (el) { el.classList.add("in"); });
      gsap.to(batch, {
        opacity: 1, y: 0, duration: 0.9, ease: ease, stagger: 0.12, overwrite: true,
        onComplete: function () { gsap.set(batch, { clearProps: "transform" }); }
      });
    }
  });

  /* 7. The closing line rises letter by letter. */
  var contactTitle = document.querySelector(".contact-title");
  if (contactTitle) {
    var cs = splitLines(contactTitle, "words,chars");
    if (cs) {
      gsap.from(cs.chars, { yPercent: 110, duration: 1, stagger: 0.03, ease: "expo.out", scrollTrigger: { trigger: contactTitle, start: "top 85%", once: true } });
    }
  }

  /* 8. The ground's light drifts slowly (paused when the tab is hidden by GSAP itself). */
  gsap.to(".blob-1", { x: "8vw", y: "6vh", duration: 18, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(".blob-2", { x: "-6vw", y: "10vh", duration: 22, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(".blob-3", { x: "-10vw", y: "-8vh", duration: 26, ease: "sine.inOut", yoyo: true, repeat: -1 });

  /* Print shows everything (CSS covers the rest), and layout changes re-measure. */
  window.addEventListener("beforeprint", revealAll);
  // Lazy images and opened galleries change the page height after the
  // triggers were measured; re-measure whenever it changes.
  var lastH = 0, refreshTimer = 0;
  new ResizeObserver(function () {
    var h = document.documentElement.scrollHeight;
    if (Math.abs(h - lastH) < 2) return;
    lastH = h;
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(function () { ST.refresh(); }, 150);
  }).observe(document.body);
})();
