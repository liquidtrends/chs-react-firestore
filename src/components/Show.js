import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

class Show extends Component {

  constructor(props) {
    super(props);
    this.state = {
      casefile: {},
      key: '',
      children: [],
      child: {
        childFirstName: '',
        childLastName: '',
        childDob: ''
      }
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('cases').doc(this.props.match.params.id);
    const children = this.state.children;
    const {child} = this.state
    ref.get().then((doc) => {
      if (doc.exists) {
        this.setState({
          casefile: doc.data(),
          key: doc.id,
          isLoading: false,
          children,
          child: {childFirstName: '', childLastName: '', childDob: ''}
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

  onChildChange = (e) => {
    const {child} = this.state
    child[e.target.name] = e.target.value;
    this.setState(child);
  }

  addChild = () => {
    let children = this.state.children;
    children.push(this.state.child);
    this.setState({
      children,
      child: {childFirstName: '', childLastName: '', childDob: ''
    }});
  }


  render() {

  const {children, child, childDob, childFirstName, childLastName} = this.state.casefile;

  console.log(JSON.stringify(this.state.casefile.children));


    return (
        <div className="container">
        {(JSON.stringify(this.state.casefile.children))}

        {children.map(c =>
          <tr>
            <td>{c.childFirstName} {c.childLastName}</td>
            <td>{c.childDob}</td>
          </tr>
        )}

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
            <div className="card">
              <p>Comments:</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="panel-body card">
              <h5>Children</h5>
                <div className="card">
                  <h4>Children</h4>


                </div>
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
