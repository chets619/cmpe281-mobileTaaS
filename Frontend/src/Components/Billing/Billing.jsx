import React, { Component, Fragment } from 'react';
import { loadProfile } from '../../Redux/Actions/profileActions';
import { getProjects } from '../../Redux/Actions/projectActions';
import { connect } from 'react-redux';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import './Billing.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';

class Billing extends Component {
    state = {}

    componentDidMount = () => {
        if (!this.props.user._id)
            this.props.loadProfile(sessionStorage.getItem("user_id")).then(data => {
                this.props.getProjects({ email: this.props.user.email, type: this.props.user.type, id: this.props.user._id }).then(data => {
                });
            });
        else {
            this.props.getProjects({ email: this.props.user.email, type: this.props.user.type, id: this.props.user._id }).then(data => {
            });
        }
    }

    render() {
        console.log(this.props.projects.projects);

        return (
            <Fragment>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Billing</h1>
                            <span>This is the billing page. You can find details about all the billing about all the projects here...</span>
                        </center>
                        <hr />
                    </div>

                    <div className="billing-container">


                        <div class="invoice-box my-5">
                            <table cellpadding="0" cellspacing="0">
                                <tr class="top">
                                    <td colspan="2">
                                        <table>
                                            <tr>
                                                <td class="title">
                                                    <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/SJSU_Seal.svg/1200px-SJSU_Seal.svg.png" className="logo-bill" />
                                                </td>

                                                <td>
                                                    Invoice #: 123<br />
                                                        Created: {new Date().toDateString()}<br />
                                                            Due: {new Date(new Date().setMonth(new Date().getMonth() + 1)).toDateString()}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr class="information">
                                    <td colspan="2">
                                        <table>
                                            <tr>
                                                <td>
                                                    MobileTaaS<br />
                                                    1 Washington Sq<br />
                                                                    San Jose, CA 95192
                                                </td>

                                                <td>
                                                    {this.props.user.fname + ' ' + this.props.user.lname}<br />
                                                    {sessionStorage.getItem('useremail')}
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>

                                <tr class="heading">
                                    <td>
                                        Projects
                                    </td>

                                    <td>
                                        Total #
                                    </td>
                                </tr>

                                <tr class="details">
                                    <td>
                                        Project
                                    </td>

                                    <td>
                                        4
                                    </td>
                                </tr>

                                <tr class="heading">
                                    <td>
                                        Item
                                    </td>

                                    <td>
                                        Price
                                    </td>
                                </tr>

                                <tr class="item">
                                    <td>
                                        Monthly Service Charge
                                    </td>

                                    <td>
                                        $20.00
                                    </td>
                                </tr>

                                <tr class="item">
                                    <td>
                                        Storage Charges @ $0.025 /MB:
                                    </td>

                                    <td>
                                        400MB -  $10.00
                                    </td>
                                </tr>

                                <tr class="item">
                                    <td>
                                        Device Charges @ $0.25/device minute:
                                    </td>

                                    <td>
                                        60mins -  $15.00
                                    </td>
                                </tr>

                                <tr class="item">
                                    <td>
                                        Emulator Charges @ $0.75/device minute:
                                    </td>

                                    <td>
                                        25mins -  $18.75
                                    </td>
                                </tr>

                                <tr class="item last">
                                    <td>
                                        Infrastructure Charges
                                    </td>

                                    <td>
                                        $100.00
                                    </td>
                                </tr>

                                <tr class="total">
                                    <td></td>

                                    <td>
                                        Total: $160.00
                                    </td>
                                </tr>
                            </table>
                        </div>


                        <div className="col-sm-3 mx-auto">
                            <Link to={{ pathname: '/payment', state: { amount: 160 } }}>
                                <Button className="w-100">Pay Now <FontAwesomeIcon icon={faCreditCard} className="paypal" /></Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </Fragment >
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user.currentUser,
        projects: state.projects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProfile: (data) => dispatch(loadProfile(data)),
        getProjects: (data) => dispatch(getProjects(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Billing);