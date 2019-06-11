import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      casefile: {},
      key: ''
    };
  }

    statusChangeState() {

    }

  componentDidMount() {
    const ref = firebase.firestore().collection('cases').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          casefile: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  delete(id){
    firebase.firestore().collection('cases').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
      this.props.history.push("/")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  render() {
    return (
        <div className="container">
        <a href="/">Back to case files</a>

        <div className="row">
          <div className="col-md-8">
            <div className="panel-body card">
              <h4>{this.state.casefile.firstName} {this.state.casefile.lastName}</h4>
              <p>Current Status: <span className={this.state.casefile.caseStatus}>{this.state.casefile.caseStatus}</span></p>
              <dl>
                <dd>Phone: {this.state.casefile.phoneNumber}</dd>
                <dd>Reason for intervention: {this.state.casefile.reasonForIntervention}</dd>
                <dd>Referred by: {this.state.casefile.referredBy}</dd>
                <dd>DOB: {this.state.casefile.parentDob}</dd>
                <dd>Gender: {this.state.casefile.parentGender}</dd>
                <dd>Ancestry: {this.state.casefile.Ancestry}</dd>
                <dd>Attended Residential School?: {this.state.casefile.AttendedResidentialSchool}</dd>
                <dd>Ancestry: {this.state.casefile.Ancestry}</dd>
                <dd>Phone: <Link to={`tel:${this.state.casefile.phoneNumber}`}>{this.state.casefile.phoneNumber}</Link></dd>
              </dl>
            </div>
            <div class="card">
              <p>Comments:</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className=" panel-body card">
              <h5>Children</h5>
            </div>
          </div>
        </div>


        <div className="panel panel-default">
          <div className="panel-body">
            <Link to={`/edit/${this.state.key}`} className="btn btn-success">Edit</Link>&nbsp;

            <Button onClick={this.delete.bind(this, this.state.key)} variant="contained" color="secondary">
              Delete
              <DeleteIcon />
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Show;
