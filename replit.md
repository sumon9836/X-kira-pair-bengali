# Overview

This is a modern WhatsApp bot management dashboard built with Next.js that provides a sleek, glassmorphism-styled interface for managing WhatsApp bot sessions. The application serves as a frontend interface for pairing WhatsApp numbers, managing active sessions, and handling user blocking/unblocking functionality. It features a beautiful dark theme with pink and blue accents inspired by modern web design trends.

**Status**: ✅ **Fully Functional** - Successfully migrated from Vercel to Replit environment with all features working perfectly.

**Recent Updates**:
- **October 26, 2025**: Fixed 409 error handling for already-connected phone numbers with improved user feedback and request deduplication
- **October 15, 2025**: Migrated from Vercel to Replit with proper configuration for the Replit environment

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Next.js 14+ with App Router architecture
- **Styling**: Custom CSS with glassmorphism design system using CSS variables
- **Component Structure**: Modular React components with TypeScript support
- **State Management**: React hooks for local state management with custom hooks for shared logic
- **Responsive Design**: Mobile-first approach with modern CSS Grid and Flexbox layouts

## Backend Integration
- **API Architecture**: RESTful API endpoints using Next.js API routes as proxy layer
- **Proxy Pattern**: All API calls are proxied through Next.js to a backend service running on Railway
- **Authentication**: Cookie-based authentication for admin features with session management
- **Error Handling**: 
  - Comprehensive error handling with user-friendly toast notifications
  - Status-aware error responses with HTTP status codes passed to frontend
  - Special handling for 409 Conflict errors (already-connected numbers)
  - Request deduplication to prevent multiple rapid submissions

## Core Features
- **Phone Number Management**: Smart country detection with international phone number validation
- **Session Management**: Real-time session monitoring with auto-refresh capabilities
- **User Blocking**: Admin-level user blocking and unblocking functionality
- **Toast Notifications**: Custom toast system for user feedback and error handling
- **Mobile Responsive**: Fully responsive design optimized for all device sizes

## Data Flow
- **Client-Server Communication**: Frontend makes requests to Next.js API routes which proxy to external backend
- **Real-time Updates**: Polling-based updates for session data with configurable intervals
- **Form Validation**: Client-side validation with comprehensive phone number parsing
- **Loading States**: Proper loading indicators and error states throughout the application

## Design System
- **Color Palette**: Deep black backgrounds with pink and blue accent colors
- **Typography**: Inter and Space Grotesk fonts for modern readability
- **Animations**: Smooth CSS transitions with cubic-bezier timing functions
- **Glass Effects**: Backdrop blur and transparency effects for modern aesthetic
- **Icon System**: Font Awesome icons for consistent visual language

# External Dependencies

## Core Dependencies
- **Next.js**: React framework for production with App Router
- **React 19**: Latest React version for component architecture
- **TypeScript**: Type safety and developer experience enhancement

## Styling & UI
- **CSS Variables**: Custom design system with extensive color and spacing tokens
- **Font Awesome**: Icon library for consistent iconography
- **Google Fonts**: Inter and Space Grotesk fonts for typography

## Backend Integration
- **Railway Backend**: External WhatsApp bot service hosted on Railway platform
- **Proxy Configuration**: Next.js API routes proxy requests to `shortline.proxy.rlwy.net:59641`
- **Cookie Authentication**: Session-based authentication for admin features

## Deployment
- **Replit Platform**: Deployed on Replit with autoscale deployment configuration
- **Environment Variables**: 
  - `BACKEND_URL`: Backend API URL (defaults to shortline.proxy.rlwy.net:59641)
  - `ADMIN_PASSWORD`: Admin login password (stored in Replit Secrets)
  - `JWT_SECRET`: Secret key for session token encryption (stored in Replit Secrets)
- **CORS Configuration**: Proper headers for cross-origin requests

## Development Tools
- **TypeScript Configuration**: Strict type checking with path aliases
- **ESLint**: Code linting and formatting standards
- **npm**: Package manager with npm scripts for dev and production