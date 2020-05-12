import React, { Component } from 'react';
import '../../Styles/Project.scss';
import { connect } from 'react-redux';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt, faPlus, faClipboardList } from '@fortawesome/free-solid-svg-icons';
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
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'
import { Redirect } from 'react-router-dom';

class TestRuns extends Component {
    state = {
        runModal: false,
        os: "Android",
        selectedDevices: [],
        selectedTests: [],
        testType: this.props.projects.testTypes[0],
        appFile: "",
        appFileType: 'ANDROID_APP',
        testPackageFileType: '',
        loader: false,
        detailsModal: false,
        currRun: {}
    }

    closeModal = () => {
        this.setState({
            runModal: false,
            detailsModal: false
        });
    }

    selectDevices = e => {
        console.log('e', e)

        this.setState({
            selectedDevices: e
        })
    }

    selectTests = e => {
        console.log('e', e)

        this.setState({
            selectedTests: e
        })
    }


    addRun = () => {
        let arns = []
        this.state.selectedDevices.forEach((eachObj) => arns.push(eachObj.value));

        let testFileNames = []
        this.state.selectedTests.forEach((eachObj) => testFileNames.push(eachObj.value))

        let fd = new FormData();
        fd.append('username', sessionStorage.getItem('useremail'));
        fd.append('projectname', this.props.projects.currentProject.title);
        fd.append('runname', this.state.title)
        fd.append('appFileName', this.state.appFileName)
        fd.append('appFileType', this.state.appFileType)
        fd.append('devicePoolName', this.state.poolName)
        fd.append('devicePoolARNs', JSON.stringify(arns))
        fd.append('maxDevice', this.state.selectedDevices.length)
        fd.append('testType', this.state.testType)
        fd.append('testPackageFileType', this.state.testPackageFileType)
        fd.append('testFileNames', JSON.stringify(testFileNames))
        fd.append('file', this.state.appFile);

        this.setState({
            runModal: false,
            loader: true
        })

        const config = { 'headers': { 'Content-Type': 'multipart/form-data' } };
        Axios.post(configs.connect + '/runs/addRun', fd, config).then(data => {
            console.log(data)
            alert('Run Added Successfully!')
            this.setState({
                loader: false
            })
        })
    }


    render() {
        if (!(this.props.projects.currentProject && this.props.projects.currentProject._id))
            return <Redirect to="/projects" />;

        let modal = <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.runModal}
            onHide={this.closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Run
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Run Name:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Run Name" name="title" value={this.state.title} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                        <Form.Label column sm="4">Operating System</Form.Label>
                        <Col sm="8">
                            <Form.Control as="select" onChange={e => this.setState({
                                os: e.target.value,
                                appFileType: e.target.value === 'Android' ? 'ANDROID_APP' : 'IOS_APP',
                                selectedDevices: [],
                                selectedTests: []
                            })}>
                                {
                                    this.props.projects.OS.map((os, i) => {
                                        return <option key={i}>{os}</option>
                                    })
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlSelect2">
                        <Form.Label column sm="4">Select Devices</Form.Label>
                        <Col sm="8">
                            <Select
                                isMulti
                                required
                                onChange={this.selectDevices}
                                options={this.props.projects.allOptions[this.state.os == "Android" ? 0 : 1]}
                                value={this.state.selectedDevices} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextEmail">
                        <Form.Label column sm="4">
                            Device Pool Name:
                        </Form.Label>
                        <Col sm="8">
                            <Form.Control type="text" placeholder="Pool Name" name="poolName" value={this.state.poolName} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlSelect1">
                        <Form.Label column sm="4">Type of Test</Form.Label>
                        <Col sm="8">
                            <Form.Control as="select" onChange={e => this.setState({
                                testType: e.target.value,
                                testPackageFileType: this.props.projects.testPackageFileTypes[this.props.projects.testTypes.indexOf(e.target.value)]
                            })}>
                                {
                                    this.props.projects.testTypes.map((test, i) => {
                                        return <option key={i}>{test}</option>
                                    })
                                }
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="exampleForm.ControlSelect2">
                        <Form.Label column sm="4">Select Tests</Form.Label>
                        <Col sm="8">
                            <Select
                                isMulti
                                required
                                onChange={this.selectTests}
                                options={this.props.projects.allTestingFileNames[this.state.os == "Android" ? 0 : 1]}
                                value={this.state.selectedTests} />
                        </Col>
                    </Form.Group>


                    <Form.File
                        id="custom-file"
                        label="Upload an app file here"
                        custom
                        onChange={e => this.setState({
                            appFile: e.target.files[0]
                        })}
                    />

                    <Form.Group className="flex"> <Button className="mx-auto mt-3" onClick={this.addRun}>Submit</Button> </Form.Group>



                </Form>
            </Modal.Body>
        </Modal>;

        let currRun = this.state.currRun;
        let detailsModal = <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.detailsModal}
            onHide={this.closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Run Details - {currRun.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Project Name
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={currRun.projectName} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Run By:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={currRun.userName} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Test Type:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={currRun.type} />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Result:
    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={currRun.result} />
                    </Col>
                </Form.Group>



                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Status:
                    </Form.Label>
                    <Col sm="9">
                        <Form.Control plaintext readOnly defaultValue={currRun.status} />
                    </Col>
                </Form.Group>



                <Form.Group as={Row} controlId="formPlaintextEmail">
                    <Form.Label column sm="3">
                        Total Device Minutes:
                    </Form.Label>
                    <Col sm="9">
                        <details>
                            <summary>{currRun.deviceMinutes && currRun.deviceMinutes.total}</summary>
                            <div>Metered: {currRun.deviceMinutes && currRun.deviceMinutes.metered}</div>
                            <div>Unmetered: {currRun.deviceMinutes && currRun.deviceMinutes.unmetered}</div>
                        </details>
                    </Col>
                </Form.Group>

                <hr />
                <h4>Devices Used:</h4>

                {
                    currRun.jobs && currRun.jobs.map((job, i) => (
                        <>
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="3">
                                    {job.deviceName + " " + job.deviceOS}:
                    </Form.Label>
                                <Col sm="9">
                                    <details>
                                        <summary>Usage Total (Minutes): {job.deviceMinutes && job.deviceMinutes.total}</summary>
                                        <div>Metered: {job.deviceMinutes && job.deviceMinutes.metered}</div>
                                        <div>Unmetered: {job.deviceMinutes && job.deviceMinutes.unmetered}</div>
                                    </details>

                                    <h6 className="mt-3">Tests Conducted:</h6>
                                    {
                                        job.suites && job.suites.map((suite, i) => (
                                            <>
                                                <details>
                                                    <summary>{suite.name} - {suite.message}</summary>
                                                    <div>Passed: {suite.counters && suite.counters.passed}</div>
                                                    <div>Failed: {suite.counters && suite.counters.failed}</div>
                                                </details>
                                            </>
                                        ))
                                    }
                                </Col>
                            </Form.Group>
                            <hr />
                        </>
                    ))
                }
            </Modal.Body>
        </Modal>


        return (
            <React.Fragment>
                <Loader
                    type="Grid"
                    color="#00BFFF"
                    height={100}
                    width={100}
                    visible={this.state.loader}
                    className="loader"
                />
                {modal}
                {detailsModal}
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Test Runs</h1>
                            <span>List of All the Test Runs</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0">
                        {sessionStorage.getItem("type") === "Tester" ?
                            <div className="add">
                                <h5 className="flex mb-5">Create New Run: <Button variant="success" className="m-0 ml-4" onClick={e => this.setState({ runModal: true })}><FontAwesomeIcon icon={faPlus} className="mr-2" />Add Test Run</Button></h5>

                            </div>
                            : ""}
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>RunName</th>
                                    <th>TestType</th>
                                    <th>Platform</th>
                                    <th>RunStatus</th>
                                    <th>RunResult</th>
                                    <th>Total</th>
                                    <th>Passed </th>
                                    <th>Failed </th>
                                    <th>Errored </th>
                                    <th>Details </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.projects.runs.map((run, i) => (
                                        <tr>
                                            <td>{run.userName}</td>
                                            <td>{run.name}</td>
                                            <td>{run.type}</td>
                                            <td>{run.platform}</td>
                                            <td>{run.status}</td>
                                            <td>{run.result}</td>
                                            <td>{run.counters.total}</td>
                                            <td>{run.counters.passed} </td>
                                            <td>{run.counters.failed} </td>
                                            <td>{run.counters.errored} </td>
                                            <td><FontAwesomeIcon icon={faClipboardList} onClick={e => this.setState({
                                                detailsModal: true,
                                                currRun: run
                                            })} /> </td>
                                        </tr>

                                    ))
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

export default connect(mapStateToProps, mapDispatchToProps)(TestRuns);