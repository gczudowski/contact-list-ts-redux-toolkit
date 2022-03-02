import React, { ReactElement } from 'react';
import { createUseStyles } from 'react-jss';

type Props = {
  firstNameLastName: string;
  jobTitle: string;
};

function PersonDetails({ firstNameLastName, jobTitle }: Props): ReactElement {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.firstNameLastNameLabel}>{firstNameLastName}</div>
      <div className={classes.jobTitleLabel}>{jobTitle.toUpperCase()}</div>
    </div>
  );
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  firstNameLastNameLabel: {
    paddingBottom: 0,
    color: '#333333',
    fontSize: '20px',
    fontWeight: 700,
  },
  jobTitleLabel: {
    color: '#e74c3c',
    fontSize: '13px',
    fontWeight: 400,
  },
});

export default PersonDetails;
