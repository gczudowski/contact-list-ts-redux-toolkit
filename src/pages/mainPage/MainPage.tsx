import React, { useEffect, useCallback, ReactElement } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUseStyles } from 'react-jss';
import { toggleContactStatus, fetchContacts } from '@src/store/contacts/contacts.action';
import { RootState } from '@src/types/store.type';
import { IContactStateItem } from '@src/types/contacts.type';
import { toast } from 'react-toastify';
import LoadButton from './components/loadButton/LoadButton';
import PersonInfoList from './components/personInfoList/PersonInfoList';
import SelectedContacts from './components/selectedContacts/SelectedContacts';

function MainPage(): ReactElement {
  const dispatch = useDispatch();
  const classes = useStyles();
  const contactItems = useSelector((state: RootState): IContactStateItem[] => state.contacts.items);
  const isLoading = useSelector((state: RootState): boolean => state.contacts.isLoading);
  const shouldShowLoadButton = useSelector((state: RootState): boolean => state.contacts.hasMore);
  const contactsErrorMessage = useSelector((state: RootState): string => state.contacts.errorMessage);
  const selectedItemsCount = contactItems.filter((item: IContactStateItem): boolean => !!item.isActive).length;

  const fetchData = useCallback(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onPersonInfoItemClicked = useCallback(
    ({ isActive, itemId }: { isActive: boolean; itemId: string }) =>
      dispatch(toggleContactStatus({ isActive, itemId })),
    [dispatch],
  );

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
