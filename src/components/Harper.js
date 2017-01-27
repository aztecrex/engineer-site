import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

import './Harper.css';
import {actions} from '../model';


class Harper extends React.Component {

  render() {
    return (
      <span className='harper' onClick={this.props.flipName}>
        {this.props.name}
      </span>
    );
  }
}

const mapStateToProps = state => {
  let name = R.path(['name'],state) || "";
  return {name};
};

const mappedActions = {flipName: actions.flipName};

export default connect(mapStateToProps, mappedActions)(Harper);
export {Harper, mapStateToProps};
