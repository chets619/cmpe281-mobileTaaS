import React, { Component } from 'react';
import '../../Styles/Signup.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { handleSignup } from '../../Redux/Actions/registerActions';
import { connect } from 'react-redux';

class Signup extends Component {
    state = {
        userType: "Tester"
    };

    syncKeypress = (target) => {
        this.setState({
            [target.name]: target.value
        })
    }

    onSignup = () => {
        let data = {
            ...this.state
        }
        this.props.handleSignup(data);
    }

    render() {
        return (
            <div className="register-wrapper col-sm-12 card mt-5">
                <center><h4>User Signup</h4></center><br />
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    this.onSignup();
                }}>
                    <Form.Group as={Row} controlId="studentfName">
                        <Form.Label column sm="3">
                            First Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="First Name" required
                                value={this.state.first_name}
                                name="first_name"
                                onChange={e =>
                                    this.syncKeypress(e.target)
                                } />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="studentlName">
                        <Form.Label column sm="3">
                            Last Name
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="text" placeholder="Last Name" required
                                value={this.state.last_name}
                                name="last_name"
                                onChange={e =>
                                    this.syncKeypress(e.target)
                                } />
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="email" as={Row}>
                        <Form.Label column sm="3">Email address</Form.Label>
                        <Col sm="9"><Form.Control type="email" placeholder="name@example.com"
                            value={this.state.email}
                            name="email"
                            onChange={e =>
                                this.syncKeypress(e.target)
                            } />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Password
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" required
                                value={this.state.password}
                                name="password"
                                onChange={e =>
                                    this.syncKeypress(e.target)
                                } />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Confirm Password
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control type="password" placeholder="Password" required
                                value={this.state.password2}
                                name="password2"
                                onChange={e =>
                                    this.syncKeypress(e.target)
                                } />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} controlId="colName">
                        <Form.Label column sm="3">
                            User Type
                        </Form.Label>
                        <Col sm="9">
                            <Form.Control as="select" value={this.state.userType} onChange={e => this.setState({
                                userType: e.target.value
                            })}>
                                <option>Tester</option>
                                <option>Manager</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <center>
                        <Button variant="primary" type="submit" size="lg">
                            Submit
                        </Button>
                    </center>
                </Form>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
