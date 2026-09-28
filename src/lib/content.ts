/*
 * Long-form and social-proof content. Items marked `sample: true` are placeholders
 * and are hidden from production builds (see lib/sample.ts). Replace them with real
 * content and remove the flag to publish.
 */
import { live } from "./sample";

export type NewsPost = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  tag: string;
  excerpt: string;
  image: string;
  body: string[];
  sample?: boolean;
};

const allNews: NewsPost[] = [
  {
    slug: "women-in-engineering-meet-highlights",
    title: "Women in Engineering Meet: highlights and takeaways",
    date: "2026-08-20",
    tag: "Recap",
    excerpt: "Alumnae shared their journeys, lessons and advice for students starting out in technology.",
    image: "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=1200&q=85",
    body: [
      "The Women in Engineering Meet brought alumnae and current students together for an open conversation about building a career in technology.",
      "Panelists spoke about choosing a specialisation, finding mentors and navigating the first years of work. The discussion was followed by an informal networking session where students could continue the conversation one-on-one.",
      "Thank you to everyone who took part. Watch this space for the next WIE session.",
    ],
    sample: true,
  },
  {
    slug: "robotics-bootcamp-recap",
    title: "Robotics & Automation Bootcamp: three days of building",
    date: "2026-08-05",
    tag: "Recap",
    excerpt: "From wiring motors to writing control logic — a look back at the bootcamp.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=85",
    body: [
      "The Robotics & Automation Bootcamp ran over three days and took participants from mechanical assembly to programming their own robots.",
      "Each day paired a short concept session with long, practical build time so that every team left with something working.",
      "We plan to run a follow-up focused on autonomous navigation. Join the RAS society to hear first.",
    ],
    sample: true,
  },
  {
    slug: "paper-presentation-symposium-recap",
    title: "Student Paper Presentation Symposium: research on show",
    date: "2026-07-22",
    tag: "Recap",
    excerpt: "Undergraduate research across domains, presented and discussed with faculty reviewers.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=85",
    body: [
      "The symposium gave undergraduates a stage to present their work and receive feedback from faculty reviewers.",
      "Presentations spanned computing, power, communications and more, and sparked plenty of cross-department conversations.",
      "If you would like to present at the next edition, get in touch through the contact page.",
    ],
    sample: true,
  },
];

export const getNews = () => live(allNews).sort((a, b) => b.date.localeCompare(a.date));
export const getPost = (slug: string) => getNews().find((p) => p.slug === slug);

export function readingMinutes(paragraphs: string[]): number {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export type TimelineItem = { when: string; title: string; text: string; sample?: boolean };

const allTimeline: TimelineItem[] = [
  { when: "Beginnings", title: "The branch is founded", text: "A small group of students set out to create a space for learning beyond the classroom.", sample: true },
  { when: "First steps", title: "First technical sessions", text: "Regular talks and workshops begin, and the community starts to grow.", sample: true },
  { when: "Growth", title: "Societies take shape", text: "Special-interest societies form, each with its own projects and events.", sample: true },
  { when: "Momentum", title: "Flagship events", text: "Hackathons and symposiums become annual traditions across departments.", sample: true },
  { when: "Today", title: "A community that builds", text: "Hundreds of students learn, build and lead together every year.", sample: true },
];
export const getTimeline = () => live(allTimeline);

export type Achievement = {
  title: string;
  category: "Awards" | "Competitions" | "Recognition" | "Projects";
  text: string;
  sample?: boolean;
};

const allAchievements: Achievement[] = [
  { title: "Outstanding branch activity", category: "Recognition", text: "Recognised for consistent programming and member engagement.", sample: true },
  { title: "Hackathon podium finish", category: "Competitions", text: "Branch teams placed on the podium at an inter-college hackathon.", sample: true },
  { title: "Best student project", category: "Awards", text: "A member-built project was selected as best student project.", sample: true },
  { title: "Community outreach project", category: "Projects", text: "Students built a tool for a local community organisation.", sample: true },
  { title: "Paper accepted at a student conference", category: "Recognition", text: "Member research was accepted for presentation.", sample: true },
  { title: "Robotics challenge winners", category: "Competitions", text: "The RAS team won a regional robotics challenge.", sample: true },
];
export const getAchievements = () => live(allAchievements);

export type Testimonial = { quote: string; name: string; role: string; sample?: boolean };

const allTestimonials: Testimonial[] = [
  { quote: "The workshops gave me hands-on experience I never got in class, and the people around me made it easy to keep learning.", name: "Member", role: "Computer Science", sample: true },
  { quote: "Organising an event taught me more about teamwork and planning than any assignment.", name: "Member", role: "Electronics & Communication", sample: true },
  { quote: "It is the easiest way to meet people across departments who are excited about building things.", name: "Member", role: "Electrical Engineering", sample: true },
];
export const getTestimonials = () => live(allTestimonials);

export type NewsletterIssue = { title: string; date: string; summary: string; href?: string; sample?: boolean };

const allIssues: NewsletterIssue[] = [
  { title: "IEEE SB Inside — Issue 03", date: "2026-09-01", summary: "Bootcamp recap, society spotlights and what is coming this semester.", sample: true },
  { title: "IEEE SB Inside — Issue 02", date: "2026-08-01", summary: "Highlights from the Women in Engineering Meet and new member welcomes.", sample: true },
  { title: "IEEE SB Inside — Issue 01", date: "2026-07-01", summary: "Introducing the newsletter, the new execom and the year ahead.", sample: true },
];
export const getIssues = () => live(allIssues);

export const faqs = [
  {
    q: "Who can join the IEEE Student Branch?",
    a: "Any student of Saintgits College of Engineering can take part in branch activities. To become an official IEEE member you also register through IEEE itself, and our team can help you with that.",
  },
  {
    q: "Do I need to be an IEEE member to attend events?",
    a: "Requirements are listed on each event page. If you are unsure whether an event is open to you, send us a message and we will confirm.",
  },
  {
    q: "How do I become an official IEEE member?",
    a: "Visit the IEEE membership page, choose student membership and follow the steps. Use the form on this page and we will guide you through it.",
  },
  {
    q: "How do I register for an event?",
    a: "Open the event page and use the registration form. Upcoming events also have an add-to-calendar button so you do not miss them.",
  },
  {
    q: "Can I suggest a workshop or talk?",
    a: "Yes — ideas from members are how many of our sessions start. Send it through the contact page.",
  },
  {
    q: "How can I volunteer or lead?",
    a: "Tell us which society interests you in the join form. Volunteers help organise events and many go on to join the executive committee.",
  },
];
