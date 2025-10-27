import nodemailer from 'nodemailer';

// Create reusable transporter
export function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secureEnv = (process.env.SMTP_SECURE || '').toLowerCase() === 'true';
  const requireTLSEnv = (process.env.SMTP_REQUIRE_TLS || '').toLowerCase() === 'true';
  const secure = secureEnv || port === 465; // SSL on 465, STARTTLS on 587
  const requireTLS = requireTLSEnv || !secure; // STARTTLS when not using implicit TLS

  const config: any = {
    host: process.env.SMTP_HOST,
    port,
    secure,
    requireTLS,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // Network Solutions often uses intermediate certs; avoid hard failures
      rejectUnauthorized: false,
      ciphers: 'TLSv1.2',
    },
    // Shorten hangs and provide better diagnostics
    connectionTimeout: 15000, // 15s
    greetingTimeout: 10000,   // 10s
    socketTimeout: 20000,     // 20s
    logger: true,
  };

  console.log('Creating SMTP transporter with config:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: config.requireTLS,
    user: config.auth.user,
  });

  return nodemailer.createTransport(config);
}

// Send contact form email
export async function sendContactEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  phone?: string;
  message?: string;
}) {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: `Contact Form Submission from ${data.firstName} ${data.lastName}`,
    text: `
Contact Form Submission

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
${data.organization ? `Organization: ${data.organization}` : ''}
${data.phone ? `Phone: ${data.phone}` : ''}

Message:
${data.message || 'No message provided'}
    `.trim(),
    html: `
      <h2>Contact Form Submission</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
      ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
      <p><strong>Message:</strong></p>
      <p>${data.message || 'No message provided'}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send pattern request email
export async function sendPatternRequestEmail(data: {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  notes?: string;
  patternName: string;
  colors: string;
  fills: string;
  imageDataUrl?: string;
}) {
  const transporter = createTransporter();

  // Parse colors/fills
  let parsedColors: string[] = [];
  try { parsedColors = JSON.parse(data.colors || '[]'); } catch {}
  const [backgroundColor, foregroundColor, accentColor] = [
    parsedColors?.[0] || '#F9F9F6',
    parsedColors?.[1] || '#C5B8A5',
    parsedColors?.[2] || '#D4AF37',
  ];

  let parsedFills: Record<string, unknown> = {};
  try { parsedFills = JSON.parse(data.fills || '{}'); } catch {}

  // Build inline image attachment at fixed preview size via CID
  let attachments: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  let inlinePreviewHtml = '';
  if (data.imageDataUrl && data.imageDataUrl.startsWith('data:')) {
    try {
      const match = data.imageDataUrl.match(/^data:(.*?);base64,(.*)$/);
      if (match) {
        const contentType = match[1] || 'image/png';
        const base64Data = match[2];
        const contentBuffer = Buffer.from(base64Data, 'base64');
        const contentId = 'pattern-preview@wwd';
        attachments.push({
          filename: `${data.patternName}-preview.png`,
          content: contentBuffer,
          contentType,
          cid: contentId,
        });
        // Fixed size preview in email body
        inlinePreviewHtml = `
          <div style="margin-top:12px">
            <div style="font:14px/1.4 -apple-system,Segoe UI,Arial,sans-serif;color:#444;margin-bottom:6px">Preview (400×240):</div>
            <img src="cid:${contentId}" width="400" height="240" style="display:block;width:400px;height:240px;border:1px solid #eee;border-radius:6px" alt="Pattern preview" />
          </div>
        `;
      }
    } catch {}
  }

  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: process.env.SMTP_TO,
    subject: `Pattern Request: ${data.patternName} from ${data.firstName} ${data.lastName}`,
    text: `
Pattern Request

Name: ${data.firstName} ${data.lastName}
Email: ${data.email}
${data.organization ? `Organization: ${data.organization}` : ''}

Pattern Name: ${data.patternName}
Colors (by role):
  - Background: ${backgroundColor}
  - Foreground: ${foregroundColor}
  - Accent: ${accentColor}
Fills: ${JSON.stringify(parsedFills)}

${data.notes ? `Notes:\n${data.notes}` : 'No notes provided'}
    `.trim(),
    html: `
      <h2>Pattern Request</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
      
      <h3>Pattern Details</h3>
      <p><strong>Pattern Name:</strong> ${data.patternName}</p>
      <ul style="padding-left:16px;margin:8px 0">
        <li><strong>Background:</strong> <span style="display:inline-block;width:10px;height:10px;border:1px solid #ccc;border-radius:2px;background:${backgroundColor};vertical-align:middle;margin-right:6px"></span>${backgroundColor}</li>
        <li><strong>Foreground:</strong> <span style="display:inline-block;width:10px;height:10px;border:1px solid #ccc;border-radius:2px;background:${foregroundColor};vertical-align:middle;margin-right:6px"></span>${foregroundColor}</li>
        <li><strong>Accent:</strong> <span style="display:inline-block;width:10px;height:10px;border:1px solid #ccc;border-radius:2px;background:${accentColor};vertical-align:middle;margin-right:6px"></span>${accentColor}</li>
      </ul>
      <p style="margin:8px 0"><strong>Fills:</strong> <code style="padding:2px 4px;border-radius:4px;background:#f6f6f6">${JSON.stringify(parsedFills)}</code></p>
      ${data.notes ? `<p><strong>Notes:</strong><br>${data.notes}</p>` : ''}
      ${inlinePreviewHtml}
    `,
    attachments,
  } as any;

  await transporter.sendMail(mailOptions);
}

