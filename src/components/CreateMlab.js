import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import firebase from '../Firebase';
import { Link } from 'react-router-dom';

class Create extends Component {

  constructor(props){
    super(props);
    this.state = {
      task: ''
    }
  }

  onSubmit(e){
    this.props.onAddTask(this.state.task);
    e.preventDefault();
  }

  onChange(e){
    this.setState({task:e.target.value});
  }


  render() {
    return (

    <div className="container case-form-container">
      <h4>New Case File</h4>

      <div className="panel panel-default">
        <div className="row">
          <div className="col-md-8">
            <div className="panel-body card">
              <form>
                    <div className="form-group">
                        <label>First Name: </label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Last Name: </label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>DOB: </label>
                        <input type="text" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Add Case File" className="btn btn-primary"/>
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
