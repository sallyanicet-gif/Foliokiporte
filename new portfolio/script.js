// ---------------------------------------------------------------
// Boot -> Login -> Welcome -> Desktop sequence
// ---------------------------------------------------------------
const bootScreen = document.getElementById("boot-screen");
const loginScreen = document.getElementById("login-screen");
const loginCard = document.getElementById("login-card");
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
    welcomeText.classList.add("show");

    setTimeout(() => {
        loginScreen.classList.add("fade-out");
        setTimeout(() => {
            loginScreen.style.display = "none";
            appShell.classList.add("visible");
        }, 600);
    }, 900);
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
        width: 420,
        height: 300,
        content: `<p>List or grid of project cards goes here.</p>`
    },
    contact: {
        title: "Contact Me",
        glyph: "icons/Email.png",
        color: "#3f9b3f",
        width: 320,
        height: 200,
        content: `<p>Drop a contact form or links here.</p>`
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
    makeDraggable(win, win.querySelector(".title-bar"));
    makeResizable(win, win.querySelector(".resize-handle"));

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

startMenu.querySelectorAll("li[data-open]").forEach((li) => {
    li.addEventListener("click", () => {
        openWindow(li.dataset.open);
        startMenu.classList.remove("open");
        startBtn.classList.remove("open");
    });
});

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
