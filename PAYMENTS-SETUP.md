# AACT $100 deposits on Netlify

Checkout is disabled by default. The existing inquiry form remains available until ALL required runtime settings exist and PAYMENTS_ENABLED=true. No secrets belong in this repository. New /deposit checkout uses Square's embedded card fields, Cloudflare Turnstile, private Netlify Blobs records, server-enforced USD 100 amount, atomic one-token-per-booking locking, Square idempotency, and signed webhook recovery. Refunds and booking approvals remain manual. No public admin, customer-list, or refund endpoint exists.

## Configure privately

In Netlify project configuration → Environment variables, add these with Functions scope (mark secrets as containing secret values). Use separate values for sandbox and production. Keep production credentials out of deploy previews, and keep PAYMENTS_ENABLED false in previews. Redeploy after changes.

| Variable | Value |
| --- | --- |
| PAYMENTS_ENABLED | false initially; true after tests |
| PAYMENTS_ORIGIN | Exact HTTPS origin, no trailing slash; https://allaroundchitown.com for production |
| SQUARE_ENVIRONMENT | sandbox initially; production when ready |
| SQUARE_APPLICATION_ID | Square application's ID for that environment (public) |
| SQUARE_LOCATION_ID | Square location ID for that environment (public) |
| SQUARE_ACCESS_TOKEN | Square secret access token for that environment, Functions scope only |
| TURNSTILE_SITE_KEY | Managed Turnstile widget site key (public) |
| TURNSTILE_SECRET_KEY | Turnstile secret, Functions scope only |
| SQUARE_WEBHOOK_SIGNATURE_KEY | Webhook subscription signing secret, Functions scope only |

Create the application at https://developer.squareup.com/apps. Create a managed Turnstile widget at https://dash.cloudflare.com/ with ONLY your checkout hostname allowed. The server validates action=booking and the exact hostname. Never use Turnstile test credentials in production.

In Square Developer Console → application → Webhooks, create a subscription for payment.created and payment.updated. Notification URL MUST equal PAYMENTS_ORIGIN + /api/square-webhook exactly. Copy its signature key privately into Netlify. Use API version 2026-07-15, matching server calls.

Netlify must build from this repository using npm run build, publish dist, functions netlify/functions (netlify.toml configures these). The build excludes server code, docs, tests, and dependencies from public static assets. @netlify/blobs is installed by Netlify from package.json. Local dependency installation was unavailable in this environment; verify the dependency install and function bundles in Netlify before enabling. Netlify automatically provides Blobs credentials; do not add a personal Netlify token to the code.

## Before live payments

1. Enable Square/Netlify two-step verification yourself; restrict collaborators and use a password manager. This cannot be enabled by website code.
2. In sandbox on your exact configured HTTPS origin, temporarily enable payments; complete a Square test-card payment. Verify amount USD 100, pending approval wording, event/contact details in Square payment note and booking record in Netlify Blobs.
3. Test declines, an expired Turnstile token, double click, refresh during payment, and network interruption after capture. One checkout must never charge twice. Refresh returns to status, never creates another charge. Ambiguous attempts require owner review; the customer is intentionally blocked from submitting another card for the same checkout. In Square, check transaction status before clearing a customer's saved request or directing them to start a new one.
4. In Square webhook subscription logs, verify signature validation and successful redelivery. In Netlify deploy logs verify native rate-limit rules applied to intent/payment/status functions. Rate enforcement is eventually applied and is an additional layer, not an absolute fraud guarantee.
5. Check checkout CSP in browser console, mobile card fields, and authentication challenges. No analytics or advertising scripts load on checkout. CSP must be adjusted if Square requires further authentication provider origins; do not broadly allow arbitrary scripts.
6. Issue a sandbox refund in Square and verify status shows refunded. No automated refunds are implemented. For a declined booking, refund the full $100 to its original transaction, then notify the customer separately. For approval, notify them separately and apply $100 against the agreed total.
7. Switch ALL Square values and webhook subscription to production, confirm hostname, deploy with payments disabled, then enable and redeploy once ready. Do not use real cards for sandbox tests.

## Operations and limitations

Full validated booking records and overlay design fields live in private site-scoped Netlify Blobs (aact-bookings-production or aact-bookings-sandbox); payment cards/CVV never do. Square payment note includes name, phone, date, city, package and add-ons; buyer email is attached to payment. Existing email inquiry flow and overlay PNG attachments are retained for unpaid inquiries. Paid flow stores overlay design fields instead of emailing a PNG. There is no custom owner inbox or automatic approval/denial email. Review new transactions in Square and enable available Square owner payment notifications. Customer sees a confirmation with request reference; this integration does not promise a separate automated email receipt.

No public endpoint reads personal booking details. Customer status access requires an unguessable booking ID and secret, sent in POST bodies. The browser keeps that reference in sessionStorage to survive refresh; it intentionally cannot start a second checkout in the same tab without owner review. Closing the tab can lose this reference: consult Square before paying again. Different tabs/devices can still submit separate deposits; review same-event duplicates manually. Do not log request bodies or payment tokens.

Delete abandoned booking records (createdAt older than your chosen retention period, after reconciling payment records); retain paid records only as needed for business obligations. Payment status updates are recovered from verified Square webhooks. Owners must monitor webhook failures, unmatched transactions, and refunds in Square. If storage fails after capture, confirmation may be delayed: do not ask the client to pay again.

To stop taking deposits set PAYMENTS_ENABLED=false and redeploy. Existing Square refunds remain available. Keep webhook credentials configured for reconciliation. Never expose secrets through VITE_, NEXT_PUBLIC_, client scripts, logs, or screenshots.
