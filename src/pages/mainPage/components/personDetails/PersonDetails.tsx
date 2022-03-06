import React, { ReactElement } from 'react';
import styled from 'styled-components';

type Props = {
  firstNameLastName: string;
  jobTitle: string;
};

function PersonDetails({ firstNameLastName, jobTitle }: Props): ReactElement {
  return (
    <Container>
      <FirstNameLastNameLabel>{firstNameLastName}</FirstNameLastNameLabel>
      <JobTitleLabel>{jobTitle.toUpperCase()}</JobTitleLabel>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const FirstNameLastNameLabel = styled.div`
  padding-bottom: 0;
  color: #333333;
  font-size: 20px;
  font-weight: 700;
`;
const JobTitleLabel = styled.div`
  color: #e74c3c;
  font-size: 13px;
  fontweight: 400;
`;

export default PersonDetails;
