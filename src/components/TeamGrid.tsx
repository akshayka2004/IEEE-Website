"use client";

import { useState } from "react";
import Img from "./Img";
import Modal from "./Modal";
import type { Person } from "@/lib/data";

export default function TeamGrid({ people, sizes = "(max-width: 700px) 50vw, 25vw" }: { people: Person[]; sizes?: string }) {
  const [selected, setSelected] = useState<Person | null>(null);

  return (
    <>
      <div className="people" data-reveal="stagger">
        {people.map((person) => (
          <div className="person spot tilt member-card" key={person.name}>
            <button
              className="person-click-area"
              onClick={() => setSelected(person)}
              aria-label={`${person.name}, ${person.role} — view dedicated profile`}
            >
              <div className="person-photo shimmer">
                <Img src={person.image} alt={person.name} width={500} height={240} sizes={sizes} />
                <div className="card-hover-overlay">
                  <span className="btn-view-profile">View Profile</span>
                </div>
              </div>
              <div className="person-info">
                <div className="person-name">{person.name}</div>
                <div className="person-role">{person.role}</div>
                {person.department && <div className="person-dept">{person.department}</div>}
              </div>
            </button>

            {/* Quick Action Social Media Links */}
            <div className="person-socials" onClick={(e) => e.stopPropagation()}>
              {person.linkedin && (
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name}'s LinkedIn profile`}
                  className="social-icon-btn"
                  title="LinkedIn"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                  </svg>
                </a>
              )}
              {person.portfolio && (
                <a
                  href={person.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name}'s Portfolio`}
                  className="social-icon-btn"
                  title="Portfolio Website"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </a>
              )}
              {person.github && (
                <a
                  href={person.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name}'s GitHub`}
                  className="social-icon-btn"
                  title="GitHub Profile"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                </a>
              )}
              {person.email && (
                <a
                  href={`mailto:${person.email}`}
                  aria-label={`Email ${person.name}`}
                  className="social-icon-btn"
                  title="Official IEEE Email"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal open={selected !== null} onClose={() => setSelected(null)} label={selected ? `${selected.name}, ${selected.role}` : "Profile"} className="profile-modal">
        {selected && (
          <div className="profile">
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close profile" data-autofocus>
              ✕
            </button>
            <div className="profile-photo shimmer">
              <Img src={selected.image} alt={selected.name} width={500} height={500} sizes="(max-width: 700px) 90vw, 320px" />
            </div>
            <div className="profile-copy">
              <div className="profile-badge-group">
                <span className="eyebrow profile-role-tag">{selected.role}</span>
                {selected.ieeeId && <span className="ieee-id-badge">{selected.ieeeId}</span>}
              </div>
              <h3>{selected.name}</h3>
              {selected.department && <div className="profile-dept-detail">{selected.department}</div>}
              <p>{selected.bio}</p>

              {/* Dedicated Official & Social Media Links */}
              <div className="profile-links-section">
                <h4 className="profile-links-heading">Official &amp; Social Links</h4>
                <div className="profile-links-grid">
                  {selected.linkedin && (
                    <a className="btn btn-ieee-blue" href={selected.linkedin} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 1.6 1.6 1.6 1.6 0 0 0-1.6-1.6z" />
                      </svg>
                      LinkedIn Profile →
                    </a>
                  )}

                  {selected.portfolio && (
                    <a className="btn btn-outline-ieee" href={selected.portfolio} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="2" y1="12" x2="22" y2="12" />
                        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                      Portfolio Website →
                    </a>
                  )}

                  {selected.github && (
                    <a className="btn btn-outline-ieee" href={selected.github} target="_blank" rel="noopener noreferrer">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                      </svg>
                      GitHub Profile →
                    </a>
                  )}

                  {selected.email && (
                    <a className="btn btn-outline-ieee" href={`mailto:${selected.email}`}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      {selected.email}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}

