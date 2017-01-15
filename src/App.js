import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import './App.css';
import { flipName } from './model';

const App = ({name, flipName}) => {
  return(
    <div className="App">
      <p>
        You are in a app. Your name is{' '}
        <span onClick={flipName}>
            { name }
        </span>.
      </p>
    </div>
  );
};

App.propTypes = {
  name: PropTypes.string.isRequired,
  flipName: PropTypes.func.isRequired
};

const mapStateToProps = state => state;
const mapDispatchToProps = {flipName: flipName};

export default connect(mapStateToProps, mapDispatchToProps)(App);
