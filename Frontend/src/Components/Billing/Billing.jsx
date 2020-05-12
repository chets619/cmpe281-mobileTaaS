import React, { Component, Fragment } from 'react';
import { loadProfile } from '../../Redux/Actions/profileActions';
import { getProjects } from '../../Redux/Actions/projectActions';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

class Billing extends Component {
    state = {}

    componentDidMount = () => {
        if (!this.props.user._id)
            this.props.loadProfile(sessionStorage.getItem("user_id")).then(data => {
                this.props.getProjects({ email: this.props.user.email, type: this.props.user.type, id: this.props.user._id }).then(data => {
                });
            });
        else {
            this.props.getProjects({ email: this.props.user.email, type: this.props.user.type, id: this.props.user._id }).then(data => {
            });
        }
    }

    render() {
        console.log(this.props.projects.projects);

        return (
            <Fragment>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Billing</h1>
                            <span>This is the billing page. You can find details about all the billing about all the projects here...</span>
                        </center>
                        <hr />
                    </div>

                    <div className="billing-container">

                        <Accordion defaultActiveKey="0" className="col-sm-6 mx-auto">
                            {
                                this.props.projects.projects.map((project, i) => {
                                    return <Card key={i}>
                                        <Accordion.Toggle as={Card.Header} eventKey={i} className="d-flex justify-content-between">
                                            <span>{project.title} </span>
                                            <b>$ 3.00</b>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={i}>
                                            <Card.Body>
                                                <div className="charges h4">Tester Charges</div>
                                                <div>Total Testers: {project.testers.length}</div>
                                                <div>Charges/tester: ${project.salary}</div>
                                                <div className="h6">Total: ${project.testers.length * project.salary}</div>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                })
                            }
                        </Accordion>

                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProfile: (data) => dispatch(loadProfile(data)),
        getProjects: (data) => dispatch(getProjects(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);