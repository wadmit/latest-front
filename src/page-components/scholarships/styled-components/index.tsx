"use client";
import { IRootContainerProps } from "@/types/other";
import { Box, TableCell, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledContainerWrapper = styled(Box, {
  name: "Root-Layout-Wrapper",
})`
  margin: 0 auto;
  max-width: 1440px;
  padding: 84px 124px;
`;

export function ScholarshipHeaderContainer(props: IRootContainerProps) {
  const { children, component = "section", ...rest } = props;

  return (
    <Box zIndex={100} {...rest} component={component}>
      <StyledContainerWrapper>{children}</StyledContainerWrapper>
    </Box>
  );
}

export const SingleScholarshipChildrenWrapper = styled(Box, {
  name: "SingleScholarshipChildrenWrapper",
})`
  margin-top: 50px;
  gap: 40px;
  flex: 1;
  display: flex;
  width: 100%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    flex-direction: row;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    flex-direction: column;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  ${(props) => props.theme.breakpoints.down("xs")} {
    flex-direction: column;
  }
`;

export const SingleScholarshipStickWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  flex: 0.4;
  position: sticky;
  top: 120px;
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 30%;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.down("xs")} {
    width: 100%;
  }
`;

export const StyledTableCellScholarship = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#445E81 !important",
    color: "#fffff !important",
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    backgroundColor: "#EAF3FF",
  },
}));
