import { Button, ButtonProps } from "@mui/material";
import Link from "next/link";
import { wrapperButtonTypes } from "@/components/common";

export function PaginationButton(props: wrapperButtonTypes) {
  const { children, url, ...rest } = props;
  return (
    <Link href={url} shallow>
      <a>
        <Button
          {...rest}
          size="small"
          sx={{
            borderRadius: 1,
            p: 0,
            maxWidth: "2.875rem",
            maxHeight: "2.875rem",
            minWidth: "2.875rem",
            minHeight: "2.875rem",
          }}
          disableElevation
        >
          {children}
        </Button>
      </a>
    </Link>
  );
}

PaginationButton.defaultProps = {
  variant: "text",
};
