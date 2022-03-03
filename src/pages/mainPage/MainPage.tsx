import React, { useEffect, useCallback, ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '@src/app/hooks';
import { createUseStyles } from 'react-jss';
import { IContactStateItem } from '@src/types/contacts.type';
import { toast } from 'react-toastify';
import { fetchContacts, toggleContactStatus } from '@src/features/contacts/contacts.slice';
import LoadButton from './components/loadButton/LoadButton';
import PersonInfoList from './components/personInfoList/PersonInfoList';
import SelectedContacts from './components/selectedContacts/SelectedContacts';

function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const classes = useStyles();

  const contactItems = useAppSelector(state => state.contacts.items);
  const isLoading = useAppSelector(state => state.contacts.isLoading);
  const shouldShowLoadButton = useAppSelector(state => state.contacts.hasMore);
  const contactsErrorMessage = useAppSelector(state => state.contacts.errorMessage);
  const selectedItemsCount = contactItems.filter((item: IContactStateItem) => !!item.isActive).length;

  const fetchData = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onPersonInfoItemClicked = useCallback((itemId: string) => dispatch(toggleContactStatus(itemId)), [dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (contactsErrorMessage) {
      toast.error(contactsErrorMessage, {
        theme: 'colored',
      });
    }
  }, [contactsErrorMessage]);

  return (
    <div className={classes.mainPageContainer}>
      <SelectedContacts selectedContactsCount={selectedItemsCount} />
      <div>
        <PersonInfoList contactItems={contactItems} onClick={onPersonInfoItemClicked} />
      </div>
      {shouldShowLoadButton && (
        <div className={classes.loadMore}>
          <LoadButton isLoading={isLoading} onClick={fetchData} />
        </div>
      )}
    </div>
  );
}

const useStyles = createUseStyles({
  mainPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    width: '100%',
    margin: '20px 0',
    paddingBottom: 50,
  },
  loadMore: {
    display: 'flex',
    marginTop: 30,

    '& > *': {
      textAlign: 'center',
    },
  },
});

export default MainPage;
