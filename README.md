# CineProd Studio — Titan #36 Film Production OS

Enterprise-grade, client-side, local-first web application for feature film production management, call sheets, script supervisor continuity, dailies color grading telemetry, and department dispatch.

## Architectural DNA
- **Design Movement**: #31 Magazine / Editorial Layout (Cinematic Noir)
- **Palette**: Pitch Onyx (`#09090b`), Dark Graphite (`#121215`), Crisp White (`#fafafa`), Kodak Amber (`#f59e0b`), SMTPE Red (`#ef4444`).
- **Framework**: Next.js App Router, TypeScript (Strict), Tailwind CSS v4 (`@import "tailwindcss";`), Lucide React, Framer Motion, Canvas Confetti.
- **Persistence**: LocalStorage state under `cineprod_state_v1`.
- **Target URL**: `https://olyxmintabansos-byte.github.io/cineprod-studio/`

## Production Routes
1. `/` — Executive Call Sheet & Shoot Day Command Dashboard
2. `/scenes/` — Script Supervisor Continuity & Scene Breakdown Matrix
3. `/dailies/` — Dailies Review, ACES 3D LUT Emulation & False Color Suite
4. `/crew/` — Crew Department Dispatch, Walkie Channels & ID Passes
