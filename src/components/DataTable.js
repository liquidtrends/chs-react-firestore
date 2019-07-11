import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import firebase from '../Firebase';
import SortableTbl from 'react-sort-search-table';
// import BootstrapTable from 'react-bootstrap-table-next';
// import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
// import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
// import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';

// import Button from '@material-ui/core/Button';
// import Icon from '@material-ui/core/Icon';
// import IconButton from '@material-ui/core/IconButton';
// import DeleteIcon from '@material-ui/icons/Delete';
// import PageviewIcon from '@material-ui/icons/Pageview';
// import EditIcon from '@material-ui/icons/Edit';

// const { SearchBar } = Search;
// const { ExportCSVButton } = CSVExport;


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

  render() {
    const { cases } = this.state;

    let col = [
      "key",
      "firstName",
      "lastName",
      "caseStatus",
    ];
    let tHead = [                                                                                                                                                                                                                                         
      "CASE ID",
      "First Name",
      "Last Name",
      "Status",
    ];

    return (
      <SortableTbl
        tblData={cases}
        tHead={tHead}
        dKey={col}
      />
    );
  }
}

export default DataTable;
