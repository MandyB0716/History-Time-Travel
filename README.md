# 🚀 History Time Travel - Time Machine Adventure 🦕

[![React 19](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Bundler-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![HCI Principles](https://img.shields.io/badge/HCI-WCAG%202.1%20AA-10B981)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Academic Portfolio](https://img.shields.io/badge/Course-CS630%20HCI-f59e0b)](https://semo.edu)

> **Graduate Capstone Portfolio Project**  
> Master of Science in Applied Computer Science &bull; Southeast Missouri State University  
> **Course:** CS630 - Human-Computer Interaction  
> **Author:** Mandy Brown  
> **Live Demo:** [https://mandyb0716.github.io/History-Time-Travel/](https://mandyb0716.github.io/History-Time-Travel/)

---

## 📌 Project Overview

**History Time Travel** is an educational, interactive web application engineered specifically for early childhood learners (**ages 5–8**). Grounded in core **Human-Computer Interaction (HCI)** principles, cognitive load theory, and universal design, the application transforms world history into an engaging, gamified journey.

Young learners navigate a chronological timeline spanning **10 historical eras**. Each era features **3 bite-sized lessons** and **1 interactive visual quiz**, allowing students to collect authentic historical artifacts in their digital backpack (totaling **30 micro-lessons**, **10 quizzes**, and **10 collectible artifacts**).

```
 🗺️ Map Selection ──▶ 📖 3 Micro-Lessons ──▶ 🎯 Visual Quiz ──▶ 🏆 Artifact Collected ──▶ 🎒 Backpack (10/10)
```

---

## ✨ Key Features & HCI Design Principles

### 🧠 1. Cognitive Scaffolding & Chunking (Miller's Law)
* **3-Part Lessons:** Information is chunked into small, manageable sentences to avoid cognitive overload for developing minds.
* **Dual Coding (Paivio's Theory):** Every lesson pairs concise text with recognizable visual icons and Text-to-Speech narration.

### 👂 2. Multi-Modal Feedback & Universal Accessibility (UDL)
* **Integrated Text-to-Speech (TTS):** One-tap audio narration with child-friendly speech rates and visual pulsing indicators to assist emergent readers.
* **Web Audio Synthesizer:** Real-time positive reinforcement chimes and gentle wrong-answer cues without punitive friction.
* **Mute & Volume Controls:** Accessible sound toggles situated across the landing page and navigation headers.
* **WCAG 2.1 AA Compliance:** High-contrast typography (4.5:1+ ratio), standard `focus-visible` keyboard rings, and polite ARIA announcements.

### 🎯 3. Gamification & Intrinsic Motivation
* **Chronological Timeline Map:** Visual era icons, active "HERE" destination markers, and lock badges providing clear visibility of system status.
* **10-Slot Explorer Backpack:** Dynamic visual collection showcasing earned artifacts and silhouette mystery slots to encourage goal-oriented completion.
* **Local Storage Persistence:** Preserves unlocked eras and backpack items across sessions so student progress is never lost.

---

## 🏛️ The 10 Historical Eras

| # | Historical Era | Thematic Focus | Collectible Artifact |
| :-: | :--- | :--- | :--- |
| **1** | **Dinosaurs** | Prehistoric world, plant-eaters, and T-Rex | 🦷 Dinosaur Tooth |
| **2** | **Ice Age** | Glaciers, woolly mammoths, and sabertooths | 🎨 Cave Painting |
| **3** | **Ancient Egypt** | Nile River, Pharaohs, and Pyramids | 👑 Pharaoh's Crown |
| **4** | **Ancient Greece** | City-states, Olympic Games, and temples | 🌿 Golden Wreath |
| **5** | **Middle Ages** | Castles, chivalry, and knights in armor | 🛡️ Knight's Shield |
| **6** | **Pirate Age** | Ocean navigation, tall ships, and buried treasure | 🧭 Pirate Compass |
| **7** | **Wild West** | Frontier pioneers, cowboys, and sheriffs | ⭐ Sheriff's Star |
| **8** | **Industrial Revolution**| Steam engines, factories, and railways | ⚙️ Golden Gear |
| **9** | **1960s Retro** | Music culture, vintage technology, and television | 📷 Vintage Camera |
| **10**| **Space Age** | Rocket science, lunar landings, and satellites | 🌑 Moon Rock |

---

## 🛠️ Architecture & Tech Stack

```
Final_Project_Code/
├── docs/
│   ├── HCI_DESIGN_REPORT.md       # Comprehensive HCI design & evaluation report
│   └── USER_GUIDE.md              # Instructional user & educator guide
├── public/                        # Static assets and favicons
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx / .css   # Landing hub with sound controls & entry points
│   │   ├── Timeline.jsx / .css    # Visual chronological map with status badges
│   │   ├── Lesson.jsx / .css      # 3-step micro-lesson viewer with TTS narration
│   │   ├── Quiz.jsx / .css        # Dual-coded interactive quiz with feedback
│   │   └── ArtifactBackpack.jsx   # 10-slot persistent collection grid
│   ├── data/
│   │   └── eras.js                # Curriculum dataset (10 eras, 30 lessons, 10 quizzes)
│   ├── utils/
│   │   ├── audio.js               # Web Audio API sound effect synthesizer
│   │   └── speech.js              # Web Speech API (TTS) wrapper
│   ├── App.jsx / .css             # Core application routing & persistence state
│   ├── index.css                  # Global design tokens & accessibility styling
│   └── main.jsx                   # React root entry point
├── package.json
└── vite.config.js
```

* **Frontend Framework:** React 19 (Hooks, Functional Architecture)
* **Build System:** Vite
* **Styling:** Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism, CSS Transitions)
* **Audio Synthesis:** Web Audio API (No external sound asset dependencies)
* **Speech Synthesis:** Web Speech API (`SpeechSynthesisUtterance`)
* **State Persistence:** Browser `localStorage` API

---

## 🚀 Getting Started Locally

### Prerequisites
* [Node.js](https://nodejs.org/) (v18.0.0 or later recommended)
* [Git](https://git-scm.com/)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MandyB0716/History-Time-Travel.git
   cd History-Time-Travel
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/History-Time-Travel/` in your browser.

4. **Run code validation & build:**
   ```bash
   # Run linter
   npm run lint

   # Generate production bundle
   npm run build
   ```

---

## 📚 Supplementary Documentation

* 📖 **[HCI Design & Usability Report](docs/HCI_DESIGN_REPORT.md)**: In-depth academic report on user personas, Nielsen Norman heuristics evaluation, cognitive walkthroughs, and WCAG accessibility standards.
* 🎓 **[User & Educator Guide](docs/USER_GUIDE.md)**: Illustrated guide explaining gameplay mechanics, navigation tips, and classroom application ideas.

---

## 👤 Author & Acknowledgments

* **Mandy Brown** &bull; MS in Applied Computer Science, Southeast Missouri State University
* **Course:** CS630 - Human-Computer Interaction
* Developed as a comprehensive HCI graduate portfolio demonstration.
