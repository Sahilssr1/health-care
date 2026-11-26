import { getContent } from '@/lib/managed-content';
import { adminSession, trustedOrigin } from '@/lib/security';
import { db } from '@/lib/db';
import { csvCell } from '@/lib/validation';
import { participantWhere } from '@/lib/admin-query';

const columns = [
  'Reference', 'Name', 'Email', 'Mobile', 'College / Organisation', 'State',
  'District / City', 'Participant type', 'Category', 'Area of interest',
  'Registered', 'Email status', 'Attendance', 'Specialisation', 'WhatsApp',
  'Department', 'Organisation type', 'Country', 'Experience or academic year',
  'Preferred programmes', 'Event communications consent', 'Registration status',
];

export async function POST(req: Request) {
  if (!trustedOrigin(req)) return new Response('Forbidden', { status: 403 });
  const session = await adminSession();
  if (!session) return new Response('Unauthorised', { status: 401 });
  if (session.admin.role !== 'admin') return new Response('Forbidden', { status: 403 });

  const [participants, recordCategories] = await Promise.all([
    getContent('participants'),
    db.registration.findMany({ distinct: ['category'], select: { category: true } }),
  ]);
  const form = await req.formData();
  const where = participantWhere(
    String(form.get('q') || ''), String(form.get('category') || ''), String(form.get('attendance') || ''),
    {
      city: String(form.get('city') || ''), institution: String(form.get('institution') || ''),
      programme: String(form.get('programme') || ''), status: String(form.get('status') || ''),
      allowedCategories: [...participants.data.flatMap(group => group.categories), ...recordCategories.map(row => row.category)],
    },
  );
  await db.audit.create({ data: { adminId: session.adminId, action: 'export_csv' } });

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(`\uFEFF${columns.join(',')}\r\n`));
        let cursor: string | undefined;
        while (true) {
          const rows = await db.registration.findMany({
            where, orderBy: { id: 'asc' }, take: 500,
            ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
          });
          if (!rows.length) break;
          for (const row of rows) {
            controller.enqueue(encoder.encode([
              row.reference, row.fullName, row.email, row.mobile, row.institution, row.state,
              row.city, row.participantType, row.category, row.interest, row.createdAt.toISOString(),
              row.emailStatus, row.attendedAt?.toISOString(), row.specialisation, row.whatsApp,
              row.department, row.organisationType, row.country, row.experience,
              row.preferredProgrammes.join('; '), row.communicationsConsent, row.registrationStatus,
            ].map(csvCell).join(',') + '\r\n'));
          }
          cursor = rows[rows.length - 1].id;
        }
        controller.close();
      } catch (error) {
        controller.error(error);
      }
    },
  });
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="bhc-registrations.csv"',
      'Cache-Control': 'no-store',
    },
  });
}
