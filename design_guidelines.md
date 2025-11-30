# Kerala Startup Fest 2026 - Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from modern startup event websites (TechCrunch Disrupt, Web Summit, Y Combinator events) combined with youth-focused energy. The design emphasizes bold typography, dynamic layouts, and clear calls-to-action to inspire participation.

## Typography System

**Primary Font**: Inter (Google Fonts) - Modern, clean, excellent readability
**Accent Font**: Space Grotesk (Google Fonts) - Bold, distinctive for headings

**Hierarchy**:
- Hero Headlines: 4xl-6xl, bold, Space Grotesk
- Section Headings: 3xl-4xl, bold, Space Grotesk  
- Subsections: xl-2xl, semibold, Inter
- Body Text: base-lg, normal, Inter
- Buttons/CTAs: base-lg, semibold, Inter
- Metadata (dates, tags): sm-base, medium, Inter

## Layout System

**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-16 to py-24 (mobile: py-12)
- Component gaps: gap-8 to gap-12
- Container max-width: max-w-7xl
- Content max-width: max-w-4xl for text-heavy sections

**Grid Strategy**:
- Hero: Full-width with centered content
- Features/Why Different: 3-column grid (lg), 2-col (md), 1-col (mobile)
- Sessions: 4-column grid for session cards
- Contests: 2-column layout with detailed cards
- Testimonials/Organizers: 2-column split

## Component Library

**Navigation**:
- Fixed header with logo left, 6 nav items center, "Register Now" button right
- Mobile: Hamburger menu with slide-in overlay
- Sticky on scroll with subtle backdrop blur

**Buttons**:
- Primary CTA: Large, rounded-lg, px-8 py-4, prominent
- Secondary: Outlined variant, same size
- Ghost: Text-only with hover underline
- All buttons: Consistent hover lift effect (scale-105 transition)

**Hero Section**:
- Full-width with gradient overlay
- Large hero image of Calicut Beach/startup energy
- Centered content: Headline, subheading, key info line with emoji icons
- Dual CTA buttons (Register + Download Brochure)
- Height: 85vh on desktop, natural height on mobile

**Cards**:
- Session Cards: Rounded-xl, p-6, with tagline and description
- Contest Cards: Rounded-lg, p-8, detailed with icon/emoji
- Organizer Cards: Split layout with logo area and text
- All cards: Subtle shadow, hover lift effect

**Info Sections**:
- Alternating layouts for visual variety
- Text-focused sections: Centered, max-w-3xl
- Feature grids: Equal-height cards with icons
- Statistics/Metrics: Large numbers, bold, with descriptive text below

**Forms**:
- Registration: Multi-step if needed, clear validation
- Contact: 2-column (form left, info right)
- Input fields: Rounded-lg, p-4, clear labels, focus states

**Footer**:
- Rich footer with 4 columns: About, Quick Links, Contact, Social
- Newsletter signup included
- Event details reiterated
- Organizer logos displayed

## Images

**Hero Image**: 
- Wide panoramic shot of Calicut Beach sunset OR energetic startup crowd/youth collaboration
- Overlay: Dark gradient (top-to-bottom) for text readability
- Position: Full-width background, center-focused

**Section Images**:
- About page: Photo of Caliph Life School campus or Kerala Economic Forum event
- Sessions page: Abstract illustrations or photos representing each theme (entrepreneurship, teamwork, pitching)
- Participate page: Diverse group of students collaborating, energetic atmosphere
- Use throughout to break up text and add energy

**Icons**: Heroicons for UI elements, emoji for quick visual markers (📅, 👥, etc.)

## Page-Specific Layouts

**Home**: 
7 sections: Hero → What is KSF → Why Different (3-col grid) → Sessions Preview (4-col) → Big Goal → Who Can Join (3 blocks) → Organizers → Footer CTA

**About**: 
5 sections: Header → The Idea → Why We Started → What We Believe (bullets) → Goal → Organizers (2-col)

**Sessions & Contests**: 
2 main parts: Expert Sessions (8 cards in grid) → Contests (7 detailed cards, 2-col layout)

**Participate**: 
Registration-focused: Who Can Join → Why Join (benefits grid) → How to Register (step-by-step) → Registration Form

**Partners**: 
Logo wall grid (4-col desktop, responsive) with partner tier sections (Platinum, Gold, Silver)

**Contact**: 
2-column split: Contact form (left, 60%) + Info block (right, 40%) with address, phone, email, map embed

## Key Principles

- **Action-Oriented**: Every page drives toward registration
- **Youth Energy**: Bold, dynamic, optimistic—never corporate or stuffy
- **Clarity First**: Information-dense but organized, scannable
- **Mobile Excellence**: Responsive design with mobile-first considerations
- **Trust Signals**: Organizer credibility, testimonials, past success metrics prominently displayed
- **Accessibility**: High contrast text, clear focus states, semantic HTML structure