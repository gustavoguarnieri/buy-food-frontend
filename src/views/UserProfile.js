import React, { useState, useEffect } from 'react'
import UserService from "../services/UserService";
import Api from "../services/Api";
import {Card, Button, Col, Container, Form, Row} from "react-bootstrap";

export default () => {

    let [email, setEmail] = useState()
    let [firstName, setFirstName] = useState(`${UserService.getUsername()}`)
    let [lastName, setLastName] = useState('')
    let [nickName, setNickName] = useState('')
    let [phone, setPhone] = useState('')
    let [password, setPassword] = useState('')
    let [role, setRole] = useState('USER')
    const axiosConfig = { headers: { Authorization: `Bearer ${UserService.getToken()}` } };

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }
    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }
    const handlePhoneChange = (event) => {
        setPhone(event.target.value)
    }
    const handlePassChange = (event) => {
        setPassword(event.target.value)
    }
    const handleRoleChange = (event) => {
        setRole(event.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const data = {
            firstName,
            lastName,
            nickName,
            phone,
            password,
            role
        }

        Api.put(`/api/v1/users/${UserService.getUserId()}`, data, axiosConfig)
            .then((res) => {
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        Api.get(`/api/v1/users/${UserService.getUserId()}`, axiosConfig)
            .then((res) => {
                setFirstName(res.data.firstName)
                setEmail(res.data.email)
                setLastName(res.data.lastName)
                setNickName(res.data.nickName)
                setPhone(res.data.phone)                
            })
            .catch((err) => {
                console.log(err)
            })
    },
    []
    )
  
    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Edit Profile</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="12">
                                            <Form.Group>
                                                <label>Login/Email</label>
                                                <Form.Control
                                                    value={email}
                                                    placeholder="Login"
                                                    type="text"
                                                    readOnly
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <Form.Group>
                                                <label>Primeiro nome</label>
                                                <Form.Control
                                                    value={firstName}
                                                    onChange={handleFirstNameChange}
                                                    placeholder="Primeiro nome"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <Form.Group>
                                                <label>Último nome</label>
                                                <Form.Control
                                                    value={lastName}
                                                    onChange={handleLastNameChange}
                                                    placeholder="Último nome"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="pr-1" md="3">
                                            <Form.Group>
                                                <label>Contato</label>
                                                <Form.Control
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                    placeholder="Contato"
                                                    type="text"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group>
                                                <label>Senha</label>
                                                <Form.Control
                                                    onChange={handlePassChange}
                                                    placeholder="***"
                                                    type="password"
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Tipo de conta</label>
                                                <Form.Control
                                                    onChange={handleRoleChange}
                                                    as="select"
                                                    className="mr-sm-2"
                                                    id="inlineFormCustomSelect"
                                                    custom
                                                >
                                                    <option value="USER">USUARIO</option>
                                                    <option value="ESTABLISHMENT">ESTABELECIMENTO</option>
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill float-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Update Profile
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
  }