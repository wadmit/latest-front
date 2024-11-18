import { GetSearchIcon } from "@/page-components/blog/svg";
import { Box, Button, Input } from "@mui/material";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type Props = {
  handleSearch: (searchTermData: string) => void;
};

const ScholarshipSearch = ({ handleSearch }: Props) => {
  const searchParams = useSearchParams();

  const [searchValue, setSearchValue] = useState(
    searchParams.get("searchTerm") || ""
  );

  return (
    <Box
      mt={2}
      display="flex"
      justifyContent="flex-start"
      gap={2}
      alignItems={{
        xs: "flex-start",
        sm: "flex-start",
        md: "center",
        lg: "center",
      }}
      flexDirection={{
        xs: "column-reverse",
        sm: "column-reverse",
        md: "row",
        lg: "row",
      }}
      mb="33px"
    >
      <Box
        display="flex"
        alignItems={{
          lg: "center",
          md: "center",
          sm: "flex-start",
          xs: "flex-start",
        }}
        width="100%"
        flex={{ xs: 1, sm: 1, md: 0.4, lg: 0.4 }}
        flexDirection={{ lg: "row", md: "row", sm: "column", xs: "column" }}
        gap={{ lg: "20px", md: "20px", sm: "12px", xs: "12px" }}
      >
        <Input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          sx={{
            outline: "none",
            "&::after": {
              content: '""',
              borderBottom: "none",
            },
            "&::before": {
              content: '""',
              borderBottom: "none !important",
            },
            borderRadius: "8px",
            border: "border: 1px solid rgba(234, 234, 234, 1)",
            width: { lg: "502px", md: "502px", sm: "100%", xs: "100%" },
            height: "40px",
            padding: "8px 48px 8px 24px",
            background: "rgba(255, 255, 255, 1)",
          }}
          placeholder="Search for scholarship"
        />

        <Button
          onClick={(e) => {
            e.preventDefault();
            handleSearch(searchValue);
          }}
          type="submit"
          sx={{
            background: "#FF6B26",
            color: "#FFFFFF",
            borderRadius: "8px",
            padding: "14.61px 56.8px",
            height: "48px",
            maxWidth: "100%",
          }}
        >
          Search
        </Button>
      </Box>
    </Box>
  );
};

export default ScholarshipSearch;
