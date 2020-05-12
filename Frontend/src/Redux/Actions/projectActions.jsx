import Axios from "axios";
import configs from "../../config";

export const getProjects = (data) => {

    return (dispatch) =>
        new Promise((resolve, reject) => {
            Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            Axios.get(configs.connect + '/projects/getProjects/' + data.type + '/' + data.email + '/' + data.id).then((response) => {
                let data = response.data;
                if (data.success) {
                    dispatch({
                        type: "SET_PROJECTS",
                        payload: data.projects
                    });
                    resolve(data.projects);
                }
            }).catch(err => alert(err));
        });

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
        }).catch(err => alert(err));
    }
}

export const addProject = (data) => {
    return (dispatch) => {
        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
        Axios.post(configs.connect + '/projects/addProject', data).then((response) => {
            if (response.data.success) {
                dispatch({
                    type: "ADD_PROJECT",
                    payload: response.data.project
                });
            } else {
                alert(response.data.error);
            }
        }).catch(err => alert(err));
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
                    payload: response.data.result
                });
                alert("Successfully Applied!")
            } else {
                alert(response.data.error);
            }
        }).catch(err => alert(err));
    }
}

export const getFiles = (data) => {
    return (dispatch) => {
        let query = configs.connect + (sessionStorage.getItem("type") == "Manager" ? '/files/getAllFiles/' + data.id : '/files/getTesterFiles/' + data.id + "/" + data.name);

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        Axios.get(query).then((response) => {
            let data = response.data;
            if (data.success) {
                console.log(data)

                dispatch({
                    type: "SET_FILES",
                    payload: data.files
                });
            }
        }).catch(err => alert(err));
    }
}

export const getRuns = (data) => {
    return (dispatch) => {
        let query = configs.connect + '/runs/getAllRuns/?project=' + data.proj_name + (sessionStorage.getItem("type") == "Manager" ? '' : '&user=' + sessionStorage.getItem('useremail'));

        Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');

        Axios.get(query).then((response) => {
            let data = response.data;
            if (data.success) {
                console.log(data.runs)

                dispatch({
                    type: "SET_RUNS",
                    payload: data.runs
                });
            }
        }).catch(err => alert(err));
    }
}




export const setCurrentProject = (data) => {
    return {
        type: "SET_CURRENT_PROJECT",
        payload: data
    };
}

export const deleteTester = (data) => {
    return {
        type: "DELETE_TESTER",
        payload: data
    };
}

export const acceptTester = (data) => {
    return {
        type: "ACCEPT_TESTER",
        payload: data
    };
}
