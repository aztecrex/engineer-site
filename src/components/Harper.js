import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

const Harper = ({name}) => {
  console.log("name", name);
  return (<span>{name}</span>);
};

const mapStateToProps = state => {
  let name = R.path(['name'],state) || "";
  return {name};
};

export default connect(mapStateToProps)(Harper);
