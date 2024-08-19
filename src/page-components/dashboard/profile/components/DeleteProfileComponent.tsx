"use client";
import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { DeleteWarningModal } from "@/page-components/dashboard/profile/components/modals";

const DeleteProfileComponent = () => {
  const [deleteWarningModal, setDeleteWarningModal] = useState(false);

  const deleteWarningModalHandler = () =>
    setDeleteWarningModal((prev) => !prev);
  return (
    <Box>
      <Button onClick={deleteWarningModalHandler} variant="outlined">
        Delete Account
      </Button>

      {deleteWarningModal && (
        <DeleteWarningModal
          deleteWarningModalHandler={deleteWarningModalHandler}
        />
      )}
    </Box>
  );
};

export default DeleteProfileComponent;
