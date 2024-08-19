import React from "react";

const TextToClickableLinks = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = text.split(urlRegex);
  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "rgba(255, 107, 38, 1)",
            textDecoration: "underline",
          }}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export default TextToClickableLinks;
