import React, { ReactElement } from 'react';

interface Props {
  onClick: () => void;
  label: string;
}

function ButtonBase({ onClick, label }: Props): ReactElement {
  return (
    <button style={styles.buttonBase} onClick={onClick} type="button">
      {label}
    </button>
  );
}

const styles = {
  buttonBase: {
    display: 'flex',
    width: '100%',
    minHeight: 36,
    fontSize: 18,
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    boxShadow: '0px 1px 2px 0px rgb(0 0 0 / 15%)',
  },
};

export default ButtonBase;
