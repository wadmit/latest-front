import { Column } from "@/page-components/dashboard/applications/types";

export const columns: readonly Column[] = [
  { id: "university", label: "University", minWidth: 130 },
  { id: "program", label: "Program", minWidth: 110 },
  { id: "start_date", label: "Start Date", minWidth: 110 },
  { id: "Application Fee", label: "Application Fee", minWidth: 140 },
  { id: "payment", label: "Payment", minWidth: 90 },
  {
    id: "actions",
    label: "Actions",
    minWidth: 110,
  },
];

export const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July ",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const applicationStepperSteps = [
  "Pay Application Fee",
  "Upload Documents",
  "Submission",
  "Decisions",
  "Pre-enrollment",
  "Enrolled",
];

export const getMonthAndYear = (date?: Date | number | string): string => {
  if (date) {
    const dateInReal = new Date(date);
    return `${allMonths[dateInReal.getMonth()]} ${dateInReal.getFullYear()}`;
  }
  return "N/A";
};
