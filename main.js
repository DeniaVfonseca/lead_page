/* main.js
   Interações: menu mobile, contadores, agenda mensal, modal de horários,
   formulário que vira CTA de WhatsApp, e aplicação dos hyperlinks.
*/

(() => {
  // Helpers
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  // ====== MENU MOBILE ======
  const burgerBtn = $("#burgerBtn");
  const mobileNav = $("#mobileNav");

  if (burgerBtn && mobileNav) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("isOpen");
      burgerBtn.setAttribute("aria-expanded", String(isOpen));
      mobileNav.setAttribute("aria-hidden", String(!isOpen));
    });

    $$("#mobileNav a").forEach(a => {
      a.addEventListener("click", () => {
        mobileNav.classList.remove("isOpen");
        burgerBtn.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
      });
    });
  }

  // ====== FOOTER YEAR ======
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ====== APLICA LINKS (links.js) ======
  function applyLinks() {
    const links = window.LINKS || {};

    // IDs no HTML correspondem aos nomes do links.js
    Object.entries(links).forEach(([key, url]) => {
      // Só aplica se existir elemento com id igual ao key
      const el = document.getElementById(key);
      if (!el) return;

      // Se URL estiver vazio, mantém "#"
      const finalUrl = (typeof url === "string" && url.trim().length > 0) ? url : "#";
      el.setAttribute("href", finalUrl);

      // Se estiver vazio, evita navegação (para não "pular" para topo)
      if (finalUrl === "#") {
        el.addEventListener("click", (e) => e.preventDefault());
      }
    });
  }

  // ====== APLICA FOTO (fotos.js) ======
  function applyPhotos() {
    const aboutImg = $("#aboutPhoto");
    if (!aboutImg) return;

    // Usa a variável global foto_sobre_1
    const src = (window.foto_sobre_1 || "").trim();
    if (src) {
      aboutImg.src = src;
      aboutImg.style.opacity = "1";
    } else {
      // Placeholder elegante se não tiver foto
      aboutImg.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800">
          <defs>
            <linearGradient id="g" x1="0" x2="1">
              <stop offset="0" stop-color="rgba(61,65,45,0.18)"/>
              <stop offset="1" stop-color="rgba(185,158,130,0.22)"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#g)"/>
          <text x="50%" y="48%" text-anchor="middle" font-family="Poppins, Arial" font-size="42" fill="rgba(73,73,73,0.65)">
            Defina a foto em fotos.js
          </text>
          <text x="50%" y="56%" text-anchor="middle" font-family="Poppins, Arial" font-size="24" fill="rgba(73,73,73,0.55)">
            variável: foto_sobre_1
          </text>
        </svg>
      `);
      aboutImg.style.opacity = "0.95";
    }
  }

  // ====== CONTADORES (métricas hero) ======
  function animateCounters() {
    const counters = $$(".metric__num");
    if (!counters.length) return;

    const run = (el) => {
      const target = Number(el.getAttribute("data-count") || "0");
      const duration = 900; // ms
      const start = performance.now();
      const from = 0;

      const step = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const value = Math.floor(from + (target - from) * (t * (2 - t))); // easeOutQuad
        el.textContent = value.toLocaleString("pt-BR");
        if (t < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    // roda ao entrar no viewport
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          run(e.target);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(c => io.observe(c));
  }

  // ====== FORM CONTATO -> WHATSAPP CTA ======
  const contactForm = $("#contactForm");
  const contactArea = $("#contactArea");

  function getWhatsappLink() {
    // Prioridade: whatsapp_contato > whatsapp_header > whatsapp_sobre
    const L = window.LINKS || {};
    return (L.whatsapp_contato || L.whatsapp_header || L.whatsapp_sobre || "").trim();
  }

  function renderWhatsappCTA() {
    if (!contactArea) return;

    const link = getWhatsappLink() || "#";
    const disabled = (link === "#");

    contactArea.innerHTML = `
      <a class="whatsCta" href="${link}" target="_blank" rel="noreferrer" ${disabled ? 'data-disabled="true"' : ""}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.7 15l-1.1 4.1 4.2-1.1A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.7.7-2.4-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8zm4.7-6.2c-.3-.2-1.6-.8-1.8-.9s-.4-.2-.6.2-.7.9-.8 1.1-.3.2-.6.1a6.6 6.6 0 0 1-1.9-1.2 7 7 0 0 1-1.3-1.6c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.6s-.6-1.5-.8-2-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3s-1 1-1 2.5 1 2.9 1.1 3.1 2 3.1 4.8 4.3c.7.3 1.2.4 1.6.5.7.2 1.4.2 1.9.1.6-.1 1.6-.7 1.8-1.3s.2-1.1.2-1.2-.2-.2-.5-.4z"/></svg>
        Continuar no WhatsApp
      </a>
      <p class="muted small" style="margin-top:10px;">
        ${disabled ? "Defina o link em links.js (whatsapp_contato / whatsapp_header / whatsapp_sobre)." : "Clique para iniciar o contato."}
      </p>
    `;

    if (disabled) {
      const a = contactArea.querySelector("a");
      a?.addEventListener("click", (e) => e.preventDefault());
    }
  }

  if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const L = window.LINKS || {};
    const endpoint = (L.forms_contato || "").trim();

    if (!endpoint) {
      alert("Defina a URL do backend em links.js (forms_contato).");
      return;
    }

    const formData = new FormData(contactForm);
    const payload = {
      nome: formData.get("nome") || "",
      email: formData.get("email") || "",
      mensagem: formData.get("mensagem") || "",
      origem: "site-denia"
    };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();

      if (json && json.ok) {
        renderWhatsappCTA(); // ✅ só mostra WhatsApp depois de gravar na planilha
        contactForm.reset();
      } else {
        alert("Não foi possível enviar. Verifique o Apps Script e tente novamente.");
      }
    } catch (err) {
      alert("Falha de conexão ao enviar. Tente novamente.");
    }
  });
}

  // ====== INIT ======
  document.addEventListener("DOMContentLoaded", () => {
    applyLinks();
    applyPhotos();
    animateCounters();
    renderCalendar();
  });

})();
