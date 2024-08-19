export interface Name {
  name: string;
  university: string;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  id: string;
}

export interface IDocuments {
  name: Name;
  link: string[];
  link_key: string[];
  _id: string;
  updatedAt?: Date;
}
