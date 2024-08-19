import {
  StepConnector,
  stepConnectorClasses,
  styled,
  TableCell,
  tableCellClasses,
} from "@mui/material";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey.A400,
    color: `${theme.palette.grey[300]} !important`,
    border: 0,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontStyle: "normal",
    fontWeight: 400,
    color: `${theme.palette.grey[500]} !important`,
  },
}));

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 8,
    width: "100%",
    left: "calc(-50%)",
    zIndex: 1,
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "var(--green-400, #479F76)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "var(--green-400, #479F76)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "var(--green-100, #D1E7DD)",
    borderTopWidth: 5,
    borderRadius: 1,
    height: 8,
  },
}));

export const QontoStepIconRoot = styled("div")<{
  ownerState: { active?: boolean };
}>(({ theme, ownerState }) => ({
  color: "#479F76",
  display: "flex",
  height: 22,
  alignItems: "center",
  ...(ownerState.active && {
    color: "479F76",
  }),
  "& .QontoStepIcon-completedIcon": {
    color: "479F76",
    zIndex: 1,
    fontSize: 18,
  },
  "& .QontoStepIcon-circle": {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    zIndex: 2,
    backgroundColor: "var(--green-100, #D1E7DD)",
  },
}));
