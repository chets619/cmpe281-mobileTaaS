import React, { Component } from 'react';
import '../../Styles/Dashboard.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class ProjectView extends Component {
    state = {}

    componentDidMount = () => {

    }

    render() {
        if (!this.props.project._id)
            return <Redirect to="/projects" />;

        return (
            <React.Fragment>
                <div className="project-details-wrapper card p-4">
                    <div className="title-div">
                        <center>
                            <h3>{this.props.project.title}</h3>
                            <span>{this.props.project.desc}</span>
                        </center>
                    </div>
                    <div className="details-body col-sm-12 row mt-3">
                        <div className="col-sm-3">asd</div>
                        <div className="col-sm-9">asd</div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        project: state.projects.currentProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);