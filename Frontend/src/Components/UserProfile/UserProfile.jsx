import React, { Component } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { loadProfile } from '../../Redux/Actions/profileActions';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';
import configs from "../../config";

class UserProfile extends Component {
    state = {}

    componentDidMount = () => {

        if (sessionStorage.getItem("useremail") && !this.props.user._id) {
            this.props.loadProfile(sessionStorage.getItem("user_id")).then(data => {
                this.setState({ ...data });
            });
        } else {
            this.setState({ ...this.props.user });
        }
    }

    onUpdate = () => {
        let data = {
            ...this.state,
            id: this.props.user._id
        };

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        Axios.post(configs.connect + '/profile/update', data).then(response => {
            console.log(response.data);
            alert("Updated!");
            this.props.loadProfile(sessionStorage.getItem("user_id"));
        });
    }

    render() {
        return (
            <React.Fragment>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Profile Page</h1>
                            <span>This is your profile page. Can add or edit data here...</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0">
                        <Form className="col-sm-8 mx-auto mt-4">
                            <Form.Group as={Row} controlId="formPlaintextEmail">
                                <Form.Label column sm="3">
                                    Email
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control plaintext readOnly defaultValue={this.props.user.email} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    First Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="First Name" name="fname" value={this.state.fname} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Last Name
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Last Name" name="lname" value={this.state.lname} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Phone
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="number" placeholder="Phone" name="phone" value={this.state.phone} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Country
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="Country" name="country" value={this.state.country} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    State
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="State" name="state" value={this.state.state} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    City
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control type="text" placeholder="City" name="city" value={this.state.city} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Form.Label column sm="3">
                                    Description
                                </Form.Label>
                                <Col sm="9">
                                    <Form.Control as="textarea" rows="4" placeholder="Description" name="desc" value={this.state.desc} onChange={e => this.setState({ [e.target.name]: e.target.value })} />
                                </Col>
                            </Form.Group>



                            <Form.Group as={Row} controlId="formPlaintextPassword">
                                <Button className="mt-2 mx-auto" onClick={this.onUpdate}> Update </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProfile: (data) => dispatch(loadProfile(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);