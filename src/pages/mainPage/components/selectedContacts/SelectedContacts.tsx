import React, { ReactElement } from 'react';
import styled from 'styled-components';

interface Props {
  selectedContactsCount: number;
}

function SelectedContacts({ selectedContactsCount }: Props): ReactElement {
  return <SelectedContactsContainer>Selected contacts: {selectedContactsCount}</SelectedContactsContainer>;
}

const SelectedContactsContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export default SelectedContacts;
