import { IContactStateItem } from '@src/types/contacts.type';
import { getStoreWithState, Store, store } from 'app/store';
import { fetchContacts, toggleContactStatus } from './contacts.slice';

const initialStoreValue = [
  {
    id: 'idMockInitial1',
    jobTitle: 'titleMockInitial1',
    emailAddress: 'emailMockInitital1',
    firstNameLastName: 'nameMockInitial1',
  },
  {
    id: 'idMockInitial2',
    jobTitle: 'titleMockInitial2',
    emailAddress: 'emailMockInitital2',
    firstNameLastName: 'nameMockInitial2',
    isActive: true,
  },
] as IContactStateItem[];
const mockApiResponse = [
  {
    id: 'idMock2',
    jobTitle: 'titleMock2',
    emailAddress: 'emailMock2',
    firstNameLastName: 'nameMock2',
  },
  {
    id: 'idMock3',
    jobTitle: 'titleMock3',
    emailAddress: 'emailMock3',
    firstNameLastName: 'nameMock3',
  },
] as IContactStateItem[];
let mockFetchContactsFromApi: () => Promise<IContactStateItem[]>;
jest.mock('@src/services/api/api', () => ({
  __esModule: true,
  default: () => mockFetchContactsFromApi(),
}));

describe('useContactsStore', () => {
  let storeMock: Store;

  beforeEach(() => {
    mockFetchContactsFromApi = jest.fn(async () => mockApiResponse);
    storeMock = getStoreWithState({
      ...store.getState(),
      contacts: {
        ...store.getState().contacts,
        items: [...initialStoreValue],
      },
    });
  });

  describe('fetchContacts', () => {
    it('sets isLoading to true', async () => {
      mockFetchContactsFromApi = () => new Promise(() => {});
      expect(storeMock.getState().contacts.isLoading).toEqual(false);

      storeMock.dispatch(fetchContacts());

      expect(storeMock.getState().contacts.isLoading).toEqual(true);
    });

    it('sets error message to empty', async () => {
      mockFetchContactsFromApi = () => new Promise(() => {});
      expect(storeMock.getState().contacts.errorMessage).toEqual('');

      storeMock.dispatch(fetchContacts());

      expect(storeMock.getState().contacts.errorMessage).toEqual('');
    });

    it('sets isLoading to false after fetch', async () => {
      await storeMock.dispatch(fetchContacts());

      expect(storeMock.getState().contacts.isLoading).toEqual(false);
    });

    it('appends fetched items to store', async () => {
      expect(storeMock.getState().contacts.items).toEqual([...initialStoreValue]);

      await storeMock.dispatch(fetchContacts());

      expect(storeMock.getState().contacts.items).toEqual([...initialStoreValue, ...mockApiResponse]);
    });

    it('sets errorMessage when error is given', async () => {
      mockFetchContactsFromApi = () =>
        new Promise((resolve, reject) => {
          reject(new Error('error message mock'));
        });

      expect(storeMock.getState().contacts.errorMessage).not.toEqual('Error: error message mock');

      await storeMock.dispatch(fetchContacts());

      expect(storeMock.getState().contacts.errorMessage).toEqual('Error: error message mock');
    });
  });

  describe('toggleContactStatus', () => {
    it('sets isActive to true when item isActive property is not given', async () => {
      expect(storeMock.getState().contacts.items[0].isActive).toEqual(undefined);

      storeMock.dispatch(toggleContactStatus('idMockInitial1'));

      expect(storeMock.getState().contacts.items[0].isActive).toEqual(true);
    });

    it('sets isActive to true when item isActive property is true', async () => {
      expect(storeMock.getState().contacts.items[1].isActive).toEqual(true);

      storeMock.dispatch(toggleContactStatus('idMockInitial2'));

      expect(storeMock.getState().contacts.items[1].isActive).toEqual(false);
    });
  });
});
