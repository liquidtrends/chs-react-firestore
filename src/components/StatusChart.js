import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import firebase from '../Firebase';
// import { defaults } from 'react-chartjs-2';
// import {Pie} from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';

class StatusChart extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('cases');
    this.unsubscribe = null;
    this.state = {
      open: 0,
      waitlist: 0,
      notMeet: 0,
      openColor: "#FF6384",
      waitColor: "#36A2EB",
      notMeetColor: "#FFCE56",
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    let open = 0, waitlist = 0, notMeet = 0;
    querySnapshot.forEach((doc) => {
      const { caseStatus } = doc.data();
      if (caseStatus === "Open") {
        open++;
      }
      else if (caseStatus === "Waitlist") {
        waitlist++;
      } else {
        notMeet++;
      }
    });
    this.setState({ open, waitlist, notMeet });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const {
      open,
      waitlist,
      notMeet,
      openColor,
      waitColor,
      notMeetColor,
    } = this.state;

    const chartData = {
      labels: [
        "Open",
        "Waitlist",
        "Does not meet mandate",
      ],
      datasets: [
      {
        data: [open, waitlist, notMeet],
        backgroundColor: [ openColor, waitColor, notMeetColor ],
        hoverBackgroundColor: [ openColor, waitColor, notMeetColor ]
      }]
    };

    return (
      <React.Fragment>
        <Doughnut
          width={100}
          height={75}
          data={chartData}
        />
      </React.Fragment>
    )
  }
}
export default StatusChart;
