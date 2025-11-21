# React Professional Template

A complete and professional React + Vite + TypeScript template following industry best practices.

## 🚀 Features

This template includes:

- ⚡ **[Vite](https://vitejs.dev/)** - Ultra-fast build tool
- ⚛️ **[React 19](https://react.dev/)** - JavaScript library for building user interfaces
- 🔷 **[TypeScript](https://www.typescriptlang.org/)** - Static typing for JavaScript
- 🎨 **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- 🧭 **[React Router DOM](https://reactrouter.com/)** - Client-side routing
- 📏 **[ESLint](https://eslint.org/)** - Linter to identify and fix problems
- 🎭 **[Prettier](https://prettier.io/)** - Opinionated code formatter
- 🐶 **[Husky](https://typicode.github.io/husky/)** - Modern Git hooks
- 📝 **[Commitlint](https://commitlint.js.org/)** - Commit message validation
- 🚨 **[Lint-staged](https://github.com/okonet/lint-staged)** - Linting on staged files
- ♿ **[ESLint Plugin JSX A11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)** -
  Accessibility checking

## 📦 Useful Dependencies

This template includes some useful dependencies for development:

- **class-variance-authority** - Component variant management
- **clsx** - Utility for constructing conditional className strings
- **tailwind-merge** - Smart Tailwind class merging

## 🛠️ Installation

```bash
# Clone the template
git clone <your-repository>

# Install dependencies (recommended: pnpm)
pnpm install

# Setup Husky
pnpm prepare
```

## 📜 Available Scripts

Available commands for development and production:

```bash
# Development
pnpm dev                # Start development server

# Build
pnpm build             # Build for production
pnpm preview           # Preview production build

# Code Quality
pnpm lint              # Run ESLint
pnpm lint:fix          # Fix ESLint issues automatically
pnpm format            # Format code with Prettier
pnpm format:check      # Check formatting without modifying
pnpm type-check        # Check TypeScript types
pnpm validate          # Run type-check, lint, and format:check

# Cleanup
pnpm clean             # Remove build directories and cache

# Git Hooks
pnpm pre-commit        # Run lint-staged (automatic on commit)
```

## 🔧 Configuration

### ESLint

ESLint is configured with:

- TypeScript recommended rules
- React and React Hooks specific rules
- Prettier integration
- Accessibility checking (jsx-a11y)
- Automatic React version detection

File: `eslint.config.js`

### Prettier

Prettier is configured with:

- Automatic import sorting
- Tailwind CSS integration (organizes classes)
- Consistent formatting settings

File: `.prettierrc`

### Commitlint

Commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/)
standard:

```txt
<type>: <description>

[optional body]

[optional footer]
```

**Allowed types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or modifying tests
- `build`: Build system or dependencies changes
- `ci`: CI/CD changes
- `chore`: Other changes (maintenance, etc)
- `revert`: Reverting changes

**Examples:**

```bash
feat: add login page
fix: correct form validation
docs: update README with instructions
```

File: `commitlint.config.mjs`

---

### Lint-staged

Runs automatically before each commit:

- ESLint with auto-fix on JS/TS files
- Prettier on all relevant files

File: `.lintstagedrc.mjs`

### Husky

Configured Git hooks:

- **pre-commit**: Run lint-staged
- **commit-msg**: Validate commit message with commitlint

Directory: `.husky/`

### EditorConfig

Consistent editor settings for the entire team.

File: `.editorconfig`

### React Router DOM

This template includes React Router DOM v7 for client-side routing with:

- **File-based route configuration** in `/src/routes/index.tsx`
- **Layouts** - Root layout with navigation and footer
- **Example pages** - Home, About, and 404 Not Found
- **Type-safe routing** with TypeScript
- **Error boundaries** for graceful error handling

**Route Structure:**

```txt
/               → Home Page
/about          → About Page
/*              → 404 Not Found Page
```

**Adding New Routes:**

1. Create a new page component in `/src/pages/`
2. Add the route to `/src/routes/index.tsx`
3. Add navigation link in `/src/layouts/root-layout.tsx` (optional)

**Example:**

```tsx
// src/routes/index.tsx
import { ContactPage } from '@/pages/contact';

// src/pages/contact.tsx
export function ContactPage() {
  return <div>Contact Us</div>;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      // ... other routes
      {
        path: 'contact',
        element: <ContactPage />,
      },
    ],
  },
]);
```

## 🎨 Recommended Structure

```txt
src/
├── components/       # Reusable components
│   ├── ui/          # UI components (buttons, inputs, etc)
│   └── forms/       # Form components
├── pages/           # Page components (route pages)
├── layouts/         # Layout components (with navigation, footer)
├── routes/          # Router configuration
├── features/        # Feature-based modules
├── hooks/           # Custom React hooks
├── utils/           # Utility functions
├── types/           # TypeScript type definitions
├── styles/          # Global styles
├── lib/             # Third-party library configs
├── constants/       # App constants
├── App.tsx          # Root component with RouterProvider
└── main.tsx         # Application entry point
```

## 🚀 Getting Started

Follow these steps to start using the template:

1. **Clone the template**
2. **Install dependencies**: `pnpm install`
3. **Setup Husky**: `pnpm prepare`
4. **Start development**: `pnpm dev`
5. **Make commits following the standard**: `git commit -m "feat: your message"`

## 📚 Additional Resources

Useful documentation links:

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Router Documentation](https://reactrouter.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Contributing

Contributions are welcome! Follow these steps:

1. Fork the project
2. Create a branch for your feature (`git checkout -b feat/new-feature`)
3. Commit your changes following the standard (`git commit -m 'feat: add new feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Open a Pull Request

## 📝 License

This project is under the MIT license.

---

Developed with ❤️ for the React community
