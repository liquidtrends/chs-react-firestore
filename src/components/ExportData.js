import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import firebase from '../Firebase';
import SortableTbl from 'react-sort-search-table';
import StatusChart from './StatusChart';
import AncestryChart from './AncestryChart';

export default class Export extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('cases');
    this.unsubscribe = null;
    this.state = {
      cases: [],
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const cases = [];
    querySnapshot.forEach((doc) => {
      const { firstName, lastName, caseStatus, phoneNumber, reasonForIntervention, referredBy } = doc.data();
      cases.push({
        key: doc.id,
        doc, // DocumentSnapshot
        firstName,
        lastName,
        caseStatus,
        phoneNumber,
        reasonForIntervention,
        referredBy
      });
    });
    this.setState({ cases });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  printDocument() {
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
      });
  }

  render() {
    const { cases } = this.state;
    let col = ["key", "firstName", "lastName", "caseStatus"];
    let tHead = ["CASE ID", "First Name", "Last Name", "Status"];

    return (<React.Fragment>
      <div className="mb5">
        <button onClick={this.printDocument}>PDF Download</button>
      </div>
      <Grid container id="divToPrint" className="mt4" style={{
        width: '210mm',
        minHeight: '397mm',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'darkgrey'
      }}>
        <Grid item xs={12}>
          <SortableTbl
            tblData={cases}
            tHead={tHead}
            dKey={col}
            paging={false}
            search={false}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={6}><StatusChart/></Grid>
            <Grid item xs={6}><AncestryChart/></Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>);
  }
}