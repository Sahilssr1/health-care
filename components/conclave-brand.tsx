import Image from 'next/image';
// Originals remain byte-identical; Next serves responsive derivatives without changing the supplied assets.
export function ConclaveBrand({className=''}:{className?:string}){return <span className={'conclave-brand png-brand '+className}><Image src="/logos/conclave.png" alt="Bihar Healthcare Conclave 2026 — Innovation, Quality, Skills, Technology, Excellence in Healthcare" width={3919} height={3919} unoptimized priority/></span>}
export function HealthcareArtwork(){return <Image className="healthcare-artwork" src="/images/conclave-reference.jpg" alt="Healthcare professionals, AI in Healthcare and Bihar landmarks from the supplied Conclave artwork" width={3919} height={3919} sizes="(max-width: 760px) 100vw, 650px" quality={95}/>}
