document.addEventListener("DOMContentLoaded", () => {
  const yearNode = document.getElementById("year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const content = {
    menu: [
      { title: "Nasi Putih", description: "Sumber energi utama untuk kebutuhan harian.", icon: "🍚" },
      { title: "Protein", description: "Ayam, ikan, atau telur untuk pertumbuhan.", icon: "🍗" },
      { title: "Sayur", description: "Sayuran segar sumber vitamin, mineral, dan serat.", icon: "🥬" },
      { title: "Buah", description: "Buah segar membantu keseimbangan menu harian.", icon: "🍊" }
    ],
    nutrition: [
      { label: "Energi", value: "450 kcal", percent: 88 },
      { label: "Protein", value: "22 g", percent: 73 },
      { label: "Karbohidrat", value: "65 g", percent: 80 },
      { label: "Lemak", value: "12 g", percent: 52 },
      { label: "Serat", value: "8 g", percent: 68 }
    ],
    composition: [
      {
        name: "Nasi Putih",
        description: "Memberikan energi utama untuk aktivitas harian dan metabolisme tubuh.",
        image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Ayam/Protein",
        description: "Mendukung pertumbuhan, perbaikan jaringan, dan rasa kenyang yang optimal.",
        image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Sayuran",
        description: "Kaya vitamin, mineral, dan serat untuk kesehatan pencernaan dan tubuh.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=900&q=80"
      },
      {
        name: "Buah Segar",
        description: "Memberi rasa segar serta antioksidan yang mendukung kesehatan tubuh.",
        image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=900&q=80"
      }
    ],
    socials: [
      { name: "Instagram", url: "https://instagram.com/sppgcibadak110" },
      { name: "Facebook", url: "https://facebook.com" },
      { name: "TikTok", url: "https://tiktok.com" },
      { name: "Website", url: "https://example.com" }
    ]
  };

  const menuRoot = document.getElementById("menu-items");
  if (menuRoot) {
    menuRoot.innerHTML = content.menu.map((item) => `
      <article class="menu-card">
        <div class="menu-icon" aria-hidden="true">${item.icon}</div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
      </article>
    `).join("");
  }

  const nutritionRoot = document.getElementById("nutrition-grid");
  if (nutritionRoot) {
    nutritionRoot.innerHTML = content.nutrition.map((item) => `
      <div class="nutrition-item">
        <div class="nutrition-top">
          <span>${item.label}</span>
          <strong>${item.value}</strong>
        </div>
        <div class="progress" aria-label="${item.label} ${item.value}"><span style="width:${item.percent}%"></span></div>
      </div>
    `).join("");
  }

  const compositionRoot = document.getElementById("composition-list");
  if (compositionRoot) {
    compositionRoot.innerHTML = content.composition.map((item) => `
      <article class="composition-item">
        <div class="composition-thumb">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <div>
          <h4>${item.name}</h4>
          <p>${item.description}</p>
        </div>
      </article>
    `).join("");
  }

  const socialRoot = document.getElementById("social-links");
  if (socialRoot) {
    socialRoot.innerHTML = content.socials.map((item) => `
      <a class="social-link" href="${item.url}" target="_blank" rel="noopener noreferrer" aria-label="${item.name}">${item.name}</a>
    `).join("");
  }

  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  if (window.QRCode) {
    const qrTarget = document.getElementById("qrcode");
    if (qrTarget) {
      new QRCode(qrTarget, {
        text: window.location.href.split("#")[0],
        width: 180,
        height: 180,
        colorDark: "#1F2A37",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  }

  // --- Dynamic QR modal (no HTML changes) ---
  function createQrModal(url) {
    const existing = document.getElementById("qr-modal-overlay");
    if (existing) {
      const codeWrap = existing.querySelector('#qr-modal-code');
      codeWrap.innerHTML = '';
      new QRCode(codeWrap, {
        text: url,
        width: 220,
        height: 220,
        colorDark: "#1F2A37",
        colorLight: "#FFFFFF",
        correctLevel: QRCode.CorrectLevel.H
      });
      existing.classList.add('is-open');
      return existing;
    }

    const overlay = document.createElement('div');
    overlay.id = 'qr-modal-overlay';
    overlay.className = 'qr-modal-overlay';
    overlay.innerHTML = `
      <div class="qr-modal-box" role="dialog" aria-modal="true" aria-label="QR code dialog">
        <button class="qr-modal-close" aria-label="Tutup">×</button>
        <div class="qr-modal-title">SPPG CIBADAK110 — Scan untuk buka</div>
        <div id="qr-modal-code" class="qr-modal-code"></div>
        <div class="qr-modal-hint">Arahkan scanner ponsel ke kode ini untuk membuka situs.</div>
      </div>
    `;

    Object.assign(overlay.style, {
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(31,42,55,0.6)', zIndex: 9999
    });

    const box = overlay.querySelector('.qr-modal-box');
    Object.assign(box.style, {
      background: '#fff', padding: '18px', borderRadius: '10px', width: '280px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', position: 'relative'
    });

    const closeBtn = overlay.querySelector('.qr-modal-close');
    Object.assign(closeBtn.style, { position: 'absolute', right: '12px', top: '8px', border: 'none', background: 'transparent', fontSize: '20px', cursor: 'pointer' });

    const title = overlay.querySelector('.qr-modal-title');
    if (title) title.style.marginBottom = '8px';

    const hint = overlay.querySelector('.qr-modal-hint');
    if (hint) hint.style.marginTop = '8px';

    document.body.appendChild(overlay);

    const codeWrap = overlay.querySelector('#qr-modal-code');
    new QRCode(codeWrap, {
      text: url,
      width: 220,
      height: 220,
      colorDark: "#1F2A37",
      colorLight: "#FFFFFF",
      correctLevel: QRCode.CorrectLevel.H
    });

    function closeModal() {
      overlay.classList.remove('is-open');
      overlay.remove();
      document.removeEventListener('keydown', onKey);
    }

    function onKey(e) {
      if (e.key === 'Escape') closeModal();
    }

    overlay.addEventListener('click', (ev) => {
      if (ev.target === overlay) closeModal();
    });

    closeBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', onKey);

    return overlay;
  }

  const scanBtn = document.querySelector('.scan-btn');
  if (scanBtn && window.QRCode) {
    scanBtn.addEventListener('click', (e) => {
      e.preventDefault();
      createQrModal(window.location.href.split('#')[0]);
    });
  }
});
