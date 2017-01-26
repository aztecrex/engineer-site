import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

import {actions} from '../model';

const Harper = ({name, flipName}) => {
  console.log("name", name);
  return (<span onClick={flipName}>{name}</span>);
};

const mapStateToProps = state => {
  let name = R.path(['name'],state) || "";
  return {name};
};


export default connect(mapStateToProps, actions)(Harper);
