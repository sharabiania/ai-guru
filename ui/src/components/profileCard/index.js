import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, Avatar } from '@mui/material';

export default function AGProfileCard({src, username}) {
  return (
    <Card>
      <CardContent style={{textAlign: 'center'}}>
        <Avatar alt="profile picture" src={src} style={{margin: 'auto'}}/>
        <strong>{username}</strong>
      </CardContent>
    </Card>
  );
}

AGProfileCard.propTypes = {
  src: PropTypes.string,
  username: PropTypes.string
};