"use client";
import React, { useState } from "react";
import WiseScoreWelcome from "../wisescore/WisescoreWelcome";
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import WiseScoreModal from "../wisescore/WisescoreModal";
import { WiseAdmitColorFulSvg } from "$/svg";

type Props = {};

const DashboardWisescore = (props: Props) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowOrHideModel = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <Breadcrumbs sx={{ mt: 3 }}>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/dashboard/wisescore">WiseScore®</Link>
      </Breadcrumbs>
      <WiseScoreWelcome
        version="WiseScore"
        sx={{
          backgroundImage: "url('/wisescore/swatch.svg')",
          overflow: 'hidden'
        }}
        onClick={handleShowOrHideModel}
        primaryColor="#FF6B26"
        header={{
          title: "WiseScore®",
          subHeader:
            " a tool by WiseAdmit, recommends suitable programs based on your interests and academic history and evaluates your chance of acceptance into universities.",
        }}
        // this color is used as background in mobile screen
        secondaryColor="#FFF0E7"
      />
      {showModal && (
        <WiseScoreModal
          //  endPoint=""
          variant=""
          secondaryColor="#EFE5DA"
          primaryColor="rgba(255, 107, 38, 1)"
          Logo={WiseAdmitColorFulSvg}
          showModal={showModal}
          closeModal={handleShowOrHideModel}
        />
      )}
    </>
  );
};

export default DashboardWisescore;
