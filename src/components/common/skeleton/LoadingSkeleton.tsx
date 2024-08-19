import { Skeleton, Stack } from "@mui/material";

export function DocumentLoadingSkeleton() {
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      flexWrap="wrap"
      width="100%"
      rowGap={10}
      justifyContent="space-between"
      alignItems="center"
    >
      {[1, 2, 3].map((i) => (
        // <Grid key={i} xs={12} sm={3}>
        <Stack spacing={1} direction="column" minWidth="18.75rem" key={i}>
          <Skeleton
            variant="rectangular"
            height={20}
            sx={{ maxWidth: "80%" }}
          />
          <Skeleton variant="rectangular" height={200} />
        </Stack>
        // </Grid>
      ))}
    </Stack>
  );
}

export function TableLoadingSkeleton() {
  return (
    <Stack
      direction={{ md: "row", xs: "column" }}
      flexWrap="wrap"
      width="100%"
      rowGap={10}
      justifyContent="space-between"
      alignItems="center"
    >
      {[1].map((i) => (
        <Stack spacing={4} direction="column" width="100%">
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rectangular" height={100} />
          <Skeleton variant="rectangular" height={100} />
        </Stack>
        // </Grid>
      ))}
    </Stack>
  );
}
