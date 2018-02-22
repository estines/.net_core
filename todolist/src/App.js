import React, { Component } from 'react';
import './App.css';
import Reacts from './Components/react'
import Todo from './Components/todo'

class App extends Component {
  render() {
    return (
      <div>
        <Reacts />
        <Todo />
      </div>
    );
  }
}

export default App;
