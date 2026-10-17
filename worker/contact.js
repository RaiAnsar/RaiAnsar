// Contact form endpoint for raiansar.com. Route: raiansar.com/api/contact (and www).
// Sends the enquiry to the inbox through Cloudflare Email Service (send_email binding).
const ALLOWED_ORIGINS = ['https://raiansar.com', 'https://www.raiansar.com'];
const TO = 'rai@acefina.com';
const FROM = { email: 'contact@mail.raiansar.com', name: 'raiansar.com contact form' };

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

const clean = (v, max) => String(v ?? '').replace(/[\u0000-\u001f\u007f]+/g, ' ').trim().slice(0, max);

export default {
  async fetch(request, env) {
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
    if (!ALLOWED_ORIGINS.includes(request.headers.get('origin') || '')) {
      return json({ ok: false, error: 'origin' }, 403);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: 'bad_json' }, 400);
    }

    // Honeypot: real visitors never fill this field. Pretend success.
    if (data.website) return json({ ok: true });

    const name = clean(data.name, 120);
    const email = clean(data.email, 200);
    const budget = clean(data.budget, 40);
    const message = String(data.message ?? '').replace(/\u0000/g, '').trim().slice(0, 5000);

    if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return json({ ok: false, error: 'invalid' }, 422);
    }

    const text = `Name: ${name}\nEmail: ${email}\nBudget: ${budget || 'not given'}\n\n${message}\n`;
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const html = `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Budget:</b> ${esc(
      budget || 'not given',
    )}</p><p style="white-space:pre-wrap">${esc(message)}</p>`;

    try {
      await env.EMAIL.send({
        to: TO,
        from: FROM,
        replyTo: email,
        subject: `[raiansar.com] Enquiry from ${name}`,
        text,
        html,
      });
    } catch (err) {
      console.error('send failed', String(err && err.message ? err.message : err));
      return json({ ok: false, error: 'send' }, 502);
    }
    return json({ ok: true });
  },
};
