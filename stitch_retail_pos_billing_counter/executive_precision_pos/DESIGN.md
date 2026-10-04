---
name: Executive Precision POS
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0051d5'
  on-secondary: '#ffffff'
  secondary-container: '#316bf3'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#002114'
  on-tertiary-container: '#069669'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b4c5ff'
  on-secondary-fixed: '#00174b'
  on-secondary-fixed-variant: '#003ea8'
  tertiary-fixed: '#85f8c4'
  tertiary-fixed-dim: '#68dba9'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-sm:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.005em
  headline-sm:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0em
  body-lg:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Geist
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  numeric-total:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  numeric-table:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 18px
    letterSpacing: 0em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 0.75rem
  gutter-dense: 0.5rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1rem
  space-xl: 1.5rem
---

## Brand & Style

The design system is engineered for high-throughput retail operations and store intelligence. It balances high-velocity transaction mechanics for cashiers with dense administrative clarity for floor managers. The visual tone is structured, authoritative, and frictionless—eliminating unnecessary embellishments in favor of immediate legibility, high visual contrast under harsh fluorescent retail lighting, and instantaneous spatial orientation.

Drawing from modern precision SaaS and industrial instrument interfaces, the style emphasizes structured hierarchy, crisp perimeter definitions, and purposeful contrast. Dark slate anchor frames host pristine, high-luminance active surfaces. Key interaction targets are distinct, reassuring, and calibrated to minimize human error during peak-hour checkouts and inventory audits.

## Colors

The palette establishes strict functional roles to maximize operational confidence:

- **Structural Foundations (`#0F172A`, `#1E293B`):** Deep slate tones anchor persistent frames, terminal navigation, global system status, and modal backdrops, keeping cashier focus centered on the operational canvas.
- **Surface Canvas (`#FFFFFF`, `#F8FAFC`):** Crisp, anti-reflective white and ultra-light neutral surfaces provide optimal contrast for receipt lanes, line items, and product matrix cells.
- **Structural Dividers (`#E2E8F0`, `#CBD5E1`):** Precise 1px hairline borders that organize dense grids, data tables, and input groups without introducing visual noise.
- **Action Core (`#2563EB`):** High-visibility cobalt blue reserved for primary system commitments (e.g., "Tender Order", "Add Customer", "Submit Inventory Adjustments").
- **Transactional Fiscal Accent (`#059669`, `#10B981`):** Crisp emerald/teal utilized strictly for fiscal positives: total balances paid, change due, successful tenders, and positive inventory trends.
- **Cautionary Alert (`#D97706`):** Warm amber for low-stock flags, drawer imbalance warnings, and pending shift approvals.
- **Destructive/Critical (`#EF4444`):** Sharp coral red reserved exclusively for item voids, tender cancellations, refund exceptions, and deleted transactions.

## Typography

The type system implements a dual-font configuration: **Hanken Grotesk** supplies clean, architectural authority for top-level headers and mode switches, while **Geist** handles continuous operational body copy, tabular ledgers, and barcode indices.

- **Tabular Numerics Rule:** All prices, stock counts, discounts, and barcode entries must strictly activate tabular figures (`font-variant-numeric: tabular-nums; font-feature-settings: "tnum"`). Columns containing numerical currency or counts must align right against their column headers.
- **Density and Visual Rhythm:** Font sizing prioritizes dense visibility (13px standard body) to display complete receipt transactions and extensive inventory matrices without excessive scrolling.
- **Case Conventions:** Micro-labels, system badges, keyboard shortcut references, and column descriptors utilize uppercase styling with subtle tracking expansion (`0.04em`) to ensure instant categorization under rapid glance conditions.

## Layout & Spacing

The system deploys a fixed-region operational split designed specifically for touch terminals and desktop POS displays (minimum target 1024x768, optimized for 1920x1080):

- **Terminal Split Architecture:**
  - **Left / Center Zone (60-65%):** Catalog grid, quick-keys matrix, search inputs, and store management views.
  - **Right Sidebar Zone (35-40%):** Fixed ledger panel showing the active receipt tape, customer affiliation, line item adjustments, subtotal summaries, and primary pay actions.
- **Rhythm & Grid Density:** 
  - Structural elements sit on an 8px base grid, compacting down to 4px for tight internal component paddings.
  - Line-item rows in the receipt tape maintain a rigid 40px to 48px touch-safe height with `0.5rem` internal padding, enabling rapid item selection or swipe-to-void actions.
- **Adaptive Breakpoints:**
  - Below 1280px screen widths, secondary administrative metadata hides behind drawer drawers; the active ticket remains permanently pinned.
  - Full-screen popover sheets replace nested modals during tender sequences to safeguard focus and eliminate off-target clicks.

## Elevation & Depth

Visual hierarchy relies on low-contrast structural outlines and subtle tonal separation rather than heavy drop shadows:

- **Level 0 (Base Canvas):** Background tone `#F8FAFC`, non-interactive and receding.
- **Level 1 (Card & Module Shells):** High-white `#FFFFFF` resting on `#F8FAFC`, delineated by a crisp 1px border (`#E2E8F0`). No shadow is applied; structure is established solely by edge clarity.
- **Level 2 (Popovers, Dropdowns, and Flyouts):** Surfaces rendered in `#FFFFFF` with a 1px `#CBD5E1` border and an ultra-diffused, ambient shadow (`0 4px 12px -2px rgba(15, 23, 42, 0.08)`).
- **Level 3 (Modal Dialogs & Keypads):** High-priority overlays anchored with a dark semi-translucent backdrop (`rgba(15, 23, 42, 0.65)`). The dialog features a sharp `#FFFFFF` base, a 1px perimeter highlight (`#FFFFFF` on dark, or `#E2E8F0` on light), and an elevated shadow (`0 12px 32px -4px rgba(15, 23, 42, 0.16)`).

## Shapes

The design system enforces a disciplined, technical radius profile (Level 1 / Soft):

- **Micro and Standard Elements (Buttons, Inputs, Badges, Tabs):** `0.25rem` (4px). Keeps interfaces compact, geometric, and aligned with industrial tool paradigms.
- **Containers and Cards:** `0.5rem` (8px). Softens larger data modules while preserving architectural rigor.
- **Modals and Action Drawers:** `0.75rem` (12px). Provides clean framing for primary interactive dialogs without feeling playful or casual.
- **Pill Shapes:** Strictly prohibited for functional buttons or data cells. Utilized sparingly and solely for micro status indicators (e.g., online/offline network beacons).

## Components

### Buttons & Interactive Controls
- **Primary Commitment Button:** Background `#2563EB`, text `#FFFFFF`, border-radius 4px. Active state transitions to `#1D4ED8`. Minimum height of 44px on POS touch interfaces; 36px in administrative desktop tables.
- **Tender Confirmation Action:** Background `#059669`, text `#FFFFFF`. Large visual footprint spanning 100% of the active receipt panel width.
- **Destructive/Void Actions:** Ghost or outline treatment with `#EF4444` text and `#FEE2E2` border. Fills to solid `#EF4444` with `#FFFFFF` text only upon confirmation state.
- **Quick-Key Matrix Tiles:** Neutral cards (`#FFFFFF`) with 1px `#E2E8F0` borders, displaying product name in `headline-sm` and price in `numeric-table`. Pressed state produces an immediate 1px inset outline in `#2563EB`.

### Data Inputs & Search Bars
- **Barcode & SKU Input:** Fixed 44px height, high-contrast `#FFFFFF` fill, 1px `#CBD5E1` border, 4px corner radius. Focused state applies a sharp 1px `#2563EB` border with a 2px `#DBEAFE` ambient outer ring. Integrated left icon for scanner detection state.
- **Quantity Adjusters:** Stepper groups tightly bound with inline decrement (`-`), value display, and increment (`+`) blocks, sharing unified borders with zero outer gaps.

### Receipt Tape & Ledger Lists
- **Item Rows:** Structured horizontally with description, barcode sub-text, quantity pill, unit price, and extended subtotal. Alternating rows remain white with 1px border-bottom (`#F1F5F9`).
- **Active Selection State:** Highlighted with `#EFF6FF` background and a 3px vertical accent border in `#2563EB` on the leading left edge.
- **Voided Line Items:** Displayed with 50% opacity, strikethrough text across description and price, accompanied by a subtle `#EF4444` label indicating reason code.

### Checkboxes, Radios, and Toggles
- **Checkboxes:** 18x18px squares with 3px border radius. Unchecked: `#FFFFFF` fill with 1.5px `#94A3B8` border. Checked: `#2563EB` fill with a sharp white checkmark.
- **Radio Buttons:** 18x18px circles. Selected state features a solid `#2563EB` ring with a 6px central white dot.

### Badges & Status Chips
- **Low Stock / Warning:** `#FEF3C7` background, `#B45309` text, 1px `#FDE68A` border.
- **Fiscal Success / Paid:** `#D1FAE5` background, `#047857` text, 1px `#A7F3D0` border.
- **Critical / Out of Stock / Void:** `#FEE2E2` background, `#B91C1C` text, 1px `#FECACA` border.
- **Informational / Neutral:** `#F1F5F9` background, `#334155` text, 1px `#E2E8F0` border.

### Numerics & Total Summaries Block
- Dedicated summary panel positioned at the bottom of the transaction lane.
- Subtotal, Tax, and Discounts render in `body-md` muted slate (`#64748B`), with monetary values right-aligned in tabular `label-lg` (`#0F172A`).
- The grand total renders in `numeric-total` using `#0F172A` (or `#059669` once fully tendered), creating immediate visual dominance.