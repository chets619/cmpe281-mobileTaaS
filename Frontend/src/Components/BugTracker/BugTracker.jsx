import React, { Component } from 'react';
import '../../Styles/Project.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
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
        currBug: {},
        isCreate: false
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
            bugModal: false,
            isCreate: false
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

    addBug = () => {
        const projId = this.props.location.state && this.props.location.state.id || "";
        let data = {
            title: this.state.title,
            desc: this.state.desc,
            severity: this.state.severity,
            hardware: this.state.hardware,
            os: this.state.os,
            script: this.state.script,
            proj_id: projId,
            tester: sessionStorage.getItem("user_id")
        };

        console.log(data);
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/bugs/addBug', data).then(response => {
            alert("Added Successfully!");
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
                        <Col sm="8">{!this.state.isCreate ?
                            <Form.Control plaintext readOnly defaultValue={this.state.currBug.title} />
                            :
                            <Form.Control type="text" placeholder="Bug Title" name="title" value={this.state.title} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Description:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control plaintext readOnly defaultValue={this.state.currBug.desc} />
                                :
                                <Form.Control type="text" placeholder="Description" name="desc" value={this.state.desc} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Severity:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control plaintext readOnly defaultValue={this.state.currBug.severity} />
                                :
                                <Form.Control type="text" placeholder="Severity" name="severity" value={this.state.severity} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Tester:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control plaintext readOnly defaultValue={this.state.currBug.tester && this.state.currBug.tester.fname + " " + this.state.currBug.tester.lname} />
                                :
                                <Form.Control type="text" placeholder="Tester" name="tester" value={this.state.tester} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Hardware:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control plaintext readOnly defaultValue={this.state.currBug.hardware} />
                                :
                                <Form.Control type="text" placeholder="Hardware" name="hardware" value={this.state.hardware} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            OS and Version:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control plaintext readOnly defaultValue={this.state.currBug.os + " " + (this.state.currBug.version || "")} />
                                :
                                <Form.Control type="text" placeholder="OS" name="os" value={this.state.os} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Script:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control plaintext readOnly defaultValue={this.state.currBug.script} />
                                :
                                <Form.Control type="text" placeholder="Script" name="script" value={this.state.script} onChange={e => this.setState({ [e.target.name]: e.target.value })} />}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Status:
                        </Form.Label>
                        <Col sm="8">
                            {!this.state.isCreate ?
                                <Form.Control as="select" onChange={e => this.changeStatus(e.target.value)} value={this.state.currBug.status}>
                                    <option>Resolved</option>
                                    <option>New</option>
                                </Form.Control>
                                :
                                <Form.Control readonly as="select">
                                    <option>Resolved</option>
                                    <option selected>New</option>
                                </Form.Control>}
                        </Col>
                    </Form.Group>

                    {this.state.isCreate ? <Form.Group> <Button className="mx-auto" onClick={this.addBug}>Submit</Button> </Form.Group> : ""}



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


                        {sessionStorage.getItem("type") === "Tester" ? <Button variant="success" className="mb-3" onClick={e => this.setState({ bugModal: true, isCreate: true })}><FontAwesomeIcon icon={faPlus} />Add Bug</Button> : ""}


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