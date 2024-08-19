import { Paper, Stack } from "@mui/material";
import Link from "next/link";
import type { ISupportedByCard } from "@/page-components/students/utils/types";

function SupportedByCard({ item }: { item: ISupportedByCard }) {
  const size = "80px";

  return (
    <Paper elevation={0} style={{ backgroundColor: "white" }}>
      <Link href={item.url} target="_blank">
        <Stack direction="column" justifyContent="center" alignItems="center">
          <Stack
            width={size}
            height={size}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {item.src()}
          </Stack>
        </Stack>
      </Link>
    </Paper>
  );
}

export default SupportedByCard;
