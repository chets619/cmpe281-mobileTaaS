import React, { Component } from 'react';
import Axios from "axios";
import configs from "../../config";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

class AdminUsers extends Component {
    state = {
        users: []
    }

    componentDidMount = () => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.get(configs.connect + '/profile/getAdminUsers').then((response) => {
            let data = response.data;
            if (data.success) {
                this.setState({
                    users: data.data
                })
            }
        })
    }

    deleteUser = (id) => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/profile/deleteUser', { id: id }).then((response) => {
            let data = response.data;
            if (data.success) {
                alert('Delete Successful!');
            }
        })

    }

    render() {
        return (
            <>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>System Users</h1>
                            <span>All Users in the System!</span>
                        </center>
                        <hr />
                    </div>

                    <div className="billing-container mx-auto mt-5 col-sm-8">

                        {
                            this.state.users.map((user) => {
                                if (user.email == "admin") return "";

                                return <div className="user d-flex justify-content-between p-3 m-2">
                                    <div className="left">
                                        <div className="name">{user.fname + ' ' + user.lname}</div>
                                        <div className="name">{user.type}</div>
                                    </div>
                                    <div className="right">
                                        <FontAwesomeIcon icon={faTrash} onClick={e => this.deleteUser(user._id)} />
                                    </div>
                                </div>
                            })
                        }

                    </div>
                </div>
            </>
        );
    }
}

export default AdminUsers;