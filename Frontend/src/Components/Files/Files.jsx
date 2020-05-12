import React, { Component } from 'react';
import '../../Styles/Project.scss';
import { connect } from 'react-redux';
import { faCross, faTrash, faTimes, faCheck, faDownload, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Axios from "axios";
import configs from "../../config";
import Table from 'react-bootstrap/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import { getFiles } from '../../Redux/Actions/projectActions';

class Files extends Component {
    state = {
        project: {},
        files: []
    }

    componentDidMount = () => {

    }


    render() {
        if (!this.props.user.currentUser._id)
            return <Redirect to="/projects" />;

        return (
            <React.Fragment>
                <div className="project-details-wrapper card p-3">
                    <div className="title-div">
                        <center>
                            <h1>Files</h1>
                            <span>All files in the project</span>
                        </center>
                        <hr />
                    </div>
                    <div className="details-body col-sm-12 row mx-0 mt-3 p-0 flex-column">
                        <div className="add mb-5">

                            <h4>Upload File:</h4> <input type="file" className="upload-btn" id="upload-btn" onChange={e => this.uploadFile(e)} />
                        </div>

                        <div>
                            <h4>List of Files:</h4>
                        </div>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>File Name</th>
                                    <th>Uploader</th>
                                    <th>Time</th>
                                    <th>Size</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.props.projects.files.map((currFile, i) => {
                                        let owner = currFile.file_url.split("/")[currFile.file_url.split("/").length - 2];

                                        return <tr key={i}>
                                            <td>{currFile.key}</td>
                                            <td>{owner}</td>
                                            <td>{new Date(currFile.modified).toLocaleDateString()}</td>
                                            <td>{currFile.size}</td>
                                            <td>
                                                {
                                                    sessionStorage.getItem("type") == "Manager" || owner == this.props.user.currentUser.fname ?
                                                        <FontAwesomeIcon icon={faTrashAlt} onClick={e => this.deleteFile(currFile)}></FontAwesomeIcon> : ""
                                                }
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </React.Fragment>

        );
    }

    deleteFile = file => {
        console.log('file', file)
        let data = {
            Key: file.file_url.split("amazonaws.com/")[1]
        }

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        Axios.post(configs.connect + '/files/deleteFile', data).then((response) => {
            let data = response.data;
            if (data.success) {
                let data = {
                    id: this.props.project._id,
                    name: this.props.user.currentUser.fname
                }

                this.props.getFiles(data);
                alert("Deleted Successfully")
            } else {
                console.log(JSON.stringify(data.error))
            }
        }).catch(err => console.log(err));
    }

    uploadFile = e => {
        const data = new FormData();
        data.append('image', e.target.files[0]);

        let query = configs.connect + '/files/uploadFile/' + this.props.location.state.id + "/" + (sessionStorage.getItem("type") == "Manager" ? 'Public' : this.props.user.currentUser.fname);

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        Axios.post(query, data).then((response) => {
            let data = response.data;
            if (data.success) {
                let data = {
                    id: this.props.project._id,
                    name: this.props.user.currentUser.fname
                }

                this.props.getFiles(data);
                console.log(data)
                alert("Uploaded Successfully")
            }
        }).catch(err => console.log(err));
    };
}

const mapStateToProps = state => {
    return {
        project: state.projects.currentProject,
        projects: state.projects,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getFiles: (data) => dispatch(getFiles(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Files);