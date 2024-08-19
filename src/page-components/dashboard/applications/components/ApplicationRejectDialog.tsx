import { IApplication } from "@/types/application";
import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

type Props = {
  singleApplication: IApplication;
  handleShowOrCloseDialogBox: () => void;
};

const ApplicationRejectDialog = ({
  singleApplication,
  handleShowOrCloseDialogBox,
}: Props) => {
  return (
    <Dialog fullWidth open>
      <Box paddingTop="16px">
        <DialogTitle>
          <Box
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
          >
            <Typography variant="h4">
              Your application just got rejected
            </Typography>
            <Box
              sx={{
                cursor: "pointer",
              }}
            >
              <Close onClick={handleShowOrCloseDialogBox} />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box>
            <Divider />
            <Box mt="16px" />
            <Typography fontSize="18px">
              We are deeply sadden 😞 to see the rejection of your application.
              We wish you all the best for your future endeavors. Following is
              the reason provided by university
            </Typography>
            <Box mt="16px" />
            <Typography variant="h4">
              Title : {singleApplication?.note?.title}
            </Typography>
            <Box>
              <Typography
                fontSize="18px"
                fontFamily="HankenGroteskLight"
                fontStyle="normal"
              >
                Reason : {singleApplication?.note?.reason}
              </Typography>
            </Box>
          </Box>

          {/* <Typography variant="body1"></Typography> */}
          <Stack display="flex" justifyContent="flex-end" alignItems="flex-end">
            <Box
              mt={2}
              sx={{
                padding: "10px 40px",
                borderRadius: "12px",
                border: "1px solid #E5E5E5",
                color: "white",
                cursor: "pointer",
                backgroundColor: "primary.main",
              }}
              onClick={handleShowOrCloseDialogBox}
            >
              Close
            </Box>
          </Stack>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default ApplicationRejectDialog;
