'use client';
import { useState, useEffect } from 'react';
import Script from 'next/script';
import {
  areaOfInterestOptions,
  studentInterestOptions,
  employeeInterestOptions,
  companyInterestOptions,
  isSpecialStudentCategory,
  isSpecialStudentWorkshop,
  unifiedWorkshopOptions as importedWorkshopOptions,
  type UnifiedWorkshopOption,
  CONCLAVE_ATTENDEE_FEE,
  STANDARD_INTEREST_FEE,
  calculateTotalFee,
  participantGroups,
  type Programme,
  whatsAppLink,
} from '@/lib/enhancement-data';

const DEFAULT_WORKSHOP_LIST: UnifiedWorkshopOption[] = [
  { id: 'cme-sr', title: 'Senior Resident (CME)', workshop: 'CME – Continuing Medical Education', category: 'Senior Resident', specialisation: 'CME: Senior Resident', fee: 1000, track: 'CME' },
  { id: 'cme-jr', title: 'Junior Resident (CME)', workshop: 'CME – Continuing Medical Education', category: 'Junior Resident', specialisation: 'CME: Junior Resident', fee: 1000, track: 'CME' },
  { id: 'cme-jd', title: 'Junior Doctor (CME)', workshop: 'CME – Continuing Medical Education', category: 'Junior Doctor', specialisation: 'CME: Junior Doctor', fee: 1000, track: 'CME' },
  { id: 'cme-pg', title: 'Medical Student PG (CME)', workshop: 'CME – Continuing Medical Education', category: 'Medical Student PG', specialisation: 'CME: Medical Student PG', fee: 1000, track: 'CME' },
  { id: 'cme-ug', title: 'Medical Student UG (CME)', workshop: 'CME – Continuing Medical Education', category: 'Medical Student UG', specialisation: 'CME: Medical Student UG', fee: 500, track: 'CME' },
  { id: 'hm-student', title: 'Hospital Management Student', workshop: 'Workshop for Hospital Management', category: 'Hospital Management Student', specialisation: 'Hospital Management: Student', fee: 100, track: 'Hospital Management' },
  { id: 'hm-manager', title: 'Hospital Manager', workshop: 'Workshop for Hospital Management', category: 'Hospital Manager', specialisation: 'Hospital Management: Hospital Manager', fee: 250, track: 'Hospital Management' },
  { id: 'hm-faculty', title: 'Hospital Management Faculty', workshop: 'Workshop for Hospital Management', category: 'Hospital Management Faculty', specialisation: 'Hospital Management: Faculty', fee: 250, track: 'Hospital Management' },
  { id: 'pharmacy-faculty', title: 'Pharmacy Faculty – Academic', workshop: 'Workshop for Pharmacy', category: 'Pharmacy Faculty – Academic', specialisation: 'Pharmacy: Pharmacy Faculty – Academic', fee: 250, track: 'Pharmacy' },
  { id: 'pharmacy-student', title: 'Pharmacy Student', workshop: 'Workshop for Pharmacy', category: 'Pharmacy Student', specialisation: 'Pharmacy: Pharmacy Student', fee: 100, track: 'Pharmacy' },
  { id: 'cne-nursing-staff', title: 'Nursing Staff – Clinical (CNE)', workshop: 'CNE – Continuing Nursing Education', category: 'Nursing Staff – Clinical', specialisation: 'CNE: Nursing Staff – Clinical', fee: 250, track: 'CNE' },
  { id: 'cne-nursing-faculty', title: 'Nursing Faculty – Academic (CNE)', workshop: 'CNE – Continuing Nursing Education', category: 'Nursing Faculty – Academic', specialisation: 'CNE: Nursing Faculty – Academic', fee: 250, track: 'CNE' },
  { id: 'cne-nursing-student', title: 'Nursing Student', workshop: 'CNE – Continuing Nursing Education', category: 'Nursing Student', specialisation: 'CNE: Nursing Student', fee: 100, track: 'CNE' },
  { id: 'paramedical-faculty', title: 'Paramedical Faculty', workshop: 'Workshop for Paramedical', category: 'Paramedical Faculty', specialisation: 'Paramedical: Paramedical Faculty', fee: 500, track: 'Paramedical' },
  { id: 'paramedical-student', title: 'Paramedical Student', workshop: 'Workshop for Paramedical', category: 'Paramedical Student', specialisation: 'Paramedical: Paramedical Student', fee: 250, track: 'Paramedical' },
];

const FALLBACK_STUDENT_CATEGORIES = [
  'Nursing (M.Sc.)',
  'Nursing (B.Sc.)',
  'Nursing (ANM)',
  'Nursing (GNM)',
  'Nursing (Post Basic B.Sc.)',
  'Pharmacy',
  'Paramedical',
  'Medical (UG)',
  'Medical (PG)',
  'Hospital Management',
  'Engineering',
  'Biomedical Engineering',
  'Bioinformatics',
  'Others',
];

const FALLBACK_EMPLOYEE_CATEGORIES = [
  'Government Employee (Hospital)',
  'Government Employee (Others)',
  'Private Employee (Hospital)',
  'Private Employee (Others)',
  'Medical Professionals (Doctor)',
  'Nursing Educator',
  'Nursing Staff',
  'Nursing Administrator (Matron / Nursing Superintendent / Assistant Nursing Superintendent)',
  'Hospital Administrator (Medical Superintendent / Deputy Medical Superintendent / Hospital Manager)',
  'Others',
];

const FALLBACK_COMPANY_CATEGORIES = [
  'HealthTech Companies (HMIS)',
  'HealthTech Companies (Manufacturer)',
  'HealthTech Companies (Supply Chain)',
  'Lab Tech Companies (Pathology)',
  'Lab Tech Companies (Radiology)',
  'Pharmaceutical Company',
  'Surgical Manufacturers',
  'Diagnostics Labs',
  'Patholabs',
  'Banks (Government)',
  'Banks (Private)',
  'Finance Companies',
  'Civil Construction',
  'Architect',
  'Construction Material',
  'Hotels and Hospitality',
  'Travel Agency',
];

const FALLBACK_STUDENT_INTERESTS = [
  'Conclave (As Attendee Only)',
  'Common Workshop',
  'Students Project Exhibition',
  'Cultural Event (As Guest)',
  'Creative Poster Presentation',
  'Quiz Competition (Pre-Event)',
  'Healthcare AI Hackathon (Pre-Event)',
  'Other',
];

const FALLBACK_EMPLOYEE_INTERESTS = [
  'Conclave (As Attendee Only)',
  'Common Workshop',
  'Award & Recognition',
  'Health Magazine Volume 1 (As Author)',
  'Presentation',
  'Other',
];

const FALLBACK_COMPANY_INTERESTS = [
  'Conclave (As Attendee Only)',
  'Award & Recognition',
  'Product Promotion – Exhibition Stall',
  'Product Promotion – Canopy',
  'Product Promotion – Standee (Solo)',
  'Product Promotion – Standee (Group)',
  'Presentation',
  'Health Magazine (For Product Promotion)',
  'Health Magazine (As an Author)',
  'Other',
];

export const unifiedWorkshopOptions: UnifiedWorkshopOption[] =
  Array.isArray(importedWorkshopOptions) && importedWorkshopOptions.length > 0
    ? importedWorkshopOptions
    : DEFAULT_WORKSHOP_LIST;

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if ((window as any).Razorpay) return resolve(true);

    let resolved = false;
    const finish = (ok: boolean) => {
      if (!resolved) {
        resolved = true;
        clearInterval(poll);
        resolve(ok);
      }
    };

    const poll = setInterval(() => {
      if ((window as any).Razorpay) finish(true);
    }, 100);

    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => finish(true));
      existingScript.addEventListener('error', () => finish(false));
      setTimeout(() => finish(typeof (window as any).Razorpay !== 'undefined'), 6000);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => finish(true);
    script.onerror = () => finish(false);
    document.body.appendChild(script);

    setTimeout(() => finish(typeof (window as any).Razorpay !== 'undefined'), 6000);
  });
}

export function RegisterForm({
  groups = participantGroups,
  number,
}: {
  groups?: typeof participantGroups;
  programmes?: Programme[];
  number: string;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [type, setType] = useState('');
  const [category, setCategory] = useState('');
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [selectedWorkshopId, setSelectedWorkshopId] = useState('');
  const [otherInterest, setOtherInterest] = useState('');
  const [emailError, setEmailError] = useState('');
  const [checkingEmail, setCheckingEmail] = useState(false);

  const safeGroups = Array.isArray(groups) && groups.length > 0 ? groups : participantGroups;

  const normalizedType = (type || '').trim().toUpperCase();
  const isStudent = normalizedType === 'STUDENT';
  const isEmployee = normalizedType === 'EMPLOYEE';
  const isCompany = normalizedType === 'COMPANIES' || normalizedType === 'COMPANY' || normalizedType.includes('COMPAN');

  // Resolve matching group from safeGroups
  const matchedGroup = safeGroups.find(
    (g) => g.name.trim().toUpperCase() === normalizedType
  );

  // Dynamic Categories strictly filtered by Participant Type
  let activeCategories: string[] = [];
  if (isStudent) {
    activeCategories = FALLBACK_STUDENT_CATEGORIES;
  } else if (isEmployee) {
    activeCategories = (matchedGroup?.categories && matchedGroup.categories.length > 0)
      ? matchedGroup.categories
      : FALLBACK_EMPLOYEE_CATEGORIES;
  } else if (isCompany) {
    activeCategories = (matchedGroup?.categories && matchedGroup.categories.length > 0)
      ? matchedGroup.categories
      : FALLBACK_COMPANY_CATEGORIES;
  }

  // Dynamic Area of Interest strictly filtered by Participant Type
  let activeInterestOptions: readonly string[] = [];
  if (isStudent) {
    activeInterestOptions = (Array.isArray(studentInterestOptions) && studentInterestOptions.length > 0)
      ? studentInterestOptions
      : FALLBACK_STUDENT_INTERESTS;
  } else if (isEmployee) {
    activeInterestOptions = (Array.isArray(employeeInterestOptions) && employeeInterestOptions.length > 0)
      ? employeeInterestOptions
      : FALLBACK_EMPLOYEE_INTERESTS;
  } else if (isCompany) {
    activeInterestOptions = (Array.isArray(companyInterestOptions) && companyInterestOptions.length > 0)
      ? companyInterestOptions
      : FALLBACK_COMPANY_INTERESTS;
  }

  const isWorkshopInterest = selectedInterest === 'Common Workshop' || selectedInterest === 'Workshop';
  const isOtherSelected = selectedInterest === 'Other';

  const selectInterest = (option: string) => {
    setSelectedInterest(option);
    if (option !== 'Common Workshop' && option !== 'Workshop') {
      setSelectedWorkshopId('');
    }
    if (option !== 'Other') {
      setOtherInterest('');
    }
  };

  async function checkEmailExists(emailVal: string) {
    const trimmed = emailVal.trim().toLowerCase();
    if (!trimmed || !trimmed.includes('@') || !trimmed.includes('.')) {
      setEmailError('');
      return false;
    }
    setCheckingEmail(true);
    try {
      const res = await fetch(`/api/check-email?email=${encodeURIComponent(trimmed)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.exists) {
          setEmailError('This email is already registered. Please use another email or contact support.');
          setCheckingEmail(false);
          return true;
        }
      }
    } catch { }
    setEmailError('');
    setCheckingEmail(false);
    return false;
  }

  // Preload Razorpay checkout script on mount
  useEffect(() => {
    loadRazorpayScript();
  }, []);

  // Dynamic Fee Calculation per official pricing schedule (Single selection only)
  const selectedWorkshop = (unifiedWorkshopOptions || DEFAULT_WORKSHOP_LIST).find((w) => w.id === selectedWorkshopId);
  const { totalFee, breakdown } = calculateTotalFee(selectedInterest, selectedWorkshopId, type, category);

  let summaryDetails: { workshop: string; category: string; specialisation: string; fee: number } | null = null;

  if (isWorkshopInterest && selectedWorkshop) {
    const isSpecial = isSpecialStudentWorkshop(selectedWorkshop.id);
    const workshopFee = (isStudent && isSpecial) ? 100 : selectedWorkshop.fee;
    summaryDetails = {
      workshop: selectedWorkshop.workshop,
      category: selectedWorkshop.category,
      specialisation: selectedWorkshop.specialisation,
      fee: workshopFee,
    };
  } else if (selectedInterest === 'Conclave (As Attendee Only)' || selectedInterest === 'Conclave Attendance') {
    const isSpecialCat = !category || isSpecialStudentCategory(category);
    const conclaveFee = (isStudent && isSpecialCat) ? 100 : CONCLAVE_ATTENDEE_FEE;
    summaryDetails = {
      workshop: 'Bihar Healthcare Conclave 2026',
      category: isStudent ? (category || 'Student Attendee') : 'Conclave Attendee Pass',
      specialisation: isStudent ? 'Conclave Attendance (Student Pass)' : 'Conclave Attendance (Delegate Pass)',
      fee: conclaveFee,
    };
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');

    if (!selectedInterest) {
      setError('Please select one Area of Interest.');
      return;
    }

    if (isWorkshopInterest && !selectedWorkshopId) {
      setError('Please select a workshop category and fee option from the list below.');
      return;
    }

    if (isOtherSelected && !otherInterest.trim()) {
      setError('Please specify your Area of Interest.');
      return;
    }

    setBusy(true);
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    const userEmail = String(formData.get('email') || '').trim().toLowerCase();

    // Prevent submission and payment if email is already registered
    const isAlreadyRegistered = await checkEmailExists(userEmail);
    if (isAlreadyRegistered) {
      setError('This email is already registered for Bihar Healthcare Conclave 2026. Please use a different email or contact info@biharhealthcareconclave.com.');
      setBusy(false);
      return;
    }

    const formattedInterest =
      selectedInterest === 'Other' && otherInterest.trim()
        ? `Other (${otherInterest.trim()})`
        : selectedInterest;

    const specParts: string[] = [];
    if (summaryDetails?.specialisation) {
      specParts.push(summaryDetails.specialisation);
    }
    if (isOtherSelected && otherInterest.trim()) {
      specParts.push(`Other: ${otherInterest.trim()}`);
    }
    if (!isWorkshopInterest && selectedInterest !== 'Conclave (As Attendee Only)' && selectedInterest !== 'Other') {
      specParts.push(`Interest: ${selectedInterest}`);
    }
    const finalSpecialisation = specParts.join(' | ').slice(0, 150);

    const formFullName = String(formData.get('fullName') || '');
    const formEmail = String(formData.get('email') || '');
    const formMobile = String(formData.get('mobile') || '');
    const formInstitution = String(formData.get('institution') || '');
    const formParticipantType = String(formData.get('participantType') || type || '');

    const formPayload = {
      ...Object.fromEntries(formData),
      fullName: formFullName,
      email: formEmail,
      mobile: formMobile,
      institution: formInstitution,
      category,
      participantType: formParticipantType,
      interest: formattedInterest.slice(0, 200),
      specialisation: finalSpecialisation,
      preferredProgrammes: [],
      communicationsConsent: false,
      consent: true,
    };

    // BRANCH 1: Free Registration (totalFee === 0) -> Instant confirmation without Razorpay
    if (totalFee === 0) {
      try {
        const regRes = await fetch('/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formPayload,
            paymentFee: 0,
          }),
        });

        const rawText = await regRes.text();
        let result: any = null;
        try {
          result = rawText ? JSON.parse(rawText) : null;
        } catch {}

        if (!regRes.ok) {
          const errMsg =
            result?.error ||
            (regRes.status === 502
              ? 'The server is temporarily reloading (502 Bad Gateway). Please retry in a moment.'
              : '') ||
            (regRes.status === 403
              ? 'Request origin not allowed. Please ensure you are browsing via https://biharhealthcareconclave.com.'
              : '') ||
            'Registration could not be completed. Please try again or contact info@biharhealthcareconclave.com.';
          throw new Error(errMsg);
        }

        sessionStorage.setItem(
          'bhc_confirmation',
          JSON.stringify({
            ...result,
            amountPaid: 0,
            paymentId: null,
            workshop: formattedInterest,
            category: formPayload.category,
            fullName: formPayload.fullName,
            email: formPayload.email,
            mobile: formPayload.mobile,
            institution: formPayload.institution,
            participantType: formPayload.participantType,
            interest: formattedInterest,
          })
        );
        window.location.assign('/confirmation');
      } catch (freeErr: any) {
        setError(freeErr.message || 'Registration could not be completed.');
        setBusy(false);
      }
      return;
    }

    // BRANCH 2: Paid Registration (totalFee > 0) -> Razorpay Checkout
    try {
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalFee,
          receipt: 'bhc26_' + Date.now(),
          notes: {
            fullName: formFullName,
            email: formEmail,
            mobile: formMobile,
            interests: formattedInterest.slice(0, 100),
            workshop: summaryDetails?.workshop || formattedInterest.slice(0, 50),
            category: summaryDetails?.category || category,
          },
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.orderId) {
        throw new Error(orderData.error || 'Failed to initialize payment gateway. Please retry.');
      }

      // Ensure Razorpay script is completely loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || typeof (window as any).Razorpay === 'undefined') {
        throw new Error('Payment gateway could not be loaded. Please check your internet connection or disable any adblocker.');
      }

      const descriptionText = isWorkshopInterest && summaryDetails
        ? `${summaryDetails.workshop} (${summaryDetails.category})`
        : formattedInterest;

      const options = {
        key: orderData.keyId,
        amount: orderData.amount,
        currency: orderData.currency || 'INR',
        name: 'Bihar Healthcare Conclave 2026',
        description: descriptionText.slice(0, 100),
        image: '/logos/conclave.png',
        order_id: orderData.orderId,
        prefill: {
          name: formFullName,
          email: formEmail,
          contact: formMobile,
        },
        theme: {
          color: '#0b2d57',
        },
        handler: async function (response: any) {
          try {
            const regRes = await fetch('/api/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...formPayload,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                paymentFee: totalFee,
              }),
            });

            const rawText = await regRes.text();
            let result: any = null;
            try {
              result = rawText ? JSON.parse(rawText) : null;
            } catch {}

            if (!regRes.ok) {
              const errMsg =
                result?.error ||
                (regRes.status === 502
                  ? 'The server is temporarily reloading (502 Bad Gateway). Please retry in a moment.'
                  : '') ||
                (regRes.status === 403
                  ? 'Request origin not allowed. Please ensure you are browsing via https://biharhealthcareconclave.com.'
                  : '') ||
                `Payment of ₹${totalFee} succeeded (Txn ID: ${response.razorpay_payment_id}), but saving your registration failed. Please contact info@biharhealthcareconclave.com with your payment ID.`;
              throw new Error(errMsg);
            }

            sessionStorage.setItem(
              'bhc_confirmation',
              JSON.stringify({
                ...result,
                amountPaid: totalFee,
                paymentId: response.razorpay_payment_id,
                workshop: summaryDetails?.workshop || formattedInterest,
                category: summaryDetails?.category || formPayload.category,
                fullName: formPayload.fullName,
                email: formPayload.email,
                mobile: formPayload.mobile,
                institution: formPayload.institution,
                participantType: formPayload.participantType,
                interest: formattedInterest,
              })
            );
            window.location.assign('/confirmation');
          } catch (regErr: any) {
            setError(regErr.message || 'Registration could not be completed after payment.');
            setBusy(false);
          }
        },
        modal: {
          ondismiss: function () {
            setBusy(false);
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setError(`Payment failed: ${resp.error?.description || 'Transaction was declined.'}`);
        setBusy(false);
      });
      rzp.open();
    } catch (err: any) {
      setError(err.message || 'Payment initiation failed. Please retry.');
      setBusy(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <form onSubmit={submit} className="registration-form premium-registration-form modern-reg-form">
        
        {/* SECTION 1: Delegate Identity */}
        <div className="form-section-block">
          <div className="form-section-header">
            <span className="form-step-badge">1</span>
            <div className="form-section-title-wrap">
              <h3 className="form-section-title">Delegate Information</h3>
              <p className="form-section-subtitle">Your contact credentials for official pass generation</p>
            </div>
          </div>

          <div className="form-fields-grid">
            <div className="form-group form-group-full">
              <label htmlFor="reg-fullName" className="form-label">
                Full Name <span className="req-star">*</span>
              </label>
              <input
                id="reg-fullName"
                name="fullName"
                type="text"
                autoComplete="name"
                required
                minLength={2}
                maxLength={100}
                placeholder="e.g. Dr. Rajesh Kumar / Sneha Sharma"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-mobile" className="form-label">
                Mobile Number <span className="req-star">*</span>
              </label>
              <input
                id="reg-mobile"
                name="mobile"
                type="tel"
                autoComplete="tel"
                required
                minLength={10}
                maxLength={20}
                placeholder="10-digit mobile number"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-email" className="form-label">
                Email Address <span className="req-star">*</span>
              </label>
              <input
                id="reg-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                placeholder="name@example.com"
                className={`form-input ${emailError ? 'input-error' : ''}`}
                onChange={() => {
                  if (emailError) setEmailError('');
                }}
                onBlur={(e) => checkEmailExists(e.target.value)}
              />
              {emailError && (
                <span className="form-feedback error-feedback">
                  ⚠️ {emailError}
                </span>
              )}
              {checkingEmail && (
                <span className="form-feedback checking-feedback">
                  Checking email availability…
                </span>
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Institutional & Location Details */}
        <div className="form-section-block">
          <div className="form-section-header">
            <span className="form-step-badge">2</span>
            <div className="form-section-title-wrap">
              <h3 className="form-section-title">Institutional Affiliation</h3>
              <p className="form-section-subtitle">Your college, hospital, medical institution, or organisation</p>
            </div>
          </div>

          <div className="form-fields-grid">
            <div className="form-group form-group-full">
              <label htmlFor="reg-institution" className="form-label">
                College / Organisation <span className="req-star">*</span>
              </label>
              <input
                id="reg-institution"
                name="institution"
                type="text"
                autoComplete="organization"
                required
                minLength={2}
                maxLength={200}
                placeholder="e.g. AIIMS Patna / IGIMS / Hospital / College Name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-state" className="form-label">
                State <span className="req-star">*</span>
              </label>
              <input
                id="reg-state"
                name="state"
                type="text"
                autoComplete="address-level1"
                required
                minLength={2}
                maxLength={100}
                placeholder="e.g. Bihar"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="reg-city" className="form-label">
                District / City <span className="req-star">*</span>
              </label>
              <input
                id="reg-city"
                name="city"
                type="text"
                autoComplete="address-level2"
                required
                minLength={2}
                maxLength={100}
                placeholder="e.g. Patna"
                className="form-input"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: Classification & Track Selection */}
        <div className="form-section-block">
          <div className="form-section-header">
            <span className="form-step-badge">3</span>
            <div className="form-section-title-wrap">
              <h3 className="form-section-title">Participation & Workshop Track</h3>
              <p className="form-section-subtitle">Choose your delegate classification and conclave track</p>
            </div>
          </div>

          <div className="form-fields-grid">
            <div className="form-group">
              <label htmlFor="reg-participantType" className="form-label">
                Participant Type <span className="req-star">*</span>
              </label>
              <select
                id="reg-participantType"
                name="participantType"
                value={type}
                required
                className="form-select"
                onChange={(e) => {
                  const val = e.target.value;
                  setType(val);
                  setCategory('');
                  setSelectedInterest('');
                  setSelectedWorkshopId('');
                  setOtherInterest('');
                }}
              >
                <option value="">Select participant type</option>
                {safeGroups.map((g) => (
                  <option key={g.name} value={g.name}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="reg-category" className="form-label">
                Category <span className="req-star">*</span>
              </label>
              <select
                id="reg-category"
                name="category"
                value={category}
                disabled={!normalizedType || activeCategories.length === 0}
                required
                className="form-select"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">
                  {normalizedType ? 'Select category' : 'Select participant type first'}
                </option>
                {activeCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* AREA OF INTEREST - CLEAN COMPACT DROPDOWN (1 selection per registration) */}
            <div className="form-group form-group-full">
              <div className="interest-header-row">
                <label htmlFor="reg-areaOfInterest" className="form-label" style={{ marginBottom: 0 }}>
                  Area of Interest <span className="req-star">*</span>
                </label>
                <span className="interest-instruction-pill">
                  1 selection · Conclave & Workshop paid, others Free
                </span>
              </div>

              <select
                id="reg-areaOfInterest"
                name="areaOfInterestDropdown"
                value={selectedInterest}
                disabled={!normalizedType || activeInterestOptions.length === 0}
                required
                className="form-select"
                onChange={(e) => selectInterest(e.target.value)}
              >
                <option value="">
                  {normalizedType ? 'Select your Area of Interest' : 'Select participant type first'}
                </option>
                {activeInterestOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>

              {/* IF OTHER IS SELECTED: INPUT TO SPECIFY */}
              {isOtherSelected && (
                <div className="interest-other-input-wrap" style={{ marginTop: '12px' }}>
                  <label htmlFor="reg-otherInterest" className="form-label-compact">
                    Please specify your Area of Interest <span className="req-star">*</span>
                  </label>
                  <input
                    id="reg-otherInterest"
                    name="otherInterest"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    placeholder="Please describe your specific interest..."
                    value={otherInterest}
                    className="form-input"
                    onChange={(e) => setOtherInterest(e.target.value)}
                  />
                </div>
              )}

              {/* ONLY WHEN COMMON WORKSHOP IS SELECTED: SHOW WORKSHOP TRACK LIST BOX */}
              {isWorkshopInterest && (
                <div className="workshop-nested-box" style={{ marginTop: '14px' }}>
                  <div className="workshop-nested-header">
                    <span className="workshop-step-num">🩺</span>
                    <span>Select Your Workshop Track & Fee Schedule:</span>
                  </div>
                  <div className="workshop-nested-grid">
                    {(unifiedWorkshopOptions || DEFAULT_WORKSHOP_LIST).map((item, index) => {
                      const isSpecial = isSpecialStudentWorkshop(item.id);
                      const itemFee = (isStudent && isSpecial) ? 100 : item.fee;
                      return (
                        <label
                          key={item.id}
                          className={`workshop-sub-card ${selectedWorkshopId === item.id ? 'active' : ''}`}
                        >
                          <div className="workshop-sub-left">
                            <input
                              type="radio"
                              name="_workshop_selection_radio"
                              value={item.id}
                              checked={selectedWorkshopId === item.id}
                              onChange={() => setSelectedWorkshopId(item.id)}
                              className="workshop-sub-radio"
                            />
                            <span className="workshop-sub-title" title={item.title}>
                              {String(index + 1).padStart(2, '0')}. {item.title}
                            </span>
                          </div>
                          <span className="workshop-sub-fee">₹{itemFee.toLocaleString('en-IN')}</span>
                        </label>
                      );
                    })}
                  </div>

                  {summaryDetails && (
                    <div className="workshop-selected-pill-bar">
                      <span>Selected: <strong>{summaryDetails.workshop} ({summaryDetails.category})</strong></span>
                      <span className="workshop-fee-highlight">Workshop Fee: ₹{summaryDetails.fee.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* PRICE BREAKDOWN CARD (Visible ONLY when a paid registration option is selected, i.e. totalFee > 0) */}
            {selectedInterest && totalFee > 0 && (
              <div className="price-breakdown-card form-group-full">
                <div className="price-breakdown-header">
                  <div className="price-breakdown-header-left">
                    <span className="price-breakdown-icon">🧾</span>
                    <div>
                      <h4 className="price-breakdown-title">Registration Fee Summary</h4>
                      <p className="price-breakdown-subtitle">
                        Single selection registration · Applicable Delegate Fee
                      </p>
                    </div>
                  </div>
                  <span className="price-breakdown-pill">
                    ₹{totalFee.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="price-breakdown-list">
                  {breakdown.map((item, idx) => (
                    <div key={idx} className="price-breakdown-row">
                      <span className="price-breakdown-item-name">
                        <span className="price-check-bullet">✓</span> {item.name}
                      </span>
                      <span className="price-breakdown-item-fee">
                        ₹{item.fee.toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="price-breakdown-total-bar">
                  <span className="total-bar-label">Total Amount Payable:</span>
                  <span className="total-bar-val">
                    ₹{totalFee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            )}

            {/* Hidden inputs to pass data */}
            <input
              type="hidden"
              name="interest"
              value={selectedInterest === 'Other' && otherInterest.trim() ? `Other (${otherInterest.trim()})` : selectedInterest}
            />
            <input
              type="hidden"
              name="specialisation"
              value={summaryDetails?.specialisation || (isOtherSelected && otherInterest ? `Other: ${otherInterest}` : '')}
            />
          </div>
        </div>

        {/* SECTION 4: Anti-Spam Honeypot, Terms & Submit */}
        <div className="honeypot" aria-hidden="true">
          <label>
            Website
            <input name="website" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <p className="form-terms">
          By registering, you agree to our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a> and <a href="/terms" target="_blank" rel="noopener noreferrer">Registration Terms</a>.
        </p>

        {error && (
          <div className="form-error-alert" role="alert">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <button type="submit" className="button reg-submit-btn" disabled={busy}>
          {busy
            ? (totalFee > 0 ? 'Connecting to payment gateway…' : 'Submitting registration…')
            : !selectedInterest
              ? 'Select Area of Interest to Register ↗'
              : (isWorkshopInterest && !selectedWorkshopId)
                ? 'Select a Workshop Track to Register ↗'
                : totalFee > 0
                  ? `Proceed to Pay ₹${totalFee.toLocaleString('en-IN')} & Register ↗`
                  : 'Complete Registration (Free) ↗'}
        </button>

        <div className="form-security-guarantee">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Instant digital pass sent immediately upon registration</span>
        </div>

        <div className="reg-whatsapp-wrapper">
          <a
            className="reg-whatsapp-link"
            href={whatsAppLink(number, 'Hello, I need assistance with registration for Bihar Healthcare Conclave 2026.')}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="wa-icon">💬</span>
            <span>Need registration help? WhatsApp our delegate desk ↗</span>
          </a>
        </div>
      </form>
    </>
  );
}
