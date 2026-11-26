import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  studentInterestOptions,
  employeeInterestOptions,
  companyInterestOptions,
  participantGroups,
  officialStudentCategories,
  getStudentInterestOptions,
  isPaidInterest,
  CONCLAVE_ATTENDEE_FEE,
  STANDARD_INTEREST_FEE,
  calculateTotalFee,
  unifiedWorkshopOptions,
} from '../lib/enhancement-data';
import { getRegistrationPrefix, formatRegistrationId } from '../lib/registration-id';

test('Participant Type dependent options are correctly partitioned', () => {
  // Student checks
  const studentGroup = participantGroups.find((g) => g.name === 'STUDENT');
  assert.ok(studentGroup, 'Student group must exist');
  assert.ok(studentGroup.categories.includes('Medical (UG)'));
  assert.ok(studentGroup.categories.includes('Nursing (BSc)'));
  assert.ok(studentGroup.categories.includes('Pharmacy'));
  assert.ok(studentGroup.categories.includes('Paramedical'));
  assert.equal(studentInterestOptions.length, 8);
  assert.ok(studentInterestOptions.includes('Conclave (As Attendee Only)'));
  assert.ok(studentInterestOptions.includes('Common Workshop'));
  assert.ok(studentInterestOptions.includes('Students Project Exhibition'));
  assert.ok(studentInterestOptions.includes('Cultural Event (As Guest)'));
  assert.ok(studentInterestOptions.includes('Creative Poster Presentation'));
  assert.ok(studentInterestOptions.includes('Quiz Competition (Pre-Event)'));
  assert.ok(studentInterestOptions.includes('Healthcare AI Hackathon (Pre-Event)'));
  assert.ok(studentInterestOptions.includes('Other'));

  // Employee checks
  const employeeGroup = participantGroups.find((g) => g.name === 'EMPLOYEE');
  assert.ok(employeeGroup, 'Employee group must exist');
  assert.ok(employeeGroup.categories.includes('Medical Professionals (Doctor)'));
  assert.ok(employeeGroup.categories.includes('Nursing Educator'));
  assert.ok(employeeGroup.categories.includes('Nursing Staff'));
  assert.equal(employeeInterestOptions.length, 6);
  assert.ok(employeeInterestOptions.includes('Conclave (As Attendee Only)'));
  assert.ok(employeeInterestOptions.includes('Common Workshop'));
  assert.ok(employeeInterestOptions.includes('Award & Recognition'));
  assert.ok(employeeInterestOptions.includes('Health Magazine Volume 1 (As Author)'));
  assert.ok(employeeInterestOptions.includes('Presentation'));
  assert.ok(employeeInterestOptions.includes('Other'));

  // Company checks
  const companyGroup = participantGroups.find((g) => g.name === 'COMPANIES');
  assert.ok(companyGroup, 'Company group must exist');
  assert.ok(companyGroup.categories.includes('Pharmaceutical Company'));
  assert.ok(companyGroup.categories.includes('Surgical Manufacturers'));
  assert.equal(companyInterestOptions.length, 10);
  assert.ok(companyInterestOptions.includes('Conclave (As Attendee Only)'));
  assert.ok(companyInterestOptions.includes('Award & Recognition'));
  assert.ok(companyInterestOptions.includes('Product Promotion – Exhibition Stall'));
  assert.ok(companyInterestOptions.includes('Product Promotion – Canopy'));
  assert.ok(companyInterestOptions.includes('Product Promotion – Standee (Solo)'));
  assert.ok(companyInterestOptions.includes('Product Promotion – Standee (Group)'));
  assert.ok(companyInterestOptions.includes('Presentation'));
  assert.ok(companyInterestOptions.includes('Health Magazine (For Product Promotion)'));
  assert.ok(companyInterestOptions.includes('Health Magazine (As an Author)'));
  assert.ok(companyInterestOptions.includes('Other'));
});

test('Conclave Attendee fee is 250 INR', () => {
  assert.equal(CONCLAVE_ATTENDEE_FEE, 250);
});

test('Unified workshop tracks contains 15 pricing options with updated labels and fees', () => {
  assert.equal(unifiedWorkshopOptions.length, 15);
  const byTitle = new Map(unifiedWorkshopOptions.map((w) => [w.title, w.fee]));
  assert.equal(byTitle.get('Senior Resident (CME)'), 1000);
  assert.equal(byTitle.get('Junior Resident (CME)'), 1000);
  assert.equal(byTitle.get('Junior Doctor (CME)'), 1000);
  assert.equal(byTitle.get('Medical Student PG (CME)'), 1000);
  assert.equal(byTitle.get('Medical Student UG (CME)'), 500);
  assert.equal(byTitle.get('Hospital Management Student'), 100);
  assert.equal(byTitle.get('Hospital Manager'), 250);
  assert.equal(byTitle.get('Hospital Management Faculty'), 250);
  assert.equal(byTitle.get('Pharmacy Faculty – Academic'), 250);
  assert.equal(byTitle.get('Pharmacy Student'), 100);
  assert.equal(byTitle.get('Nursing Staff – Clinical (CNE)'), 250);
  assert.equal(byTitle.get('Nursing Faculty – Academic (CNE)'), 250);
  assert.equal(byTitle.get('Nursing Student'), 100);
  assert.equal(byTitle.get('Paramedical Faculty'), 500);
  assert.equal(byTitle.get('Paramedical Student'), 250);
});

test('Only Conclave and Workshop are paid; all other options across Student, Employee, and Company are Free (₹0)', () => {
  // Conclave is paid (₹250)
  const conclave = calculateTotalFee('Conclave (As Attendee Only)');
  assert.equal(conclave.totalFee, 250);
  assert.equal(conclave.breakdown[0].fee, 250);
  assert.equal(conclave.breakdown[0].isPaid, true);

  // Workshop without a selected track must not default to ₹250
  const unselectedWorkshop = calculateTotalFee('Common Workshop');
  assert.equal(unselectedWorkshop.totalFee, 0);
  assert.equal(unselectedWorkshop.breakdown.length, 0);

  // Workshop is paid (fee depending on track)
  const workshopCme = calculateTotalFee('Common Workshop', 'cme-sr');
  assert.equal(workshopCme.totalFee, 1000);
  assert.equal(workshopCme.breakdown[0].fee, 1000);
  assert.equal(workshopCme.breakdown[0].isPaid, true);

  const workshopStudent = calculateTotalFee('Common Workshop', 'cne-nursing-student');
  assert.equal(workshopStudent.totalFee, 100);
  assert.equal(workshopStudent.breakdown[0].fee, 100);
  assert.equal(workshopStudent.breakdown[0].isPaid, true);

  assert.equal(calculateTotalFee('Common Workshop', 'cme-pg').totalFee, 1000);
  assert.equal(calculateTotalFee('Common Workshop', 'cme-ug').totalFee, 500);
  assert.equal(calculateTotalFee('Common Workshop', 'hm-student').totalFee, 100);
  assert.equal(calculateTotalFee('Common Workshop', 'hm-manager').totalFee, 250);
  assert.equal(calculateTotalFee('Common Workshop', 'hm-faculty').totalFee, 250);
  assert.equal(calculateTotalFee('Common Workshop', 'pharmacy-faculty').totalFee, 250);
  assert.equal(calculateTotalFee('Common Workshop', 'pharmacy-student').totalFee, 100);
  assert.equal(calculateTotalFee('Common Workshop', 'cne-nursing-staff').totalFee, 250);
  assert.equal(calculateTotalFee('Common Workshop', 'cne-nursing-faculty').totalFee, 250);

  // All other Student options are Free (₹0)
  const freeStudentOptions = studentInterestOptions.filter(
    (opt) => opt !== 'Conclave (As Attendee Only)' && opt !== 'Common Workshop'
  );
  for (const opt of freeStudentOptions) {
    const { totalFee, breakdown } = calculateTotalFee(opt);
    assert.equal(totalFee, 0, `Student option "${opt}" must be free (₹0), got ${totalFee}`);
    assert.equal(breakdown[0].fee, 0);
    assert.equal(breakdown[0].isPaid, false);
  }

  // All other Employee options are Free (₹0)
  const freeEmployeeOptions = employeeInterestOptions.filter(
    (opt) => opt !== 'Conclave (As Attendee Only)' && opt !== 'Common Workshop'
  );
  for (const opt of freeEmployeeOptions) {
    const { totalFee, breakdown } = calculateTotalFee(opt);
    assert.equal(totalFee, 0, `Employee option "${opt}" must be free (₹0), got ${totalFee}`);
    assert.equal(breakdown[0].fee, 0);
    assert.equal(breakdown[0].isPaid, false);
  }

  // All other Company options are Free (₹0)
  const freeCompanyOptions = companyInterestOptions.filter(
    (opt) => opt !== 'Conclave (As Attendee Only)'
  );
  for (const opt of freeCompanyOptions) {
    const { totalFee, breakdown } = calculateTotalFee(opt);
    assert.equal(totalFee, 0, `Company option "${opt}" must be free (₹0), got ${totalFee}`);
    assert.equal(breakdown[0].fee, 0);
    assert.equal(breakdown[0].isPaid, false);
  }
});

test('Single interest fee calculation strictly prices only one selection', () => {
  // Test single free selection
  const singleFree = calculateTotalFee('Students Project Exhibition');
  assert.equal(singleFree.totalFee, 0);
  assert.equal(singleFree.breakdown.length, 1);
  assert.equal(singleFree.breakdown[0].fee, 0);
  assert.equal(singleFree.breakdown[0].isPaid, false);

  // Test single conclave selection
  const singleConclave = calculateTotalFee('Conclave (As Attendee Only)');
  assert.equal(singleConclave.totalFee, 250);
  assert.equal(singleConclave.breakdown.length, 1);
  assert.equal(singleConclave.breakdown[0].fee, 250);
  assert.equal(singleConclave.breakdown[0].isPaid, true);

  // Test single workshop track selection
  const singleWorkshop = calculateTotalFee('Common Workshop', 'cme-jd');
  assert.equal(singleWorkshop.totalFee, 1000);
  assert.equal(singleWorkshop.breakdown.length, 1);
  assert.equal(singleWorkshop.breakdown[0].fee, 1000);
  assert.equal(singleWorkshop.breakdown[0].isPaid, true);
});

test('Sequential registration IDs dynamically format year, month, and auto-count from 0001', () => {
  // Test formatting for current November 2026
  const nov2026 = new Date(2026, 10, 15); // Month 10 is November
  assert.equal(getRegistrationPrefix(nov2026), 'BHC2026-NOV-');
  assert.equal(formatRegistrationId(1, nov2026), 'BHC2026-NOV-0001');
  assert.equal(formatRegistrationId(5, nov2026), 'BHC2026-NOV-0005');
  assert.equal(formatRegistrationId(174, nov2026), 'BHC2026-NOV-0174');

  // Test formatting for next month: December 2026
  const dec2026 = new Date(2026, 11, 1); // Month 11 is December
  assert.equal(getRegistrationPrefix(dec2026), 'BHC2026-DEC-');
  assert.equal(formatRegistrationId(1, dec2026), 'BHC2026-DEC-0001');
  assert.equal(formatRegistrationId(2, dec2026), 'BHC2026-DEC-0002');

  // Test formatting for next year: January 2027
  const jan2027 = new Date(2027, 0, 1); // Month 0 is January
  assert.equal(getRegistrationPrefix(jan2027), 'BHC2027-JAN-');
  assert.equal(formatRegistrationId(1, jan2027), 'BHC2027-JAN-0001');

  // Verify general regex pattern validation
  const idRegex = /^BHC\d{4}-[A-Z]{3}-\d{4,}$/;
  assert.ok(idRegex.test('BHC2026-NOV-0001'));
  assert.ok(idRegex.test('BHC2026-NOV-0042'));
  assert.ok(idRegex.test('BHC2026-DEC-0001'));
  assert.ok(idRegex.test('BHC2027-JAN-0001'));
  assert.ok(!idRegex.test('BHC26-UUID'));
});

test('Student Category and Area of Interest Pricing Requirements', () => {
  // Requirement 1: All student categories are present (none removed)
  const studentGroup = participantGroups.find((g) => g.name === 'STUDENT')!;
  assert.ok(studentGroup.categories.includes('Medical (UG)'));
  assert.ok(studentGroup.categories.includes('Medical (PG)'));
  assert.ok(studentGroup.categories.includes('Nursing (M.Sc.)'));
  assert.ok(studentGroup.categories.includes('Nursing (B.Sc.)'));
  assert.ok(studentGroup.categories.includes('Nursing (ANM)'));
  assert.ok(studentGroup.categories.includes('Nursing (GNM)'));
  assert.ok(studentGroup.categories.includes('Nursing (Post Basic B.Sc.)'));
  assert.ok(studentGroup.categories.includes('Pharmacy'));
  assert.ok(studentGroup.categories.includes('Paramedical'));
  assert.ok(studentGroup.categories.includes('Hospital Management'));
  assert.ok(studentGroup.categories.includes('Engineering'));
  assert.ok(studentGroup.categories.includes('Biomedical Engineering'));
  assert.ok(studentGroup.categories.includes('Bioinformatics'));
  assert.ok(studentGroup.categories.includes('Others'));

  // Scenario 1: Student -> Conclave (As Attendee Only) or Conclave Attendance -> ₹100
  const scenario1A = calculateTotalFee('Conclave (As Attendee Only)', undefined, 'STUDENT');
  assert.equal(scenario1A.totalFee, 100);
  assert.equal(scenario1A.breakdown[0].fee, 100);
  assert.equal(scenario1A.breakdown[0].isPaid, true);

  const scenario1B = calculateTotalFee('Conclave Attendance', undefined, 'STUDENT');
  assert.equal(scenario1B.totalFee, 100);
  assert.equal(scenario1B.breakdown[0].fee, 100);
  assert.equal(scenario1B.breakdown[0].isPaid, true);

  // Scenario 2: Student -> Common Workshop: ONLY Nursing Student, Paramedical Student, Pharmacy Student are ₹100!
  // All other workshop tracks remain their original same price!
  const scenario2A = calculateTotalFee('Common Workshop', 'cne-nursing-student', 'STUDENT');
  assert.equal(scenario2A.totalFee, 100);
  assert.equal(scenario2A.breakdown[0].fee, 100);

  const scenario2B = calculateTotalFee('Common Workshop', 'pharmacy-student', 'STUDENT');
  assert.equal(scenario2B.totalFee, 100);

  const scenario2C = calculateTotalFee('Common Workshop', 'paramedical-student', 'STUDENT');
  assert.equal(scenario2C.totalFee, 100);

  // Other tracks remain their same original price
  const scenario2D = calculateTotalFee('Common Workshop', 'cme-ug', 'STUDENT');
  assert.equal(scenario2D.totalFee, 500);

  const scenario2E = calculateTotalFee('Common Workshop', 'cme-sr', 'STUDENT');
  assert.equal(scenario2E.totalFee, 1000);

  // Dynamic Interest Filtering: Relevant workshop options according to category
  const nursingOptions = getStudentInterestOptions('Nursing (B.Sc.)');
  assert.ok(nursingOptions.includes('Workshop – Nursing Student'));
  assert.ok(!nursingOptions.includes('Workshop – Pharmacy Student'));
  assert.ok(!nursingOptions.includes('Workshop – Paramedical Student'));

  const pharmacyOptions = getStudentInterestOptions('Pharmacy');
  assert.ok(pharmacyOptions.includes('Workshop – Pharmacy Student'));
  assert.ok(!pharmacyOptions.includes('Workshop – Nursing Student'));
  assert.ok(!pharmacyOptions.includes('Workshop – Paramedical Student'));

  const paramedicalOptions = getStudentInterestOptions('Paramedical');
  assert.ok(paramedicalOptions.includes('Workshop – Paramedical Student'));
  assert.ok(!paramedicalOptions.includes('Workshop – Nursing Student'));
  assert.ok(!paramedicalOptions.includes('Workshop – Pharmacy Student'));

  // Scenario 5: Free Registration -> totalFee === 0 (Total Amount Payable section completely hidden)
  const freePoster = calculateTotalFee('Creative Poster Presentation', undefined, 'STUDENT');
  assert.equal(freePoster.totalFee, 0);
  assert.equal(isPaidInterest('Creative Poster Presentation'), false);

  const freeExhibition = calculateTotalFee('Students Project Exhibition', undefined, 'STUDENT');
  assert.equal(freeExhibition.totalFee, 0);
  assert.equal(isPaidInterest('Students Project Exhibition'), false);

  const freeQuiz = calculateTotalFee('Quiz Competition (Pre-Event)', undefined, 'STUDENT');
  assert.equal(freeQuiz.totalFee, 0);
  assert.equal(isPaidInterest('Quiz Competition (Pre-Event)'), false);

  // Scenario 6: Switch from Free to Paid -> Amount is ₹100
  let currentSelection = 'Creative Poster Presentation';
  let fee = calculateTotalFee(currentSelection, undefined, 'STUDENT');
  assert.equal(fee.totalFee, 0); // Free -> hidden
  currentSelection = 'Workshop – Nursing Student';
  fee = calculateTotalFee(currentSelection, undefined, 'STUDENT');
  assert.equal(fee.totalFee, 100); // Paid -> visible ₹100

  // Scenario 7: Switch from Paid to Free -> Amount is ₹0
  currentSelection = 'Students Project Exhibition';
  fee = calculateTotalFee(currentSelection, undefined, 'STUDENT');
  assert.equal(fee.totalFee, 0); // Free -> hidden

  // Scenario 8: Multiple applicable interests never creates multiple ₹100 charges
  // Single selection fee calculation strictly charges ₹100 once
  const singleChargeNursing = calculateTotalFee(['Workshop – Nursing Student'], undefined, 'STUDENT');
  assert.equal(singleChargeNursing.totalFee, 100);
  assert.equal(singleChargeNursing.breakdown.length, 1);
});
