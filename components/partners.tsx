import { getContent } from '@/lib/managed-content';
import Image from 'next/image';
import Link from 'next/link';
import { PartnersShowcase } from './partners-showcase';

export type Partner = {
  id: string;
  name: string;
  role: string;
  logo: string;
  url: string;
  published: boolean;
};

function HomePartnerCard({ partner }: { partner: Partner }) {
  const content = (
    <>
      <Image
        className="partner-logo"
        src={partner.logo}
        alt={partner.name}
        width={600}
        height={200}
        unoptimized
        loading="lazy"
      />
      <strong>{partner.name}</strong>
      {partner.url && <span className="partner-visit">Visit Website ↗</span>}
    </>
  );

  return (
    <div className={'partner-card partner-' + partner.id}>
      <p>{partner.role}</p>
      {partner.url ? (
        <a href={partner.url} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      ) : (
        <div className="partner-card-inner">
          {content}
        </div>
      )}
    </div>
  );
}

export async function Partners({
  compact = false,
  isPage = false,
}: {
  compact?: boolean;
  isPage?: boolean;
}) {
  const { data: settings } = await getContent('settings');

  // If this is the dedicated /partners page, render the full detailed experience
  if (isPage) {
    return (
      <PartnersShowcase
        isPage={true}
        whatsAppNumber={settings?.whatsApp || '919911350649'}
      />
    );
  }

  // Home Page: Clean, compact 5-top and 4-bottom showcase without verbose descriptions
  const published = (await getContent('partners')).data.filter((p) => p.published) as Partner[];
  const unique = [...new Map(published.map((partner) => [partner.id, partner])).values()];
  const lookup = new Map(unique.map((partner) => [partner.id, partner]));

  // Ensure Dr. C.P. Thakur & Sutravya exist with accurate roles and logos
  const cpThakurData: Partner = {
    id: 'dr-cp-thakur',
    name: 'Dr. C.P. Thakur Foundation',
    role: 'Social Responsibility Partner',
    logo: '/logos/dr-cp-thakur.png',
    url: '',
    published: true,
  };
  const existingCpThakur = lookup.get('dr-cp-thakur');
  if (existingCpThakur) {
    existingCpThakur.logo = '/logos/dr-cp-thakur.png';
    existingCpThakur.role = 'Social Responsibility Partner';
    existingCpThakur.name = 'Dr. C.P. Thakur Foundation';
    existingCpThakur.url = '';
    existingCpThakur.published = true;
  } else {
    lookup.set('dr-cp-thakur', cpThakurData);
    unique.push(cpThakurData);
  }

  const sutravyaData: Partner = {
    id: 'sutravya',
    name: 'SUTRAVYA',
    role: 'Technology Partner',
    logo: '/logos/sutravya-logo.png',
    url: 'https://sutravya.in/',
    published: true,
  };
  const existingSutravya = lookup.get('sutravya');
  if (existingSutravya) {
    existingSutravya.logo = '/logos/sutravya-logo.png';
    existingSutravya.role = 'Technology Partner';
    existingSutravya.url = 'https://sutravya.in/';
    existingSutravya.published = true;
  } else {
    lookup.set('sutravya', sutravyaData);
    unique.push(sutravyaData);
  }

  // Row 1: 5 Boxes (QualiNova, IMA Bihar, TNAI Bihar, AICBV, Dr. C.P. Thakur Foundation)
  const topIds = ['qualinova', 'ima-bihar', 'tnai', 'aicbv', 'dr-cp-thakur'];
  // Row 2: 4 Boxes (Startly Innovations, Spark Fusion, NovaStay, Sutravya)
  const bottomIds = ['startly-innovations', 'spark', 'novastay', 'sutravya'];

  const topPartners = topIds.map((id) => lookup.get(id)).filter((p): p is Partner => !!p);
  const bottomPartners = [
    ...bottomIds.map((id) => lookup.get(id)).filter((p): p is Partner => !!p),
    ...unique.filter((p) => !topIds.includes(p.id) && !bottomIds.includes(p.id)),
  ];

  return (
    <section className={compact ? 'partners compact' : 'partners'} aria-label="Organiser and official partners">
      {!compact && (
        <>
          <p className="eyebrow">ORGANISER &amp; OFFICIAL PARTNERS</p>
          <h2>Connected by a shared purpose.</h2>
        </>
      )}

      <style>{`
        .partner-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .partner-card .partner-logo {
          max-height: 105px;
          width: auto;
          max-width: 100%;
          object-fit: contain;
        }
        .partner-top-5-grid {
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          gap: 20px;
          align-items: stretch;
          margin-top: 20px;
        }
        .partner-bottom-4-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
          gap: 24px;
          align-items: stretch;
          margin-top: 20px;
        }
        @media (max-width: 1200px) {
          .partner-top-5-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
          .partner-bottom-4-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 768px) {
          .partner-top-5-grid,
          .partner-bottom-4-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 16px;
          }
        }
        @media (max-width: 520px) {
          .partner-top-5-grid,
          .partner-bottom-4-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      {/* Top Row: 5 Boxes */}
      <div className="partner-primary-wrap" style={{ marginBottom: '44px' }}>
        <p className="partner-group-label">ORGANISER &amp; ORGANISING PARTNERS</p>
        <div className="partner-grid partner-top-5-grid">
          {topPartners.map((partner) => (
            <HomePartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      {/* Bottom Row: 4 Boxes (Clean STRATEGIC PARTNERS heading) */}
      {bottomPartners.length > 0 && (
        <div className="partner-secondary-wrap">
          <p className="partner-group-label">STRATEGIC PARTNERS</p>
          <div className="partner-grid partner-bottom-4-grid">
            {bottomPartners.map((partner) => (
              <HomePartnerCard key={partner.id} partner={partner} />
            ))}
          </div>
        </div>
      )}

      {/* Button linking to the comprehensive detailed /partners page */}
      {!compact && (
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/partners" className="button" style={{ display: 'inline-flex', gap: '8px', padding: '14px 28px' }}>
            <span>Explore All Partner Profiles &amp; Details</span>
            <span aria-hidden="true">↗</span>
          </Link>
        </div>
      )}
    </section>
  );
}
