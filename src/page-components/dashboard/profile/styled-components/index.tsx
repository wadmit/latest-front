import { Box, Button, Card, styled } from "@mui/material";

export const CustomProfileCard = styled(Card)(({ theme }) => ({
  marginTop: "32px",
  padding: "36px 24px",
  borderRadius: "8px",
  border: "1px solid var(--gray-200, #D9E2EC)",
}));

export const CustomInfoBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  marginBottom: "48px",
  "@media (max-width: 600px)": {
    marginBottom: "24px",
  },
}));

export const ProfileArea = styled(Box)(({ theme }) => ({
  my: 5,
  display: "flex",
  justifyContent: "space-between",
  borderRadius: "8px",
  padding: "32px 36px",
  border: "1px solid var(--gray-200, #D9E2EC)",
  alignItems: "center",
  marginTop: "32px",
  "@media (max-width: 600px)": {
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const EditProfilePhotoButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  bottom: "-5px",
  left: "-10px",
  padding: 5,
  maxHeight: "28px",
  outline: "none",
}));

export const UpdateProfilePhotoButton = styled(Button)(({ theme }) => ({
  padding: 5,
  maxHeight: "28px",
}));
