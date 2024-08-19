import React from "react";
import { Box, Skeleton } from "@mui/material";

function BlogBodyCardSkeleton() {
  return (
    <Box>
      <Skeleton height="250px" />
      <Skeleton height={40} />
      <Skeleton />
      <Box mt={2}>
        <Skeleton />
      </Box>
    </Box>
  );
}

export default BlogBodyCardSkeleton;
