# Dua Putra Srikandi (DPS) - Company Profile Web Application

A responsive public-facing Company Profile web application engineered with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS v4 for Dua Putra Srikandi.

---

## Design System and Color Palette

### 1. Typography
- Primary Typeface: Open Sans (`font-sans`)

### 2. Color Tokens

| Category | Token Name | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| Brand | `G1` | `#0A9863` | Primary brand green, buttons, active highlights |
| | `G2` | `#06D07A` | Secondary brand green accent |
| | `G3` | `#034F04` | Deep forest brand green |
| | `background` | `#F8F4F0` | Warm stone background for cards and section backdrops |
| Dark | `dark` | `#110D31` | High-contrast dark text and headings |
| White | `white-100` | `#FFFFFF` | Card surfaces and high-contrast components |
| | `white-90` | `#F6F6F6` | Secondary light surface background |
| | `white-80` | `#ECECEC` | Soft borders and dividers |
| | `white-70` | `#E9E9E9` | Outlines and subtle borders |
| State | `red-state` | `#F94C4C` | Error alerts and destructive cues |
| | `green-state` | `#57C439` | Success indicators and featured tags |
| | `blue-state` | `#4C94F9` | Information notifications and category tags |
| | `yellow-state` | `#FFD84A` | Warning banners and highlighted attributes |

---

## Project Architecture

```
dps-compro/
├── public/
│   ├── icons/                    # SVG mask icons
│   └── favicon.ico               # Application favicon
├── src/
│   ├── app/
│   │   ├── api/                  # API routes fetching dynamic content
│   │   ├── artikel/              # News and article archive and detail views
│   │   │   └── [id]/             # Dynamic article detail page
│   │   ├── components/           # Component library testbed
│   │   ├── layanan/              # Service overview and service detail views
│   │   │   └── [id]/             # Dynamic service detail page
│   │   ├── produk/               # Product catalog and product detail views
│   │   │   └── [id]/             # Dynamic product detail page
│   │   ├── tentang/              # About Us, company history, and vision
│   │   ├── globals.css           # Design tokens, CSS variables, and layout utilities
│   │   ├── layout.tsx            # Root layout with Open Sans font and metadata
│   │   └── page.tsx              # Homepage
│   ├── components/
│   │   ├── card/                 # Display cards (ArticleCard, ProductCard, ServiceCard)
│   │   ├── common/               # Shared utilities
│   │   ├── layout/
│   │   │   ├── navbar.tsx        # Navigation header
│   │   │   └── footer.tsx        # Comprehensive footer with links and company info
│   │   ├── sections/             # Page section blocks (Hero, Features, Testimonials)
│   │   └── ui/                   # Reusable UI elements (Button, Badge, etc.)
│   ├── constants/                # Global configuration and constants
│   ├── hooks/                    # Custom React hooks
│   ├── lib/                      # Helper libraries
│   ├── services/                 # Data retrieval services
│   └── types/                    # TypeScript interfaces
├── package.json
└── tsconfig.json
```

---

## Key Pages and Features

### 1. Homepage (`/`)
- Dynamic Hero Banner with video and photography support.
- Overview of company highlights, key value propositions, and metrics.
- Curated showcases for featured products, service capabilities, and recent news.

### 2. About Us (`/tentang`)
- Detailed narrative of Dua Putra Srikandi.
- Vision, mission, corporate values, and legal standing.

### 3. Products (`/produk` and `/produk/[id]`)
- Categorized product catalog with search and filtration.
- Individual product specifications, application guidelines, and high-resolution galleries.

### 4. Services (`/layanan` and `/layanan/[id]`)
- Comprehensive overview of road marking, surfacing, and industrial contracting services.
- Detailed operational workflows and project portfolios.

### 5. Articles (`/artikel` and `/artikel/[id]`)
- Industry updates, technical guides, and company news.
- Semantic HTML rendering of rich-text content with category filtering.

---

## Getting Started

### Prerequisites
- Node.js (v18.17.0 or higher recommended)
- npm, yarn, or pnpm package manager

### Installation

1. Install project dependencies:
   ```bash
   npm install
   ```

2. Run the local development server:
   ```bash
   npm run dev
   ```

3. Open the application in your browser:
   ```
   http://localhost:3000
   ```

### Production Build and Verification

```bash
# Run linting checks
npm run lint

# Build production bundle using Turbopack
npm run build

# Start production server
npm run start
```
