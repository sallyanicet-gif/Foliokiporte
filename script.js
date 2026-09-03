// ---------------------------------------------------------------
// Boot -> Login -> Welcome -> Desktop sequence
// ---------------------------------------------------------------

// Mobile browsers change the visible viewport height when the address
// bar shows/hides, which breaks plain `100vh`. We measure the real
// available height in JS and expose it as a CSS variable instead.
function setAppHeight() {
    document.documentElement.style.setProperty("--app-height", window.innerHeight + "px");
}
setAppHeight();
window.addEventListener("resize", setAppHeight);
window.addEventListener("orientationchange", () => setTimeout(setAppHeight, 250));

// True on phones/small tablets (matches the CSS mobile breakpoint).
function isMobileLayout() {
    return window.matchMedia("(max-width: 820px)").matches;
}

const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const loginCard = document.getElementById("login-card");
const loginFrame = document.querySelector(".xp-login-frame");
const welcomeText = document.getElementById("welcome-text");
const appShell = document.getElementById("app-shell");

// 1) Boot screen shows for a bit, then fades into the login screen.
setTimeout(() => {
    bootScreen.classList.add("fade-out");
    setTimeout(() => {
        bootScreen.style.display = "none";
        loginScreen.style.display = "flex";
    }, 600); // matches the CSS fade duration
}, 2600);

// 2) Click the user tile to "log in".
loginCard.addEventListener("click", logIn);

function logIn() {
    loginCard.style.pointerEvents = "none";
    loginFrame.classList.add("hide");

    setTimeout(() => {
        welcomeText.classList.add("show");
    }, 400);

    setTimeout(() => {
        loginScreen.classList.add("fade-out");
        setTimeout(() => {
            loginScreen.style.display = "none";
            appShell.classList.add("visible");
        }, 600);
    }, 1300);
}

// ---------------------------------------------------------------
// "My Projects" as a fake late-90s/2000s search engine.
// To add a project later, just add an object to PROJECTS below —
// everything else (rendering + search filter) is automatic.
// ---------------------------------------------------------------
const PROJECTS = [
    {
        title: "Affiche Evelynne Axell",
        url: "silly-os.local/portfolio/projets/affiche-axell",
        desc: "Affiche pour l'exposition fictive de Evelynne Axell au Musée d'art contemporain.",
        tags: ["Design", "Affiche", "Illustration"],
        image: "http://www.image-heberg.fr/files/17799349731072417184.png",
        link: "https://drive.google.com/file/d/11WxYHSJiqjsr2f_F0ArDcBD5uq_tXjYu/view?usp=sharing",
    },
    
 {
        title: "Affiche de concert Insane Clown Posse!",
        url: "silly-os.local/portfolio/projets/affiche-icp",
        desc: "Affiche pour le concert de Insane Clwn Posse, dans le style Swissted.",
        tags: ["Design", "Affiche", "Illustration"],
        image: "https://www.image-heberg.fr/files/17722959451235490333.png",
        link: "https://www.image-heberg.fr/files/17722959451235490333.png",
    },
    
    {
        title: "Pub Flora Gucci",
        url: "silly-os.local/portfolio/projets/pub-flora",
        desc: "Un mockup fais en collaboration pour une publicité.",
        tags: ["Publicité", "Collaboratif"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373144-mockup.png",
        link: "https://drive.google.com/drive/folders/1LPzavSL3eCfmo5cXGz4ang-ZFnPsYqqe",
    },
    
     {
        title: "Noodles Studio",
        url: "silly-os.local/portfolio/projets/noodlez",
        desc: "Logo et charte graphique pour une marque fictive de vente de nouilles",
        tags: ["Design", "Logo","Branding"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373143-logo-noodles.png",
        link: "https://drive.google.com/drive/folders/13_zx-Mh8qHjlZWkhObGA_Y-iZBeem61A",
    },
    
         {
        title: "Silly Links",
        url: "silly-os.local/portfolio/projets/silly-links",
        desc: "Site personnel regroupant mes résaux sociaux ",
        tags: ["Design", "Project Perso","Branding","Web"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373880-pperso.png",
        link: "https://sillylinks.duckdns.org",
    },
    
             {
        title: "Project Mareis",
        url: "silly-os.local/portfolio/projets/mareis",
        desc: "Site pour une association fictive pour la protection maritime ",
        tags: ["Collaboratif","Web"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788374110-site-maeries.jpg",
        link: "https://sallyanicet-gif.github.io/sae-1.05/",
    },
    
            {
        title: "An apple a day...",
        url: "silly-os.local/portfolio/projets/bad-apple",
        desc: "Une affiche réaliser avec Adobe Illustrator pour un single appeler 'an apple a day' par horsegiirL",
        tags: ["Project perso","Design","Affiche"],
        image: "http://www.image-heberg.fr/files/17875409633740919566.png",
        link: "https://www.instagram.com/p/DcKomFHsXCh/?utm_source=ig_web_copy_link&igsi=NTc4MTIwNjQ2YQ==",
    }, 
    
              {
        title: "Affiche Baki",
        url: "silly-os.local/portfolio/projets/i-got-that-dawg-in-me",
        desc: "Une affiche réaliser sur photoshop pourl'anime Baki(2018) sur Netflix ",
        tags: ["Design","Affiche","Project Perso"],
        image: "http://www.image-heberg.fr/files/17875411362566168416.png",
        link: "https://www.instagram.com/p/DcZTJRdOOOO/?utm_source=ig_web_copy_link&igsi=MzRlODBiNWFlZA==",
    },
    
                 {
        title: "Portrait Plastique",
        url: "silly-os.local/portfolio/projets/skull-but-inside",
        desc: "Montage Photoshop Créatif",
        tags: ["Design"],
        image: "https://www.image-heberg.fr/files/17722963212414680389.png",
        link: "https://www.image-heberg.fr/files/17722963212414680389.png",
    },
    
              {
        title: "Flyer BUT MMI",
        url: "silly-os.local/portfolio/projets/jpo-but",
        desc: "Flyer informationnel pour le BUT MMI",
        tags: ["Design"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788377831-flyer-illustratif.png",
        link: "https://image.noelshack.com/fichiers/2026/36/3/1788377831-flyer-illustratif.png",
    },
    
               {
        title: "Visuel Web Blackpink",
        url: "silly-os.local/portfolio/projets/blackpink-in-ur-area",
        desc: "Reproduction d'un visuel web de Blakcpink",
        tags: ["Design","Affiche"],
        image: "https://image.noelshack.com/fichiers/2026/22/4/1779971044-ex15-01.jpg",
        link: "https://image.noelshack.com/fichiers/2026/22/4/1779971044-ex15-01.jpg",
    },
    
                   {
        title: "IMPT-Interview",
        url: "silly-os.local/portfolio/projets/impt",
        desc: "Direction artistique et management de project.",
        tags: ["Branding","Audiovisuel"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788373143-impt.png",
        link: "https://youtube.com/shorts/x1Lvlvfe02M?si=I-BWv-x-iVeFyxXD",
    },
    
           {
        title: "Scéne d'horreur",
        url: "silly-os.local/portfolio/projets/boo",
        desc: "Scéne de 1 minute de film d'horreur",
        tags: ["Audiovisuel","Collaboratif"],
        image: "https://image.noelshack.com/fichiers/2026/36/3/1788381636-film1.png",
        link: "https://youtu.be/Y85a9M9mVBk?si=g2D22JzZw5bBffQy",
    }, 
    // Ajoute d'autres projets ici, même format :
    // {
    //   title: "...",
    //   url: "silly-os.local/portfolio/projets/...",
    //   desc: "...",
    //   tags: ["...", "..."],
    //   image: "chemin/vers/image.png",
    //   link: "https://...",
    // },
];

function buildProjectResult(p) {
    const searchBlob = (p.title + " " + p.tags.join(" ")).toLowerCase();
    return `
    <div class="se-result" data-search="${searchBlob}">
      <div class="se-result-thumb"><img src="${p.image}" alt="${p.title}"></div>
      <div class="se-result-body">
        <a href="${p.link}" target="_blank" class="se-result-title">${p.title}</a>
        <div class="se-result-url">www.${p.url} <span class="se-cached">- En cache - Pages similaires</span></div>
        <p class="se-result-desc">${p.desc}</p>
        <div class="se-result-tags">${p.tags.map((t) => `<span class="se-tag">#${t}</span>`).join("")}</div>
      </div>
    </div>
  `;
}

function buildProjectsWindowContent() {
    const results = PROJECTS.map(buildProjectResult).join("");
    return `
    <div class="se-shell">
      <div class="se-header">
        <div class="se-logo">
          <span style="color:#4285F4">S</span><span style="color:#EA4335">i</span><span style="color:#FBBC05">l</span><span style="color:#4285F4">l</span><span style="color:#34A853">y</span><span style="color:#EA4335">S</span><span style="color:#FBBC05">e</span><span style="color:#4285F4">a</span><span style="color:#34A853">r</span><span style="color:#EA4335">c</span><span style="color:#FBBC05">h</span><span style="color:#333">!</span>
        </div>
        <div class="se-searchbar">
          <input type="text" id="se-input" class="se-input" placeholder="Rechercher un projet, un tag..." oninput="filterProjects(this.value)" />
          <div class="se-btn" onclick="filterProjects(document.getElementById('se-input').value)">
            <img src="icons/Search.png" class="tb-icon" alt="" /> Rechercher
          </div>
        </div>
        <div class="se-stats" id="se-stats">Environ ${PROJECTS.length} résultat${PROJECTS.length > 1 ? "s" : ""} (0,04 seconde)</div>
      </div>
      <div class="se-results" id="se-results">
        ${results}
      </div>
      <div class="se-noresults" id="se-noresults" style="display:none">
        Aucun document ne correspond aux termes de recherche.<br />Essayez « design », « affiche » ou « illustration ».
      </div>
    </div>
  `;
}

function filterProjects(query) {
    const q = query.trim().toLowerCase();
    const nodes = document.querySelectorAll("#se-results .se-result");
    let count = 0;
    nodes.forEach((node) => {
        const match = !q || node.dataset.search.includes(q);
        node.style.display = match ? "" : "none";
        if (match) count++;
    });
    const stats = document.getElementById("se-stats");
    const noResults = document.getElementById("se-noresults");
    if (stats) {
        stats.textContent =
            count > 0
                ? `Environ ${count} résultat${count > 1 ? "s" : ""} (0,0${Math.floor(Math.random() * 8) + 1} seconde)`
                : `0 résultat pour "${query}"`;
    }
    if (noResults) noResults.style.display = count === 0 ? "block" : "none";
}

// ---------------------------------------------------------------
// App registry: define your "windows" here. This is the only part
// you need to touch to add real content later.
// ---------------------------------------------------------------
const APPS = {
    about: {
        title: "About Me",
        glyph: "icons/aboutme.png",
        color: "#3a6ea5",
        width: 620,
        height: 440,
        explorerChrome: true,
        sidebar: `
      <div class="sidebar-section">
        <div class="sidebar-title">Social Links</div>
        <div class="sidebar-list">
        <div><a href="https://www.instagram.com/a_neidjah/" target="_blank">Instagram</a></div>
        <div><a href="https://sillylinks.duckdns.org" target="_blank">Webcard</a></div>
        </div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Skills</div>
        <div class="sidebar-list">
          <div>Graphic Design</div>
          <div>Web Design</div>
          <div>UX/UI Design</div>
          <div>Dessin Digital</div>
          <div>HTML</div>
        </div>
      </div>
      <div class="sidebar-section">
        <div class="sidebar-title">Software</div>
        <div class="sidebar-list">
          <div>Adobe CC</div>
          <div>VS Code</div>
          <div>Figma</div>
          <div>Clip Studio Paint</div>
          <div>Procreate</div>
        </div>
      </div>
    `,
        content: `
        <div>
      <h2 style="margin-top:0;">About Me</h2>
        <img src="icons/pfp.png" alt="Photo de profil" style="float:right; width:220px; margin:0 0 10px 15px; border:2px solid #3a6ea5;">
      <p>Passionnée par le design et le développement web, je combine créativité et expertise technique pour donner vie à des projets uniques.</p>
      <p>Je m'efforce de créer des solutions élégantes qui résolvent des problèmes réels. Quand je ne crée pas, j'explore les tendances du design ou je travaille sur des illustrations digitales.</p>
    `
    },
    projects: {
        title: "My Projects",
        glyph: "icons/IE6.png",
        color: "#c98a2b",
        width: 560,
        height: 500,
        content: buildProjectsWindowContent(),
    },
    contact: {
        title: "Contact Me",
        glyph: "icons/Email.png",
        color: "#3f9b3f",
        width: 340,
        height: 400,
        content: `
      <form class="contact-form" onsubmit="handleContactForm(event, this)">
        <div class="contact-field">
          <label for="c-name">Nom</label>
          <input type="text" id="c-name" name="name" required />
        </div>
        <div class="contact-field">
          <label for="c-email">Email</label>
          <input type="email" id="c-email" name="email" required />
        </div>
        <div class="contact-field">
          <label for="c-message">Message</label>
          <textarea id="c-message" name="message" rows="4" required minlength="10"></textarea>
        </div>
        <div class="contact-status" aria-live="polite"></div>
        <div class="contact-actions">
          <button type="submit" class="btn">Envoyer</button>
        </div>
        <div class="contact-alt">
          Ou écrivez directement à <a href="mailto:neidjah.anicet@gmail.com">neidjah.anicet@gmail.com</a>
        </div>
      </form>
    `
    },
curryvital: {
    title: "My Resume",
    glyph: "icons/Generic Text Document.png",
    color: "#3f9b3f",
    width: 620,
    height: 520,
    content: `
      <div class="resume-toolbar">
        <div class="tb-btn" onclick="document.getElementById('resumeImg').style.width = (document.getElementById('resumeImg').style.width === '150%' ? '100%' : '150%')">
          <img src="icons/Search.png" class="tb-icon" alt=""> Zoom
        </div>
        <a class="tb-btn" href="images/cv-neidjah.png" download="CV_ANICET_Neidjah.png">
          <img src="icons/SDCard.png" class="tb-icon" alt=""> Save
        </a>
        <div class="tb-btn" onclick="openWindow('contact')">
          <img src="icons/Email.png" class="tb-icon" alt=""> Contact Me
        </div>
      </div>
      <div class="resume-scroll">
        <img id="resumeImg" src="pdf/CV_ANICET_Neidjah.png" alt="Mon CV" style="width:100%; display:block; margin:0 auto; transition: width 0.2s;">
      </div>
    `
}
};

// ---------------------------------------------------------------
// Contact form (Formspree AJAX) — used by the "Contact Me" window
// ---------------------------------------------------------------
function handleContactForm(e, form) {
    e.preventDefault();

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const status = form.querySelector(".contact-status");
    const btn = form.querySelector('button[type="submit"]');
    status.textContent = "";
    status.className = "contact-status";
    btn.disabled = true;
    btn.textContent = "Envoi...";

    fetch("https://formspree.io/f/mykbgjzo", {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
    })
        .then((res) => {
            if (res.ok) {
                status.textContent = "Message envoyé ! Merci 👻";
                status.classList.add("success");
                form.reset();
            } else {
                throw new Error("Server error");
            }
        })
        .catch(() => {
            status.textContent = "Oups, une erreur est survenue. Réessayez ou écrivez par email.";
            status.classList.add("error");
        })
        .finally(() => {
            btn.disabled = false;
            btn.textContent = "Envoyer";
        });
}

const desktopIcons = document.getElementById("icons");
const taskbarItems = document.getElementById("taskbar-items");
const startBtn = document.getElementById("start-btn");
const startMenu = document.getElementById("start-menu");
const desktop = document.getElementById("desktop");

let zCounter = 10;
let openWindows = {}; // id -> { el, taskEl, minimized }
let winCounter = 0;
let offsetCascade = 0;

// Build desktop icons from APPS
Object.entries(APPS).forEach(([id, app]) => {
    const el = document.createElement("div");
    el.className = "icon";
    el.innerHTML = `
    <div class="glyph"><img src="${app.glyph}" class="icon-img" alt=""></div>
    <div class="label">${app.title}</div>
  `;
    el.addEventListener("dblclick", () => openWindow(id));
    el.addEventListener("click", () => openWindow(id)); // single click too, easier on first try
    desktopIcons.appendChild(el);
});

// Builds the File-Explorer-style chrome (menu bar / toolbar / address
// bar / sidebar). The status bar at the bottom uses XP.css's own
// .status-bar / .status-bar-field classes.
function explorerChromeMarkup(app) {
    const sidebar = app.sidebar || "";
    return `
 <div class="explorer-menubar">
      <span>File</span><span>Edit</span><span>View</span><span>Favorites</span><span>Tools</span><span>Help</span>
    </div>
    <div class="explorer-toolbar">
      <div class="tb-btn"><img src="icons/Back.png" class="tb-icon" alt=""> Back</div>
      <div class="tb-btn"><img src="icons/Forward.png" class="tb-icon" alt=""> Forward</div>
      <div class="sep"></div>
      <div class="tb-btn" onclick="openWindow('projects')"><img src="icons/IE6.png" class="tb-icon" alt=""> My Projects</div>
      <div class="tb-btn" onclick="openWindow('curryvital')"><img src="icons/Generic Text Document.png" class="tb-icon" alt=""> My Resume</div>
    </div>
    <div class="explorer-addressbar">
      <span class="addr-label">Address</span>
      <div class="addr-field"><img src="${app.glyph}" alt=""> ${app.title} <span class="addr-caret">&#9660;</span></div>
      <div class="go-btn"><img src="icons/Go.png" class="go-icon" alt=""> Go</div>
    </div>
    <div class="explorer-body">
      ${sidebar ? `<div class="explorer-sidebar">${sidebar}</div>` : ""}
      <div class="explorer-main window-body${app.darkContent ? " dark-content" : ""}">${app.content}</div>
    </div>
    <div class="status-bar">
      <p class="status-bar-field">Ready</p>
    </div>
  `;
}
// Builds the XP.css title bar: title-bar / title-bar-text /
// title-bar-controls, with real <button aria-label="..."> controls
// so XP.css renders the minimize/maximize/close glyphs itself.
function titleBarMarkup(app) {
    return `
    <div class="title-bar">
      <div class="title-bar-text"><img src="${app.glyph}" class="title-icon" alt=""> ${app.title}</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Maximize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
  `;
}

function openWindow(appId) {
    const existingId = Object.keys(openWindows).find((k) => k.startsWith(appId + "__"));
    if (existingId) {
        restoreWindow(existingId);
        focusWindow(existingId);
        return;
    }

    const app = APPS[appId];
    const winId = appId + "__" + winCounter++;
    const win = document.createElement("div");
    // "xp-window" handles position/drag/resize behavior (custom),
    // "window" is the XP.css class that draws the actual chrome.
    win.className = "xp-window window";
    win.style.width = app.width + "px";
    win.style.height = app.height + "px";
    win.style.left = 60 + offsetCascade + "px";
    win.style.top = 50 + offsetCascade + "px";
    offsetCascade = (offsetCascade + 28) % 140;
    win.style.zIndex = ++zCounter;

    win.innerHTML = `
    ${titleBarMarkup(app)}
    ${app.explorerChrome ? explorerChromeMarkup(app) : `<div class="window-body">${app.content}</div>`}
    <div class="resize-handle"></div>
  `;
    desktop.appendChild(win);

    const taskEl = document.createElement("div");
    taskEl.className = "task-item active";
    taskEl.innerHTML = `<img src="${app.glyph}" class="task-icon" alt=""> ${app.title}`;
    taskbarItems.appendChild(taskEl);

    openWindows[winId] = { el: win, taskEl, minimized: false };

    // Wire up interactions
    if (!isMobileLayout()) {
        makeDraggable(win, win.querySelector(".title-bar"));
        makeResizable(win, win.querySelector(".resize-handle"));
    }

    win.addEventListener("mousedown", () => focusWindow(winId));
    taskEl.addEventListener("click", () => {
        if (openWindows[winId].minimized) {
            restoreWindow(winId);
        } else if (isActive(winId)) {
            minimizeWindow(winId);
        }
        focusWindow(winId);
    });

    win.querySelector('.title-bar-controls button[aria-label="Minimize"]').addEventListener("click", (e) => {
        e.stopPropagation();
        minimizeWindow(winId);
    });
    win.querySelector('.title-bar-controls button[aria-label="Close"]').addEventListener("click", (e) => {
        e.stopPropagation();
        closeWindow(winId);
    });
    win.querySelector('.title-bar-controls button[aria-label="Maximize"]').addEventListener("click", (e) => {
        e.stopPropagation();
        toggleMaximize(win);
    });

    focusWindow(winId);
}

function isActive(winId) {
    return openWindows[winId].el.classList.contains("active");
}

function focusWindow(winId) {
    Object.entries(openWindows).forEach(([id, w]) => {
        const active = id === winId;
        w.el.classList.toggle("active", active);
        w.taskEl.classList.toggle("active", active);
        // XP.css dims the title bar via the "inactive" class on .title-bar
        w.el.querySelector(".title-bar").classList.toggle("inactive", !active);
    });
    const w = openWindows[winId];
    w.el.style.zIndex = ++zCounter;
}

function minimizeWindow(winId) {
    const w = openWindows[winId];
    w.el.classList.add("minimized");
    w.minimized = true;
    w.el.classList.remove("active");
    w.taskEl.classList.remove("active");
}

function restoreWindow(winId) {
    const w = openWindows[winId];
    w.el.classList.remove("minimized");
    w.minimized = false;
}

function closeWindow(winId) {
    const w = openWindows[winId];
    w.el.remove();
    w.taskEl.remove();
    delete openWindows[winId];
}

function toggleMaximize(win) {
    if (win.dataset.maxed === "1") {
        win.style.width = win.dataset.prevW;
        win.style.height = win.dataset.prevH;
        win.style.left = win.dataset.prevL;
        win.style.top = win.dataset.prevT;
        win.dataset.maxed = "0";
    } else {
        win.dataset.prevW = win.style.width;
        win.dataset.prevH = win.style.height;
        win.dataset.prevL = win.style.left;
        win.dataset.prevT = win.style.top;
        win.style.width = "100%";
        win.style.height = "calc(100vh - 34px)";
        win.style.left = "0px";
        win.style.top = "0px";
        win.dataset.maxed = "1";
    }
}

// ---------------------------------------------------------------
// Drag / resize
// ---------------------------------------------------------------
function makeDraggable(win, handle) {
    let dragging = false,
        startX,
        startY,
        startLeft,
        startTop;
    handle.addEventListener("mousedown", (e) => {
        dragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = win.offsetLeft;
        startTop = win.offsetTop;
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
        if (!dragging) return;
        win.style.left = startLeft + (e.clientX - startX) + "px";
        win.style.top = Math.max(0, startTop + (e.clientY - startY)) + "px";
    });
    window.addEventListener("mouseup", () => (dragging = false));
}

function makeResizable(win, handle) {
    let resizing = false,
        startX,
        startY,
        startW,
        startH;
    handle.addEventListener("mousedown", (e) => {
        resizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startW = win.offsetWidth;
        startH = win.offsetHeight;
        e.stopPropagation();
        e.preventDefault();
    });
    window.addEventListener("mousemove", (e) => {
        if (!resizing) return;
        win.style.width = Math.max(220, startW + (e.clientX - startX)) + "px";
        win.style.height = Math.max(140, startH + (e.clientY - startY)) + "px";
    });
    window.addEventListener("mouseup", () => (resizing = false));
}

// ---------------------------------------------------------------
// Start menu + clock
// ---------------------------------------------------------------
startBtn.addEventListener("click", () => {
    startMenu.classList.toggle("open");
    startBtn.classList.toggle("open");
});

document.addEventListener("click", (e) => {
    if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    }
});

startMenu.querySelectorAll(".sm-item[data-open]").forEach((item) => {
    item.addEventListener("click", () => {
        openWindow(item.dataset.open);
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    });
});

// "Fermer la session" sends you back to the login screen, XP-style.
const smLogoff = document.getElementById("sm-logoff");
if (smLogoff) {
    smLogoff.addEventListener("click", () => {
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
        appShell.classList.remove("visible");
        loginScreen.style.display = "flex";
        loginScreen.classList.remove("fade-out");
        loginFrame.classList.remove("hide");
        welcomeText.classList.remove("show");
        loginCard.style.pointerEvents = "auto";
    });
}

// "Arrêter" is decorative for now — just closes the menu.
const smShutdown = document.getElementById("sm-shutdown");
if (smShutdown) {
    smShutdown.addEventListener("click", () => {
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    });
}

function updateClock() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    document.getElementById("clock").textContent = `${h}:${m} ${ampm}`;
}
updateClock();
setInterval(updateClock, 1000 * 10);
