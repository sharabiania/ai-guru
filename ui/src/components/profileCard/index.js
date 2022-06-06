import React from 'react';
import { Card, CardContent, Avatar } from '@mui/material';

export default function AGProfileCard(props) {
  return (
    <Card>
      <CardContent style={{textAlign: 'center'}}>
        <Avatar alt="profile picture" src={props.src} style={{margin: 'auto'}}/>
        <strong>{props.username}</strong>
      </CardContent>
    </Card>
  );
}