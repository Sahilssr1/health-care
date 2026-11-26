// Transcribed from the organiser's Programme Highlights poster supplied on 15 October 2026.
const entries:[string,string,string,string,string?][]=[
 ['senior-medical-felicitation','Felicitation of Renowned and Experienced Senior Medical Professionals from Bihar','Excellence','Honouring distinguished doctors for their dedicated services towards better healthcare for the people of Bihar.'],
 ['healthcare-awards','Healthcare Excellence Awards','Excellence','To the nurses and nursing administrators for their dedicated services towards quality healthcare.'],
 ['nursing-education-awards','Nursing Education Excellence Awards','Excellence','To nursing educators for their dedicated services towards quality education.'],
 ['nursing-quality-workshop','Workshop on Quality Standards in Healthcare Excellence','Quality','An interactive workshop focused on quality standards, best practices, patient safety and continuous improvement in healthcare excellence.'],
 ['clinical-procedures','Live Demonstrations of Clinical Procedures','Clinical Skills','Hands-on learning with expert guidance on essential clinical skills.'],
 ['emergency-trainings','Live Emergency Trainings','Clinical Skills','Practical training on emergency response and life-saving skills.'],
 ['environmental-sustainability','Environmental Sustainability in Healthcare','Sustainability','Presentation on biodegradable solutions and sustainable practices in healthcare.'],
 ['ai-enabled-demonstrations','Demonstration of AI-Enabled Innovations in Healthcare','Technology','Showcasing real-world AI applications and digital solutions.'],
 ['innovation-hackathon','Healthcare Innovation Hackathon','Innovation','Awards for AI in Healthcare to students, researchers and IT experts.'],
 ['quiz-innovation-awards','Quiz & Innovation Awards','Excellence','Awards for the best performance in subject knowledge and the best innovative ideas in healthcare.'],
 ['motivational-lecture','Motivational Lecture','Learning','Inspiring sessions by eminent speakers on leadership, career growth and future opportunities.'],
 ['cultural-programme','Cultural Programme','Culture','Showcasing the rich cultural heritage of Bihar through vocal and dance performances and fine arts.'],
 ['student-innovation-exhibition','Student Innovation Exhibition','Innovation','Exhibition of innovative projects made by nursing and engineering students.'],
 ['health-lab-tech-exhibition','Health-Tech & Lab-Tech Exhibition','Technology','Exhibition of advanced healthcare technology and equipment by leading health-tech and lab-tech companies as well as edu-tech companies in healthcare education.'],
 ['group-lunch-networking','Group Lunch & Networking','Networking','Shared meals for meaningful interaction and collaboration among doctors, nurses, institutions, industry and government.']
];
export const posterProgrammes=entries.map(([id,title,category,summary,details])=>({id,title,category,summary,details:details||summary,audience:'',benefits:'',status:'Programme highlight',published:true,speaker:'',schedule:'',venue:''}));
