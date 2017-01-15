import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import './App.css';

const App = ({name}) => {
  return(
    <div className="App">
      <p>
        You are in a app. Your name is { name }.
      </p>
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string.isRequired
}

const ConnectedApp = connect(state => state)(App);

export default ConnectedApp;
