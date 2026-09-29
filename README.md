# Pixel-Accurate Scroll-Driven Car Animation (React.js + GSAP)

A production-quality React.js recreation of the scroll-driven sports car animation featured at [paraschaturvedi.github.io/car-scroll-animation](https://paraschaturvedi.github.io/car-scroll-animation/).

Built with **React 19**, **Vite**, **GSAP (GreenSock)**, and **GSAP ScrollTrigger**.

---

## 🌟 Key Features & Mechanics

### 1. Dynamic Scroll-Driven Car Movement
- **Scroll DOWN** $\rightarrow$ Car accelerates and travels smoothly from **LEFT $\rightarrow$ RIGHT**.
- **Scroll UP** $\rightarrow$ Car naturally reverses from **RIGHT $\rightarrow$ LEFT**.
- The car's horizontal displacement is bound directly to ScrollTrigger scrub progress (`scrub: 1.1`, `ease: "none"`), delivering an organic physical feel without detached autoplays, `setInterval`, or CSS keyframe locks.
- Uses hardware-accelerated 3D transforms (`translate3d` / GSAP `x` transforms with `force3D: true` and `will-change: transform`).

### 2. Live Dynamic Trail & Letter Reveal
- Layered under the McLaren sports car is a bright green horizontal strip (`#45db7d`) that expands dynamically across the dark road as the car drives forward.
- The headline **"WELCOME ITZFIZZ"** is laid out letter-by-letter on the road. As the vehicle's midpoint crosses each letter's calculated horizontal coordinate, the letter lights up into solid black (`opacity: 1`) on the green trail, exactly matching the reference behavior.

### 3. Four Surrounding KPI Statistic Cards
- Sequentially revealed during the scroll trajectory:
  - **58%** `Increase in pick up point use` (Lime / Yellow-green: `#def54f`) — reveals at ~15%-30% scroll
  - **23%** `Decreased in customer phone calls` (Sky Blue: `#6ac9ff`) — reveals at ~35%-50% scroll
  - **27%** `Increase in pick up point use` (Carbon Charcoal: `#333333`) — reveals at ~58%-73% scroll
  - **40%** `Decreased in customer phone calls` (McLaren Orange: `#fa7328`) — reveals at ~78%-93% scroll
- All cards reverse smoothly when the user scrolls back up.

### 4. Responsiveness & Adaptive Geometry
- Start and end positions are dynamically computed from viewport and container dimensions:
  - `startX = 0` (left edge)
  - `endX = roadWidth - (carWidth * 0.25)` (reaches far right edge)
- Clean responsive breakpoints for Desktop, Laptop, Tablet, and Mobile.
- Full viewport pinning using GSAP ScrollTrigger (`pin: trackRef.current`).

---

## 🛠️ Tech Stack & Architecture

- **React 19**
- **Vite 8**
- **GSAP 3.12** + **ScrollTrigger**
- **Pure Modern CSS** (no bloated utility libraries)
- **Component Structure**:
  ```
  src/
  ├── assets/
  │   └── car.png               # High-res transparent top-down orange McLaren 720S
  ├── components/
  │   ├── CarScrollSection.jsx  # Primary GSAP ScrollTrigger coordinator & pinned stage
  │   ├── HeroBanner.jsx        # Road banner, green dynamic trail, letters & car
  │   ├── Car.jsx               # McLaren sports car component with GPU transform
  │   ├── Stats.jsx             # 4 KPI cards container
  │   ├── StatCard.jsx          # Individual KPI card component
  │   ├── Header.jsx            # Minimalist brand badge & live telemetry progress %
  │   ├── ScrollIndicator.jsx   # Interactive scroll guidance pill
  │   └── Footer.jsx            # Project overview & scroll-to-top replay
  ├── App.css                   # Complete design system, layouts & responsive rules
  ├── index.css                 # Base resets, fonts & root variables
  ├── App.jsx                   # Root application assembly
  └── main.jsx                  # Entry point
  ```

---

## 🚀 Running Locally

### Development Server
```bash
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build
```bash
npm run build
npm run preview
```

### Code Linting
```bash
npm run lint
```
