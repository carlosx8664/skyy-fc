// functions/_middleware.js

const BOT_REGEX = /(facebookexternalhit|Twitterbot|WhatsApp|LinkedInBot|Slackbot|Discordbot|TelegramBot|Googlebot|Bingbot|Applebot|Pinterest|redditbot|embedly|quora|outbrain|vkshare|W3C_Validator)/i;

const PROJECT_ID = 'qzvxb9vu';
const DATASET = 'production';
const API_VERSION = '2024-01-01';

// Extract YouTube video ID from various URL formats
const getYouTubeId = (url) => {
  if (!url) return null;
  const shortMatch = url.match(/youtu\.be\/([^?&]+)/);
  const longMatch = url.match(/[?&]v=([^?&]+)/);
  const embedMatch = url.match(/youtube\.com\/embed\/([^?&]+)/);
  return shortMatch?.[1] ?? longMatch?.[1] ?? embedMatch?.[1] ?? null;
};

// Escape user-controlled strings for safe HTML attribute injection
const escapeHtml = (str) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export async function onRequest(context) {
  const { request, next } = context;
  const userAgent = request.headers.get('user-agent') || '';

  // Real users get the normal React app untouched
  if (!BOT_REGEX.test(userAgent)) {
    return next();
  }

  const url = new URL(request.url);
  const pathname = url.pathname;

  // Only rewrite /highlights/:slug — leave everything else alone
  const match = pathname.match(/^\/highlights\/([^\/]+)\/?$/);
  if (!match) {
    return next();
  }

  const slug = decodeURIComponent(match[1]);

  // Sanity query for this slug
  const query = `*[_type == "news" && slug.current == $slug][0]{title, "videoUrl": videoUrl, date, season}`;
  const sanityUrl =
    `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}` +
    `?query=${encodeURIComponent(query)}` +
    `&$slug=${encodeURIComponent(JSON.stringify(slug))}`;

  let doc = null;
  try {
    const res = await fetch(sanityUrl);
    if (res.ok) {
      const data = await res.json();
      doc = data.result;
    }
  } catch {
    // fall through — serve normal HTML if Sanity is unreachable
  }

  if (!doc || !doc.videoUrl) {
    return next();
  }

  const videoId = getYouTubeId(doc.videoUrl);
  if (!videoId) {
    return next();
  }

  const imageUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  const title = doc.title ? `${doc.title} | SKYY FC Highlights` : 'SKYY FC Highlights';
  const description = doc.title
    ? `Watch the full match highlights: ${doc.title}`
    : 'Watch full match highlights on SKYY FC';
  const pageUrl = url.href;

  const response = await next();

  return new HTMLRewriter()
    .on('head', {
      element(el) {
        // Remove existing generic og:image / og:title so ours take precedence
        el.append(
          `<meta property="og:type" content="video.other" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:title" content="${escapeHtml(title)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:description" content="${escapeHtml(description)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:url" content="${escapeHtml(pageUrl)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:image" content="${escapeHtml(imageUrl)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:image:secure_url" content="${escapeHtml(imageUrl)}" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:image:width" content="1280" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:image:height" content="720" />`,
          { html: true }
        );
        el.append(
          `<meta property="og:image:alt" content="${escapeHtml(doc.title || 'Match highlights')}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:card" content="summary_large_image" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
          { html: true }
        );
        el.append(
          `<meta name="twitter:image" content="${escapeHtml(imageUrl)}" />`,
          { html: true }
        );
      },
    })
    .transform(response);
}