const projects = [
  {
    type: 'Restaurante',
    name: 'Sémpola Pan & Café',
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
    name: 'Sémpola Pan & Café',
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

  grid.innerHTML = projects.map(p => `
    <article class="project-card">
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
          <strong>${p.generation}</strong>
          <span>Generación mensual promedio</span>
        </div>
      </div>
    </article>
  `).join('');
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

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const telefono = document.getElementById('telefono').value;
    const mensaje = document.getElementById('mensaje').value;

    const subject = encodeURIComponent(`Cotización Solar Joy — ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nCorreo: ${email}\nTeléfono: ${telefono || 'No proporcionado'}\n\nMensaje:\n${mensaje}`
    );

    window.location.href = `mailto:ernesto.hernandezbz@gmail.com?subject=${subject}&body=${body}`;
  });
}

function initHeaderScroll() {
  const header = document.querySelector('.header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (current > 80) {
      header.style.background = 'rgba(10, 15, 13, 0.95)';
    } else {
      header.style.background = 'rgba(10, 15, 13, 0.85)';
    }
    lastScroll = current;
  }, { passive: true });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  initNav();
  initPdfFullscreen();
  initContactForm();
  initHeaderScroll();
});
