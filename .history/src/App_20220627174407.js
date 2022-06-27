import React from 'react';
import { SideBar } from './components/SideBar/SideBar.component';
import './App.css';
import Messages from './components/Messages/Messages.component';
import { Grid } from 'semantic-ui-react';

function App() {
  return (
    <Grid>
      <SideBar/>
      <div style={{paddingLeft : '350px'}}>
      <Messages/>
      </div>
      
    </Grid>
  );
}

export default App;
