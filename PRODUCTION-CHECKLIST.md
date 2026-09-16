# Production checklist

- [ ] Confirm the real restaurant-owner Google email.
- [ ] In Firestore, create `admins/<OWNER_UID>` with `{ role: "admin" }` (or `admins/<owner@email>`). This is a one-time setup; the owner never needs to use Firestore afterwards.
- [ ] Replace `OWNER_EMAIL_REQUIRED` in `storage.rules` with that same confirmed Google email before deploying Storage rules.
- [ ] Enable Google sign-in in the Firebase project and authorize the production domain.
- [ ] Deploy Firestore and Storage security rules.
- [ ] Test `/manage` with authorized and unauthorized Google accounts.
- [ ] Test a price edit, sold-out toggle, promotion, ticker edit, hours edit and photo upload.
- [ ] Test public site in PT/EN, mobile/desktop, cart and `Send Order`.

The application package intentionally contains no QUANTUM/agent-core folders or AI Studio caches.
