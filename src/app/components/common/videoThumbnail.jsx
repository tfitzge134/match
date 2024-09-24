import { useState } from "react";
import Image from "next/image";

const VideoThumbnail = ({ videoId }) => {
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div
      id="video-container"
      className="relative h-[240px] lg:h-[580px] w-full inline-block cursor-pointer"
    >
      {showVideo ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          width="100%"
          height="100%"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <Image
          id="play-button"
          src="/videoThumbnail.png"
          alt="Play"
          fill={true}
          onClick={() => setShowVideo(true)}
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
};

export default VideoThumbnail;
