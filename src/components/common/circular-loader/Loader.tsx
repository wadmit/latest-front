import { Box, CircularProgressProps, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { ILoader } from "@/components/common/circular-loader/utils/types";

function Loader({ buttonState, center = false, ...rest }: ILoader) {
  if (center)
    return (
      <Stack direction="row" justifyContent="center" width="100%">
        <CircularProgress
          thickness={buttonState ? 6 : 4}
          {...rest}
          size={buttonState ? 25 : 35}
        />
      </Stack>
    );
  return (
    <CircularProgress
      thickness={buttonState ? 6 : 4}
      {...rest}
      size={buttonState ? 25 : 35}
    />
  );
}

export default Loader;
