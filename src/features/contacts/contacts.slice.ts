import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchContactsFromApi from '@src/services/api/api';
import { IContact, IContactState, IContactStateItem } from '@src/types/contacts.type';
import type { RootState } from '@src/app/store';

const initialState: IContactState = {
  items: [] as IContactStateItem[],
  isLoading: false,
  hasMore: true,
  errorMessage: '',
};

const itemsSelector = (state: RootState) => state.contacts.items;
const selectedItemsSelector = (state: RootState) =>
  itemsSelector(state).filter((item: IContactStateItem) => !!item.isActive).length;
const isLoadingSelector = (state: RootState) => state.contacts.isLoading;
const hasMoreSelector = (state: RootState) => state.contacts.hasMore;
const errorMessageSelector = (state: RootState) => state.contacts.errorMessage;
export { itemsSelector, selectedItemsSelector, isLoadingSelector, hasMoreSelector, errorMessageSelector };

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (payload, { rejectWithValue }) => {
  try {
    return await fetchContactsFromApi();
  } catch (err) {
    return rejectWithValue(`${err}`);
  }
});

const sortContactItems = (firstItem: IContactStateItem, secondItem: IContactStateItem): number => {
  if (!!firstItem.isActive === !!secondItem.isActive) {
    return parseInt(firstItem.id, 10) - parseInt(secondItem.id, 10);
  }

  return firstItem.isActive ? -1 : 1;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    toggleContactStatus: (state, { payload: itemId }: PayloadAction<string>) => {
      state.items = state.items
        .map((item: IContactStateItem) => (item.id === itemId ? { ...item, isActive: !item.isActive } : item))
        .sort(sortContactItems);
    },
  },
  extraReducers: {
    [fetchContacts.pending.type]: state => {
      state.isLoading = true;
      state.errorMessage = '';
    },
    [fetchContacts.fulfilled.type]: (state, { payload: newItems }: PayloadAction<IContact[]>) => {
      state.isLoading = false;
      state.items = [...state.items, ...newItems];
    },
    [fetchContacts.rejected.type]: (state, { payload: errorMessage }: PayloadAction<string>) => {
      state.isLoading = false;
      state.errorMessage = errorMessage;
    },
  },
});

export const { toggleContactStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
