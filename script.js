const projects = [
  {
    type: 'Restaurante',
    name: 'Sémola Pan & Café',
    location: 'San Andrés Cholula, Puebla',
    specs: [
      '24 paneles de 555 W',
      '1 inversor central 10 KW',
      'Estructura para lámina trapezoidal',
      'Monitoreo inteligente'
    ],
    generation: '2,077 kWh'
  },
  {
    type: 'Taller de cocina',
    name: 'Sémola Pan & Café',
    location: 'San Andrés Cholula, Puebla',
    specs: [
      '8 paneles de 555 W',
      '2 micro-inversores de 2 KW',
      'Estructura de aluminio anodizado con inclinación',
      'Monitoreo inteligente'
    ],
    generation: '692 kWh'
  },
  {
    type: 'Escuela',
    name: 'Liceo Iberomexicano',
    location: 'Costa Azul, Acapulco, Gro.',
    specs: [
      '92 paneles de 555 W',
      '14 micro-inversores de 2 KW',
      '2 inversores centrales de 10 KW',
      'Estructura UNIRAC sobre techo multipanel'
    ],
    generation: '7,965 kWh'
  },
  {
    type: 'Restaurante',
    name: 'La Casa de Tere',
    location: 'Costa Azul, Acapulco, Gro.',
    specs: [
      '50 paneles de 555 W',
      '2 inversores centrales de 10 KW',
      'Estructura UNIRAC con soportes de aluminio',
      'Monitoreo inteligente'
    ],
    generation: '4,329 kWh'
  },
  {
    type: 'Reacondicionamiento',
    name: 'Buffet Altamirano',
    location: 'Costa Azul, Acapulco, Gro.',
    specs: [
      '30 paneles de 325 W',
      '1 inversor central de 8 KW',
      'Corrección post-huracán Otis',
      'Estructura con soportes de aluminio'
    ],
    generation: '1,521 kWh'
  },
  {
    type: 'Residencial',
    name: 'Casa Fraccionamiento Oliva',
    location: 'San Andrés Cholula, Puebla',
    specs: [
      '4 paneles de 555 W',
      '1 micro-inversor de 2 KW',
      'Estructura UNIRAC de aluminio anodizado',
      'Monitoreo inteligente'
    ],
    generation: '346 kWh'
  },
  {
    type: 'Escuela',
    name: 'Miguel de Cervantes',
    location: 'Santa Cruz, Guadalupe, Puebla',
    specs: [
      '24 paneles de 450 W',
      '1 inversor central de 10 KW',
      'Estructura con soportes de aluminio anodizado',
      'Monitoreo inteligente'
    ],
    generation: '1,684 kWh'
  },
  {
    type: 'Residencial',
    name: 'Casa San Jerónimo',
    location: 'Magdalena Contreras, CDMX',
    specs: [
      '24 paneles de 550 W',
      '6 micro-inversores de 2 KW',
      'Estructura UNIRAC con soportes de aluminio',
      'Monitoreo inteligente'
    ],
    generation: '2,059 kWh'
  }
];

function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => {
    const value = p.generation.replace(/[^\d]/g, '');
    const suffix = p.generation.replace(/^[\d,]+/, '');
    return `
    <article class="project-card reveal" style="--i:${i % 4}">
      <div class="project-header">
        <span class="project-type">${p.type}</span>
        <h3>${p.name}</h3>
        <p class="project-location">${p.location}</p>
      </div>
      <ul class="project-specs">
        ${p.specs.map(s => `<li>${s}</li>`).join('')}
      </ul>
      <div class="project-generation">
        <div>
          <strong class="count" data-count="${value}" data-suffix="${suffix}">${p.generation}</strong>
          <span>Generación mensual promedio</span>
        </div>
      </div>
    </article>
  `;
  }).join('');
}

function renderPortfolioMobile() {
  const container = document.getElementById('portfolio-mobile');
  if (!container) return;

  container.innerHTML = `
    <div class="portfolio-mobile-actions">
      <a href="assets/portafolio-solar-joy.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-full">
        Ver PDF completo
      </a>
      <a href="assets/portafolio-solar-joy.pdf" download class="btn btn-outline btn-full">
        Descargar portafolio
      </a>
    </div>
  `;
}

function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');

  toggle?.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });

  links?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      links.classList.remove('open');
      toggle?.setAttribute('aria-expanded', 'false');
    });
  });
}

function initPdfFullscreen() {
  const btn = document.getElementById('pdf-fullscreen');
  const wrapper = document.querySelector('.pdf-viewer-wrapper');

  btn?.addEventListener('click', () => {
    const isFullscreen = wrapper.classList.toggle('fullscreen');
    btn.textContent = isFullscreen ? 'Salir pantalla completa' : 'Pantalla completa';
    document.body.style.overflow = isFullscreen ? 'hidden' : '';
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrapper?.classList.contains('fullscreen')) {
      wrapper.classList.remove('fullscreen');
      btn.textContent = 'Pantalla completa';
      document.body.style.overflow = '';
    }
  });
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const loadedAtField = document.getElementById('loadedAt');
  if (loadedAtField) loadedAtField.value = String(Date.now());

  const status = document.getElementById('form-status');
  const submitBtn = form.querySelector('button[type="submit"]');
  const submitLabel = submitBtn?.querySelector('.btn-label');

  function setStatus(message, kind) {
    if (!status) return;
    status.textContent = message;
    status.classList.remove('is-success', 'is-error');
    if (kind) status.classList.add(kind === 'success' ? 'is-success' : 'is-error');
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    submitBtn.disabled = isLoading;
    if (submitLabel) submitLabel.textContent = isLoading ? 'Enviando…' : 'Enviar mensaje';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payload = {
      nombre: document.getElementById('nombre').value.trim(),
      email: document.getElementById('email').value.trim(),
      telefono: document.getElementById('telefono').value.trim(),
      mensaje: document.getElementById('mensaje').value.trim(),
      hp: document.getElementById('empresa').value,
      loadedAt: loadedAtField?.value,
    };

    setLoading(true);
    setStatus('', null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus('Mensaje enviado. Te contactaremos pronto para tu cotización.', 'success');
        form.reset();
        if (loadedAtField) loadedAtField.value = String(Date.now());
      } else {
        setStatus(data.error || 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.', 'error');
      }
    } catch (err) {
      setStatus('No hay conexión. Intenta de nuevo o escríbenos por WhatsApp.', 'error');
    } finally {
      setLoading(false);
    }
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');

  window.addEventListener('scroll', () => {
    header.classList.toggle('is-scrolled', window.scrollY > 80);
  }, { passive: true });
}

// Small "sun-arc" glyph reused as a living eyebrow marker next to every
// section label — a dot travels the arc via CSS offset-path, echoing the
// sun's daily path (the thing that makes the whole business possible).
const ARC_ICON = `
  <svg class="label-arc" viewBox="0 0 28 16" aria-hidden="true" focusable="false">
    <path class="label-arc-path" d="M 1,15 A 13,13 0 0 1 27,15" />
    <circle class="label-arc-sun" cx="14" cy="3" r="2" />
  </svg>
`;

function injectArcIcons() {
  document.querySelectorAll('.section-label').forEach(el => {
    el.insertAdjacentHTML('afterbegin', ARC_ICON);
  });
}

function initReveal() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (!('IntersectionObserver' in window)) {
    targets.forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (Number.isNaN(target)) return;

  const duration = 1400;
  const start = performance.now();
  const format = n => Math.round(n).toLocaleString('es-MX');

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = format(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }

  requestAnimationFrame(tick);
}

function initCountUp() {
  const counters = document.querySelectorAll('.count[data-count]');
  if (!counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(el => observer.observe(el));
  }
  // If reduced-motion or no IO support, leave the static server-rendered value as-is.
}

// ---------------------------------------------------------------------------
// Calculadora de ahorro solar — toda la lógica vive aquí; todos los números
// de negocio (tarifas, costos, factores) viven en calculator-config.js.
// ---------------------------------------------------------------------------

const MXN_FORMATTER = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
});

const NUM_FORMATTER = new Intl.NumberFormat('es-MX', { maximumFractionDigits: 0 });

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function calcularAhorro({ modo, valor, config }) {
  const consumoMensualKwh = modo === 'kwh' ? valor : valor / config.precioPromedioPorKwh;
  const gastoMensualMxn = modo === 'pesos' ? valor : valor * config.precioPromedioPorKwh;

  const ahorroMensualKwh = consumoMensualKwh * config.ahorroObjetivoPorcentaje;
  const ahorroMensualMxn = gastoMensualMxn * config.ahorroObjetivoPorcentaje;
  const ahorroAnualMxn = ahorroMensualMxn * 12;

  const tamanoSistemaKw = clamp(
    ahorroMensualKwh / config.generacionKwhPorKwMes,
    config.sistemaMinKw,
    config.sistemaMaxKw
  );

  const co2EvitadoAnualKg = ahorroMensualKwh * 12 * config.co2KgPorKwh;

  // El payback depende de un costo por kW que NO tiene respaldo en datos
  // reales del sitio (ver calculator-config.js) — si en algún momento se
  // decide no mostrar un número de retorno hasta tener cotizaciones reales,
  // basta con poner costoPorKwMxn en 0/null y esta función deja de calcularlo.
  const costoEstimadoMxn = config.costoPorKwMxn ? tamanoSistemaKw * config.costoPorKwMxn : null;
  const paybackAnios = costoEstimadoMxn && ahorroAnualMxn > 0 ? costoEstimadoMxn / ahorroAnualMxn : null;

  return {
    ahorroMensualMxn,
    ahorroAnualMxn,
    ahorroPorcentaje: config.ahorroObjetivoPorcentaje,
    tamanoSistemaKw,
    co2EvitadoAnualKg,
    paybackAnios,
  };
}

function initCalculator() {
  const form = document.querySelector('.calc-form');
  if (!form || typeof CALC_CONFIG === 'undefined') return;

  const modoInputs = form.querySelectorAll('input[name="calc-modo"]');
  const valorLabel = document.getElementById('calc-valor-label');
  const valorRange = document.getElementById('calc-valor-range');
  const valorNumber = document.getElementById('calc-valor');
  const inmuebleSelect = document.getElementById('calc-inmueble');

  const out = {
    ahorroMensual: document.getElementById('calc-ahorro-mensual'),
    ahorroAnual: document.getElementById('calc-ahorro-anual'),
    tamano: document.getElementById('calc-tamano'),
    co2: document.getElementById('calc-co2'),
    payback: document.getElementById('calc-payback'),
  };

  const ctaForm = document.getElementById('calc-cta-form');
  const ctaWhatsapp = document.getElementById('calc-cta-whatsapp');

  const MODES = {
    pesos: { label: 'Gasto mensual de luz (MXN)', min: 300, max: 15000, step: 50, default: 1500 },
    kwh: { label: 'Consumo mensual (kWh)', min: 100, max: 4000, step: 25, default: 450 },
  };

  function currentMode() {
    return form.querySelector('input[name="calc-modo"]:checked')?.value || 'pesos';
  }

  function applyModeUI(mode) {
    modoInputs.forEach(input => {
      input.closest('.calc-toggle-option')?.classList.toggle('is-active', input.value === mode);
    });

    const spec = MODES[mode];
    valorLabel.textContent = spec.label;
    valorRange.min = spec.min;
    valorRange.max = spec.max;
    valorRange.step = spec.step;
    valorNumber.step = spec.step;
    valorNumber.min = spec.min;
    if (Number(valorNumber.value) < spec.min || Number(valorNumber.value) > spec.max) {
      valorRange.value = spec.default;
      valorNumber.value = spec.default;
    }
  }

  function currentPayload() {
    return {
      modo: currentMode(),
      valor: Number(valorNumber.value) || 0,
      tipoInmueble: inmuebleSelect.value,
    };
  }

  function buildQuoteMessage({ modo, valor, tipoInmueble }, result) {
    const consumo = modo === 'pesos'
      ? `un gasto mensual de ${MXN_FORMATTER.format(valor)}`
      : `un consumo mensual de ${NUM_FORMATTER.format(valor)} kWh`;
    return `Hola, usé la calculadora de Solar Joy con ${consumo} (inmueble ${tipoInmueble}). `
      + `Me dio un estimado de ${MXN_FORMATTER.format(result.ahorroMensualMxn)}/mes de ahorro `
      + `y un sistema de ~${result.tamanoSistemaKw.toFixed(1)} kW. Quiero una cotización.`;
  }

  function render() {
    const payload = currentPayload();
    const result = calcularAhorro({ modo: payload.modo, valor: payload.valor, config: CALC_CONFIG });

    out.ahorroMensual.textContent = MXN_FORMATTER.format(result.ahorroMensualMxn);
    out.ahorroAnual.textContent = `${MXN_FORMATTER.format(result.ahorroAnualMxn)} (${Math.round(result.ahorroPorcentaje * 100)}%)`;
    out.tamano.textContent = `${result.tamanoSistemaKw.toFixed(1)} kW`;
    out.co2.textContent = `${NUM_FORMATTER.format(result.co2EvitadoAnualKg)} kg`;
    out.payback.textContent = result.paybackAnios
      ? `~${result.paybackAnios.toFixed(1)} años`
      : 'Con cotización personalizada';

    const message = buildQuoteMessage(payload, result);
    if (ctaWhatsapp) {
      ctaWhatsapp.href = `https://wa.me/522225132595?text=${encodeURIComponent(message)}`;
    }
    if (ctaForm) {
      ctaForm.dataset.message = message;
    }
  }

  modoInputs.forEach(input => {
    input.addEventListener('change', () => {
      applyModeUI(input.value);
      render();
    });
  });

  valorRange.addEventListener('input', () => {
    valorNumber.value = valorRange.value;
    render();
  });

  valorNumber.addEventListener('input', () => {
    valorRange.value = clamp(Number(valorNumber.value) || 0, Number(valorRange.min), Number(valorRange.max));
    render();
  });

  inmuebleSelect.addEventListener('change', render);

  ctaForm?.addEventListener('click', () => {
    const mensaje = document.getElementById('mensaje');
    if (mensaje && ctaForm.dataset.message) {
      mensaje.value = ctaForm.dataset.message;
    }
  });

  applyModeUI(currentMode());
  render();
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderPortfolioMobile();
  injectArcIcons();
  initNav();
  initPdfFullscreen();
  initContactForm();
  initHeaderScroll();
  initReveal();
  initCountUp();
  initCalculator();
});
