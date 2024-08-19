import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import {
  CrossIcon,
  EsewaIcon,
  SelectedTickIcon,
  StripeIcon,
} from "@/page-components/dashboard/applications/svg";

type Props = {
  showPaymentOptions: boolean;
  activePaymentType: string;
  isPaymentLoading: boolean;
  isPaymentEsewaLoading: boolean;
  setActivePaymentType: (val: string) => void;
  togglePaymentModal: () => void;
  handlePopUpPayment: () => void;
};

const ApplicationPaymentDialogOptions = ({
  showPaymentOptions,
  activePaymentType,
  isPaymentLoading,
  isPaymentEsewaLoading,
  setActivePaymentType,
  togglePaymentModal,
  handlePopUpPayment,
}: Props) => {
  return (
    <Dialog open={showPaymentOptions}>
      <Box sx={{ maxWidth: "444px", padding: "16px 24px 0px 24px" }}>
        <Box>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              sx={{
                fontSize: "24px",
                fontWeight: 800,
                pb: "4px",
              }}
            >
              Select payment methods
            </Typography>
            <Box sx={{ cursor: "pointer" }} onClick={togglePaymentModal}>
              <CrossIcon />
            </Box>
          </Box>
          <Typography
            sx={{
              fontSize: "14px",
              fontWeight: "400",
            }}
          >
            Preferred method with secure transactions.
          </Typography>

          <Box mt={4} mb={5} width="388px">
            <Stack spacing="24px">
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => setActivePaymentType("esewa")}
              >
                <Box
                  sx={{
                    borderRadius: "8px",
                    height: "74px",
                    border: `1px solid ${
                      activePaymentType === "esewa"
                        ? "#FF6B26"
                        : "rgba(0, 0, 0, 0.20)"
                    }`,
                    padding: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#FCFAF8",
                  }}
                >
                  <Box>
                    <Button
                      disabled
                      sx={{
                        border: "1px solid #E9E9E9",
                        borderRadius: "8px",
                        width: "112px",
                      }}
                      variant="outlined"
                    >
                      <EsewaIcon />
                    </Button>
                    <Typography
                      variant="body2"
                      px="16px"
                      color="rgba(32, 28, 26, 0.90)"
                      sx={{ fontWeight: 400 }}
                    >
                      Pay with Esewa
                    </Typography>
                  </Box>
                  {activePaymentType === "esewa" && <SelectedTickIcon />}
                </Box>
              </Box>
              <Box
                sx={{ cursor: "pointer" }}
                onClick={() => setActivePaymentType("stripe")}
              >
                <Box
                  sx={{
                    borderRadius: "8px",
                    height: "74px",
                    border: `1px solid ${
                      activePaymentType === "stripe"
                        ? "#FF6B26"
                        : "rgba(0, 0, 0, 0.20)"
                    }`,
                    padding: "15px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "#FCFAF8",
                  }}
                >
                  <Box>
                    <Button
                      disabled
                      sx={{
                        border: "1px solid #E9E9E9",
                        borderRadius: "8px",
                        width: "112px",
                      }}
                      variant="outlined"
                    >
                      <StripeIcon />
                    </Button>
                    <Typography
                      variant="body2"
                      px="16px"
                      color="rgba(32, 28, 26, 0.90)"
                      sx={{ fontWeight: 400 }}
                    >
                      Pay with Stripe
                    </Typography>
                  </Box>
                  {activePaymentType === "stripe" && <SelectedTickIcon />}
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Divider />

      <Box sx={{ maxWidth: "444px", padding: "14px 24px" }}>
        <Box mt="4px" display="flex" justifyContent="flex-end">
          <Button
            disabled={!!(isPaymentLoading || isPaymentEsewaLoading)}
            variant="outlined"
            sx={{
              minWidth: "95px",
              height: "32px",
              p: "8px 20px",
              borderRadius: "8px",
              border: "1px solid rgba(32, 28, 26, 0.40)",
            }}
            onClick={togglePaymentModal}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() => handlePopUpPayment()}
            disabled={!!(isPaymentLoading || isPaymentEsewaLoading)}
            sx={{
              minWidth: "95px",
              height: "32px",
              p: "8px 20px",
              borderRadius: "8px",
              ml: "16px",
              textTransform: "none",
            }}
          >
            {isPaymentEsewaLoading || isPaymentLoading
              ? "Loading..."
              : "Pay now"}
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default ApplicationPaymentDialogOptions;
