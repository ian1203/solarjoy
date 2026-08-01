// Vercel serverless function (Node runtime, zero dependencies — calls the
// Resend REST API directly with fetch instead of pulling in an SDK).
//
// Required env var (set in Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY   — from https://resend.com/api-keys
// Optional:
//   RESEND_FROM       — verified sender, e.g. "Solar Joy <cotizaciones@solarjoy.mx>"
//                        Defaults to Resend's shared sandbox sender, which only
//                        delivers reliably to the account owner's own inbox —
//                        fine for testing, NOT for production. Verify a real
//                        domain in Resend before launch.
//   CONTACT_TO_EMAIL  — where leads land. Defaults to the address already on the site.

const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'ernesto.hernandezbz@gmail.com';
const FROM_EMAIL = process.env.RESEND_FROM || 'Solar Joy <onboarding@resend.dev>';
const MIN_SUBMIT_MS = 2000; // reject submissions faster than a human could plausibly type

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Método no permitido.' });
  }

  const body = req.body || {};
  const { nombre, email, telefono, mensaje, hp, loadedAt } = body;

  // Honeypot: real visitors never fill this hidden field. Bots that
  // autofill every input do — reply success so they don't retry smarter.
  if (hp) {
    return res.status(200).json({ ok: true });
  }

  // Timing check: a submission faster than MIN_SUBMIT_MS after page load
  // is almost certainly scripted, not a person reading the form.
  const elapsed = Date.now() - Number(loadedAt || 0);
  if (!loadedAt || Number.isNaN(elapsed) || elapsed < MIN_SUBMIT_MS) {
    return res.status(400).json({ ok: false, error: 'No pudimos procesar tu solicitud. Intenta de nuevo.' });
  }

  if (!nombre || !mensaje || !email || !isValidEmail(email)) {
    return res.status(400).json({ ok: false, error: 'Revisa que tu nombre, correo y mensaje estén completos.' });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY no está configurada en Vercel.');
    return res.status(500).json({ ok: false, error: 'El formulario no está disponible en este momento. Escríbenos por WhatsApp mientras lo resolvemos.' });
  }

  const text = [
    `Nombre: ${nombre}`,
    `Correo: ${email}`,
    `Teléfono: ${telefono || 'No proporcionado'}`,
    '',
    'Mensaje:',
    mensaje,
  ].join('\n');

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `Cotización Solar Joy — ${nombre}`,
        text,
      }),
    });

    if (!resendRes.ok) {
      const detail = await resendRes.text();
      console.error('Resend error:', resendRes.status, detail);
      return res.status(502).json({ ok: false, error: 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return res.status(500).json({ ok: false, error: 'No pudimos enviar tu mensaje. Intenta de nuevo o escríbenos por WhatsApp.' });
  }
};
