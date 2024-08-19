"use client";
import { IStudent } from "@/types/student";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useId, useState } from "react";
import {
  EditProfilePhotoButton,
  ProfileArea,
} from "@/page-components/dashboard/profile/styled-components";
import {
  Box,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { UpdateOutlined } from "@mui/icons-material";
import { ButtonWrapper } from "@/components/common";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import { analytics } from "@/services/analytics.service";
import {
  ConfirmNewProfileModal,
  RemoveProfileWarningModal,
} from "@/page-components/dashboard/profile/components/modals";

type Props = {
  student?: IStudent;
};

const ProfileCard = ({ student }: Props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [removeImageModal, setRemoveImageModal] = useState(false);
  const [uploadedImageModal, setUploadedImageModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState<null | File>(null);

  const inputLabelId = useId();
  const profileButtonId = useId();

  const open = Boolean(anchorEl);

  const id = open ? profileButtonId : undefined;

  const closeRemoveImageModal = () => {
    setRemoveImageModal(false);
  };

  const closeUploadImageModal = () => {
    setUploadedImageModal(false);
  };

  const selectedImagePreviewHandler = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      setAnchorEl(null);
      setUploadedImageModal(true);
      setSelectedImage(event.target.files[0]);
    }
  };
  return (
    <>
      <ProfileArea>
        <Stack
          direction={{ lg: "row", md: "row", sm: "row", xs: "column" }}
          alignItems="center"
          justifyContent={{ lg: "flex-start", xs: "center" }}
        >
          <Box sx={{ height: "auto", position: "relative" }}>
            <Box
              borderRadius="50%"
              overflow="hidden"
              height="100px"
              width="100px"
              position="relative"
            >
              <Box>
                {!student?.photoUrl ||
                  (student?.photoUrl !== "default" && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${student?.photoUrl_key}`}
                      layout="fill"
                      objectFit="cover"
                      alt="profile"
                    />
                  ))}
              </Box>
            </Box>
            <EditProfilePhotoButton
              size="small"
              variant="text"
              startIcon={<UpdateOutlined />}
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
              }}
            >
              Edit
            </EditProfilePhotoButton>{" "}
            <Popover
              sx={{ borderRadius: "10px" }}
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <MenuList>
                <MenuItem>
                  <input
                    accept="image/*"
                    style={{ display: "none" }}
                    id={inputLabelId}
                    type="file"
                    onChange={selectedImagePreviewHandler}
                  />
                  <label htmlFor={inputLabelId} style={{ width: "100%" }}>
                    {/* Upload */}
                    <ListItemText>Upload</ListItemText>
                  </label>
                </MenuItem>
                <MenuItem>
                  <ListItemText
                    onClick={() => {
                      setAnchorEl(null);
                      setRemoveImageModal(true);
                    }}
                  >
                    Remove Image
                  </ListItemText>
                </MenuItem>
              </MenuList>
            </Popover>
          </Box>

          <Stack
            display={{ xs: "flex" }}
            textAlign={{ xs: "center" }}
            gap={{ xs: 0.1 }}
            direction="column"
            mt={{ xs: 1 }}
            ml={{ lg: 5, sm: 5, xs: 0 }}
          >
            <Typography variant="subtitle1_sb" component="p">
              {student?.first_name} {student?.middle_name} {student?.last_name}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {student?.email}
            </Typography>
            <Typography variant="subtitle1" component="p">
              {student?.phone}
            </Typography>
          </Stack>
        </Stack>
        <Box mt={{ xs: 2 }} width="139px">
          <ButtonWrapper
            sx={{
              display: "flex !important",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              "@media (max-width: 600px)": {
                width: "100%",
              },
            }}
            onClick={() => {
              analytics.websiteButtonInteractions({
                buttonName: "Edit Profile",
                source: "User clicked on Edit Profile to edit the information",
                urlPath: window.location.href,
                event_type: EAnalyticsEvents.EDIT_PROFILE,
                status: EAnalyticsStatus.SUCCESS,
                redirectPath: "",
              });
              router.push("/dashboard/profile/edit-profile");
            }}
          >
            Edit Profile
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.14592 1.64592C5.19236 1.59935 5.24754 1.56241 5.30828 1.5372C5.36903 1.512 5.43415 1.49902 5.49992 1.49902C5.56568 1.49902 5.63081 1.512 5.69155 1.5372C5.7523 1.56241 5.80747 1.59935 5.85392 1.64592L11.8539 7.64592C11.9005 7.69236 11.9374 7.74754 11.9626 7.80828C11.9878 7.86903 12.0008 7.93415 12.0008 7.99992C12.0008 8.06568 11.9878 8.1308 11.9626 8.19155C11.9374 8.2523 11.9005 8.30747 11.8539 8.35392L5.85392 14.3539C5.76003 14.4478 5.63269 14.5005 5.49992 14.5005C5.36714 14.5005 5.2398 14.4478 5.14592 14.3539C5.05203 14.26 4.99929 14.1327 4.99929 13.9999C4.99929 13.8671 5.05203 13.7398 5.14592 13.6459L10.7929 7.99992L5.14592 2.35392C5.09935 2.30747 5.06241 2.2523 5.0372 2.19155C5.012 2.13081 4.99902 2.06568 4.99902 1.99992C4.99902 1.93415 5.012 1.86903 5.0372 1.80828C5.06241 1.74754 5.09935 1.69236 5.14592 1.64592Z"
                fill="white"
              />
            </svg>
          </ButtonWrapper>
        </Box>
      </ProfileArea>
      {removeImageModal && (
        <RemoveProfileWarningModal
          closeRemoveImageModal={closeRemoveImageModal}
        />
      )}
      {uploadedImageModal && selectedImage && (
        <ConfirmNewProfileModal
          imageFile={selectedImage}
          closeUploadImageModal={closeUploadImageModal}
        />
      )}
    </>
  );
};

ProfileCard.defaultProps = {
  student: {
    photoUrl: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    email: "",
    phone: "",
  },
};

export default ProfileCard;
