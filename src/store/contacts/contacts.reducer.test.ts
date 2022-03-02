import { IContactStateItem, IContactState } from '@src/types/contacts.type';
import contactsReducer from './contacts.reducer';
import {
  TOGGLE_CONTACT_STATUS,
  SET_CONTACTS_LOADING,
  SET_CONTACTS_FETCH_ERROR,
  APPEND_CONTACTS,
} from './contacts.action';

const initialContactsMock: IContactStateItem[] = [
  {
    id: '1',
    jobTitle: 'jobTitleMock1',
    emailAddress: 'emailAddressMock1',
    firstNameLastName: 'firstNameLastNameMock1',
  },
];
const newContactsMock: IContactStateItem[] = [
  {
    id: '2',
    jobTitle: 'jobTitleMock2',
    emailAddress: 'emailAddressMock2',
    firstNameLastName: 'firstNameLastNameMock2',
  },
];

describe('contacts.reducer', () => {
  let state: IContactState;

  beforeEach(() => {
    state = {
      items: [],
      isLoading: false,
      hasMore: true,
      errorMessage: '',
    };
  });

  describe('handles APPEND_CONTACTS', () => {
    beforeEach(() => {
      state.items = [...initialContactsMock];
    });

    it('sets state properly when given payload with new contacts', () => {
      expect(
        contactsReducer(state, {
          type: APPEND_CONTACTS,
          payload: newContactsMock,
        }),
      ).toEqual({
        items: [...initialContactsMock, ...newContactsMock],
        isLoading: false,
        hasMore: true,
        errorMessage: '',
      });
    });

    it('sets state properly when given payload with no contacts', () => {
      expect(
        contactsReducer(state, {
          type: APPEND_CONTACTS,
          payload: [],
        }),
      ).toEqual({
        items: [...initialContactsMock],
        isLoading: false,
        hasMore: false,
        errorMessage: '',
      });
    });
  });

  describe('handles TOGGLE_CONTACT_STATUS', () => {
    beforeEach(() => {
      state.items = [...initialContactsMock, ...newContactsMock];
    });

    it('sets state properly when selecting first', () => {
      expect(
        contactsReducer(state, {
          type: TOGGLE_CONTACT_STATUS,
          payload: { itemId: '1', isActive: false },
        }),
      ).toEqual({
        items: [...initialContactsMock, ...newContactsMock].map(item => {
          if (item.id === '1') {
            return {
              ...item,
              isActive: true,
            };
          }
          return item;
        }),
        isLoading: false,
        hasMore: true,
        errorMessage: '',
      });
    });

    it('sets state properly when selecting second', () => {
      expect(
        contactsReducer(state, {
          type: TOGGLE_CONTACT_STATUS,
          payload: { itemId: '2', isActive: false },
        }),
      ).toEqual({
        items: [...newContactsMock, ...initialContactsMock].map(item => {
          if (item.id === '2') {
            return {
              ...item,
              isActive: true,
            };
          }
          return item;
        }),
        isLoading: false,
        hasMore: true,
        errorMessage: '',
      });
    });
  });

  describe('handles SET_CONTACTS_LOADING', () => {
    it('sets state properly when given payload true', () => {
      expect(
        contactsReducer(state, {
          type: SET_CONTACTS_LOADING,
          payload: true,
        }),
      ).toEqual({
        items: [],
        isLoading: true,
        hasMore: true,
        errorMessage: '',
      });
    });
  });

  describe('handles SET_CONTACTS_FETCH_ERROR', () => {
    it('sets state properly when given payload true', () => {
      expect(
        contactsReducer(state, {
          type: SET_CONTACTS_FETCH_ERROR,
          payload: 'this is error mock',
        }),
      ).toEqual({
        items: [],
        isLoading: false,
        hasMore: true,
        errorMessage: 'this is error mock',
      });
    });
  });
});
