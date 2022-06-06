import React from 'react';
import {Card, CardContent} from '@mui/material';


export default function AGTipOfTheDay(props) {
  return (
    <Card>
      <CardContent>
        <h3>Tip of the day!</h3>
        <p>Did you know by telling your mood to AI Guru, 
          it will adjust all of your firends accordingly?</p>
      </CardContent>
    </Card>
  );
}