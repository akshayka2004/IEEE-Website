/*
 * Editable site content.
 * Everything here is SAMPLE CONTENT taken from the original design mock-up —
 * replace it with real branch data before launch.
 */

export const stats = [
  { count: 500, suffix: "+", label: "Members", note: "A growing community" },
  { count: 50, suffix: "+", label: "Events", note: "Workshops, talks, competitions" },
  { count: 0, suffix: "", label: "Societies", note: "Diverse domains, one vision" },
  { count: 25, suffix: "+", label: "Achievements", note: "Recognitions that inspire" },
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
    society: "SPS",
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
    society: "SB",
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
  image: string;
  bio: string;
  department?: string;
  email?: string;
  linkedin?: string;
  portfolio?: string;
  github?: string;
  ieeeId?: string;
};

export const execom: Person[] = [
  {
    name: "Adarsh N",
    role: "Chair",
    image: "https://i.pravatar.cc/500?img=12",
    bio: "Sets the direction of the branch, represents it to IEEE and the college, and coordinates the executive committee.",
    department: "Computer Science & Engineering",
    email: "adarsh.n@ieee.org",
    linkedin: "https://linkedin.com/in/adarsh-n",
    portfolio: "https://adarshn.dev",
    github: "https://github.com/adarshn",
    ieeeId: "IEEE-98741023",
  },
  {
    name: "Meera S",
    role: "Vice Chair",
    image: "https://i.pravatar.cc/500?img=47",
    bio: "Supports the Chair, oversees society activity and steps in to lead when the Chair is unavailable.",
    department: "Electronics & Communication",
    email: "meera.s@ieee.org",
    linkedin: "https://linkedin.com/in/meera-s",
    portfolio: "https://meeras.design",
    github: "https://github.com/meeras",
    ieeeId: "IEEE-98741024",
  },
  {
    name: "Rohan P",
    role: "Secretary",
    image: "https://i.pravatar.cc/500?img=11",
    bio: "Keeps records, minutes and official communication so the branch runs smoothly and transparently.",
    department: "Electrical & Electronics",
    email: "rohan.p@ieee.org",
    linkedin: "https://linkedin.com/in/rohan-p",
    portfolio: "https://rohanp.me",
    github: "https://github.com/rohanp",
    ieeeId: "IEEE-98741025",
  },
  {
    name: "Diya M",
    role: "Treasurer",
    image: "https://i.pravatar.cc/500?img=44",
    bio: "Manages the branch budget, event expenses and financial reporting.",
    department: "Computer Science & Engineering",
    email: "diya.m@ieee.org",
    linkedin: "https://linkedin.com/in/diya-m",
    portfolio: "https://diyam.dev",
    github: "https://github.com/diyam",
    ieeeId: "IEEE-98741026",
  },
  {
    name: "Karthik V",
    role: "Webmaster",
    image: "https://i.pravatar.cc/500?img=13",
    bio: "Maintains this website and the branch's digital presence.",
    department: "Computer Science & Engineering",
    email: "karthik.v@ieee.org",
    linkedin: "https://linkedin.com/in/karthik-v",
    portfolio: "https://karthikv.dev",
    github: "https://github.com/karthikv",
    ieeeId: "IEEE-98741027",
  },
  {
    name: "Anjali R",
    role: "Events Lead",
    image: "https://i.pravatar.cc/500?img=48",
    bio: "Plans and runs workshops, talks and competitions from first idea to final feedback.",
    department: "Mechanical Engineering",
    email: "anjali.r@ieee.org",
    linkedin: "https://linkedin.com/in/anjali-r",
    portfolio: "https://anjalir.me",
    github: "https://github.com/anjalir",
    ieeeId: "IEEE-98741028",
  },
  {
    name: "Nikhil S",
    role: "Publicity Lead",
    image: "https://i.pravatar.cc/500?img=14",
    bio: "Spreads the word about branch activities across campus and social channels.",
    department: "Electronics & Communication",
    email: "nikhil.s@ieee.org",
    linkedin: "https://linkedin.com/in/nikhil-s",
    portfolio: "https://nikhils.dev",
    github: "https://github.com/nikhils",
    ieeeId: "IEEE-98741029",
  },
  {
    name: "Sruthi K",
    role: "Design Lead",
    image: "https://i.pravatar.cc/500?img=45",
    bio: "Creates posters, banners and visual identity for every branch event.",
    department: "Computer Science & Engineering",
    email: "sruthi.k@ieee.org",
    linkedin: "https://linkedin.com/in/sruthi-k",
    portfolio: "https://sruthik.design",
    github: "https://github.com/sruthik",
    ieeeId: "IEEE-98741030",
  },
];

export type Society = {
  code: string;
  slug: string;
  name: string;
  desc: string;
  about: string[];
  focus: string[];
};

export const societies: Society[] = [
  {
    code: "CS",
    slug: "cs",
    name: "IEEE Computer Society",
    desc: "Software, algorithms and computing systems.",
    about: ["The Computer Society chapter focuses on software, algorithms, systems and everything that makes modern computing work.", "Members run coding sessions, hackathons and talks on emerging computing topics."],
    focus: ["Software engineering", "Algorithms", "Cloud & systems", "Cybersecurity"],
  },
  {
    code: "CIS",
    slug: "cis",
    name: "IEEE CIS",
    desc: "Computational intelligence and machine learning.",
    about: ["The Computational Intelligence Society explores machine learning, neural networks and intelligent systems.", "Activities include workshops, reading groups and project showcases."],
    focus: ["Machine learning", "Neural networks", "Data science", "Fuzzy systems"],
  },
  {
    code: "PES",
    slug: "pes",
    name: "IEEE PES",
    desc: "Power and energy systems engineering.",
    about: ["The Power & Energy Society covers generation, distribution and the transition to sustainable energy.", "Expect industry visits, expert lectures and hands-on energy projects."],
    focus: ["Renewable energy", "Smart grids", "Power electronics", "Energy efficiency"],
  },
  {
    code: "RAS",
    slug: "ras",
    name: "IEEE RAS",
    desc: "Robotics and autonomous systems.",
    about: ["The Robotics & Automation Society brings together students who love building machines that sense, decide and act.", "Bootcamps, build nights and competitions keep the workshop busy."],
    focus: ["Robotics", "Automation", "Embedded systems", "Computer vision"],
  },
  {
    code: "WIE",
    slug: "wie",
    name: "IEEE WIE",
    desc: "Advancing women in engineering.",
    about: ["Women in Engineering champions women in technical fields through mentoring, networking and visibility.", "Panels, career sessions and community events are open to everyone."],
    focus: ["Mentorship", "Leadership", "Networking", "Outreach"],
  },
  {
    code: "SPS",
    slug: "sps",
    name: "IEEE SPS",
    desc: "Signal processing theory and applications.",
    about: ["The Signal Processing Society covers how signals — audio, images, communications — are captured, analysed and transformed.", "Seminars and mini-projects connect theory to everyday devices."],
    focus: ["Audio & speech", "Image processing", "Communications", "DSP"],
  },
  {
    code: "PHO",
    slug: "pho",
    name: "IEEE Photonics",
    desc: "Light-based technology and devices.",
    about: ["The Photonics chapter explores lasers, optics and light-based technologies shaping communications and sensing.", "Expect lab demonstrations and guest talks from researchers."],
    focus: ["Optics", "Lasers", "Fibre communication", "Sensing"],
  },
  {
    code: "SB",
    slug: "sb",
    name: "IEEE Student Branch",
    desc: "The umbrella body connecting every society.",
    about: ["The Student Branch is the umbrella body that connects every society and runs branch-wide events.", "It is the best place to start if you are new to IEEE."],
    focus: ["Community", "Professional development", "Cross-society events", "Outreach"],
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
