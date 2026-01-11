# AGENTS.md

Guidelines for AI coding agents working in this repository.

## Project Overview

This is a Next.js 16 personal trainer landing page built with React 19, TypeScript, and Tailwind CSS 4. It uses the App Router, shadcn/ui components (new-york style), and Radix UI primitives.

## Build/Lint/Test Commands

Package manager: **pnpm**

| Command | Script | Description |
|---------|--------|-------------|
| `pnpm dev` | `next dev` | Start development server with hot reload |
| `pnpm build` | `next build` | Create production build |
| `pnpm start` | `next start` | Start production server |
| `pnpm lint` | `eslint .` | Run ESLint with Next.js defaults |

### Testing

No testing framework is currently configured. There are no test files in the codebase.

### Important Build Notes

- `typescript.ignoreBuildErrors: true` is set in `next.config.mjs` - TypeScript errors will NOT fail builds
- `images.unoptimized: true` - Next.js image optimization is disabled
- Always run `pnpm lint` before committing to catch issues

## Code Style Guidelines

### File Naming

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `header.tsx`, `theme-provider.tsx` |
| UI components | kebab-case | `button.tsx`, `card.tsx` |
| Utilities | kebab-case | `utils.ts` |
| Pages/Layouts | lowercase | `page.tsx`, `layout.tsx` |

### Component Naming

- React components: **PascalCase** (`Header`, `ThemeProvider`, `CardContent`)
- Functions: **camelCase** (`handleSubmit`, `cn`)
- Variables: **camelCase** (`mobileMenuOpen`, `navLinks`)
- Constants (arrays/objects): **camelCase** (`navLinks`, `services`)
- CSS variables: **kebab-case** with `--` prefix (`--primary`, `--background`)

### Import Order

Organize imports in this order:

1. Type-only imports (`import type React from "react"`)
2. React/Next.js core (`import { useState } from "react"`, `import Link from "next/link"`)
3. External packages (`import { Menu, X } from "lucide-react"`)
4. Internal components using `@/` alias (`import { Button } from "@/components/ui/button"`)
5. Relative imports (`import "./globals.css"`)

```typescript
// Example
import type React from "react"
import type { Metadata } from "next"
import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
```

### Path Aliases

Use the `@/` alias for imports (maps to project root):
- `@/components/*` - React components
- `@/components/ui/*` - shadcn/ui primitives
- `@/lib/*` - Utility functions
- `@/hooks/*` - Custom hooks (if added)

### TypeScript

- Strict mode is enabled
- Use `type` keyword for type-only imports: `import type React from "react"`
- Use `React.ComponentProps<'element'>` for extending HTML element props
- Use `VariantProps<typeof cvaFunction>` for component variant types
- Wrap layout children props with `Readonly<{}>`: `Readonly<{ children: React.ReactNode }>`

### Formatting

- **Indentation**: 2 spaces
- **Quotes**: Double quotes (`"`) for strings/JSX in app code; single quotes (`'`) in UI components
- **Semicolons**: None (semicolon-free style)
- **Trailing commas**: Yes, in multiline arrays/objects

### React/Next.js Patterns

- **App Router**: All pages in `app/` directory
- **Server Components**: Default (no directive needed)
- **Client Components**: Mark with `"use client"` directive at file top
- **Component exports**: Named exports for components (`export function Header()`)
- **Page exports**: Default exports for `page.tsx` and `layout.tsx`
- **Props pattern**: Destructure with spread: `({ className, ...props })`
- **Polymorphism**: Use `asChild` prop with Radix `Slot` for composition

```typescript
// Client component example
"use client"

import { useState } from "react"

export function InteractiveComponent() {
  const [state, setState] = useState(false)
  // ...
}

// Server component (default)
export function StaticComponent() {
  // ...
}
```

### Styling

- **Tailwind CSS 4** with PostCSS
- **CSS Variables**: Defined in `app/globals.css` using `oklch()` color space
- **Dark mode**: Uses `.dark` class variant
- **Class merging**: Always use `cn()` utility from `@/lib/utils`
- **Responsive**: Use `md:` and `lg:` prefixes

```typescript
import { cn } from "@/lib/utils"

// Correct usage
<div className={cn("base-class", conditional && "conditional-class", className)} />
```

### UI Components (shadcn/ui)

- Style: **new-york**
- Located in `components/ui/`
- Use CVA (class-variance-authority) for variants
- Support `asChild` prop for composition
- Add `data-slot` attribute for styling hooks

## Project Structure

```
app/                    # Next.js App Router
  globals.css          # Global styles, Tailwind imports, CSS variables
  layout.tsx           # Root layout
  page.tsx             # Home page

components/            # React components
  ui/                  # shadcn/ui primitives (button, card, input, etc.)
  header.tsx           # Site header/navigation
  hero.tsx             # Hero section
  about.tsx            # About section
  services.tsx         # Services section
  testimonials.tsx     # Testimonials section
  contact.tsx          # Contact form
  footer.tsx           # Site footer
  theme-provider.tsx   # Theme context

lib/                   # Utilities
  utils.ts             # cn() helper

public/                # Static assets (images, icons)
```

## Key Dependencies

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library (new-york style)
- **Radix UI** - Accessible primitives
- **Lucide React** - Icons
- **React Hook Form + Zod** - Form handling and validation
- **next-themes** - Theme switching
- **class-variance-authority** - Component variants

## Error Handling

- Use try/catch for async operations
- Validate form inputs with Zod schemas
- Provide user feedback for form submissions
- Handle loading and error states in client components
