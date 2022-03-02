import React, { ReactElement } from 'react';
import { ScaleLoader } from 'react-spinners';
import ButtonBase from '@src/components/buttonBase/ButtonBase';

interface Props {
  isLoading: boolean;
  onClick: () => void;
}

function LoadButton({ isLoading, onClick }: Props): ReactElement {
  return (
    <div style={{ width: '100%' }}>
      {isLoading ? <ScaleLoader /> : <ButtonBase onClick={onClick} label="Load more" />}
    </div>
  );
}

export default LoadButton;
