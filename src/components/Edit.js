import React, { Component } from 'react';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      name: '',
      description: '',
      author: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('cases').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const casefile = doc.data();
        this.setState({
          key: doc.id,
          name: casefile.name,
          description: casefile.description,
          author: casefile.author
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({casefile:state});
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

    const { name, description, author } = this.state;
    console.log(this.state);
    const updateRef = firebase.firestore().collection('cases').doc(this.state.key);
    updateRef.set({
      name,
      description,
      author
    }).then((docRef) => {
      this.setState({
        key: '',
        name: '',
        description: '',
        author: ''
      });
      this.props.history.push("/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              EDIT CASE
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`/show/${this.state.key}`} class="btn btn-primary">Case Files</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Title:</label>
                <input type="text" class="form-control" name="name" value={this.state.name} onChange={this.onChange} placeholder="Name" />
              </div>
              <div class="form-group">
                <label for="description">Description:</label>
                <input type="text" class="form-control" name="description" value={this.state.description} onChange={this.onChange} placeholder="Description" />
              </div>
              <div class="form-group">
                <label for="author">Author:</label>
                <input type="text" class="form-control" name="author" value={this.state.author} onChange={this.onChange} placeholder="Author" />
              </div>
              <button type="submit" class="btn btn-success">Submit</button>
            </form>
            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Delete Casefile</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
