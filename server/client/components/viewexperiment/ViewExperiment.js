var React = require('react');
var DepVar = require('./DepVar');
var IndVar = require('./IndVar');
var connect = require('react-redux').connect;
var shortId = require('shortid');
var utils = require('../../utils/componentUtils');
var Actions = require('../../actions/Samples');
var bindActionCreators = require('redux').bindActionCreators;
import { History } from 'react-router';

function mapStateToProps (state, ownProps) {
  return {
    exp: state.Experiments.get(ownProps.params.expid).toJS(),
  };
}

function mapDispatchtoProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

var ViewExp = React.createClass({
  mixins: [ History ],
  createSample: function(e){
    var id = shortId.generate();
    //instantiate a new sample with ID
    this.props.actions.createSample(id);
    //re-direct
    console.log('%c--> ' + this.props.exp._id , 'font-size:15px; padding-right:20px; color:white; background-color: black');﻿
    this.history.pushState(null, '/newsample/' + this.props.exp._id + '/' + id);
  },
  render: function() {
    return (
      <div>
        {/* name as header */}
        <h2>{this.props.exp.name}</h2>
        <span>{this.props.exp._id}</span>
        <span>{this.props.exp.active}</span>
        <span>{this.props.exp.hypothesis}</span>
        <h2>Dependent Variables</h2>
        <DepVar depVarIds = {this.props.exp.dependentVars} />
        <h2>Independent Variables</h2>
        <IndVar indVars = {this.props.exp.independentVars} />
        <button onClick={this.createSample}> Add Sample </button>
      </div>
    );
  }

  //
  // <IndVar indVar = {this.props.exp.IndVar[0]} />
});

module.exports = connect(mapStateToProps, mapDispatchtoProps)(ViewExp);
