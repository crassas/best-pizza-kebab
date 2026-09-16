/**
 * Authorized restaurant-owner accounts.
 * Keep this list empty until the real owner email has been confirmed.
 * Never ship a developer/test email as an authorized owner.
 */
export const AUTHORIZED_OWNER_EMAILS: string[] = [];

export function isAuthorizedOwner(email?: string | null): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  return AUTHORIZED_OWNER_EMAILS.some((adminEmail) => adminEmail.toLowerCase() === normalized);
}
