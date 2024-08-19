import { GreenUpArrow } from "$/svg";
import { Box, Divider, Stack, Typography } from "@mui/material";

function CurrentRevCard({
  newRev,
  baseValue,
  percent,
}: {
  newRev: number;
  baseValue: number;
  percent: number;
}) {
  return (
    <Box
      display="flex"
      mt="15px"
      bgcolor="rgba(245, 242, 212, 1)"
      px={3}
      py={5}
      borderRadius="8px"
    >
      <Box display="flex" flexDirection="column" sx={{ pr: 2 }}>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontSize="16px"
          color="rgba(32, 28, 26, 0.9)"
        >
          Current Revenue
        </Typography>
        <Typography
          fontFamily="HankenGroteskExtraBold"
          fontSize="28px"
          lineHeight="36.4px"
          letterSpacing="-3%"
          color="rgba(32, 28, 26, 1)"
        >
          $ {baseValue}
        </Typography>
      </Box>

      <Divider orientation="vertical" flexItem />

      <Box sx={{ pl: 2 }}>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontSize="16px"
          color="rgba(32, 28, 26, 0.9)"
        >
          Revenue with WiseAdmit
        </Typography>
        <Stack direction="row" alignItems="center" columnGap={0.5}>
          <Typography
            fontFamily="HankenGroteskExtraBold"
            fontSize="28px"
            lineHeight="36.4px"
            letterSpacing="-3%"
            color="rgba(32, 28, 26, 1)"
          >
            $ {newRev}
          </Typography>
          <GreenUpArrow />
          <Typography
            fontFamily="HankenGroteskRegular"
            fontSize="14px"
            lineHeight="18.2px"
            color="rgba(26, 77, 46, 1)"
            // whiteSpace="nowrap"
          >
            + {percent}%
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}

export default CurrentRevCard;
