"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import {
  DocumentUploadHeader,
  NoDocumentAvailable,
} from "@/page-components/dashboard/documents/components";
import { DocumentCard } from "@/page-components/dashboard/documents/components";
import { DocumentLoadingSkeleton } from "@/components/common/skeleton/LoadingSkeleton";
import NoDataMessage from "@/components/common/no-data-message/NoDataMessage";
import { useQuery } from "@tanstack/react-query";
import { getAllDocuments } from "@/api/web/user.action";
import { CacheConfigKey } from "@/constants";
import { IDocuments } from "@/page-components/dashboard/documents/types";

const DocumentPageComponent = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: [CacheConfigKey.USER_PROFILE_DOCUMENT_QUERY_KEY],
    queryFn: getAllDocuments,
  });

  //   useEffect(() => {
  //     if (isSuccess) {
  //       setIsLoading(false);
  //       setDocuments(data?.documents || []);
  //     }
  //   }, [data, isSuccess]);

  return (
    <Stack pt={0} mt={0}>
      <Typography variant="h4" component="h4" textAlign="center" mt="15px">
        My Documents
      </Typography>
      <DocumentUploadHeader />
      <Typography
        fontFamily="HankenGroteskRegular"
        fontWeight={400}
        fontSize={{ lg: "14px", md: "14px", sm: "14px", xs: "14px" }}
        lineHeight="19.6px"
        color="rgba(32, 28, 26, 0.55)"
        mt="18px"
      >
        ({data?.documents?.length} documents)
      </Typography>
      {/* --------------------------------------DOCUMENTS-------------------------------------- */}
      <Box my={5} minHeight="80vh">
        {isLoading ? (
          <DocumentLoadingSkeleton />
        ) : data?.documents && data?.documents?.length > 0 ? (
          <Grid
            display="grid"
            gridTemplateColumns={{
              lg: "repeat(2, 1fr)",
              md: "repeat(2, 1fr)",
              xs: "repeat(1,1fr)",
            }}
            gap={3}
          >
            {data?.documents.map((document: IDocuments) => (
              <DocumentCard document={document} />
            ))}
          </Grid>
        ) : data?.documents && data?.documents?.length < 1 ? (
          <NoDocumentAvailable />
        ) : (
          error && <NoDataMessage message="No Documents Available" />
        )}
      </Box>
      <Box
        width="auto"
        sx={{ position: "absolute", top: "2.9375rem", right: "3.75rem" }}
      >
        {/* {!isLoading && <ButtonWrapper>Edit Documents</ButtonWrapper>} */}
      </Box>
    </Stack>
  );
};

export default DocumentPageComponent;
