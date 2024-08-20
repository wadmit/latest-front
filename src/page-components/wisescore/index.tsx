"use client";
import { analytics } from "@/services/analytics.service";
import { EAnalyticsEvents, EAnalyticsStatus } from "@/types/mix-panel-analytic";
import React, { useState } from "react";
import WiseScoreWelcome from "./WisescoreWelcome";
import { WiseAdmitColorFulSvg } from "$/svg";
import WiseScoreModal from "./WisescoreModal";


const WiseScoreHome = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowOrHideModel = () => {
    if (!showModal) {
      analytics.timeEvent(EAnalyticsEvents.WISESCORE_STARTED);
      analytics.websiteButtonInteractions({
        buttonName: "Let's Start",
        source: "User clicked on Lets Start button of wisescore first page",
        urlPath: window.location.href,
        event_type: EAnalyticsEvents.FIND_SCHOLARSHIP_NOW,
        status: EAnalyticsStatus.SUCCESS,
        redirectPath: "",
      });
    } else {
      analytics.timeEvent(EAnalyticsEvents.WISESCORE_CLOSED);
    }
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <WiseScoreWelcome
        version="WiseScore"
        onClick={handleShowOrHideModel}
        primaryColor="#FF6B26"
        header={{
          title: "WiseScore®",
          subHeader:
            "a tool by WiseAdmit, recommends suitable programs based on your interests and academic history and evaluates your chance of acceptance into universities.",
        }}
        // this color is used as background in mobile screen
        secondaryColor="#FFF0E7"
      />
      {showModal && (
        <WiseScoreModal
          version="WiseScore"
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

export default WiseScoreHome;
