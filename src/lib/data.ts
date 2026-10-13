/*
 * Editable site content.
 * `stats` and `execom` are real. Events, societies, gallery and the rest
 * are SAMPLE CONTENT from the original design mock-up (those pages are
 * hidden — see lib/pages.ts) and must be replaced before they are re-launched.
 */

export const stats = [
  { count: 250, suffix: "+", label: "Members", note: "A growing community" },
  { count: 100, suffix: "+", label: "Activities", note: "Workshops, talks, competitions" },
  { count: 8, suffix: "", label: "Societies", note: "Diverse domains, one vision" },
  { count: 1, suffix: "", label: "Affinity Group", note: "A dedicated community" },
  { count: 15, suffix: "+", label: "Achievements", note: "Recognitions that inspire" },
];

export type RawEvent = {
  slug: string;
  /** ISO calendar date (YYYY-MM-DD), Indian Standard Time */
  startsAt: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  /** society code this event belongs to */
  society?: string;
};

export const rawEvents: RawEvent[] = [
  {
    slug: "ai-ml-workshop",
    startsAt: "2026-10-24",
    tag: "Workshop",
    title: "AI & Machine Learning Workshop",
    desc: "Hands-on session on real-world applications of AI and ML.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
    society: "CIS",
  },
  {
    slug: "iot-sustainable-future",
    startsAt: "2026-11-05",
    tag: "Technical Talk",
    title: "IoT for a Sustainable Future",
    desc: "Exploring the role of IoT in building a smarter world.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
    society: "CS",
  },
  {
    slug: "ieee-hackathon-2026",
    startsAt: "2026-11-14",
    tag: "Hackathon",
    title: "IEEE Hackathon 2026",
    desc: "Innovate. Build. Solve real challenges.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=85",
    society: "CS",
  },
  {
    slug: "signal-processing-seminar",
    startsAt: "2026-11-21",
    tag: "Seminar",
    title: "Signal Processing in Everyday Devices",
    desc: "A seminar on how signal processing powers the devices we use daily.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=85",
  },
  {
    slug: "power-systems-visit",
    startsAt: "2026-12-05",
    tag: "Site Visit",
    title: "Power Systems Industry Visit",
    desc: "A guided visit to see grid and power infrastructure up close.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=900&q=85",
    society: "PES",
  },
  {
    slug: "women-in-engineering-meet",
    startsAt: "2026-08-18",
    tag: "Panel",
    title: "Women in Engineering Meet",
    desc: "Conversations with alumnae shaping the future of tech.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=85",
    society: "WIE",
  },
  {
    slug: "robotics-bootcamp",
    startsAt: "2026-08-02",
    tag: "Bootcamp",
    title: "Robotics & Automation Bootcamp",
    desc: "Three-day intensive on building and programming robots.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85",
    society: "RAS",
  },
  {
    slug: "paper-presentation",
    startsAt: "2026-07-20",
    tag: "Symposium",
    title: "Student Paper Presentation Symposium",
    desc: "Showcasing undergraduate research across engineering domains.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
  },
];

export const eventDetails: Record<string, { venue: string; time: string; about: string[] }> = {
  "ai-ml-workshop": {
    venue: "Saintgits College of Engineering",
    time: "To be announced",
    about: [
      "A hands-on session exploring how artificial intelligence and machine learning are applied to real-world problems.",
      "Participants work through guided exercises and leave with practical experience they can apply to their own projects.",
    ],
  },
  "iot-sustainable-future": {
    venue: "Saintgits College of Engineering",
    time: "To be announced",
    about: [
      "A technical talk on the role of the Internet of Things in building smarter, more sustainable systems.",
      "Expect case studies, live demonstrations and an open Q&A with the speakers.",
    ],
  },
  "ieee-hackathon-2026": {
    venue: "Saintgits College of Engineering",
    time: "To be announced",
    about: [
      "Innovate. Build. Solve real challenges. Teams of students work against the clock to prototype solutions and pitch them to a panel.",
      "Open to students from every department — bring an idea, find a team and build.",
    ],
  },
  "signal-processing-seminar": {
    venue: "Saintgits College of Engineering",
    time: "To be announced",
    about: [
      "A seminar unpacking the signal processing behind audio, imaging and communication devices.",
      "Suitable for students from any branch curious about how raw signals become useful information.",
    ],
  },
  "power-systems-visit": {
    venue: "Off campus — details shared on registration",
    time: "To be announced",
    about: [
      "A guided industry visit to observe power generation and distribution infrastructure first-hand.",
      "Seats are limited; registered students receive travel and safety instructions in advance.",
    ],
  },
  "women-in-engineering-meet": {
    venue: "Saintgits College of Engineering",
    time: "Concluded",
    about: ["A panel conversation with alumnae shaping the future of technology, followed by an open networking session."],
  },
  "robotics-bootcamp": {
    venue: "Saintgits College of Engineering",
    time: "Concluded",
    about: ["A three-day intensive on building and programming robots, from mechanical assembly to control logic."],
  },
  "paper-presentation": {
    venue: "Saintgits College of Engineering",
    time: "Concluded",
    about: ["A symposium showcasing undergraduate research across engineering domains, with feedback from faculty reviewers."],
  },
};

export type Person = {
  name: string;
  role: string;
  /** Path under /public */
  image: string;
};

/** Executive committee, in display order. Photos live in /public/execom. */
export const execom: Person[] = [
  { name: "Dr. Abraham George", role: "Branch Counselor", image: "/execom/dr-abraham-george.jpg" },
  { name: "Arin T S", role: "Chair", image: "/execom/arin-t-s.jpg" },
  { name: "Shone Sajan", role: "Vice Chair", image: "/execom/shone-sajan.jpg" },
  { name: "Nandana R K", role: "Secretary", image: "/execom/nandana-r-k.jpg" },
  { name: "Reuben Skariah", role: "Treasurer", image: "/execom/reuben-skariah.jpg" },
  { name: "Mekha Rachel Moncy", role: "Webmaster", image: "/execom/mekha-rachel-moncy.jpg" },
  { name: "Reuben Mathew Thomas", role: "Webmaster", image: "/execom/reuben-mathew-thomas.jpg" },
  { name: "Afiya Irshad", role: "Membership Development Lead", image: "/execom/afiya-irshad.jpg" },
  { name: "Aaron Binoy", role: "Publicity Lead", image: "/execom/aaron-binoy.jpg" },
  { name: "Adhil Kurian John", role: "Media Lead", image: "/execom/adhil-kurian-john.jpg" },
  { name: "Diya Saira Abraham", role: "Content Lead", image: "/execom/diya-saira-abraham.jpg" },
  { name: "Pranav Suresh", role: "Content Team", image: "/execom/pranav-suresh.jpg" },
  { name: "Abhiram Madhu", role: "Event Coordinator", image: "/execom/abhiram-madhu.jpg" },
  { name: "Alvin Varghese Kurian", role: "Event Coordinator", image: "/execom/alvin-varghese-kurian.jpg" },
  { name: "Arundhathy Devi L", role: "Event Coordinator", image: "/execom/arundhathy-devi-l.jpg" },
  { name: "Andrew Jos Sebastian", role: "Technical Coordinator", image: "/execom/andrew-jos-sebastian.jpg" },
  { name: "Nandana Viswanath", role: "Awards Coordinator", image: "/execom/nandana-viswanath.jpg" },
  { name: "Amal Jebi", role: "Media and Design", image: "/execom/amal-jebi.jpg" },
  { name: "Hanna K Abraham", role: "Design Team", image: "/execom/hanna-k-abraham.jpg" },
  { name: "Nabeel Navas", role: "Videographer", image: "/execom/nabeel-navas.jpg" },
];

/** The four office bearers shown on the home page. */
export const officeBearers: Person[] = execom.filter((p) => ["Chair", "Vice Chair", "Secretary", "Treasurer"].includes(p.role));

export type Society = {
  code: string;
  slug: string;
  name: string;
  /** "society" = technical society, "affinity" = affinity group */
  kind: "society" | "affinity";
  desc: string;
  about: string[];
  focus: string[];
  /** Path under /public */
  logo: string;
  /** Official IEEE website */
  url: string;
};

/** The branch's 8 technical societies and 1 affinity group. Logos live in /public/societies. */
export const societies: Society[] = [
  {
    code: "CAS",
    slug: "cas",
    name: "IEEE Circuits and Systems Society",
    kind: "society",
    desc: "Theory, analysis and design of circuits and systems.",
    about: ["The IEEE Circuits and Systems Society is concerned with the theory, analysis, design and implementation of circuits and systems.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Analog & digital circuits","Signal processing","Systems design"],
    logo: "/society-logos/cas.png",
    url: "https://ieee-cas.org",
  },
  {
    code: "CIS",
    slug: "cis",
    name: "IEEE Computational Intelligence Society",
    kind: "society",
    desc: "Neural networks, fuzzy systems and evolutionary computation.",
    about: ["The IEEE Computational Intelligence Society covers the theory and application of neural networks, fuzzy systems and evolutionary computation.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Neural networks","Fuzzy systems","Evolutionary computation"],
    logo: "/society-logos/cis.png",
    url: "https://cis.ieee.org",
  },
  {
    code: "ComSoc",
    slug: "comsoc",
    name: "IEEE Communications Society",
    kind: "society",
    desc: "Communications and networking technologies.",
    about: ["The IEEE Communications Society advances communications and networking technologies, from wireless systems to optical networks.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Wireless & mobile","Networking","Optical communications"],
    logo: "/society-logos/comsoc.png",
    url: "https://www.comsoc.org",
  },
  {
    code: "CS",
    slug: "cs",
    name: "IEEE Computer Society",
    kind: "society",
    desc: "Computing, software and information technology.",
    about: ["The IEEE Computer Society is a leading body for computing and information technology professionals and students.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Software engineering","Computing systems","Cybersecurity"],
    logo: "/society-logos/cs.png",
    url: "https://www.computer.org",
  },
  {
    code: "IAS",
    slug: "ias",
    name: "IEEE Industry Applications Society",
    kind: "society",
    desc: "Electrical and electronic systems applied in industry.",
    about: ["The IEEE Industry Applications Society focuses on the application of electrical and electronic systems in industry and commerce.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Electric machines & drives","Industrial automation","Power systems"],
    logo: "/society-logos/ias.png",
    url: "https://ias.ieee.org",
  },
  {
    code: "PES",
    slug: "pes",
    name: "IEEE Power & Energy Society",
    kind: "society",
    desc: "Electric power generation, delivery and use.",
    about: ["The IEEE Power & Energy Society covers the generation, transmission, distribution and use of electric power.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Power systems","Renewable energy","Smart grids"],
    logo: "/society-logos/pes.png",
    url: "https://ieee-pes.org",
  },
  {
    code: "RAS",
    slug: "ras",
    name: "IEEE Robotics and Automation Society",
    kind: "society",
    desc: "Robotics, automation and intelligent machines.",
    about: ["The IEEE Robotics and Automation Society advances the theory and practice of robotics and automation.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Robotics","Automation","Intelligent machines"],
    logo: "/society-logos/ras.png",
    url: "https://www.ieee-ras.org",
  },
  {
    code: "SSCS",
    slug: "sscs",
    name: "IEEE Solid-State Circuits Society",
    kind: "society",
    desc: "Design and technology of solid-state and integrated circuits.",
    about: ["The IEEE Solid-State Circuits Society focuses on the design and technology of solid-state and integrated circuits.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Integrated circuits","Analog & mixed-signal","IC design"],
    logo: "/society-logos/sscs.png",
    url: "https://sscs.ieee.org",
  },
  {
    code: "WIE",
    slug: "wie",
    name: "IEEE Women in Engineering",
    kind: "affinity",
    desc: "Supporting and inspiring women in engineering and science.",
    about: ["IEEE Women in Engineering is an IEEE affinity group that supports and inspires women in engineering and science.", "One of the IEEE societies active at the Saintgits IEEE Student Branch."],
    focus: ["Mentorship","Leadership","Outreach"],
    logo: "/society-logos/wie.png",
    url: "https://wie.ieee.org",
  },
];

export type GalleryCategory = "Events" | "Workshops" | "Community" | "Competitions";

export type GalleryPhoto = {
  image: string;
  caption: string;
  category: GalleryCategory;
};

const photo = (id: string, w: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;

export const gallery: GalleryPhoto[] = [
  { image: photo("photo-1540575467063-178a50c2df87", 1000), caption: "IEEE Event", category: "Events" },
  { image: photo("photo-1531482615713-2afd69097998", 900), caption: "Workshop", category: "Workshops" },
  { image: photo("photo-1529156069898-49953e39b3ac", 900), caption: "Community", category: "Community" },
  { image: photo("photo-1556761175-b413da4baf72", 1000), caption: "Team", category: "Community" },
  { image: photo("photo-1505236858219-8359eb29e329", 900), caption: "Competition", category: "Competitions" },
  { image: photo("photo-1531058020387-3be344556be6", 900), caption: "Activity", category: "Workshops" },
  { image: photo("photo-1591115765373-5207764f72e7", 900), caption: "Hackathon", category: "Competitions" },
  { image: photo("photo-1515187029135-18ee286d815b", 900), caption: "Panel Talk", category: "Events" },
  { image: photo("photo-1522202176988-66273c2fd55f", 900), caption: "Celebration", category: "Community" },
  { image: photo("photo-1587825140708-dfaf72ae4b04", 900), caption: "Meetup", category: "Events" },
  { image: photo("photo-1524178232363-1fb2b075b655", 900), caption: "Coding Session", category: "Workshops" },
  { image: photo("photo-1516321318423-f06f85e504b3", 900), caption: "Award Night", category: "Events" },
];

export const missions = [
  {
    number: "01",
    id: "mission",
    title: "Our Mission",
    desc: "Empowering students through technical knowledge, collaboration and hands-on experiences.",
    points: ["Technical sessions that go beyond the syllabus", "Hands-on workshops and build sessions", "Collaboration across departments and societies"],
  },
  {
    number: "02",
    id: "vision",
    title: "Our Vision",
    desc: "Building a community where engineering ideas become meaningful real-world impact.",
    points: ["A campus where curiosity is rewarded", "Projects that solve real problems", "Graduates ready to lead in technology"],
  },
  {
    number: "03",
    id: "values",
    title: "Our Values",
    desc: "Integrity, curiosity and inclusion guide every project, event and partnership we take on.",
    points: ["Integrity in everything we do", "Curiosity over comfort", "Inclusion — every student belongs here"],
  },
  {
    number: "04",
    id: "approach",
    title: "Our Approach",
    desc: "Learning by building — workshops, competitions and mentorship rooted in practice.",
    points: ["Learn by doing, not just listening", "Mentorship from seniors and alumni", "Competitions that stretch skills"],
  },
];
