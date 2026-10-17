A slow website loses visitors before they read a word, and Google uses page experience signals, including Core Web Vitals, in its ranking systems. For React apps the problems are predictable: too much JavaScript, a blank page while it downloads, and layouts that jump around as content arrives.

This guide explains the three Core Web Vitals in plain language and the fixes that move them most in a React, Next.js or Vite project.

## The three metrics

Google measures Core Web Vitals from real Chrome users and judges a page by its 75th percentile, meaning 75% of visits need to hit the target:

- **Largest Contentful Paint (LCP):** how long until the biggest thing in the viewport (usually a hero image or headline) is visible. Good is **2.5 seconds or less**.
- **Interaction to Next Paint (INP):** how quickly the page responds visually when someone taps, clicks or types, measured across the whole visit. Good is **200 milliseconds or less**. INP replaced First Input Delay (FID) as a Core Web Vital in March 2024.
- **Cumulative Layout Shift (CLS):** how much visible content moves unexpectedly while the page is in use. Good is **0.1 or less**.

Lab tools like Lighthouse are great for debugging, but the scores that count come from real users. Check them in PageSpeed Insights (the "Discover what your real users are experiencing" section) or the Core Web Vitals report in Google Search Console.

## Fixing LCP: get the main content on screen sooner

### Render HTML on the server or at build time

A client-only React app sends an almost empty HTML page, then downloads and runs JavaScript before anything appears. On a mid-range phone on a mobile network, that alone can blow the LCP budget.

Server-side rendering or static prerendering sends real HTML that the browser can paint immediately, and React then hydrates it to make it interactive. Next.js does this out of the box. With Vite, you can prerender routes at build time using `renderToString` from `react-dom/server`. This portfolio works that way: every page is plain HTML before any JavaScript runs. Prerendering is also better for SEO, because crawlers see the full content without having to execute scripts.

### Prioritise the LCP image

If your largest element is an image, the browser needs to discover it and download it early:

```html
<img src="/hero.webp" alt="..." width="1200" height="800" fetchpriority="high" />
```

- Add `fetchpriority="high"` to the LCP image, and never `loading="lazy"`. Lazy-loading is for images below the fold.
- If the image is only referenced from CSS or JavaScript, the browser finds it late. Add `<link rel="preload" as="image" href="...">` in the `<head>`.
- Serve modern formats (WebP or AVIF) at the size they are displayed, with `srcset` for different screen widths. A 4000-pixel photo shown at 600 pixels wastes most of its download.

### Don't hide the hero behind an animation

A fade-in that starts at `opacity: 0` and takes a second can push LCP back by that second. Keep entrance animations on the main headline and hero image short, or animate only `transform` so the content is already visible.

### Fix fonts

Self-host your fonts instead of loading them from a third-party domain, use `font-display: swap` so text shows immediately in a fallback font, subset them to the characters you use, and preload the one or two font files needed above the fold.

## Fixing INP: keep the main thread free

INP is about responsiveness. When a user taps a button, the browser has to run your event handler, run React's re-render and then paint. If the main thread is busy with something else, such as a big JavaScript bundle still executing or a heavy re-render, the tap feels laggy.

- **Ship less JavaScript.** Split code by route with dynamic `import()` or `React.lazy`, so each page loads only what it needs. Check your bundle with a visualizer and replace heavy libraries (date libraries, icon packs, chart libraries) with lighter ones or targeted imports.
- **Keep event handlers light.** Update the UI first, and move non-urgent work like analytics and saving drafts out of the way.
- **Use React's concurrent features.** Wrap expensive, non-urgent state updates in `startTransition`, or use `useDeferredValue`, so typing into a search box stays responsive while the filtered list re-renders.
- **Avoid unnecessary re-renders.** Keep state close to where it is used, split large contexts, and memoize expensive components with `memo` where profiling shows a real benefit.
- **Virtualize long lists.** Rendering 5,000 rows creates 5,000 sets of DOM nodes. Libraries like TanStack Virtual render only what is on screen.
- **Audit third-party scripts.** Chat widgets, tag managers and analytics often cost more main-thread time than your own code. Load them late, or not at all.

## Fixing CLS: reserve space for everything

Layout shift happens when something appears or changes size and pushes other content around. The usual causes and fixes:

- **Images and videos without dimensions.** Always set `width` and `height` attributes (or CSS `aspect-ratio`) so the browser reserves the space before the file loads.
- **Content injected above existing content.** Banners, cookie notices and ads that push the page down. Reserve their space, or overlay them instead.
- **Web fonts swapping in.** A fallback font with different metrics reflows the text when the real font arrives. Preload key fonts and pick a fallback with similar metrics; the CSS `size-adjust` descriptor can match them closely.
- **Animations that change layout.** Animate `transform` and `opacity` instead of `top`, `height` or `margin`. Transforms don't move other elements, so they don't count as layout shift, and they are cheaper for the browser to render.

## Make performance part of the workflow

Performance tends to regress quietly, one dependency and one image at a time. A few habits keep it in check:

- Run Lighthouse on mobile settings before each release, and investigate any drop.
- Set a budget, for example a maximum JavaScript bundle size, and fail the build if it is exceeded.
- Watch real-user data in Search Console or with the `web-vitals` library, because your laptop on fast Wi-Fi is not your users' phone.
- Test on a real mid-range Android phone. It is the fastest way to feel what most users feel.

## A quick checklist

- Pages are server-rendered or prerendered, not blank until JavaScript loads.
- The LCP image has `fetchpriority="high"`, is not lazy-loaded, and is properly sized and compressed.
- Fonts are self-hosted, subset, preloaded and use `font-display: swap`.
- JavaScript is split by route, and heavy dependencies are justified.
- Expensive updates use transitions, and long lists are virtualized.
- Every image and embed has reserved dimensions.
- Animations use `transform` and `opacity`.
- Real-user Core Web Vitals are monitored.

Fast sites rank better, convert better and feel better to use. If your React app is slow and you would like help finding out why, [get in touch](/#contact).
