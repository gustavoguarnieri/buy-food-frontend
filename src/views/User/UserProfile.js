import React, {useEffect, useState} from 'react'
import {useHistory} from "react-router-dom";
import UserService from "../../services/UserService";
import Api from "../../services/Api";
import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";

export default () => {

    const axiosConfig = {headers: {Authorization: `Bearer ${UserService.getToken()}`}};
    const history = useHistory()
    const [email, setEmail] = useState(UserService.getEmail())
    const [firstName, setFirstName] = useState(`${UserService.getUsername()}`)
    const [lastName, setLastName] = useState('')
    const [nickName, setNickName] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('USER')

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

    useEffect(() => {
            if (UserService.hasRole("admin")) {
                setRole("ADMIN")
            } else if (UserService.hasRole("establishment")) {
                setRole("ESTABLISHMENT")
            } else {
                setRole("USER")
            }
        },
        []
    )

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
                    if (err.response) {
                        if (err.response.status === 401) {
                            UserService.doLogout()
                        }
                    }
                })
        },
        []
    )

    const handleSubmit = (e) => {
        e.preventDefault()

        let data = {
            email,
            firstName,
            lastName,
            nickName,
            phone,
            password,
            role
        }

        Api.put(`/api/v1/users/${UserService.getUserId()}`, data, axiosConfig)
            .then((res) => {
            })
            .then((res) => {
                alert("Alterado com sucesso!")
                UserService.doLogout()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <>
            <Container fluid>
                <Row>
                    <Col md="6">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4">Alterar Perfil</Card.Title>
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
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Primeiro nome</label>
                                                <Form.Control
                                                    value={firstName}
                                                    onChange={handleFirstNameChange}
                                                    placeholder="Primeiro nome"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>Último nome</label>
                                                <Form.Control
                                                    value={lastName}
                                                    onChange={handleLastNameChange}
                                                    placeholder="Último nome"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="3">
                                            <Form.Group>
                                                <label>Tel. Contato</label>
                                                <Form.Control
                                                    value={phone}
                                                    onChange={handlePhoneChange}
                                                    placeholder="Contato"
                                                    type="text"
                                                    required
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group>
                                                <label>Trocar Senha</label>
                                                <Form.Control
                                                    onChange={handlePassChange}
                                                    placeholder="***"
                                                    type="password"
                                                />
                                            </Form.Group>
                                            <Form.Text className="text-muted">
                                                Preencha caso queira trocar sua senha
                                            </Form.Text>
                                        </Col>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Tipo de conta</label>
                                                <Form.Control
                                                    value={role}
                                                    onChange={handleRoleChange}
                                                    as="select"
                                                    className="mr-sm-2"
                                                    id="inlineFormCustomSelect"
                                                    custom
                                                >
                                                    {role === "ADMIN" ? (
                                                        <option value="ADMIN">ADMIN</option>
                                                    ) : (
                                                        <>
                                                            <option value="USER">USUARIO</option>
                                                            <option value="ESTABLISHMENT">ESTABELECIMENTO</option>
                                                        </>
                                                    )}
                                                </Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill float-right"
                                        type="submit"
                                        variant="info"
                                    >
                                        Salvar
                                    </Button>
                                    <div className="clearfix"/>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}