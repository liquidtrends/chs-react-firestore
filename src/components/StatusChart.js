import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { defaults } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

class StatusChart extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('cases');
    this.unsubscribe = null;
    this.state = {
      cases: []
    };
  }

  render() {

    const statusData = {
            labels: [
                "Open",
                "Waitlist",
                "Does not meet mandate",
            ],
            datasets: [
                {
                    data: [120, 50, 10],
                    backgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ],
                    hoverBackgroundColor: [
                        "#FF6384",
                        "#36A2EB",
                        "#FFCE56"
                    ]
                }]
        };


    return (

      <div>
        <Doughnut
        width={100}
        height={75}
        data={statusData}
        />
      </div>

    )
  }

}
export default StatusChart;
