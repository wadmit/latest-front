"use client";
import { useMediaQuery } from "@mui/material";
import { motion } from "framer-motion";
import { cursorVariants } from "@/page-components/students/utils/provider";

export default function CursorBlinker() {
  const isMobile = useMediaQuery("(max-width:830px)");
  return (
    <motion.div
      variants={cursorVariants}
      animate="blinking"
      style={{
        display: "inline-block",
        height: isMobile ? "32px" : "48px", // h-5 in Tailwind CSS is equivalent to 1.25rem
        width: "3px", // w-[1px] in Tailwind CSS sets width to 1px
        transform: "translateY(0.25rem)", // translate-y-1 in Tailwind CSS translates Y by 0.25rem
        backgroundColor: "rgba(170, 68, 1, 1)", // bg-slate-900 in Tailwind CSS sets background color
      }}
    />
  );
}
