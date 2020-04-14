import React, { Component } from 'react';
import '../../Styles/Navbar.scss';
import Logo from '../../images/logo.png';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSignInAlt, faUserPlus
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { handleLogin } from '../../Redux/Actions/registerActions';
import { connect } from 'react-redux';

class Navbar extends Component {

    state = {
        activeTab: 0,
        loginModal: false,
        fail: false,
        category: "Tester"
    };

    onLogout = e => {
        sessionStorage.clear();

        this.props.history.push("/");
    };

    generateTabs(arr) {
        return arr.map((currTab, i) => {
            return currTab.special ? <div className={"tab " + (this.props.location.pathname == currTab.path ? "selected" : "")} key={i} onClick={
                e => {
                    this.props.history.push({ pathname: currTab.path, state: currTab.state })
                }
            }><span>{currTab.text}</span></div> : <div className={"tab " + (this.props.location.pathname == currTab.path ? "selected" : "")} key={i}><Link to={{
                pathname: currTab.path
            }}>{currTab.text}</Link></div>
        })
    }

    handleClose = () => {
        this.setState({
            loginModal: false
        });
    }

    changeLoginType = (type) => {
        this.setState({
            category: type
        });
    }

    onKeypress = (target) => {
        this.setState({
            [target.name]: target.value
        });
    }

    onLoginClick = () => {
        this.props.handleLogin({ email: this.state.email, password: this.state.password, category: this.state.category });
        this.setState({
            loginModal: false
        });
    }

    render() {
        let testerTabs = [{
            path: '/dashboard',
            text: 'Dashboard'
        },
        {
            path: '/runner',
            text: 'Runner'
        },
        {
            path: '/projects',
            text: 'Projects'
        }];

        let companyTabs = [{
            path: '/dashboard',
            text: 'Dashboard'
        },
        {
            path: '/runner',
            text: 'Runner'
        },
        {
            path: '/projects',
            text: 'Projects'
        }];

        let tabs =
            <React.Fragment>
                {this.generateTabs(sessionStorage.getItem("type") !== null && sessionStorage.getItem("type") === "tester" ? testerTabs : companyTabs)}
            </React.Fragment>;

        let login = sessionStorage.getItem("useremail") == null ?

            <React.Fragment>
                <div className="flex">
                    <div className="login-item flex pointer right-container" onClick={() => this.props.history.push('/signup')}>
                        <FontAwesomeIcon icon={faUserPlus} />
                Register
                </div>
                    <div className="login-item flex pointer right-container" onClick={() => this.setState({
                        loginModal: true
                    })}>
                        <FontAwesomeIcon icon={faSignInAlt} />
                Login
                </div>

                </div>
            </React.Fragment> :
            <div className="right-container flex">
                {tabs}
                <div className="login-item flex pointer tab" onClick={this.onLogout}>
                    <FontAwesomeIcon icon={faSignInAlt} />
                    Logout
                </div>
            </div>
            ;



        return (
            <React.Fragment>
                <Modal show={this.state.loginModal} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Login</Modal.Title>
                    </Modal.Header>
                    <div style={{ fontSize: 16, color: "red" }}>
                        <center>
                            {this.state.fail ? "Invalid Login Credentials" : ""}
                        </center>
                    </div>
                    <Modal.Body>
                        <div>Please login using your Credentials</div>
                        <p></p>
                        <div className="modal-container">
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        name="email"
                                        onChange={e => this.onKeypress(e.target)}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={e => this.onKeypress(e.target)}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Label>
                                Select login type:
                            </Form.Label>
                            <div key={`custom-inline-radio`} className="mb-3">
                                <Form.Check
                                    custom
                                    inline
                                    checked={this.state.category === "Tester"}
                                    name="type"
                                    label="Tester"
                                    type="radio"
                                    id={`tester-radio`}
                                    value="Tester"
                                    onChange={e => this.changeLoginType(e.target.value)}
                                />
                                <Form.Check
                                    custom
                                    inline
                                    checked={this.state.category === "Manager"}
                                    name="type"
                                    label="Manager"
                                    type="radio"
                                    id={`manager-radio`}
                                    value="Manager"
                                    onChange={e => this.changeLoginType(e.target.value)}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.onLoginClick}>
                            Login
                        </Button>
                    </Modal.Footer>
                </Modal>
                <div className="navbar-container flex">
                    <div className="col-sm-8 navbar-main flex">
                        <div className="logo pointer" style={{
                            width: "13.6rem",
                            height: "4rem",
                            backgroundPosition: 'center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: "url(" + Logo + ")"
                        }}>
                        </div>
                        {login}
                    </div>
                </div>
            </React.Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleLogin: (data) => dispatch(handleLogin(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));