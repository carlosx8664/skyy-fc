// src/components/YoutubeEmbed.tsx
import React from 'react';
import { getEmbedUrl } from '../lib/youtube';

interface Props {
  url: string;
  title?: string;
}

export const YoutubeEmbed = ({ url, title = 'YouTube video' }: Props) => {
  const embedUrl = getEmbedUrl(url);
  if (!embedUrl) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-sm" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={embedUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    </div>
  );
};
