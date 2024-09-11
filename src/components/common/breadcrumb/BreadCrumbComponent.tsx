import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { Box, Link as MuiLink, Typography } from "@mui/material";
import Link from "next/link";
import type { IBreadCrumbComponentProps } from "@/components/common/breadcrumb/utils/types";

export function BreadCrumbComponent({
  crumbs,
  textColor = "common.black",
  ...rest
}: IBreadCrumbComponentProps) {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        ...(rest.sx as any),
      }}
    >
      <ol
        aria-label="breadcrumb"
        itemScope
        itemType="https://schema.org/BreadcrumbList"
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {crumbs.map((crumb, index) => (
          <li
            key={`_${crumb.label}`}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Link href={crumb.href}>
              <MuiLink
                href={crumb.href}
                underline="hover"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                color={textColor}
                itemProp="item"
              >
                {index === 0 && (
                  <HomeIcon
                    sx={{
                      mr: 0.5,
                      mt: "-3px",
                    }}
                    fontSize="inherit"
                  />
                )}
                <Typography variant="body1" component="span" itemProp="name">
                  {crumb.label}
                </Typography>
                <meta itemProp="position" content={`${index + 1}`} />
              </MuiLink>
            </Link>
            {index < crumbs.length - 1 && (
              <span style={{ marginLeft: 10, marginRight: 10 }}> / </span>
            )}
          </li>
        ))}
      </ol>
    </Box>
  );
}
