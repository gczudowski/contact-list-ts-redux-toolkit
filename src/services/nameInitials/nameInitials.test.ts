import { getNameInitials } from './nameInitials';

describe('nameInitials service', () => {
  describe('getNameInitials', () => {
    it(`returns proper initials for name consisting of one word`, () => {
      expect(getNameInitials('Arthur')).toEqual('A');
    });

    it(`returns proper initials for name consisting of two words`, () => {
      expect(getNameInitials('John Smith')).toEqual('JS');
    });

    it(`returns proper initials for name consisting of more than two words`, () => {
      expect(getNameInitials('Ruud van Nistelrooy')).toEqual('RN');
    });

    it(`returns proper initials for name consisting of two words and spacebar at the end`, () => {
      expect(getNameInitials('Deborah Stone ')).toEqual('DS');
    });

    it(`returns proper initials for name consisting of two words and spacebar at the beginning`, () => {
      expect(getNameInitials(' Deborah Stone')).toEqual('DS');
    });
  });
});
