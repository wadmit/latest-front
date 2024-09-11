"use client";

import { theme } from "@/common/muicustomtheme/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";
import "react-phone-input-2/lib/material.css";
import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div
          style={{
            zIndex: 9999999,
          }}
        >
          <ProgressBar
            height="4px"
            color="#FF6B26"
            options={{ showSpinner: false }}
            shallowRouting
          />
          {children}
        </div>
      </ThemeProvider>
    </>
  );
};

export default Template;
