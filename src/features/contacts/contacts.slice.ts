import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import fetchContactsFromApi from '@src/services/api/api';
import { IContact, IContactState, IContactStateItem } from '@src/types/contacts.type';

const initialState: IContactState = {
  items: [] as IContactStateItem[],
  isLoading: false,
  hasMore: true,
  errorMessage: '',
};

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
        .map((item: IContactStateItem) => {
          if (item.id === itemId) {
            return { ...item, isActive: !item.isActive };
          }
          return item;
        })
        .sort(sortContactItems);
    },
  },
  extraReducers: {
    [fetchContacts.pending.type]: state => {
      state.isLoading = true;
      state.errorMessage = '';
    },
    [fetchContacts.fulfilled.type]: (state, { payload }: PayloadAction<IContact[]>) => {
      state.isLoading = false;
      state.items = [...state.items, ...payload];
    },
    [fetchContacts.rejected.type]: (state, { payload }) => {
      state.isLoading = false;
      state.errorMessage = payload;
    },
  },
});

export const { toggleContactStatus } = contactsSlice.actions;
export default contactsSlice.reducer;
