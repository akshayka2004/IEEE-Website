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
          <button className="person spot" key={person.name} onClick={() => setSelected(person)} aria-label={`${person.name}, ${person.role} — view profile`}>
            <div className="person-photo shimmer">
              <Img src={person.image} alt="" width={500} height={240} sizes={sizes} />
            </div>
            <div className="person-info">
              <div className="person-name">{person.name}</div>
              <div className="person-role">{person.role}</div>
            </div>
          </button>
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
              <div className="eyebrow">{selected.role}</div>
              <h3>{selected.name}</h3>
              <p>{selected.bio}</p>
              {selected.linkedin && (
                <a className="btn btn-dark" href={selected.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn →
                </a>
              )}
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
