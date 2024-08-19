import { IApplication } from "@/types/application";
import { AlertButtonProps } from "@/page-components/dashboard/utils/type";

export interface ApplicationStatus {
  paid: IApplication[];
  unpaid: IApplication[];
}

export interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
}

export type PaymentButtonProps = AlertButtonProps;
