# Admin Panel Design Guidelines

## Core Principles
The Admin Panel strictly follows a functional, dense, and scannable design modeled after the Preadmin POS template (`https://preadmin.dreamstechnologies.com/html/pos/index.html`).

### Tailwind CSS Implementation
As per user request, we will use **Tailwind CSS** to mimic the UI/UX and structural layout of the Preadmin template, avoiding raw Bootstrap inclusion.

## Layout Structure
1. **Top Bar**:
   - Logo
   - Global Search (`CMD+K`)
   - Quick Add Dropdown (Categories, Products, etc.)
   - Notifications Bell
   - User Profile Menu
2. **Left Sidebar**:
   - Collapsible groups matching `AGENTS.md` (Dashboard, Lead Management, Commerce, Catalogue, Website, Content, SEO, Settings, System).
   - Active state highlighting and nested sub-items.
3. **Main Content Area**:
   - Tabbed panels, data tables with filters, and KPI stat cards.
   - Breadcrumbs and page headers.

## Visual Language
- **Palette**: Strictly neutral admin colors (grays, whites, slate/blue-grays).
- **Brand Avoidance**: Do NOT use the public Plum/Gold/Emerald theme for structural or functional elements, ensuring admins never confuse the two surfaces. Brand colors are reserved only for the actual logo mark.
- **Density**: High density for data tables and forms to maximize scannability for operational use.
- **Interactions**: Fast, robust, and utilitarian (e.g., slide-overs for quick edits instead of full page navigation).
