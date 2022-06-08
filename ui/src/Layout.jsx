import React from 'react';
import './App.css';
import { Grid, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import AGTipOfTheDay from './components/tip-of-the-day';
import AGProfileCard from './components/profileCard';
import AGContact from './components/contacts/contacts';

function Item({children}) {
  return (
    <div style={{padding: '30px 15px'}}>{children}</div>
  );
}

Item.propTypes = {
  children: PropTypes.node
};

function AGLayout(props) {
  return (
    <Grid container spacing={2} direction={{xs: 'column-reverse', md: 'row'}}>
      <Grid item xs={0} md={3}>
        <Item>
          <Grid container spacing={3}>
            <Grid item xs={6} md={12}>
              <AGProfileCard username="Ali Sharabiani"/>
            </Grid>
            <Grid item xs={6} md={12}>
              <AGContact />
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={12} md={6}>
        {props.children}
      </Grid>
      <Grid item xs={12} md={3}>
        <Item>
          <Stack direction="column" spacing={4}>
            <AGProfileCard src="eleos-2.jpg" username="Eleos"/>
            <AGTipOfTheDay />
          </Stack>
        </Item>
      </Grid>
    
    </Grid>
  );
}

AGLayout.propTypes = {
  children: PropTypes.node
};

export default AGLayout;
