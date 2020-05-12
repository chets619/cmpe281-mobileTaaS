import React, { Component } from 'react';
import '../../Styles/Project.scss';
import { connect } from 'react-redux';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt, faPlus, faComment, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import configs from "../../config";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Select from "react-select";
import { addMessage } from '../../Redux/Actions/projectActions';


class Messages extends Component {
    state = {
        addModal: false
    }

    componentDidMount = () => {
    }

    closeModal = () => {
        this.setState({
            addModal: false
        });
    }

    sendMessage = () => {

        let data = {
            title: this.state.title,
            desc: this.state.desc,
            sender: this.props.user.currentUser.fname + ' ' + this.props.user.currentUser.lname,
            project: this.props.project._id
        };

        console.log(data)

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/messages/sendMessage', data).then((response) => {
            if (response.data.success) {
                alert("Message Sent");
                this.props.addMessage(data);
                this.setState({
                    addModal: false
                })
            } else {
                alert(response.data.error);
            }
        }).catch(err => alert(err));



    }

    render() {
        let modal = <Modal
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.addModal}
            onHide={this.closeModal}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Message
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formGridAddress1">
                    <Form.Label>Title</Form.Label>
                    <Form.Control placeholder="Message Title" name="title" onChange={e => this.setState({
                        [e.target.name]: e.target.value
                    })} />
                </Form.Group>

                <Form.Group controlId="formGridAddress2">
                    <Form.Label>Description</Form.Label>
                    <Form.Control placeholder="Message Description" as="textarea" name="desc" onChange={e => this.setState({
                        [e.target.name]: e.target.value
                    })} />
                </Form.Group>

                <Button onClick={this.sendMessage}>Send <FontAwesomeIcon icon={faPaperPlane} /></Button>
            </Modal.Body>
        </Modal>;

        return (
            <React.Fragment>
                {modal}
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Messages</h1>
                            <span>Important messages:</span>
                        </center>
                        <hr />
                    </div>
                    <div className="message-container">
                        <Button onClick={e => this.setState({ addModal: true })}>Send Message <FontAwesomeIcon icon={faComment} /></Button>
                        {
                            this.props.messages.map(message => (
                                <div className="message d-flex justify-content-between border-info border p-2 m-2">

                                    <div>
                                        <h6>{message.title}</h6>
                                        <span>{message.desc}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <p className="blockquote-footer m-0">{message.sender} - {new Date(message.date).toLocaleDateString()}</p>
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

const mapStateToProps = state => {
    return {
        messages: state.projects.messages,
        user: state.user,
        project: state.projects.currentProject
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addMessage: (data) => dispatch(addMessage(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Messages);