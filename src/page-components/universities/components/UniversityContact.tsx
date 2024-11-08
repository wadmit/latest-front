import React, { useContext } from "react";
import { Box, Divider, Typography } from "@mui/material";
import Image from "next/image";
import UniversityDetailContext from "@/context/university-detail-context";
import { GetPopUpIcon } from "@/page-components/programs/svg";

function UniversityContact() {
  const university = useContext(UniversityDetailContext);

  const pushTourl = (url: string) => {
    window.open(url, "_blank", "noreferrer");
  };
  return (
    <Box
      padding="32px 24px"
      borderRadius="12px"
      bgcolor="#FFF"
      border="1px solid #E9E9E9"
    >
      <Typography variant="h4">Contact</Typography>
      <Divider />

      <Box
        margin="24px 0px 24px 0px"
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          fontSize="16px"
          fontFamily="HankenGroteskSemiBold"
          color="rgba(0, 0, 0, 0.65)"
        >
          Address
        </Typography>
        <Box>
          <Typography
            color="#201C1A"
            fontSize="16px"
            fontFamily="HankenGroteskRegular"
          >
            {university?.location}
          </Typography>
          {university?.detail && (
            <Box mt="10px" display="flex" alignItems="center" gap="8px">
              <Typography
                color="#567BFF"
                sx={{
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                fontSize="16px"
                fontFamily="HankenGroteskSemiBold"
                // onClick={() => pushTourl(university?.detail?.map)}
              >
                View on Google map
              </Typography>
              <GetPopUpIcon />
            </Box>
          )}
        </Box>
      </Box>
      <Divider />
      <Box
        margin="24px 0px 24px 0px"
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          fontSize="16px"
          fontFamily="HankenGroteskSemiBold"
          color="rgba(0, 0, 0, 0.65)"
        >
          Email
        </Typography>
        <Typography
          color="#201C1A"
          fontSize="16px"
          fontFamily="HankenGroteskRegular"
        >
          {university?.detail?.socials?.["Email Address"] ?? "N/A"}
        </Typography>
      </Box>
      <Divider />
      <Box
        mt="14px"
        display="flex"
        flexWrap="wrap"
        gap="20px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          sx={{
            cursor: "pointer",
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap="8px"
        >
          {/* ICon */}
          <Image
            width={30}
            height={30}
            src="/images/universities/facebook.svg"
            alt="facebook"
          />
          <Typography
            fontFamily="HankenGroteskSemiBold"
            fontSize="12px"
            color="grey"
          >
            Facebook
          </Typography>
        </Box>
        <Box
          onClick={() =>
            // pushTourl(university?.detail?.socials?.['Instagram Link'])
            console.log("hit")
          }
          sx={{
            cursor: "pointer",
          }}
          gap="8px"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* ICon */}
          <Image
            width={30}
            height={30}
            src="/images/universities/instagram.svg"
            alt="facebook"
          />
          <Typography
            fontFamily="HankenGroteskSemiBold"
            fontSize="12px"
            color="grey"
          >
            Instagram
          </Typography>
        </Box>
        <Box
          gap="8px"
          onClick={() =>
            // pushTourl(university?.detail?.socials?.['Youtube Link'])
            console.log("hit")
          }
          sx={{
            cursor: "pointer",
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* ICon */}
          <Image
            width={30}
            height={30}
            src="/images/universities/youtube.svg"
            alt="facebook"
          />
          <Typography
            fontFamily="HankenGroteskSemiBold"
            fontSize="12px"
            color="grey"
          >
            Youtube
          </Typography>
        </Box>
        <Box
          gap="8px"
          onClick={
            () => console.log("hit")

            // pushTourl(university?.detail?.socials?.['Twitter Link'])
          }
          sx={{
            cursor: "pointer",
          }}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          {/* ICon */}
          <Image
            width={30}
            height={30}
            src="/images/universities/twitter.svg"
            alt="facebook"
          />
          <Typography
            fontFamily="HankenGroteskSemiBold"
            fontSize="12px"
            color="grey"
          >
            Twitter
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default UniversityContact;
