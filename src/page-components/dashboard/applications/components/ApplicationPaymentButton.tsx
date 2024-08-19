"use client";
import React, { useState } from "react";
import { PaymentButtonProps } from "@/page-components/dashboard/applications/types";
import { Box, Button, Dialog, Divider, Stack, Typography } from "@mui/material";
import {
  CrossIcon,
  EsewaIcon,
  SelectedTickIcon,
  StripeIcon,
} from "@/page-components/dashboard/applications/svg";
import Loader from "@/components/common/circular-loader/Loader";
import { useParams } from "next/navigation";
import { useAppSelector } from "@/global-states/hooks/hooks";
import useCostConverterMain from "@/hooks/costConverterMain";
import { useMutation } from "@tanstack/react-query";
import { postEsewaPayment } from "@/api/web/payment.action";

type Props = {
  buttonProps: PaymentButtonProps;
  paymentAmount: number;
  isPaymentWave: boolean;
  isPaymentLoading: boolean;
  baseCurrency: string;
};

const ApplicationPaymentButton = (props: Props) => {
  const params = useParams();
  const getConvertedCosts = useCostConverterMain();
  const [showPaymentOptions, setShowPaymentOptions] = useState<boolean>(false);
  const [activePaymentType, setActivePaymentType] = useState<string>("");
  const applicationId = params.applicationId;

  const currentCountry = useAppSelector(
    (state) => state.currency.currentCountry
  );

  const userProfileStatus = useAppSelector(
    (state) => state.user.dashboardDataGlobal?.data?.isProfileComplete
  );

  const {
    mutate: paymentEsewa,
    data: paymentEsewaData,
    isPending: isPaymentEsewaLoading,
  } = useMutation({
    mutationFn: postEsewaPayment,
    onSuccess: async (data) => {
      if (data.data) {
        const path = process.env.NEXT_PUBLIC_ESEWA_PATH!;
        const formData = data.data;
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);
        for (const key in formData) {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", formData[key]);
          form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
      }
    },
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Create a Checkout Session.
    if (currentCountry === "Nepal") {
      setShowPaymentOptions(true);
      return;
    }
    props.buttonProps.buttonClick();
  };

  const handlePopUpPayment = () => {
    if (activePaymentType === "stripe") {
      // stripe payment
      props.buttonProps.buttonClick();
    }
    if (activePaymentType === "esewa") {
      // esewa payment
      paymentEsewa({ formValues: [applicationId as string], type: "single" });
    }
  };

  const togglePaymentModal = () => {
    setShowPaymentOptions((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "16px",
      }}
    >
      <Button
        disabled={!userProfileStatus}
        onClick={handleSubmit}
        sx={{
          borderRadius: "4px",
          background: "var(--primary-main, #FF6B26)",
          color: "var(--white, #FFFFFF)",
          padding: "7px 12px 7px 19px",
          minWidth: "157px",
          textAlign: "center",
          cursor: "pointer",
          "&:hover": {
            background: "var(--primary-dark, #e66022)",
            transform: "scale(1.05)",
          },
          "&:disabled": {
            opacity: 0.35,
            color: "var(--default-white, #ffffff)",
          },
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontStyle: "normal",
            fontFamily: "HankenGroteskRegular",
            lineHeight: "18px",
          }}
          variant="button"
          display="flex"
          alignItems="center"
        >
          {props.isPaymentLoading && <Loader size={35} color="info" />}
          Pay{" "}
          {props.isPaymentWave
            ? 0
            : getConvertedCosts(props.paymentAmount, props.baseCurrency)
                .formattedValue}
        </Typography>
      </Button>

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
                  fontSize: {
                    md: "24px",
                    xs: "20px",
                  },
                  fontWeight: 800,
                  pb: "4px",
                }}
              >
                Select payment method
              </Typography>
              <Box sx={{ cursor: "pointer" }} onClick={togglePaymentModal}>
                <CrossIcon />
              </Box>
            </Box>
            <Typography
              sx={{
                fontSize: {
                  md: "14px",
                  xs: "10px",
                },
                fontWeight: "400",
              }}
            >
              Preferred method with secure transactions.
            </Typography>

            <Box
              mt={4}
              mb={5}
              width={{
                md: "388px",
              }}
            >
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
              disabled={!!(props.isPaymentLoading || isPaymentEsewaLoading)}
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
              disabled={!!(props.isPaymentLoading || isPaymentEsewaLoading)}
              sx={{
                minWidth: "95px",
                height: "32px",
                p: "8px 20px",
                borderRadius: "8px",
                ml: "16px",
                textTransform: "none",
              }}
            >
              {isPaymentEsewaLoading || props.isPaymentLoading
                ? "Loading..."
                : "Pay now"}
            </Button>
          </Box>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ApplicationPaymentButton;
