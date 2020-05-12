import React, { Component } from 'react';
import '../../Styles/Project.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Doughnut } from 'react-chartjs-2';
import Table from 'react-bootstrap/Table'
import CONSTANTS from '../Constants';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Axios from "axios";
import configs from "../../config";
import { deleteTester, acceptTester, getFiles, getRuns, getMessages } from '../../Redux/Actions/projectActions';


class ProjectView extends Component {
    state = {}

    componentDidMount = () => {
        let data = {
            id: this.props.project._id,
            name: this.props.user.currentUser.fname,
            proj_name: this.props.project.title
        }

        this.props.getFiles(data);
        this.props.getRuns(data);
        this.props.getMessages(data);
    }

    deleteTester = (id) => {
        let data = { id: id, proj_id: this.props.project._id };

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/projects/deleteTester', data).then((response) => {
            if (response.data.success) {
                alert("Tester Rejected!");
                this.props.deleteTester(data);
            } else {
                console.log(response.data.error);
            }
        }).catch(err => console.log(err));
    }

    acceptTester = (id) => {
        let data = { id: id, proj_id: this.props.project._id };

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/projects/acceptTester', data).then((response) => {
            if (response.data.success) {
                alert("Tester Accepted!");
                this.props.acceptTester(data);
            } else {
                console.log(response.data.error);
            }
        }).catch(err => console.log(err));
    }

    render() {
        if (!this.props.project._id)
            return <Redirect to="/projects" />;

        let bugCount = [0, 0];

        this.props.project.bugs.forEach(bug => {
            bugCount[bug.status == "Resolved" ? 0 : 1]++;
        });

        let testerList = {
            registered: [],
            requested: []
        };

        this.props.project.testers.forEach(tester => testerList[tester.status == "Applied" ? "requested" : "registered"].push(tester));

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
                        <div className={(sessionStorage.getItem("type") == "Tester" ? "hidden" : "col-sm-3")} >
                            <div className="tester-list">
                                <h4>Tester List:</h4>


                                {
                                    testerList.registered.length ? testerList.registered.map(tester => {
                                        return <div className="tester flex justify-content-between p-2">
                                            <span>{tester.id.fname + " " + tester.id.lname}</span>
                                            <Button variant="danger" size="sm" onClick={e => this.deleteTester(tester._id)}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                        </div>
                                    }) : "No Testers Registered"
                                }

                            </div>

                            <div className="pending-tester-list mt-4">
                                <h4>Tester Requests:</h4>

                                {
                                    testerList.requested.map(tester => {
                                        return <div className="tester flex justify-content-between p-2">
                                            <span>{tester.id.fname + " " + tester.id.lname}</span>
                                            <div className="btn-container">
                                                <Button variant="danger" size="sm" onClick={e => this.deleteTester(tester._id)}><FontAwesomeIcon icon={faTimes}></FontAwesomeIcon></Button>
                                                <Button variant="success" size="sm" onClick={e => this.acceptTester(tester._id)}><FontAwesomeIcon icon={faCheck}></FontAwesomeIcon></Button>
                                            </div>
                                        </div>
                                    })
                                }


                            </div>
                        </div>
                        <div className={(sessionStorage.getItem("type") == "Tester" ? "col-sm-12" : "col-sm-9") + " border-left-grey  pr-0"}>
                            <div className="statistic-container">
                                <h4>Statistics:</h4>
                                <div className="details-body col-sm-12 row mx-0 mt-3">
                                    <div className="col-sm-4">
                                        <div className="header"><center><h4>Mobile Devices</h4></center></div>
                                        <div className="chart">
                                            <Doughnut
                                                data={{
                                                    datasets: [{
                                                        data: [2, 7, 5, 4],
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
                                                        CONSTANTS.ANDROID_OPTIONS[2].label,
                                                        CONSTANTS.ANDROID_OPTIONS[6].label,
                                                        CONSTANTS.ANDROID_OPTIONS[1].label,
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
                                                        data: bugCount,
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
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.props.projects.files.map((currFile, i) => {
                                                            let owner = currFile.file_url.split("/")[currFile.file_url.split("/").length - 2];

                                                            return <tr key={i}>
                                                                <td>{currFile.key}</td>
                                                                <td>{owner}</td>
                                                                <td>{new Date(currFile.modified).toLocaleDateString()}</td>
                                                                <td>{currFile.size}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </Table>

                                            <Link to={{
                                                pathname: `/files`,
                                                state: {
                                                    id: this.props.project._id
                                                }
                                            }} ><Button > Go to Uploaded Files</Button></Link>
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
                                                            </tr>

                                                        ))
                                                    }
                                                </tbody>
                                            </Table>

                                            <Link to={{
                                                pathname: `/testRun`,
                                                state: {
                                                    id: this.props.project._id
                                                }
                                            }} ><Button > Go to Test Run Screen</Button></Link>
                                        </div>

                                    </Tab>
                                    <Tab eventKey="bugs" title="Bug Tracker" className="p-2 border border">
                                        <div className="bug-indicator mt-2">
                                            <h4>Bug Tracker:</h4>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr className="row mx-0">
                                                        <th className="col-sm-5">Title</th>
                                                        <th className="col-sm-3">Tester</th>
                                                        <th className="col-sm-2">Severity</th>
                                                        <th className="col-sm-2">Status</th>
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {
                                                        this.props.project.bugs.map((currBug, i) => {
                                                            return <tr className="row mx-0">
                                                                <td className="col-sm-5">{currBug.title}</td>
                                                                <td className="col-sm-3">{currBug.tester && currBug.tester.fname + " " + currBug.tester.lname}</td>
                                                                <td className="col-sm-2">{currBug.severity}</td>
                                                                <td className="col-sm-2">{currBug.status}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </Table>

                                            <Link to={{
                                                pathname: `/bugTracker`,
                                                state: {
                                                    id: this.props.project._id
                                                }
                                            }} ><Button > Go to Bug Tracker</Button></Link>
                                        </div>

                                    </Tab>
                                    <Tab eventKey="emulator" title="Emulators" className="p-2 border border">
                                        <div className="runs-indicator mt-2">
                                            <h4>Emulator Details:</h4>

                                            <div className="my-3">3 Emulators available</div>
                                            {
                                                sessionStorage.getItem("type") == "Tester" ? <Link to={{
                                                    pathname: `/emulator`,
                                                    state: {
                                                        id: this.props.project._id
                                                    }
                                                }} ><Button > Go to Emulator Screen</Button></Link> : ""
                                            }

                                        </div>

                                    </Tab>
                                    <Tab eventKey="messages" title="Messages" className="p-2 border border">
                                        <div className="runs-indicator mt-2">
                                            <h4>Project Messages:</h4>

                                            {
                                                this.props.projects.messages.length ?
                                                    this.props.projects.messages.slice(0, 5).map((message, i) => (
                                                        <div className="message d-flex justify-content-between border-info border p-2 m-2">

                                                            <div>
                                                                <h6>{message.title}</h6>
                                                                <span>{message.desc}</span>
                                                            </div>
                                                            <div className="d-flex align-items-center">
                                                                <p className="blockquote-footer m-0">{message.sender} - {new Date(message.date).toLocaleDateString()}</p>
                                                            </div>

                                                        </div>
                                                    )) : <div className="my-3">No Messages Found</div>
                                            }

                                            <Link to={{
                                                pathname: `/messages`,
                                                state: {
                                                    id: this.props.project._id
                                                }
                                            }} ><Button > Show All Messages</Button></Link>
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
        project: state.projects.currentProject,
        projects: state.projects,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        deleteTester: (data) => dispatch(deleteTester(data)),
        getFiles: (data) => dispatch(getFiles(data)),
        getRuns: (data) => dispatch(getRuns(data)),
        getMessages: (data) => dispatch(getMessages(data)),
        acceptTester: (data) => dispatch(acceptTester(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);