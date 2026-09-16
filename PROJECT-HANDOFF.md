# Project Handoff — Best Kebab & Pizza

## Overview
Production-oriented microsite for **Best Kebab & Pizza**, Rua de São Roque da Lameira 2346, Campanhã, Porto, Portugal.

## Canonical public domain
- **https://bestpizzaandkebab.pt/**

## Business data currently configured
- **Name:** Best Kebab & Pizza
- **Address:** Rua de São Roque da Lameira 2346, 4350-306 Porto, Portugal
- **Phone:** +351 920 163 613
- **Public languages:** Portuguese (PT-PT) and English
- **Delivery links:** Bolt Food and Uber Eats
- **Menu source:** `src/lib/restaurant.ts`

## Customer ordering flow
- Products are added to the website order tray.
- The final customer-facing CTA is **Enviar Pedido / Send Order**.
- WhatsApp is used behind that final action to transport the pre-filled order to the restaurant.
- The public copy states that the restaurant must confirm the order.
- A sold-out product cannot be newly added; if it becomes unavailable while already in the tray, sending is blocked until it is removed.
- The separate public "order at counter" flow has been removed.

## Owner management
Private route: **`/manage`**.

The owner interface is in English and supports:
- promotions and scheduled flash promotions;
- menu names/descriptions and prices;
- sold-out / available state;
- dish photos;
- opening hours;
- delivery/contact links;
- promotional ticker messages;
- online-order pause;
- recent change history.

Authentication uses Firebase Google Sign-In and must remain fail-closed until the real owner account is provisioned.

## One-time production setup
See `PRODUCTION-CHECKLIST.md`.

## Main application paths
- Public route: `src/routes/index.tsx`
- Owner route: `src/routes/manage.tsx`
- Root/providers: `src/routes/__root.tsx`
- Restaurant/menu data: `src/lib/restaurant.ts`
- Dynamic managed data: `src/lib/restaurant-context.tsx`
- Owner authentication: `src/lib/owner-auth.tsx`
- Cart/order state: `src/lib/cart-store.ts`
- Firestore rules: `firestore.rules`
- Storage rules: `storage.rules`

## Local commands
- `npm run dev`
- `npm run build`
- `npm run typecheck`

This repository is deliberately separated from QUANTUM/agent repositories.
