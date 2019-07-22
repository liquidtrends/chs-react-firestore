import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from 'react-bootstrap/Table';

import { Map, GoogleApiWrapper, Marker, InfoWindow} from 'google-maps-react';

const mapStyles = {
  width: '500px',
  height: '300px',
  position: 'relative',
};

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
      },
      newcomment: '',
      position: {lat: 37.759703, lng: -122.428093},
    };
  }

  onChange = (e) => {
    this.setState({newcomment:e.target.value});
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('cases').doc(this.props.match.params.id);

    ref.get().then((doc) => {
      if (doc.exists) {
        let casefile = doc.data();
        casefile.comment = casefile.comment || [];
        fetch("https://maps.googleapis.com/maps/api/geocode/json?" + casefile.address + "&key=AIzaSyC0d4CbCCwVLd19_gGxtAY5KY5vUfSflVY")
            .then(res => res.json())
            .then(
              (result) => {
                  console.log(result);
                  this.setState({
                    casefile,
                    key: doc.id,
                    isLoading: false,
                  });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  casefile,
                  key: doc.id,
                  isLoading: false,
                  position: {lat: 0, lng: 0}
                });
              }
            )
        
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

  onSubmit = (e) => {
    e.preventDefault();

    let { name, casefile, newcomment} = this.state;
    casefile.comment.push({theComment: newcomment});
    console.log(casefile);
    const updateRef = firebase.firestore().collection('cases').doc(this.props.match.params.id);
    console.log(updateRef);
    updateRef.set(casefile).then((docRef) => {
      this.setState({casefile});
    })
    .catch((error) => {
      console.error("Error adding comment: ", error);
    });
  }
  render() {

    if(this.state.isLoading) {
        return null;
    }

    const children = this.state.casefile.children || [ ];
    const comment = this.state.casefile.comment || [ ];

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
                <dd>Address: {this.state.casefile.address}</dd>

              </dl>
                  <div style={mapStyles}>
                     <Map google={this.props.google} zoom={14}>
   
                      <Marker name={'My Address'} 
                              position={this.state.position}/>
                      
                      <InfoWindow onClose={this.onInfoWindowClose}>
                          <div>
                            <h1>{this.state.casefile.address}</h1>
                          </div>
                      </InfoWindow>
                    </Map>
                  </div>
            </div>
            <div className="card">
              <p>Comments:</p>

                {comment.length > 0 &&
                  <div>
                      {comment.map(c =>
                        <ul>
                          <li>{c.theComment}</li>
                        </ul>
                      )}
                  </div>
                }
                <div>
                  <form onSubmit={this.onSubmit}>
                    <div class="form-group">
                      <label for="title">Comment:</label>
                      <input type="text" class="form-control" name="newcomment" value={this.state.newcomment} onChange={this.onChange} placeholder="Comment" />
                    </div>
                    <button type="submit" class="btn btn-success">Add</button>
                  </form>
                </div>
            </div>
          </div>
          <div className="col-md-4">

          {children.length > 0 &&
            <div className="card">
              <h4>Children</h4>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>DOB</th>
                  </tr>
                </thead>
                <tbody>
                {children.map(c =>
                  <tr>
                    <td className="small">{c.childFirstName} {c.childLastName}</td>
                    <td className="small">{c.childDob}</td>
                  </tr>
                )}
                </tbody>
              </Table>
            </div>
          }

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


export default GoogleApiWrapper({
  apiKey: 'AIzaSyC0d4CbCCwVLd19_gGxtAY5KY5vUfSflVY',
})(Show);
