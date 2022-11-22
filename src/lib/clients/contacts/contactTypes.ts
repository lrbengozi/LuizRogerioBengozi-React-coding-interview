import { IPerson } from "@lib/models/person";

export interface IContactListArgs {
  pageNumber: number;
  pageSize: number;
}

export interface IContactListResult {
  data: IPerson[];
  totalCount: number;
}

export interface IContactsClient {
  contactList(opts: IContactListArgs): Promise<IContactListResult>; 
}
