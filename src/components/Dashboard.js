import React, { Component } from 'react';

import AncestryChart from './AncestryChart';
import StatusChart from './StatusChart';
import DataTable from './DataTable';

class Dashboard extends Component {

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

export default Dashboard;
