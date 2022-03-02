import React from 'react';
import renderer from 'react-test-renderer';
import ButtonBase from './ButtonBase';

describe('ButtonBase', () => {
  const labelMock = 'labelMock';
  const onClickCallback = () => {};

  it('renders properly with initial props', () => {
    const component = renderer.create(<ButtonBase onClick={onClickCallback} label={labelMock} />);

    expect(component.toJSON()).toMatchSnapshot();
  });

  it(`calls onClick callback prop`, () => {
    const onClickMock = jest.fn();
    const { root } = renderer.create(<ButtonBase onClick={onClickMock} label={labelMock} />);

    root.props.onClick();

    expect(onClickMock).toHaveBeenCalledWith();
  });
});
