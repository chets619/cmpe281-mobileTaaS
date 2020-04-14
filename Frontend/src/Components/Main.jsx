import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import { Route } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Runner from './Runner/Runner';
import Projects from './Projects/Projects';
import { loadProfile } from '../Redux/Actions/profileActions';
import { connect } from 'react-redux';
import ProjectView from './ProjectView/ProjectView';


class Main extends Component {
    state = {}

    componentDidMount = () => {

        if (sessionStorage.getItem("useremail") && !this.props.user) {
            this.props.loadProfile(sessionStorage.getItem("user_id"));
        }

    }

    render() {
        return (
            <div className="">
                <Navbar></Navbar>
                <div className="col-sm-9 m-auto main-wrapper">
                    <Route path="/project" component={ProjectView} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/runner" component={Runner} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/" exact component={Home} />
                </div>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
        user: state.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProfile: (data) => dispatch(loadProfile(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);