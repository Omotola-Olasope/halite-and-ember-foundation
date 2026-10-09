// The Halite & Ember Foundation: progressive enhancements only.
// Every page reads and works without this file.
(() => {
  "use strict";

  const root = document.documentElement;
  const THEME_KEY = "hef-theme";

  // Styles for the menu button, theme toggle and reveal only apply once this
  // script is running, so a failed load never hides navigation or content.
  root.classList.add("enhanced", "reveal-ready");

  const storeTheme = (value) => {
    try {
      localStorage.setItem(THEME_KEY, value);
    } catch (error) {
      // Storage unavailable: the choice lasts for this page only.
    }
  };

  // Theme toggle ------------------------------------------------------------
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  const currentTheme = () => root.dataset.theme || (systemDark.matches ? "dark" : "light");

  const themeButton = document.querySelector(".theme-toggle");
  const syncThemeLabel = () => {
    if (!themeButton) return;
    const next = currentTheme() === "dark" ? "light" : "dark";
    themeButton.setAttribute("aria-label", `Switch to ${next} theme`);
  };
  syncThemeLabel();
  systemDark.addEventListener("change", syncThemeLabel);

  themeButton?.addEventListener("click", () => {
    const next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    storeTheme(next);
    syncThemeLabel();
  });

  // Mobile menu ---------------------------------------------------------------
  const menuButton = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");

  if (menuButton && menu) {
    const setMenu = (open) => {
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      menu.classList.toggle("is-open", open);
      menu.inert = !open;
      document.body.classList.toggle("menu-open", open);
      if (open) menu.querySelector("a[href]")?.focus();
    };

    menu.inert = true;
    menuButton.addEventListener("click", () => setMenu(menuButton.getAttribute("aria-expanded") !== "true"));

    document.addEventListener("keydown", (event) => {
      if (!menu.classList.contains("is-open")) return;
      if (event.key === "Escape") {
        setMenu(false);
        menuButton.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = [menuButton, ...menu.querySelectorAll("a[href]")];
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // Close if the viewport grows past the breakpoint where the menu hides.
    window.matchMedia("(min-width: 68rem)").addEventListener("change", (event) => {
      if (event.matches) setMenu(false);
    });
  }

  // Header over a full bleed hero ---------------------------------------------
  const header = document.querySelector(".site-header--overlay");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Home hero film ------------------------------------------------------------
  // Larger screens only, and never when the visitor asks for less motion or
  // less data. Without it the still photograph simply stays in place.
  const film = document.querySelector(".hero-video");
  const filmButton = document.querySelector(".film-toggle");
  const wantsFilm = window.matchMedia("(min-width: 48rem)").matches
    && !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    && !navigator.connection?.saveData;
  if (film && filmButton && wantsFilm) {
    film.querySelectorAll("source").forEach((source) => { source.src = source.dataset.src; });
    film.hidden = false;
    film.addEventListener("playing", () => {
      film.classList.add("is-playing");
      filmButton.hidden = false;
    }, { once: true });
    film.load();
    // A browser may refuse to autoplay; the still is the intended fallback.
    film.play().catch(() => {});
    filmButton.addEventListener("click", () => {
      const resume = film.paused;
      if (resume) film.play(); else film.pause();
      filmButton.textContent = resume ? "Pause film" : "Play film";
    });
  }

  // Photograph slides in a band ------------------------------------------------
  // The photographs change only for visitors who have not asked for less motion.
  const SLIDE_INTERVAL_MS = 3000;
  const slideBand = document.querySelector(".media-band--slides");
  const slidesButton = document.querySelector(".slides-toggle");
  const slides = slideBand ? [...slideBand.querySelectorAll(":scope > img")] : [];
  if (slides.length > 1 && slidesButton && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let current = 0;
    let timer = null;
    const advance = () => {
      if (document.hidden) return;
      slides[current].classList.remove("is-active");
      current = (current + 1) % slides.length;
      slides[current].classList.add("is-active");
    };
    const setRunning = (running) => {
      window.clearInterval(timer);
      timer = running ? window.setInterval(advance, SLIDE_INTERVAL_MS) : null;
      slidesButton.textContent = running ? "Pause slides" : "Play slides";
    };
    slidesButton.hidden = false;
    slidesButton.addEventListener("click", () => setRunning(timer === null));
    setRunning(true);
  }

  // Reveal on scroll ----------------------------------------------------------
  const revealables = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    revealables.forEach((element) => observer.observe(element));
  } else {
    revealables.forEach((element) => element.classList.add("is-visible"));
  }

  // Copy email ----------------------------------------------------------------
  const copyButton = document.querySelector(".copy-button");
  const copyStatus = document.querySelector(".copy-status");
  copyButton?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(copyButton.dataset.copy);
      copyStatus.textContent = "Address copied.";
    } catch (error) {
      copyStatus.textContent = "Copying is not available here. Please select the address above.";
    }
  });
})();
