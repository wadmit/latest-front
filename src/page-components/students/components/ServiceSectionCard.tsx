import { Box, Stack, Typography } from "@mui/material";

function ServiceSectionCard({
  title,
  icon,
}: {
  title: string | React.ReactElement;
  icon: React.ReactElement;
}) {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Stack
        direction="column"
        alignItems={{
          lg: "flex-start",
          md: "flex-start",
          sm: "center",
          xs: "center",
        }}
        minHeight="5.25rem"
        columnGap="1.5rem"
      >
        {icon}
        <Typography
          component={"h5"}
          fontFamily="HankenGroteskRegular"
          fontSize={{ lg: "16px", md: "16px", sm: "16px", xs: "14px" }}
          lineHeight={{
            lg: "20.8px",
            md: "20.8px",
            sm: "20.8px",
            xs: "18.2px",
          }}
          color="rgba(47, 47, 47, 1)"
        >
          {title}
        </Typography>
      </Stack>
    </Box>
  );
}

export default ServiceSectionCard;
