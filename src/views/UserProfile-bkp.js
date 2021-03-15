import React, { Component } from 'react';
import UserService from "../services/UserService";
//import Api from "../services/Api";
import { getUser } from "../modules/user/user"


class User extends Component {

    componentDidMount() {
        // const axiosConfig = { headers: { Authorization: `Bearer ${UserService.getToken()}` } };

        // Api.get(`/api/v1/users/${UserService.getUserId()}`, axiosConfig)
        //     .then(response => {
        //         console.log(response.data)
        //     })
        //     .catch((err) => {
        //         console.error("ops! ocorreu um erro" + err);
        //     });

        getUser(this.loadUser, this.showError);
    }

    loadUser = (res) => {
        this.setState({ user: res.data });
      };

    showError = (err) => {
        this.props.setMessage({ color: "warning", text: err });
        this.setState({ wait: false });
    };

    render() {
        return (
            <ul>
                { this.state.user.map(user => <li>{user.email}</li>)}
            </ul>
        )
    }
}

export default User;
