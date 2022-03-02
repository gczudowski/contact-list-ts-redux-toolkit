import React, { ReactElement, memo } from 'react';
import { createUseStyles } from 'react-jss';
import CONFIG from 'config';
import NameInitials from '@src/pages/mainPage/components/nameInitials/NameInitials';
import PersonDetails from '@src/pages/mainPage/components/personDetails/PersonDetails';
import { IContactStateItem } from '@src/types/contacts.type';
import { MediaQueries } from '@src/types/css';
import { Flipped } from 'react-flip-toolkit';

type Props = {
  contactItem: IContactStateItem;
  onClick: ({ isActive, itemId }: { isActive: boolean; itemId: string }) => void;
};

function PersonInfoItem({ contactItem, onClick }: Props): ReactElement {
  const classes = useStyles();
  const { firstNameLastName, jobTitle, emailAddress, isActive, id: itemId } = contactItem;

  return (
    <Flipped key={contactItem.id} flipId={contactItem.id}>
      <div
        className={`${classes.container} ${isActive && classes.containerActive}`}
        onClick={() => {
          onClick({ itemId, isActive: !!isActive });
        }}>
        <div className={classes.header}>
          <NameInitials firstNameLastName={firstNameLastName} />
          <PersonDetails firstNameLastName={firstNameLastName} jobTitle={jobTitle} />
        </div>
        <div className={classes.emailAddress}>{emailAddress}</div>
      </div>
    </Flipped>
  );
}

const useStyles = createUseStyles({
  container: {
    display: 'flex',
    minHeight: '102px',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.15)',
    margin: '10px 0',
    background: '#fff',
    cursor: 'pointer',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: 'transparent',
    padding: 17,
    gap: 35,

    [CONFIG.MEDIA_QUERIES[MediaQueries.DESKTOP] as string]: {
      '&:hover': {
        borderColor: 'pink',
      },
    },
  },
  containerActive: {
    borderColor: 'red',
    backgroundColor: '#fffcfc',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    gap: 10,
  },
  emailAddress: {
    color: '#666666',
    fontSize: '14px',
    lineHeight: '1.8em',
    overflow: 'hidden',
    position: 'relative',
    display: 'inline-block',
    margin: '0 5px 0 5px',
    textAlign: 'center',
    textDecoration: 'none',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
  },
});

export default memo(PersonInfoItem);
