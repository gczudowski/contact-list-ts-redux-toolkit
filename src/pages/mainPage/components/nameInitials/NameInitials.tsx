import React, { ReactElement } from 'react';
import { getNameInitials } from '@src/services/nameInitials/nameInitials';
import styled from 'styled-components';

type Props = {
  firstNameLastName: string;
};

function PersonInfoItem({ firstNameLastName }: Props): ReactElement {
  const nameInitials = getNameInitials(firstNameLastName);

  return <Container>{nameInitials}</Container>;
}

const Container = styled.div`
  display: flex;
  height: 32px;
  width: 32px;
  flex: 32px 0 0;
  align-items: center;
  justify-content: center;
  border-style: solid;
  border-width: 1;
  border-color: #343434;
  border-radius: 100%;
  padding: 0;
`;

export default PersonInfoItem;
