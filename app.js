/* ==========================================================================
   PORTAFOLIO PROFESIONAL - SANTIAGO ARISTIZÁBAL ESCOBAR
   Interactive Application Script (Vanilla JS ES6+)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initThemeToggle();
  initMobileMenu();
  initScrollHeader();
  initProjectFilters();
  initCvModal();
  initLiveDemoModal();
});

/* --- 1. TYPING TEXT ANIMATION --- */
function initTypingEffect() {
  const typingElement = document.getElementById('typingText');
  if (!typingElement) return;

  const phrases = [
    "Desarrollador de Software & ADSO SENA",
    "Especialista en Python, JS & React",
    "Automatizador de Procesos con IA",
    "Apasionado por la Calidad y Código Limpio"
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause at end of phrase
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  setTimeout(type, 1000);
}

/* --- 2. DARK / LIGHT THEME TOGGLE --- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  // Check stored theme preference
  const savedTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

      htmlElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }
}

/* --- 3. MOBILE HAMBURGER MENU --- */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navMenu = document.getElementById('navMenu');

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking any nav link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }
}

/* --- 4. SCROLL HEADER & ACTIVE SECTION HIGHLIGHT --- */
function initScrollHeader() {
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    // Header shadow background
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active Section ScrollSpy
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --- 5. PROJECT CATEGORY FILTERS --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --- 6. CV VIEWER MODAL HANDLERS --- */
function initCvModal() {
  const openCvBtn = document.getElementById('openCvBtn');
  const openCvHeaderBtn = document.getElementById('openCvHeaderBtn');
  const cvModalOverlay = document.getElementById('cvModalOverlay');
  const closeCvModalBtn = document.getElementById('closeCvModalBtn');
  const closeCvFooterBtn = document.getElementById('closeCvFooterBtn');

  function openCvModal() {
    cvModalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCvModal() {
    cvModalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  if (openCvBtn) openCvBtn.addEventListener('click', openCvModal);
  if (openCvHeaderBtn) openCvHeaderBtn.addEventListener('click', openCvModal);
  if (closeCvModalBtn) closeCvModalBtn.addEventListener('click', closeCvModal);
  if (closeCvFooterBtn) closeCvFooterBtn.addEventListener('click', closeCvModal);

  cvModalOverlay.addEventListener('click', (e) => {
    if (e.target === cvModalOverlay) closeCvModal();
  });
}

/* --- 7. PROJECT DATA STORE & TECHNICAL SPECS MODAL --- */
const projectsData = {
  'distrito-fitness': {
    title: 'Distrito Fitness Center',
    subtitle: 'CrossFit • Hyrox • Strength • Comunidad Fitness en Medellín',
    category: 'Deporte & Salud (Landing Page Premium)',
    liveUrl: '../distrito-fitness/index.html',
    tech: ['HTML5', 'CSS3 Avanzado', 'JavaScript ES6+', 'Google Fonts (Bebas Neue & Inter)', 'Open Graph SEO'],
    summary: 'Distrito Fitness Center es el centro de entrenamiento funcional líder en Laureles, Medellín. El sitio web fue diseñado con una interfaz de alto impacto visual orientada a la conversión y retención de usuarios.',
    features: [
      'Calculadora interactiva de planes y membresías mensuales/anuales.',
      'Grilla dinámica de horarios y programas de entrenamiento (CrossFit, Hyrox, Strength).',
      'Perfil de coaches certificados con experiencia internacional.',
      'Diseño 100% responsivo optimizado para dispositivos móviles y carga ultrarrápida.',
      'Integración directa de agendamiento de clases de prueba por WhatsApp.'
    ],
    codeSnippet: `// Calculadora de Planes Distrito Fitness
function calculateMembershipPlan(program, months) {
  const baseRates = { crossfit: 220000, hyrox: 190000, strength: 160000 };
  const discount = months >= 6 ? 0.15 : (months >= 3 ? 0.10 : 0);
  const total = baseRates[program] * months * (1 - discount);
  return { monthlyRate: total / months, totalPayable: total };
}`
  },
  'marmoleria-salome': {
    title: 'Marmolería Salomé',
    subtitle: 'Mármol, Granito y Cuarzo Premium en Antioquia',
    category: 'Arquitectura & Superficies de Lujo',
    liveUrl: '../marmoleria-salome/index.html',
    tech: ['HTML5 Semántico', 'Vanilla CSS Grid/Flexbox', 'JavaScript ES6+', 'Playfair Display & Inter'],
    summary: 'Web corporativa elegante y refinada para la empresa Marmolería Salomé ubicada en Barbosa, Antioquia. Destaca por su catálogo visual de mesones para cocina, baños, escaleras y recubrimientos en piedra natural.',
    features: [
      'Cotizador interactivo en tiempo real de superficies según metros cuadrados y tipo de material.',
      'Galería fotográfica con filtros por tipo de piedra (Mármol Carrara, Granito San Gabriel, Cuarzo Calacatta).',
      'Demostración visual de acabados (brillante, apomazado, rústico).',
      'Formulario de cotización directa y ubicación en mapa con cobertura regional.'
    ],
    codeSnippet: `// Cotizador de Superficies en Tiempo Real
function calculateMarbleQuote(materialPriceM2, widthMeters, lengthMeters, finishType) {
  const area = widthMeters * lengthMeters;
  const finishMultiplier = finishType === 'polished' ? 1.05 : 1.0;
  return (area * materialPriceM2 * finishMultiplier).toLocaleString('es-CO');
}`
  },
  'powergo': {
    title: 'PowerGo - Smart Charging',
    subtitle: 'Red Inteligente de Alquiler de Power Banks',
    category: 'Plataforma Tech / SaaS',
    liveUrl: '../powergo/index.html',
    tech: ['Bootstrap 5', 'JavaScript ES6+', 'Plus Jakarta Sans', 'Bootstrap Icons', 'Interactive Simulator'],
    summary: 'Plataforma web de última generación inspirada en startups de economía compartida. Permite a los usuarios ubicar estaciones de cargadores portátiles en universidades y centros comerciales de Colombia.',
    features: [
      'Mapa interactivo simulado de estaciones de alquiler cercanas.',
      'Calculador y simulador de tarifas por minutos y horas de uso.',
      'Diseño SaaS tecnológico con modo oscuro estilizado y componentes Bootstrap 5 personalizados.',
      'Módulo de preguntas frecuentes y soporte técnico 24/7 en tiempo real.'
    ],
    codeSnippet: `// Simulador de Tiempo y Costo PowerBank
function calculatePowerBankFee(durationMinutes) {
  const freeMinutes = 10;
  if (durationMinutes <= freeMinutes) return 0;
  const billableIntervals = Math.ceil((durationMinutes - freeMinutes) / 30);
  return Math.min(billableIntervals * 2500, 15000); // Capped daily rate
}`
  },
  'pet-service-react': {
    title: 'Pet Service Web App (React + Vite)',
    subtitle: 'Aplicación Web SPA para Servicios Veterinarios Integrales',
    category: 'Aplicación Web React (SPA)',
    liveUrl: '../pet-service-web/dist/index.html',
    tech: ['React.js 18', 'Vite', 'JavaScript ES Modules', 'State Management (useState/useEffect)', 'CSS Modules'],
    summary: 'Aplicación web construida con React.js modularizada en componentes independientes. Ofrece una plataforma completa para la administración de clínicas veterinarias, incluyendo gestión de datos, sedes y blog.',
    features: [
      'Arquitectura basada en componentes reutilizables (Header, Services, AdminDashboard, Emergency, Maps).',
      'Panel de control de administración (AdminDashboard) para gestionar servicios y doctores en línea.',
      'Gestión de estado global y persistencia de información simulada.',
      'Compilación súper rápida con Vite y renderizado óptimo de componentes.'
    ],
    codeSnippet: `// React Component State Manager
import React, { useState } from 'react';

export default function AdminDashboard({ initialServices }) {
  const [services, setServices] = useState(initialServices);
  return (
    <div className="admin-grid">
      {services.map(s => <ServiceCard key={s.id} item={s} />)}
    </div>
  );
}`
  },
  'pets-and-friends': {
    title: 'Pets and Friends House',
    subtitle: 'Centro Veterinario Integral en Laureles, Medellín',
    category: 'Salud & Cuidado de Mascotas',
    liveUrl: '../pets-and-friends-house/index.html',
    tech: ['HTML5', 'CSS Custom Properties', 'JavaScript Interactivo', 'Outfit & Plus Jakarta Fonts'],
    summary: 'Plataforma web médica para el centro veterinario Pets and Friends House. Diseñada con un enfoque humano y acogedor para los dueños de mascotas en Medellín.',
    features: [
      'Sistema de agendamiento de citas médicas y procedimientos quirúrgicos.',
      'Sección dedicada de urgencias veterinarias 24/7 con botón de llamadas de un toque.',
      'Testimonios interactivos de clientes y casos clínicos de éxito.',
      'Optimización SEO local para búsquedas en Medellín y Laureles.'
    ],
    codeSnippet: `// Agendamiento de Citas Veterinarias
function scheduleVetAppointment(petName, serviceType, date, time) {
  return {
    confirmationCode: 'PFH-' + Math.floor(Math.random() * 90000 + 10000),
    details: \`Cita reservada para \${petName} en \${serviceType} el \${date} a las \${time}\`
  };
}`
  }
};

function openProjectModal(projectKey) {
  const project = projectsData[projectKey];
  if (!project) return;

  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalTitle = document.getElementById('modalProjectTitle');
  const modalBody = document.getElementById('modalProjectBody');

  modalTitle.textContent = project.title;

  modalBody.innerHTML = `
    <div class="modal-project-content">
      <div class="modal-project-badge-bar">
        <span class="project-category-tag">${project.category}</span>
        <span class="modal-project-subtitle">${project.subtitle}</span>
      </div>

      <p class="modal-project-summary">${project.summary}</p>

      <div class="modal-project-section" style="margin-bottom: 1.5rem;">
        <button class="btn btn-primary" onclick="closeProjectModal(); openLiveDemoModal('${projectKey}');">
          <i class="fa-solid fa-eye"></i> Probar Demo en Vivo Interactiva
        </button>
      </div>

      <div class="modal-project-section">
        <h4><i class="fa-solid fa-code"></i> Tecnologías Utilizadas</h4>
        <div class="project-tech-tags">
          ${project.tech.map(t => `<span class="tech-tag">${t}</span>`).join('')}
        </div>
      </div>

      <div class="modal-project-section">
        <h4><i class="fa-solid fa-star"></i> Características Principales</h4>
        <ul class="modal-features-list">
          ${project.features.map(f => `<li><i class="fa-solid fa-check-circle"></i> ${f}</li>`).join('')}
        </ul>
      </div>

      <div class="modal-project-section">
        <h4><i class="fa-solid fa-laptop-code"></i> Fragmento de Código Destacado</h4>
        <pre class="code-snippet-box"><code>${escapeHtml(project.codeSnippet)}</code></pre>
      </div>
    </div>
  `;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  const closeBtn = document.getElementById('closeProjectModalBtn');
  const closeFooterBtn = document.getElementById('closeProjectModalFooterBtn');

  function closeProjectModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  closeBtn.onclick = closeProjectModal;
  closeFooterBtn.onclick = closeProjectModal;

  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeProjectModal();
  };
}

/* --- 8. LIVE DEMO INTERACTIVE IFRAME MODAL HANDLER --- */
function initLiveDemoModal() {
  const liveDemoModalOverlay = document.getElementById('liveDemoModalOverlay');
  const closeLiveDemoBtn = document.getElementById('closeLiveDemoBtn');
  const liveDemoIframe = document.getElementById('liveDemoIframe');
  const demoUrlText = document.getElementById('demoUrlText');
  const openNewTabBtn = document.getElementById('openNewTabBtn');
  const reloadIframeBtn = document.getElementById('reloadIframeBtn');
  const deviceBtns = document.querySelectorAll('.device-btn');

  // Device Sizing Switcher
  deviceBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      deviceBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const width = btn.getAttribute('data-viewport');
      liveDemoIframe.style.width = width;
    });
  });

  if (reloadIframeBtn && liveDemoIframe) {
    reloadIframeBtn.addEventListener('click', () => {
      const currentUrl = liveDemoIframe.src.split('?')[0];
      liveDemoIframe.src = currentUrl + '?v=' + Date.now();
    });
  }

  function closeLiveDemoModal() {
    liveDemoModalOverlay.classList.remove('active');
    liveDemoIframe.src = 'about:blank';
    document.body.style.overflow = 'auto';
  }

  if (closeLiveDemoBtn) closeLiveDemoBtn.addEventListener('click', closeLiveDemoModal);

  liveDemoModalOverlay.addEventListener('click', (e) => {
    if (e.target === liveDemoModalOverlay) closeLiveDemoModal();
  });
}

function openLiveDemoModal(projectKey) {
  const project = projectsData[projectKey];
  if (!project) return;

  const liveDemoModalOverlay = document.getElementById('liveDemoModalOverlay');
  const liveDemoIframe = document.getElementById('liveDemoIframe');
  const demoUrlText = document.getElementById('demoUrlText');
  const openNewTabBtn = document.getElementById('openNewTabBtn');

  // Load Iframe with relative project path and fresh timestamp
  const cacheBuster = '?v=' + Date.now();
  liveDemoIframe.src = project.liveUrl + cacheBuster;
  demoUrlText.textContent = `http://127.0.0.1:8085/${project.liveUrl.replace('../', '')}`;
  openNewTabBtn.href = project.liveUrl;

  liveDemoModalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

/* Helper to escape HTML characters in code snippets */
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/* --- 9. CONTACT FORM HANDLER --- */
function handleContactSubmit(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const successMsg = document.getElementById('formSuccessMessage');
  successMsg.classList.remove('hidden');

  // Format WhatsApp message redirect
  const waText = encodeURIComponent(
    `Hola Santiago, mi nombre es *${name}* (${email}).\n*Asunto:* ${subject}\n*Mensaje:* ${message}`
  );

  setTimeout(() => {
    window.open(`https://wa.me/573022846004?text=${waText}`, '_blank');
  }, 1200);
}
