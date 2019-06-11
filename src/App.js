import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import firebase from './Firebase';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

import AncestryChart from './components/AncestryChart';
import StatusChart from './components/StatusChart';
import DataTable from './components/DataTable';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));


class App extends Component {

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div>
            <div className="row">
              <div className="col-md-6">
                <div className="card">
                  <h4>Casefile Status</h4>
                  <StatusChart />
                </div>
              </div>
              <div className="col-md-6">
                <div className="card">
                  <h4>Ancestry</h4>
                  <AncestryChart />
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <DataTable />
          </div>

        </div>
      </div>
    );
  }
}

export default App;
