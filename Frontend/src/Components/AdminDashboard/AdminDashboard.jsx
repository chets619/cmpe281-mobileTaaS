import React, { Component } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard, faCross, faTrash } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import configs from "../../config";


class AdminDashboard extends Component {
    state = {
        projects: [],
        files: {},
        run: {}
    };

    componentDidMount = () => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.get(configs.connect + '/projects/getAdminProjects/').then((response) => {
            let data = response.data;
            if (data.success) {
                this.setState({
                    projects: data.data
                }, async () => {
                    this.state.projects.forEach(async project => {

                        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
                        const files = await Axios.get(configs.connect + '/files/getAllFiles/' + project._id);

                        this.setState({
                            ...this.state,
                            files: {
                                ...this.state.files,
                                [project._id]: files.data.files
                            }
                        });
                    });


                    Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
                    const runs = await Axios.get(configs.connect + '/runs/getAdminRuns');

                    runs.data.forEach(currRun => {
                        let a = this.state.run[currRun.projectName];

                        if (a)
                            a.push(currRun);
                        else
                            a = [currRun];


                        this.setState({
                            run: {
                                ...this.state.run,
                                [currRun.projectName]: a
                            }
                        })
                    });
                })

            }
        }).catch(err => console.log("Some Error Occurred!"));
    }

    deleteTester = (id, project_id) => {
        let data = { id: id, proj_id: project_id };

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/projects/deleteTester', data).then((response) => {
            if (response.data.success) {
                alert("Tester Rejected!");
            } else {
                console.log(response.data.error);
            }
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Admin Dashboard</h1>
                            <span>System Admin Dashboard!</span>
                        </center>
                        <hr />
                    </div>

                    <div className="billing-container mx-auto mt-5 col-sm-8">

                        <h5>Projects</h5>
                        {
                            this.state.projects.map((project) => (
                                <div className="project-container border border-primary m-2 p-3">
                                    <div className="title"><b>Project Name: </b>{project.title}</div>
                                    <div className="manager">Project Manager: {project.manager}</div>
                                    <Accordion defaultActiveKey="">
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                                Files
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    {
                                                        this.state.files[project._id] && this.state.files[project._id].map((file) => {
                                                            return <div className="file d-flex justify-content-between">
                                                                <span>{file.key}</span>
                                                                <span>{file.size}</span>
                                                            </div>
                                                        })
                                                    }
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                        <Card>
                                            <Accordion.Toggle as={Card.Header} eventKey="1">
                                                Testers
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey="1">
                                                <Card.Body>

                                                    {
                                                        project.testers.map((tester) => {
                                                            return <div className="tester d-flex justify-content-between my-1">
                                                                <span>{tester.id.fname + ' ' + tester.id.lname}</span>
                                                                <span onClick={e => this.deleteTester(tester._id, project._id)}><FontAwesomeIcon icon={faTrash} /></span>
                                                            </div>
                                                        }, project)
                                                    }

                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                    <div className="files">
                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default AdminDashboard;