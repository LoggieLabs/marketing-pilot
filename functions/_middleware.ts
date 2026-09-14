/**
 * Per-route link-preview metadata.
 *
 * This site is a client-rendered SPA, so every route is served the same
 * index.html. Setting document.title or meta tags from React fixes the browser
 * tab and nothing else: Slack, LinkedIn, iMessage, Discord and X fetch the raw
 * HTML and never execute JavaScript. Without this middleware, sharing
 * loggielabs.com/for-work previews as the homepage — which defeats the point of
 * having a page aimed at people arriving from LinkedIn.
 *
 * So the HTML is rewritten on the way out, at the edge, per route.
 *
 * RULES FOR ADDING A ROUTE
 *   1. Every description must be true of the page it describes. This file is
 *      customer-facing copy and `pnpm check:claims` does not read it — so it is
 *      the one place on the site where a claim can drift unchecked. Keep it
 *      boring and keep it accurate.
 *   2. Never drop the beta/unaudited qualifier from a description. A preview
 *      card is often the only thing someone reads.
 *   3. Leave og:image alone unless a route gets its own card. A wrong image is
 *      worse than a generic one.
 */

interface RouteMeta {
  title: string;
  description: string;
}

const SUFFIX = "Public beta on Ethereum's Sepolia test network, not independently audited.";

const ROUTES: Record<string, RouteMeta> = {
  '/for-work': {
    title: 'Loggie for work — bring a record instead of reconstructing one',
    description:
      'Contractors, consultants, attorneys, researchers, photographers and inspectors, receiving or ' +
      `creating a durable personal record instead of rebuilding one after the fact. ${SUFFIX}`,
  },
  '/status': {
    title: 'Loggie status — what works, what does not, and every defect we know about',
    description:
      'What is shipped, what is narrower than it sounds, what is missing, and the full contract ' +
      `defect register. Nothing here is rounded in our favour. ${SUFFIX}`,
  },
  '/privacy': {
    title: 'Loggie privacy — what we collect, and what we cannot see',
    description:
      'What this website collects, what the app does not, and what stays unreadable to us even ' +
      `when we hold it. ${SUFFIX}`,
  },
  '/terms': {
    title: 'Loggie terms',
    description: `What Loggie is, what it is not, and what we are not promising. ${SUFFIX}`,
  },
};

/** Escape for an HTML attribute value. */
function attr(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

class TitleRewriter {
  constructor(private readonly title: string) {}
  element(el: Element) {
    el.setInnerContent(this.title);
  }
}

class MetaRewriter {
  constructor(private readonly meta: RouteMeta) {}
  element(el: Element) {
    const property = el.getAttribute('property') ?? el.getAttribute('name');
    if (!property) return;
    if (property === 'og:title' || property === 'twitter:title' || property === 'title') {
      el.setAttribute('content', attr(this.meta.title));
    } else if (
      property === 'og:description' ||
      property === 'twitter:description' ||
      property === 'description'
    ) {
      el.setAttribute('content', attr(this.meta.description));
    }
  }
}

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();

  const url = new URL(context.request.url);
  const meta = ROUTES[url.pathname.replace(/\/+$/, '') || '/'];

  // Only touch HTML documents we have metadata for; everything else passes
  // through untouched, including assets and the intake endpoint.
  if (!meta || !(response.headers.get('content-type') ?? '').includes('text/html')) {
    return response;
  }

  return new HTMLRewriter()
    .on('title', new TitleRewriter(meta.title))
    .on('meta', new MetaRewriter(meta))
    .transform(response);
};
