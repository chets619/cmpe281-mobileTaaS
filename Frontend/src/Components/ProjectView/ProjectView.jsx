import React, { Component } from 'react';
import '../../Styles/Project.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Doughnut } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table'
import CONSTANTS from '../Constants';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class ProjectView extends Component {
    state = {}

    componentDidMount = () => {

    }

    render() {
        if (!this.props.project._id)
            return <Redirect to="/projects" />;

        return (
            <React.Fragment>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>{this.props.project.title}</h1>
                            <span>{this.props.project.desc}</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0">
                        <div className="col-sm-3">
                            <div className="tester-list">
                                <h4>Tester List:</h4>

                                {/* TESTER MAP */}
                                <div className="tester flex justify-content-between p-2">
                                    <span>Tester 1</span>
                                    <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                </div>
                                <div className="tester flex justify-content-between p-2">
                                    <span>Tester 2</span>
                                    <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                </div>
                                <div className="tester flex justify-content-between p-2">
                                    <span>Tester 3</span>
                                    <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                </div>


                            </div>

                            <div className="pending-tester-list mt-4">
                                <h4>Tester Requests:</h4>

                                {/* TESTER MAP */}
                                <div className="tester flex justify-content-between p-2">
                                    <span>Tester 4</span>
                                    <div className="btn-container">
                                        <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                        <Button variant="success" size="sm"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
                                    </div>
                                </div>
                                <div className="tester flex justify-content-between p-2">
                                    <span>Tester 5</span>
                                    <div className="btn-container">
                                        <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                        <Button variant="success" size="sm"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
                                    </div>
                                </div>
                                <div className="tester flex justify-content-between p-2">
                                    <span>Tester 6</span>
                                    <div className="btn-container">
                                        <Button variant="danger" size="sm"><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                        <Button variant="success" size="sm"><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
                                    </div>
                                </div>


                            </div>
                        </div>
                        <div className="col-sm-9 border-left-grey  pr-0">
                            <div className="statistic-container">
                                <h4>Statistics:</h4>
                                <div className="details-body col-sm-12 row mx-0 mt-3">
                                    <div className="col-sm-4">
                                        <div className="header"><center><h4>Mobile Devices</h4></center></div>
                                        <div className="chart">
                                            <Doughnut
                                                data={{
                                                    datasets: [{
                                                        data: [2, 7, 5, 4, 5, 7],
                                                        backgroundColor: [
                                                            'rgba(255, 99, 132, 0.6)',
                                                            'rgba(255, 206, 86, 0.6)',
                                                            'rgba(54, 162, 235, 0.6)',
                                                            'rgba(75, 192, 192, 0.6)',
                                                            'rgba(153, 102, 255, 0.6)',
                                                            'rgba(255, 159, 64, 0.6)',
                                                            'rgba(255, 99, 132, 0.6)'
                                                        ]
                                                    }],
                                                    labels: [
                                                        CONSTANTS.ANDROID_OPTIONS[0].label,
                                                        CONSTANTS.IPHONE_OPTIONS[1].label,
                                                        CONSTANTS.ANDROID_OPTIONS[2].label,
                                                        CONSTANTS.ANDROID_OPTIONS[6].label,
                                                        CONSTANTS.ANDROID_OPTIONS[1].label,
                                                        CONSTANTS.IPHONE_OPTIONS[4].label
                                                    ]
                                                }
                                                }
                                                width={250}
                                                height={400}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    legend: {
                                                        position: 'bottom'
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="header"><center><h4>Emulators</h4></center></div>
                                        <div className="chart">
                                            <Doughnut
                                                data={{
                                                    datasets: [{
                                                        data: [3, 4, 1],
                                                        backgroundColor: [
                                                            'rgba(75, 192, 192, 0.6)',
                                                            'rgba(153, 102, 255, 0.6)',
                                                            'rgba(255, 159, 64, 0.6)',
                                                            'rgba(255, 99, 132, 0.6)'
                                                        ]
                                                    }],
                                                    labels: [
                                                        'Emulator 1',
                                                        'Emulator 2',
                                                        'Emulator 3'
                                                    ]
                                                }
                                                }
                                                width={250}
                                                height={400}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    legend: {
                                                        position: 'bottom'
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-sm-4">
                                        <div className="header"><center><h4>Bugs</h4></center></div>
                                        <div className="chart">
                                            <Doughnut
                                                data={{
                                                    datasets: [{
                                                        data: [2, 5],
                                                        backgroundColor: [
                                                            'Green',
                                                            'red'
                                                        ]
                                                    }],
                                                    labels: [
                                                        'Resolved',
                                                        'Open',
                                                    ]
                                                }
                                                }
                                                width={250}
                                                height={400}
                                                options={{
                                                    responsive: true,
                                                    maintainAspectRatio: false,
                                                    legend: {
                                                        position: 'bottom'
                                                    }
                                                }}
                                            /></div>


                                    </div>
                                </div>
                            </div>

                            <div className="tab-container mt-5 p-2">
                                <Tabs defaultActiveKey="files" id="uncontrolled-tab-example" className="">
                                    <Tab eventKey="files" title="Files" className="p-2 border">
                                        <div className="files-container mt-2">
                                            <h4>Project Files:</h4>
                                            <Table striped bordered hover responsive>
                                                <thead>
                                                    <tr>
                                                        <th>File Name</th>
                                                        <th>Uploader</th>
                                                        <th>Time</th>
                                                        <th>Size</th>
                                                        <th>Delete</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tester1_Test1</td>
                                                        <td>Tester 1</td>
                                                        <td>04/15/2020</td>
                                                        <td>0.5 MB</td>
                                                        <td><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></td>
                                                    </tr>
                                                    <tr>
                                                        <td>Tester1_Test2</td>
                                                        <td>Tester 1</td>
                                                        <td>04/13/2020</td>
                                                        <td>0.4 MB</td>
                                                        <td><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></td>

                                                    </tr>
                                                    <tr>
                                                        <td>Tester2_Test1</td>
                                                        <td>Tester 2</td>
                                                        <td>04/14/2020</td>
                                                        <td>0.6 MB</td>
                                                        <td><FontAwesomeIcon icon={faTrashAlt}></FontAwesomeIcon></td>

                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                    </Tab>
                                    <Tab eventKey="runs" title="Test Runs" className="p-2 border border">
                                        <div className="runs-indicator mt-2">
                                            <h4>Test Run Details:</h4>
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
                                                        <th>Other </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Tester 2</td>
                                                        <td>t2r1</td>
                                                        <td>APPIUM_NODE</td>
                                                        <td>Android</td>
                                                        <td>Completed</td>
                                                        <td>Completed</td>
                                                        <td>5</td>
                                                        <td>4 </td>
                                                        <td>1 </td>
                                                        <td>0 </td>
                                                        <td>0 </td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </div>

                                    </Tab>
                                    <Tab eventKey="bugs" title="Bug Tracker" className="p-2 border border">
                                        <div className="bug-indicator mt-2">
                                            <h4>Bug Tracker:</h4>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Tester</th>
                                                        <th>Severity</th>
                                                        <th>Hardware</th>
                                                        <th>OS</th>
                                                        <th>Summary</th>
                                                        <th>Script</th>
                                                        <th>Date</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                            </Table>
                                        </div>

                                    </Tab>
                                </Tabs>
                            </div>





                        </div>
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