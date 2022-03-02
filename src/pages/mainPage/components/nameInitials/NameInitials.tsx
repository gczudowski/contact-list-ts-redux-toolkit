import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';
import { getNameInitials } from '@src/services/nameInitials/nameInitials';

type Props = {
  firstNameLastName: string;
};

function PersonInfoItem({ firstNameLastName }: Props): ReactElement {
  const classes = useStyles();
  const nameInitials = getNameInitials(firstNameLastName);

  return <div className={classes.container}>{nameInitials}</div>;
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    height: 32,
    width: 32,
    flex: '32px 0 0',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#343434',
    borderRadius: '100%',
    padding: 0,
  },
  initials: {
    display: 'flex',
  },
});

export default PersonInfoItem;
