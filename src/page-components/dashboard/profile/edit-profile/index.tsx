import { Breadcrumbs, TextField } from "@mui/material";
import Link from "next/link";
import React from "react";
import StudentProfileForm from "@/page-components/dashboard/profile/edit-profile/forms/StudentProfileForm";

const EditProfileHome = () => {
  return (
    <>
      <Breadcrumbs sx={{ mt: "7px" }}>
        <Link href="/dashboard/profile">Profile</Link>
      </Breadcrumbs>
      <StudentProfileForm />
    </>
  );
};

export default EditProfileHome;
