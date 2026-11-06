/* Ninh (Johnny) Ha — personal website. Vanilla JS only:
   mobile menu, gallery toggles, lightbox, back-to-top, active nav, reveal. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Dark / light mode ---------- */
  var themeBtn = document.getElementById("theme-btn");
  var rootEl = document.documentElement;
  function updateThemeBtn() {
    if (!themeBtn) return;
    var dark = rootEl.dataset.theme === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  }
  if (themeBtn) {
    updateThemeBtn();
    themeBtn.addEventListener("click", function () {
      var next = rootEl.dataset.theme === "dark" ? "light" : "dark";
      rootEl.dataset.theme = next;
      try { localStorage.setItem("nh-theme", next); } catch (e) {}
      updateThemeBtn();
    });
  }

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById("menu-btn");
  var mobileMenu = document.getElementById("mobile-menu");
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") === "true";
      menuBtn.setAttribute("aria-expanded", String(!open));
      menuBtn.textContent = open ? "Menu" : "Close";
      mobileMenu.hidden = open;
    });
    mobileMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.textContent = "Menu";
        mobileMenu.hidden = true;
      });
    });
  }

  /* ---------- Gallery toggles ---------- */
  document.querySelectorAll("[data-gallery-toggle]").forEach(function (btn) {
    var grid = document.getElementById(btn.getAttribute("aria-controls"));
    if (!grid) return;
    var total = btn.getAttribute("data-total");
    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!open));
      grid.hidden = open;
      btn.textContent = open ? "View " + total + " slides \u2192" : "Hide " + total + " slides \u2191";
    });
  });

  /* ---------- Lightbox (native <dialog>) ---------- */
  var dialog = document.getElementById("lightbox");
  if (dialog) {
    var lbImg = document.getElementById("lightbox-img");
    var lbCaption = document.getElementById("lightbox-caption");
    var prevBtn = document.getElementById("lightbox-prev");
    var nextBtn = document.getElementById("lightbox-next");
    var closeBtn = document.getElementById("lightbox-close");
    var currentDeck = [];
    var currentIndex = 0;
    var opener = null;

    function showSlide(i) {
      currentIndex = (i + currentDeck.length) % currentDeck.length;
      var item = currentDeck[currentIndex];
      lbImg.src = item.full;
      lbImg.alt = item.alt;
      lbCaption.textContent = item.caption;
    }

    function openLightbox(thumb) {
      var deckName = thumb.getAttribute("data-deck");
      currentDeck = Array.prototype.slice
        .call(document.querySelectorAll('[data-deck="' + deckName + '"]'))
        .map(function (b) {
          return {
            full: b.getAttribute("data-full"),
            alt: b.getAttribute("data-alt"),
            caption: b.getAttribute("data-caption"),
          };
        })
        /* De-duplicate by image: a step cover button reuses slide 1's
           data-full, so without this the deck would contain slide 1 twice
           and Next from slide 1 would appear to stay on slide 1. */
        .filter(function (item, idx, arr) {
          return arr.findIndex(function (x) { return x.full === item.full; }) === idx;
        });
      currentIndex = currentDeck.findIndex(function (item) {
        return item.full === thumb.getAttribute("data-full");
      });
      if (currentIndex < 0) currentIndex = 0;
      opener = thumb;
      showSlide(currentIndex);
      dialog.showModal();
      closeBtn.focus();
    }

    document.querySelectorAll(".gallery-thumb").forEach(function (thumb) {
      thumb.addEventListener("click", function () { openLightbox(thumb); });
    });
    prevBtn.addEventListener("click", function () { showSlide(currentIndex - 1); });
    nextBtn.addEventListener("click", function () { showSlide(currentIndex + 1); });
    closeBtn.addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { e.preventDefault(); showSlide(currentIndex - 1); }
      if (e.key === "ArrowRight") { e.preventDefault(); showSlide(currentIndex + 1); }
    });
    dialog.addEventListener("close", function () {
      if (opener) opener.focus();
    });
  }

  /* ---------- Back to top ---------- */
  var toTop = document.getElementById("back-to-top");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 600);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------- Active nav (IntersectionObserver) ---------- */
  var navLinks = document.querySelectorAll(".nav-desktop a, .mobile-menu a");
  var sections = ["about", "work", "experience", "skills", "contact"]
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  if ("IntersectionObserver" in window && navLinks.length && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          var on = link.getAttribute("href") === "#" + id;
          if (on) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Reveal on scroll, step-by-step (progressive enhancement) ----------
     Each .reveal element fades/slides in only as it scrolls into view.
     Siblings sharing a parent (work steps, timeline entries, skill cards)
     stagger 150ms apart (capped at 450ms) so a group unfolds one at a time
     instead of all at once. The hidden state exists ONLY when JS has run
     (html.js) and motion is allowed (see CSS): with JS off, or no
     IntersectionObserver, or reduced motion, everything is visible. */
  if ("IntersectionObserver" in window && !reduceMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var delay = parseInt(el.getAttribute("data-reveal-delay") || "0", 10);
        if (delay) el.style.transitionDelay = delay + "ms";
        el.classList.add("in");
        revealObserver.unobserve(el);
        /* Clear the inline delay once the reveal has run, so later
           transitions on the same element (e.g. card hover lift) are not
           delayed. 600ms transition + stagger + 300ms slack. */
        if (delay) {
          setTimeout(function () { el.style.transitionDelay = ""; }, 600 + delay + 300);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });
    var revealGroups = [];
    document.querySelectorAll(".reveal").forEach(function (el) {
      var parent = el.parentNode;
      var group = null;
      for (var i = 0; i < revealGroups.length; i++) {
        if (revealGroups[i].parent === parent) { group = revealGroups[i]; break; }
      }
      if (!group) { group = { parent: parent, items: [] }; revealGroups.push(group); }
      group.items.push(el);
    });
    revealGroups.forEach(function (group) {
      group.items.forEach(function (el, i) {
        el.setAttribute("data-reveal-delay", String(Math.min(i, 3) * 150));
      });
    });
    document.querySelectorAll(".reveal").forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("in");
    });
  }
})();
