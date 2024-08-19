import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";

export function ShowPdf({ idx }: { idx: number }) {
  return (
    <Box
      width="153px"
      height="143px"
      top={0}
      boxShadow="0px 5px 20px 0px rgba(0, 0, 0, 0.15)"
      bgcolor="white"
      style={{
        zIndex: idx * 10,
        position: "absolute",
        right: `${idx * 10}px`,
        borderRadius: "8px",
      }}
    >
      <Image
        width={153}
        height={143}
        objectFit="contain"
        src="/Dashboard/pdf.png"
        alt="PDF file"
      />
    </Box>
  );
}

const DocumentBox = ({ link }: { link: string }) => {
  const idx = 0;
  const fileType = link.split(".").pop() as string;
  return fileType === "pdf" ? (
    <ShowPdf idx={idx} />
  ) : (
    <Box
      width="153px"
      height="143px"
      top={0}
      boxShadow="0px 5px 20px 0px rgba(0, 0, 0, 0.15)"
      style={{
        zIndex: idx * 10,
        position: "absolute",
        right: `${idx * 10}px`,
        borderRadius: "8px",
      }}
    >
      <Image
        objectFit="cover"
        width={153}
        height={143}
        style={{
          borderRadius: "8px",
        }}
        // objectFit="cover"
        src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${link}`}
        alt="passport"
      />
    </Box>
  );
};

export default DocumentBox;
