import React, { useEffect, useCallback, ReactElement } from 'react';
import { useAppSelector, useAppDispatch } from '@src/app/hooks';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  toggleContactStatus,
  itemsSelector,
  selectedItemsSelector,
  isLoadingSelector,
  hasMoreSelector,
  errorMessageSelector,
} from '@src/features/contacts/contacts.slice';
import LoadButton from './components/loadButton/LoadButton';
import PersonInfoList from './components/personInfoList/PersonInfoList';
import SelectedContacts from './components/selectedContacts/SelectedContacts';
import useFetchData from './hooks/useFetchData';

function MainPage(): ReactElement {
  const dispatch = useAppDispatch();
  const { fetchData } = useFetchData();
  const contactItems = useAppSelector(itemsSelector);
  const isLoading = useAppSelector(isLoadingSelector);
  const shouldShowLoadButton = useAppSelector(hasMoreSelector);
  const contactsErrorMessage = useAppSelector(errorMessageSelector);
  const selectedItemsCount = useAppSelector(selectedItemsSelector).length;
  const onPersonInfoItemClicked = useCallback((itemId: string) => dispatch(toggleContactStatus(itemId)), [dispatch]);

  useEffect(() => {
    if (contactsErrorMessage) {
      toast.error(contactsErrorMessage, {
        theme: 'colored',
      });
    }
  }, [contactsErrorMessage]);

  return (
    <MainPageContainer>
      <SelectedContacts selectedContactsCount={selectedItemsCount} />
      <ListContainer>
        <PersonInfoList contactItems={contactItems} onClick={onPersonInfoItemClicked} />
      </ListContainer>
      {shouldShowLoadButton && (
        <LoadButtonContainer>
          <LoadButton isLoading={isLoading} onClick={fetchData} />
        </LoadButtonContainer>
      )}
    </MainPageContainer>
  );
}

const MainPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  margin: 20px 0;
  padding-bottom: 50px;
`;

const ListContainer = styled.div`
  display: block;
`;

const LoadButtonContainer = styled.div`
  display: flex;
  margintop: 30;

  & > * {
    text-align: center;
  }
`;

export default MainPage;
