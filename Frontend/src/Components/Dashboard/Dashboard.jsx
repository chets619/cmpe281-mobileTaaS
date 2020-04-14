import React, { Component } from 'react';
import '../../Styles/Dashboard.scss';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import { handleSignup } from '../../Redux/Actions/registerActions';
import { connect } from 'react-redux';

class Dashboard extends Component {
    state = {}
    render() {
        return (<h3>Dashboard</h3>);
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