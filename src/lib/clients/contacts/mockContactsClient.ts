import { faker } from '@faker-js/faker';

import { IPerson } from '@lib/models/person';
import { IContactsClient, IContactListArgs, IContactListResult } from './contactTypes';

function seedContacts(count: number) {
  const res: IPerson[] = [];

  for (let i = 0; i < count; i++) {
    res.push({
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName()
    });
  }

  return res;
}

const delay = (ms: number): Promise<void> => new Promise(res => setTimeout(res, ms));

export class MockContactsClient implements IContactsClient {
  private readonly apiContacts: IPerson[];

  constructor(mockPersonsCount: number) {
    this.apiContacts = seedContacts(mockPersonsCount);
  }

  async contactList(opts: IContactListArgs): Promise<IContactListResult> {
    const { pageNumber = 1, pageSize = 10 } = opts;

    await delay(1000);
    const skip = (pageNumber - 1) * pageSize;
    const take = pageSize;

    return {
      data: this.apiContacts.slice(skip, skip + take),
      totalCount: this.apiContacts.length
    };
  }

  getContactById(id: string): Promise<IPerson> {
    throw new Error(`Getting contact by id ${id} not implemented.`);
  }
  updateContact(id: string, update: IPerson): Promise<IPerson> {
    throw new Error(`Updating contact by id ${id} on ${update} not implemented.`);
  }
}
