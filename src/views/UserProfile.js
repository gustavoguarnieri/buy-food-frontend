import React, { Component } from 'react';
import UserService from "../services/UserService";
import BackendAPI from "../services/BackendAPI";

class User extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        const axiosConfig = { headers: { Authorization: `Bearer ${UserService.getToken()}` } };

        BackendAPI.get(`/api/v1/users/${UserService.getUserId()}`, axiosConfig)
            .then(response => {
                console.log(response.data)
            })
            .catch((err) => {
                console.error("ops! ocorreu um erro" + err);
            });
    }

    render() {
        return (
            <ul>
                { this.state.users.map(user => <li>{user.email}</li>)}
            </ul>
        )
    }
}

export default User;
