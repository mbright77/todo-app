# UI Design Guide

This document outlines the UI design guidelines for the application, based on the provided mockup (`todo_design.png`). Following these guidelines will ensure a consistent and visually appealing user interface.

## Color Palette

-   **Primary Background:** `radial-gradient(circle at top, #fef7f1 0%, #f6f2ec 55%, #efe7de 100%)`
-   **Panel Background:** `#ffffff`
-   **Form Background:** `#fef7f1`
-   **Primary Text:** `#1b1b1f`
-   **Secondary Text:** `#6e6258`
-   **Subtle Text / Labels:** `#9a8776`
-   **Accent / Primary Button:** `#1b1b1f` (background), `#f6f2ec` (text)
-   **Borders:** `#e0d6cc` (standard), `#e6dbd0` (light)

## Typography

-   **Display Font Family:** `var(--font-display)` - A clean, modern sans-serif font for headings.
-   **Sans-serif Font Family:** `var(--font-sans)` - A readable sans-serif for body text, inputs, and buttons.

### Font Sizes

-   **Page Title (`h1`):** `clamp(32px, 4vw, 44px)`
-   **Kicker/Eyebrow:** `12px` (with `0.2em` letter spacing and uppercase)
-   **Body/Input:** `16px`
-   **Button:** `14px`
-   **Label:** `12px` (with `0.18em` letter spacing and uppercase)

### Font Weights

-   **Page Title:** `600`
-   **Buttons:** `600`
-   **Regular:** `400`

## Spacing

Use a consistent spacing scale based on multiples of 4px and 8px.

-   **Gaps between sections:** `24px`, `28px`
-   **Padding within panels:** `28px` (desktop), `20px` (mobile)
-   **Gaps between form elements:** `16px`
-   **Padding within form elements:** `12px 14px`

## Component Styles

### Buttons

-   **Primary Button:** Rounded pill shape (`999px`), solid dark background (`#1b1b1f`), light text (`#f6f2ec`).
-   **Icon Button:** No border, transparent background.

### Forms & Inputs

-   **Form Container:** Dashed border (`#e0d6cc`), light background (`#fef7f1`), rounded corners (`20px`).
-   **Input Fields:** Solid border (`#e0d6cc`), white background, rounded corners (`12px`).
-   **Input Focus:** `2px` solid outline (`#1b1b1f`), transparent border.

### Panels/Cards

-   **Main Panel:** Rounded corners (`24px` desktop, `18px` mobile), white background (`#ffffff`), subtle box shadow (`0 24px 50px rgba(27, 27, 31, 0.08)`).
-   **Task Card:** Transparent background, with a bottom border (`#efe4da`) to separate items in a list.

### Navigation
-   **Tab Container (`TaskNav`):** Use Form Background color (`#fef7f1`), pill shape (`999px`), and a light border (`#e6dbd0`).
-   **Tab Link:** Font size `14px`, weight `600`, with `0.08em` letter spacing. Use Secondary Text color (`#6e6258`).
-   **Tab Active State:** Use Accent color (`#1b1b1f`) for background and corresponding light text (`#f6f2ec`).

---

## UX & Accessibility Rules

1.  **Feedback:** All interactive elements (buttons, links, inputs) must have clear `:hover` and `:focus-visible` states. Focus states should be highly visible (e.g., solid outline).
2.  **Consistency:** Always use the color, typography, and spacing tokens defined in this guide. Do not introduce new "magic numbers."
3.  **Labels:** Ensure all form inputs have associated `<label>` tags. For icon-only buttons, provide an `aria-label`.
4.  **Semantics:** Use semantic HTML elements (`<nav>`, `<button>`, `<main>`, etc.) to support assistive technologies.

---

Refer to this guide when creating or modifying UI components to maintain a cohesive design language across the application.
