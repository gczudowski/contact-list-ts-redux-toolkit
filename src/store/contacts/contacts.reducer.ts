import { IContactStateItem, IContactState } from '@src/types/contacts.type';
import type { AnyAction } from 'redux';
import {
  APPEND_CONTACTS,
  TOGGLE_CONTACT_STATUS,
  SET_CONTACTS_LOADING,
  SET_CONTACTS_FETCH_ERROR,
} from './contacts.action';

const initialState: IContactState = {
  items: [],
  isLoading: false,
  hasMore: true,
  errorMessage: '',
};

const sortContactItems = (firstItem: IContactStateItem, secondItem: IContactStateItem): number => {
  if (!!firstItem.isActive === !!secondItem.isActive) {
    return parseInt(firstItem.id, 10) - parseInt(secondItem.id, 10);
  }

  return firstItem.isActive ? -1 : 1;
};

export default function app(state: IContactState = initialState, action: AnyAction): IContactState {
  switch (action.type) {
    case APPEND_CONTACTS:
      return {
        ...state,
        items: [...state.items, ...action.payload],
        hasMore: action.payload.length > 0,
      };
    case TOGGLE_CONTACT_STATUS:
      return {
        ...state,
        items: state.items
          .map((item: IContactStateItem) => {
            if (item.id === action.payload.itemId) {
              return { ...item, isActive: !action.payload.isActive };
            }
            return item;
          })
          .sort(sortContactItems),
      };
    case SET_CONTACTS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_CONTACTS_FETCH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}
