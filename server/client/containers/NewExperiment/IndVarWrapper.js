var React = require('react');
var connect = require('react-redux').connect;
var _ = require('underscore');
var bindActionCreators = require('redux').bindActionCreators;
var Immutable = require('immutable');
var Actions = require ('../../actions/IndVars');
var expActions = require('../../actions/Experiments');
Actions = _.extend(Actions,expActions);
var mongooseId = require('mongoose').Types;


//added in..
var IndVar = require('./IndVar');
var IndVarView = require('../../components/viewexperiment/IndVar.js');
var utils = require('../../utils/componentUtils');

function mapStateToProps (state, ownProps) {
  return {
    indVarIds: state.Experiments.getIn([ownProps.expId, 'indVars']).toJS()
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}
var IndVarWrapper = React.createClass({

  genComponent: function(event){
    var indVarId = mongooseId.ObjectId().toString();
    this.props.actions.createIndVar(indVarId);
    this.props.actions.addIndVar(indVarId, this.props.expId);
  },

  componentWillMount: function(){
    if(this.props.indVarIds < 1) {
      this.genComponent();
    }  
  },

  render: function(){
    var indVarEntries = this.props.indVarIds.map(function (indVarId) {
          return <IndVar indVarId = {indVarId} key = {indVarId} />
        });
    return (
      <div>
        {indVarEntries}
      </div>
    )
  }
});


module.exports = connect(mapStateToProps, mapDispatchToProps)(IndVarWrapper);
