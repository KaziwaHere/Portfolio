import "./App.css";

const projects = [
  {
    title: "Iter",
    tag: "Flagship Platform",
    description:
      "A collaborative opportunity discovery and student engagement platform built to help students find scholarships, internships, conferences, mentorship, and academic guidance.",
    details: ["Flutter", "Firestore", "Supabase", "COIL Project", "Admin-Controlled System"],
  },
  {
    title: "Fashion Intelligence Platform",
    tag: "Product Concept",
    description:
      "A styling platform concept using body analysis, color analysis, and a guided 3D measurement experience to help users understand what suits them and why.",
    details: ["Personalization", "3D Measurement Logic", "Shopping Filters", "Style Systems"],
  },
  {
    title: "Football Stadium Booking App",
    tag: "Freelance App",
    description:
      "A mobile booking platform for football stadium reservations, focused on simplifying field discovery, availability, and booking flow.",
    details: ["Mobile App", "Booking Flow", "Flutter", "Client Project"],
  },
  {
    title: "Bell-LaPadula Access Control",
    tag: "Academic Security",
    description:
      "An academic implementation exploring mandatory access control principles and structured security rules.",
    details: ["Information Security", "Access Control", "Academic Project"],
  },
];

const skills = [
  {
    category: "Frontend & Mobile",
    items: ["React", "Flutter", "Dart", "HTML", "CSS", "JavaScript"],
  },
  {
    category: "Backend & Database",
    items: ["PHP", "Laravel", "SQL", "Oracle", "SSMS", "Firestore", "Supabase"],
  },
  {
    category: "System Thinking",
    items: ["Product Architecture", "Database Design", "Admin Systems", "Research Writing"],
  },
  {
    category: "Leadership",
    items: ["Team Leadership", "Project Direction", "COIL Collaboration", "Student Mentorship"],
  },
];

const timeline = [
  {
    year: "2022–2026",
    title: "Database Technology",
    body: "Bachelor’s degree at Sulaimani Polytechnic University, ranked among the top students in the department.",
  },
  {
    year: "COIL",
    title: "International Collaboration",
    body: "Led Iter through a Collaborative Online International Learning experience with feedback from American students.",
  },
  {
    year: "Snawbar",
    title: "POS System Development",
    body: "Worked as a developer/programmer creating POS systems during internship experience.",
  },
  {
    year: "Now",
    title: "Founder-Minded Developer",
    body: "Building platforms at the intersection of opportunity, data, personalization, and navigation.",
  },
];

function App() {
  return (
    <main className="page-shell">
      <Nav />
      <Hero />
      <IdentityGrid />
      <IterSection />
      <Projects />
      <Skills />
      <Timeline />
      <Contact />
    </main>
  );
}

function Nav() {
  return (
    <nav className="nav">
      <div className="brand">
        <span className="brand-mark">K</span>
        <span>Kaziwa OS</span>
      </div>

      <div className="nav-links">
        <a href="#iter">Iter</a>
        <a href="#projects">Projects</a>
        <a href="#skills">Skills</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid-bg" />

      <div className="hero-copy">
        <p className="eyebrow">Database technologist · Platform builder · Future pilot</p>

        <h1>
          I build systems for people who are trying to{" "}
          <span>find their path.</span>
        </h1>

        <p className="hero-text">
          I’m Kaziwa Yousif Mohammed, a developer and product thinker from
          Sulaymaniyah. My work lives between software architecture, student
          opportunity, databases, and navigation — whether that means helping
          students find their next opportunity or designing platforms that make
          complex decisions feel clear.
        </p>

        <div className="hero-actions">
          <a href="#projects" className="primary-btn">View Systems</a>
          <a href="#iter" className="secondary-btn">Explore Iter</a>
        </div>

        <div className="signal-row">
          <Signal label="Top-ranked student" value="01" />
          <Signal label="Flagship project" value="Iter" />
          <Signal label="Core direction" value="Build + Lead" />
        </div>
      </div>

      <div className="hero-visual">
        <BlueprintCard />
        <PortraitGlyph />
      </div>
    </section>
  );
}

function BlueprintCard() {
  return (
    <div className="blueprint-card">
      <div className="card-header">
        <span className="dot active" />
        <span className="dot" />
        <span className="dot" />
        <p>system.map</p>
      </div>

      <div className="node-map">
        <div className="node node-main">Kaziwa</div>
        <div className="node node-a">Data</div>
        <div className="node node-b">Aviation</div>
        <div className="node node-c">Iter</div>
        <div className="node node-d">Research</div>
        <div className="node node-e">Product</div>

        <span className="line line-1" />
        <span className="line line-2" />
        <span className="line line-3" />
        <span className="line line-4" />
        <span className="line line-5" />
      </div>
    </div>
  );
}

function PortraitGlyph() {
  return (
    <div className="portrait-card">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />

      <div className="avatar">
        <div className="hair hair-left" />
        <div className="hair hair-right" />
        <div className="face">
          <div className="glasses">
            <span />
            <span />
          </div>
          <div className="mouth" />
        </div>
      </div>

      <p className="portrait-caption">structured mind / soft chaos / precise direction</p>
    </div>
  );
}

function Signal({ label, value }) {
  return (
    <div className="signal">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function IdentityGrid() {
  return (
    <section className="identity-section">
      <div className="section-label">Identity Map</div>

      <div className="identity-grid">
        <IdentityCard
          number="01"
          title="The Architect"
          text="You do not just code screens. You think in structures, roles, rules, permissions, flows, and systems."
        />
        <IdentityCard
          number="02"
          title="The Navigator"
          text="Aviation is not just a dream in your story. It is a metaphor: direction, risk, discipline, and movement."
        />
        <IdentityCard
          number="03"
          title="The Founder"
          text="Your strongest ideas are platforms: Iter, study planning, fashion intelligence, booking systems. You naturally think beyond tasks."
        />
        <IdentityCard
          number="04"
          title="The Researcher"
          text="You care about the logic behind ideas. You question assumptions, test structures, and want things to be worthy, not just functional."
        />
      </div>
    </section>
  );
}

function IdentityCard({ number, title, text }) {
  return (
    <article className="identity-card">
      <span>{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function IterSection() {
  return (
    <section className="iter-section" id="iter">
      <div className="iter-copy">
        <p className="eyebrow">Featured system</p>
        <h2>Iter: a platform for academic navigation</h2>
        <p>
          Iter is the center of this portfolio because it represents your real
          signature: not just development, but turning confusion into structure.
          It helps students discover opportunities, connect with experienced
          peers, and understand university life through shared guidance.
        </p>

        <div className="feature-list">
          <span>Opportunity discovery</span>
          <span>Student mentorship</span>
          <span>Admin-controlled content</span>
          <span>Error reporting system</span>
          <span>COIL collaboration</span>
          <span>University-supported launch</span>
        </div>
      </div>

      <div className="iter-system">
        <div className="system-core">Iter</div>
        <div className="system-pill pill-1">Students</div>
        <div className="system-pill pill-2">Mentors</div>
        <div className="system-pill pill-3">Events</div>
        <div className="system-pill pill-4">Admin</div>
        <div className="system-pill pill-5">Opportunities</div>
        <div className="system-ring" />
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="section-heading">
        <p className="eyebrow">Selected work</p>
        <h2>Projects as systems, not just apps</h2>
      </div>

      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.title}>
            <div className="project-top">
              <span>{project.tag}</span>
              <span className="corner-mark">⌁</span>
            </div>

            <h3>{project.title}</h3>
            <p>{project.description}</p>

            <div className="chip-row">
              {project.details.map((detail) => (
                <span key={detail}>{detail}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section className="skills-section" id="skills">
      <div className="section-heading">
        <p className="eyebrow">Capability matrix</p>
        <h2>What I use to build</h2>
      </div>

      <div className="skills-grid">
        {skills.map((group) => (
          <article className="skill-card" key={group.category}>
            <h3>{group.category}</h3>
            <div>
              {group.items.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="timeline-section">
      <div className="section-heading">
        <p className="eyebrow">Flight path</p>
        <h2>How the system evolved</h2>
      </div>

      <div className="timeline">
        {timeline.map((item) => (
          <article className="timeline-item" key={item.title}>
            <span>{item.year}</span>
            <div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div>
        <p className="eyebrow">Final signal</p>
        <h2>Let’s build something navigational.</h2>
        <p>
          I’m interested in systems that help people move: through education,
          opportunity, data, decisions, and eventually, maybe even the sky.
        </p>
      </div>

      <a href="mailto:kaziwa58@gmail.com" className="primary-btn">
        Contact Me
      </a>
    </section>
  );
}

export default App;