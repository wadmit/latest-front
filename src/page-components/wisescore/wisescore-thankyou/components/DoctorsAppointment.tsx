/* eslint-disable prettier/prettier */
import React from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import { DoctorSvg } from "../../svgs";
import { doctorsArray } from "../../utils/data";

function DoctorsAppointment() {
  const handleBookAppointment = (url: string) => {
    window.open(url);
  };

  return (
    <Box py={{ lg: 5, xs: 2 }}>
      <Box
        sx={{
          backgroundColor: "#EAF3FF",
          borderRadius: "12px",
          padding: "56px 66px 0px 66px",
        }}
      >
        <Grid container spacing={4}>
          <Grid position="relative" xs={12} lg={5} item>
            <Typography
              fontFamily="HankenGroteskExtraBold"
              letterSpacing="-2%"
              fontSize="24px"
              sx={{
                color: "#201C1A",
              }}
            >
              Our team of expert doctors is here to guide you
            </Typography>
            <Box
              display={{ lg: "block", xs: "none" }}
              position="absolute"
              bottom={0}
              right="60%"
            >
              <DoctorSvg />
            </Box>
          </Grid>
          <Grid xs={12} lg={7} item>
            <Stack direction="column" py="72px" spacing={2}>
              {doctorsArray.map(
                (
                  { designation, appointmentUrl, experience, imageUrl, name },
                  index
                ) => (
                  <>
                    <Stack
                      direction={{ xs: "column", lg: "row" }}
                      alignItems="center"
                      gap={2}
                    >
                      <Avatar
                        sx={{
                          width: "64px",
                          height: "64px",
                        }}
                        src="../../../public/Blogs/blogs1.jpg"
                      />
                      <Stack
                        width="100%"
                        direction={{ xs: "column", lg: "row" }}
                        alignItems="center"
                        justifyContent="space-between"
                        gap={1}
                      >
                        <Stack direction="column">
                          <Typography
                            mb="4px"
                            fontFamily="HankenGroteskSemiBold"
                            fontSize="16px"
                            sx={{
                              color: "#201C1A",
                            }}
                            textAlign={{ xs: "center", lg: "left" }}
                          >
                            {name}
                          </Typography>
                          <Typography
                            fontFamily="HankenGroteskRegular"
                            fontSize="14px"
                            sx={{
                              color: "#201C1A8C",
                            }}
                            textAlign={{ xs: "center", lg: "left" }}
                          >
                            {designation} | {experience} years of experience
                          </Typography>
                        </Stack>
                        <Button
                          sx={{
                            border: "1px solid #201C1A73",
                            borderRadius: "60px",
                            padding: "12px 31px 12px 31px",
                          }}
                          variant="outlined"
                          onClick={() => handleBookAppointment(appointmentUrl)}
                        >
                          Book an appointment
                        </Button>
                      </Stack>
                    </Stack>
                    {index < doctorsArray.length - 1 && <Divider />}
                  </>
                )
              )}
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default DoctorsAppointment;
