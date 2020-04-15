import React, { Component } from 'react';
import '../../Styles/Dashboard.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { handleSignup } from '../../Redux/Actions/registerActions';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';

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
                    <div className="col-sm-4">
                        <div className="header"><center><h3>Title</h3></center></div>
                        <div className="chart">
                            <Doughnut
                                data={{
                                    datasets: [{
                                        data: [10, 20, 30],
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
                                        'Red',
                                        'Yellow',
                                        'Blue'
                                    ]
                                }
                                }
                                width={250}
                                height={250}
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
                        <div className="header"><center><h3>Title</h3></center></div>
                        <div className="chart">
                            <Doughnut
                                data={{
                                    datasets: [{
                                        data: [10, 20, 30],
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
                                        'Red',
                                        'Yellow',
                                        'Blue'
                                    ]
                                }
                                }
                                width={250}
                                height={250}
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
                        <div className="header"><center><h3>Title</h3></center></div>
                        <div className="chart">
                            <Doughnut
                                data={{
                                    datasets: [{
                                        data: [10, 20, 30],
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
                                        'Red',
                                        'Yellow',
                                        'Blue'
                                    ]
                                }
                                }
                                width={250}
                                height={250}
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