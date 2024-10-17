"use client";
import React, { useMemo, useState } from "react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/global-states/hooks/hooks";
import { Avatar, Box, Card, Divider, Stack, Typography } from "@mui/material";
import Loader from "@/components/common/circular-loader/Loader";
import { useCustomQuery } from "@/hooks/useCustomQuery";
import { paymentEsewaVerify } from "@/api/web/payment.action";
import { PlusIcon } from "@/page-components/dashboard/svg";
import { Chip } from "@/page-components/dashboard/components/Chip";
import {
  ApplicationPaymentButton,
  ApplicationStatus,
} from "@/page-components/dashboard/applications/components";
import { PaymentButtonProps } from "@/page-components/dashboard/applications/types";
import { useSnackbar } from "notistack";
import { setStatusWhenPaid } from "@/global-states/reducers/applicationReducer";

type Props = {
  status: string;
  displayText: string;
  activeStep: number;
  buttonProps?: PaymentButtonProps;
  isPaymentLoading: boolean;
};

const ApplicationUserCard = ({
  status,
  displayText,
  activeStep,
  buttonProps,
  isPaymentLoading,
}: Props) => {
  const dispatch= useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const pathname = usePathname();
  const applicationId = params.applicationId as string;
  const { enqueueSnackbar } = useSnackbar();
  const [isPaymentProcessed, setIsPaymentProcessed] = useState(false);
  const { data: esewaData, isLoading: esewaVerificationLoading } = useCustomQuery({
    queryKey: ["esewaVerify"],
    queryFn: () => paymentEsewaVerify((searchParams.get("data") as string) ?? ""),
    onSuccess: (data) => {
      if (!isPaymentProcessed) {
        const params = new URLSearchParams(searchParams.toString())
        params.set("data", "")
        router.push(pathname + `?${params.toString()}`);
        setIsPaymentProcessed(true);
        dispatch(setStatusWhenPaid({}));
      }
    },
    onError: (error) => {
      enqueueSnackbar("Payment verification failed", { variant: "error" });
      router.replace(`/dashboard/applications/${applicationId}`);
    },
    enabled: searchParams && !!searchParams.get("data"),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  

  const [buttonText, setButtonText] = useState(displayText);
  const applications = useAppSelector(
    (state) => state.applications.singleApplication
  );

  useMemo(() => {
    setButtonText(displayText);
  }, [displayText]);

  return (
    <Stack>
      {esewaVerificationLoading && (
        <Box
          padding="10px 14px"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderRadius={4}
          width="fit-content"
          gap="4px"
          border="1px solid orange"
        >
          <Loader variant="indeterminate" /> Verifying your payment
        </Box>
      )}
      <Card
        sx={{
          maxWidth: "400px",
          minWidth: "300px",
          padding: "24px 16px",
          borderRadius: "8px",
          height: "fit-content",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          border: "1px solid var(--greyscale-300, #E0E0E0)",
          "@media (max-width: 834px)": {
            width: "100%",
            maxWidth: "100%",
            minWidth: "100%",
          },
        }}
      >
        <Stack display="flex" flexDirection="column" alignItems="center">
          <Avatar
            sx={{
              height: "96px",
              width: "96px",
            }}
            src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY!}/${
              applications?.program?.cover_key
            }`}
          />
          <Box
            mt="16px"
            gap={1}
            display="flex"
            flexDirection="row"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "rgba(0, 0, 0, 0.85)",
                fontFamily: "HankenGroteskSemibold",
                fontSize: "20px",
                fontStyle: "normal",
                fontWeight: "400",
                lineHeight: "140%",
                textAlign: "center" /* 28px */,
              }}
            >
              {applications?.university?.name}
            </Typography>
            {/* <img width="28" height="28" src="/Dashboard/CA.svg" alt="canada" /> */}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              fontWeight: "500",
              marginTop: "12px",
              flexWrap: "wrap",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                "&::after": {
                  content: '"-"',
                  margin: "5px",
                },
              }}
              variant="body1"
            >
              {applications?.program?.name}
            </Typography>
            <Typography
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
              variant="body1"
            >
              <Typography
                fontSize="14px"
                fontStyle="normal"
                fontWeight={600}
                lineHeight="18px"
              >
                {applications?.foundation ? <Chip text="Foundation" /> : ""}
              </Typography>
              <Box display="flex" mb={2}>
                {applications?.foundation && <PlusIcon />}
              </Box>{" "}
              {applications?.program?.type?.name}
            </Typography>
          </Box>
        </Stack>

        <Divider
          sx={{
            marginTop: "16px",
          }}
        />

        <Stack mt={3} display="flex" flexDirection="column" alignItems="center">
          <Typography mb={1}>Application ID: {applications?.id}</Typography>
        </Stack>
        <ApplicationStatus
          key={`${displayText}+1`}
          status={status}
          displayText={buttonText}
        />
        {buttonProps && activeStep === 0 && (
          <ApplicationPaymentButton
            isPaymentLoading={isPaymentLoading}
            paymentAmount={
              applications?.university?.detail?.fees["Application Fee"]
            }
            isPaymentWave={applications?.university?.admission_free}
            baseCurrency={applications?.university?.base_currency}
            buttonProps={buttonProps}
          />
        )}
      </Card>
    </Stack>
  );
};

export default ApplicationUserCard;
