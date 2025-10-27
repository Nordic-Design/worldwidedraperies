import nodemailer from 'nodemailer';

// Create reusable transporter
export function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secureEnv = (process.env.SMTP_SECURE || '').toLowerCase() === 'true';
  const secure = secureEnv || port === 465; // SSL on 465, STARTTLS on 587
  const requireTLS = !secure; // only require STARTTLS when not using implicit TLS

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
Colors: ${data.colors}
Fills: ${data.fills}

${data.notes ? `Notes:\n${data.notes}` : 'No notes provided'}
    `.trim(),
    html: `
      <h2>Pattern Request</h2>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      ${data.organization ? `<p><strong>Organization:</strong> ${data.organization}</p>` : ''}
      
      <h3>Pattern Details</h3>
      <p><strong>Pattern Name:</strong> ${data.patternName}</p>
      <p><strong>Colors:</strong> ${data.colors}</p>
      <p><strong>Fills:</strong> ${data.fills}</p>
      
      ${data.notes ? `<p><strong>Notes:</strong><br>${data.notes}</p>` : ''}
      
      ${data.imageDataUrl ? '<p><em>Pattern preview image attached</em></p>' : ''}
    `,
    attachments: data.imageDataUrl ? [
      {
        filename: `${data.patternName}-preview.png`,
        path: data.imageDataUrl,
      }
    ] : [],
  };

  await transporter.sendMail(mailOptions);
}

