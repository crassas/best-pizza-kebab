# Analytics — Best Pizza & Kebab

The site keeps its local `app_analytics` event bus and can optionally persist anonymous traffic and conversion events to PostHog.

## Enable remote analytics

Configure these production variables in the deployment environment:

- `VITE_POSTHOG_KEY` — PostHog project key
- `VITE_POSTHOG_HOST` — ingestion host; for an EU project use `https://eu.i.posthog.com`

If `VITE_POSTHOG_KEY` is empty, remote analytics stay disabled and the site continues to work normally.

## Events

- `$pageview` — page load
- `menu_view`
- `add_to_cart`
- `cart_open`
- `order_send_whatsapp`
- `phone_click`
- `directions_click`
- `bolt_food_click`
- `uber_eats_click`
- `language_change`

No customer name, email, phone number, WhatsApp message body, or order contents are sent by this layer.

## Exclude owner / test devices

Open the production site once on each device used for testing with:

`https://bestpizzaandkebab.pt/?analytics=exclude`

The site stores the exclusion locally and immediately cleans the query parameter from the address bar. Future visits from that browser are not sent to PostHog.

To restore tracking on that browser:

`https://bestpizzaandkebab.pt/?analytics=include`

This exclusion is per browser/device.
