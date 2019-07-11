import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../Firebase';

class AncestryCount extends Component {

  constructor(props) {
    super(props);
    this.ancestryRef = firebase.firestore().collection('ancestry');
    this.unsubscribe = null;
    this.state = {
      ancestry: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const ancestry = [];
    querySnapshot.forEach((doc) => {
      const { metis, inuit, status, nonStatus } = doc.data();
      ancestry.push({
        key: doc.id,
        doc, // DocumentSnapshot
        inuit,
        metis,
        status,
        nonStatus
      });
    });
    this.setState({
      ancestry
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ancestryRef.onSnapshot(this.onCollectionUpdate);
  }

  render() {

    return (
      <div>
        {this.state.ancestry.map(c =>
          <p>[{c.metis},{c.status},{c.nonStatus},{c.inuit}]</p>
        )}
      </div>
    )
  }
}

export default AncestryCount;
