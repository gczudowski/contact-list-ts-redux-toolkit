import React, { ReactElement } from 'react';

interface Props {
  selectedContactsCount: number;
}

function SelectedContacts({ selectedContactsCount }: Props): ReactElement {
  return <div style={styles.selectedContactsContainer}>Selected contacts: {selectedContactsCount}</div>;
}

const styles = {
  selectedContactsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
};

export default SelectedContacts;
