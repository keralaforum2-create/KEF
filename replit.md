# Kerala Startup Fest 2026 - Project Documentation

## Overview

Kerala Startup Fest 2026 is a two-day mega startup festival website designed to bring together students, young adults, mentors, and investors. The event takes place January 7-8, 2026 at Calicut Beach, targeting participants from high school to age 29. The platform provides information about the festival, allows participant registration, and enables contact form submissions for various stakeholder groups (students, teachers, institutions, investors, sponsors).

The application is built as a modern single-page application with a Node.js/Express backend and React frontend, featuring a clean, youth-focused design inspired by major tech event websites like TechCrunch Disrupt and Web Summit.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript, using Vite as the build tool and development server.

**Routing**: Client-side routing implemented using Wouter, a lightweight React router. The application has seven main routes: Home, About, Sessions & Contests, Participate, Partners, Contact, and Admin.

**UI Component System**: Shadcn UI component library built on Radix UI primitives, providing accessible, customizable components with consistent styling. Components follow the "New York" style variant and use Tailwind CSS for styling.

**State Management**: TanStack Query (React Query) for server state management, handling API requests, caching, and data synchronization. No global client state management library is used; local component state suffices for UI interactions.

**Form Handling**: React Hook Form with Zod schema validation for type-safe form validation. Forms include registration and contact submissions with client-side validation before API calls.

**Design System**: 
- Typography uses Inter for body text and Space Grotesk for headings
- Tailwind CSS with custom configuration for colors, spacing, and shadows
- Consistent spacing units (4, 6, 8, 12, 16, 20, 24) throughout
- Mobile-first responsive design with breakpoints for tablet and desktop

**Pages Implemented**:
1. **Home** - Hero section with event details, festival highlights, sessions preview, and CTAs
2. **About** - Festival story, mission, why it's different, and organizers
3. **Sessions & Contests** - 8 expert sessions and 7 competitions
4. **Participate** - Who can join, benefits, registration form with full validation
5. **Partners** - Investment opportunities, sponsorship options, partnership benefits
6. **Contact** - Venue details, contact form, organizer information
7. **Admin** - Dashboard showing all registrations and contact submissions

**Rationale**: This stack provides excellent developer experience with TypeScript safety, fast build times with Vite, and a comprehensive UI component library that reduces custom CSS. Wouter was chosen over React Router for its minimal bundle size. The design prioritizes accessibility through Radix UI and maintains consistency through the Shadcn pattern.

### Backend Architecture

**Framework**: Express.js running on Node.js with TypeScript for type safety.

**Server Structure**: 
- `server/index.ts`: Main entry point setting up Express middleware and HTTP server
- `server/routes.ts`: API route handlers for contact and registration endpoints
- `server/storage.ts`: Data storage abstraction layer
- `server/static.ts`: Static file serving for production builds
- `server/vite.ts`: Development-mode Vite integration for HMR

**API Design**: RESTful API with four main endpoints:
- `POST /api/contact`: Submit contact form data
- `GET /api/contacts`: Retrieve all contact submissions
- `POST /api/register`: Submit event registration
- `GET /api/registrations`: Retrieve all registrations

**Validation**: Server-side validation using Zod schemas imported from shared schema definitions, ensuring consistency between client and server. Uses `zod-validation-error` for human-readable error messages.

**Storage Abstraction**: `IStorage` interface allows switching between in-memory storage (development) and database storage (production) without changing business logic. Currently implements `MemStorage` for in-memory storage with UUID-based IDs.

**Build Process**: Custom build script using esbuild for server bundling and Vite for client bundling. Server dependencies are either externalized or bundled based on an allowlist to optimize cold start performance.

**Rationale**: Express provides a minimal, flexible foundation. The storage abstraction enables easy database integration later. Separate development and production static serving modes optimize for developer experience (HMR) and production performance (pre-built assets). TypeScript across the stack catches errors early.

### Data Storage Solutions

**Current Implementation**: In-memory storage using JavaScript Maps, suitable for development and testing scenarios.

**Database Schema** (defined in `shared/schema.ts` using Drizzle ORM):

**Contact Submissions Table**:
- id (varchar, primary key)
- name (text, required)
- email (text, required, validated as email)
- phone (text, optional)
- userType (text, required, enum: student/teacher/institution/investor/sponsor/other)
- message (text, required, minimum 10 characters)

**Registrations Table**:
- id (varchar, primary key)
- fullName (text, required, minimum 2 characters)
- email (text, required, validated as email)
- phone (text, required, minimum 10 characters)
- age (text, required)
- participantType (text, required, enum: individual/team/institution)
- institution (text, optional)
- interests (text, optional)

**Database Configuration**: When using PostgreSQL via Neon Database serverless driver. Connection via `DATABASE_URL` environment variable. Schema migrations via Drizzle Kit. Currently using in-memory storage for reliability in development.

**Rationale**: In-memory storage is reliable for development. When ready for production with persistent data, can switch to DatabaseStorage class that uses Drizzle ORM for type-safe database queries. PostgreSQL chosen for reliability and feature completeness. Schema validation using Drizzle-Zod ensures consistency between database schema and runtime validation.

### Authentication and Authorization

**Current State**: No authentication system implemented. The application is currently open-access for public registration and contact form submissions.

**Future Considerations**: The storage layer includes user-related types (User, InsertUser) suggesting potential future admin authentication for viewing submissions. Would likely implement session-based authentication with express-session (already in dependencies).

### Admin Dashboard

**Features**:
- Displays count of total registrations and contact messages
- Shows breakdown of participation types (individual, team, institution)
- Tabbed interface showing:
  - **Registrations table**: Full name, email, phone, age, participation type, institution, interests
  - **Contact messages table**: Name, email, phone, user type, message content
- Accessible via `/admin` route
- Linked in footer for easy access

## External Dependencies

### Third-Party UI Libraries

**Radix UI**: Comprehensive collection of unstyled, accessible UI primitives (@radix-ui/react-*). Provides the foundation for all interactive components (dialogs, dropdowns, navigation, forms, etc.).

**Shadcn UI**: Component pattern library built on Radix UI, providing pre-styled, customizable components following accessibility best practices.

**Lucide React**: Icon library providing consistent, customizable SVG icons throughout the application.

### Database and ORM

**@neondatabase/serverless**: Serverless PostgreSQL driver optimized for edge and serverless environments with connection pooling (optional for production use).

**Drizzle ORM**: TypeScript-first ORM providing type-safe database queries, schema definitions, and migrations.

**drizzle-zod**: Bridge between Drizzle schemas and Zod validation, enabling consistent validation rules.

### Form and Validation

**React Hook Form**: Performance-focused form library with minimal re-renders and built-in validation.

**Zod**: TypeScript-first schema validation library for runtime type checking and validation.

**@hookform/resolvers**: Integration layer connecting React Hook Form with Zod validation schemas.

### Styling

**Tailwind CSS**: Utility-first CSS framework for rapid UI development with consistent design tokens.

**class-variance-authority**: Utility for creating type-safe component variants with Tailwind classes.

**clsx & tailwind-merge**: Utilities for conditional class name management and Tailwind class merging.

### Build and Development Tools

**Vite**: Next-generation frontend build tool providing fast HMR and optimized production builds.

**esbuild**: Fast JavaScript bundler used for server-side code bundling.

**TypeScript**: Static type checking across the entire codebase.

**TSX**: TypeScript execution environment for running server code in development.

### Runtime Dependencies

**Express**: Minimal web server framework for Node.js.

**Wouter**: Lightweight client-side routing library for React.

**@tanstack/react-query**: Powerful data synchronization and caching library for React.

**date-fns**: Modern date utility library for JavaScript.

**nanoid**: Secure, URL-friendly unique ID generator.

### Development Integrations

**@replit/vite-plugin-runtime-error-modal**: Replit-specific plugin for displaying runtime errors during development.

**@replit/vite-plugin-cartographer**: Replit integration for code mapping.

**@replit/vite-plugin-dev-banner**: Development mode banner for Replit deployments.

### Fonts

**Google Fonts**: 
- Inter: Primary sans-serif font for body text
- Space Grotesk: Accent font for headings and emphasis
- Additional fonts loaded: Architects Daughter, DM Sans, Fira Code, Geist Mono

## Features Implemented

✅ Complete 9-page website with responsive design
✅ Event registration with form validation
✅ Contact form for inquiries
✅ Admin dashboard with full CRUD functionality (view and delete entries)
✅ Mobile-responsive navigation with sheet menu
✅ Form submission feedback with toast notifications
✅ Data persistence with PostgreSQL database (Drizzle ORM)
✅ SEO-optimized with proper titles and meta descriptions
✅ Accessible UI components from Shadcn/Radix
✅ RBI-compliant policy pages (Terms, Privacy, Refund)
✅ Email notifications via Resend API

## How to Use

**For Users:**
1. Visit any page via navigation links
2. Register for the event on the Participate page
3. Submit inquiries via the Contact page
4. View event details on About and Sessions pages

**For Admins:**
1. Go to `/admin` or click "Admin" in the footer
2. View registration count and contact message count
3. Click "Registrations" tab to see all participant details (with delete option)
4. Click "Contact Messages" tab to see all inquiries with contact information (with delete option)
5. Click "Investors & Mentors" tab to manage investor/mentor applications (with delete option)
6. Click "Sponsorships" tab to manage sponsorship inquiries (with delete option)

**Rationale**: Dependencies are carefully chosen to balance functionality, bundle size, and developer experience. Radix UI provides accessible foundations, while Tailwind enables rapid styling. Drizzle ORM offers better type safety than traditional ORMs. Vite and esbuild provide exceptional build performance. The stack is modern, well-maintained, and production-ready.

## Email Notifications

The application includes email notification functionality using Resend:

**Secrets Required:**
- `RESEND_API_KEY`: API key from Resend for sending transactional emails

**Email Functionality:**
1. **Ticket Email to Registrant**: After successful registration, the participant receives their ticket with registration details and a link to view/download their full ticket
2. **Admin Notification**: All registration details are sent to keralastartupfest@gmail.com
3. **Pitch Start Idea Email**: For "The Pitch Room" contest registrations, a special email with "PITCH START IDEA" heading is sent to the admin containing all pitch-related information

**Email Templates** (defined in `server/email.ts`):
- Beautiful HTML email templates with consistent branding
- Mobile-responsive design
- Includes registration ID, participant details, and event information

**Note**: Emails are sent from `onboarding@resend.dev` (Resend's shared sending domain). To use a custom domain like `@keralastartupfest.com`, verify the domain in Resend dashboard.

## Recent Changes

### December 2024
- Added delete functionality to admin panel for all data types (registrations, contacts, investors, sponsorships)
- Updated homepage "Why is KSF Different" section text - changed "venture capitalists" to "investors"
- Added RBI-compliant policy pages: Terms and Conditions (/terms), Privacy Policy (/privacy), Refund Policy (/refund)
- Footer now includes links to all policy pages
- Migrated from in-memory storage to PostgreSQL database with Drizzle ORM

### Previous Changes
- Added email notification system using Resend API
- Sends ticket confirmation to registrants upon registration
- Sends registration details to admin email (keralastartupfest@gmail.com)
- Special "Pitch Start Idea" email for Pitch Room contest submissions
- Added complete 6-page website with Navigation and Footer components
- Implemented registration form with full validation on Participate page
- Implemented contact form with validation on Contact page
- Created Admin dashboard page to view all registrations and submissions
- Set up API routes for form submission handling
- Added Admin link to footer for easy access
