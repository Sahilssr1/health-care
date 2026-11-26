import { createDigitalPass, PASS_VERSION, type PassParticipant } from './digital-pass';

export async function confirmationMessage(participant: PassParticipant) {
  const content = await createDigitalPass(participant);
  const appOrigin = (process.env.APP_ORIGIN || 'https://biharhealthcareconclave.com').replace(/\/+$/, '');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bihar Healthcare Conclave 2026 — Digital Registration Pass</title>
</head>
<body style="margin: 0; padding: 20px 10px; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #10376b; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td align="center">
        <!-- Main Pass Container (Matches Official Digital Pass Card) -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #dbe5ec; box-shadow: 0 8px 24px rgba(18, 61, 121, 0.08);">
          
          <!-- Top Accent Strip -->
          <tr>
            <td style="height: 6px; background-color: #133d78; font-size: 1px; line-height: 1px;">&nbsp;</td>
          </tr>

          <!-- Inner Body -->
          <tr>
            <td style="padding: 24px 24px 18px;">
              
              <!-- Header: Conclave Logo on Left, Date Badge on Right -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 16px;">
                <tr>
                  <td valign="middle" align="left">
                    <img src="${appOrigin}/logos/conclave.png" alt="Bihar Healthcare Conclave 2026" width="260" style="max-width: 260px; height: auto; display: block;" />
                  </td>
                  <td valign="middle" align="right" width="110">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="background-color: #ecf5e9; border-radius: 10px; text-align: center; width: 100px;">
                      <tr>
                        <td style="padding: 10px 12px; text-align: center;">
                          <div style="font-size: 16px; font-weight: 800; color: #287b35; line-height: 1.1;">11 DEC</div>
                          <div style="font-size: 19px; font-weight: 800; color: #10376b; line-height: 1.2;">2026</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Title Banner -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #123d79; border-radius: 7px; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 10px 16px; text-align: center;">
                    <div style="font-size: 13.5px; font-weight: 800; color: #ffffff; letter-spacing: 1.2px; text-transform: uppercase;">
                      DIGITAL REGISTRATION PASS
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Event Date & Venue Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f0f6fb; border-radius: 7px; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 10px 16px;">
                    <div style="font-size: 9.5px; font-weight: 700; color: #587388; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 3px;">
                      FRIDAY, 11 DECEMBER 2026
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #10376b;">
                      Urja Auditorium, Patna, Bihar
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Registered Participant Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #edf6ec; border-radius: 8px; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 12px 18px;">
                    <div style="font-size: 9.5px; font-weight: 700; color: #587388; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 2px;">
                      REGISTERED PARTICIPANT
                    </div>
                    <div style="font-size: 23px; font-weight: 800; color: #10376b; line-height: 1.2;">
                      ${participant.fullName}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Registration Reference Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f1f6fb; border-radius: 7px; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 10px 16px;">
                    <div style="font-size: 9.5px; font-weight: 700; color: #587388; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 2px;">
                      REGISTRATION REFERENCE
                    </div>
                    <div style="font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 13.5px; font-weight: 800; color: #10376b;">
                      ${participant.reference}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Company / Organisation / Institution Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #dbe5ec; border-radius: 7px; margin-bottom: 12px;">
                <tr>
                  <td style="padding: 10px 16px;">
                    <div style="font-size: 9.5px; font-weight: 700; color: #587388; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 2px;">
                      COMPANY / ORGANISATION / INSTITUTION
                    </div>
                    <div style="font-size: 13.5px; font-weight: 700; color: #10376b;">
                      ${participant.institution}
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Mobile Number & Participant Category Split -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 12px;">
                <tr>
                  <td width="42%" valign="top" style="padding-right: 6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #dbe5ec; border-radius: 7px;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <div style="font-size: 9px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 2px;">
                            MOBILE NUMBER
                          </div>
                          <div style="font-size: 13px; font-weight: 700; color: #10376b;">
                            ${participant.mobile}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td width="58%" valign="top" style="padding-left: 6px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #ffffff; border: 1px solid #dbe5ec; border-radius: 7px;">
                      <tr>
                        <td style="padding: 10px 14px;">
                          <div style="font-size: 9px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 2px;">
                            PARTICIPANT CATEGORY
                          </div>
                          <div style="font-size: 13px; font-weight: 700; color: #10376b;">
                            ${participant.category}
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Important Instructions Box -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #fffbeb; border: 1px solid #fde68a; border-radius: 7px; margin-bottom: 16px;">
                <tr>
                  <td style="padding: 12px 16px;">
                    <div style="font-size: 10px; font-weight: 800; color: #92400e; letter-spacing: 0.8px; text-transform: uppercase; margin-bottom: 4px;">
                      IMPORTANT INSTRUCTIONS
                    </div>
                    <div style="font-size: 11.5px; font-weight: 700; color: #78350f; line-height: 1.45;">
                      Please carry a printed copy of this registration confirmation along with a valid government-issued photo ID. Present it at the registration desk for verification and entry.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Official Partners Strip: 9 Partners in 3x3 Grid (approx 3 logos per row) -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 14px; border-top: 1px solid #e2e8f0; padding-top: 12px;">
                <!-- Row 1: QualiNova, IMA Bihar, TNAI Bihar -->
                <tr>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      ORGANISED BY
                    </div>
                    <img src="${appOrigin}/logos/qualinova.jpg" alt="QualiNova Solutions" width="110" style="max-height: 32px; max-width: 110px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">QualiNova Solutions</div>
                  </td>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      ORGANISING PARTNER
                    </div>
                    <img src="${appOrigin}/logos/ima-bihar.jpg" alt="IMA Bihar" width="100" style="max-height: 32px; max-width: 100px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">IMA Bihar</div>
                  </td>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      ORGANISING PARTNER
                    </div>
                    <img src="${appOrigin}/logos/tnai-bihar-state-branch.jpg" alt="TNAI Bihar State Branch" height="32" style="max-height: 32px; max-width: 100px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">TNAI Bihar State Branch</div>
                  </td>
                </tr>

                <!-- Row 2: AICBV, Dr. C.P. Thakur, Startly Innovations -->
                <tr>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      INNOVATION PARTNER
                    </div>
                    <img src="${appOrigin}/logos/AICBV.png" alt="AIC-Bihar Vidyapith" width="105" style="max-height: 32px; max-width: 105px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">AIC-Bihar Vidyapith</div>
                  </td>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      SOCIAL RESPONSIBILITY
                    </div>
                    <img src="${appOrigin}/logos/dr-cp-thakur.png" alt="Dr. C.P. Thakur Foundation" width="105" style="max-height: 32px; max-width: 105px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">Dr. C.P. Thakur Foundation</div>
                  </td>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      INNOVATION PARTNER
                    </div>
                    <img src="${appOrigin}/logos/startly-innovations.png" alt="Startly Innovations" width="105" style="max-height: 32px; max-width: 105px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">Startly Innovations</div>
                  </td>
                </tr>

                <!-- Row 3: Spark Fusion, NovaStay, Sutravya -->
                <tr>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      BRANDING &amp; MARKETING
                    </div>
                    <img src="${appOrigin}/logos/spark.png" alt="Spark Fusion" width="105" style="max-height: 32px; max-width: 105px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">Spark Fusion</div>
                  </td>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      HOSPITALITY PARTNER
                    </div>
                    <img src="${appOrigin}/logos/novastay.png" alt="NovaStay" width="95" style="max-height: 32px; max-width: 95px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">NovaStay</div>
                  </td>
                  <td width="33.33%" valign="top" align="center" style="padding: 6px 8px;">
                    <div style="font-size: 8px; font-weight: 700; color: #587388; letter-spacing: 0.6px; text-transform: uppercase; margin-bottom: 5px;">
                      TECHNOLOGY PARTNER
                    </div>
                    <img src="${appOrigin}/logos/sutravya-logo.png" alt="SUTRAVYA" width="95" style="max-height: 32px; max-width: 95px; width: auto; height: auto; object-fit: contain; display: block; margin: 0 auto;" />
                    <div style="font-size: 8px; color: #475569; margin-top: 3px; font-weight: 600;">SUTRAVYA</div>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Deep Blue Footer -->
          <tr>
            <td style="background-color: #123d79; padding: 12px 18px 14px; text-align: center; color: #ffffff;">
              <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.5px; margin-bottom: 3px;">
                biharhealthcareconclave.com
              </div>
              <div style="font-size: 9.5px; color: #dbe5ec;">
                Registration acknowledgement. Separate programme eligibility applies.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  const text = `Hello ${participant.fullName},

Your registration has been saved. Your personalised digital registration pass is attached as a PDF.
Reference: ${participant.reference}

Friday, 11 December 2026
Urja Auditorium, Patna, Bihar

IMPORTANT INSTRUCTIONS:
Please carry a printed copy of this registration confirmation along with a valid government-issued photo ID. Present it at the registration desk for verification and entry.

Participant Details:
- Name: ${participant.fullName}
- Category: ${participant.category}
- Institution: ${participant.institution}
- Mobile: ${participant.mobile}

Official Organisers & Partners:
- Organised by: QualiNova Solutions Pvt. Ltd.
- Branding & Marketing Partner: Spark Fusion Technologies
- Hospitality Partner: NovaStay Hotels

Please keep your pass for event enquiries. Registration does not constitute a competition submission or award nomination.
Website: https://biharhealthcareconclave.com
Contact: info@biharhealthcareconclave.com

QualiNova Solutions Pvt. Ltd.`;

  return {
    subject: `Bihar Healthcare Conclave 2026 — Registration confirmation & digital pass [${participant.reference}]`,
    text,
    html,
    attachments: [
      {
        filename: `BHC2026-${participant.reference.replace(/[^a-zA-Z0-9-]/g, '')}.pdf`,
        content,
        contentType: 'application/pdf',
      },
    ],
    passVersion: PASS_VERSION,
  };
}
