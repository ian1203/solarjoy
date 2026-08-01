// Cookie consent (LFPDPPP-style: aceptar / rechazar / configurar).
// Analytics only loads after explicit consent — nothing tracking-related
// runs before the visitor chooses.
//
// Analytics provider: Vercel Web Analytics — chosen because it needs no
// npm dependency or build step (fits this static site) and Vercel serves
// it automatically once "Web Analytics" is turned on for the project in
// the Vercel dashboard (Project → Analytics). If GA4 is preferred instead,
// swap the body of loadAnalyticsScript() for the standard gtag.js snippet;
// the consent gating logic below doesn't need to change.
(function () {
  const STORAGE_KEY = 'sj-consent';

  function getStoredConsent() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY));
    } catch {
      return null;
    }
  }

  function storeConsent(analytics) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, ts: Date.now() }));
    } catch {
      // localStorage unavailable (private mode, etc.) — consent still
      // applies for this page view, just won't persist across visits.
    }
  }

  function loadAnalyticsScript() {
    if (document.getElementById('vercel-analytics-script')) return;
    const script = document.createElement('script');
    script.id = 'vercel-analytics-script';
    script.src = '/_vercel/insights/script.js';
    script.defer = true;
    document.head.appendChild(script);
  }

  function init() {
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;

    const acceptBtn = document.getElementById('cookie-accept');
    const rejectBtn = document.getElementById('cookie-reject');
    const configureBtn = document.getElementById('cookie-configure');
    const settings = document.getElementById('cookie-settings');
    const analyticsToggle = document.getElementById('cookie-analytics-toggle');
    const saveBtn = document.getElementById('cookie-save');
    const reopenLink = document.getElementById('cookie-preferences-link');

    function showBanner() {
      banner.hidden = false;
    }

    function hideBanner() {
      banner.hidden = true;
      settings.hidden = true;
      configureBtn.setAttribute('aria-expanded', 'false');
    }

    function applyConsent(consent) {
      if (consent?.analytics) loadAnalyticsScript();
    }

    const existing = getStoredConsent();
    if (existing) {
      applyConsent(existing);
    } else {
      showBanner();
    }

    acceptBtn.addEventListener('click', () => {
      storeConsent(true);
      applyConsent({ analytics: true });
      hideBanner();
    });

    rejectBtn.addEventListener('click', () => {
      storeConsent(false);
      hideBanner();
    });

    configureBtn.addEventListener('click', () => {
      const isOpen = !settings.hidden;
      settings.hidden = isOpen;
      configureBtn.setAttribute('aria-expanded', String(!isOpen));
      if (!isOpen) {
        const current = getStoredConsent();
        analyticsToggle.checked = !!current?.analytics;
      }
    });

    saveBtn.addEventListener('click', () => {
      const analytics = analyticsToggle.checked;
      storeConsent(analytics);
      applyConsent({ analytics });
      hideBanner();
    });

    reopenLink?.addEventListener('click', () => {
      showBanner();
      settings.hidden = false;
      configureBtn.setAttribute('aria-expanded', 'true');
      const current = getStoredConsent();
      analyticsToggle.checked = !!current?.analytics;
      banner.scrollIntoView({ behavior: 'smooth', block: 'end' });
      acceptBtn.focus();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
