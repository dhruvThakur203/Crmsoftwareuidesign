# CRM Software UI Design

## Overview
This is a modern Customer Relationship Management (CRM) software UI built with React, TypeScript, and Vite. The application features a comprehensive dashboard for managing clients, cases, valuations, and user roles. It includes admin and user dashboards with role-based access control.

Originally imported from: https://www.figma.com/design/knANnoW2Greaq0lnDFKJyC/CRM-Software-UI-Design

## Project Architecture

### Tech Stack
- **Frontend Framework**: React 18.3.1
- **Build Tool**: Vite 6.3.5
- **Language**: TypeScript 5.9.3
- **Styling**: Tailwind CSS with custom theme
- **UI Components**: Radix UI primitives
- **State Management**: React hooks (useState)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Forms**: React Hook Form
- **Toast Notifications**: Sonner

### Project Structure
```
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components (buttons, cards, etc.)
│   │   ├── figma/        # Figma-specific components
│   │   ├── AdminDashboard.tsx
│   │   ├── UserDashboard.tsx
│   │   ├── ClientsTable.tsx
│   │   └── ... (other feature components)
│   ├── formsection/      # Document templates and forms
│   ├── guidelines/       # Project guidelines
│   ├── styles/           # Global styles
│   ├── App.tsx           # Main application component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Pre-compiled Tailwind CSS v4 styles
├── index.html
├── vite.config.ts        # Vite configuration
└── package.json
```

### Key Features
- User authentication with role-based access (Master Admin, RM, Field Boy, Valuation Analyst)
- Admin dashboard with user management
- Client creation and management
- Case tracking and assignment
- Document upload system
- Automated reminders
- Activity feed
- Valuation tracking
- Communication logs

## Development Setup

### Prerequisites
- Node.js (via Replit's Node.js module)
- npm (comes with Node.js)

### Installation
Dependencies are automatically installed when the project starts. The project uses:
- React and React DOM for the UI framework
- Vite for fast development and building
- Pre-compiled Tailwind CSS v4 styles (included in index.css)
- Multiple Radix UI components for accessible UI primitives

### Running the Application
The development server is configured to run on port 5000 and is accessible via the Replit webview.

**Development Server:**
```bash
npm run dev
```
- Runs on `0.0.0.0:5000`
- Hot module replacement enabled
- Accessible via Replit's web preview

**Build for Production:**
```bash
npm run build
```
- Output directory: `build/`
- Target: ESNext

## Configuration

### Vite Configuration
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 (allows external access)
- **Build Output**: `build/` directory
- **Path Aliases**: `@/` maps to `src/`

### Deployment
The project is configured for static deployment:
- **Deployment Type**: Static
- **Build Command**: `npm run build`
- **Public Directory**: `build/`

## Recent Changes (December 2, 2025)
- ✅ Configured Vite to use port 5000 and bind to 0.0.0.0 for Replit environment
- ✅ Set up development workflow for webview on port 5000
- ✅ Configured static deployment (build command and public directory)
- ✅ Added module type to package.json for ES modules
- ✅ Updated .gitignore for Node.js projects
- ✅ Verified application runs successfully with pre-compiled Tailwind CSS

## User Preferences
None recorded yet.

## Demo Credentials
The application includes demo credentials for testing different user roles:
- **Admin**: admin/admin123
- **RM**: rm1/rm123
- **Field Boy**: field1/field123
- **Valuation Analyst**: valuation1/valuation123

## Notes
- The application uses client-side routing via state management (no router library)
- All documents and forms are stored in the `src/formsection/` directory
- The UI is fully responsive and uses Tailwind's utility classes
- Components follow the shadcn/ui pattern with Radix UI primitives
- Tailwind CSS v4 styles are pre-compiled and included in `src/index.css`
