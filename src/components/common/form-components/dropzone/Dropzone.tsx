"use client";
import { IDropzone } from "@/types/other";
import { Box, Link, Stack, styled, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import React, { useEffect, useState } from "react";
import CircularLoaderWithLabel from "../../circular-loader-with-label/CircularLoaderWithLabel";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { DocumentUploadSvg } from "public/svg";
import DropzoneHOC from "./DropzoneHOC";

function UploadSvg() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M6.609 2.013C8.10822 0.720203 10.0204 0.00620777 12 0C16.035 0 19.3845 3 19.749 6.8685C22.137 7.206 24 9.2055 24 11.6595C24 14.3535 21.753 16.5 19.0305 16.5H15C14.8011 16.5 14.6103 16.421 14.4697 16.2803C14.329 16.1397 14.25 15.9489 14.25 15.75C14.25 15.5511 14.329 15.3603 14.4697 15.2197C14.6103 15.079 14.8011 15 15 15H19.032C20.9685 15 22.5 13.482 22.5 11.6595C22.5 9.8355 20.97 8.3175 19.0305 8.3175H18.2805V7.5675C18.282 4.2375 15.492 1.5 12 1.5C10.3798 1.50647 8.81526 2.09165 7.5885 3.15C6.453 4.128 5.859 5.307 5.859 6.2325V6.9045L5.1915 6.978C3.096 7.2075 1.5 8.928 1.5 10.977C1.5 13.1775 3.345 15 5.6715 15H9C9.19891 15 9.38968 15.079 9.53033 15.2197C9.67098 15.3603 9.75 15.5511 9.75 15.75C9.75 15.9489 9.67098 16.1397 9.53033 16.2803C9.38968 16.421 9.19891 16.5 9 16.5H5.6715C2.562 16.5 0 14.049 0 10.977C0 8.3325 1.899 6.1425 4.413 5.5875C4.6275 4.293 5.46 3.003 6.609 2.013Z"
        fill="#FF6C26"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.469 6.219C11.5387 6.14916 11.6214 6.09374 11.7125 6.05593C11.8037 6.01812 11.9013 5.99866 12 5.99866C12.0987 5.99866 12.1963 6.01812 12.2874 6.05593C12.3786 6.09374 12.4613 6.14916 12.531 6.219L17.031 10.719C17.1718 10.8598 17.2509 11.0508 17.2509 11.25C17.2509 11.4492 17.1718 11.6402 17.031 11.781C16.8902 11.9218 16.6992 12.0009 16.5 12.0009C16.3008 12.0009 16.1098 11.9218 15.969 11.781L12.75 8.5605V21.75C12.75 21.9489 12.671 22.1397 12.5303 22.2803C12.3897 22.421 12.1989 22.5 12 22.5C11.8011 22.5 11.6103 22.421 11.4697 22.2803C11.329 22.1397 11.25 21.9489 11.25 21.75V8.5605L8.031 11.781C7.89017 11.9218 7.69916 12.0009 7.5 12.0009C7.30084 12.0009 7.10983 11.9218 6.969 11.781C6.82817 11.6402 6.74905 11.4492 6.74905 11.25C6.74905 11.0508 6.82817 10.8598 6.969 10.719L11.469 6.219Z"
        fill="#FF6C26"
      />
    </svg>
  );
}

const StyledImageUploadBox = styled(Box, {
  name: "ImageUploadBox",
})(({ theme }) => ({
  marginTop: "1rem",
  border: ".0625rem dashed ",
  borderColor: theme.palette.grey[200],
  minHeight: "5rem",
  height: "100%",
  borderRadius: ".5rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  backgroundColor: "rgba(255, 255, 255, 1)",
}));
const StyledImageUploadBox2 = styled(Box, {
  name: "ImageUploadBox",
})(({ theme }) => ({
  marginTop: "1rem",
  border: "1px dashed #BFC6D5",
  // borderColor: theme.palette.grey[200],
  minHeight: "109px",
  // height: '109px',
  borderRadius: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "8px 12px 8px 12px",

  flexDirection: "column",
  backgroundColor: "transparent",
}));

const Dropzone = ({
  variant,
  name,
  handleChange,
  type = "Requried",
  keyName,
}: IDropzone) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [status, setStatus] = useState({
    msg: "",
    success: false,
    file: "",
    key: "",
  });

  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    multiple: true,
    onDragEnter: () => {
      setIsDragging(true);
    },
    onDragLeave: () => {
      setIsDragging(false);
    },
    onDropAccepted: () => {
      setIsDragging(false);
    },
  });

  const files = acceptedFiles.map((file: any) => (
    <Box key={file.path} mt={0.5}>
      <Typography
        variant="body1"
        color="grey.400"
        component="p"
        textAlign="center"
      >
        {file.path}
        <br />
        Size: {file.size} bytes
      </Typography>
    </Box>
  ));

  //
  useEffect(() => {
    if (acceptedFiles.length > 0) {
      setIsLoading(true);
      handleChange(name, acceptedFiles, keyName, type)
        .then((res: any) => {
          setStatus(res);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [acceptedFiles]);

  if (variant === "small") {
    return (
      <StyledImageUploadBox2
        {...getRootProps({ className: "dropzone" })}
        sx={{
          opacity: isDragging ? 0.5 : 1,
        }}
      >
        <input {...getInputProps()} />
        {isLoading ? (
          <CircularLoaderWithLabel />
        ) : (
          <Box zIndex="100" position="relative">
            {status?.msg && status?.success ? (
              <Box overflow="hidden" height="4.375rem" width="4.375rem">
                <iframe
                  title="doc"
                  height="100%"
                  width="100%"
                  src={
                    Array.isArray(status.key)
                      ? `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${status.key[0]}`
                      : `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${status.key}`
                  }
                />
              </Box>
            ) : (
              <UploadSvg />
            )}
          </Box>
        )}
        <Box mt={1}>
          <Typography
            sx={{
              color: "#83868b",
              fontSize: "14px",
              fontFamily: "HankenGroteskRegular",
            }}
            textAlign="center"
          >
            Drag and Drop or browse your files{" "}
            <Link
              onClick={open}
              color="primary"
              underline="hover"
              sx={{ cursor: "pointer" }}
              role="presentation"
            >
              here
            </Link>
          </Typography>
        </Box>
        <Typography variant="subtitle2">{files}</Typography>
        {!status?.success && status?.msg && (
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            bgcolor="error.100"
            width="100%"
            py={1}
            justifyContent="center"
          >
            <ReportProblemOutlinedIcon color="error" />
            <Typography variant="subtitle1" color="error">
              {status.msg}
            </Typography>
          </Stack>
        )}
      </StyledImageUploadBox2>
    );
  }
  return (
    <StyledImageUploadBox
      {...getRootProps({ className: "dropzone" })}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "pointer",
        // borderColor: status.success === false ? "red" : "yellow"
      }}
      onClick={open}
    >
      <input {...getInputProps()} />
      {isLoading ? (
        <CircularLoaderWithLabel />
      ) : (
        <Box zIndex="100" position="relative">
          {status?.msg && status?.success ? (
            <Box overflow="hidden" height="4.375rem" width="4.375rem">
              <iframe
                title="doc"
                height="100%"
                width="100%"
                src={
                  Array.isArray(status.key)
                    ? `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${status.key[0]}`
                    : `${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${status.key}`
                }
              />
            </Box>
          ) : (
            <DocumentUploadSvg />
          )}
        </Box>
      )}
      <Box mt={2.5}>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontWeight={400}
          fontSize={{ lg: "14px", md: "14px", sm: "12px", xs: "12px" }}
          lineHeight={{
            lg: "19.6px",
            md: "19.6px",
            sm: "14.4px",
            xs: "14.4px",
          }}
          letterSpacing="1%"
          color="rgba(32, 28, 26, 0.55)"
          textAlign="center"
        >
          Drop and drop or browse files here{" "}
          {/* <Link
            onClick={open}
            color="primary"
            underline="hover"
            sx={{ cursor: 'pointer' }}
            role="presentation"
          >
            browse
          </Link> */}
        </Typography>
      </Box>
      <Typography variant="subtitle2">{files}</Typography>
      {!status?.success && status?.msg && (
        <Stack
          direction="row"
          alignItems="center"
          gap={1}
          bgcolor="error.100"
          width="100%"
          py={1}
          justifyContent="center"
        >
          <ReportProblemOutlinedIcon color="error" />
          <Typography variant="subtitle1" color="error">
            {status.msg}
          </Typography>
        </Stack>
      )}
    </StyledImageUploadBox>
  );
};

export default DropzoneHOC(Dropzone);
