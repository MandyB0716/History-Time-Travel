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

Following real-world child user testing and iterative feedback, the curriculum spans **15 historical eras** featuring **45 bite-sized micro-lessons**, **15 interactive visual quizzes**, **15 collectible artifacts**, an **Interactive Activity Center** (Fossil Dig, Memory Match, Coloring Book), and a personalized **Master Time Traveler Diploma**.

```
 🗺️ 15-Era Map ──▶ 📖 45 Micro-Lessons ──▶ 🎯 15 Quizzes ──▶ 🎒 15-Slot Backpack ──▶ 🎮 Activity Center ──▶ 📜 Printable Diploma
```

---

## ✨ Key Features & HCI Design Principles

### 🧠 1. Cognitive Scaffolding & Chunking (Miller's Law)
* **3-Part Lessons:** Information is chunked into small, manageable sentences to avoid cognitive overload for developing minds.
* **Dual Coding (Paivio's Theory):** Every lesson pairs concise text with recognizable visual icons and Text-to-Speech narration.

### 🎮 2. Interactive History Activity Center
* **🏺 Archaeology Fossil Dig:** Multi-layer interactive grid where children use archaeological brushes and picks to excavate buried dinosaur bones and ancient treasures.
* **🃏 Artifact Memory Match:** Cognitive card-flip matching game with customizable difficulty (6 or 12 cards) using historical artifacts.
* **🎨 Historical Coloring Book:** HTML5 digital coloring canvas with vibrant color palettes, historical stickers (dinosaurs, crowns, castles), and artwork download.

### 📜 3. Tangible Extrinsic Motivation & Recognition
* **Printable Master Explorer Diploma:** Generates a personalized certificate of completion with the student's name, mission date, official seal, and earned artifact badges, complete with `@media print` styling for framing or classroom display.

### 👂 4. Multi-Modal Feedback & Universal Accessibility (UDL)
* **Integrated Text-to-Speech (TTS):** One-tap audio narration with child-friendly speech rates and visual pulsing indicators to assist emergent readers.
* **Web Audio Synthesizer:** Real-time positive reinforcement chimes and gentle wrong-answer cues without punitive friction.
* **Mute & Volume Controls:** Accessible sound toggles situated across the landing page and navigation headers.
* **WCAG 2.1 AA Compliance:** High-contrast typography (4.5:1+ ratio), standard `focus-visible` keyboard rings, and polite ARIA announcements.

---

## 🏛️ The 15 Historical Eras

| # | Historical Era | Thematic Focus | Collectible Artifact |
| :-: | :--- | :--- | :--- |
| **1** | **Dinosaurs** | Prehistoric world, plant-eaters, and T-Rex | 🦷 Dinosaur Tooth |
| **2** | **Ice Age** | Glaciers, woolly mammoths, and sabertooths | 🎨 Cave Painting |
| **3** | **Ancient Egypt** | Nile River, Pharaohs, and Pyramids | 👑 Pharaoh's Crown |
| **4** | **Ancient Greece** | City-states, Olympic Games, and temples | 🌿 Golden Wreath |
| **5** | **Ancient Rome** | Colosseum, chariot races, and stone roads | 🪙 Roman Gold Coin |
| **6** | **Ancient Maya** | Jungle step pyramids, stargazers, and cocoa | 🎭 Maya Jade Mask |
| **7** | **Middle Ages** | Castles, chivalry, and knights in armor | 🛡️ Knight's Shield |
| **8** | **Feudal Japan** | Samurai honor, cherry blossoms, and pagodas | 🦢 Origami Crane |
| **9** | **Pirate Age** | Ocean navigation, tall ships, and treasure | 🧭 Pirate Compass |
| **10**| **Renaissance** | Da Vinci inventions, printing press, and stars | 🔭 Brass Telescope |
| **11**| **Wild West** | Frontier pioneers, cowboys, and sheriffs | ⭐ Sheriff's Star |
| **12**| **Industrial Revolution**| Steam engines, factories, and railways | ⚙️ Golden Gear |
| **13**| **Early Aviation** | Wright Brothers, Kitty Hawk, and biplanes | 🥽 Aviator Goggles |
| **14**| **1960s Retro** | Rock & roll, vintage technology, and early TV | 📷 Vintage Camera |
| **15**| **Space Age** | Moon landing, Apollo rockets, and satellites | 🌑 Moon Rock |

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
│   │   ├── games/
│   │   │   ├── ActivityCenter.jsx # Mini-games navigation hub
│   │   │   ├── FossilDig.jsx      # Archaeology sand brush & dig minigame
│   │   │   ├── MemoryMatch.jsx    # Card flip memory matching game
│   │   │   └── ColoringBook.jsx   # HTML5 digital coloring canvas & stickers
│   │   ├── Certificate.jsx        # Personalized printable Master Diploma
│   │   ├── Dashboard.jsx / .css   # Landing hub with sound controls & 4 main portals
│   │   ├── Timeline.jsx / .css    # Visual 15-era map with status badges
│   │   ├── Lesson.jsx / .css      # 3-step micro-lesson viewer with TTS narration
│   │   ├── Quiz.jsx / .css        # Dual-coded interactive quiz with feedback
│   │   └── ArtifactBackpack.jsx   # 15-slot persistent collection grid
│   ├── data/
│   │   └── eras.js                # Curriculum dataset (15 eras, 45 lessons, 15 quizzes)
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
* **Styling:** Vanilla CSS3 (Custom Properties, Flexbox, CSS Grid, Glassmorphism, Print Stylesheets)
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
* 🎓 **[User & Educator Guide](docs/USER_GUIDE.md)**: Illustrated guide explaining gameplay mechanics, navigation tips, mini-games, and certificate printing.

---

## 👤 Author & Acknowledgments

* **Mandy Brown** &bull; MS in Applied Computer Science, Southeast Missouri State University
* **Course:** CS630 - Human-Computer Interaction
* Developed as a comprehensive HCI graduate portfolio demonstration.
