// src/lib/youtube.ts

/**
 * Extracts the YouTube video ID from any YouTube URL format:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function getYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

export function getEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
