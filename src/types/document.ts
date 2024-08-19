import { ICoreDocument } from "./core-document";

export interface IDocument {
  name: string;
  required: ICoreDocument[];
  optional: ICoreDocument[];
  others: ICoreDocument[];
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}
