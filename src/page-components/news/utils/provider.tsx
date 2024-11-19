import { Box, Stack, styled } from "@mui/material";

export const HeroWrapper = styled(Box, {
    name: 'Hero-Wrapper',
  })`
    background-color: #efefef;
    padding: 64px 0px;
    margin-top: 64px;
    ${(props) => props.theme.breakpoints.down('lg')} {
      padding: 0px 22px;
      padding-bottom: 52px;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
      padding: 0px 0px;
      padding-bottom: 52px;
    }
  `;
  
  export const HeroContentWrapper = styled(Box, {
    name: 'Hero-Layout-Wrapper',
  })`
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    ${(props) => props.theme.breakpoints.down('lg')} {
      align-items: center;
      padding: 0px 22px;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
      align-items: center;
      padding: 0px 22px;
    }
  `;
  export const StyledContainerWrapper = styled(Box, {
    name: 'Root-Layout-Wrapper',
  })`
    margin: 0 auto;
    max-width: 1440px;
    padding: 0px 130px;
  
    ${(props) => props.theme.breakpoints.down('xl')} {
      padding: 0px 130px;
    }
    ${(props) => props.theme.breakpoints.down('lg')} {
      padding: 0px 0px;
    }
    ${(props) => props.theme.breakpoints.down('sm')} {
      padding: 0px 0px;
    }
  `;
  

export const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: '#5768FF',
  padding: '46px 0px 46px 0px',
  marginBottom: '96px',
}));

export const Card = styled(Stack)(({ theme }) => ({
  borderRadius: "12px",
  border: " 1px solid #F0F1F3",
  backgroundColor: "#ffffff",
  width: "280px",
  height: "90px",
  flexShrink: 0,
  padding: "17px 0px 15px 20px"

}));



//data
export const eventDetails = [
  // {
  //     location: "Kenya",
  //     date: "August 17-22"
  // },
  // {
  //     location: "DR Congo",
  //     date: "August 22-23"
  // },
  // {
  //     location: "Morocco",
  //     date: "August 23-26"
  // }
]