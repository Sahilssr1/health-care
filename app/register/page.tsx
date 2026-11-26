import { pageMetadata } from '@/lib/seo';
import { RegisterForm } from '@/components/register-form';
import { getContent, publicProgrammes } from '@/lib/managed-content';

export const dynamic = 'force-dynamic';
export const metadata = pageMetadata(
  'Delegate Registration',
  'Register for Bihar Healthcare Conclave 2026 on Friday, 11 December at Urja Auditorium, Patna. Open for healthcare professionals, faculty, residents, nursing, paramedical, pharmacy and innovators.',
  '/register'
);

export default async function Register() {
  const [participants, programmes, settings] = await Promise.all([
    getContent('participants'),
    publicProgrammes(),
    getContent('settings'),
  ]);

  return (
    <section className="section register-layout register-redesign-root">
      {/* Left Column: Executive Conference Information & Delegate Inclusions */}
      <div className="register-presentation-col">
        <div className="register-badge-pill">
          <span className="pulse-dot"></span>
          <span>OFFICIAL DELEGATE REGISTRATION • 2026</span>
        </div>

        <h1 className="register-headline">
          Where Care Meets<br />
          <em>Innovation.</em>
        </h1>

        <p className="register-lead">
          Join Eastern India’s flagship healthcare leadership gathering. Connecting 1,000+ clinicians, hospital executives, academic researchers, and healthcare innovators.
        </p>

        {/* Conference Key Facts Card */}
        <div className="register-event-capsule">
          <div className="event-capsule-item">
            <div className="capsule-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <div>
              <span className="capsule-label">CONFERENCE DATE</span>
              <strong className="capsule-val">Friday, 11 December 2026</strong>
            </div>
          </div>

          <div className="event-capsule-item">
            <div className="capsule-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div>
              <span className="capsule-label">OFFICIAL VENUE</span>
              <strong className="capsule-val">Urja Auditorium, Patna, Bihar</strong>
            </div>
          </div>

          <div className="event-capsule-item">
            <div className="capsule-icon-wrap">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="7"></circle>
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
              </svg>
            </div>
            <div>
              <span className="capsule-label">ACADEMIC CREDITS</span>
              <strong className="capsule-val">Accredited CME & CNE Modules</strong>
            </div>
          </div>
        </div>

        {/* Delegate Inclusions Card */}
        <div className="register-benefits-card">
          <h3 className="benefits-card-title">Delegate Inclusions</h3>
          <ul className="benefits-list">
            <li>
              <span className="benefit-check">✓</span>
              <span>Official Delegate Entry Pass & Digital Credentials</span>
            </li>
            <li>
              <span className="benefit-check">✓</span>
              <span>Access to Keynote Symposiums & Plenary Scientific Tracks</span>
            </li>
            <li>
              <span className="benefit-check">✓</span>
              <span>Accredited Clinical Workshops (CME, CNE, Paramedical, Pharmacy)</span>
            </li>
            <li>
              <span className="benefit-check">✓</span>
              <span>Official Certificate of Participation & Academic Credits</span>
            </li>
            <li>
              <span className="benefit-check">✓</span>
              <span>Delegate Conference Kit & Executive Luncheon Access</span>
            </li>
          </ul>
        </div>

        {/* Institutional & Group Support Notice */}
        <div className="register-support-card">
          <div className="support-card-content">
            <strong>Group or Institutional Registrations?</strong>
            <p>For hospital batches, medical colleges, or invoice requests, our delegate support team is available via WhatsApp.</p>
          </div>
        </div>
      </div>

      {/* Right Column: Premium Form Card */}
      <div className="register-card-wrapper">
        <div className="form-card register-modern-card">
          <div className="form-card-header">
            <span className="form-kicker-badge">DELEGATE ENROLMENT</span>
            <h2 className="form-main-heading">Register for the Conclave</h2>
            <p className="form-sub-heading">
              Complete your information below to reserve your delegate pass. Fields marked with <span className="req-star">*</span> are required.
            </p>
          </div>

          <RegisterForm
            groups={participants.data}
            programmes={programmes}
            number={settings.data.whatsApp}
          />
        </div>
      </div>
    </section>
  );
}

