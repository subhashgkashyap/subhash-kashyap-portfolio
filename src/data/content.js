/**
 * Every string in this file comes from Subhash G Kashyap's resume or LinkedIn
 * profile. Nothing here is invented - if a detail is not in those two
 * documents, it is not on the site.
 */

export const profile = {
  name: 'Subhash G Kashyap',
  shortName: 'Subhash',
  headline:
    'Software Engineer at Infoblox | ServiceNow Developer | ITSM | Platform Customization | HRSD',
  role: 'ServiceNow Developer',
  location: 'Bengaluru, Karnataka, India',
  email: 'sgkashyap2000@gmail.com',
  phone: '+91 9591957689',
  linkedin: 'https://www.linkedin.com/in/subhashgurumurthykashyap/',
  github: 'https://github.com/subhashgkashyap',
  resume: '/Subhash-G-Kashyap-Resume.pdf',
  summary:
    'Certified ServiceNow Professional with 3+ years of experience in designing, developing, and testing ServiceNow solutions in ITSM, HRSD and Platform Customization. Skilled in implementing scalable workflows, automate processes, and deliver high-quality solutions that enhance employee experience.',
  about: [
    'A ServiceNow Certified Professional with over 3+ years of focused experience on the ServiceNow platform, I’ve successfully implemented and managed solutions that bridge the gap between technology and service delivery.',
    'As a dedicated and detail-oriented ServiceNow Developer and tester, I am committed to delivering solutions and assuring quality for ServiceNow implementations, including ITSM and HRSD modules. I thrive on identifying and resolving issues early in the development cycle, leveraging test scripts, and best practices to ensure smooth user experiences.',
  ],
}

/**
 * Lines that type out one after another under the name in the hero.
 * Deliberately generic - no employer, no location.
 */
export const heroLines = [
  'I design, develop and test ServiceNow solutions.',
  'ITSM, HRSD and platform customization.',
  'Certified ServiceNow professional, 3+ years in.',
]

export const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Expertise', href: '#expertise' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export const marqueeWords = [
  'ITSM',
  'HRSD',
  'PLATFORM CUSTOMIZATION',
  'FLOW DESIGNER',
  'NOW ASSIST',
  'MAJOR INCIDENT MANAGEMENT',
  'WORKFLOW AUTOMATION',
]

/** Domains drawn from the resume's experience bullets and skills section. */
export const expertise = [
  {
    number: '01.',
    title: 'ITSM.',
    body: 'Manual and ATF testing across incident and problem management, record producers and server-side scripts including business rules, updates to existing workflows, and service catalog forms and fields customized to the process requirement.',
    tone: 'cocoa',
    art: 'blush',
    img: '/images/expertise-itsm.jpg',
    imgAlt: 'Lines of code on a developer monitor',
  },
  {
    number: '02.',
    title: 'HRSD.',
    body: 'HR onboarding automated with Lifecycle Events and Case Management, email automation for faster user communication, scheduled jobs for recurring data updates, and full-cycle testing across the HRSD applications.',
    tone: 'wine',
    art: 'rose',
    img: '/images/expertise-hrsd.jpg',
    imgAlt: 'Engineer working at a bright office desk',
  },
  {
    number: '03.',
    title: 'Platform Customization.',
    body: 'User interface customizations, workflow automation, business rules, client scripts, UI policies and service catalog management - with update sets created and moved across development, testing and production instances.',
    tone: 'bark',
    art: 'sand',
    img: '/images/expertise-platform.jpg',
    imgAlt: 'Hands typing code on a laptop',
  },
]

/** Roles exactly as listed on LinkedIn. */
export const roles = [
  {
    company: 'Infoblox',
    title: 'Software Engineer I',
    period: 'February 2026 - Present',
    location: 'Bengaluru',
  },
  {
    company: 'Infosys',
    title: 'Senior Systems Engineer',
    period: 'April 2025 - January 2026',
    location: 'Bengaluru',
  },
  {
    company: 'Infosys',
    title: 'Systems Engineer',
    period: 'July 2023 - April 2025',
    location: 'Bengaluru, Karnataka, India',
  },
  {
    company: 'Infosys',
    title: 'System Engineer Trainee',
    period: 'February 2023 - July 2023',
    location: 'Mysuru, Karnataka, India',
  },
]

/*
 * CLIENT ENGAGEMENTS - NOT DISPLAYED.
 *
 * Named clients (PepsiCo, Proximus) were taken off the site. This sits inside a
 * comment, so it is stripped at build time and never reaches a visitor or the
 * page source. To restore: uncomment this block and the engagements block in
 * src/components/Experience.jsx.
 *
 * export const engagements = [
 *   {
 *     role: 'ServiceNow Developer',
 *     client: 'PepsiCo HRSD',
 *     org: 'Infosys Limited',
 *     period: 'From August 2024',
 *     points: [
 *       'Automated HR onboarding using Lifecycle Events & Case Management, reducing manual HR intervention by 40% and improving new-hire experience for a global food & beverage client.',
 *       'Developed Business Rules, and Script Includes to address complex client use cases, reducing recurring incidents by 25%.',
 *       'Implemented email automation, improving user communication speed and reducing follow-ups and improving SLA adherence by 15%.',
 *       'Built Scheduled Jobs for recurring data updates, saving 20+ hours/month in manual effort.',
 *       'Supported UAT & sprint planning, ensuring 100% story completion rate across multiple sprints.',
 *       'Executed full-cycle testing for the HRSD applications, assuring the quality of the solutions and improving defect detection.',
 *     ],
 *   },
 *   {
 *     role: 'Tester (initial) & Developer (later)',
 *     client: 'Proximus',
 *     org: 'Infosys Limited',
 *     period: 'September 2023 - July 2024',
 *     points: [
 *       'Conducted manual & ATF Testing for various components in the ITSM domain for incident and problem management.',
 *       'Developed record producers, server side scripts, including business rules.',
 *       'Worked on updating the existing workflows based on the requirement.',
 *       'Created and customized forms, fields for Service catalogs as per the process requirement.',
 *       'Knowledge of update set creation and movement across development, testing and production instances.',
 *     ],
 *   },
 * ]
 */

/*
 * BY THE NUMBERS - NOT DISPLAYED.
 *
 * See INTERVIEW-NOTES.md for how to talk about each of these figures. To restore:
 * uncomment this block and the two <Numbers /> lines in src/App.jsx.
 *
 * export const numbers = [
 *   { value: 40, suffix: '%', label: 'Less manual HR intervention' },
 *   { value: 25, suffix: '%', label: 'Fewer recurring incidents' },
 *   { value: 15, suffix: '%', label: 'Better SLA adherence' },
 *   { value: 20, suffix: '+', label: 'Hours saved each month' },
 * ]
 */

export const skillGroups = [
  { title: 'Languages', items: ['JavaScript', 'Java', 'Python', 'SQL'] },
  {
    title: 'ServiceNow Development',
    items: [
      'User Interface Customizations',
      'Workflow Automation',
      'Business Rules',
      'Client Scripts',
      'UI Policies',
      'Service Catalog Management',
      'ITSM',
      'HRSD',
    ],
  },
  { title: 'Web Development', items: ['HTML', 'CSS', 'Bootstrap'] },
  {
    title: 'Developer Tools',
    items: ['Git', 'Visual Studio Code', 'Eclipse IDE', 'ServiceNow Studio'],
  },
  { title: 'DevOps Tools', items: ['Azure DevOps'] },
  { title: 'Top Skills', items: ['Now Assist', 'Major Incident Management', 'Flow Designer'] },
]

/** The reference site's "get to know" Q&A grid, answered with real details. */
export const gettingToKnow = [
  {
    q: 'Where I’m based?',
    a: 'Bengaluru, Karnataka, India.',
  },
  {
    q: 'What I do?',
    a: 'Software Engineer I at Infoblox - designing, developing and testing ServiceNow solutions across ITSM, HRSD and Platform Customization.',
  },
  {
    q: 'Top skills?',
    a: 'Now Assist, Major Incident Management and Flow Designer.',
  },
  {
    q: 'Where I studied?',
    a: 'Visvesvaraya Technological University - Bachelor of Technology in Computer Science and Engineering, 2018 - 2022.',
  },
]

/** ServiceNow certifications only, listed plainly. */
export const certifications = [
  'ServiceNow Certified System Administrator',
  'ServiceNow Certified Application Developer',
  'ServiceNow Certified Implementation Specialist - IT Service Management',
  'ServiceNow Certified Implementation Specialist - Human Resources',
]

export const education = {
  school: 'Visvesvaraya Technological University',
  degree: 'Bachelor of Technology - Computer Science and Engineering',
  years: '2018 - 2022',
}

/*
 * ACCOMPLISHMENTS - NOT DISPLAYED.
 *
 * See INTERVIEW-NOTES.md for how to talk about each of these. To restore:
 * uncomment this block and the accomplishments block in
 * src/components/Certifications.jsx.
 *
 * export const accomplishments = [
 *   'Received an award for excellence, for ensuring high-quality deliverables by identifying critical defects.',
 *   'Conducted knowledge transfer (KT) sessions, fostering skill development & enhancing team performance.',
 *   'Assisted in the interview process and selection of team members.',
 * ]
 */
