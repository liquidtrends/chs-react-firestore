import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import firebase from '../Firebase';
// import { defaults } from 'react-chartjs-2';
import {Pie} from 'react-chartjs-2';
// import { Doughnut } from 'react-chartjs-2';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import AncestryCount from './AncestryCount';

const BG_COLORS = ["#3498db", "#9b59b6", "#e74c3c", "#34495e"];
const HOVER_BG_COLORS = ["#2980b9", "#8e44ad", "#c0392b", "#2c3e50"];
class AncestryChart extends Component {

  constructor(props) {
    super(props);
    this.ancestryRef = firebase.firestore().collection('ancestry');
    this.unsubscribe = null;
    this.state = {
      ancestry: [],
      bgColors: BG_COLORS,
      hoverBgColors: HOVER_BG_COLORS
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const ancestry = [];
    querySnapshot.forEach((doc) => {
      const { metis, inuit, status, nonStatus } = doc.data();
      ancestry.push([
        status,
        nonStatus,
        metis,
        inuit
      ]);
    });
    this.setState({
      ancestry
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ancestryRef.onSnapshot(this.onCollectionUpdate);
  };

  render() {
    const { ancestry, bgColors, hoverBgColors } = this.state;
    const ancestryChartData = {
      labels: [
        "Status",
        "Non-Status",
        "Metis",
        "Inuit"
      ],
      datasets: [{
        data: ancestry[0],
        backgroundColor: bgColors,
        hoverBackgroundColor: hoverBgColors
      }]
    };

    return (
      <React.Fragment>
        <Pie
          width={100}
          height={75}
          data={ancestryChartData}
        />
        {/* <AncestryCount /> */}
      </React.Fragment>
    )
  }
}
export default AncestryChart;
