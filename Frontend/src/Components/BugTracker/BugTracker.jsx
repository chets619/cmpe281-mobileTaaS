import React, { Component } from 'react';
import '../../Styles/Project.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Doughnut } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table'
import CONSTANTS from '../Constants';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Axios from 'axios';
import configs from "../../config";
import Modal from 'react-bootstrap/Modal';

class BugTracker extends Component {
    state = {
        selected: "",
        bugs: [],
        bugModal: false,
        currBug: {}
    }

    componentDidMount = () => {
        this.setState({
            selected: this.props.projects.projects.length && this.props.projects.projects[0].title
        });

        this.getBugs();
    }

    getBugs = () => {

        const projId = this.props.location.state && this.props.location.state.id || "";

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.get(configs.connect + '/bugs/getBugs/' + projId).then(response => {
            console.log(response)
            this.setState({
                bugs: response.data.bugs
            });
        });

    }

    closeModal = () => {
        this.setState({
            bugModal: false
        });
    }

    changeStatus = (value) => {
        let data = {
            id: this.state.currBug._id,
            status: value
        };
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/bugs/changeStatus', data).then(response => {
            alert("Update Successful!");
            this.getBugs();
            this.closeModal();
        });
    }

    render() {
        let bugModal = <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.bugModal}
            onHide={this.closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Bug
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Title:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.title} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Description:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.desc} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Severity:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.severity} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Tester:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.tester && this.state.currBug.tester.fname + " " + this.state.currBug.tester.lname} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Hardware:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.hardware} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            OS and Version:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.os + " " + this.state.currBug.version} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Script:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.script} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Status:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.status} />
                            <Form.Control as="select" onChange={e => this.changeStatus(e.target.value)} value={this.state.currBug.status}>
                                <option>Resolved</option>
                                <option>New</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>


                </Form>
            </Modal.Body>
        </Modal>


        return (
            <React.Fragment>
                {bugModal}
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Bug Tracker</h1>
                            <span>List of All the Bugs reported</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0">
                        {/* <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select a project</Form.Label>
                            <Form.Control as="select" className="col-sm-4" value={this.state.selected} onChange={e => this.setState({
                                ["selected"]: e.target.value
                            })}>
                                {
                                    this.props.projects.projects.map((data, i) => {
                                        return <option key={i} value={data.title}>{data.title}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group> */}


                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Tester</th>
                                    <th>Severity</th>
                                    <th>Status</th>
                                    <th>View</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.bugs.map((currBug, i) => {
                                        return <tr key={i}>
                                            <td>{currBug.title}</td>
                                            <td>{currBug.tester.fname + " " + currBug.tester.lname}</td>
                                            <td>{currBug.severity}</td>
                                            <td>{currBug.status}</td>
                                            <td><FontAwesomeIcon icon={faEye} onClick={e => {
                                                this.setState({
                                                    bugModal: true,
                                                    currBug: currBug
                                                })
                                            }}></FontAwesomeIcon></td>
                                        </tr>
                                    })
                                }



                            </tbody>
                        </Table>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BugTracker);