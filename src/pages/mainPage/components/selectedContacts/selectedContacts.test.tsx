import React from 'react';
import renderer from 'react-test-renderer';
import SelectedContacts from './SelectedContacts';

describe('SelectedContacts', () => {
  const selectedContactsCountMock = 1;

  it('renders properly with initial props', () => {
    const component = renderer.create(<SelectedContacts selectedContactsCount={selectedContactsCountMock} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
});
