# Digital pass and WhatsApp rollout

The PDF pass uses original logos, a fixed blue/green A4 layout, participant name, registration reference, mobile, institution and category, 11 December 2026 and Urja Auditorium, Patna. No timing, payment wording, invented admission guarantee or QR verification is added. Personalised PDFs are generated in memory and attached privately to confirmation emails; they are never written to public storage.

The existing durable email queue retries failed PDF generation or SMTP sending. A pass is marked sent only after SMTP accepts the message; this does not prove inbox delivery. The admin participant details show acceptance time and template version. Existing registrations can receive the pass by re-queueing only records without passSentAt after the PDF worker is deployed.

WhatsApp is NOT active: the organiser has no provider account. Automatic sending needs an official WhatsApp Business provider account, an approved sender number and utility template, credentials supplied privately, applicable messaging consent and reviewed pricing. No account, paid plan or unofficial automation has been enabled.

Proposed utility template (subject to provider approval):
Hello {{1}}, your registration for Bihar Healthcare Conclave 2026 is confirmed. Reference: {{2}}. Date: 11 December 2026. Venue: Urja Auditorium, Patna, Bihar. Your digital registration pass is attached. For help: info@biharhealthcareconclave.com.

Provider integration must upload PDFs privately (or use short-lived signed document URLs), retain provider message IDs and delivery webhooks, verify webhook signatures and retry without duplicate sends. Never publish personal PDFs or add provider secrets to browser code.
