# Ganesh Dry Cleaner Frontend

A modern Angular frontend for a local dry cleaning and garment care business. The application provides a customer-facing website for browsing services, submitting pickup/contact requests, and an admin dashboard for managing service settings, pickup requests, and customer messages.

## Overview

This project is the frontend for a business web application focused on garment care services. It includes:

- A landing page with promotional content and a rotating hero section
- About and service catalog pages
- Pickup and contact request forms
- Admin authentication and dashboard access
- Integration with a backend API for dynamic settings and business data

The app is built with Angular 17 and Angular Material, and it uses a REST API hosted at Render.

## Live/Runtime Configuration

The frontend is configured to connect to the backend API defined in:

- `src/environments/environment.ts`

Current API base URL:

```ts
export const environment = {
  apiUrl: 'https://business-web-application.onrender.com/api'
};
```

If your backend URL changes, update this file before running or building the application.

## Features

### Customer-facing website
- Home page with hero carousel and local business information
- About page describing the service philosophy
- Services catalog for garment care offerings
- Pickup request form for collection arrangements
- Contact form for general customer inquiries
- Business contact, WhatsApp, maps, and social profile links

### Admin panel
- Protected admin route using JWT-based authentication
- Login page for administrators
- Dashboard for viewing:
  - pickup requests
  - customer messages
  - service settings
  - business profile information
- Ability to modify business configuration and service details via API

### Technical capabilities
- Angular standalone components
- Angular routing
- Angular Material UI components
- Reactive forms
- HTTP service abstraction for backend API calls
- JWT auth token handling in session storage
- Environment-based API configuration

## Tech Stack

- Angular 17
- TypeScript
- Angular Material
- RxJS
- SCSS
- HTML
- REST API integration

## Project Structure

```text
business-web-application-frontend/
├── src/
│   ├── app/
│   │   ├── pages/
│   │   │   ├── about.component.ts
│   │   │   ├── admin.component.ts
│   │   │   ├── home.component.ts
│   │   │   ├── login.component.ts
│   │   │   ├── request.component.ts
│   │   │   └── services.component.ts
│   │   ├── api.service.ts
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   ├── app.routes.ts
│   │   ├── auth.ts
│   │   ├── models.ts
│   │   └── ...
│   ├── assets/
│   │   ├── img1.png
│   │   ├── img2.png
│   │   ├── logo_img.png
│   │   └── shop-tour.mp4
│   ├── environments/
│   │   └── environment.ts
│   ├── index.html
│   ├── main.ts
│   └── styles.scss
├── angular.json
├── netlify.toml
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── .gitignore
└── README.md
```

## Prerequisites

Before running this project make sure you have:

- Node.js (LTS version recommended)
- npm
- Angular CLI (optional, but useful for local development)

You can install Angular CLI globally with:

```bash
npm install -g @angular/cli
```

## Installation

Clone the repository:

```bash
git clone https://github.com/SakshiBageriya/business-web-application-frontend.git
cd business-web-application-frontend
```

Install dependencies:

```bash
npm install
```

## Running the App

Start the Angular development server:

```bash
npm start
```

This runs:

```bash
ng serve
```

Then open the app in your browser at:

```text
http://localhost:4200
```

## Building for Production

```bash
npm run build
```

This creates a production build in the `dist/` directory, ready for deployment.

## Deployment

This project includes a `netlify.toml` file for deployment on Netlify.

Example configuration:

```toml
[build]
  publish = "dist/ganesh-dry-cleaning/browser"
  command = "npm run build"
```

You can deploy to Netlify or any Angular-compatible hosting platform by publishing the generated `dist` output.

## API Integration

The frontend depends on a backend API for business data. The app uses methods such as:

- `GET /settings`
- `GET /services`
- `POST /pickup`
- `POST /contact`
- admin authentication flows

The exact API contract may vary depending on the backend implementation.

## Admin Access

The app includes a protected admin area:

- Route: `/admin`
- Login route: `/admin/login`

The admin authentication logic is handled in:

- `src/app/auth.ts`

The app reads and stores a JWT token in `sessionStorage`.

## Notes

- Some content is local-business specific, such as the Ganesh Drycleaner branding, location, and contact details.
- The frontend is designed to work with a backend API, so without the backend service some dynamic features may not function correctly.
- If the business details or API endpoint changes, update the values in `src/app/models.ts` and `src/environments/environment.ts` accordingly.

## License

This project does not currently declare a license in the repository.

## Contributing

Contributions are welcome. If you want to improve the project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the build locally
5. Submit a pull request

## Contact

Project repository:

- https://github.com/SakshiBageriya/business-web-application-frontend

## Summary

This repository is the frontend for a dry-cleaning service business website, built with Angular and Angular Material. It includes customer-facing pages, pickup/contact forms, and a protected admin dashboard, and it is configured to work with a backend API hosted on Render.

If you want, I can also generate a more polished, production-style README with badges, screenshots placeholders, and a cleaner project description tailored for GitHub publishing.
