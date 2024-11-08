import React from "react";
import { Box, Stack, Tooltip } from "@mui/material";

type Props<T> = {
  tabMenu: any;
  activeTab: string | number;
};

export type GlobalTabProps<T> = {
  id: number;
  name: T;
  active?: boolean;
  subMenu?: { id: number; name: T }[];
  onClick: (e?: React.MouseEvent<HTMLElement>) => void;
  details?: string;
  role?: string;
};

const AnimatedBox = () => {
  return (
    <Box
      position="absolute"
      bottom="0"
      height={{
        md: "4px",
        xs: "2px",
      }}
      zIndex={1}
      width="100%"
      sx={{
        animation: "expandWidth 0.1s ease-in forwards",
        "@keyframes expandWidth": {
          from: {
            width: "0%",
          },
          to: {
            width: "100%",
          },
        },
      }}
      borderRadius="8px"
      bgcolor="rgba(32, 28, 26, 0.9)"
    />
  );
};

const GlobalTab = <T extends string>({ tabMenu, activeTab }: Props<T>) => {
  console.log("eavavae", tabMenu, activeTab);
  return (
    <Box
      width="100%"
      position="relative"
      sx={{
        "&::after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          backgroundColor: "#E4E7EC",
          zIndex: 1,
        },
      }}
    >
      <Stack
        gap="32px"
        sx={{
          overflowX: "auto",
        }}
        flexDirection="row"
      >
        {tabMenu.map((eachTab: any, index: number) => {
          console.log("Caeca", eachTab, index);
          const TabContent = (
            <Box
              key={eachTab.id}
              position="relative"
              display="inline-block"
              pb="6px"
            >
              <Stack
                mb="6px"
                mt="8px"
                width="fit-content"
                sx={{
                  cursor: "pointer",
                  fontWeight: "400",
                  fontSize: {
                    md: "14px",
                    xs: "12px",
                  },
                  textTransform: "capitalize",
                  lineHeight: "14px",
                  fontFamily: "HankenGroteskRegular",
                  color: "rgba(32, 28, 26, 1)",
                }}
                // onClick={eachTab.onClick}
                className={activeTab === index ? "active-tab-sch" : "tab"}
              >
                {eachTab.name}
              </Stack>
              {(activeTab === eachTab.name || activeTab === eachTab.id) && (
                <Box
                  position="absolute"
                  bottom="0"
                  left="0"
                  right="0"
                  zIndex={2}
                >
                  <AnimatedBox />
                </Box>
              )}
            </Box>
          );

          return eachTab.details ? (
            <Tooltip key={eachTab.id} title={eachTab.details}>
              {TabContent}
            </Tooltip>
          ) : (
            TabContent
          );
        })}
      </Stack>
    </Box>
  );
};

export default GlobalTab;
