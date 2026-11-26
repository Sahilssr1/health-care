// Display windows into the organiser-supplied poster; no separate or invented event photos.
// Each rectangle excludes poster headlines/captions so website text remains accessible.
const ids=['senior-medical-felicitation','healthcare-awards','nursing-education-awards','nursing-quality-workshop','clinical-procedures','emergency-trainings','environmental-sustainability','ai-enabled-demonstrations','innovation-hackathon','quiz-innovation-awards','motivational-lecture','cultural-programme','student-innovation-exhibition','health-lab-tech-exhibition','group-lunch-networking'];
const frames=[
 [90,234,286,127],[462,234,260,116],[807,234,264,117],
 [91,484,256,113],[464,484,260,116],[809,484,260,116],
 [91,747,278,123],[462,747,260,116],[809,747,260,116],
 [91,965,256,113],[463,965,260,116],[810,965,260,116],
 [103,1188,218,97],[480,1188,218,97],[841,1188,218,97]
];
export const programmeArtwork:Record<string,{position:string;size:string}>=Object.fromEntries(ids.map((id,i)=>{const [x,y,w,h]=frames[i];return [id,{position:`${x/(1102-w)*100}% ${y/(1427-h)*100}%`,size:`${1102/w*100}% auto`}]}));
