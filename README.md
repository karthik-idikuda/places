# LeadFinder Pro

A full-stack lead generation and management platform built with Next.js and Firebase. LeadFinder Pro enables businesses to discover, track, and manage sales leads with integrated Razorpay payment processing for credits-based access to premium lead data.

---

## Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [License](#license)

---

## Overview

LeadFinder Pro provides:

- **Lead discovery engine** for finding potential business contacts
- **Credit-based access system** with Razorpay payment integration
- **Firebase backend** with Firestore for real-time data synchronization
- **Authentication** via Firebase Auth
- **Server-side rendering** with Next.js for SEO optimization
- **Responsive UI** with Tailwind CSS

---

## Architecture

```
+---------------------------------------+
|         Next.js Frontend              |
|  SSR Pages | API Routes | Auth        |
+---------------------------------------+
         |              |
         v              v
+----------------+ +-------------------+
| Firebase Auth  | | Firestore DB      |
| User sessions  | | Leads, credits,   |
|                | | user profiles     |
+----------------+ +-------------------+
                        |
                        v
+---------------------------------------+
|         Razorpay Integration          |
|  Credit purchase | Payment webhooks   |
+---------------------------------------+
```

---

## Technology Stack

| Component        | Technology                    |
|------------------|-------------------------------|
| Framework        | Next.js                       |
| Language         | TypeScript                    |
| Styling          | Tailwind CSS                  |
| Database         | Firebase Firestore            |
| Authentication   | Firebase Auth                 |
| Payments         | Razorpay                      |
| Hosting          | Firebase Hosting              |

---

## Project Structure

```
places/
|
|-- lead-finder/
|   |-- package.json             # Dependencies
|   |-- next.config.js           # Next.js configuration
|   |-- tailwind.config.js       # Tailwind CSS configuration
|   |-- tsconfig.json            # TypeScript configuration
|   |-- firebase.json            # Firebase hosting config
|   |-- firestore.rules          # Firestore security rules
|   |-- firestore.indexes.json   # Firestore indexes
|   |-- .firebaserc              # Firebase project config
|   |-- add-credits.js           # Credit addition utility
|   |
|   |-- src/                     # Source code
|   |-- public/                  # Static assets
|   +-- scripts/                 # Utility scripts
|
+-- leadfnrdpro/                 # Pro version module
```

---

## Installation

```bash
cd lead-finder

npm install

# Configure environment
cp .env.local.example .env.local
# Add Firebase and Razorpay credentials
```

---

## Usage

```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

---

## Deployment

```bash
# Deploy to Firebase Hosting
firebase deploy
```

---

## License

This project is released for educational and research purposes.
