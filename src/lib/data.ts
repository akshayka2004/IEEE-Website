export const stats = [
  { count: 500, suffix: "+", label: "Members", note: "A growing community" },
  { count: 50, suffix: "+", label: "Events", note: "Workshops, talks, competitions" },
  { count: 7, suffix: "", label: "Societies", note: "Diverse domains, one vision" },
  { count: 25, suffix: "+", label: "Achievements", note: "Recognitions that inspire" },
];

export type EventItem = {
  slug: string;
  date: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  status: "upcoming" | "past";
};

export const events: EventItem[] = [
  {
    slug: "ai-ml-workshop",
    date: "24 SEP",
    tag: "Workshop",
    title: "AI & Machine Learning Workshop",
    desc: "Hands-on session on real-world applications of AI and ML.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=900&q=85",
    status: "upcoming",
  },
  {
    slug: "iot-sustainable-future",
    date: "05 OCT",
    tag: "Technical Talk",
    title: "IoT for a Sustainable Future",
    desc: "Exploring the role of IoT in building a smarter world.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
    status: "upcoming",
  },
  {
    slug: "ieee-hackathon-2025",
    date: "12 OCT",
    tag: "Hackathon",
    title: "IEEE Hackathon 2025",
    desc: "Innovate. Build. Solve real challenges.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=85",
    status: "upcoming",
  },
  {
    slug: "women-in-engineering-meet",
    date: "18 AUG",
    tag: "Panel",
    title: "Women in Engineering Meet",
    desc: "Conversations with alumnae shaping the future of tech.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=900&q=85",
    status: "past",
  },
  {
    slug: "robotics-bootcamp",
    date: "02 AUG",
    tag: "Bootcamp",
    title: "Robotics & Automation Bootcamp",
    desc: "Three-day intensive on building and programming robots.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=900&q=85",
    status: "past",
  },
  {
    slug: "paper-presentation",
    date: "20 JUL",
    tag: "Symposium",
    title: "Student Paper Presentation Symposium",
    desc: "Showcasing undergraduate research across engineering domains.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=85",
    status: "past",
  },
];

export type Person = {
  name: string;
  role: string;
  image: string;
};

export const execom: Person[] = [
  { name: "Adarsh N", role: "Chair", image: "https://i.pravatar.cc/500?img=12" },
  { name: "Meera S", role: "Vice Chair", image: "https://i.pravatar.cc/500?img=47" },
  { name: "Rohan P", role: "Secretary", image: "https://i.pravatar.cc/500?img=11" },
  { name: "Diya M", role: "Treasurer", image: "https://i.pravatar.cc/500?img=44" },
  { name: "Karthik V", role: "Webmaster", image: "https://i.pravatar.cc/500?img=13" },
  { name: "Anjali R", role: "Events Lead", image: "https://i.pravatar.cc/500?img=48" },
  { name: "Nikhil S", role: "Publicity Lead", image: "https://i.pravatar.cc/500?img=14" },
  { name: "Sruthi K", role: "Design Lead", image: "https://i.pravatar.cc/500?img=45" },
];

export type Society = {
  code: string;
  name: string;
  desc: string;
};

export const societies: Society[] = [
  { code: "CS", name: "IEEE Computer Society", desc: "Software, algorithms and computing systems." },
  { code: "CIS", name: "IEEE CIS", desc: "Computational intelligence and machine learning." },
  { code: "PES", name: "IEEE PES", desc: "Power and energy systems engineering." },
  { code: "RAS", name: "IEEE RAS", desc: "Robotics and autonomous systems." },
  { code: "WIE", name: "IEEE WIE", desc: "Advancing women in engineering." },
  { code: "SPS", name: "IEEE SPS", desc: "Signal processing theory and applications." },
  { code: "PHO", name: "IEEE Photonics", desc: "Light-based technology and devices." },
  { code: "SB", name: "IEEE Student Branch", desc: "The umbrella body connecting every society." },
];

export type GalleryPhoto = {
  image: string;
  caption: string;
};

export const gallery: GalleryPhoto[] = [
  { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85", caption: "IEEE Event" },
  { image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=900&q=85", caption: "Workshop" },
  { image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=900&q=85", caption: "Community" },
  { image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1000&q=85", caption: "Team" },
  { image: "https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&w=900&q=85", caption: "Competition" },
  { image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=85", caption: "Activity" },
  { image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&w=900&q=85", caption: "Hackathon" },
  { image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=900&q=85", caption: "Panel Talk" },
  { image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=85", caption: "Celebration" },
  { image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=85", caption: "Meetup" },
  { image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=900&q=85", caption: "Coding Session" },
  { image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85", caption: "Award Night" },
];

export const missions = [
  {
    number: "01",
    title: "Our Mission",
    desc: "Empowering students through technical knowledge, collaboration and hands-on experiences.",
  },
  {
    number: "02",
    title: "Our Vision",
    desc: "Building a community where engineering ideas become meaningful real-world impact.",
  },
  {
    number: "03",
    title: "Our Values",
    desc: "Integrity, curiosity and inclusion guide every project, event and partnership we take on.",
  },
  {
    number: "04",
    title: "Our Approach",
    desc: "Learning by building — workshops, competitions and mentorship rooted in practice.",
  },
];
