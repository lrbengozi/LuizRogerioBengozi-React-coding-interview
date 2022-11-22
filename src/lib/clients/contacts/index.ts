import { MockContactsClient } from './mockContactsClient';
import { ContactsClient } from './contactsClient';

export * from './contactTypes';

const contactsClient = process.env.NODE_ENV === 'production' ? 
  new ContactsClient() : 
  new MockContactsClient(75);

export { contactsClient };
