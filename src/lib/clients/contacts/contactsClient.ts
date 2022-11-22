import { IContactsClient, IContactListArgs, IContactListResult } from './contactTypes';

export class ContactsClient implements IContactsClient {
  contactList(_opts: IContactListArgs): Promise<IContactListResult> {
    throw new Error('Method not implemented.');
  }
}
