type YoutubeEmbedProps = {
  videoId?: string;
  title: string;
  fallback: string;
};

const VIDEO_ID_PATTERN = /^[\w-]{11}$/;

export const YoutubeEmbed = ({
  videoId,
  title,
  fallback,
}: YoutubeEmbedProps) => {
  if (!videoId || !VIDEO_ID_PATTERN.test(videoId)) {
    return (
      <div className="flex-center aspect-video rounded-lg border border-dashed border-border bg-secondary p-6 text-center">
        <p className="typo-body text-muted">{fallback}</p>
      </div>
    );
  }

  return (
    <div className="aspect-video overflow-hidden rounded-lg border border-border">
      <iframe
        className="size-full"
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
