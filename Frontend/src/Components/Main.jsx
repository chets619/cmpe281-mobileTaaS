import React, { Component } from 'react';
import Navbar from './Navbar/Navbar';
import Home from './Home/Home';
import Signup from './Signup/Signup';
import { Route } from 'react-router-dom';

class Main extends Component {
    state = {}
    render() {
        return (
            <div className="">
                <Navbar></Navbar>
                <div className="col-sm-9 m-auto main-wrapper">
                    <Route path="/signup" component={Signup} />
                    <Route path="/" exact component={Home} />
                </div>
            </div>);
    }
}

export default Main;