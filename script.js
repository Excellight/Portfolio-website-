const knowledge = [
  {keys:['who','about','background','excellence'], answer:"Excellence Odimegwu is a Computer Science student at the University of Nigeria, Nsukka. He is interested in AI engineering, cybersecurity, web development and product design, and enjoys building practical technology solutions."},
  {keys:['skill','technology','programming','language'], answer:"His areas of experience and learning include Python, JavaScript, React, Flask, REST APIs, database design, Gemini AI integration, cybersecurity fundamentals, cloud security and product design."},
  {keys:['student management','student system'], answer:"Student Management System Pro is a developing project built with React and a Python Flask API. It focuses on student records, dashboard analytics and performance tracking."},
  {keys:['mech','ai mech','gemini'], answer:"For AI Mech Lab, Excellence is responsible for database design and Gemini AI adaptation and integration. Other API development is handled by another backend developer."},
  {keys:['hospital'], answer:"He worked with a team of three on a hospital management system project with AI-related functionality."},
  {keys:['design','product'], answer:"He has contributed to product design, including a student-focused learning and quiz platform with rankings, and has interests in graphic design and user-focused interfaces."},
  {keys:['experience','internship','training'], answer:"His practical learning includes an ongoing programming and AI internship with AgroBuild Explorers, alongside AI and cybersecurity training and collaborative software projects."},
  {keys:['contact','email','linkedin','github'], answer:"You can use the contact links in the Contact section of this portfolio. The owner should replace the placeholder links with his current details before publishing."}
];
const form=document.getElementById('chatform'), input=document.getElementById('question'), log=document.getElementById('chatlog');
form.addEventListener('submit',e=>{e.preventDefault();const q=input.value.trim();if(!q)return;add('user','You: '+q);const lower=q.toLowerCase();const match=knowledge.find(item=>item.keys.some(k=>lower.includes(k)));add('bot','Litex: '+(match?match.answer:"I can answer questions about Excellence's background, skills, training and projects. Try asking about his AI work, cybersecurity, Student Management System or AI Mech Lab."));input.value='';});
function add(type,text){const p=document.createElement('p');p.className=type;p.textContent=text;log.appendChild(p);log.scrollTop=log.scrollHeight;}
document.getElementById('year').textContent=new Date().getFullYear();
                                                                                                                       
