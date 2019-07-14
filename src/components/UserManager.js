import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

class UserManager extends Component {

  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('users');
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    const currentUser = JSON.parse(localStorage.getItem("authUser"));
    this.state = {
      users: [],
      currentUserEmail: currentUser ? currentUser.email : "",
      isAdmin: false,
      isLoaded: false,
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    let isState = false;
    const { currentUserEmail } = this.state;
    querySnapshot.forEach((doc) => {
      const { email, isAdmin, username } = doc.data();
      if (currentUserEmail == email ) {
        isState = isAdmin;
      }
      users.push({
        key: doc.id,
        doc, // DocumentSnapshot
        email,
        isAdmin,
        username
      });
    });
    this.setState({
      users,
      isAdmin: isState,
   });
  }

  delete(id){
    firebase.firestore().collection('users').doc(id).delete().then(() => {
      console.log("Document successfully deleted!");
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }

  componentDidMount() {
    this.setState({isLoaded: true});
    // this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    const { isAdmin, isLoaded } = this.state;
    if (!isLoaded) return null;
    return (
      <div className="container">
        {isAdmin ? (<React.Fragment>
          <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">
              Users
            </h3>
          </div>
          <div className="panel-body card">

            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email Address</th>
                  <th>is Admin?</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map(user =>
                  <tr key={user.key}>
                    <td><Link to={`/show/${user.key}`}>{user.username}</Link></td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "Yes" : "No"}</td>
                    <td>
                      {/* <Link to={`/delete/${user.key}`} className="btn btn-success">Delete</Link> */}
                      <button onClick={this.delete.bind(this, user.key)} className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </React.Fragment>)
        : <div>You are not authorized</div>}
      </div>
    );
  }
}

export default UserManager;
