# Developer Guide

This guide provides an overview of the key technical integrations in the JoinQuran application, including PWA features, client authentication, and admin configuration.

## 1. Progressive Web App (PWA) Integration

The PWA implementation allows the application to be installed on devices and provides basic offline capabilities.

### Key Files
- **`public/manifest.json`**: Defines the app's metadata (name, icons, theme color) and behavior (standalone mode).
- **`public/sw.js`**: A Service Worker that caches essential assets (offline page, icons) to enable offline access.
- **`src/context/PWAContext.tsx`**: A React Context that:
  - Listens for the `beforeinstallprompt` event.
  - Manages the `deferredPrompt` state.
  - Provides the `handleInstallClick` function to trigger the native install prompt.
  - Registers the Service Worker (to avoid hydration errors in `layout.tsx`).
- **`src/app/layout.tsx`**:
  - Wraps the application with `<PWAProvider>`.
  - Includes the manifest link in the metadata.

### Usage
The "Install App" button is conditionally rendered in the `Navbar` and `Footer` using the `usePWA` hook. It only appears when the browser fires the `beforeinstallprompt` event (i.e., the app is installable).

## 2. Client Authentication (Signup/Login)

The client authentication system is currently client-side focused, using `localStorage` for session management.

### Flow
1.  **Signup**:
    - User enters details in `src/app/signup/page.tsx`.
    - Data is validated and sent to the backend (or stored locally for prototype).
    - On success, a `customer_token` is stored in `localStorage`.
2.  **Login**:
    - User enters credentials in `src/app/login/page.tsx`.
    - On success, `customer_token` is saved to `localStorage`.
    - User is redirected to `/dashboard`.
3.  **Session**:
    - Protected routes (like `/dashboard`) check for the existence of `customer_token`.
    - If missing, the user is redirected to `/login`.

## 3. Admin Configuration & Environment Variables

The application uses `.env.local` to store sensitive configuration and feature flags.

### Admin Login
The admin panel is secured with a simple username/password check defined in environment variables.

**Required Environment Variables (`.env.local`):**

```env
# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Abcd!234

# Contact & Socials
NEXT_PUBLIC_EMAIL="onlinequran50@gmail.com"
NEXT_PUBLIC_PHONE_UK="+442081239145"
NEXT_PUBLIC_PHONE_PK="+923244279017"
NEXT_PUBLIC_WHATSAPP="+46764305834"
NEXT_PUBLIC_FACEBOOK_URL="https://www.facebook.com/profile.php?id=100079966850856"
NEXT_PUBLIC_TEAMS_ID="joinquran1@outlook.com"

# API Keys (if applicable)
OPENAI_API_KEY="sk-..."
GOOGLE_API_KEY="AIza..."
```

> **Note:** Never commit `.env.local` to version control. Use `.env.example` for a template.
