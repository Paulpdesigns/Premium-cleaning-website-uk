# Cleaning Template Website Template

A premium static website template for household and commercial cleaning businesses. It is built with HTML5, CSS3 and vanilla JavaScript, so it can deploy directly to GitHub Pages, Netlify or any static host.

## Pages

- `index.html` - homepage with hero, services, service selector, quote estimator, portfolio preview, stats, process, testimonials, service areas, FAQ and conversion CTA.
- `services.html` - expanded service overview.
- `about.html` - company story, mission and values.
- `portfolio.html` - filterable before/after case studies with reusable comparison sliders and lightbox.
- `contact.html` - contact details and frontend-only contact form.

## Customization

Most business data lives in `js/config.js`:

- Business name, tagline, phone, WhatsApp, email, address and hours.
- Announcement text.
- Brand colors.
- Social URLs.
- Service areas.
- Services.
- Quote pricing.
- Testimonials.
- Statistics.
- Portfolio projects and image URLs.

Change CSS variables or the values in `SITE_CONFIG.business` to rebrand the entire template.

## Quote Calculator

Quote pricing is configured in `js/config.js` under `pricing`.

The estimator uses:

- Property base price.
- Size adjustment.
- Cleaning type adjustment.
- Frequency multiplier.
- Configurable estimate range percentage.

The quote app is frontend-only. The final request button shows a static success state and is ready to connect to Netlify Forms, Formspree, EmailJS, FormSubmit or a custom backend.

## WhatsApp And Call Buttons

Update these in `js/config.js`:

- `business.whatsapp`
- `business.phone`
- `business.phoneDisplay`

The floating WhatsApp widget, mobile contact bar and call links all read from this config.

## Portfolio

Edit `SITE_CONFIG.portfolio` in `js/config.js` to add or replace projects. Each item supports:

- `title`
- `category`
- `service`
- `location`
- `description`
- `before`
- `after`

Categories used by the filter buttons are:

- `residential`
- `commercial`
- `deep`
- `move`
- `construction`

## Images

Images are currently loaded from Unsplash direct image URLs with transformation parameters for practical static deployment. Replace them with local files in `assets/images/` if preferred, then update `js/config.js` and page image paths.

Source/license note: Unsplash images are free to use under the Unsplash License. Review the current Unsplash terms before client deployment and replace with the client’s actual project photography wherever possible.

## Forms

The contact form and quote flow include validation and success states but do not submit to a backend.

Connection options:

- Netlify Forms: add `name`, `method="POST"` and `data-netlify="true"` to the form.
- Formspree: set the form `action` to your Formspree endpoint and `method="POST"`.
- EmailJS: call EmailJS from the submit handler in `js/main.js`.
- FormSubmit: set the form `action` to the generated FormSubmit URL.
- Custom backend: replace the static success logic with a `fetch()` request.

Do not place API keys or secret credentials in frontend JavaScript.

## Deployment

### GitHub Pages

1. Push the `cleaning-template` folder contents to a GitHub repository.
2. In repository settings, enable Pages from the main branch.
3. Set the custom domain if needed.

### Netlify

1. Drag the folder into Netlify Drop, or connect the Git repository.
2. Use no build command.
3. Set the publish directory to the folder containing `index.html`.

## Local Preview

Because this is a static site, you can open `index.html` directly in a browser. For a local server:

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Quality Checklist

Included functionality:

- Sticky responsive navigation.
- Dismissible announcement bar.
- Scroll progress.
- Mobile menu.
- Smart quote estimator with validation.
- Service selector.
- Before/after sliders.
- Portfolio filters.
- Portfolio lightbox with Escape close.
- Testimonials carousel with touch support.
- FAQ accordion.
- Animated counters.
- Scroll reveal animations.
- Floating WhatsApp and call buttons.
- Mobile contact bar.
- Lightweight scripted chatbot on the homepage.
- Frontend contact-form validation.
- Reduced-motion support.
- Local business JSON-LD injection.
