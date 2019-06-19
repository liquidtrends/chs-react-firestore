import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PageviewIcon from '@material-ui/icons/Pageview';
import EditIcon from '@material-ui/icons/Edit';

const { SearchBar } = Search;
const { ExportCSVButton } = CSVExport;


class DataTable extends Component {

constructor(props) {
  super(props);
  this.ref = firebase.firestore().collection('cases');
  this.unsubscribe = null;
  this.state = {
    cases: []
  };
}

onCollectionUpdate = (querySnapshot) => {
  const cases = [];
  const ancestry = [];
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
  this.setState({
    cases
 });
}

componentDidMount() {
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
}


  render() {

  const columns = [{
      dataField: 'doc.id',
      text: 'Case ID'
    }, {
      dataField: 'firstName' ,
      text: 'First Name',
      sort: true
    }, {
      dataField: 'lastName',
      text: 'Last Name',
      sort: true
    }, {
      dataField: 'caseStatus',
      text: 'Status',
      sort: true
    }
  ];


    return (

    <div>
      <BootstrapTable keyField='id' data={ this.state.cases } columns={ columns } />
    </div>

    )
  }
}

export default DataTable;
