import './App.css';
import { Grid, Stack } from '@mui/material';
import AGTipOfTheDay from './components/tip-of-the-day';
import AGProfileCard from './components/profileCard';
import AGContact from './components/contacts/contacts';


function Item(props) {
  return (
    <div style={{padding: '30px 15px'}}>{props.children}</div>
  );
}

function AGLayout(props) {
  return (
    <Grid container spacing={2}>
    <Grid item xs={3}>
      <Item>
        <AGProfileCard username="Ali Sharabiani"/>
        <AGContact />
      </Item>
    </Grid>
    <Grid item xs={6}>
      {props.children}
    </Grid>
    <Grid item xs={3}>
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

export default AGLayout;
