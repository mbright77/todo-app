# UI Design Guide (Material Design 3)

This document outlines the UI design guidelines for the application, following Material Design 3 (MD3) standards implemented via MUI v7.

## Theme & Color Palette

The app uses MUI's `colorSchemes` (light/dark) with MD3-approximated tokens.

### Light Scheme
- **Primary:** `#6750A4` (Deep Purple)
- **Secondary:** `#625B71`
- **Background:** `#FFFBFE`
- **Surface:** `#FFFBFE`
- **Error:** `#B3261E`

### Dark Scheme
- **Primary:** `#D0BCFF`
- **Secondary:** `#CCC2DC`
- **Background:** `#1C1B1F`
- **Surface:** `#1C1B1F`

## Typography

The app uses the **Roboto** font family bundled via `@fontsource/roboto`.

### Type Scale
- **Display (h1-h3):** Roboto 400. Used for page headings and hero elements.
- **Body (body1-body2):** Roboto 400. Used for task descriptions and general text.
- **Overline:** Roboto 400. Used for kickers and category labels.
- **Button:** Roboto 600. Used for all interactive triggers.

## Components & Shapes

### Shapes
- **Standard Radius:** `12px` (Cards, TextFields)
- **Large Radius:** `16px` (Panels, Paper)
- **Dialog Radius:** `28px`
- **Pill Radius:** `999px` (Buttons, Chips, Tabs)

### Surface Elevation
The app uses **Tonal Elevation** where possible (surface color tinting) combined with subtle shadows. Outlined variants are preferred for a clean, modern look.

## UX & Accessibility Rules

1. **Focus Management:** All dialogs use focus trapping. The "Add Task" disclosure panel returns focus to the toggle button on close.
2. **Keyboard Navigation:** Every action (Add, Edit, Delete, Filter) is accessible via keyboard. Escape key closes dialogs and the disclosure panel.
3. **Labels:** All form inputs use MUI `TextField` labels or explicit `aria-label` for icon-only buttons.
4. **Motion:** Use MUI `Collapse` and `Fade` for entry/exit animations. All animations respect the `prefers-reduced-motion` system setting.
5. **Dark Mode:** Supports system-level and manual dark mode toggling via the `AppBar` toggle.

---

Refer to `src/app/theme.ts` for the programmatic implementation of these guidelines.
