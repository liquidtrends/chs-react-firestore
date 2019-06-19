import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import { defaults } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import AncestryCount from './AncestryCount';

class AncestryChart extends Component {

  constructor(props) {
    super(props);
    this.ancestryRef = firebase.firestore().collection('ancestry');
    this.unsubscribe = null;
    this.state = {
      ancestry: []
    };
    console.log(this.state.ancestry);
  }

  onCollectionUpdate = (querySnapshot) => {
    const ancestry = [];
    querySnapshot.forEach((doc) => {
      const { metis, inuit, status, nonStatus } = doc.data();
      ancestry.push({
        key: doc.id,
        doc, // DocumentSnapshot
        inuit,
        metis,
        status,
        nonStatus
      });
    });
    this.setState({
      ancestry
   });
  }

  componentDidMount() {
    this.unsubscribe = this.ancestryRef.onSnapshot(this.onCollectionUpdate);
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
                    data: [1,2,3,4],
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
        <AncestryCount />

      </div>

    )
  }

}
export default AncestryChart;
