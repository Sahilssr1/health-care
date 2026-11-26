import PDFDocument from 'pdfkit';
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';

export const PASS_VERSION = 'BHC2026-PASS-1';

export type PassParticipant = {
  reference: string;
  fullName: string;
  mobile: string;
  institution: string;
  category: string;
  interest?: string | null;
  amountPaid?: number;
  paymentId?: string | null;
  registrationStatus?: string;
};

const passRoot = () => path.join(process.cwd(), 'assets', 'pass');
const logosRoot = () => path.join(process.cwd(), 'public', 'logos');

const clean = (value: string) =>
  value
    .normalize('NFC')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const fonts = {
  regular: 'NotoSans-Regular.ttf',
  bold: 'NotoSans-Bold.ttf',
  hindi: 'NotoSansDevanagari-Regular.ttf',
};

function runs(value: string, bold = false) {
  const result: { text: string; font: string }[] = [];
  for (const { segment } of new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(value)) {
    const font = /[\u0900-\u097f]/u.test(segment) ? 'hindi' : bold ? 'bold' : 'regular';
    if (result.at(-1)?.font === font) result.at(-1)!.text += segment;
    else result.push({ font, text: segment });
  }
  return result;
}

function width(doc: PDFKit.PDFDocument, value: string, size: number, bold = false) {
  return runs(value, bold).reduce(
    (sum, r) => sum + doc.font(r.font).fontSize(size).widthOfString(r.text),
    0
  );
}

function wrap(doc: PDFKit.PDFDocument, value: string, size: number, maxWidth: number, bold = false) {
  const lines: string[] = [];
  let line = '';
  for (const word of value.match(/\S+\s*/gu) || ['']) {
    if (width(doc, line + word, size, bold) <= maxWidth) {
      line += word;
      continue;
    }
    if (line.trim()) {
      lines.push(line.trimEnd());
      line = '';
    }
    if (width(doc, word, size, bold) <= maxWidth) {
      line = word;
      continue;
    }
    for (const { segment } of new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(word)) {
      if (line && width(doc, line + segment, size, bold) > maxWidth) {
        lines.push(line);
        line = '';
      }
      line += segment;
    }
  }
  if (line.trim()) lines.push(line.trimEnd());
  return lines;
}

function textBox(
  doc: PDFKit.PDFDocument,
  value: string,
  x: number,
  y: number,
  w: number,
  h: number,
  { size = 14, min = 8.5, bold = false, color = '#10376b' } = {}
) {
  const text = clean(value) || 'Not provided';
  let selected = size;
  let lines = wrap(doc, text, selected, w, bold);
  while (lines.length * selected * 1.35 > h && selected > min) {
    selected = Math.max(min, selected - 0.5);
    lines = wrap(doc, text, selected, w, bold);
  }
  if (lines.length * selected * 1.35 > h) {
    throw new Error('Pass text does not fit the fixed template.');
  }
  doc.fillColor(color);
  for (const [i, line] of lines.entries()) {
    let cursor = x;
    for (const run of runs(line, bold)) {
      doc
        .font(run.font)
        .fontSize(selected)
        .text(run.text, cursor, y + i * selected * 1.35 + selected, {
          lineBreak: false,
          baseline: 'alphabetic',
        });
      cursor += doc.widthOfString(run.text);
    }
  }
}

function label(doc: PDFKit.PDFDocument, value: string, x: number, y: number) {
  doc
    .font('bold')
    .fontSize(7.5)
    .fillColor('#587388')
    .text(value, x, y, { lineBreak: false, characterSpacing: 0.8 });
}

function findFontPath(filename: string): string | null {
  const candidatePaths = [
    path.join(passRoot(), 'fonts', filename),
    path.join(process.cwd(), 'assets', 'pass', 'fonts', filename),
    path.join(__dirname, '..', 'assets', 'pass', 'fonts', filename),
    path.join('/app', 'assets', 'pass', 'fonts', filename),
    path.join(process.cwd(), 'public', 'fonts', filename),
  ];
  for (const p of candidatePaths) {
    if (existsSync(p)) return p;
  }
  return null;
}

function resolveLogoPath(filename: string): string | null {
  const candidateDirs = [
    passRoot(),
    logosRoot(),
    path.join(process.cwd(), 'assets', 'pass'),
    path.join(process.cwd(), 'public', 'logos'),
    path.join(__dirname, '..', 'assets', 'pass'),
    path.join(__dirname, '..', 'public', 'logos'),
    '/app/assets/pass',
    '/app/public/logos',
  ];
  for (const dir of candidateDirs) {
    const full = path.join(dir, filename);
    if (existsSync(full)) return full;
  }
  return null;
}

export function createDigitalPass(participant: PassParticipant): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({
        size: 'A4',
        margin: 0,
        bufferPages: true,
        autoFirstPage: true,
        info: {
          Title: 'Bihar Healthcare Conclave 2026 - Digital Registration Pass',
          Author: 'QualiNova Solutions Pvt. Ltd.',
          Subject: 'Personalised registration acknowledgement',
          Creator: 'Bihar Healthcare Conclave',
        },
      });

      const chunks: Buffer[] = [];
      doc.on('data', (c) => chunks.push(Buffer.from(c)));
      doc.on('error', reject);
      doc.on('end', () => resolve(Buffer.concat(chunks)));

      for (const [name, file] of Object.entries(fonts)) {
        const found = findFontPath(file);
        if (found) {
          try {
            doc.registerFont(name, found);
          } catch {
            const fallback = name === 'bold' ? 'Helvetica-Bold' : 'Helvetica';
            doc.registerFont(name, fallback);
          }
        } else {
          const fallback = name === 'bold' ? 'Helvetica-Bold' : 'Helvetica';
          doc.registerFont(name, fallback);
        }
      }

      // Page Background & Top Navy Accent Bar
      doc.rect(0, 0, 595.28, 841.89).fill('#ffffff');
      doc.rect(0, 0, 595.28, 7).fill('#133d78');

      // 1. Header: Conclave Logo & Date Lockup
      const conclaveLogo = resolveLogoPath('conclave.png');
      if (conclaveLogo) {
        doc.image(readFileSync(conclaveLogo), 34, 24, { fit: [350, 95] });
      }

      doc.roundedRect(438, 24, 123, 88, 12).fill('#ecf5e9');
      textBox(doc, '11 DEC', 453, 34, 93, 26, { size: 19, bold: true, color: '#287b35' });
      textBox(doc, '2026', 453, 62, 93, 28, { size: 22, bold: true, color: '#10376b' });

      // 2. Banner: DIGITAL REGISTRATION PASS
      doc.roundedRect(34, 128, 527, 36, 7).fill('#123d79');
      textBox(doc, 'DIGITAL REGISTRATION PASS', 51, 134, 492, 24, {
        size: 14.5,
        bold: true,
        color: '#ffffff',
      });

      // 3. Event Date & Venue
      doc.roundedRect(34, 172, 527, 44, 7).fill('#f0f6fb');
      label(doc, 'FRIDAY, 11 DECEMBER 2026', 50, 180);
      textBox(doc, 'Urja Auditorium, Patna, Bihar', 50, 193, 490, 19, {
        size: 12,
        bold: true,
        color: '#10376b',
      });

      // 4. Registered Participant Box
      doc.roundedRect(34, 224, 527, 85, 10).fill('#edf6ec');
      label(doc, 'REGISTERED PARTICIPANT', 50, 233);
      textBox(doc, participant.fullName, 50, 249, 494, 52, {
        size: 24,
        min: 12,
        bold: true,
        color: '#10376b',
      });

      // 5. Registration Reference
      doc.roundedRect(34, 317, 527, 42, 7).fill('#f1f6fb');
      label(doc, 'REGISTRATION REFERENCE', 50, 324);
      textBox(doc, participant.reference, 50, 337, 495, 18, {
        size: 11,
        min: 8,
        bold: true,
        color: '#10376b',
      });

      // 6. Company / Organisation / Institution
      doc.roundedRect(34, 367, 527, 62, 7).lineWidth(0.7).strokeColor('#dbe5ec').stroke();
      label(doc, 'COMPANY / ORGANISATION / INSTITUTION', 50, 375);
      textBox(doc, participant.institution, 50, 389, 494, 36, {
        size: 13,
        min: 8.5,
        color: '#10376b',
      });

      // 7. Mobile Number & Participant Category Split
      doc.roundedRect(34, 437, 180, 60, 7).strokeColor('#dbe5ec').stroke();
      doc.roundedRect(224, 437, 337, 60, 7).stroke();
      label(doc, 'MOBILE NUMBER', 50, 445);
      textBox(doc, participant.mobile, 50, 459, 148, 30, {
        size: 13,
        min: 9.5,
        color: '#10376b',
      });
      label(doc, 'PARTICIPANT CATEGORY', 240, 445);
      textBox(doc, participant.category, 240, 459, 305, 30, {
        size: 12,
        min: 6.5,
        color: '#10376b',
      });

      // 8. Important Instructions Section
      doc.roundedRect(34, 505, 527, 62, 7).fill('#fffbeb');
      doc.roundedRect(34, 505, 527, 62, 7).lineWidth(1).strokeColor('#fde68a').stroke();
      doc
        .font('bold')
        .fontSize(8)
        .fillColor('#92400e')
        .text('IMPORTANT INSTRUCTIONS', 50, 513, { lineBreak: false, characterSpacing: 0.8 });
      textBox(
        doc,
        'Please carry a printed copy of this registration confirmation along with a valid government-issued photo ID. Present it at the registration desk for verification and entry.',
        50,
        526,
        494,
        34,
        { size: 9, min: 7.5, bold: false, color: '#78350f' }
      );

      // 9. Official Organisers & Partners Grid (9 Partners in 3x3 layout)
      const partnerRows = [
        // Row 1
        [
          { file: 'qualinova.jpg', fallback: 'qualinova.png', role: 'ORGANISED BY', name: 'QualiNova Solutions', x: 34 },
          { file: 'ima-bihar.jpg', role: 'ORGANISING PARTNER', name: 'IMA Bihar', x: 213 },
          { file: 'tnai-bihar-state-branch.jpg', fallback: 'tnai-bihar-state-branch.png', role: 'ORGANISING PARTNER', name: 'TNAI Bihar State Branch', x: 392 },
        ],
        // Row 2
        [
          { file: 'AICBV.png', role: 'INNOVATION PARTNER', name: 'AIC-Bihar Vidyapith', x: 34 },
          { file: 'dr-cp-thakur.png', role: 'SOCIAL RESPONSIBILITY', name: 'Dr. C.P. Thakur Foundation', x: 213 },
          { file: 'startly-innovations.png', role: 'INNOVATION PARTNER', name: 'Startly Innovations', x: 392 },
        ],
        // Row 3
        [
          { file: 'spark.png', role: 'BRANDING & MARKETING', name: 'Spark Fusion', x: 34 },
          { file: 'novastay.png', role: 'HOSPITALITY PARTNER', name: 'NovaStay', x: 213 },
          { file: 'sutravya-logo.png', role: 'TECHNOLOGY PARTNER', name: 'SUTRAVYA', x: 392 },
        ],
      ];

      const rowYCoordinates = [
        { labelY: 574, logoY: 586, nameY: 618 },
        { labelY: 630, logoY: 642, nameY: 674 },
        { labelY: 686, logoY: 698, nameY: 730 },
      ];

      for (let r = 0; r < partnerRows.length; r++) {
        const row = partnerRows[r];
        const coords = rowYCoordinates[r];

        for (const p of row) {
          doc.font('bold').fontSize(6).fillColor('#587388').text(p.role, p.x, coords.labelY, {
            width: 169,
            align: 'center',
          });

          const pPath = resolveLogoPath(p.file) || (p.fallback ? resolveLogoPath(p.fallback) : null);
          if (pPath) {
            try {
              doc.image(readFileSync(pPath), p.x + 14, coords.logoY, {
                fit: [141, 28],
                align: 'center',
                valign: 'center',
              });
            } catch {
              // Gracefully continue if an image buffer fails
            }
          }

          doc.font('regular').fontSize(6).fillColor('#475569').text(p.name, p.x, coords.nameY, {
            width: 169,
            align: 'center',
          });
        }
      }

      // 10. Deep Blue Bottom Footer
      doc.rect(0, 786, 595.28, 55.89).fill('#123d79');
      doc
        .font('bold')
        .fontSize(10)
        .fillColor('#ffffff')
        .text('biharhealthcareconclave.com', 34, 797, { width: 527, align: 'center' });
      doc
        .font('regular')
        .fontSize(7.5)
        .fillColor('#dbe5ec')
        .text('Registration acknowledgement. Separate programme eligibility applies.', 34, 815, {
          width: 527,
          align: 'center',
        });

      if (doc.bufferedPageRange().count !== 1) {
        throw new Error('Pass must remain one page.');
      }
      doc.end();
    } catch (error) {
      reject(error);
    }
  });
}
