import React, { ReactElement } from 'react';
import { ScaleLoader } from 'react-spinners';
import ButtonBase from '@src/components/buttonBase/ButtonBase';
import styled from 'styled-components';

interface Props {
  isLoading: boolean;
  onClick: () => void;
}

function LoadButton({ isLoading, onClick }: Props): ReactElement {
  return <Container>{isLoading ? <ScaleLoader /> : <ButtonBase onClick={onClick} label="Load more" />}</Container>;
}

const Container = styled.div`
  width: 100%;
`;

export default LoadButton;
