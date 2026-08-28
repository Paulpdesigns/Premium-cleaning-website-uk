document.addEventListener("DOMContentLoaded", () => {
  const quote = document.querySelector(".quote-app");
  if (!quote) return;
  const cfg = window.SITE_CONFIG.pricing;
  const state = { property: "", size: "", clean: "", frequency: "", details: {} };
  const steps = [...quote.querySelectorAll(".quote-step")];
  const progress = quote.querySelector(".quote-progress span");
  let current = 0;

  const sizeOptions = {
    house: [["studio", "Studio / Small"], ["bedrooms2", "1-2 Bedrooms"], ["bedrooms4", "3-4 Bedrooms"], ["bedrooms5", "5+ Bedrooms"]],
    apartment: [["studio", "Studio / Small"], ["bedrooms2", "1-2 Bedrooms"], ["bedrooms4", "3-4 Bedrooms"], ["bedrooms5", "5+ Bedrooms"]],
    airbnb: [["studio", "Studio / Small"], ["bedrooms2", "1-2 Bedrooms"], ["bedrooms4", "3-4 Bedrooms"], ["bedrooms5", "5+ Bedrooms"]],
    office: [["smallOffice", "Small Office"], ["mediumOffice", "Medium Office"], ["largeOffice", "Large Office"], ["custom", "Custom"]],
    commercial: [["smallOffice", "Small Property"], ["mediumOffice", "Medium Property"], ["largeOffice", "Large Property"], ["custom", "Custom"]]
  };

  function showStep(index) {
    current = Math.max(0, Math.min(index, steps.length - 1));
    steps.forEach((step, i) => step.classList.toggle("is-active", i === current));
    progress.style.width = `${((current + 1) / steps.length) * 100}%`;
    quote.querySelector(".quote-count").textContent = `Step ${current + 1} of ${steps.length}`;
  }

  function setChoice(group, value, button) {
    state[group] = value;
    button.closest(".choice-grid").querySelectorAll(".choice").forEach(btn => btn.classList.remove("is-selected"));
    button.classList.add("is-selected");
    if (group === "property") renderSizes(value);
  }

  function renderSizes(property) {
    const grid = quote.querySelector("[data-size-options]");
    grid.innerHTML = sizeOptions[property].map(([value, label]) => `<button class="choice" type="button" data-group="size" data-value="${value}">${label}</button>`).join("");
    state.size = "";
  }

  function validateStep() {
    const step = steps[current];
    const group = step.dataset.requires;
    if (group && !state[group]) {
      step.querySelector(".quote-error").textContent = "Choose an option to continue.";
      return false;
    }
    if (step.dataset.details) {
      let ok = true;
      step.querySelectorAll("[required]").forEach(field => {
        const valid = field.checkValidity();
        field.closest(".field").classList.toggle("has-error", !valid);
        ok = ok && valid;
        state.details[field.name] = field.value;
      });
      step.querySelector(".quote-error").textContent = ok ? "" : "Please complete the required details.";
      return ok;
    }
    step.querySelector(".quote-error").textContent = "";
    return true;
  }

  function calculate() {
    const base = cfg.base[state.property] || 0;
    const size = cfg.size[state.size] || 0;
    const type = cfg.type[state.clean] || 0;
    const frequency = cfg.frequency[state.frequency] || 1;
    const total = Math.max(60, Math.round((base + size + type) * frequency));
    return {
      low: Math.round(total * (1 - cfg.rangePercent)),
      high: Math.round(total * (1 + cfg.rangePercent))
    };
  }

  function renderEstimate() {
    const result = calculate();
    quote.querySelector(".estimate-price").textContent = `£${result.low} - £${result.high}`;
    quote.querySelector(".estimate-summary").innerHTML = `
      <li><strong>Property:</strong> ${labelFor(state.property)}</li>
      <li><strong>Size:</strong> ${labelFor(state.size)}</li>
      <li><strong>Cleaning:</strong> ${labelFor(state.clean)}</li>
      <li><strong>Frequency:</strong> ${labelFor(state.frequency)}</li>`;
    quote.querySelector(".estimate-whatsapp").href = window.SITE_CONFIG ? `https://wa.me/${window.SITE_CONFIG.business.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(`Hello, I'd like to request a quote. Estimated range: £${result.low} - £${result.high}.`)}` : "#";
  }

  function labelFor(value) {
    return (quote.querySelector(`[data-value="${value}"]`)?.textContent || value).trim();
  }

  quote.addEventListener("click", e => {
    const choice = e.target.closest(".choice");
    if (choice) setChoice(choice.dataset.group, choice.dataset.value, choice);
    if (e.target.closest("[data-next]")) {
      if (!validateStep()) return;
      if (current === steps.length - 2) renderEstimate();
      showStep(current + 1);
    }
    if (e.target.closest("[data-back]")) showStep(current - 1);
    if (e.target.closest("[data-request]")) {
      const btn = e.target.closest("[data-request]");
      btn.classList.add("is-loading");
      btn.textContent = "Preparing request...";
      setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.textContent = "Request Sent";
        quote.querySelector(".quote-success").textContent = "Success. This static template is ready to connect to Netlify Forms, Formspree, EmailJS or a custom backend.";
      }, 800);
    }
  });
  renderSizes("house");
  showStep(0);
});
