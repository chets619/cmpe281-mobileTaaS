import Axios from "axios";
import configs from "../../config";
import { push } from 'connected-react-router';

export const loadProfile = (id) => {
    return (dispatch) =>
        new Promise((resolve, reject) => {
            Axios.defaults.headers.common['authorization'] = sessionStorage.getItem('token');
            Axios.get(configs.connect + '/profile/getUser/' + id).then((response) => {
                let data = response.data;
                if (data.success) {
                    dispatch({
                        type: "SET_PROFILE_DATA",
                        payload: data.user
                    });
                    resolve(data.user);
                }
            }).catch(err => console.log("Some Error Occurred!"));
        });
}
