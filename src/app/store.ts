import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '@src/features/contacts/contacts.slice';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
