import React from 'react';
import renderer from 'react-test-renderer';
import ButtonBase from '@src/components/buttonBase/ButtonBase';
import LoadButton from './LoadButton';

jest.mock('react-spinners', () => ({
  __esModule: true,
  ScaleLoader: () => <div>loaderMock</div>,
}));

jest.mock('@src/components/buttonBase/ButtonBase', () => ({
  __esModule: true,
  default: () => <button type="button">buttonBaseMock</button>,
}));

describe('LoadButton', () => {
  const onClickCallback = () => {};

  describe('snapshots', () => {
    it('renders properly when isLoading is true', () => {
      const component = renderer.create(<LoadButton onClick={onClickCallback} isLoading />);

      expect(component.toJSON()).toMatchSnapshot();
    });

    it('renders properly when isLoading is false', () => {
      const component = renderer.create(<LoadButton onClick={onClickCallback} isLoading={false} />);

      expect(component.toJSON()).toMatchSnapshot();
    });
  });

  it('passes proper props to ButtonBase when isLoading is false', () => {
    const { root } = renderer.create(<LoadButton onClick={onClickCallback} isLoading={false} />);

    const button = root.findByType(ButtonBase);

    expect(button.props.onClick).toEqual(onClickCallback);
    expect(button.props.label).toEqual('Load more');
  });
});
