import { Typography } from "@mui/material";
import { useFormikContext } from "formik";
import React from "react";
import type { IDropzoneHOC } from "@/components/common/form-components/utils/types";

function DropzoneHOC(WrappedComponent: any) {
  return function ({
    name,
    label,
    variant,
    keyName,
    sample_key,
    handleChange,
    type = "Requried",
  }: IDropzoneHOC) {
    const { errors, touched }: any = useFormikContext();
    const isImageUploaded = sample_key !== undefined;
    const hasError =
      type === "Requried" && !isImageUploaded && errors[name] && touched[name];

    const renderSample = () => {
      if (name !== "business_logo" && name !== "business_certificate") {
        return (
          <button type="button" style={{ marginLeft: "2px" }}>
            <a
              type="button"
              href={`${process.env.NEXT_PUBLIC_IMAGE_DISTRIBUTION_KEY}/${sample_key}`}
              target="_"
            >
              Sample
            </a>
          </button>
        );
      }
    };

    // const {  errors, touched }: any = useFormikContext();
    return (
      <>
        <Typography
          fontFamily="HankenGroteskRegular"
          fontWeight={400}
          fontSize={{ lg: "16px", md: "16px", sm: "14px", xs: "14px" }}
          lineHeight={{
            lg: "22.4px",
            md: "22.4px",
            sm: "19.6px",
            xs: "19.6px",
          }}
          color="rgba(32, 28, 26, 0.9)"
        >
          {label}
          {sample_key && renderSample()}
        </Typography>
        {/* <div
            style={{ border: hasError ? '1px solid red' : '1px dashed #BFC6D5' }}
          > */}
        <WrappedComponent
          keyName={keyName}
          variant={variant}
          name={name}
          handleChange={handleChange}
          type={type}
        />
        {/* </div> */}
        {hasError && (
          <Typography variant="body1" color="error">
            {errors[name]}
          </Typography>
        )}
      </>
    );
  };
}

export default DropzoneHOC;
