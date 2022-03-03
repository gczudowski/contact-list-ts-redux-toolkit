import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '@src/features/contacts/contacts.slice';

const reducer = {
  contacts: contactsReducer,
};

export const store = configureStore({
  reducer,
});

export function getStoreWithState(preloadedState?: RootState) {
  return configureStore({ reducer, preloadedState });
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type Store = typeof store;
