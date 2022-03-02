import type { Dispatch } from 'react';
import type { AnyAction } from 'redux';
import fetchContactsFromApi from '@src/services/api/api';
import { IContact } from '@src/types/contacts.type';

export const APPEND_CONTACTS = 'APPEND_CONTACTS';
export const TOGGLE_CONTACT_STATUS = 'TOGGLE_CONTACT_STATUS';
export const SET_CONTACTS_LOADING = 'SET_CONTACTS_LOADING';
export const SET_CONTACTS_FETCH_ERROR = 'SET_CONTACTS_FETCH_ERROR';

const createAppendContactsAction = (payload: IContact[]): AnyAction => ({
  type: APPEND_CONTACTS,
  payload,
});

const createToggleContactStatusAction = (payload: { isActive: boolean; itemId: string }): AnyAction => ({
  type: TOGGLE_CONTACT_STATUS,
  payload,
});

const createSetContactsLoadingAction = (payload: boolean): AnyAction => ({
  type: SET_CONTACTS_LOADING,
  payload,
});

const createSetContactsFetchErrorAction = (payload: string): AnyAction => ({
  type: SET_CONTACTS_FETCH_ERROR,
  payload,
});

export const fetchContacts =
  () =>
  async (dispatch: Dispatch<AnyAction>): Promise<void> => {
    try {
      dispatch(createSetContactsLoadingAction(true));
      dispatch(createSetContactsFetchErrorAction(''));
      dispatch(createAppendContactsAction(await fetchContactsFromApi()));
    } catch (error) {
      dispatch(createSetContactsFetchErrorAction(`Error occured with message: ${error}. Try again later...`));
    } finally {
      dispatch(createSetContactsLoadingAction(false));
    }
  };

export const toggleContactStatus =
  ({ isActive, itemId }: { isActive: boolean; itemId: string }) =>
  (dispatch: Dispatch<AnyAction>): void => {
    dispatch(createToggleContactStatusAction({ isActive, itemId }));
  };
