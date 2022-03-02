import type { Dispatch } from 'react';
import type { AnyAction } from 'redux';
import {
  toggleContactStatus,
  fetchContacts,
  TOGGLE_CONTACT_STATUS,
  SET_CONTACTS_LOADING,
  SET_CONTACTS_FETCH_ERROR,
  APPEND_CONTACTS,
} from './contacts.action';

const mockApiResponse = 'mockApiResponse';
let mockFetchContactsFromApi: () => Promise<string>;
jest.mock('@src/services/api/api', () => ({
  __esModule: true,
  default: () => mockFetchContactsFromApi(),
}));

describe('contacts.action', () => {
  describe('fetchContacts action', () => {
    beforeEach(() => {
      mockFetchContactsFromApi = jest.fn(async () => mockApiResponse);
    });

    it('dispatches SET_CONTACTS_LOADING action with true', () => {
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => Promise<void> = fetchContacts();

      dispatcher(dispatch);

      expect(dispatch.mock.calls[0][0]).toEqual({
        payload: true,
        type: SET_CONTACTS_LOADING,
      });
    });

    it('dispatches SET_CONTACTS_FETCH_ERROR action', () => {
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => Promise<void> = fetchContacts();

      dispatcher(dispatch);

      expect(dispatch.mock.calls[1][0]).toEqual({
        payload: '',
        type: SET_CONTACTS_FETCH_ERROR,
      });
    });

    it('dispatches APPEND_CONTACTS action when api returns data', async () => {
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => Promise<void> = fetchContacts();

      await dispatcher(dispatch);

      expect(dispatch.mock.calls[2][0]).toEqual({
        payload: mockApiResponse,
        type: APPEND_CONTACTS,
      });
    });

    it('dispatches SET_CONTACTS_LOADING action with false when api returns data', async () => {
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => Promise<void> = fetchContacts();

      await dispatcher(dispatch);

      expect(dispatch.mock.calls[3][0]).toEqual({
        payload: false,
        type: SET_CONTACTS_LOADING,
      });
    });

    it('dispatches SET_CONTACTS_FETCH_ERROR action when api returns an error', async () => {
      mockFetchContactsFromApi = jest.fn(async () => {
        throw Error('this is error message mock');
      });
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => Promise<void> = fetchContacts();

      await dispatcher(dispatch);

      expect(dispatch.mock.calls[2][0]).toEqual({
        payload: 'Error occured with message: Error: this is error message mock. Try again later...',
        type: SET_CONTACTS_FETCH_ERROR,
      });
    });

    it('dispatches SET_CONTACTS_LOADING action with false when api returns an error', async () => {
      mockFetchContactsFromApi = jest.fn(async () => {
        throw Error('this is error message mock');
      });
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => Promise<void> = fetchContacts();

      await dispatcher(dispatch);

      expect(dispatch.mock.calls[3][0]).toEqual({
        payload: false,
        type: SET_CONTACTS_LOADING,
      });
    });
  });

  describe('toggleContactStatus action', () => {
    it('dispatches TOGGLE_CONTACT_STATUS action with proper params', () => {
      const dispatch: jest.Mock<unknown> = jest.fn();
      const dispatcher: (dispatch: Dispatch<AnyAction>) => void = toggleContactStatus({
        isActive: true,
        itemId: 'itemIdMock',
      });

      dispatcher(dispatch);

      expect(dispatch).toHaveBeenCalledWith({
        payload: { isActive: true, itemId: 'itemIdMock' },
        type: TOGGLE_CONTACT_STATUS,
      });
    });
  });
});
