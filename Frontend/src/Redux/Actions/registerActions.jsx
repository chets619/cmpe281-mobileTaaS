import Axios from "axios";
import store from "../Store/store";
import configs from "../../config";
import { push } from 'connected-react-router';
const jwt_decode = require('jwt-decode');

export const handleLogin = (req) => {
    return (dispatch) => {

        let data = {
            email: req.email,
            password: req.password,
            category: req.category.replace(/^./, req.category[0].toUpperCase())
        };
        Axios.post(configs.connect + "/user/signin", data).then(response => {
            console.log(response);
            if (response.data.success) {
                console.log("Login Success!");

                sessionStorage.setItem("token", response.data.token);

                var decoded = jwt_decode(response.data.token);
                sessionStorage.setItem("user_id", decoded._id);
                sessionStorage.setItem("useremail", decoded.email);
                sessionStorage.setItem("type", req.email == "admin" ? "admin" : req.category);

                if (req.email == 'admin')
                    dispatch(push({ pathname: '/admindashboard' }));
                else
                    dispatch(push({ pathname: '/dashboard' }));

            } else {
                console.log(response.data.error);
            }
        }).catch(err => console.log(err));
    }
}

export const handleSignup = (req) => {
    return (dispatch) => {

        if (req.password !== req.password2) {
            alert("Passwords do not match!");
            return;
        }

        let data = {
            fname: req.first_name,
            lname: req.last_name,
            email: req.email,
            password: req.password,
            userType: req.userType
        };

        Axios.post(configs.connect + "/user/signup", data).then(response => {
            console.log(response);
            if (response.data.success) {
                console.log("Success!");
                // dispatch(resetForm());
                alert("User Added Successfully! Proceed to login...");
                dispatch(push('/'));

            } else {
                console.log(response.data.error);
            }

        }).catch(err => {
            console.log("Some Error Occurred!");
        });
    }
}

export const handleLogout = () => {
    return {
        type: "LOGOUT"
    }
}