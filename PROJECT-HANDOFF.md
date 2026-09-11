# Project Handoff — Best Kebab & Pizza

## Overview
A high-performance, responsive neighbourhood takeaway microsite for **Best Kebab & Pizza**, located at Rua de São Roque da Lameira 2346, Campanhã, Porto, Portugal.

## Business Facts & Verified Data
- **Name:** Best Kebab & Pizza
- **Address:** Rua de São Roque da Lameira 2346, 4350-307 Porto, Portugal
- **Phone:** +351 920 163 613
- **WhatsApp:** 351920163613
- **Opening Hours:** 
  - Saturday–Thursday: 11:00–00:00 (Kitchen/Orders until closing)
  - Friday: 15:30–00:00
- **Rating:** 4.9 / 5 (149 verified Google reviews)
- **Delivery Platforms:** Bolt Food, Uber Eats (external links)

## Architecture & Tech Stack
- **Framework:** TanStack Start / React 19 / Vite
- **Styling:** Tailwind CSS v4
- **Language Support:** Bilingual (Portuguese PT & English EN) via custom i18n context
- **Ordering Flow:** Direct pickup order flow via WhatsApp (`wa.me/351920163613`) with structured items, quantities, pickup time (ASAP or scheduled with opening hours check), customer name, and optional notes.
- **Price Architecture:** `SHOW_PRICES = true` (configurable in `src/lib/restaurant.ts`), client-side persistence via `localStorage` (`best-pizza-kebab:order:v1`).
- **Owner Message Language:** Operational English (`OWNER_MESSAGE_LANGUAGE = "en"`) to ensure clarity for the restaurant owner.

## Entry Points & Key Paths
- **Main App Entry:** `/src/routes/index.tsx`
- **Root Layout & Providers:** `/src/routes/__root.tsx`
- **Restaurant & Menu Data:** `/src/lib/restaurant.ts`
- **Order State Store:** `/src/lib/order-store.ts`
- **Components:** `/src/components/site/` (menu-section, order-drawer, order-bar, header, hero, location, reviews, etc.)

## Deployment & Verification
- **Dev Server:** `npm run dev` (binds to `0.0.0.0:8080`)
- **Build Script:** `npm run build`
- **Startup Script:** `/workspace/startup.sh`
