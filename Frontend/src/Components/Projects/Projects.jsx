import React, { Component } from 'react';
import '../../Styles/Dashboard.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { getProjects, addProject, getTestersForProjects, addTester } from '../../Redux/Actions/projectActions';
import { loadProfile } from '../../Redux/Actions/profileActions';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEnvelopeOpenText, faMobileAlt, faChartLine, faUser } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import "../../Styles/Project.scss";

class Projects extends Component {
    state = {
        addModal: false,
        testerModal: false
    }

    componentDidMount = () => {
        if (!this.props.user._id)
            this.props.loadProfile(sessionStorage.getItem("user_id")).then(data => {
                this.props.getProjects({ email: this.props.user.email, type: this.props.user.type });
            });
        else
            this.props.getProjects({ email: this.props.user.email, type: this.props.user.type });

    }

    modalClose = () => {
        this.setState({
            addModal: false,
            testerModal: false
        })
    }

    syncKeypress = (target) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onSubmit = () => {
        let data = {
            title: this.state.name,
            desc: this.state.desc,
            salary: this.state.salary,
            manager: this.props.user.email
        };

        this.props.addProject(data);
        this.setState({
            addModal: false
        });
    }

    addTester = (id, t_id) => {
        this.props.addTester(id, t_id);
    }

    render() {
        let testers = this.props.projects.testers.map((tester, i) => {
            return <div className="card s-container flex flex-row col-sm-12" key={i}>
                <div className="col-sm-2 left flex">
                    <span><FontAwesomeIcon icon={faUser} /></span>
                </div>
                <div className="col-sm-10 right flex-row flex justify-content-between">
                    <div className="details col-sm-6">
                        <h6 className="pointer" >{tester.fname + " " + tester.lname}</h6>
                        <div className="colname">{tester.city}</div>
                    </div>
                </div>
            </div>
        });

        let tModal = <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.testerModal}
            onHide={this.modalClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Testers
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {testers}
            </Modal.Body>
        </Modal>;

        let projects = this.props.projects.projects && this.props.projects.projects.map((currProject, i) => {
            return <div className="event-container card flex col-sm-12 p-4 my-2" key={i}>
                <div className="col-sm-2 flex">
                    <FontAwesomeIcon className="chartline" icon={faChartLine} size="lg" />
                </div>
                <div className="col-sm-10 flex justify-content-between">
                    <div className="detail flex flex-column">
                        <h5>{currProject.title}</h5>
                        <span>{currProject.desc}</span>
                    </div>
                    <div>
                        <Button variant="outline-success" size="md" onClick={e => {
                            this.props.getTestersForProjects(currProject._id);
                            this.setState({
                                testerModal: true
                            })
                        }}>View Testers</Button>
                    </div>
                </div>

            </div>
        });

        let addModal = <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.addModal}
            onHide={this.modalClose}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Project
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="cname">
                    <Form.Label column sm="3">
                        Project Name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder="Name" required
                            name="name"
                            value={this.state["name"] || ""}
                            onChange={e =>
                                this.syncKeypress(e.target)
                            } />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="title">
                    <Form.Label column sm="3">
                        Description
            </Form.Label>
                    <Col sm="9">
                        <Form.Control type="text" placeholder="Description" required
                            name="desc"
                            value={this.state["desc"] || ""}
                            onChange={e =>
                                this.syncKeypress(e.target)
                            } />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="desc">
                    <Form.Label column sm="3">
                        Tester Salary
            </Form.Label>
                    <Col sm="9">
                        <Form.Control type="number" placeholder="Salary" required
                            name="salary"
                            value={this.state.salary || ""}
                            onChange={e =>
                                this.syncKeypress(e.target)
                            } />
                    </Col>
                </Form.Group>

                <div className="btn-container flex">
                    <Button onClick={this.onSubmit}>Submit</Button>
                </div>

            </Modal.Body>

        </Modal>;



        return (
            <React.Fragment>
                {addModal}
                {tModal}
                <div className="projects-wrapper row col-sm-12">
                    <div className="col-sm-12 card projects-title-wrapper flex flex-row justify-content-between p-2">
                        <div>
                            <h2>Projects</h2>
                            <h5>List of all your projects</h5>
                        </div>
                        <div>
                            {sessionStorage.getItem("type") === "Manager" ? <Button variant="success" onClick={e => this.setState({ addModal: true })}><FontAwesomeIcon icon={faPlus} />Add Project</Button> : ""}

                        </div>
                    </div>

                    <div className="col-sm-12 p-0 project-list mt-4">
                        {projects || "No Projects Available"}
                    </div>
                </div>
            </React.Fragment>
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
        getProjects: (data) => dispatch(getProjects(data)),
        addProject: (data) => dispatch(addProject(data)),
        loadProfile: (data) => dispatch(loadProfile(data)),
        getTestersForProjects: (data) => dispatch(getTestersForProjects(data)),
        addTester: (id, tester_id) => dispatch(addTester(id, tester_id))

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);