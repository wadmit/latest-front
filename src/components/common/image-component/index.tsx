"use client";
import { useState } from "react";
import Image from "next/image";
import fallbackURL from "$/images/partners/wiseadmit_logo_large.png";
import { ImageComponentProps } from "@/types/other";

const circularAnimation =
  () => `<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#AAA">
    <g fill="none" fill-rule="evenodd" strokeWidth="2">
        <circle cx="22" cy="22" r="1">
            <animate attributeName="r"
                begin="0s" dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
                begin="0s" dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite" />
        </circle>
        <circle cx="22" cy="22" r="1">
            <animate attributeName="r"
                begin="-0.9s" dur="1.8s"
                values="1; 20"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.165, 0.84, 0.44, 1"
                repeatCount="indefinite" />
            <animate attributeName="stroke-opacity"
                begin="-0.9s" dur="1.8s"
                values="1; 0"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.3, 0.61, 0.355, 1"
                repeatCount="indefinite" />
        </circle>
    </g>
</svg>`;
const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export default function ImageComponent({
  src,
  fallbackSrc,
  ...rest
}: ImageComponentProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      {...rest}
      onLoad={(event) => {
        const target = event.target as HTMLImageElement;
        if (target.naturalWidth === 0) {
          // Broken image
          setImgSrc(fallbackSrc!);
        }
      }}
      onError={() => {
        setImgSrc(fallbackSrc!);
      }}
      placeholder="blur"
      blurDataURL={`data:image/svg+xml;base64,${toBase64(circularAnimation())}`}
    />
  );
}

ImageComponent.defaultProps = {
  fallbackSrc: fallbackURL,
};
