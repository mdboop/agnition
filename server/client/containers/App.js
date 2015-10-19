import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { pushState } from 'redux-router';
import { Link } from 'react-router';
import Dashboard from './Dashboard';

class App extends Component {

  render() {
    const { pathname } = this.props.location;
    const key = pathname.split('/')[1] || 'root';

    return (
      <div>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/new-experiment">NewExperiment</Link></li>
        <li><Link to='/123/dashboard'>Dashboard</Link></li>
        {React.cloneElement(this.props.children || <div />, { key: key })}
      </div>
    );
  }
}

// App.propTypes = {
//   // Injected by React Redux
//   errorMessage: PropTypes.string,
//   resetErrorMessage: PropTypes.func.isRequired,
//   pushState: PropTypes.func.isRequired,
//   inputValue: PropTypes.string.isRequired,
//   // Injected by React Router
//   children: PropTypes.node
// };

module.exports = App;
