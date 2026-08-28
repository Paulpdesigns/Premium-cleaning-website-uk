const config = window.SITE_CONFIG;
const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];

function icon(name) {
  const icons = {
    home: "M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z",
    sparkles: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM5 17l.9 2.1L8 20l-2.1.9L5 23l-.9-2.1L2 20l2.1-.9zM19 1l.8 1.8L22 3.5l-2.2.7L19 6l-.8-1.8L16 3.5l2.2-.7z",
    key: "M15 7a5 5 0 1 0-4.2 4.9L3 19.7V22h2.3l1.4-1.4H9v-2.3l1.4-1.4h2.3l1.4-1.4-1.9-1.9A5 5 0 0 0 15 7zm-5 0a2 2 0 1 1 4 0 2 2 0 0 1-4 0z",
    building: "M4 21V3h10v18M14 8h6v13M8 7h2M8 11h2M8 15h2M17 12h1M17 16h1M2 21h20",
    calendar: "M7 2v4M17 2v4M3 9h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2z",
    tool: "M14.7 6.3a4 4 0 0 0-5 5L3 18v3h3l6.7-6.7a4 4 0 0 0 5-5l-2.8 2.8-3-3z",
    phone: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.8L7.7 9.8a16 16 0 0 0 6.5 6.5l1.3-1.3a2 2 0 0 1 1.8-.6l3 .5a2 2 0 0 1 1.7 2z",
    message: "M21 11.5a8.4 8.4 0 0 1-9 8.4 8.7 8.7 0 0 1-3.8-.9L3 21l1.8-5A8.5 8.5 0 1 1 21 11.5z",
    arrow: "M5 12h14M13 5l7 7-7 7",
    check: "M20 6L9 17l-5-5"
  };
  return `<svg aria-hidden="true" viewBox="0 0 24 24"><path d="${icons[name] || icons.check}"/></svg>`;
}

function applyConfig() {
  document.documentElement.style.setProperty("--primary", config.business.primaryColor);
  document.documentElement.style.setProperty("--secondary", config.business.secondaryColor);
  document.documentElement.style.setProperty("--accent", config.business.accentColor);
  $$("[data-business]").forEach(el => el.textContent = config.business.name);
  $$("[data-phone]").forEach(el => el.textContent = config.business.phoneDisplay);
  $$("[data-email]").forEach(el => el.textContent = config.business.email);
  $$("[data-address]").forEach(el => el.textContent = config.business.address);
  $$("[data-hours]").forEach(el => el.innerHTML = config.business.hours.join("<br>"));
  $$("[data-wa-link]").forEach(el => el.href = whatsappUrl());
  $$("[data-call-link]").forEach(el => el.href = `tel:${config.business.phone}`);
}

function whatsappUrl(message = "Hello, I'd like to get a quote for your cleaning services.") {
  return `https://wa.me/${config.business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

function initShell() {
  const header = $(".site-header");
  const bar = $(".announcement");
  const menuBtn = $(".menu-toggle");
  const nav = $("#primary-nav");
  if ($(".announcement-text")) $(".announcement-text").textContent = config.business.announcement;
  $(".announcement-close")?.addEventListener("click", () => {
    bar?.classList.add("is-hidden");
    document.body.classList.add("announcement-closed");
  });
  menuBtn?.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    menuBtn.setAttribute("aria-expanded", String(open));
    document.body.classList.toggle("menu-open", open);
  });
  $$("#primary-nav a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    menuBtn?.setAttribute("aria-expanded", "false");
    document.body.classList.remove("menu-open");
  }));
  const onScroll = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("is-scrolled", scrolled);
    $(".back-top")?.classList.toggle("is-visible", window.scrollY > 650);
  };
  onScroll();
  addEventListener("scroll", onScroll, { passive: true });
  $(".back-top")?.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));
}

function initReveal() {
  const items = $$("[data-reveal]");
  if (!items.length || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  items.forEach(el => observer.observe(el));
}

function renderServices(target = "[data-services-grid]") {
  const grid = $(target);
  if (!grid) return;
  grid.innerHTML = config.services.map(service => `
    <article class="service-card" data-reveal>
      <span class="icon">${icon(service.icon)}</span>
      <h3>${service.title}</h3>
      <p>${service.detail}</p>
      <small>${service.bestFor}</small>
      <a class="text-link" href="services.html#${service.id}">Learn more ${icon("arrow")}</a>
    </article>`).join("");
}

function initServiceSelector() {
  const wrap = $(".service-selector");
  if (!wrap) return;
  const result = $(".selector-result", wrap);
  const copy = {
    home: ["Home cleaning", "Choose regular, deep or seasonal cleaning for a house that feels cared for every week."],
    apartment: ["Apartment cleaning", "Efficient cleaning for compact spaces, move-outs and busy city living."],
    office: ["Office cleaning", "After-hours or daytime cleaning plans for desks, shared spaces and client-facing rooms."],
    commercial: ["Commercial property", "Flexible site walkthroughs and recurring cleaning plans for business spaces."],
    airbnb: ["Airbnb turnover", "Guest-ready turnovers with linens, surfaces, restocking checks and presentation details."],
    move: ["Move-in / move-out", "Vacant-space cleaning built around handovers, listings and fresh starts."]
  };
  $$(".selector-option", wrap).forEach(btn => btn.addEventListener("click", () => {
    $$(".selector-option", wrap).forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const [title, text] = copy[btn.dataset.option];
    result.innerHTML = `<span>Recommended path</span><h3>${title}</h3><p>${text}</p><a href="#quote" class="btn btn-primary">Start an estimate</a>`;
  }));
}

function initBeforeAfter(scope = document) {
  $$(".ba-slider", scope).forEach(slider => {
    const range = $(".ba-range", slider);
    const after = $(".ba-after", slider);
    const set = value => {
      slider.style.setProperty("--pos", `${value}%`);
      after.style.clipPath = `inset(0 0 0 ${value}%)`;
      range.value = value;
    };
    set(range?.value || 50);
    range?.addEventListener("input", e => set(e.target.value));
  });
}

function initCounters() {
  const stats = $(".stats-grid");
  if (!stats) return;
  stats.innerHTML = config.stats.map(stat => `<div class="stat" data-value="${stat.value}" data-suffix="${stat.suffix}"><strong>0</strong><span>${stat.label}</span></div>`).join("");
  const animate = () => $$(".stat").forEach(stat => {
    const end = Number(stat.dataset.value);
    const out = $("strong", stat);
    let start = 0;
    const tick = () => {
      start += Math.max(1, Math.ceil(end / 42));
      if (start >= end) {
        out.textContent = `${end}${stat.dataset.suffix}`;
      } else {
        out.textContent = `${start}${stat.dataset.suffix}`;
        requestAnimationFrame(tick);
      }
    };
    tick();
  });
  new IntersectionObserver(([entry], obs) => {
    if (entry.isIntersecting) {
      animate();
      obs.disconnect();
    }
  }, { threshold: .25 }).observe(stats);
}

function initTestimonials() {
  const track = $(".testimonial-track");
  if (!track) return;
  let index = 0;
  track.innerHTML = config.testimonials.map(t => `
    <article class="testimonial">
      <div class="stars" aria-label="${t.rating} out of 5 stars">${"★".repeat(t.rating)}</div>
      <p>"${t.text}"</p>
      <strong>${t.name}</strong><span>${t.location}</span>
    </article>`).join("");
  const move = dir => {
    index = (index + dir + config.testimonials.length) % config.testimonials.length;
    track.style.transform = `translateX(-${index * 100}%)`;
  };
  $(".test-prev")?.addEventListener("click", () => move(-1));
  $(".test-next")?.addEventListener("click", () => move(1));
  let timer = setInterval(() => move(1), 6500);
  $(".testimonials")?.addEventListener("mouseenter", () => clearInterval(timer));
  $(".testimonials")?.addEventListener("mouseleave", () => timer = setInterval(() => move(1), 6500));
  let startX = 0;
  track.addEventListener("touchstart", e => startX = e.touches[0].clientX, { passive: true });
  track.addEventListener("touchend", e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) move(diff > 0 ? 1 : -1);
  }, { passive: true });
}

function initFaq() {
  $$(".faq-question").forEach(button => button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    const open = item.classList.toggle("is-open");
    button.setAttribute("aria-expanded", String(open));
  }));
}

function initForms() {
  $$("form[data-static-form]").forEach(form => form.addEventListener("submit", e => {
    e.preventDefault();
    let valid = true;
    $$("[required]", form).forEach(input => {
      const ok = input.checkValidity();
      input.closest(".field")?.classList.toggle("has-error", !ok);
      valid = valid && ok;
    });
    const status = $(".form-status", form);
    if (!valid) {
      status.textContent = "Please complete the highlighted fields.";
      status.className = "form-status error";
      return;
    }
    status.textContent = "Thanks. This static template is ready to connect to your form provider.";
    status.className = "form-status success";
    form.reset();
  }));
}

function initFloating() {
  $(".float-whatsapp")?.setAttribute("href", whatsappUrl());
  $(".float-call")?.setAttribute("href", `tel:${config.business.phone}`);
  $(".chat-toggle")?.addEventListener("click", () => $(".chat-panel")?.classList.toggle("is-open"));
  $$(".chat-option").forEach(btn => btn.addEventListener("click", () => {
    const msg = $(".chat-message");
    if (btn.dataset.chat === "quote") msg.innerHTML = `Absolutely. You can get an estimated quote in less than a minute.<br><a href="index.html#quote" class="btn btn-primary btn-small">Start Quote</a>`;
    if (btn.dataset.chat === "services") msg.innerHTML = `We clean homes, offices, rentals, move-out properties and post-construction spaces.<br><a href="services.html" class="btn btn-secondary btn-small">View Services</a>`;
    if (btn.dataset.chat === "pricing") msg.textContent = "Pricing depends on property type, size, cleaning type and frequency. The quote checker gives a fast estimate.";
    if (btn.dataset.chat === "areas") msg.textContent = `We serve ${config.serviceAreas.slice(0, 5).join(", ")} and nearby areas.`;
    if (btn.dataset.chat === "contact") location.href = whatsappUrl();
  }));
}

function portfolioCard(item) {
  return `
    <article class="portfolio-card" data-category="${item.category}" data-id="${item.id}" data-reveal>
      <div class="ba-slider">
        <img src="${item.before}" alt="${item.title} before ${item.service}" loading="lazy">
        <img class="ba-after" src="${item.after}" alt="${item.title} after ${item.service}" loading="lazy">
        <span class="ba-label before">Before</span><span class="ba-label after">After</span><span class="ba-handle">↔</span>
        <input class="ba-range" type="range" min="0" max="100" value="50" aria-label="Compare before and after for ${item.title}">
      </div>
      <div class="portfolio-body">
        <span class="eyebrow">${item.service}</span>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="text-link portfolio-open" type="button">View project ${icon("arrow")}</button>
      </div>
    </article>`;
}

function initPortfolio() {
  const grid = $(".portfolio-grid");
  if (!grid) return;
  grid.innerHTML = config.portfolio.map(portfolioCard).join("");
  initBeforeAfter(grid);
  $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
    $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    const filter = btn.dataset.filter;
    $$(".portfolio-card").forEach(card => card.classList.toggle("is-hidden", filter !== "all" && card.dataset.category !== filter));
  }));
  const lightbox = $(".lightbox");
  const body = $(".lightbox-body");
  let active = 0;
  const open = id => {
    active = config.portfolio.findIndex(item => item.id === id);
    const item = config.portfolio[active];
    body.innerHTML = portfolioCard(item);
    $$("[data-reveal]", body).forEach(el => el.classList.add("is-visible"));
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    initBeforeAfter(body);
    $(".lightbox-close")?.focus();
  };
  const close = () => {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
  };
  grid.addEventListener("click", e => {
    const card = e.target.closest(".portfolio-card");
    if (e.target.closest(".portfolio-open") && card) open(card.dataset.id);
  });
  $(".lightbox-close")?.addEventListener("click", close);
  $(".lightbox-prev")?.addEventListener("click", () => open(config.portfolio[(active - 1 + config.portfolio.length) % config.portfolio.length].id));
  $(".lightbox-next")?.addEventListener("click", () => open(config.portfolio[(active + 1) % config.portfolio.length].id));
  lightbox?.addEventListener("click", e => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function initSeoSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: config.business.name,
    image: config.images.hero,
    telephone: config.business.phone,
    email: config.business.email,
    address: config.business.address,
    url: location.href,
    priceRange: "££",
    areaServed: config.serviceAreas
  };
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
}

document.addEventListener("DOMContentLoaded", () => {
  applyConfig();
  initShell();
  renderServices();
  initServiceSelector();
  initBeforeAfter();
  initCounters();
  initTestimonials();
  initFaq();
  initForms();
  initFloating();
  initPortfolio();
  initSeoSchema();
  initReveal();
  if ($("#year")) $("#year").textContent = new Date().getFullYear();
});
