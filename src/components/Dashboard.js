import React, { Component } from 'react';

import AncestryChart from './AncestryChart';
import StatusChart from './StatusChart';
import DataTable from './DataTable';
import firebase from '../Firebase';
class Dashboard extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('cases');
    this.unsubscribe = null;
    this.state = {
      count: 0
    };
    console.log(this.ref);
  }

  onCollectionUpdate = (querySnapshot) => {
    let count = 0;
    querySnapshot.forEach((doc) => {
      count ++;
    });
    this.setState({count});
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const {count} = this.state;
    return (
      <div className="container">
        <h2>{count} CaseFiles</h2>
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

export default Dashboard;
