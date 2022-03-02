import { combineReducers } from 'redux';
import contacts from './contacts/contacts.reducer';

const reducers = combineReducers({
  contacts,
});

export default reducers;
