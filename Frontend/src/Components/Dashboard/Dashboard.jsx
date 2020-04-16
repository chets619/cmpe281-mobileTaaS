import React, { Component } from 'react';
import '../../Styles/Dashboard.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { handleSignup } from '../../Redux/Actions/registerActions';
import { connect } from 'react-redux';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import Constants from '../Constants';

class Dashboard extends Component {
    state = {}
    render() {
        return (
            <div className="project-details-wrapper card p-4">
                <div className="title-div">
                    <center>
                        <h2>Dashboard</h2>
                        <h6>Summary of all the project details and resources being used</h6>
                        <hr />
                    </center>
                </div>
                <div className="details-body col-sm-12 row mt-3">
                    <div className="col-sm-6 mt-3">
                        <div className="header"><center><h3>No of Mobile Devices</h3></center></div>
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
                                        Constants.ANDROID_OPTIONS[0].label,
                                        Constants.IPHONE_OPTIONS[1].label,
                                        Constants.ANDROID_OPTIONS[2].label,
                                        Constants.ANDROID_OPTIONS[6].label,
                                        Constants.ANDROID_OPTIONS[1].label,
                                        Constants.IPHONE_OPTIONS[4].label
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
                    <div className="col-sm-6 mt-3">
                        <div className="header"><center><h3>No of Testing Scripts</h3></center></div>
                        <div className="chart">
                            <Bar
                                data={{
                                    datasets: [{
                                        data: [4, 2, 3],
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
                                        'sample',
                                        'sample 2',
                                        'sample 3'
                                    ]
                                }
                                }
                                width={250}
                                height={400}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    legend: {
                                        display: false
                                    },
                                    scales: { yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }] }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-sm-6 mt-5">
                        <div className="header"><center><h3>No of Bugs</h3></center></div>
                        <div className="chart">
                            <Bar
                                data={{
                                    datasets: [{
                                        data: [2, 3, 5],
                                        borderColor: 'red',
                                        backgroundColor: 'red',
                                        label: 'New'
                                    }, {
                                        data: [1, 2, 2],
                                        backgroundColor: 'green',
                                        label: 'Resolved'
                                    }],
                                    labels: [
                                        'sample',
                                        'sample 2',
                                        'sample 3'
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
                                    },
                                    scales: { yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }] }
                                }}
                            />
                        </div>


                    </div>
                    <div className="col-sm-6 mt-5">
                        <div className="header"><center><h3>No of Emulators</h3></center></div>
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
                    <div className="col-sm-6 mt-5 mx-auto">
                        <div className="header"><center><h3>No of Testing Documents</h3></center></div>
                        <div className="chart">
                            <Bar
                                data={{
                                    datasets: [{
                                        data: [2, 1, 3],
                                        borderColor: 'red',
                                        backgroundColor: 'teal',
                                        label: 'Documents'
                                    }],
                                    labels: [
                                        'sample',
                                        'sample 2',
                                        'sample 3'
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
                                    },
                                    scales: { yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks: { min: 0 } }] }
                                }}
                            />
                        </div>


                    </div>

                </div>
            </div>);
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleSignup: (data) => dispatch(handleSignup(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);