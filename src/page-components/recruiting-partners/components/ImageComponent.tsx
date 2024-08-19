import {
  boxStyle,
  wrapperDisplayStyle,
} from "@/page-components/costcalculator/utils/provider";
import { Box } from "@mui/material";
import Image from "next/image";
import heroSectionBg from "$/images/partners/recruitng_partner_three.svg";
import { BetterCommissionSvg, FasterProcessingSvg } from "$/svg";

export function ImageBackgroundAndImageBox({ index }: { index: number }) {
  return (
    <Box
      sx={boxStyle}
      bgcolor={index === 0 ? "rgba(53, 126, 234, 1)" : "rgba(171, 123, 0, 1)"}
    >
      {index === 0 ? <BetterCommissionSvg /> : <FasterProcessingSvg />}
    </Box>
  );
}

function ImageComponent() {
  return (
    <Box
      position={{
        xl: "absolute",
        lg: "absolute",
        md: "absolute",
        sm: "relative",
        xs: "relative",
      }}
      sx={{ top: "-80px", right: "0", zIndex: "-100" }}
      display={wrapperDisplayStyle}
    >
      <Box position="relative">
        <Box
          position="relative"
          // height="26.25rem"
          height={{
            xl: "538px",
            lg: "538px",
            md: "462px",
            sm: "350px",
            xs: "290px",
          }}
          // width="29.625rem"
          width={{
            xl: "765px",
            lg: "765px",
            md: "700px",
            sm: "395px",
            xs: "340px",
          }}
          borderRadius={10}
          overflow="hidden"
        >
          <Image
            src={heroSectionBg}
            alt="img-Homepage"
            layout="fill"
            objectFit="cover"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ImageComponent;
