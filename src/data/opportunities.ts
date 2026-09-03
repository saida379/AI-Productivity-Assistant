export type OpportunityType =
  | "Learnership"
  | "Internship"
  | "Graduate Programme"
  | "Bursary"
  | "Entry-level Job"
  | "WIL Placement";

export type Opportunity = {
  id: string;
  title: string;
  organisation: string;
  type: OpportunityType;
  province: string;
  city: string;
  stipend: string;
  closingDate: string;
  nqf: string;
  fields: string[];
  remote: "On-site" | "Hybrid" | "Remote";
  matchScore: number;
  matchReasons: string[];
  gaps: string[];
  summary: string;
  requirements: string[];
  verified: boolean;
};

export const PROVINCES = [
  "Gauteng",
  "Western Cape",
  "KwaZulu-Natal",
  "Eastern Cape",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];

export const FIELDS = [
  "Information Technology",
  "Engineering",
  "Finance & Accounting",
  "Business & Admin",
  "Health Sciences",
  "Education",
  "Agriculture",
  "Retail & Logistics",
];

export const OPPORTUNITY_TYPES: OpportunityType[] = [
  "Learnership",
  "Internship",
  "Graduate Programme",
  "Bursary",
  "Entry-level Job",
  "WIL Placement",
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    title: "Software Development Graduate Programme",
    organisation: "Standard Bank",
    type: "Graduate Programme",
    province: "Gauteng",
    city: "Rosebank, Johannesburg",
    stipend: "R22 000 – R26 000 / month",
    closingDate: "2026-09-30",
    nqf: "NQF 7 (Degree)",
    fields: ["Information Technology"],
    remote: "Hybrid",
    matchScore: 94,
    matchReasons: [
      "Your BSc Computer Science aligns with the NQF 7 requirement",
      "You listed React, Python and SQL — 3 of 4 listed core skills",
      "You indicated willingness to relocate to Gauteng",
    ],
    gaps: ["No cloud certification listed (AWS/Azure is a nice-to-have)"],
    summary:
      "An 18-month rotational graduate programme across engineering squads, with mentorship, formal training and a permanent placement review at the end.",
    requirements: [
      "BSc/BEng/BCom in Computer Science, Informatics or related",
      "South African citizen with a valid ID",
      "Completed degree in the last 3 years",
    ],
    verified: true,
  },
  {
    id: "opp-2",
    title: "MICT SETA IT Support Learnership (NQF 5)",
    organisation: "Afrika Tikkun Services",
    type: "Learnership",
    province: "Gauteng",
    city: "Braamfontein, Johannesburg",
    stipend: "R4 500 / month stipend",
    closingDate: "2026-10-15",
    nqf: "NQF 4 (Matric)",
    fields: ["Information Technology"],
    remote: "On-site",
    matchScore: 88,
    matchReasons: [
      "Open to matriculants — you meet the minimum NQF 4 requirement",
      "Your interest in IT support matches the qualification outcome",
      "Located within your saved travel radius of Johannesburg CBD",
    ],
    gaps: ["Learnership pays a stipend only, below your saved salary preference"],
    summary:
      "A 12-month accredited learnership leading to a National Certificate in IT: Systems Support, including workplace experience at a host employer.",
    requirements: ["Matric with Maths or Maths Literacy", "Unemployed youth aged 18–34", "Basic computer literacy"],
    verified: true,
  },
  {
    id: "opp-3",
    title: "Work Integrated Learning: Electrical Engineering (S4)",
    organisation: "Eskom Distribution",
    type: "WIL Placement",
    province: "Mpumalanga",
    city: "eMalahleni",
    stipend: "R6 800 / month",
    closingDate: "2026-09-18",
    nqf: "NQF 6 (Diploma in progress)",
    fields: ["Engineering"],
    remote: "On-site",
    matchScore: 81,
    matchReasons: [
      "You are registered for a National Diploma requiring P1/P2 experiential training",
      "Your TVET institution is on the approved partner list",
    ],
    gaps: ["Requires own transport or relocation to eMalahleni"],
    summary:
      "Six-month P1 experiential training placement for students who need workplace hours to complete their National Diploma.",
    requirements: [
      "Completed S1–S3 subjects of a National Diploma in Electrical Engineering",
      "Letter of endorsement from your institution",
    ],
    verified: true,
  },
  {
    id: "opp-4",
    title: "SAICA Trainee Accountant (TIPP)",
    organisation: "Moore Cape Town",
    type: "Internship",
    province: "Western Cape",
    city: "Century City, Cape Town",
    stipend: "R14 500 / month",
    closingDate: "2026-11-01",
    nqf: "NQF 7 (Degree)",
    fields: ["Finance & Accounting"],
    remote: "Hybrid",
    matchScore: 63,
    matchReasons: ["Your BCom modules cover Financial Accounting 3 and Auditing 2"],
    gaps: [
      "Requires CTA enrolment — not on your profile yet",
      "Cape Town based; you have not marked the Western Cape as preferred",
    ],
    summary:
      "Three-year SAICA training contract with study support towards the Initial Test of Competence.",
    requirements: ["BCom Accounting (SAICA accredited)", "Enrolled or enrolling for CTA"],
    verified: true,
  },
  {
    id: "opp-5",
    title: "Nedbank YES Youth Programme — Client Services",
    organisation: "Nedbank",
    type: "Entry-level Job",
    province: "KwaZulu-Natal",
    city: "Durban",
    stipend: "R5 500 / month (12-month contract)",
    closingDate: "2026-09-25",
    nqf: "NQF 4 (Matric)",
    fields: ["Business & Admin", "Retail & Logistics"],
    remote: "On-site",
    matchScore: 76,
    matchReasons: [
      "YES programme targets unemployed youth aged 18–34",
      "Your retail part-time work counts as customer service experience",
    ],
    gaps: ["Shift work including Saturdays"],
    summary:
      "A 12-month YES (Youth Employment Service) work experience contract in branch client services with a reference letter and CV support on exit.",
    requirements: ["Matric certificate", "No prior formal work experience required", "Fluent in English and isiZulu"],
    verified: true,
  },
  {
    id: "opp-6",
    title: "Funza Lushaka Teaching Bursary 2027",
    organisation: "Department of Basic Education",
    type: "Bursary",
    province: "Free State",
    city: "Bloemfontein (any public university)",
    stipend: "Full cost of study + allowance",
    closingDate: "2026-10-31",
    nqf: "NQF 4 (Matric)",
    fields: ["Education"],
    remote: "On-site",
    matchScore: 58,
    matchReasons: ["Bursary is open nationally and you meet the citizenship requirement"],
    gaps: ["You have not indicated teaching as a career interest", "Requires priority subject specialisation"],
    summary:
      "Full-cost bursary for a BEd or PGCE in priority subject areas, with a placement obligation in a public school after graduation.",
    requirements: ["Admission to a public university BEd/PGCE", "Priority subject specialisation", "SA citizenship"],
    verified: true,
  },
  {
    id: "opp-7",
    title: "Agri Graduate Development Programme",
    organisation: "Kaap Agri",
    type: "Graduate Programme",
    province: "Western Cape",
    city: "Malmesbury",
    stipend: "R16 000 / month",
    closingDate: "2026-10-08",
    nqf: "NQF 7 (Degree)",
    fields: ["Agriculture", "Retail & Logistics"],
    remote: "On-site",
    matchScore: 44,
    matchReasons: ["Open to all recent graduates regardless of field"],
    gaps: ["Agricultural background preferred", "Driver's licence required — not on your profile"],
    summary:
      "A 24-month rotational programme across retail agri branches, supply chain and grain handling operations.",
    requirements: ["Completed degree or BTech", "Valid code B driver's licence"],
    verified: false,
  },
  {
    id: "opp-8",
    title: "Data Analyst Internship",
    organisation: "Discovery Health",
    type: "Internship",
    province: "Gauteng",
    city: "Sandton, Johannesburg",
    stipend: "R12 000 / month",
    closingDate: "2026-09-12",
    nqf: "NQF 6 (Diploma)",
    fields: ["Information Technology", "Health Sciences"],
    remote: "Hybrid",
    matchScore: 90,
    matchReasons: [
      "SQL and Python appear in both your CV and the role requirements",
      "Your final-year data visualisation project is directly relevant",
      "Hybrid work matches your stated preference",
    ],
    gaps: ["Power BI experience listed as preferred — consider the free Academy module"],
    summary:
      "A 12-month internship supporting actuarial and clinical analytics teams with reporting, dashboards and data quality work.",
    requirements: ["Diploma or degree with statistics/data modules", "SQL fundamentals", "Available full-time"],
    verified: true,
  },
  {
    id: "opp-9",
    title: "Public Service Internship: Human Settlements",
    organisation: "Eastern Cape Provincial Government",
    type: "Internship",
    province: "Eastern Cape",
    city: "Bhisho",
    stipend: "R7 043 / month",
    closingDate: "2026-09-20",
    nqf: "NQF 6 (Diploma)",
    fields: ["Business & Admin"],
    remote: "On-site",
    matchScore: 52,
    matchReasons: ["Open to unemployed graduates who have never participated in an internship"],
    gaps: ["Z83 form and certified copies required", "Bhisho is outside your saved travel radius"],
    summary:
      "A 24-month government internship in project administration and community liaison within human settlements.",
    requirements: ["Completed diploma/degree", "Never previously employed in the public service", "Z83 application form"],
    verified: true,
  },
  {
    id: "opp-10",
    title: "Junior Frontend Developer",
    organisation: "Yoco",
    type: "Entry-level Job",
    province: "Western Cape",
    city: "Cape Town",
    stipend: "R28 000 – R34 000 / month",
    closingDate: "2026-10-20",
    nqf: "NQF 6 (Diploma)",
    fields: ["Information Technology"],
    remote: "Remote",
    matchScore: 85,
    matchReasons: [
      "Your React and TypeScript projects meet the core stack requirement",
      "Fully remote — no relocation needed",
      "Portfolio link on your profile strengthens this application",
    ],
    gaps: ["Testing experience (Jest/Playwright) not shown on your CV"],
    summary:
      "Join a small product squad building merchant-facing payment tools. Formal degree optional if you can show shipped work.",
    requirements: ["Demonstrable React/TypeScript work", "Comfortable with code review", "SA-based for payroll"],
    verified: true,
  },
  {
    id: "opp-11",
    title: "Nursing Auxiliary Learnership",
    organisation: "Netcare Education",
    type: "Learnership",
    province: "Gauteng",
    city: "Pretoria",
    stipend: "R4 200 / month stipend",
    closingDate: "2026-11-14",
    nqf: "NQF 4 (Matric)",
    fields: ["Health Sciences"],
    remote: "On-site",
    matchScore: 39,
    matchReasons: ["Open to matriculants with Life Sciences"],
    gaps: ["Life Sciences not on your subject list", "Health Sciences not a saved interest"],
    summary: "A one-year accredited auxiliary nursing programme with clinical placement in Netcare hospitals.",
    requirements: ["Matric with Life Sciences", "Clear criminal record", "Medical fitness certificate"],
    verified: true,
  },
  {
    id: "opp-12",
    title: "Logistics Operations Learnership (NQF 3)",
    organisation: "Imperial Logistics",
    type: "Learnership",
    province: "KwaZulu-Natal",
    city: "Pinetown",
    stipend: "R4 000 / month stipend",
    closingDate: "2026-09-28",
    nqf: "NQF 4 (Matric)",
    fields: ["Retail & Logistics"],
    remote: "On-site",
    matchScore: 67,
    matchReasons: ["Entry requirements are matric-level", "Warehouse experience on your CV is directly relevant"],
    gaps: ["Early shift start (05:30) may affect public transport plans"],
    summary: "A 12-month learnership in warehousing and freight handling with an accredited NQF 3 certificate on completion.",
    requirements: ["Matric or NQF 3 equivalent", "Physically able to work in a warehouse", "Aged 18–34"],
    verified: false,
  },
];

export const wilPartners = [
  {
    id: "wil-1",
    institution: "Tshwane University of Technology",
    programme: "National Diploma: Electrical Engineering",
    seats: 24,
    hostEmployers: ["Eskom", "Actom", "City of Tshwane"],
    province: "Gauteng",
  },
  {
    id: "wil-2",
    institution: "False Bay TVET College",
    programme: "NC(V) Office Administration",
    seats: 40,
    hostEmployers: ["Sanlam", "City of Cape Town", "Shoprite Checkers"],
    province: "Western Cape",
  },
  {
    id: "wil-3",
    institution: "Durban University of Technology",
    programme: "Diploma: Information Technology",
    seats: 18,
    hostEmployers: ["Derivco", "Transnet", "BET Software"],
    province: "KwaZulu-Natal",
  },
  {
    id: "wil-4",
    institution: "Buffalo City TVET College",
    programme: "Report 191: Engineering Studies N6",
    seats: 32,
    hostEmployers: ["Mercedes-Benz SA", "Amatola Water"],
    province: "Eastern Cape",
  },
];

export const academyModules = [
  {
    id: "mod-1",
    title: "CV & Cover Letter Foundations",
    lessons: 6,
    completed: 6,
    minutes: 45,
    skill: "Employability",
  },
  { id: "mod-2", title: "Interview Confidence in South Africa", lessons: 8, completed: 5, minutes: 70, skill: "Interviewing" },
  { id: "mod-3", title: "Digital Literacy Essentials", lessons: 10, completed: 3, minutes: 90, skill: "Digital" },
  { id: "mod-4", title: "Financial Basics for Your First Salary", lessons: 5, completed: 0, minutes: 40, skill: "Life skills" },
  { id: "mod-5", title: "Workplace Communication & Etiquette", lessons: 7, completed: 2, minutes: 55, skill: "Professional" },
  { id: "mod-6", title: "Starting a Side Hustle Legally", lessons: 6, completed: 0, minutes: 60, skill: "Entrepreneurship" },
];
