import React, { ReactElement } from 'react';
import styled from 'styled-components';
import PersonInfoItem from '@src/pages/mainPage/components/personInfoItem/PersonInfoItem';
import { IContactStateItem } from '@src/types/contacts.type';
import { Flipper } from 'react-flip-toolkit';

type Props = {
  contactItems: IContactStateItem[];
  onClick: (itemId: string) => void;
};

function PersonInfoList({ contactItems, onClick }: Props): ReactElement {
  return (
    <Container>
      <Flipper flipKey={contactItems.map((item: IContactStateItem): string => item.id).join('')}>
        {contactItems.map((contactItem: IContactStateItem) => (
          <PersonInfoItem key={contactItem.id} contactItem={contactItem} onClick={onClick} />
        ))}
      </Flipper>
    </Container>
  );
}

const Container = styled.div`
  display: block;
  overflow-anchor: none;
`;

export default PersonInfoList;
