import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { defaults } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

class AncestryChart extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('cases');
    this.unsubscribe = null;
    this.state = {
      cases: []
    };
  }

  render() {

    const ancestryData = {
            labels: [
                "Status",
                "Non-Status",
                "Metis",
                "Inuit"
            ],
            datasets: [
                {
                    data: [120, 18, 21, 8],
                    backgroundColor: [
                        "#3498db",
                        "#9b59b6",
                        "#e74c3c",
                        "#34495e"
                    ],
                    hoverBackgroundColor: [
                        "#2980b9",
                        "#8e44ad",
                        "#c0392b",
                        "#2c3e50"

                    ]
                }]
        };

    return (
      <div>
        <Pie
        width={100}
        height={75}
        data={ancestryData}
        />
      </div>

    )
  }

}
export default AncestryChart;
