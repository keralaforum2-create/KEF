# Kerala Startup Fest 2026 - Project Documentation

## Overview
Kerala Startup Fest 2026 is a two-day mega startup festival website (January 7-8, 2026, Calicut Beach) connecting students, young adults, mentors, and investors. The platform provides event information, facilitates participant registration, and handles contact form submissions for various stakeholders. It's a modern single-page application with a Node.js/Express backend and React frontend, aiming for a clean, youth-focused design. Key capabilities include event registration with QR code-based payment, contact forms, and an admin dashboard for managing submissions.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Framework**: React 18+ with TypeScript, Vite.
- **Routing**: Wouter.
- **UI Component System**: Shadcn UI (on Radix UI) with Tailwind CSS ("New York" style variant).
- **State Management**: TanStack Query for server state; local component state for UI.
- **Form Handling**: React Hook Form with Zod for validation.
- **Design System**: Inter (body), Space Grotesk (headings), Tailwind CSS for styling, mobile-first responsive design.
- **Pages**: Home, About, Sessions & Contests, Participate, Partners, Contact, Admin.

### Backend
- **Framework**: Express.js with Node.js and TypeScript.
- **API Design**: RESTful API for contact and registration submissions/retrieval.
- **Validation**: Server-side Zod validation.
- **Storage Abstraction**: `IStorage` interface for flexible storage (in-memory for dev, PostgreSQL for production).
- **Build Process**: esbuild for server, Vite for client.

### Data Storage
- **Current**: In-memory storage (development).
- **Production**: PostgreSQL via Neon Database serverless driver with Drizzle ORM.
- **Schema**: Defined in `shared/schema.ts` for Contact Submissions and Registrations (id, name, email, phone, userType, message; fullName, email, phone, age, participantType, institution, interests).

### Authentication and Authorization
- **Current State**: Open-access; no authentication.
- **Future Considerations**: Admin authentication for viewing submissions, potentially using `express-session`.

### Admin Dashboard
- **Features**: Displays total registrations/contact messages, participation breakdown, tabbed interface for viewing/deleting registrations and contact messages.
- **Access**: `/admin` route and footer link.

### Payment System
- **Method**: QR code-based payment with mandatory screenshot upload for verification.
- **Tiers**: Business Quiz Only (₹99), Normal Ticket (₹199), Premium Ticket (₹599).
- **Process**: User selects ticket, QR code displayed, user scans/pays, uploads screenshot, registration submitted.
- **Validation**: Frontend file upload validation, backend rejection without screenshot.

### Email Notifications
- **Service**: Resend API (`RESEND_API_KEY` required).
- **Functionality**:
    1. Ticket email to registrant with details.
    2. Admin notification for all registrations (`keralastartupfest@gmail.com`).
    3. Special "Pitch Start Idea" email for contest registrations to admin.
- **Templates**: HTML, mobile-responsive, branded.

## External Dependencies

### Third-Party UI Libraries
- **Radix UI**: Accessible UI primitives.
- **Shadcn UI**: Styled component library built on Radix UI.
- **Lucide React**: Icon library.

### Database and ORM
- **@neondatabase/serverless**: Serverless PostgreSQL driver.
- **Drizzle ORM**: TypeScript-first ORM.
- **drizzle-zod**: Bridge for Drizzle schemas and Zod validation.

### Form and Validation
- **React Hook Form**: Performance-focused form library.
- **Zod**: TypeScript-first schema validation.
- **@hookform/resolvers**: Integration for React Hook Form with Zod.

### Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **class-variance-authority**: Type-safe component variants.
- **clsx & tailwind-merge**: Class name utilities.

### Build and Development Tools
- **Vite**: Frontend build tool.
- **esbuild**: Server-side bundler.
- **TypeScript**: Static type checking.
- **TSX**: TypeScript execution environment.

### Runtime Dependencies
- **Express**: Node.js web server.
- **Wouter**: React routing library.
- **@tanstack/react-query**: Data synchronization and caching.
- **date-fns**: Date utility library.
- **nanoid**: Unique ID generator.

### Email Service
- **Resend**: Transactional email API.

### Fonts
- **Google Fonts**: Inter, Space Grotesk.