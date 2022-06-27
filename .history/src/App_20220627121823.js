import React from 'react';
import { SideBar } from './components/SideBar/SideBar.component';
import './App.css';
import Messages from './components/Messages/Messages.component';

function App() {
  return (
    <div>
      <SideBar/>
      <div>
      <Messages/>
      </div>
      
    </div>
  );
}

export default App;
