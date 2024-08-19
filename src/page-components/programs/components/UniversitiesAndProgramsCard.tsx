import ImageComponent from "@/components/common/image-component";
import applicationConfig from "@/config";
import { Box, Stack, Typography } from "@mui/material";
import { usePathname, useRouter } from "next/navigation";
import { SortListIcons } from "@/page-components/programs/components";
import Link from "next/link";
import { ButtonWrapper } from "@/components/common";
import type { IProgramUniversityCardProps } from "@/page-components/programs/utils/types";

export default function UniversitiesAndProgramsCard({
  uniProgram,
  getConvertedCosts,
  dataType = "universities",
}: IProgramUniversityCardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { name, desc, university, id, cover, cover_key, slug } = uniProgram;
  return (
    <Box
      sx={{
        overflow: "hidden",
        m: ".625rem",
        p: "1.125rem",
        maxWidth: "26.5625rem",
        justifySelf: "center",
        boxShadow: 2,
        transition: "box-shadow 0.3s ease-in-out",
      }}
    >
      <Stack direction="column" justifyContent="space-between" height="100%">
        <Box>
          <a
            href={`${applicationConfig.frontendUrlConfig}/${dataType}/${slug}`}
            target="_blank"
            rel="noreferrer"
          >
            <Box
              height="11.0625rem"
              width="100%"
              position="relative"
              maxWidth="26.5625rem"
            >
              <ImageComponent
                src={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${cover_key}`}
                alt={university?.name || name}
                // fallbackSrc={WiseAdmitDefault}
                quality={20}
                className="zoom"
              />
            </Box>
          </a>

          <Box mt={2}>
            <Typography variant="subtitle2" component="h4">
              {name}
            </Typography>
            <Typography variant="body1" component="h5">
              {university?.name}
            </Typography>
          </Box>
        </Box>
        <Stack
          direction="row"
          columnGap={{ md: 5, xs: 2 }}
          my={1}
          flexWrap="wrap"
        >
          {[0, 1].map((item) => (
            <Box key={item}>
              <SortListIcons
                getConvertedCosts={getConvertedCosts}
                index={item}
                fee={uniProgram?.detail?.fees?.tution_fee || ""}
                baseCurrency={uniProgram?.detail.base_currency}
              />
            </Box>
          ))}
        </Stack>
        {pathname.startsWith("/programs") && (
          <Box width="9.375rem" mt={2}>
            <Link href={`/programs/${slug}`}>
              <ButtonWrapper variant="outlined">See Details</ButtonWrapper>
            </Link>
          </Box>
        )}
        {pathname.startsWith("/dashboard") && (
          <Box width="9.375rem" mt={2}>
            <ButtonWrapper
              variant="outlined"
              onClick={() => {
                window.open(
                  `${applicationConfig.frontendUrlConfig}/${dataType}/${slug}`
                );
              }}
            >
              See Details
            </ButtonWrapper>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
