"use client";
import { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import type { IRedoAnimTextProps } from "@/page-components/students/utils/types";

export default function RedoAnimText({ delay }: IRedoAnimTextProps) {
  const textIndex = useMotionValue(0);
  const [showText, setShowText] = useState(true);

  const texts = ["China.", "S.Korea.", "Globally."];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest),
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    animate(count, 60, {
      type: "tween",
      delay,
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 0.4,
      onUpdate(latest) {
        if (textIndex.get() === 2) {
          setShowText(false);
        } else {
          setShowText(true);
        }
        if (updatedThisRound.get() === true && latest > 0) {
          updatedThisRound.set(false);
        } else if (updatedThisRound.get() === false && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          updatedThisRound.set(true);
        }
      },
    });
  }, []);
  return (
    <>
      {showText && <span>in </span>}
      <motion.span
        style={{
          color: "rgba(170, 68, 1, 1)",
          borderBottom: "6px dotted rgba(170, 68, 1, 1)",
        }}
      >
        {displayText}
      </motion.span>
    </>
  );
}
