import React, { forwardRef } from "react";
import type { TVideoProps } from "@/page-components/home/utils/types";

const VideoComponent = forwardRef<HTMLVideoElement, TVideoProps>(
  ({ videoUrl, isPlaying, thumbnail, ref }) => (
    <video
      // poster={thumbnail}
      ref={ref}
      controls={false}
      width="100%"
      autoPlay={isPlaying}
      height="100%"
      style={{
        objectFit: "cover",
        borderRadius: "8px",
      }}
    >
      <track kind="captions" />
      <source src={videoUrl} type="video/mp4" />
    </video>
  ),
);

VideoComponent.displayName = "VideoComponent";

export default VideoComponent;
