
/* =========================================
   LITEX — INTERIM PORTFOLIO
   Interactive experience
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================
     1. ELEMENT REFERENCES
  ===================================== */

  const loader = document.getElementById("loader");

  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  const prototypeModal = document.getElementById("prototype-modal");
  const prototypeTitle = document.getElementById("prototype-title");
  const prototypeStage = document.getElementById("prototype-stage");
  const prototypeDescription = document.getElementById("prototype-description");

  const assistantLauncher = document.getElementById("assistant-launcher");
  const assistantPanel = document.getElementById("assistant-panel");
  const assistantClose = document.getElementById("assistant-close");
  const assistantForm = document.getElementById("assistant-form");
  const assistantQuestion = document.getElementById("assistant-question");
  const assistantMessages = document.getElementById("assistant-messages");

  const backToTop = document.getElementById("back-to-top");


  /* =====================================
     2. LOADING SCREEN
  ===================================== */

  window.addEventListener("load", () => {
    if (loader) {
      setTimeout(() => {
        loader.style.display = "none";
      }, 2400);
    }
  });


  /* =====================================
     3. CURRENT YEAR
  ===================================== */

  const currentYear = document.getElementById("current-year");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =====================================
     4. MOBILE NAVIGATION
  ===================================== */

  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }

  if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );

    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {

      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }

    });

  }


  /* =====================================
     5. SMOOTH NAVIGATION
  ===================================== */

  document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", event => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =====================================
     6. SCROLL EFFECTS
  ===================================== */

  const header = document.querySelector(".site-header");
  const heroClouds = document.querySelectorAll(".hero-cloud");
  const heroGlow = document.querySelector(".hero-glow");

  let scrollTicking = false;

  function updateScrollEffects() {

    const scrollPosition = window.scrollY;

    // Navigation appearance
    if (header) {

      if (scrollPosition > 50) {
        header.style.boxShadow = "0 8px 30px rgba(65,102,124,0.07)";
      } else {
        header.style.boxShadow = "none";
      }

    }

    // Back-to-top visibility
    if (backToTop) {
      backToTop.classList.toggle("visible", scrollPosition > 500);
    }

    // Gradually move the atmospheric clouds
    heroClouds.forEach((cloud, index) => {

      const movement = Math.min(scrollPosition * 0.12, 120);

      cloud.style.transform =
        `translate3d(${movement * (index % 2 === 0 ? 1 : -1)}px, ${movement}px, 0)`;

      cloud.style.opacity =
        String(Math.max(0.15, 1 - scrollPosition / 850));

    });

    if (heroGlow) {
      heroGlow.style.opacity =
        String(Math.max(0.1, 1 - scrollPosition / 1100));
    }

    scrollTicking = false;

  }

  window.addEventListener("scroll", () => {

    if (!scrollTicking) {
      window.requestAnimationFrame(updateScrollEffects);
      scrollTicking = true;
    }

  }, { passive: true });


  /* =====================================
     7. BACK TO TOP
  ===================================== */

  if (backToTop) {

    backToTop.addEventListener("click", () => {

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    });

  }


  /* =====================================
     8. PROJECT PROTOTYPE CONTENT
  ===================================== */

  const prototypes = {

    student: {
      title: "Student Management System",

      description:
        "A concept for connecting student records, academic activities, performance and administrative insights.",

      content: `
        <div style="width:100%;max-width:650px">

          <div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-bottom:20px">
            <div>
              <small style="color:#64869a">STUDENT PORTAL</small>
              <h3 style="margin-top:5px">Dashboard Overview</h3>
            </div>
            <span style="padding:7px 12px;background:#e4f1f5;border-radius:20px;font-size:10px">
              DEMO
            </span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px">

            <div style="padding:15px;background:white;border-radius:12px">
              <small>Students</small>
              <h2 style="color:#527f9b">128</h2>
            </div>

            <div style="padding:15px;background:white;border-radius:12px">
              <small>Courses</small>
              <h2 style="color:#527f9b">12</h2>
            </div>

            <div style="padding:15px;background:white;border-radius:12px">
              <small>Activities</small>
              <h2 style="color:#527f9b">36</h2>
            </div>

          </div>

          <div style="margin-top:18px;padding:20px;background:white;border-radius:12px">

            <strong>Learning Progress</strong>

            <div style="height:9px;margin-top:15px;background:#e8f0f4;border-radius:20px;overflow:hidden">
              <div style="height:100%;width:75%;background:#79aabd;border-radius:20px"></div>
            </div>

            <small style="display:block;margin-top:8px;color:#718492">
              Illustrative progress indicator — 75%
            </small>

          </div>

          <p style="margin-top:15px;color:#718492;font-size:11px">
            This is a visual demonstration, not a live student database.
          </p>

        </div>
      `
    },


    mech: {
      title: "AI Mech Lab",

      description:
        "An exploration of an AI-assisted learning environment for practical technology education and mechatronics.",

      content: `
        <div style="width:100%;max-width:600px;text-align:center">

          <div style="width:100px;height:100px;margin:0 auto 20px;display:grid;place-items:center;border-radius:28px;background:linear-gradient(145deg,#5489a5,#a5cbd9);color:white;font-size:35px;font-weight:800;box-shadow:0 15px 35px rgba(65,120,150,.2)">
            AI
          </div>

          <h3>Welcome to the Learning Lab</h3>

          <p style="margin-top:10px;color:#718492;font-size:13px">
            Imagine a learning environment where artificial intelligence
            helps learners understand complex engineering concepts.
          </p>

          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:25px">

            <div style="padding:20px;background:white;border-radius:14px">
              <strong>Learning Modules</strong>
              <p style="margin-top:8px;color:#718492;font-size:11px">
                Structured technical lessons
              </p>
            </div>

            <div style="padding:20px;background:white;border-radius:14px">
              <strong>AI Guidance</strong>
              <p style="margin-top:8px;color:#718492;font-size:11px">
                Assisted learning and explanations
              </p>
            </div>

            <div style="padding:20px;background:white;border-radius:14px">
              <strong>Practical Projects</strong>
              <p style="margin-top:8px;color:#718492;font-size:11px">
                Applied engineering concepts
              </p>
            </div>

            <div style="padding:20px;background:white;border-radius:14px">
              <strong>Progress Tracking</strong>
              <p style="margin-top:8px;color:#718492;font-size:11px">
                Learning activity insights
              </p>
            </div>

          </div>

        </div>
      `
    },


    cyber: {
      title: "Security Operations Concept",

      description:
        "A conceptual security monitoring interface showing how security information could be organized and presented.",

      content: `
        <div style="width:100%;max-width:650px">

          <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
            <h3>Security Overview</h3>
            <span style="padding:7px 12px;background:#e2f2e9;color:#477e60;border-radius:20px;font-size:10px">
              SIMULATED
            </span>
          </div>

          <div style="display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px;margin-top:20px">

            <div style="padding:15px;background:white;border-radius:12px">
              <small>Systems</small>
              <h2 style="color:#527f9b">08</h2>
            </div>

            <div style="padding:15px;background:white;border-radius:12px">
              <small>Alerts</small>
              <h2 style="color:#bd9560">03</h2>
            </div>

            <div style="padding:15px;background:white;border-radius:12px">
              <small>Status</small>
              <h2 style="color:#5d9a7b;font-size:17px">Demo</h2>
            </div>

          </div>

          <div style="margin-top:18px;padding:20px;background:white;border-radius:12px">

            <strong>Monitoring Activity</strong>

            <div style="margin-top:15px;padding:12px;background:#f0f6f8;border-radius:9px">
              <small>System event</small>
              <p style="font-size:12px">Network activity recorded</p>
            </div>

            <div style="margin-top:10px;padding:12px;background:#f0f6f8;border-radius:9px">
              <small>Security event</small>
              <p style="font-size:12px">Authentication review required</p>
            </div>

          </div>

          <p style="margin-top:15px;color:#718492;font-size:11px">
            All displayed events and values are fictional demonstrations.
            This interface does not monitor a real network.
          </p>

        </div>
      `
    },


    design: {
      title: "Digital Product Experiences",

      description:
        "A creative exploration of product interfaces, visual systems and user-centred digital experiences.",

      content: `
        <div style="width:100%;max-width:600px">

          <h3 style="text-align:center">Design Exploration</h3>

          <p style="margin-top:8px;text-align:center;color:#718492;font-size:12px">
            A small collection of visual interface concepts.
          </p>

          <div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;margin-top:25px">

            <div style="padding:20px;border-radius:15px;background:linear-gradient(145deg,#d7e9f0,#aacbd9)">
              <div style="height:90px;border-radius:10px;background:rgba(255,255,255,.55)"></div>
              <strong style="display:block;margin-top:12px">Interface One</strong>
              <small>Clean digital experience</small>
            </div>

            <div style="padding:20px;border-radius:15px;background:linear-gradient(145deg,#e9e1f1,#c8bbdd)">
              <div style="height:90px;border-radius:10px;background:rgba(255,255,255,.55)"></div>
              <strong style="display:block;margin-top:12px">Interface Two</strong>
              <small>Creative visual language</small>
            </div>

            <div style="padding:20px;border-radius:15px;background:linear-gradient(145deg,#e4ebdf,#b9cbb0)">
              <div style="height:90px;border-radius:10px;background:rgba(255,255,255,.55)"></div>
              <strong style="display:block;margin-top:12px">Interface Three</strong>
              <small>Simple interaction patterns</small>
            </div>

            <div style="padding:20px;border-radius:15px;background:linear-gradient(145deg,#f0e5d8,#ddc5ac)">
              <div style="height:90px;border-radius:10px;background:rgba(255,255,255,.55)"></div>
              <strong style="display:block;margin-top:12px">Interface Four</strong>
              <small>Visual storytelling</small>
            </div>

          </div>

        </div>
      `
    }

  };


  /* =====================================
     9. OPEN PROJECT PROTOTYPES
  ===================================== */

  function openPrototype(projectKey) {

    const project = prototypes[projectKey];

    if (!project || !prototypeModal) return;

    prototypeTitle.textContent = project.title;
    prototypeStage.innerHTML = project.content;
    prototypeDescription.textContent = project.description;

    prototypeModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    const closeButton = prototypeModal.querySelector(".modal-close");

    if (closeButton) {
      closeButton.focus();
    }

  }


  /* =====================================
     10. CLOSE PROJECT PROTOTYPES
  ===================================== */

  function closePrototype() {

    if (!prototypeModal) return;

    prototypeModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

  }


  document.querySelectorAll(".prototype-trigger").forEach(button => {

    button.addEventListener("click", () => {

      const projectKey = button.dataset.prototype;

      openPrototype(projectKey);

    });

  });


  document.querySelectorAll("[data-close-prototype]").forEach(button => {

    button.addEventListener("click", closePrototype);

  });


  /* =====================================
     11. KEYBOARD ACCESSIBILITY
  ===================================== */

  document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

      closePrototype();

      closeMenu();

      closeAssistant();

    }

  });


  /* =====================================
     12. LITEX ASSISTANT
  ===================================== */

  function openAssistant() {

    if (!assistantPanel) return;

    assistantPanel.setAttribute("aria-hidden", "false");

    assistantLauncher.setAttribute("aria-expanded", "true");

    assistantQuestion.focus();

  }


  function closeAssistant() {

    if (!assistantPanel) return;

    assistantPanel.setAttribute("aria-hidden", "true");

    assistantLauncher.setAttribute("aria-expanded", "false");

  }


  if (assistantLauncher) {
    assistantLauncher.addEventListener("click", openAssistant);
  }

  if (assistantClose) {
    assistantClose.addEventListener("click", closeAssistant);
  }


  /* =====================================
     13. ASSISTANT MESSAGE DISPLAY
  ===================================== */

  function addMessage(message, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add(
      "assistant-message",
      sender === "user" ? "assistant-user" : "assistant-bot"
    );

    // Use textContent to safely display user input.
    messageElement.textContent = message;

    assistantMessages.appendChild(messageElement);

    assistantMessages.scrollTop = assistantMessages.scrollHeight;

  }


  /* =====================================
     14. ASSISTANT KNOWLEDGE BASE
  ===================================== */

  function getAssistantResponse(question) {

    const text = question.toLowerCase().trim();

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hello! Welcome to Litex. What would you like to know about Excellence's journey, projects or interests?";
    }


    if (
      text.includes("who") ||
      text.includes("about") ||
      text.includes("excellence") ||
      text.includes("person")
    ) {
      return "Excellence Odimegwu is a Computer Science student at the University of Nigeria, Nsukka, exploring AI engineering, cybersecurity, product design and web development. He enjoys combining creativity with technical problem-solving.";
    }


    if (
      text.includes("project") ||
      text.includes("build") ||
      text.includes("work")
    ) {
      return "There are four featured project explorations: Student Management System, AI Mech Lab, Security Operations Concept and Digital Product Experiences. Visit the Projects section and select Explore Prototype to see their demonstrations.";
    }


    if (
      text.includes("skill") ||
      text.includes("technology") ||
      text.includes("tech") ||
      text.includes("program")
    ) {
      return "Excellence's areas of interest include Python, web development, AI integration, cybersecurity, cloud security, product design, graphic design, video editing and creative writing.";
    }


    if (
      text.includes("education") ||
      text.includes("school") ||
      text.includes("university") ||
      text.includes("study")
    ) {
      return "Excellence studies Computer Science at the University of Nigeria, Nsukka. He has also completed professional training in cybersecurity and cloud security, as well as artificial intelligence.";
    }


    if (
      text.includes("experience") ||
      text.includes("internship") ||
      text.includes("career")
    ) {
      return "His experience includes product design and front-end development with Integral Builder Explorers, professional training and collaborative technology work, including contributions to AI Mech Lab.";
    }


    if (
      text.includes("contact") ||
      text.includes("connect") ||
      text.includes("hire") ||
      text.includes("collaborat")
    ) {
      return "Thank you for your interest! Visit the Contact section to find professional contact details and connection options.";
    }


    if (
      text.includes("ai mech") ||
      text.includes("mechatronic")
    ) {
      return "AI Mech Lab is an educational technology project exploring AI-assisted learning and mechatronics. Excellence's responsibilities include database design and Gemini AI adaptation and integration.";
    }


    if (
      text.includes("cyber") ||
      text.includes("security")
    ) {
      return "Cybersecurity and cloud security are among Excellence's professional interests. He has completed relevant training and is exploring secure digital systems.";
    }


    if (
      text.includes("design") ||
      text.includes("creative")
    ) {
      return "Excellence is interested in product design, user experiences, graphic design and creative communication. He enjoys turning ideas into clear and meaningful visual experiences.";
    }


    if (
      text.includes("litex") ||
      text.includes("website")
    ) {
      return "Litex is Excellence's personal digital portfolio. It is designed as an interactive environment for exploring his professional journey, projects, ideas and interests.";
    }


    return "That's an interesting question! I can currently help you explore Excellence's background, experience, education, skills and projects. Try asking me about one of those topics.";
  }


  /* =====================================
     15. ASSISTANT QUESTION HANDLING
  ===================================== */

  function askAssistant(question) {

    const cleanQuestion = question.trim();

    if (!cleanQuestion) return;

    addMessage(cleanQuestion, "user");

    assistantQuestion.value = "";

    const response = getAssistantResponse(cleanQuestion);

    // A short delay makes the conversation feel natural.
    setTimeout(() => {

      addMessage(response, "bot");

    }, 350);

  }


  if (assistantForm) {

    assistantForm.addEventListener("submit", event => {

      event.preventDefault();

      askAssistant(assistantQuestion.value);

    });

  }


  /* =====================================
     16. ASSISTANT SUGGESTIONS
  ===================================== */

  document.querySelectorAll("[data-question]").forEach(button => {

    button.addEventListener("click", () => {

      const question = button.dataset.question;

      openAssistant();

      askAssistant(question);

    });

  });


  /* =====================================
     17. REVEAL CONTENT ON SCROLL
  ===================================== */

  const revealElements = document.querySelectorAll(
    ".section-heading, .about-main, .about-highlight, .timeline-item, .project-card, .skill-card, .education-card, .contact-panel"
  );

  if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          revealObserver.unobserve(entry.target);

        }

      });

    }, {
      threshold: 0.12
    });


    revealElements.forEach(element => {

      element.style.opacity = "0";
      element.style.transform = "translateY(22px)";
      element.style.transition =
        "opacity 0.8s ease, transform 0.8s ease";

      revealObserver.observe(element);

    });

  }


  /* =====================================
     18. INITIALIZE EXPERIENCE
  ===================================== */

  updateScrollEffects();

  console.log("Litex experience initialized successfully.");

});



  
