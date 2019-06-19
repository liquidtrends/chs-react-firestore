import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('cases');
    this.ancestryCountRef = firebase.firestore().collection('ancestry').doc('ancestryCount');
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
      children: [],
      child: {
        childFirstName: '',
        childLastName: '',
        childDob: ''
      }
    };
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onChildChange = (e) => {
    const {child} = this.state
    child[e.target.name] = e.target.value;
    this.setState(child);
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, parentDob, phoneNumber, parentGender, Ancestry, caseStatus, AttendedResidentialSchool, reasonForIntervention, referredBy, childWelfareInvolvement, time, children} = this.state;
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
      time,
      children
    }).then((docRef) => {
      this.ancestryCountRef.get().then(countInfoDoc => {
        if (countInfoDoc.exists) {
          let countInfo = countInfoDoc.data();
          if(countInfo[Ancestry]) {
            countInfo[Ancestry] = countInfo[Ancestry] + 1;
          } else {
            countInfo[Ancestry] = 1;
          }
          this.ancestryCountRef.set(countInfo);
        } else {
          console.log("Could not find a document for counting info!");
        }
      })
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

  addChild = () => {
    let children = this.state.children;
    children.push(this.state.child);
    this.setState({
      children,
      child: {childFirstName: '', childLastName: '', childDob: ''
    }});
  }

  render() {
    const { firstName, lastName, parentDob, phoneNumber, parentGender, caseStatus, AttendedResidentialSchool, reasonForIntervention, referredBy, childWelfareInvolvement, time, children, child, comment, singleComment} = this.state;
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

                  {/* Submit */}
                  <button type="submit" className="btn btn-success">Submit</button>
                </form>
              </div>
            </div>

            <div className="col-md-4">
              {children.length > 0 &&
                <div className="card">
                  <h4>Children</h4>
                  <table className="table table-stripe">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Birthday</th>
                      </tr>
                    </thead>
                    <tbody>
                    {children.map(c =>
                      <tr>
                        <td>{c.childFirstName} {c.childLastName}</td>
                        <td>{c.childDob}</td>
                      </tr>
                    )}
                    </tbody>
                  </table>
                </div>
              }
              {/* Add children */}
              <div className="card">
                <h4>Add Child</h4>
                <form>
                <div className="form-group text-center">
                  <div className="form-group">
                    <label htmlFor="name">Child Name:</label>
                    <div className="form-row">
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          name="childFirstName"
                          placeholder="First name"
                          onChange={this.onChildChange}
                          value={child.childFirstName}
                        />
                      </div>
                      <div className="col">
                        <input
                          type="text"
                          className="form-control"
                          name="childLastName"
                          placeholder="Last name"
                          onChange={this.onChildChange}
                          value={child.childLastName}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="DOB">Date of Birth: </label>
                  <input
                    type="text"
                    className="form-control"
                    name="childDob"
                    placeholder="January 1, 2001"
                    onChange={this.onChildChange}
                    value={child.childDob}
                  />
                </div>
                <button type="button" className="btn btn-success" onClick={this.addChild}>Add Child</button>
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
