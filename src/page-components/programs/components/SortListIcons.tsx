import { CalendarSvg, PriceSvg } from "public/svg";
import { IconWrapper } from "@/components/common/icon-wrapper/IconWrapper";
import { Stack, Typography } from "@mui/material";

function SortListIcons({
  index,
  fee,
  getConvertedCosts,
  baseCurrency,
}: {
  index: number;
  fee: number | string;
  getConvertedCosts: (
    value: number,
    base_currency: string
  ) => {
    formattedValue: string;
    amount: number;
  };
  baseCurrency: string;
}) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      columnGap={1.25}
    >
      <IconWrapper>{index === 0 ? <PriceSvg /> : <CalendarSvg />}</IconWrapper>

      <Typography variant="body1">
        {index === 0
          ? `${getConvertedCosts(+fee, baseCurrency).formattedValue}`
          : "September | February"}
      </Typography>
    </Stack>
  );
}

export default SortListIcons;
