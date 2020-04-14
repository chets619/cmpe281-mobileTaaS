import Axios from "axios";
import configs from "../../config";

export const getProjects = (data) => {

    return (dispatch) => {
        console.log('data', data)
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.get(configs.connect + '/projects/getProjects/' + data.type + '/' + data.email).then((response) => {
            let data = response.data;
            if (data.success) {
                dispatch({
                    type: "SET_PROJECTS",
                    payload: data.projects
                });
            }
        }).catch(err => alert("Some Error Occurred!"));
    }
}

export const getTestersForProjects = (id) => {

    return (dispatch) => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.get(configs.connect + '/projects/getTesters/' + id).then((response) => {
            let data = response.data;
            console.log('data.testers', data.testers);
            if (data.success) {
                dispatch({
                    type: "SET_TESTERS",
                    payload: data.testers
                });
            }
        }).catch(err => alert("Some Error Occurred!"));
    }
}

export const addProject = (data) => {
    return (dispatch) => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/projects/addProject', data).then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "SET_PROJECTS",
                    payload: response.data.projects
                });
            } else {
                alert(response.data.error);
            }
        }).catch(err => alert("Some Error Occurred!"));
    }
}

export const addTester = (id, tester_id) => {
    return (dispatch) => {
        console.log('id, tester_id', id, tester_id)
        let data = {
            p_id: id,
            t_id: tester_id
        }
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/projects/addTester', data).then((response) => {
            console.log('response', response)
            if (response.data.success) {
                dispatch({
                    type: "ADD_TESTER",
                    payload: response.data.tester
                });
            } else {
                alert(response.data.error);
            }
        }).catch(err => alert("Some Error Occurred!"));
    }
}
