import React, { Component } from 'react';
import '../../Styles/Project.scss';
import { connect } from 'react-redux';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import configs from "../../config";
import Table from 'react-bootstrap/Table';

class TestRuns extends Component {
    state = {}
    render() {
        return (
            <React.Fragment>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Test Runs</h1>
                            <span>List of All the Test Runs</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0">
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
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TestRuns);