import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

class CaseFiles extends Component {

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
      console.log(doc);
      const { firstName, lastName, caseStatus, phoneNumber, reasonForIntervention, referredBy, comment, children} = doc.data();
      cases.push({
        key: doc.id,
        doc, // DocumentSnapshot
        firstName,
        lastName,
        caseStatus,
        phoneNumber,
        reasonForIntervention,
        referredBy,
        comment: comment || [],
        children: children || [],
      });
    });
    this.setState({
      cases
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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              CASES
            </h3>
          </div>
          <div className="panel-body card">

            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th># of Children</th>
                  <th>Comments</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {this.state.cases.map(casefile =>
                  <tr>
                    <td><Link to={`/show/${casefile.key}`}>{casefile.firstName} {casefile.lastName}</Link></td>
                    <td>{casefile.caseStatus}</td>
                    <td>{casefile.children.length}</td>
                    <td><Link to={`/show/${casefile.key}`}>{casefile.comment.length} comments</Link></td>
                    <td><Link to={`/edit/${casefile.key}`} className="btn btn-success">Edit</Link></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default CaseFiles;
