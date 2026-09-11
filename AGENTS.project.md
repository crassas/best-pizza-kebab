# Project Instructions & Skill Guidelines

This project enforces high-craft design standards, UI/UX polish, image-to-code translation, and automated Playwright browser testing.

---

## 🎨 Design Taste & Web Design Guidelines ("Taste Skill" & "Awesome Design")

### 1. Visual Identity & Anti-Slop Principles
- **No Generic Templates**: Avoid generic SaaS blues, artificial purple-cyan gradients, and repetitive 3-column card grids.
- **Sophisticated Neutrals**: Use rich, domain-tailored color palettes (e.g. warm cream `#F4EADC`, deep ink `#14110E`, rich orange `#E07A1F`, deep red `#9C1F1A`).
- **Mathematical Rhythm**:
  - Consistent padding hierarchy: outer container padding must always meet or exceed inner child gaps.
  - Typographic scale: Bebas Neue for display headings paired with Figtree for readable body copy.
  - Border radius nesting: `Inner Radius = Outer Radius - Padding`.

### 2. Layout & Responsive Execution
- **Desktop & Mobile Parity**: Mobile viewports (390×844) must never show horizontal overflow, overlapping elements, or cramped touch targets.
- **Micro-Interactions**: Smooth state transitions, active feedback on touch/click, hover states, and clear focus-visible rings.

---

## 📷 Image-to-Code Standards

- **Visual Fidelity**: Replicate layout hierarchy, proportions, and visual weight faithfully from design references or uploaded images.
- **Semantic Components**: Map UI regions to clean React/Tailwind components with full accessibility (`aria-*` labels, proper landmark tags).
- **Responsive Adaptability**: Convert fixed image layouts into fluid CSS grid/flexbox layouts.

---

## 🧪 Playwright CLI & Automated QA Guidelines

- **Preinstalled Tooling**: `playwright` is installed in `devDependencies`.
- **Smoke Testing**: Use Playwright browser automation (`node scripts/browser-smoke.mjs` or `agent-browser` CLI) to verify:
  - Both desktop (1280×800) and mobile (390×844) viewport renders.
  - Console error freedom (0 uncaught runtime exceptions).
  - Proper interactive behavior on click, scroll, and navigation events.
