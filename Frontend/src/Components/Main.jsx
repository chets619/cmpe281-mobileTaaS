import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import { Route, withRouter } from 'react-router-dom';
import Dashboard from './Dashboard/Dashboard';
import Projects from './Projects/Projects';
import { loadProfile } from '../Redux/Actions/profileActions';
import { getProjects } from '../Redux/Actions/projectActions';
import { connect } from 'react-redux';
import ProjectView from './ProjectView/ProjectView';
import BugTracker from './BugTracker/BugTracker';
import UserProfile from './UserProfile/UserProfile';


class Main extends Component {
    state = {}

    componentDidMount = () => {

        if (sessionStorage.getItem("useremail") && !this.props.user) {
            this.props.loadProfile(sessionStorage.getItem("user_id")).then(data => {
                this.props.getProjects({ email: data.email, type: data.type, id: data._id });
            });
        }

    }

    render() {
        return (
            <div className="">
                <Navbar></Navbar>
                <div className={(this.props.location.pathname == '/project' ? "col-sm-11" : "col-sm-9") + " m-auto main-wrapper"}>
                    <Route path="/project" component={ProjectView} />
                    <Route path="/profile" component={UserProfile} />
                    <Route path="/projects" component={Projects} />
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path="/bugtracker" component={BugTracker} />
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
        getProjects: (data) => dispatch(getProjects(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Main));