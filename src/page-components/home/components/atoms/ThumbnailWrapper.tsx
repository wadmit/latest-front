import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Pause, PlayArrowOutlined } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import { ThumbnailBoxWrapper } from "@/page-components/home/styled-components";
import type {
  IThumbnailWrapperRef,
  TThumbnailWrapperProps,
} from "@/page-components/home/utils/types";

const ThumbnailWrapper = forwardRef<
  IThumbnailWrapperRef,
  TThumbnailWrapperProps
>((props, ref) => {
  const { thumbnail, videoUrl, name, course, isPlaying, onPlay } = props;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlay, setIsPlay] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useImperativeHandle(ref, () => ({
    pause: () => {
      if (videoRef.current) {
        videoRef.current.pause();
        setIsPlay(false);
      }
    },
  }));

  const handlePlay = () => {
    onPlay();
    setIsPlay((prev) => !prev);
    if (videoRef.current) {
      if (isPlay) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };
  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleWaiting = () => {
    setIsLoading(true);
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <ThumbnailBoxWrapper
      maxWidth="380px"
      width={{
        lg: "auto",
        md: "320px",
        sm: "300px",
        xs: "253px",
      }}
      height={{
        lg: "450px",
        md: "480px",
        sm: "400px",
        xs: "380px",
      }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box position="relative" zIndex={1} width="100%" height="100%" sx={{}}>
        {isPlaying || videoRef.current ? (
          <video
            ref={videoRef}
            controls={false}
            autoPlay={isPlaying}
            width="100%"
            height="100%"
            style={{
              objectFit: "cover",
              borderRadius: "8px",
            }}
            onLoadedData={handleLoadedData}
            onWaiting={handleWaiting}
          >
            <track kind="captions" />
            <source
              src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${videoUrl}`}
              type="video/mp4"
            />
          </video>
        ) : (
          <Image
            // width="100%"
            // height="100%"
            // layout="fill"
            // fill
            style={{
              objectFit: "cover",
              borderRadius: "8px",
              width: "100%",
              height: "100%",
            }}
            width={10000}
            height={1}
            loading="lazy"
            src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${thumbnail}`}
            alt={`thumbnail-${name}`}
          />
        )}
        {!isPlay && (
          <Box
            sx={{
              borderRadius: "8px",
              background:
                "linear-gradient(180deg, rgba(33, 21, 12, 0) 53.99%, rgba(33, 21, 12, 0.8) 100%)",
            }}
            position={"absolute"}
            width="100%"
            height="100%"
            top={0}
            zIndex={2}
          />
        )}
        <Box
          padding="24px"
          borderRadius="0px 0px 8px 8px"
          bottom="1px"
          width="calc(100% - 50px)"
          position="absolute"
          zIndex={3}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box gap="4px" display="flex" flexDirection="column">
            <Typography
              textOverflow={{
                lg: "ellipsis",
                md: "ellipsis",
                sm: "ellipsis",
                xs: "ellipsis",
              }}
              fontSize={{ lg: "18px", md: "16px", sm: "14px", xs: "14px" }}
              color="rgba(255, 255, 255, 1)"
              component="h4"
              fontWeight={800}
              lineHeight="23.4px"
            >
              {!isPlay && name}
            </Typography>
            <Typography
              textOverflow={{
                lg: "ellipsis",
                md: "ellipsis",
                sm: "ellipsis",
                xs: "ellipsis",
              }}
              // noWrap
              // height="20px"
              // width={{ lg: '80%', md: '80%', sm: '50%', xs: '50%' }}
              fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "12px" }}
              color="rgba(255, 255, 255, .85)"
              lineHeight="18.2px"
              component="h5"
            >
              {!isPlay && (isMobile ? `${course.slice(0, 20)}...` : course)}
            </Typography>
          </Box>

          {isLoading && (
            <Box
              position="absolute"
              top="50%"
              left="50%"
              sx={{
                transform: "translate(-50%, -50%)",
              }}
              zIndex="10"
            >
              <CircularProgress />
            </Box>
          )}

          <Box
            onClick={handlePlay}
            sx={{
              cursor: "pointer",
            }}
            height="40px"
            width="40px"
            display={isPlay ? (isHover ? "flex" : "none") : "flex"}
            justifyContent="center"
            alignItems="center"
            borderRadius="8px"
            border="1px solid rgba(255, 255, 255, 1)"
            color="rgba(255, 255, 255, 1)"
            ml="24px"
          >
            {isPlay ? (
              <Pause fontSize="large" />
            ) : (
              <PlayArrowOutlined fontSize="large" />
            )}
          </Box>
        </Box>
      </Box>
    </ThumbnailBoxWrapper>
  );
});

export default ThumbnailWrapper;
