import React from 'react';
import {connect} from 'react-redux';
import R from 'ramda';

import './Harper.css';
import {actions} from '../model';



const Harper = ({name, flipName}) => {
  return (<span className='harper' onClick={flipName}>{name}</span>);
};

const mapStateToProps = state => {
  let name = R.path(['name'],state) || "";
  return {name};
};


export default connect(mapStateToProps, actions)(Harper);
