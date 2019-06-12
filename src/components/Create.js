import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('cases');
    this.state = {
      firstName: '',
      lastName: '',
      parentDob: '',
      phoneNumber: '',
      parentGender: '',
      Ancestry: '',
      caseStatus: '',
      AttendedResidentialSchool: '',
      reasonForIntervention: '',
      referredBy: '',
      childWelfareInvolvement: '',
      time: firebase.database.ServerValue.TIMESTAMP,
      children: {
        childFirstName: '',
        childLastName: ''
      },
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, parentDob, phoneNumber, parentGender, Ancestry, caseStatus, AttendedResidentialSchool, reasonForIntervention, referredBy, childWelfareInvolvement, time} = this.state;
    this.ref.add({
      firstName,
      lastName,
      parentDob,
      phoneNumber,
      parentGender,
      Ancestry,
      caseStatus,
      AttendedResidentialSchool,
      reasonForIntervention,
      referredBy,
      childWelfareInvolvement,
      time
    }).then((docRef) => {
      this.setState({
        firstName: '',
        lastName: '',
        parentDob: '',
        phoneNumber: '',
        parentGender: '',
        Ancestry: '',
        caseStatus: '',
        AttendedResidentialSchool: '',
        reasonForIntervention: '',
        referredBy: '',
        childWelfareInvolvement: '',
        time: firebase.database.ServerValue.TIMESTAMP,
      });
      this.props.history.push("/")
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    const { firstName, lastName, parentDob, phoneNumber, parentGender, caseStatus, AttendedResidentialSchool, reasonForIntervention, referredBy, childWelfareInvolvement, time} = this.state;
    return (
      <div className="container case-form-container">
        <h4>New Case File</h4>
        <div className="panel panel-default">
          <div className="row">
            <div className="col-md-8">
              <div className="panel-body card">
                <form onSubmit={this.onSubmit}>
                  <h4>Client Information</h4>
                  {/* Name */}
                  <div className="form-group">
                    <label htmlFor="name">Client Name:</label>
                    <div className="form-row">
                      <div className="col">
                        <input type="text" className="form-control" name="firstName" value={firstName} onChange={this.onChange} placeholder="First name" />
                      </div>
                      <div className="col">
                        <input type="text" className="form-control" name="lastName" value={lastName} onChange={this.onChange} placeholder="Last name" />
                      </div>
                    </div>
                  </div>
                  {/* DOB */}
                  <div className="form-group">
                    <label htmlFor="DOB">Date of Birth: </label>
                    <input type="text" className="form-control" name="parentDob" value={parentDob} onChange={this.onChange} placeholder="January 1, 2001" />
                  </div>
                  {/* Gender */}
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <label className="input-group-text">Gender:</label>
                    </div>
                    <select className="form-control" name="parentGender" onChange={this.onChange}>
                      <option disabled selected>Choose</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <br />
                  {/* Ancestry */}
                  <div className="input-group">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Ancestry:</label>
                  </div>
                  <select className="custom-select" name="Ancestry" onChange={this.onChange}>
                    <option disabled selected>Choose</option>
                    <option value="Status">Status</option>
                    <option value="Non-status">Non-status</option>
                    <option value="Metis">Metis</option>
                    <option value="Inuit">Inuit</option>
                  </select>
                  </div>
                  <br />
                  {/* Residential School */}
                  <div className="input-group">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Attended Residential School?:</label>
                  </div>
                  <select className="custom-select" name="AttendedResidentialSchool" onChange={this.onChange}>
                    <option disabled selected>Choose</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Unknown">Unknown</option>
                  </select>
                  </div>
                  <br />
                  {/* Status */}
                  <div className="input-group">
                  <div className="input-group-prepend">
                    <label className="input-group-text">Case Status:</label>
                  </div>
                  <select className="custom-select" name="caseStatus" onChange={this.onChange}>
                    <option disabled selected>Choose</option>
                    <option value="Open">Open</option>
                    <option value="Waitlist">Wait list</option>
                    <option value="Does not meet mandate">Does not meet mandate</option>
                  </select>
                  </div>
                  <br />
                  {/* Contact Section */}
                  <hr />
                  <h4>Contact Information</h4>
                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="PhoneNumber">Phone Number:</label>
                    <input type="number" className="form-control" name="phoneNumber" value={phoneNumber} onChange={this.onChange} placeholder="780-123-4567" />
                  </div>
                  {/* Intervention Section */}
                  <hr />
                  <h4>Case File Information</h4>
                  {/* Child Welfare */}
                  <div className="input-group">
                    <div className="input-group-prepend">
                      <label className="input-group-text">Child Welfare Involvement:</label>
                    </div>
                    <select className="form-control" name="childWelfareInvolvement" onChange={this.onChange}>
                      <option disabled selected>Choose</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <br />
                  {/* Reason for intervention */}
                  <div className="form-group">
                    <label htmlFor="DOB">Reason for intervention:</label>
                    <input type="text" className="form-control" name="reasonForIntervention" value={reasonForIntervention} onChange={this.onChange} placeholder="Example: Child safety, substance abuse, etc." />
                  </div>
                  {/* Reason for intervention */}
                  <div className="form-group">
                    <label htmlFor="DOB">Referred by:</label>
                    <input type="text" className="form-control" name="referredBy" value={referredBy} onChange={this.onChange} placeholder="Referral" />
                  </div>
                  {/* Children */}

                  {/* Submit */}
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>

            <div className="col-md-4">
              {/* Add children */}
              <div className="card">
                <h4>Children</h4>
                <form>
                <div className="form-group text-center">

                </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default Create;
