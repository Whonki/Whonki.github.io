import "./App.css";

import { useId, useLayoutEffect, useRef, useState } from "react";

function Card({
  title,
  children,
  defaultOpen = false,
  collapsible = true,
  open: controlledOpen,
  onOpenChange,
  className,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  collapsible?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}) {
  const contentId = useId();
  const isControlled = controlledOpen !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
  const open = isControlled ? controlledOpen : uncontrolledOpen;
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number>(0);

  useLayoutEffect(() => {
    if (!collapsible) return;
    const el = innerRef.current;
    if (!el) return;
    setMaxHeight(open ? el.scrollHeight : 0);
  }, [open, children, collapsible]);

  return (
    <section className={`carrd-card${className ? ` ${className}` : ""}`}>
      {collapsible ? (
        <button
          type="button"
          className="carrd-card-title"
          aria-expanded={open}
          aria-controls={contentId}
          onClick={() => {
            const next = !open;
            if (!isControlled) setUncontrolledOpen(next);
            onOpenChange?.(next);
          }}
        >
          {title}
        </button>
      ) : (
        <h2 className="carrd-card-title carrd-card-title--static">{title}</h2>
      )}
      <div
        id={contentId}
        className={`carrd-card-body${collapsible ? "" : " carrd-card-body--static"}`}
        data-open={collapsible ? (open ? "true" : "false") : "true"}
        style={collapsible ? { maxHeight } : undefined}
      >
        <div ref={innerRef} className="carrd-card-body-inner">
          {children}
        </div>
      </div>
    </section>
  );
}

function App() {
  const panels = [
    {
      id: "about" as const,
      title: "ABOUT ME",
      body: (
        <>
          <center><b>Hello! I'm Alice!</b></center> <br />
          Thanks for visiting my website! I'm currently a second year Natural Sciences Major at UofC specializing in Computer Science and Math!
          <br /> <br />
          I'm currently interested in Human-Computer Interaction, mainly through the means of robotics, AR/VR, and I'm also interested in software development.
          I hope by my third or fourth year, that I can start doing research in CPSC, and eventually also get a job in the industry!
          <br /> <br />
          Whenever you don't see me working on school, you can probably find me playing games in my club room, drawing, or goofing around with
          my friends!
          <br /> <br />
          I'm also usually online on Discord, so don't be afraid to say hi!
        </>
      ),
    },
    {
      id: "projects" as const,
      title: "PROJECTS",
      body: (
        <>
        <ul>
          <li>
            CalgaryHacks 2025 Tier 2 Winner
          </li>
          <li>
            Hack The Change 2024 Tier 2 Participant
          </li>
          <li>
            CPSC 233 Book Recommendation App
          </li>
          <li>
            This website!
          </li>
        </ul>
        </>
      ),
    },
    {
      id: "commissions" as const,
      title: "COMMISSIONS",
      body: (
        <>
        I am currently closed for commissions! Sorry :(
        </>
      ),
    },
  ];

  const [activePanel, setActivePanel] = useState<(typeof panels)[number]["id"]>(
    panels[0].id,
  );

  const active = panels.find((p) => p.id === activePanel) ?? panels[0];

  return (
    <div className="container">
      {/* About me page. Add all of the info I want people to know about me here. */}
      <Card title="01" collapsible={false}>
        <div className="about-row">
          <img src="/imgs/pfp.jpg" alt="pfp" className="about-image" />
          <div className="about-text">
            <div className="carrd-profile">
              <p className="carrd-name">Alice</p>
              <p className="carrd-pronouns">She/It · 20 y/o</p>
            </div>
            <p>I'm a Computer Science student and a digital artist.</p>
          </div>
        </div>
      </Card>
      {/* I want to make a section underneath with three cards: Projects, ???, ??? */}
      <div className="carrd-tab-panels">
        <div className="carrd-tab-dots" role="tablist" aria-label="Content panels">
          {panels.map((p) => (
            <label
              key={p.id}
              className="carrd-tab-dot-wrapper"
              htmlFor={`tab-dot-${p.id}`}
              aria-hidden
            >
              <button
                id={`tab-dot-${p.id}`}
                type="button"
                role="tab"
                className="carrd-tab-dot"
                aria-selected={p.id === activePanel}
                aria-label={p.title}
                onClick={() => setActivePanel(p.id)}
              />
            </label>
          ))}
        </div>

        <div key={activePanel} className="carrd-tab-panel-expand">
          <Card title={active.title} collapsible={false} className="carrd-card--tab-active">
            {active.body}
          </Card>
        </div>
      </div>

      {/* this is the footer section */}
      <footer className="footer">
        <div className="footer-row">
          <div className="footer-item">
            {/* Buttons for Socials that I want to be public */}
            <a href="https://github.com/Whonki" target="_blank" rel="noopener noreferrer">
            <img src="/imgs/GitHub_Invertocat_White_Clearspace.png" alt="Github" width="20" height="20"></img></a>

            <a href="https://www.linkedin.com/in/alice-phung-aa5722222/" target="_blank" rel="noopener noreferrer">
              <img src="/imgs/InBug-White.png" alt="LinkedIn" width="20" height="20"></img></a>
          </div>
          <br />
          <br />
          <p>© 2026 Whonki. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
