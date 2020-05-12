import React, { Component } from 'react';
import '../../Styles/Project.scss';
import { connect } from 'react-redux';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import configs from "../../config";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from "react-select";
import "./Emulator.scss";

class Emulator extends Component {
    state = {
        runModal: false,
        emulatorUrl: {
            "0": "34.72.136.146",
            "1": "34.68.54.44",
            "2": "35.239.122.55"
        },
        activeUrl: "34.72.136.146"
    }

    componentDidMount = () => {
    }

    closeModal = () => {
        this.setState({
            runModal: false
        });
    }

    selectDevices = e => {
    }

    render() {
        let modal = <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="emulator-modal"
            show={this.state.runModal}
            onHide={this.closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Use Emulator
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <iframe width='100%' height='766' src={'https://' + this.state.activeUrl + '/iframe/index.html'} frameborder='0' allowfullscreen></iframe>
                {/* <iframe width='100%' height='808' src='https://35.224.38.53/iframe/index.html' frameborder='0' allowfullscreen></iframe> */}
            </Modal.Body>
        </Modal>;

        return (
            <React.Fragment>
                {modal}
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Emulator</h1>
                            <span>List of All the Emulator Runs:</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0">
                        {sessionStorage.getItem("type") === "Tester" ?
                            <div className="add col-sm-12">
                                <h5 className="flex">Use Emulator:</h5>
                                <div className="col-sm-12 row mb-5">
                                    <Form.Control as="select" className="m-0 col-sm-9" onChange={e => this.setState({
                                        activeUrl: this.state.emulatorUrl[e.target.value]
                                    })}>
                                        <option value="0" selected>Android 9.0</option>
                                        <option value="1">Android 8.0</option>
                                        <option value="2">Android 7.0</option>
                                    </Form.Control>
                                    <Button variant="success" className="m-0 ml-3 col-sm-2" onClick={e => this.setState({ runModal: true })}><FontAwesomeIcon icon={faPlus} className="mr-2" />Use Emulator</Button>

                                </div>

                            </div>
                            : ""}

                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        projects: state.projects,
        emulator: state.emulator
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Emulator);