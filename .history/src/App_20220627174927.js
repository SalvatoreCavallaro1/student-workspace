import React from 'react';
import { SideBar } from './components/SideBar/SideBar.component';
import './App.css';
import Messages from './components/Messages/Messages.component';
import { Grid, GridColumn } from 'semantic-ui-react';

function App() {
  return (
    <Grid columns="equal">
      <SideBar/>
        <Grid.Column>        
          <Messages/>
        </Grid.Column>   
    </Grid>
  );
}

export default App;
