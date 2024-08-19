import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
} from "@mui/material";
import type { IScholarship } from "@/types/utils";
import { StyledTableCell } from "@/page-components/programs/styled-components";
import { scholarshipsColumn } from "@/page-components/programs/utils/provider";

const AvailableScholarship = React.forwardRef(
  ({ scholarships }: { scholarships: IScholarship[] }, ref) => (
    <Box
      padding="32px 24px 32px 32px"
      borderRadius="12px"
      border="1px solid var(--Scrim-Overlay, #E9E9E9)"
      bgcolor="#ffffffff"
      ref={ref}
      id="scholarships"
    >
      <Typography
        fontSize="24px"
        fontFamily="HankenGroteskExtraBold"
        color="#201C1A"
      >
        Available Scholarships
      </Typography>
      <TableContainer
        component={Paper}
        sx={{ overflowx: "auto", width: "100%" }}
      >
        <Table
          sx={{ minWidth: "700px", mt: "32px", borderRadius: "8px" }}
          aria-label="application table"
        >
          <TableHead>
            <TableRow>
              {scholarshipsColumn.map((column) => (
                <StyledTableCell
                  sortDirection={false}
                  key={column.id}
                  align={column.align}
                  style={{
                    color: "white",
                    fontSize: "16px",
                    minWidth: column.minWidth,
                  }}
                >
                  {column.label}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {scholarships && scholarships.length > 0 ? (
              scholarships.map((scholarship) => (
                <TableRow key={scholarship.name}>
                  <StyledTableCell
                    sx={{
                      color: "#201C1A",
                      fontFamily: "HankenGroteskSemiBold",
                      fontSize: "16px",
                    }}
                  >
                    {scholarship.name}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      color: "rgba(32, 28, 26, 0.90)",
                      fontFamily: "HankenGroteskRegular",
                      fontSize: "14px",
                    }}
                  >
                    {scholarship.benefit}
                  </StyledTableCell>
                  <StyledTableCell
                    sx={{
                      color: "rgba(32, 28, 26, 0.90)",
                      fontFamily: "HankenGroteskRegular",
                      fontSize: "14px",
                    }}
                  >
                    ${scholarship.stipend ?? "N/A"}
                  </StyledTableCell>
                </TableRow>
              ))
            ) : (
              <Typography>No Scholarships Available</Typography>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
);

export default AvailableScholarship;
