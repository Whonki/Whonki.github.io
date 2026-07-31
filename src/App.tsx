import "./App.css";

import { useEffect, useState } from "react";

type PanelId = "about" | "interests";
// How the card is structured
function Card({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`carrd-card${className ? ` ${className}` : ""}`}> 
      <h2 className="carrd-card-title">{title}</h2> 
      <div className="carrd-card-body"> 
        <div className="carrd-card-body-inner">{children}</div>
      </div>
    </section>
  );
}

const DISCORD_USERNAME = "whonki";

const INTERESTS = {
  anime: [
    "Chainsaw Man",
    "Tokyo Ghoul",
    "Jujutsu Kaisen",
    "Spy x Family",
    "Dungeon Meshi",
    "Witch Hat Atelier",
  ],
  games: [
    "Diablo IV",
    "Resident Evil",
    "Destiny 2",
    "League of Legends",
    "Monster Hunter",
    "Cult Of The Lamb",
    "Warframe",
  ],
  other: [
    "ROBOTICS!!!",
    "Body Horror",
    "Sharks (Especially Whale and Goblin sharks!!)",
    "Taekwondo",
    "Journey To The West",
    "Some things involving programming and software development!!!",
  ],
} as const;

const PANELS: {
  id: PanelId;
  title: string;
  body: React.ReactNode;
}[] = [
    {
      id: "about",
      title: "ABOUT ME",
      body: (
        <div className="about-copy">
          <p className="about-copy-lead">
            <strong>Hello! I'm Alice!</strong>
          </p>
          <p> I'm a third-year CPSC student at UofC!</p>
          <p>
          Currently, I'm doing research in Human-Computer Interaction. I hope that eventually I
          can gain more opportunities to do research in the future, and also find opportunities to 
          do work in the industry! (Whatever that looks like lol)
          </p>
          <p>Otherwise, you can probably find me playing games in my club room, drawing, or goofing around with my friends!</p>
          <p>I'm also usually online on Discord, so don't be afraid to say hi!</p>
        </div>
      ),
    },
    {
      id: "interests",
      title: "INTERESTS",
      body: (
        <div className="interests-layout">
          <div className="interests-col">
            <h3 className="interests-heading">Anime/Manga</h3>
            <ul>
              {INTERESTS.anime.map((item) => (
                <li key={item}>{item}</li> // Link to anime + manga page
              ))}
            </ul>
            <h3 className="interests-heading">Games</h3>
            <ul>
              {INTERESTS.games.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="interests-col">
            <h3 className="interests-heading">Other</h3>
            <ul>
              {INTERESTS.other.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      ),
    },
  ];
// 
function App() {
  const [copyStatus, setCopyStatus] = useState("");
  const [activePanel, setActivePanel] = useState<PanelId>(PANELS[0].id);

  const active = PANELS.find((panel) => panel.id === activePanel) ?? PANELS[0];

  useEffect(() => {
    if (!copyStatus) return;
    const timeoutId = window.setTimeout(() => setCopyStatus(""), 2500);
    return () => window.clearTimeout(timeoutId);
  }, [copyStatus]);

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_USERNAME);
      setCopyStatus("Discord username copied!");
    } catch {
      setCopyStatus(`Could not copy automatically. Discord: ${DISCORD_USERNAME}`);
    }
  };

// The Card components w/ Title + Body
  return (
    <div className="container">
      <Card title="01">
        <div className="about-row">
          <img src="/imgs/pfp.jpg" alt="Alice" className="about-image" />
          <div className="about-text">
            <div className="carrd-profile">
              <p className="carrd-name">Alice</p>
              <p className="carrd-pronouns">She/It · 20 y/o</p>
            </div>
            <p>I'm a Computer Science student and a digital artist.</p>
          </div>
        </div>
      </Card>

      <div className="carrd-tab-panels">
        <div className="carrd-tab-dots" role="tablist" aria-label="Content panels">
          {PANELS.map((panel) => (
            <div key={panel.id} className="carrd-tab-dot-wrapper">
              <button
                type="button"
                role="tab"
                className="carrd-tab-dot"
                aria-selected={panel.id === activePanel}
                aria-label={panel.title}
                onClick={() => setActivePanel(panel.id)}
              />
            </div>
          ))}
        </div>

        <div key={activePanel} className="carrd-tab-panel-expand">
          <Card title={active.title} className="carrd-card--tab-active">
            {active.body}
          </Card>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-item">
          <a
            href="https://github.com/Whonki"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/imgs/GitHub_Invertocat_White_Clearspace.png"
              alt="GitHub"
              className="footer-social-icon"
            />
          </a>
          <button
            type="button"
            className="footer-social-button"
            onClick={handleCopyDiscord}
            aria-label="Copy Discord username"
            title="Copy Discord username"
          >
            <img
              src="/imgs/Discord-Symbol-White.png"
              alt="Discord"
              className="footer-social-icon"
            />
          </button>
        </div>
        <p className="footer-status" aria-live="polite">
          {copyStatus}
        </p>
        <p>© 2026 Whonki. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
