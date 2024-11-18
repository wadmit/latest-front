"use client";
import { Box, styled, Tabs, Typography } from "@mui/material";

export const LastUpdatedChip = styled(Box)`
  padding: 6px 16px;
  width: fit-content;
  border-radius: var(--16, 16px);
  border: 1px solid var(--Line-Stroke-default, #d3d7d9);
  background: #fff;
  box-shadow: 0px 0px 52.135px 0px rgba(7, 33, 102, 0.07);
  margin-bottom: 20px;
`;
export const BodyB2 = styled(Typography)`
  color: rgba(32, 28, 26, 0.9);
  font-family: "HankenGroteskRegular";
  font-size: 16px;
  line-height: 140%;
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 14px;
  }
`;
export const BodyB2Bold = styled(Typography)`
  color: rgba(32, 28, 26, 0.9);
  font-family: "HankenGroteskBold";
  font-size: 16px;
  line-height: 140%;
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 14px;
  }
`;

export const BodyB3 = styled(Typography)`
  color: rgba(32, 28, 26, 0.95);
  text-align: center;
  font-family: HankenGroteskRegular;
  font-size: 14px;
  line-height: 140%;
`;
export const HeadingH1 = styled(Typography)`
  color: #201c1a;
  //   text-align: center;
  font-family: HankenGroteskExtraBold;
  font-size: 48px;
  line-height: 130%;
  letter-spacing: -0.96px;
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 32px;
    letter-spacing: -0.64px;
  }
`;
export const HeadingH4 = styled(Typography)`
  color: #201c1a;
  //   text-align: center;
  font-family: "HankenGroteskExtraBold";
  font-size: 24px;
  line-height: 130%;
  letter-spacing: -0.48px;
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 20px;
    letter-spacing: -0.4px;
  }
`;
export const HeadingH5 = styled(Typography)`
  color: #201c1a;
  //   text-align: center;
  font-family: "HankenGroteskExtraBold";
  font-size: 20px;
  line-height: 130%;
  letter-spacing: -0.4px;
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 18px;
    letter-spacing: -0.36px;
  }
`;
export const ParagraphCombination = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const CustomList = styled(Box)`
  color: rgba(32, 28, 26, 0.9);
  font-family: "HankenGroteskRegular";
  font-size: 16px;
  line-height: 140%;
  li {
    margin-bottom: 8px;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 14px;
  }
`;
export const CustomListBlue = styled(Box)`
  color: var(--Complimentary-300, #3185fc);
  font-family: "HankenGroteskRegular";
  font-size: 16px;
  line-height: 140%;
  li {
    margin-bottom: 8px;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 14px;
  }
`;
export const CustomListBigGap = styled(Box)`
  color: rgba(32, 28, 26, 0.9);
  font-family: "HankenGroteskRegular";
  font-size: 16px;
  line-height: 140%;
  li {
    margin-bottom: 16px;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 14px;
  }
`;
export const CustomListLarge = styled(Box)`
  color: var(--Complimentary-300, #3185fc);
  font-family: "HankenGroteskExtraBold";
  font-size: 20px;
  line-height: 130%;
  letter-spacing: -0.4px;
  li {
    margin-bottom: 24px;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    font-size: 18px;
    letter-spacing: -0.36px;
  }
`;

export const SingleSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  margin-bottom: 32px;
`;

export const ProgramUniBodyWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  padding-top: 65px;

  ${(props) => props.theme.breakpoints.up("lg")} {
    padding-top: 65px;
  }
  ${(props) => props.theme.breakpoints.up("md")} {
    padding-top: 50px;
  }
  ${(props) => props.theme.breakpoints.up("xs")} {
    padding-top: 30px;
  }
`;

export const ProgramUniChildrenWrapper = styled(Box, {
  name: "ProgramUniChildrenWrapper",
})`
  margin-top: 50px;
  gap: 40px;
  flex: 1;
  display: flex;
  width: 100%;

  ${(props) => props.theme.breakpoints.up("lg")} {
    flex-direction: row;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    flex-direction: column;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    flex-direction: column;
  }
  ${(props) => props.theme.breakpoints.down("xs")} {
    flex-direction: column;
  }
`;

export const StickWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  height: 100%;
  flex: 0.4;
  position: sticky;
  top: 70px;
  ${(props) => props.theme.breakpoints.up("lg")} {
    width: 30%;
  }
  ${(props) => props.theme.breakpoints.down("md")} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
  }
  ${(props) => props.theme.breakpoints.down("xs")} {
    width: 100%;
  }
`;
export const StyledNavbar = styled(Box)`
  border-bottom: 3px solid rgba(0, 0, 0, 0.08);
  .active-tab {
    border-bottom: 4px solid #ef6c00;
    color: #5b5b5b;
    border-radius: 2px;
  }
  .active-tab-sch {
    color: #201c1a;
    border-radius: 2px;
  }
  .tab {
    font-style: normal;
    color: #5b5b5b;
    display: flex;
    border-radius: 0px;
  }
`;

export const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    border: 0px;
    background-color: black;
    border-radius: 10px;
  }
`;
