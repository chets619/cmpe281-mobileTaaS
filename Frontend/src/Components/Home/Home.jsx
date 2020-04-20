import React, { Component } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { withRouter } from "react-router-dom";
import "../../Styles/Home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTwitter,
    faFacebook,
    faGoogle
} from "@fortawesome/free-brands-svg-icons";
import {
    faFileContract,
    faStreetView,
    faTasks,
    faRoute
} from "@fortawesome/free-solid-svg-icons";
class Home extends Component {
    state = {};

    render() {
        let category = sessionStorage.getItem("privileges");
        if (category == "organizer") {
            this.props.history.push("/userhome");
        } else if (category == "admin") {
            this.props.history.push("/admin");
        }
        return (
            <div className="home-wrapper">
                <div className="home-container">
                    <div className="container">
                        <Carousel
                            infiniteLoop={true}
                            autoPlay={true}
                            interval={7000}
                            transitionTime={1000}
                            showThumbs={false}
                        >
                            <div>
                                <img src={require("../../images/bg.jpg")} />
                            </div>
                            <div>
                                <img src={require("../../images/bg1.jpg")} />
                            </div>
                            <div>
                                <img src={require("../../images/bg2.jpg")} />
                            </div>
                        </Carousel>
                        <header className="jumbotron my-4 flex">
                            <div className="display-3 col-sm-4">
                                <img
                                    className=" w-100"
                                    src={require("../../images/image.png")}
                                />
                            </div>
                            <div className="lead col-sm-8">
                                <h2>Freelance your Testing Projects.</h2>
                Freelance your testing projects to external experienced training professionals
              </div>
                        </header>

                        <div className="row text-center">
                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-header">
                                        <FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Efficient Bug Tracking</h4>
                                        <p className="card-text">
                                            Managing and logging of bugs in your project made easier with our in house tracking tool
                    </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-header">
                                        <FontAwesomeIcon icon={faStreetView}></FontAwesomeIcon>
                                    </div>

                                    <div className="card-body">
                                        <h4 className="card-title">Tester Approvals</h4>
                                        <p className="card-text">
                                            Approve tester requests before they can start working on your project!
                    </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-header">
                                        <FontAwesomeIcon icon={faFileContract}></FontAwesomeIcon>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Report Generation</h4>
                                        <p className="card-text">
                                            Get detailed insights and reports about your project on your project page!
                    </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-3 col-md-6 mb-4">
                                <div className="card h-100">
                                    <div className="card-header">
                                        <FontAwesomeIcon icon={faRoute}></FontAwesomeIcon>
                                    </div>
                                    <div className="card-body">
                                        <h4 className="card-title">Convenient User Navigation</h4>
                                        <p className="card-text">
                                            Simple UI for user simplicity
                    </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <header className="jumbotron flex bottom-jum">
                            <div className="lead col-sm-8">
                                <h3>Dynamic Pricing</h3>
                Experience our dynamic pricing according to your use. Flexible to use and competitive pricing strategies.
              </div>
                            <div className="display-3 col-sm-4">
                                <img src={require("../../images/analytics.png")} />
                            </div>
                        </header>
                    </div>
                </div>
                <div className="footer row flex">
                    <div className="footer row flex" id="footer">
                        <div className="col-sm-3 footer-col">
                            <div className="logo-img"></div>
                            <div className="col-sm-12">
                                Mobile Testing app for testing your mobile applications over the cloud
              </div>
                            <div className="icon-app col-sm-12">
                                <FontAwesomeIcon icon={faFacebook} />
                                <FontAwesomeIcon icon={faTwitter} />
                                <FontAwesomeIcon icon={faGoogle} />
                            </div>
                        </div>
                        <div className="col-sm-3 footer-col">
                            <h4 className="lightblue">Navigation:</h4>
                            <br />
                            <div>Home</div>
                            <div>How it works</div>
                            <div>Pricing</div>
                        </div>
                        <div className="col-sm-3 footer-col">
                            <h4 className="lightblue">Useful Links:</h4>
                            <br />
                            <div>My Account</div>
                            <div>About Us</div>
                            <div>FAQ</div>
                        </div>
                        <div className="col-sm-3 footer-col">
                            <h4 className="lightblue">Contact Details:</h4>
                            <br />
                            <div>SJSU Campus, San Jose, California - 95126</div>
                            <div>Phone: +1-123-456-7890</div>
                            <div>Email: help@mtaas.com</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);
