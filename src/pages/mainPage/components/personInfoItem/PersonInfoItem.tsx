import React, { ReactElement, memo } from 'react';
import styled from 'styled-components';
import CONFIG from 'config';
import NameInitials from '@src/pages/mainPage/components/nameInitials/NameInitials';
import PersonDetails from '@src/pages/mainPage/components/personDetails/PersonDetails';
import { IContactStateItem } from '@src/types/contacts.type';
import { MediaQueries } from '@src/types/css';
import { Flipped } from 'react-flip-toolkit';

type Props = {
  contactItem: IContactStateItem;
  onClick: (itemId: string) => void;
};

function PersonInfoItem({ contactItem, onClick }: Props): ReactElement {
  const { firstNameLastName, jobTitle, emailAddress, isActive, id: itemId } = contactItem;

  return (
    <Flipped key={contactItem.id} flipId={contactItem.id}>
      <Container isActive={!!isActive} onClick={() => onClick(itemId)}>
        <Header>
          <NameInitials firstNameLastName={firstNameLastName} />
          <PersonDetails firstNameLastName={firstNameLastName} jobTitle={jobTitle} />
        </Header>
        <EmailAddress>{emailAddress}</EmailAddress>
      </Container>
    </Flipped>
  );
}

const Container = styled.div`
  display: flex;
  min-height: 102px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  margin: 10px 0;
  cursor: pointer;
  border-style: solid;
  border-width: 2;
  padding: 17px;
  gap: 35px;
  border-color: ${({ isActive }: { isActive: boolean }) => (isActive ? 'red' : 'transparent')};
  background-color: ${({ isActive }: { isActive: boolean }) => (isActive ? '#fffcfc' : '#fff')};

  ${[CONFIG.MEDIA_QUERIES[MediaQueries.DESKTOP] as string]} {
    &:hover {
      border-color: pink;
    }
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
`;

const EmailAddress = styled.div`
  color: #666666;
  font-size: 14px;
  line-height: 1.8em;
  overflow: hidden;
  position: relative;
  display: inline-block;
  margin: 0 5px 0 5px;
  text-align: center;
  text-decoration: none;
  text-overflow: ellipsis;
  whitespace: nowrap;
  max-width: 100%;
`;

export default memo(PersonInfoItem);
