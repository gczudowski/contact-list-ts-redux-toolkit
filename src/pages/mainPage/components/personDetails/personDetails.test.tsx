import React from 'react';
import renderer from 'react-test-renderer';
import PersonDetails from './PersonDetails';

describe('PersonDetails', () => {
  const firstNameLastNameMock = 'firstNameLastNameMock';
  const jobTitleMock = 'jobTitleMock';

  it('renders properly with initial props', () => {
    const component = renderer.create(
      <PersonDetails firstNameLastName={firstNameLastNameMock} jobTitle={jobTitleMock} />,
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
