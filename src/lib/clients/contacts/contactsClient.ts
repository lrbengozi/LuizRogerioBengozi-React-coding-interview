import { IPerson } from '@lib/models/person';
import { IContactsClient, IContactListArgs, IContactListResult } from './contactTypes';

export class ContactsClient implements IContactsClient {
  contactList(_opts: IContactListArgs): Promise<IContactListResult> {
    throw new Error('Method not implemented.');
  }
  getContactById(id: string): Promise<IPerson> {
    throw new Error(`Getting contact by id ${id} not implemented.`);
  }
  updateContact(id: string, update: IPerson): Promise<IPerson> {
    throw new Error(`Updating contact by id ${id} on ${update} not implemented.`);
  }
}
